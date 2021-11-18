import { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import {
  Button,
  Card,
  CopyButton,
  ErrorMessage,
  FormField,
  GuardedRoute,
  Input,
} from '../components'
import { CreateTeamRequest, JoinTeamRequest } from '../proto/team_pb'
import { teamService } from '../services'
import styles from '../styles/team.module.scss'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { MemberRank } from '../models/team'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown, faKey, faRedoAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useTeamGuard } from '../guards/team'
import { newToken } from '../state/auth'
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
  renameTeam,
  changeLock,
} from '../state/team'
import { useAtom } from 'yauk/react'

const JoinTeamPage: React.VFC = () => {
  const [teamCode, setTeamCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const onJoin = async () => {
    const req = new JoinTeamRequest().setCode(teamCode)
    try {
      await teamService.joinTeam(req, null)
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
      await teamService.createTeam(req, null)
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
              <FormField name="name" display="Csapat neve" autoFocus className={styles.nameInput} />
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

const renameTeamValidationScheme = Yup.object({
  name: Yup.string().max(64, 'Maximum 64 karakter lehet').required('Név megadása kötelező'),
})

const renameTeamInitialValues = { name: '' }

const ManageTeamPage: React.VFC = () => {
  const info = useAtom(teamInfo)
  const user = useAtom(userInfo)!
  const errorMessage = useAtom(teamError)

  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    refetchTeamInfo()
  }, [])

  const onSubmit = async (values: typeof renameTeamInitialValues) => {
    await renameTeam(values.name.trim())
    setEditMode(false)
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1>{info.name}</h1>
        <ErrorMessage message={errorMessage} />
        {user.rank === MemberRank.OWNER && (
          <>
            {!editMode && (
              <div className={styles.teamOperations}>
                <Button block onClick={() => setEditMode(true)}>
                  Csapatnév módosítása
                </Button>
                {info.isLocked ? (
                  <Button onClick={() => changeLock(false)} block>
                    Nevezés visszavonása
                  </Button>
                ) : (
                  <Button onClick={() => changeLock(true)} block>
                    Nevezése a versenyre
                  </Button>
                )}
              </div>
            )}
            {editMode && (
              <Formik
                initialValues={renameTeamInitialValues}
                onSubmit={onSubmit}
                validationSchema={renameTeamValidationScheme}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className={styles.renameTeam}>
                      <FormField block autoFocus name="name" />
                      <div className={styles.renameButtons}>
                        <Button
                          disabled={isSubmitting}
                          type="submit"
                          className={styles.submitRename}
                        >
                          Átnevezés
                        </Button>
                        <Button onClick={() => setEditMode(false)}>
                          <FontAwesomeIcon icon={faTimes} />
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
            <div className={styles.codeContainer}>
              <span className={styles.codeTitle}>Csapatkód:</span>
              <div className={styles.codeActions}>
                <Input
                  value={info.code}
                  readOnly
                  className={styles.code}
                  onFocus={(event) => event.target.select()}
                />
                <CopyButton text={info.code} />
                <Button onClick={regenerateJoinCode}>
                  <FontAwesomeIcon icon={faRedoAlt} />
                </Button>
              </div>
            </div>
          </>
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
                      {user.rank === MemberRank.OWNER && (
                        <Button
                          onClick={() => toggleCoOwnerStatus(m.id)}
                          kind={m.rank === MemberRank.COOWNER ? 'primary' : undefined}
                        >
                          <FontAwesomeIcon icon={faKey} />
                        </Button>
                      )}
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
          <Button block kind="primary" to="/competition" disabled={!info.isLocked}>
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
