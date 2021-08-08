import { ClientReadableStream } from 'grpc-web'
import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { TimeState } from '../models/time'
import { GetTimesRequest, GetTimesResponse } from '../proto/competition_pb'
import { competitionService } from '../services'
import { useAuthFunctions } from '../state/auth'
import { competitionState, competitionTime, currentTime } from '../state/competition'
import { useInterval } from '.'
import { retry } from '../utils/retry'

export const useTime = () => {
  const { getAuth } = useAuthFunctions()
  const setTimes = useSetRecoilState(competitionTime)
  const setCurrentTime = useSetRecoilState(currentTime)
  const state = useRecoilValue(competitionState)

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
