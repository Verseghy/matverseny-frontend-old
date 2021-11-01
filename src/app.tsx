import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { changeTheme, isDarkTheme, Theme } from './utils/theme'
import { useAuthGuard } from './guards/auth'
import { TimeState } from './models/time'
import { useTimeGuard } from './guards/time'
import { useLoginGuard } from './guards/login'
import { useAdminGuard } from './guards/admin'
import { GuardedRoute } from './components'
import { Provider } from 'yauk/react'
import { store } from './state/store'

const LandingPage = React.lazy(() => import('./pages/landing'))
const LoginPage = React.lazy(() => import('./pages/login'))
const RegisterPage = React.lazy(() => import('./pages/register'))
const ForgotPasswordPage = React.lazy(() => import('./pages/forgot-password'))
const AdminPage = React.lazy(() => import('./pages/admin'))
const CompetitionPage = React.lazy(() => import('./pages/competition'))
const WaitPage = React.lazy(() => import('./pages/wait'))
const EndPage = React.lazy(() => import('./pages/end'))
const TeamPage = React.lazy(() => import('./pages/team'))
const SuperAdminPage = React.lazy(() => import('./pages/superadmin'))

const LoginRoute: React.VFC = () => {
  const loginGuard = useLoginGuard()
  return <GuardedRoute guards={[loginGuard]} component={LoginPage} />
}

const RegisterRoute: React.VFC = () => {
  const loginGuard = useLoginGuard()
  return <GuardedRoute guards={[loginGuard]} component={RegisterPage} />
}

const AdminRoute: React.VFC = () => {
  const adminGuard = useAdminGuard()
  return <GuardedRoute guards={[adminGuard]} component={AdminPage} />
}

interface CompetitionPageProps {
  component: React.ComponentType<any>
  state: TimeState
}

const CompetitionRoute: React.VFC<CompetitionPageProps> = ({ component, state }) => {
  const authGuard = useAuthGuard()
  const timeGuard = useTimeGuard(state)

  return <GuardedRoute guards={[authGuard, timeGuard]} component={component} />
}

const TeamRoute: React.VFC = () => {
  const authGuard = useAuthGuard()
  return <GuardedRoute guards={[authGuard]} component={TeamPage} />
}

const App: React.FC = () => {
  changeTheme(isDarkTheme() ? Theme.DARK : Theme.LIGHT)

  return (
    <Provider store={store}>
      <Suspense fallback={<p>Loading...</p>}>
        <main>
          <Router>
            <Switch>
              <Route path="/" exact>
                <LandingPage />
              </Route>
              <Route path="/login">
                <LoginRoute />
              </Route>
              <Route path="/register">
                <RegisterRoute />
              </Route>
              <Route path="/forgot-password">
                <ForgotPasswordPage />
              </Route>
              <Route path="/admin">
                <AdminRoute />
              </Route>
              <Route path="/wait">
                <CompetitionRoute component={WaitPage} state={TimeState.BEFORE_COMP} />
              </Route>
              <Route path="/competition">
                <CompetitionRoute component={CompetitionPage} state={TimeState.IN_COMP} />
              </Route>
              <Route path="/end">
                <CompetitionRoute component={EndPage} state={TimeState.AFTER_COMP} />
              </Route>
              <Route path="/team">
                <TeamRoute />
              </Route>
              <Route path="/superadmin">
                <SuperAdminPage />
              </Route>
              <Redirect to="/" />
            </Switch>
          </Router>
        </main>
      </Suspense>
    </Provider>
  )
}

export default App
