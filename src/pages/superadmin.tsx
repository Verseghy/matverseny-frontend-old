import { Form, Formik } from 'formik'
import React, { Suspense, useEffect } from 'react'
import { useAtomState } from 'yauk/react'
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
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import classnames from 'classnames'

const convertResultMap = (
  map: ProtoMap<string, GetResultsResponse.Result>
): Map<string, Result> => {
  const convertedMap = new Map<string, Result>()

  map.forEach((res: GetResultsResponse.Result, team: string) => {
    convertedMap.set(team, {
      total: res.getTotalAnswered(),
      successful: res.getSuccessfullyAnswered(),
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
      state[(res.getTimestamp() - times.start / 1000) / 30] = {
        time: res.getTimestamp(),
        result,
      }
      return state
    })
  })

  return stream
}

const superadminService = createStreamService(createSuperadminStream)

const timesValidation = Yup.object({
  start: Yup.number(),
  end: Yup.number(),
})

const TimeSettings: React.VFC = () => {
  const [times, setTimes] = useAtomState(saTimes)

  const onSubmit = async ({ start, end }: { start: number; end: number }) => {
    const req = new SetTimeRequest()
      .setStart(new Date(start).toISOString())
      .setEnd(new Date(end).toISOString())
    await saService.setTime(req, null)

    setTimes({ start, end })
  }

  return (
    <Card className={classnames(s.card, s.timeCard)}>
      <h1>Idő Beállítások</h1>
      <Formik initialValues={times} onSubmit={onSubmit} validationSchema={timesValidation}>
        {({ isSubmitting }) => (
          <Form>
            <div className={s.timesContainer}>
              <FormField display="Kezdés" type="number" name="start" />
              <FormField display="Vége" type="number" name="end" />
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

const data = [
  {
    name: 'Valami Random csapatnév',
    wrong: 99,
    successful: 1,
  },
  {
    name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    wrong: 40,
    successful: 10,
  },
  {
    name: 'Some random',
    wrong: 5,
    successful: 100,
  },
  {
    name: 'Még mindig kéne valami',
    wrong: 70,
    successful: 21,
  },
  {
    name: 'Már nem kell sok',
    wrong: 34,
    successful: 42,
  },
  {
    name: 'Utolsó előtti',
    wrong: 10,
    successful: 82,
  },
  {
    name: 'Na végra már vége van',
    wrong: 34,
    successful: 0,
  },
  {
    name: 'Na végra már vége van',
    wrong: 12,
    successful: 140,
  },
]

interface TooltipProps {
  label?: string
}

const ChartTooltip: React.VFC<TooltipProps> = ({ label }) => {
  return <div className={s.tooltip}>{label}</div>
}

const TeamStatistics: React.VFC = () => {
  return (
    <Card className={classnames(s.card, s.teamsCard)}>
      <h1>Csapat statisztika</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={500} height={300} data={data}>
          <Tooltip cursor={false} isAnimationActive={false} content={ChartTooltip} />
          <CartesianGrid vertical={false} strokeDasharray="4" />
          <XAxis tick={false} dataKey="name" tickCount={0} />
          <YAxis domain={[0, 191]} width={30} />
          <Bar dataKey="successful" stackId="a" isAnimationActive={false} fill="var(--primary)" />
          <Bar dataKey="wrong" stackId="a" isAnimationActive={false} fill="var(--red)" />
        </BarChart>
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
      <Suspense fallback="asd">
        <TimeSettings />
      </Suspense>
      <TeamStatistics />
    </div>
  )
}

export default SuperAdminPage
