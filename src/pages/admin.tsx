import React, { useCallback, useContext, useState } from 'react'
import Button from '../components/button'
import { AuthContext } from '../context/auth'
import { CreateRequest, DeleteRequest, SwapRequest, UpdateRequest } from '../proto/admin_pb'
import ProblemCard from '../components/problem-card'
import styles from '../styles/admin.module.scss'
import { AdminContext, AdminProvider } from '../context/admin'
import { Paginator, PaginatorControls} from '../components/paginator'
import { Problem } from '../models/problem'
import { Problem as ProblemPB } from '../proto/shared_pb'

const InnerAdminPage: React.VFC = () => {
  const {service, findProblemFromPos, data} = useContext(AdminContext)!
  const {getAccessToken} = useContext(AuthContext)
  const [activePage, setActivePage] = useState(1)

  const pageSize = 10

  const newProblem = async () => {
    service.createProblem(new CreateRequest().setAt(data.length + 1), {
      'Authorization': `Bearer: ${await getAccessToken()}`
    })
  }

  const deleteProblem = useCallback(async (id: string) => {
    const req = new DeleteRequest()
      .setId(id)

    await service.deleteProblem(req, {
      'Authorization': `Bearer: ${await getAccessToken()}`
    })
  }, [service, getAccessToken])

  const updateProblem = useCallback(async (problem: Problem) => {
    const problemPB = new ProblemPB()
      .setId(problem.id!)
      .setBody(problem.body!)
      .setImage(problem.image!)
    
    if (problem.solution !== '') {
      const value = Number(problem.solution)
      if (!isNaN(value) && Number.isSafeInteger(value)) {
        problemPB.setSolution(value)
      }
    }
    
    const req = new UpdateRequest()
      .setProblem(problemPB)
    
    await service.updateProblem(req, {
      'Authorization': `Bearer: ${await getAccessToken()}`
    })
  }, [service, getAccessToken])

  const swapProblem = useCallback(async (posA: number, posB: number) => {
    const problemA = findProblemFromPos(posA)
    const problemB = findProblemFromPos(posB)

    if (!problemA || !problemB) return

    const req = new SwapRequest()
      .setA(problemA.id)
      .setB(problemB.id)

    await service.swapProblem(req, {
      'Authorization': `Bearer: ${await getAccessToken()}`
    })
  }, [service, getAccessToken, findProblemFromPos])

  return (
    <div className={styles.container}>
      <Paginator totalItems={data.length} pageSize={pageSize} onPageSwitch={(page: number) => {
        setActivePage(page)
        window.scrollTo(0, 0)
      }}>
        <PaginatorControls />
        <Button kind="primary" onClick={async () => newProblem()}>Új</Button>
        {data.slice((activePage - 1) * pageSize, activePage * pageSize).map((problem) => (
          <ProblemCard
            key={problem.id}
            admin
            totalItems={data.length}
            problem={problem}
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
