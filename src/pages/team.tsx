import { useState } from 'react'
import { HashRouter, Route, Switch, useHistory } from 'react-router-dom'
import { Button, Card, ErrorMessage, Input } from '../components'
import { JoinTeamRequest } from '../proto/team_pb'
import { teamService } from '../services'
import { useAuthFunctions } from '../state/auth'
import styles from '../styles/team.module.scss'

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

const TeamPage: React.VFC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact>
          <JoinTeamPage />
        </Route>
      </Switch>
    </HashRouter>
  )
}

export default TeamPage
