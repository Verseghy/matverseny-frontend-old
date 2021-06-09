import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/card'
import Input from '../components/input'
import Button from '../components/button'
import styles from '../styles/login.module.scss'
import { Formik, Form, Field, FieldProps, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Az email formátuma nem megfelelő')
    .required('Email kötelező'),
  password: Yup.string()
    .required('Jelszó kötelező'),
})

const initialValues = {username: '', password: ''}

const LoginPage: React.VFC = () => {

  const onSubmit = (asd: any) => {
    console.log('submit', asd)
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
