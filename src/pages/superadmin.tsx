import { Form, Formik } from 'formik'
import React, { Suspense, useEffect } from 'react'
import { useAtomState } from 'yauk/react'
import { Button, Card, FormField } from '../components'
import { saTimes } from '../state/superadmin'
import s from '../styles/SuperAdmin.module.scss'
import * as Yup from 'yup'
import { saService } from '../services'
import { GetResultsRequest, GetResultsResponse, SetTimeRequest } from '../proto/superadmin_pb'
import { ClientReadableStream } from 'grpc-web'
import { createStreamService } from '../utils/streamService'

export const createSuperadminStream = async (): Promise<
  ClientReadableStream<GetResultsResponse>
> => {
  const stream = await (saService.getResults(new GetResultsRequest()) as any as Promise<
    ClientReadableStream<GetResultsResponse>
  >)

  stream.on('data', (res: GetResultsResponse) => {})

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
    <Card className={s.card}>
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
    </div>
  )
}

export default SuperAdminPage
