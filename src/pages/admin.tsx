import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../components'
import { CreateRequest, DeleteRequest, SwapRequest, UpdateRequest } from '../proto/admin_pb'
import { ProblemCard, Paginator, PaginatorControls } from '../components'
import styles from '../styles/admin.module.scss'
import { Problem } from '../models/problem'
import { Problem as ProblemPB } from '../proto/shared_pb'
import { getProblemFromPos, paginatedProblems, problemsPage } from '../state/problems'
import { adminService } from '../services'
import { logout } from '../state/auth'
import { useAtom } from 'yauk/react'
import { setAtomValue } from 'yauk'
import { store } from '../state/store'
import { getProblemsService } from '../services/problems'

const AdminPage: React.VFC = () => {
  const [isLoading, setIsLoading] = useState<{ [key: string]: boolean | null }>({})
  const loadingIntervalRef = useRef<NodeJS.Timeout>()
  const problems = useAtom(paginatedProblems)

  useEffect(() => {
    const problemsService = getProblemsService(adminService)
    problemsService.start()
    return () => problemsService.stop()
  }, [])

  const newProblem = async () => {
    adminService.createProblem(new CreateRequest().setAt(problems.length + 1), null)
  }

  const deleteProblem = useCallback(async (id: string) => {
    const req = new DeleteRequest().setId(id)

    await adminService.deleteProblem(req, null)
  }, [])

  const updateProblem = useCallback(async (problem: Problem) => {
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
    await adminService.updateProblem(req, null)
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
  }, [])

  const swapProblem = useCallback(async (posA: number, posB: number) => {
    const problemA = await getProblemFromPos(posA)
    const problemB = await getProblemFromPos(posB)

    if (!problemA || !problemB) return

    const req = new SwapRequest().setA(problemA.id).setB(problemB.id)

    await adminService.swapProblem(req, null)
  }, [])

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
          setAtomValue(store, problemsPage, page)
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
