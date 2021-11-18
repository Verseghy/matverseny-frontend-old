import { Form, Formik } from 'formik'
import React, { Suspense, useEffect } from 'react'
import { useAtom, useAtomState } from 'yauk/react'
import { Button, Card, FormField } from '../components'
import { Result, saResults, saTimes } from '../state/superadmin'
import s from '../styles/SuperAdmin.module.scss'
import * as Yup from 'yup'
import { saService } from '../services'
import { GetResultsRequest, GetResultsResponse, SetTimeRequest } from '../proto/superadmin_pb'
import { ClientReadableStream } from 'grpc-web'
import { createStreamService } from '../utils/streamService'
import { getAtomValue, setAtomValue } from 'yauk'
import { Map as ProtoMap } from 'google-protobuf'
import { store } from '../state/store'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import classnames from 'classnames'
import { format } from 'date-fns'

const convertResultMap = (
  map: ProtoMap<string, GetResultsResponse.Result>
): Map<string, Result> => {
  const convertedMap = new Map<string, Result>()

  map.forEach((res: GetResultsResponse.Result, team: string) => {
    convertedMap.set(team, {
      total: res.getTotalAnswered(),
      successful: res.getSuccessfullyAnswered(),
      team_name: res.getTeamName(),
    })
  })

  return convertedMap
}

export const createSuperadminStream = async (): Promise<
  ClientReadableStream<GetResultsResponse>
> => {
  const stream = await (saService.getResults(new GetResultsRequest()) as any as Promise<
    ClientReadableStream<GetResultsResponse>
  >)

  stream.on('data', async (res: GetResultsResponse) => {
    const times = await getAtomValue(store, saTimes)
    const result = convertResultMap(res.getResultsMap())

    setAtomValue(store, saResults, (state) => {
      let newState = [...state]

      newState[(res.getTimestamp() - times.start / 1000) / 30] = {
        time: res.getTimestamp(),
        result,
      }

      return newState
    })
  })

  return stream
}

const superadminService = createStreamService(createSuperadminStream)

const timesValidation = Yup.object({
  start: Yup.string(),
  end: Yup.string(),
})

const TimeSettings: React.VFC = () => {
  const [times, setTimes] = useAtomState(saTimes)

  const onSubmit = async ({ start, end }: { start: string; end: string }) => {
    const startD = new Date(start)
    const endD = new Date(end)

    const req = new SetTimeRequest().setStart(startD.toISOString()).setEnd(endD.toISOString())
    await saService.setTime(req, null)

    setTimes({ start: startD.getTime(), end: endD.getTime() })
  }

  return (
    <Card className={classnames(s.card, s.timeCard)}>
      <h1>Idő Beállítások</h1>
      <Formik
        initialValues={{
          start: format(new Date(times.start), 'yyyy-MM-dd HH:mm:ss'),
          end: format(new Date(times.end), 'yyyy-MM-dd HH:mm:ss'),
        }}
        onSubmit={onSubmit}
        validationSchema={timesValidation}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={s.timesContainer}>
              <FormField display="Kezdés" type="text" name="start" />
              <FormField display="Vége" type="text" name="end" />
            </div>
            <Button disabled={isSubmitting} type="submit" kind="primary">
              Módosítás
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  )
}

interface TooltipProps {
  label?: string
  payload?: any
}

const ChartTooltip: React.VFC<TooltipProps> = ({ label, payload }) => {
  if (payload.length !== 2) return null

  return (
    <div className={s.tooltip}>
      <strong>{label}</strong>
      <p>helyes: {payload[0].value}</p>
      <p>hibás: {payload[1].value}</p>
    </div>
  )
}

const TeamStatistics: React.VFC = () => {
  const data = useAtom(saResults)

  if (data.length === 0) return null

  const mappedData = Array.from(data[data.length - 1].result.entries(), ([_, points]) => {
    return {
      name: points.team_name,
      wrong: points.total - points.successful,
      successful: points.successful,
    }
  })

  return (
    <Card className={classnames(s.card, s.teamsCard)}>
      <h1>Csapat statisztika</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={500} height={300} data={mappedData}>
          <Tooltip cursor={false} isAnimationActive={false} content={ChartTooltip} />
          <CartesianGrid vertical={false} strokeDasharray="4" />
          <XAxis tick={false} dataKey="name" tickCount={0} />
          <YAxis width={30} />
          <Bar dataKey="successful" stackId="a" isAnimationActive={false} fill="var(--primary)" />
          <Bar dataKey="wrong" stackId="a" isAnimationActive={false} fill="var(--red)" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

const TimeTooltip: React.VFC<TooltipProps> = ({ label, payload }) => {
  if (!label) return null

  return (
    <div className={s.tooltip}>
      <strong>{format(new Date(Number(label) * 1000), 'HH:mm:ss')}</strong>
      {payload.map(({ name, value }: any) => (
        <p key={name}>
          {name}: {value}
        </p>
      ))}
    </div>
  )
}

const TimeStatistics: React.VFC = () => {
  const data = useAtom(saResults)

  if (data.length === 0) return null

  const mappedData = data.map((item) => {
    let output: { [key: string]: number } = {
      time: item.time,
    }

    for (const points of Array.from(item.result.values())) {
      output[points.team_name] = points.successful
    }

    return output
  })

  const teams = Object.keys(mappedData[0]).filter((x) => x !== 'time')

  return (
    <Card className={classnames(s.card, s.teamsCard)}>
      <h1>Idő szerinti statisztika</h1>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart width={500} height={300} data={mappedData}>
          <Tooltip cursor={false} isAnimationActive={false} content={TimeTooltip} />
          <CartesianGrid vertical={false} strokeDasharray="4" />
          <XAxis tick={false} dataKey="time" tickCount={0} />
          <YAxis width={30} />
          {teams.map((team) => (
            <Line
              dot={false}
              type="monotone"
              key={team}
              dataKey={team}
              isAnimationActive={false}
              stroke="var(--primary)"
              strokeWidth={3}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

const SuperAdminPage: React.VFC = () => {
  useEffect(() => {
    superadminService.start()
    return () => superadminService.stop()
  }, [])

  return (
    <div className={s.container}>
      <Suspense fallback="Töltés...">
        <TimeSettings />
      </Suspense>
      <TeamStatistics />
      <TimeStatistics />
    </div>
  )
}

export default SuperAdminPage
