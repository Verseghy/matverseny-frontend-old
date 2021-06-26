import React, { useCallback, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../components/button'
import { Paginator, PaginatorControls } from '../components/paginator'
import ProblemCard from '../components/problem-card'
import { AuthContext } from '../context/auth'
import { CompetitionContext, CompetitionProvider } from '../context/competition'
import { TimeContext } from '../context/time'
import { Problem } from '../models/problem'
import { SetSolutionsRequest } from '../proto/competition_pb'
import styles from '../styles/competition.module.scss'

const CompetitionPageInner: React.VFC = () => {
  const {service, data, solutions} = useContext(CompetitionContext)!
  const {getAccessToken, logout} = useContext(AuthContext)!
  const [activePage, setActivePage] = useState(1)
  const {time} = useContext(TimeContext)!
  const history = useHistory()
  const pageSize = 10

  const pageData = data.slice((activePage - 1) * pageSize, activePage * pageSize)

  const onUpdate = useCallback(async (problem: Problem) => {
    const solution = Number(problem.solution)
    if (isNaN(solution) || !Number.isSafeInteger(solution)) return

    const req = new SetSolutionsRequest()
      .setId(problem.id)
      .setValue(solution)
      .setDelete(problem.solution === '')
    
    await service.setSolutions(req, {
      'Authorization': `Bearer: ${await getAccessToken()}`
    })
  }, [getAccessToken])

  const onLogout = () => {
    logout()
    history.push('/login')
  }

  return (
    <div className={styles.container}>
      <div className={styles.logoutContainer}>
        <Button className={styles.button}>Csapat</Button>
        <span className={styles.timer}>{time}</span>
        <Button onClick={onLogout} className={styles.button}>Kijelentkezés</Button>
      </div>
      <Paginator totalItems={data.length} pageSize={pageSize} onPageSwitch={(page: number) => {
        setActivePage(page)
        window.scrollTo(0, 0)
      }}>
        <PaginatorControls />
        <div className={styles.buttonsContainer}>
          {pageData.map((problem) => (
            <Button
              className={styles.problemButton}
              kind={solutions[problem.id] ? 'primary' : undefined}
              key={problem.id}
            >{problem.position}</Button>
          ))}
        </div>
        {pageData.map((problem) => (
          <ProblemCard
            key={problem.id}
            className={styles.card}
            problem={problem}
            solutions={solutions}
            totalItems={data.length}
            onUpdate={onUpdate}
          />
        ))}
        <PaginatorControls />
      </Paginator>
    </div>
  )
}

const CompetitionPage: React.VFC = () => {
  return (
    <CompetitionProvider>
      <CompetitionPageInner />
    </CompetitionProvider>
  )
}

export default CompetitionPage

