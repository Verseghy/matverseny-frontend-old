import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { AuthProvider } from './context/auth'
import PrivateRoute from './components/private-route'
import { changeTheme, isDarkTheme, Theme } from './utils/theme'
import { useAuthGuard } from './guards/auth'
import { useLoginGuard } from './guards/login'
import { useAdminGuard } from './guards/admin'

const LandingPage = React.lazy(() => import('./pages/landing'))
const LoginPage = React.lazy(() => import('./pages/login'))
const RegisterPage = React.lazy(() => import('./pages/register'))
const ForgotPasswordPage = React.lazy(() => import('./pages/forgot-password'))
const AdminPage = React.lazy(() => import('./pages/admin'))
const CompetitionPage = React.lazy(() => import('./pages/competition'))

const App: React.FC = () => {
  changeTheme(isDarkTheme() ? Theme.DARK : Theme.LIGHT)

  return (
    <AuthProvider>
      <main>
        <Router>
          <Suspense fallback={<p>Loading...</p>}>
            <Switch>
              <Route path='/' exact component={LandingPage} />
              <PrivateRoute path='/login' component={LoginPage} guards={[useLoginGuard]} />
              <Route path='/register' component={RegisterPage} />
              <Route path='/forgot-password' component={ForgotPasswordPage} />
              <PrivateRoute path='/admin' component={AdminPage} guards={[useAdminGuard]} />
              <PrivateRoute path='/competition' component={CompetitionPage} guards={[useAuthGuard]} />
              <Redirect to="/" />
            </Switch>
          </Suspense>
        </Router>
      </main>
    </AuthProvider>
  );
}

export default App
