import React from 'react'
import Card from '../components/card'
import Input from '../components/input'
import Button from '../components/button'
import styles from '../styles/forgot-password.module.scss'
import { Formik, Form, Field, FieldProps, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { AuthContext } from '../context/auth'
import { ForgotPasswordRequest } from '../proto/auth_pb'

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email kötelező'),
})

const initialValues = { email: '' }

const ForgotPasswordPage: React.VFC = () => {
  const { service } = React.useContext(AuthContext)

  const onSubmit = async (values: typeof initialValues) => {
    let req = new ForgotPasswordRequest()
      .setEmail(values.email)
    
    await service.forgotPassword(req, null)
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {({ isSubmitting }) => (
            <Form>
              <h1>Elfelejtett jelszó</h1>
              <div className={styles.field}>
                <span>Email</span>
                <Field name="email">
                  {({ field, meta }: FieldProps) => (
                    <Input type="email" block {...field} error={!!meta.touched && !!meta.error} />
                  )}
                </Field>
                <ErrorMessage name="email">
                  {(msg) => (<span className={styles.error}>{msg}</span>)}
                </ErrorMessage>
              </div>
              <div className={styles.controls}>
                <Button className={styles.button} kind="primary" disabled={isSubmitting} type="submit">Küldés</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  )
}

export default ForgotPasswordPage
