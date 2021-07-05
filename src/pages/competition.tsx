import React, { useCallback, useState } from 'react'
import { useRecoilValue } from 'recoil'
import Button from '../components/button'
import { Paginator, PaginatorControls } from '../components/paginator'
import ProblemCard from '../components/problem-card'
import { Problem } from '../models/problem'
import { SetSolutionsRequest } from '../proto/competition_pb'
import { competitionService } from '../services'
import { useAuthFunctions } from '../state/auth'
import { sortedProblems, timeString } from '../state/competition'
import styles from '../styles/competition.module.scss'

const CompetitionPage: React.VFC = () => {
  const [activePage, setActivePage] = useState(1)
  const time = useRecoilValue(timeString)
  const pageSize = 10
  const problems = useRecoilValue(sortedProblems)
  const { getAuth, logout } = useAuthFunctions()

  const pageData = problems.slice((activePage - 1) * pageSize, activePage * pageSize)

  const onUpdate = useCallback(
    async (problem: Problem) => {
      const solution = Number(problem.solution)
      if (isNaN(solution) || !Number.isSafeInteger(solution)) return

      const req = new SetSolutionsRequest()
        .setId(problem.id)
        .setValue(solution)
        .setDelete(problem.solution === '')

      await competitionService.setSolutions(req, await getAuth())
    },
    [getAuth]
  )

  return (
    <div className={styles.container}>
      <div className={styles.logoutContainer}>
        <Button to="/team" className={styles.button}>
          Csapat
        </Button>
        <span className={styles.timer}>{time}</span>
        <Button onClick={logout} className={styles.button}>
          Kijelentkezés
        </Button>
      </div>
      <Paginator
        totalItems={problems.length}
        pageSize={pageSize}
        onPageSwitch={(page: number) => {
          setActivePage(page)
          window.scrollTo(0, 0)
        }}
      >
        <PaginatorControls />
        <div className={styles.buttonsContainer}>
          {pageData.map((problem) => (
            <Button
              className={styles.problemButton}
              kind={problem.solution ? 'primary' : undefined}
              key={problem.id}
              onClick={() => {
                window.scrollTo({
                  top: document.getElementById(`card_${problem.id}`)!.offsetTop - 24,
                  behavior: 'smooth',
                })
                const input = document.querySelector(
                  `#card_${problem.id} input`
                ) as HTMLInputElement
                input.focus({
                  preventScroll: true,
                })
              }}
            >
              {problem.position}
            </Button>
          ))}
        </div>
        {pageData.map((problem) => (
          <ProblemCard
            id={`card_${problem.id}`}
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

export default CompetitionPage
