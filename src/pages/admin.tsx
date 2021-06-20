import React, { useContext } from 'react'
import Button from '../components/button'
import { AuthContext } from '../context/auth'
import { CreateRequest } from '../proto/admin_pb'
import ProblemCard from '../components/problem-card'
import styles from '../styles/admin.module.scss'
import { AdminContext, AdminProvider } from '../context/admin'

const InnerAdminPage: React.VFC = () => {
  const {service, data} = useContext(AdminContext)!
  const {getAccessToken} = useContext(AuthContext)

  const newProblem = async () => {
    service.createProblem(new CreateRequest().setAt(data.length + 1), {
      'Authorization': `Bearer: ${await getAccessToken()}`
    })
  }

  return (
    <div className={styles.container}>
      <Button kind="primary" onClick={async () => newProblem()}>Új</Button>
      {data.map((problem) => (
        <ProblemCard key={problem.id} problem={problem} className={styles.card} admin />
      ))}
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
