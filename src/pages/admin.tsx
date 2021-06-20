import React, { useContext, useState } from 'react'
import Button from '../components/button'
import { AuthContext } from '../context/auth'
import { CreateRequest } from '../proto/admin_pb'
import ProblemCard from '../components/problem-card'
import styles from '../styles/admin.module.scss'
import { AdminContext, AdminProvider } from '../context/admin'
import { Paginator, PaginatorControls} from '../components/paginator'

const InnerAdminPage: React.VFC = () => {
  const {service, data} = useContext(AdminContext)!
  const {getAccessToken} = useContext(AuthContext)
  const [activePage, setActivePage] = useState(1)

  const pageSize = 10

  const newProblem = async () => {
    service.createProblem(new CreateRequest().setAt(data.length + 1), {
      'Authorization': `Bearer: ${await getAccessToken()}`
    })
  }

  return (
    <div className={styles.container}>
      <Paginator totalItems={data.length} pageSize={pageSize} onPageSwitch={(page: number) => {
        setActivePage(page)
        window.scrollTo(0, 0)
      }}>
        <PaginatorControls />
        <Button kind="primary" onClick={async () => newProblem()}>Új</Button>
        {data.slice((activePage - 1) * pageSize, activePage * pageSize).map((problem) => (
          <ProblemCard key={problem.id} problem={problem} className={styles.card} admin />
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
