import React, { useCallback } from 'react'
import { Button } from '../components'
import { CreateRequest, DeleteRequest, SwapRequest, UpdateRequest } from '../proto/admin_pb'
import { ProblemCard } from '../components'
import styles from '../styles/admin.module.scss'
import { Paginator, PaginatorControls } from '../components/paginator'
import { Problem } from '../models/problem'
import { Problem as ProblemPB } from '../proto/shared_pb'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useAuthFunctions } from '../state/auth'
import { useProblemFunctions, paginatedProblems, problemsPage } from '../state/problems'
import { adminService } from '../services'
import { useProblems } from '../hooks/problems'

const AdminPage: React.VFC = () => {
  const setActivePage = useSetRecoilState(problemsPage)
  const problems = useRecoilValue(paginatedProblems)
  const { getProblemFromPos } = useProblemFunctions()
  const { getAuth } = useAuthFunctions()
  useProblems(adminService)

  const newProblem = async () => {
    adminService.createProblem(new CreateRequest().setAt(problems.length + 1), await getAuth())
  }

  const deleteProblem = useCallback(
    async (id: string) => {
      const req = new DeleteRequest().setId(id)

      await adminService.deleteProblem(req, await getAuth())
    },
    [getAuth]
  )

  const updateProblem = useCallback(
    async (problem: Problem) => {
      const problemPB = new ProblemPB()
        .setId(problem.id)
        .setBody(problem.body)
        .setImage(problem.image)

      if (problem.solution !== '') {
        const value = Number(problem.solution)
        if (!isNaN(value) && Number.isSafeInteger(value)) {
          problemPB.setSolution(value)
        }
      }

      const req = new UpdateRequest().setProblem(problemPB)

      await adminService.updateProblem(req, await getAuth())
    },
    [getAuth]
  )

  const swapProblem = useCallback(
    async (posA: number, posB: number) => {
      const problemA = await getProblemFromPos(posA)
      const problemB = await getProblemFromPos(posB)

      if (!problemA || !problemB) return

      const req = new SwapRequest().setA(problemA.id).setB(problemB.id)

      await adminService.swapProblem(req, await getAuth())
    },
    [getAuth, getProblemFromPos]
  )

  return (
    <div className={styles.container}>
      <Paginator
        onPageSwitch={(page: number) => {
          setActivePage(page)
          window.scrollTo(0, 0)
        }}
      >
        <PaginatorControls />
        <Button kind="primary" onClick={async () => newProblem()}>
          Új
        </Button>
        {problems.map((problem) => (
          <ProblemCard
            key={problem.id}
            admin
            problemID={problem.id}
            className={styles.card}
            onUpdate={updateProblem}
            onDelete={deleteProblem}
            onSwap={swapProblem}
          />
        ))}
        <PaginatorControls />
      </Paginator>
    </div>
  )
}

export default AdminPage
