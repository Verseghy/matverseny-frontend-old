import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const LandingPage = React.lazy(() => import('./pages/landing'))
const LoginPage = React.lazy(() => import('./pages/login'))
const RegisterPage = React.lazy(() => import('./pages/register'))

const App: React.FC = () => {
  return (
    <main>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path='/' exact component={LandingPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
          </Switch>
        </Suspense>
      </Router>
    </main>
  );
}

export default App
