import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './context/auth'
import PrivateRoute, { Claims } from './components/private-route'
import { changeTheme, isDarkTheme, Theme } from './utils/theme'

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
              <Route path='/login' component={LoginPage} />
              <Route path='/register' component={RegisterPage} />
              <Route path='/forgot-password' component={ForgotPasswordPage} />
              <PrivateRoute path='/admin' component={AdminPage} claims={Claims.ADMIN} />
              <PrivateRoute path='/competition' component={CompetitionPage} claims={Claims.HAS_TEAM} />
            </Switch>
          </Suspense>
        </Router>
      </main>
    </AuthProvider>
  );
}

export default App
