import React, { useContext } from 'react'
import Button from '../components/button'
import { AuthContext } from '../context/auth'
import { useProblems } from '../hooks/problems'
import { AdminClient } from '../proto/AdminServiceClientPb'
import { CreateRequest } from '../proto/admin_pb'
import ProblemCard from '../components/problem'
import styles from '../styles/admin.module.scss'

const service = new AdminClient('http://localhost:8080', null, null)

const AdminPage: React.VFC = () => {
  const { getAccessToken } = useContext(AuthContext)
  const data = useProblems(service)

  const newProblem = async (at: number) => {
    service.createProblem(new CreateRequest().setAt(at), {
      'Authorization': `Bearer: ${await getAccessToken()}`
    })
  }
  
  return (
    <div className={styles.container}>
      <Button primary onClick={async () => newProblem(1)}>Add problem</Button>
      {data.map((problem) => (
        <ProblemCard key={problem.id} problem={problem} className={styles.card} />
      ))}
    </div>
  )
}

export default AdminPage
