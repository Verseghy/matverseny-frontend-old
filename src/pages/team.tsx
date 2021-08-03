import { useState } from 'react'
import { HashRouter, Route, Switch, useHistory } from 'react-router-dom'
import { Button, Card, ErrorMessage, Input } from '../components'
import { CreateTeamRequest, JoinTeamRequest } from '../proto/team_pb'
import { teamService } from '../services'
import { useAuthFunctions } from '../state/auth'
import styles from '../styles/team.module.scss'
import * as Yup from 'yup'
import { Field, Form, Formik, FieldProps, ErrorMessage as FormikErrorMessage } from 'formik'

const JoinTeamPage: React.VFC = () => {
  const [teamCode, setTeamCode] = useState('')
  const { getAuth, newToken } = useAuthFunctions()
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory()

  const onJoin = async () => {
    const req = new JoinTeamRequest().setCode(teamCode)
    try {
      await teamService.joinTeam(req, await getAuth())
      await newToken()
      history.push('/manage')
    } catch (err: any) {
      const error = err as Error
      setErrorMessage(error.message)
    }
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.section}>
          <h1>Hozz létre egy csapatot</h1>
          <Button to="/create" kind="primary">
            Új csapat
          </Button>
        </div>
        <div className={styles.divider}>
          <span>vagy</span>
        </div>
        <div className={styles.section}>
          <h1>Csatlakozz egy csapathoz</h1>
          {errorMessage !== '' && (
            <ErrorMessage className={styles.errorMessage} message={errorMessage} />
          )}
          <div className={styles.join}>
            <Input
              placeholder="Csapatkód"
              value={teamCode}
              onInput={(event) => setTeamCode((event.target as HTMLInputElement).value)}
            />
            <Button kind="primary" onClick={onJoin}>
              Csatlakozás
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

const createTeamValidationScheme = Yup.object({
  name: Yup.string()
    .max(64, 'A név maximum 64 karakter hosszú lehet')
    .required('Név megadása kötelező'),
})

const createTeamInitialValues = { name: '' }

const CreateTeamPage: React.VFC = () => {
  const { getAuth, newToken } = useAuthFunctions()
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory()

  const onSubmit = async (values: typeof createTeamInitialValues) => {
    let req = new CreateTeamRequest().setName(values.name)

    try {
      await teamService.createTeam(req, await getAuth())
      await newToken()
      history.push('/manage')
    } catch (err: any) {
      const error = err as Error
      setErrorMessage(error.message)
    }
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Formik
          initialValues={createTeamInitialValues}
          onSubmit={onSubmit}
          validationSchema={createTeamValidationScheme}
        >
          {({ isSubmitting }) => (
            <Form>
              <h1>Csapat létrehozása</h1>
              <ErrorMessage className={styles.errorMessage} message={errorMessage} />
              <label>
                <span>Csapat neve</span>
                <Field name="name">
                  {({ field, meta }: FieldProps) => (
                    <Input
                      className={styles.nameInput}
                      autoFocus
                      {...field}
                      error={!!meta.touched && !!meta.error}
                    />
                  )}
                </Field>
              </label>
              <FormikErrorMessage name="name">
                {(msg) => <span className={styles.fieldError}>{msg}</span>}
              </FormikErrorMessage>
              <div className={styles.buttons}>
                <Button to="/" block>
                  Vissza
                </Button>
                <Button type="submit" disabled={isSubmitting} kind="primary" block>
                  Létrehozás
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  )
}

const TeamPage: React.VFC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact>
          <JoinTeamPage />
        </Route>
        <Route path="/create" exact>
          <CreateTeamPage />
        </Route>
      </Switch>
    </HashRouter>
  )
}

export default TeamPage
