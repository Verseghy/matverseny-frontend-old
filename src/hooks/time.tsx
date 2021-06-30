import { ClientReadableStream } from 'grpc-web'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { GetTimesRequest, GetTimesResponse } from '../proto/competition_pb'
import { useAuthFunctions } from '../state/auth'
import { competitionService, competitionTime, currentTime } from '../state/competition'
import { useInterval } from './interval'

export const useTime = () => {
  const {getAuth} = useAuthFunctions()
  const setTimes = useSetRecoilState(competitionTime)
  const setCurrentTime = useSetRecoilState(currentTime)

  useEffect(() => {
    const getTimes = async () => {
      const stream = competitionService.getTimes(
        new GetTimesRequest(),
        await getAuth()
      ) as ClientReadableStream<GetTimesResponse>

      stream.on('data', (res: GetTimesResponse) => {
        setTimes({
          start: new Date(res.getStart()).getTime(),
          end: new Date(res.getEnd()).getTime(),
        })
      })
    }

    getTimes()
  }, [])

  useInterval(() => {
    setCurrentTime(new Date().getTime())
  }, [], 1000)
}
