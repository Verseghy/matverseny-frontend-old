import React, { useCallback, useContext, useState } from 'react'
import Button from '../components/button'
import { CreateRequest, DeleteRequest, SwapRequest, UpdateRequest } from '../proto/admin_pb'
import ProblemCard from '../components/problem-card'
import styles from '../styles/admin.module.scss'
import { AdminContext, AdminProvider } from '../context/admin'
import { Paginator, PaginatorControls} from '../components/paginator'
import { Problem } from '../models/problem'
import { Problem as ProblemPB } from '../proto/shared_pb'
import { useRecoilValue } from 'recoil'
import { useAuthFunctions } from '../state/auth'
import { sortedProblemIDs, useProblemFunctions } from '../state/problems'

const InnerAdminPage: React.VFC = () => {
  const {service} = useContext(AdminContext)!
  const [activePage, setActivePage] = useState(1)
  const problems = useRecoilValue(sortedProblemIDs)
  const {getProblemFromPos} = useProblemFunctions()
  const {getAuth} = useAuthFunctions()

  const pageSize = 10

  const newProblem = async () => {
    service.createProblem(new CreateRequest().setAt(problems.length + 1), await getAuth())
  }

  const deleteProblem = useCallback(async (id: string) => {
    const req = new DeleteRequest()
      .setId(id)

    await service.deleteProblem(req, await getAuth())
  }, [service])

  const updateProblem = useCallback(async (problem: Problem) => {
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
    
    const req = new UpdateRequest()
      .setProblem(problemPB)
    
    await service.updateProblem(req, await getAuth())
  }, [service])

  const swapProblem = useCallback(async (posA: number, posB: number) => {
    const problemA = await getProblemFromPos(posA)
    const problemB = await getProblemFromPos(posB)
    
    if (!problemA || !problemB) return
    
    const req = new SwapRequest()
      .setA(problemA.id)
      .setB(problemB.id)
    
    await service.swapProblem(req, await getAuth())
  }, [service])

  return (
    <div className={styles.container}>
      <Paginator totalItems={problems.length} pageSize={pageSize} onPageSwitch={(page: number) => {
        setActivePage(page)
        window.scrollTo(0, 0)
      }}>
        <PaginatorControls />
        <Button kind="primary" onClick={async () => newProblem()}>Új</Button>
        {problems.slice((activePage - 1) * pageSize, activePage * pageSize).map((problem) => (
          <ProblemCard
            key={problem}
            admin
            problemID={problem}
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

const AdminPage: React.VFC = () => {
  return (
    <AdminProvider>
      <InnerAdminPage />
    </AdminProvider>
  )
}

export default AdminPage
