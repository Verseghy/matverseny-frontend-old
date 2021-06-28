import { ClientReadableStream } from "grpc-web";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useInterval } from "../hooks/interval";
import { Time, TimeState } from "../models/time";
import { GetTimesRequest, GetTimesResponse } from "../proto/competition_pb";
import { authAccessToken } from "../state/auth";
import { service } from "./competition";

export interface TimeContextType {
  time: string,
  state: TimeState,
  setState: Dispatch<SetStateAction<TimeState>>
}

export const TimeContext = createContext<TimeContextType | null>(null)

export const TimeProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(TimeState.BEFORE_COMP)
  const [timeString, setTimeString] = useState('00:00:00')
  const [time, setTime] = useState<Time | null>(null)
  const accessToken = useRecoilValue(authAccessToken)

  useEffect(() => {
    const getTimes = async () => {
      if (service === null) return

      const stream = service.getTimes(new GetTimesRequest(), {
        Authorization: `Bearer: ${accessToken}`
      }) as ClientReadableStream<GetTimesResponse>

      stream.on('data', (res: GetTimesResponse) => {
        setTime({
          start: new Date(res.getStart()!),
          end: new Date(res.getEnd()!),
        })
      })
    }

    getTimes()
  }, [service])

  useInterval(() => {
    if (!time) return

    const now = new Date().getTime()
    if (time.end.getTime() < now) {
      setState(TimeState.AFTER_COMP)
      return
    }

    let diff = time.end.getTime() - now
    if (time.start.getTime() < now) {
      setState(TimeState.IN_COMP)
    }
    if (time.start.getTime() > now) {
      setState(TimeState.BEFORE_COMP)
      diff = time.start.getTime() - now
    }

    const hours = Math.floor(diff / 3600000)
    const minutes = Math.floor(diff / 60000) % 60
    const seconds = Math.floor(diff / 1000) % 60

    const hoursString = `0${hours}`.slice(-2)
    const minutesString = `0${minutes}`.slice(-2)
    const secondsString = `0${seconds}`.slice(-2)

    setTimeString(`${hoursString}:${minutesString}:${secondsString}`)
  }, [time], 1000)

  return (
    <TimeContext.Provider value={{ time: timeString, state, setState }}>
      {children}
    </TimeContext.Provider>
  )
}
