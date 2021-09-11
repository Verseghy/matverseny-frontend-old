import { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { Button, Card, ErrorMessage, GuardedRoute, Input } from '../components'
import { CreateTeamRequest, JoinTeamRequest } from '../proto/team_pb'
import { teamService } from '../services'
import styles from '../styles/team.module.scss'
import * as Yup from 'yup'
import { Field, Form, Formik, FieldProps, ErrorMessage as FormikErrorMessage } from 'formik'
import { MemberRank } from '../models/team'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown, faKey, faRedoAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useTeamGuard } from '../guards/team'
import { getAuth, newToken } from '../state/auth'
import {
  deleteTeam,
  kickMember,
  leaveTeam,
  refetchTeamInfo,
  regenerateJoinCode,
  teamError,
  teamInfo,
  toggleCoOwnerStatus,
  userInfo,
} from '../state/team'
import { useAtom } from 'yauk/react'

const JoinTeamPage: React.VFC = () => {
  const [teamCode, setTeamCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const onJoin = async () => {
    const req = new JoinTeamRequest().setCode(teamCode)
    try {
      await teamService.joinTeam(req, await getAuth())
      await newToken()
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
          <Button to="/team/create" kind="primary">
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
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (values: typeof createTeamInitialValues) => {
    let req = new CreateTeamRequest().setName(values.name)

    try {
      await teamService.createTeam(req, await getAuth())
      await newToken()
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
                <Button to="/team" block>
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

const ManageTeamPage: React.VFC = () => {
  const info = useAtom(teamInfo)
  const user = useAtom(userInfo)!
  const errorMessage = useAtom(teamError)

  useEffect(() => {
    refetchTeamInfo()
  }, [])

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1>{info.name}</h1>
        <ErrorMessage message={errorMessage} />
        {user.rank === MemberRank.OWNER && (
          <div className={styles.codeContainer}>
            Csapatkód:
            <Input
              value={info.code}
              readOnly
              className={styles.code}
              onFocus={(event) => event.target.select()}
            />
            <Button onClick={regenerateJoinCode}>
              <FontAwesomeIcon icon={faRedoAlt} />
            </Button>
          </div>
        )}
        <span className={styles.members}>Tagok</span>
        <div>
          {info.members.map((m) => (
            <div key={m.id} className={styles.member}>
              <span className={styles.memberName}>
                <span>{m.name}</span>
                {m.rank === MemberRank.OWNER && (
                  <FontAwesomeIcon size={'xs'} className={styles.star} icon={faCrown} />
                )}
              </span>
              {user.rank !== MemberRank.MEMBER && (
                <div className={styles.actions}>
                  {m.rank !== MemberRank.OWNER && m.id !== user.id && (
                    <>
                      <Button
                        onClick={() => toggleCoOwnerStatus(m.id)}
                        kind={m.rank === MemberRank.COOWNER ? 'primary' : undefined}
                      >
                        <FontAwesomeIcon icon={faKey} />
                      </Button>
                      <Button onClick={() => kickMember(m.id)}>
                        <FontAwesomeIcon icon={faTimes} />
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.buttonsContainer}>
          <Button block kind="primary" to="/competition">
            Versenyhez
          </Button>
          {((user.rank === MemberRank.MEMBER || user.rank === MemberRank.COOWNER) && (
            <Button block onClick={leaveTeam} kind="danger">
              Csapat elhagyása
            </Button>
          )) || (
            <Button block onClick={deleteTeam} kind="danger">
              Csapat törlése
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

interface TeamRouteProps {
  component: React.ComponentType<any>
}

const NoTeamRoute: React.VFC<TeamRouteProps> = ({ component }) => {
  const teamGuard = useTeamGuard('noTeam')
  return <GuardedRoute component={component} guards={[teamGuard]} />
}

const HasTeamRoute: React.VFC<TeamRouteProps> = ({ component }) => {
  const teamGuard = useTeamGuard('hasTeam')
  return <GuardedRoute component={component} guards={[teamGuard]} />
}

const TeamPage: React.VFC = () => {
  return (
    <>
      <Route path="/team" exact>
        <NoTeamRoute component={JoinTeamPage} />
      </Route>
      <Route path="/team/create">
        <NoTeamRoute component={CreateTeamPage} />
      </Route>
      <Route path="/team/manage">
        <HasTeamRoute component={ManageTeamPage} />
      </Route>
    </>
  )
}

export default TeamPage
