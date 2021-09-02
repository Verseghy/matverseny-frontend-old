import React, { useState } from 'react'
import { Button, Card, ErrorMessage, FormField } from '../components'
import styles from '../styles/register.module.scss'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { RegisterRequest } from '../proto/auth_pb'
import { authService } from '../services'
import { login } from '../state/auth'

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Az email formátuma nem megfelelő').required('Email kötelező'),
  password: Yup.string()
    .min(8, 'A jelszónak legalább 8 karakternek kell lennie')
    .required('Jelszó kötelező'),
  passwordRe: Yup.string()
    .oneOf([Yup.ref('password')], 'Két jelszó nem egyezik')
    .required('Jelszó ismétlés kötelező'),
  name: Yup.string().required('Név kötelező'),
  school: Yup.string().required('Iskola kötelező'),
  class: Yup.number()
    .min(9, 'Az évfolyamnak 9 és 12 között kell lennie')
    .max(12, 'Az évfolyamnak 9 és 12 között kell lennie')
    .required('Évfolyam kötelező'),
})

const initialValues = {
  email: '',
  password: '',
  passwordRe: '',
  name: '',
  school: '',
  class: '',
}

const RegisterPage: React.VFC = () => {
  const [error, setError] = useState('')

  const onSubmit = async (values: typeof initialValues) => {
    let num_class = RegisterRequest.Class.K_9
    if (Number(values.class) === 10) num_class = RegisterRequest.Class.K_10
    if (Number(values.class) === 11) num_class = RegisterRequest.Class.K_11
    if (Number(values.class) === 12) num_class = RegisterRequest.Class.K_12

    let req = new RegisterRequest()
      .setEmail(values.email)
      .setPassword(values.password)
      .setName(values.name)
      .setSchool(values.school)
      .setClass(num_class)

    try {
      const res = await authService.register(req, null)
      login(res.getRefreshToken(), res.getAccessToken())
    } catch (error: any) {
      setError(error.message)
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
              <h1>Regisztráció</h1>
              <ErrorMessage message={error} />
              <FormField name="email" display="Email" className={styles.field} />
              <FormField
                name="password"
                display="Jelszó"
                type="password"
                className={styles.field}
              />
              <FormField
                name="passwordRe"
                display="Jelszó ismétlés"
                type="password"
                className={styles.field}
              />
              <FormField name="name" display="Név" className={styles.field} />
              <FormField name="school" display="Iskola" className={styles.field} />
              <FormField name="class" display="Évfolyam" type="number" className={styles.field} />
              <div className={styles.controls}>
                <Button
                  className={styles.button}
                  kind="primary"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Regisztráció
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  )
}

export default RegisterPage
