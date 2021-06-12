import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthContext, def } from './context/auth'

const LandingPage = React.lazy(() => import('./pages/landing'))
const LoginPage = React.lazy(() => import('./pages/login'))
const RegisterPage = React.lazy(() => import('./pages/register'))
const ForgotPasswordPage = React.lazy(() => import('./pages/forgot-password'))

const App: React.FC = () => {
  return (
    <AuthContext.Provider value={def}>
      <main>
        <Router>
          <Suspense fallback={<p>Loading...</p>}>
            <Switch>
              <Route path='/' exact component={LandingPage} />
              <Route path='/login' component={LoginPage} />
              <Route path='/register' component={RegisterPage} />
              <Route path='/forgot-password' component={ForgotPasswordPage} />
            </Switch>
          </Suspense>
        </Router>
      </main>
    </AuthContext.Provider>
  );
}

export default App
