import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, ErrorMessage, FormField } from '../components'
import styles from '../styles/login.module.scss'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { LoginRequest } from '../proto/auth_pb'
import { Error } from 'grpc-web'
import { authService } from '../services'
import { login } from '../state/auth'
import { timesService } from '../services/times'

const validationSchema = Yup.object({
  email: Yup.string().email('Az email formátuma nem megfelelő').required('Email kötelező'),
  password: Yup.string().required('Jelszó kötelező'),
})

const initialValues = { email: '', password: '' }

const LoginPage: React.VFC = () => {
  const [error, setError] = useState('')

  useEffect(() => {
    timesService.stop()
  }, [])

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
              <ErrorMessage message={error} />
              <FormField name="email" display="Email" className={styles.field} />
              <FormField
                name="password"
                display="Jelszó"
                type="password"
                className={styles.field}
              />
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
