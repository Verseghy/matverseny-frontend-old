import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import PrivateRoute from './components/private-route'
import { changeTheme, isDarkTheme, Theme } from './utils/theme'
import { useLoginGuard } from './guards/login'
import { useAdminGuard } from './guards/admin'
import { RecoilRoot } from 'recoil'

const LandingPage = React.lazy(() => import('./pages/landing'))
const LoginPage = React.lazy(() => import('./pages/login'))
const RegisterPage = React.lazy(() => import('./pages/register'))
const ForgotPasswordPage = React.lazy(() => import('./pages/forgot-password'))
const AdminPage = React.lazy(() => import('./pages/admin'))
const CompetitionRoutes = React.lazy(() => import('./pages/competition'))

const App: React.FC = () => {
  changeTheme(isDarkTheme() ? Theme.DARK : Theme.LIGHT)

  return (
    <RecoilRoot>
      <Suspense fallback={<p>Loading...</p>}>
        <main>
          <Router>
            <Switch>
              <Route path='/' exact component={LandingPage} />
              <PrivateRoute path='/login' component={LoginPage} guards={[useLoginGuard]} />
              <Route path='/register' component={RegisterPage} />
              <Route path='/forgot-password' component={ForgotPasswordPage} />
              <PrivateRoute path='/admin' component={AdminPage} guards={[useAdminGuard]} />
              <CompetitionRoutes />
              <Redirect to="/" />
            </Switch>
          </Router>
        </main>
      </Suspense>
    </RecoilRoot>
  );
}

export default App
