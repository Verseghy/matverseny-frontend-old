import React, { useCallback, useRef, useState } from 'react'
import { Button } from '../components'
import { CreateRequest, DeleteRequest, SwapRequest, UpdateRequest } from '../proto/admin_pb'
import { ProblemCard, Paginator, PaginatorControls } from '../components'
import styles from '../styles/admin.module.scss'
import { Problem } from '../models/problem'
import { Problem as ProblemPB } from '../proto/shared_pb'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useAuthFunctions } from '../state/auth'
import { useProblemFunctions, paginatedProblems, problemsPage } from '../state/problems'
import { adminService } from '../services'
import { useProblems } from '../hooks'

const AdminPage: React.VFC = () => {
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean | null }>({})
  const loadingIntervalRef = useRef<NodeJS.Timeout>()
  const setActivePage = useSetRecoilState(problemsPage)
  const problems = useRecoilValue(paginatedProblems)
  const { getProblemFromPos } = useProblemFunctions()
  const { getAuth, logout } = useAuthFunctions()
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
      if (loadingIntervalRef.current) clearTimeout(loadingIntervalRef.current)

      const problemPB = new ProblemPB()
        .setId(problem.id)
        .setBody(problem.body)
        .setImage(problem.image)
        .setSolution(Number(problem.solution))

      const req = new UpdateRequest().setProblem(problemPB)

      setIsLoading((state) => ({
        ...state,
        [problem.id]: true,
      }))
      await adminService.updateProblem(req, await getAuth())
      setIsLoading((state) => ({
        ...state,
        [problem.id]: false,
      }))
      loadingIntervalRef.current = setTimeout(() => {
        setIsLoading((state) => ({
          ...state,
          [problem.id]: null,
        }))
      }, 5000)
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
      <div className={styles.buttonsContainer}>
        <Button kind="primary" onClick={async () => newProblem()}>
          Új feladat
        </Button>
        <Button onClick={logout}>Kijelentkezés</Button>
      </div>
      <Paginator
        onPageSwitch={(page: number) => {
          setActivePage(page)
          window.scrollTo(0, 0)
        }}
      >
        <PaginatorControls />
        {problems.map((problem) => (
          <ProblemCard
            key={problem.id}
            admin
            problemID={problem.id}
            className={styles.card}
            onUpdate={updateProblem}
            onDelete={deleteProblem}
            onSwap={swapProblem}
            isLoading={isLoading[problem.id] ?? undefined}
          />
        ))}
        <PaginatorControls />
      </Paginator>
    </div>
  )
}

export default AdminPage
