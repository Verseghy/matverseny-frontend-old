import { useEffect, useState } from 'react'
import { Route, useHistory } from 'react-router-dom'
import { Button, Card, ErrorMessage, Input } from '../components'
import {
  CreateTeamRequest,
  GenerateJoinCodeRequest,
  GetTeamInfoRequest,
  JoinTeamRequest,
  LeaveTeamRequest,
  DisbandTeamRequest,
  KickUserRequest,
  ChangeCoOwnerStatusRequest,
} from '../proto/team_pb'
import { teamService } from '../services'
import { useAuthFunctions } from '../state/auth'
import styles from '../styles/team.module.scss'
import * as Yup from 'yup'
import { Field, Form, Formik, FieldProps, ErrorMessage as FormikErrorMessage } from 'formik'
import { convertTeamInfo, Member, MemberRank } from '../models/team'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCrow,
  faCrown,
  faKey,
  faRedoAlt,
  faStar,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'

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
      history.push('/team/manage')
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
  const { getAuth, newToken } = useAuthFunctions()
  const [errorMessage, setErrorMessage] = useState('')
  const history = useHistory()

  const onSubmit = async (values: typeof createTeamInitialValues) => {
    let req = new CreateTeamRequest().setName(values.name)

    try {
      await teamService.createTeam(req, await getAuth())
      await newToken()
      history.push('/team/manage')
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
  const [members, setMembers] = useState<Member[]>([])
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [memberRank, setMemberRank] = useState(MemberRank.MEMBER)
  const [userID, setUserID] = useState('')
  const { getAuth, getClaims } = useAuthFunctions()
  const history = useHistory()

  useEffect(() => {
    const fetchInfo = async () => {
      const req = new GetTeamInfoRequest()
      const getInfo = teamService.getTeamInfo(req, await getAuth())
      const [res, claims] = await Promise.all([getInfo, getClaims()])
      const teamInfo = convertTeamInfo(res)

      setUserID(claims!.user_id)
      setName(teamInfo.name)
      setCode(teamInfo.code)
      setMemberRank(teamInfo.members.find((m) => m.id === claims?.user_id)!.rank)
      setMembers(teamInfo.members)
    }

    fetchInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onNewCode = async () => {
    const req = new GenerateJoinCodeRequest()
    try {
      const res = await teamService.generateJoinCode(req, await getAuth())
      setCode(res.getNewCode())
      setErrorMessage('')
    } catch (err: any) {
      const error = err as Error
      setErrorMessage(error.message)
    }
  }

  const onLeave = async () => {
    const req = new LeaveTeamRequest()
    try {
      await teamService.leaveTeam(req, await getAuth())
      history.push('/team')
    } catch (err: any) {
      const error = err as Error
      setErrorMessage(error.message)
    }
  }

  const onDeleteTeam = async () => {
    const req = new DisbandTeamRequest()
    try {
      await teamService.disbandTeam(req, await getAuth())
      setErrorMessage('')
    } catch (err: any) {
      const error = err as Error
      setErrorMessage(error.message)
    }
  }

  const onKick = async (id: string) => {
    const req = new KickUserRequest().setUserId(id)
    try {
      await teamService.kickUser(req, await getAuth())
      setMembers((state) => state.filter((m) => m.id !== id))
      setErrorMessage('')
    } catch (err: any) {
      const error = err as Error
      setErrorMessage(error.message)
    }
  }

  const onTogglePromote = async (id: string) => {
    const member = members.find((m) => m.id === id)

    if (member?.rank === MemberRank.OWNER) return

    const shouldCoowner = member?.rank === MemberRank.MEMBER

    try {
      const req = new ChangeCoOwnerStatusRequest().setUserId(id).setShouldCoowner(shouldCoowner)

      await teamService.changeCoOwnerStatus(req, await getAuth())
      setMembers((state) =>
        state.map((m) =>
          m.id === id ? { ...m, rank: shouldCoowner ? MemberRank.COOWNER : MemberRank.MEMBER } : m
        )
      )
      setErrorMessage('')
    } catch (err: any) {
      const error = err as Error
      setErrorMessage(error.message)
    }
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h1>{name}</h1>
        <ErrorMessage message={errorMessage} />
        {memberRank === MemberRank.OWNER && (
          <div className={styles.codeContainer}>
            Csapatkód:
            <Input
              value={code}
              readOnly
              className={styles.code}
              onFocus={(event) => event.target.select()}
            />
            <Button onClick={onNewCode}>
              <FontAwesomeIcon icon={faRedoAlt} />
            </Button>
          </div>
        )}
        <span className={styles.members}>Tagok</span>
        <div>
          {members.map((m) => (
            <div key={m.id} className={styles.member}>
              <span className={styles.memberName}>
                {m.name}
                {m.rank === MemberRank.OWNER && (
                  <FontAwesomeIcon size={'xs'} className={styles.star} icon={faCrown} />
                )}
              </span>
              {memberRank !== MemberRank.MEMBER && (
                <div className={styles.actions}>
                  {m.rank !== MemberRank.OWNER && m.id !== userID && (
                    <>
                      <Button
                        onClick={() => onTogglePromote(m.id)}
                        kind={m.rank === MemberRank.COOWNER ? 'primary' : undefined}
                      >
                        <FontAwesomeIcon icon={faKey} />
                      </Button>
                      <Button onClick={() => onKick(m.id)}>
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
          {((memberRank === MemberRank.MEMBER || memberRank === MemberRank.COOWNER) && (
            <Button block onClick={onLeave} kind="danger">
              Csapat elhagyása
            </Button>
          )) || (
            <Button block onClick={onDeleteTeam} kind="danger">
              Csapat törlése
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

const TeamPage: React.VFC = () => {
  return (
    <>
      <Route path="/team" exact>
        <JoinTeamPage />
      </Route>
      <Route path="/team/create">
        <CreateTeamPage />
      </Route>
      <Route path="/team/manage">
        <ManageTeamPage />
      </Route>
    </>
  )
}

export default TeamPage
