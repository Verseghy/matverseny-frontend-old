import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/card'
import Input from '../components/input'
import Button from '../components/button'
import Message from '../components/error-message'
import styles from '../styles/login.module.scss'
import { Formik, Form, Field, FieldProps, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { LoginRequest } from '../proto/auth_pb'
import { AuthContext } from '../context/auth'
import { Error } from 'grpc-web'

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Az email formátuma nem megfelelő')
    .required('Email kötelező'),
  password: Yup.string()
    .required('Jelszó kötelező'),
})

const initialValues = { email: '', password: '' }

const LoginPage: React.VFC = () => {
  const [error, setError] = useState('');
  const {service} = useContext(AuthContext)

  const onSubmit = async (values: typeof initialValues) => {
    let req = new LoginRequest()
      .setEmail(values.email)
      .setPassword(values.password)
    
    try {
      let res = await service.login(req, null)
      let aToken = res.getAccessToken()
      let rToken = res.getRefreshToken()
      console.log(`accessToken: ${aToken}; refreshToken: ${rToken}`)
    } catch (error: any) {
      const e = error as Error
      setError(e.message)
    }
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {({ isSubmitting }) => (
            <Form>
              <img src="/assets/logo.svg" alt="" className={styles.logo} />
              <h1>Bejelentkezés</h1>
              <h2>A <span>191</span> matematikaverseny oldalára</h2>
              <Message message={error} />
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
              <div className={styles.field}>
                <span>Jelszó</span>
                <Field name="password">
                  {({ field, meta }: FieldProps) => (
                    <Input block type="password" {...field} error={!!meta.touched && !!meta.error} />
                  )}
                </Field>
                <ErrorMessage name="password">
                  {(msg) => (<span className={styles.error}>{msg}</span>)}
                </ErrorMessage>
              </div>
              <Link to="/forgot-password" className={styles.forgot}>Elfelejtetted a jelszavad?</Link>
              <div className={styles.controls}>
                <Button block to="/register">Regisztráció</Button>
                <Button className={styles.button} primary disabled={isSubmitting} type="submit">Bejelentkezés</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  )
}

export default LoginPage
