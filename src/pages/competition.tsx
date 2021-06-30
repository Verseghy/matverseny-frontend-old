import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import Button from '../components/button'
import { Paginator, PaginatorControls } from '../components/paginator'
import PrivateRoute from '../components/private-route'
import ProblemCard from '../components/problem-card'
import { useAuthGuard } from '../guards/auth'
import { useProblems } from '../hooks/problems'
import { useTime } from '../hooks/time'
import { Problem } from '../models/problem'
import { SetSolutionsRequest } from '../proto/competition_pb'
import { useAuthFunctions } from '../state/auth'
import { competitionService, sortedProblems, timeString } from '../state/competition'
import styles from '../styles/competition.module.scss'

const CompetitionPage: React.VFC = () => {
  const [activePage, setActivePage] = useState(1)
  const time = useRecoilValue(timeString)
  const history = useHistory()
  const pageSize = 10
  const problems = useRecoilValue(sortedProblems)
  const {getAuth, logout} = useAuthFunctions()

  const pageData = problems.slice((activePage - 1) * pageSize, activePage * pageSize)

  const onUpdate = useCallback(async (problem: Problem) => {
    const solution = Number(problem.solution)
    if (isNaN(solution) || !Number.isSafeInteger(solution)) return

    const req = new SetSolutionsRequest()
      .setId(problem.id)
      .setValue(solution)
      .setDelete(problem.solution === '')
    
    await competitionService.setSolutions(req, await getAuth())
  }, [])

  const onLogout = () => {
    logout()
    // TODO: move this code
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
  useTime()

  return (
    <React.Fragment>
      <PrivateRoute path='/competition' component={CompetitionPage} guards={[useAuthGuard]} />
      <PrivateRoute path='/team' component={CompetitionPage} guards={[useAuthGuard]} />
    </React.Fragment>
  )
}

export default CompetitionRoutes

