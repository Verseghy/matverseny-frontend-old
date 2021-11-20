import React, { useCallback, useEffect } from 'react'
import { useAtom, useSetAtom } from 'yauk/react'
import { Button } from '../components'
import { ProblemCard, Paginator, PaginatorControls } from '../components'
import { Problem } from '../models/problem'
import { SetSolutionsRequest } from '../proto/competition_pb'
import { competitionService } from '../services'
import { clockService } from '../services/clock'
import { getProblemsService } from '../services/problems'
import { solutionsService } from '../services/solutions'
import { logout } from '../state/auth'
import { paginatedProblems, timeString } from '../state/competition'
import { problemsPage } from '../state/problems'
import styles from '../styles/competition.module.scss'
import { wait } from '../utils/retry'

interface QuickProblemButtonProps {
  problem: Problem
}

const QuickProblemButton: React.VFC<QuickProblemButtonProps> = ({ problem }) => {
  return (
    <Button
      className={styles.problemButton}
      kind={problem.solution ? 'primary' : undefined}
      key={problem.id}
      onClick={() => {
        window.scrollTo({
          top: document.getElementById(`card_${problem.id}`)!.offsetTop - 24,
          behavior: 'smooth',
        })
        const input = document.querySelector(`#card_${problem.id} input`) as HTMLInputElement
        input.focus({
          preventScroll: true,
        })
      }}
    >
      {problem.position}
    </Button>
  )
}

const Timer: React.VFC = () => {
  const time = useAtom(timeString)

  useEffect(() => {
    clockService.start()
  }, [])

  return <span className={styles.timer}>{time}</span>
}

const CompetitionPage: React.VFC = () => {
  const problems = useAtom(paginatedProblems)
  const setActivePage = useSetAtom(problemsPage)

  useEffect(() => {
    const problemsService = getProblemsService(competitionService)
    problemsService.start()
    solutionsService.start()
  }, [])

  const onUpdate = useCallback(async (problem: Problem) => {
    const req = new SetSolutionsRequest()
      .setId(problem.id)
      .setValue(Number(problem.solution))
      .setDelete(problem.solution === '')

    for (let i = 0; i < 7; ++i) {
      try {
        await competitionService.setSolutions(req, null)
        break
      } catch (err: any) {
        if (i === 6) {
          alert('Ismeretlen hiba történt a válasz mentése közben! Az oldal újra fog tölteni!')
          window.location.reload()
        }
        await wait(500 * 2 ** i)
      }
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.logoutContainer}>
        <Button to="/team/manage" className={styles.button}>
          Csapat
        </Button>
        <Timer />
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
            <QuickProblemButton key={problem.id} problem={problem} />
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
