import React from 'react'
import { Button, Card, FormField } from '../components'
import styles from '../styles/forgot-password.module.scss'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { ForgotPasswordRequest } from '../proto/auth_pb'
import { authService } from '../services'

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email kötelező'),
})

const initialValues = { email: '' }

const ForgotPasswordPage: React.VFC = () => {
  const onSubmit = async (values: typeof initialValues) => {
    let req = new ForgotPasswordRequest().setEmail(values.email)

    await authService.forgotPassword(req, null)
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
              <h1>Elfelejtett jelszó</h1>
              <FormField name="email" display="Email" className={styles.field} />
              <div className={styles.controls}>
                <Button
                  className={styles.button}
                  kind="primary"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Küldés
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  )
}

export default ForgotPasswordPage
