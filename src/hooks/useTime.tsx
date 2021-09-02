import { ClientReadableStream } from 'grpc-web'
import { useEffect } from 'react'
import { TimeState } from '../models/time'
import { GetTimesRequest, GetTimesResponse } from '../proto/competition_pb'
import { competitionService } from '../services'
import { competitionState, competitionTime, currentTime } from '../state/competition'
import { useInterval } from '.'
import { retry } from '../utils/retry'
import { getAuth } from '../state/auth'
import { useAtom, useSetAtom } from 'yauk/react'

export const useTime = () => {
  const setTimes = useSetAtom(competitionTime)
  const setCurrentTime = useSetAtom(currentTime)
  const state = useAtom(competitionState)

  useEffect(() => {
    const getTimes = (): Promise<void> => {
      return new Promise(async (resolve, reject) => {
        const stream = competitionService.getTimes(
          new GetTimesRequest(),
          await getAuth()
        ) as ClientReadableStream<GetTimesResponse>

        stream.on('data', (res: GetTimesResponse) => {
          setTimes({
            gotTime: true,
            start: new Date(res.getStart()).getTime(),
            end: new Date(res.getEnd()).getTime(),
          })
        })

        stream.on('end', () => {
          resolve()
        })

        stream.on('error', () => {
          reject()
        })
      })
    }

    retry(getTimes, 2000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useInterval(
    () => {
      setCurrentTime(new Date().getTime())
    },
    state !== TimeState.AFTER_COMP ? 1000 : null
  )
}
