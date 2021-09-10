import { ClientReadableStream } from 'grpc-web'
import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { setAtomValue } from 'yauk'
import { useProblems } from '../hooks'
import { GetTimesRequest, GetTimesResponse } from '../proto/competition_pb'
import { competitionService } from '../services'
import { getAuth } from '../state/auth'
import { competitionTime, currentTime } from '../state/competition'
import { store } from '../state/store'
import { RetryStop, retryStream } from '../utils/retry'
import { startSolutionsService, stopSolutionsService } from './solutions'

const CompetitionServiceInner: React.VFC = () => {
  useProblems(competitionService)

  useEffect(() => {
    startTimesService()
    startSolutionsService()

    return () => {
      stopTimesService()
      stopSolutionsService()
    }
  }, [])

  return null
}

const CompetitionService: React.VFC = () => {
  return (
    <Route path={['/wait', '/competition', '/end', '/team']}>
      <CompetitionServiceInner />
    </Route>
  )
}

export default CompetitionService

let timesServiceStop: null | RetryStop = null
let clock: NodeJS.Timer | null = null

const startTimesService = async (): Promise<void> => {
  if (timesServiceStop !== null) return

  startClock()
  timesServiceStop = await retryStream(createTimesStream, 2000)
}

const stopTimesService = (): void => {
  if (timesServiceStop === null) return

  stopClock()
  timesServiceStop()
  timesServiceStop = null
}

const startClock = () => {
  if (clock !== null) return

  clock = setInterval(() => {
    setAtomValue(store, currentTime, new Date().getTime())
  }, 1000)
}

const stopClock = () => {
  if (clock === null) return

  clearInterval(clock)
}

const createTimesStream = async (): Promise<ClientReadableStream<GetTimesResponse>> => {
  const stream = competitionService.getTimes(
    new GetTimesRequest(),
    await getAuth()
  ) as ClientReadableStream<GetTimesResponse>

  stream.on('data', (res: GetTimesResponse) => {
    setAtomValue(store, competitionTime, {
      gotTime: true,
      start: new Date(res.getStart()).getTime(),
      end: new Date(res.getEnd()).getTime(),
    })
  })

  return stream
}
