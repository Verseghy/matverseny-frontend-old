import React, { useCallback, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import Button from '../components/button'
import { Paginator, PaginatorControls } from '../components/paginator'
import PrivateRoute from '../components/private-route'
import ProblemCard from '../components/problem-card'
import { TimeContext } from '../context/time'
import { useAuthGuard } from '../guards/auth'
import { useProblems } from '../hooks/problems'
import { Problem } from '../models/problem'
import { SetSolutionsRequest } from '../proto/competition_pb'
import { authAccessToken, authTokens } from '../state/auth'
import { competitionService, sortedProblems } from '../state/competition'
import styles from '../styles/competition.module.scss'

const CompetitionPage: React.VFC = () => {
  const [activePage, setActivePage] = useState(1)
  const {time} = useContext(TimeContext)!
  const accessToken = useRecoilValue(authAccessToken)
  const setTokens = useSetRecoilState(authTokens)
  const history = useHistory()
  const pageSize = 10
  const problems = useRecoilValue(sortedProblems)

  const pageData = problems.slice((activePage - 1) * pageSize, activePage * pageSize)

  const onUpdate = useCallback(async (problem: Problem) => {
    const solution = Number(problem.solution)
    if (isNaN(solution) || !Number.isSafeInteger(solution)) return

    const req = new SetSolutionsRequest()
      .setId(problem.id)
      .setValue(solution)
      .setDelete(problem.solution === '')
    
    await competitionService.setSolutions(req, {
      'Authorization': `Bearer: ${accessToken}`
    })
  }, [accessToken])

  const onLogout = () => {
    setTokens({
      refreshToken: '',
      accessToken: '',
    })
    // TODO: move this code
    localStorage.removeItem('refreshToken')
    history.push('/login')
  }

  return (
    <div className={styles.container}>
      <div className={styles.logoutContainer}>
        <Button to="/team" className={styles.button}>Csapat</Button>
        <span className={styles.timer}>{time}</span>
        <Button onClick={onLogout} className={styles.button}>Kijelentkezés</Button>
      </div>
      <Paginator totalItems={problems.length} pageSize={pageSize} onPageSwitch={(page: number) => {
        setActivePage(page)
        window.scrollTo(0, 0)
      }}>
        <PaginatorControls />
        <div className={styles.buttonsContainer}>
          {pageData.map((problem) => (
            <Button
              className={styles.problemButton}
              kind={problem.solution ? 'primary' : undefined}
              key={problem.id}
            >{problem.position}</Button>
          ))}
        </div>
        {pageData.map((problem) => (
          <ProblemCard
            key={problem.id}
            className={styles.card}
            problemID={problem.id}
            onUpdate={onUpdate}
          />
        ))}
        <PaginatorControls />
      </Paginator>
    </div>
  )
}

const CompetitionRoutes: React.VFC = () => {
  useProblems(competitionService)

  return (
    <React.Fragment>
      <PrivateRoute path='/competition' component={CompetitionPage} guards={[useAuthGuard]} />
      <PrivateRoute path='/team' component={CompetitionPage} guards={[useAuthGuard]} />
    </React.Fragment>
  )
}

export default CompetitionRoutes

