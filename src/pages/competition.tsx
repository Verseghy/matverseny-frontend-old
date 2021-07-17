import React, { useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import Button from '../components/button'
import { Paginator, PaginatorControls } from '../components/paginator'
import ProblemCard from '../components/problem-card'
import { Problem } from '../models/problem'
import { SetSolutionsRequest } from '../proto/competition_pb'
import { competitionService } from '../services'
import { useAuthFunctions } from '../state/auth'
import { paginatedProblems, timeString } from '../state/competition'
import { problemsPage } from '../state/problems'
import styles from '../styles/competition.module.scss'

const CompetitionPage: React.VFC = () => {
  const time = useRecoilValue(timeString)
  const problems = useRecoilValue(paginatedProblems)
  const setActivePage = useSetRecoilState(problemsPage)
  const { getAuth, logout } = useAuthFunctions()

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
        onPageSwitch={(page: number) => {
          setActivePage(page)
          window.scrollTo(0, 0)
        }}
      >
        <PaginatorControls />
        <div className={styles.buttonsContainer}>
          {problems.map((problem) => (
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
        {problems.map((problem) => (
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
