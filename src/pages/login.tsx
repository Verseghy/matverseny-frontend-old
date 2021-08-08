import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Card, ErrorMessage as Message } from '../components'
import styles from '../styles/login.module.scss'
import { Formik, Form, Field, FieldProps, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { LoginRequest } from '../proto/auth_pb'
import { Error } from 'grpc-web'
import { useAuthFunctions } from '../state/auth'
import { authService } from '../services'

const validationSchema = Yup.object({
  email: Yup.string().email('Az email formátuma nem megfelelő').required('Email kötelező'),
  password: Yup.string().required('Jelszó kötelező'),
})

const initialValues = { email: '', password: '' }

const LoginPage: React.VFC = () => {
  const [error, setError] = useState('')
  const { login } = useAuthFunctions()

  const onSubmit = async (values: typeof initialValues) => {
    let req = new LoginRequest().setEmail(values.email).setPassword(values.password)

    try {
      const res = await authService.login(req, null)
      login(res.getRefreshToken(), res.getAccessToken())
    } catch (error: any) {
      const e = error as Error
      setError(e.message)
    }
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <img src="/assets/logo.svg" alt="" className={styles.logo} />
              <h1>Bejelentkezés</h1>
              <h2>
                A <span>191</span> matematikaverseny oldalára
              </h2>
              <Message message={error} />
              <div className={styles.field}>
                <span>Email</span>
                <Field name="email">
                  {({ field, meta }: FieldProps) => (
                    <Input type="email" block {...field} error={!!meta.touched && !!meta.error} />
                  )}
                </Field>
                <ErrorMessage name="email">
                  {(msg) => <span className={styles.error}>{msg}</span>}
                </ErrorMessage>
              </div>
              <div className={styles.field}>
                <span>Jelszó</span>
                <Field name="password">
                  {({ field, meta }: FieldProps) => (
                    <Input
                      block
                      type="password"
                      {...field}
                      error={!!meta.touched && !!meta.error}
                    />
                  )}
                </Field>
                <ErrorMessage name="password">
                  {(msg) => <span className={styles.error}>{msg}</span>}
                </ErrorMessage>
              </div>
              <Link to="/forgot-password" className={styles.forgot}>
                Elfelejtetted a jelszavad?
              </Link>
              <div className={styles.controls}>
                <Button block to="/register">
                  Regisztráció
                </Button>
                <Button
                  className={styles.button}
                  kind="primary"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Bejelentkezés
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  )
}

export default LoginPage
