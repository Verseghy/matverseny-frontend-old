import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import PrivateRoute from './components/private-route'
import { changeTheme, isDarkTheme, Theme } from './utils/theme'
import { useLoginGuard } from './guards/login'
import { useAdminGuard } from './guards/admin'
import { useAuthGuard } from './guards/auth'
import CompetitionService from './services/competition'
import { TimeState } from './models/time'
import { useTimeGuard } from './guards/time'

const LandingPage = React.lazy(() => import('./pages/landing'))
const LoginPage = React.lazy(() => import('./pages/login'))
const RegisterPage = React.lazy(() => import('./pages/register'))
const ForgotPasswordPage = React.lazy(() => import('./pages/forgot-password'))
const AdminPage = React.lazy(() => import('./pages/admin'))
const CompetitionPage = React.lazy(() => import('./pages/competition'))
const WaitPage = React.lazy(() => import('./pages/wait'))

const App: React.FC = () => {
  changeTheme(isDarkTheme() ? Theme.DARK : Theme.LIGHT)

  const adminGuard = useAdminGuard()
  const loginGuard = useLoginGuard()
  const authGuard = useAuthGuard()
  const waitGuard = useTimeGuard(TimeState.BEFORE_COMP)
  const competitionGuard = useTimeGuard(TimeState.IN_COMP)

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <main>
        <Router>
          <CompetitionService />
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <PrivateRoute path="/login" component={LoginPage} guards={[loginGuard]} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/forgot-password" component={ForgotPasswordPage} />
            <PrivateRoute path="/admin" component={AdminPage} guards={[adminGuard]} />
            <PrivateRoute path="/wait" component={WaitPage} guards={[authGuard, waitGuard]} />
            <PrivateRoute
              path="/competition"
              component={CompetitionPage}
              guards={[authGuard, competitionGuard]}
            />
            <PrivateRoute
              path="/team"
              component={() => null}
              guards={[authGuard, competitionGuard]}
            />
            <Redirect to="/" />
          </Switch>
        </Router>
      </main>
    </Suspense>
  )
}

export default App
