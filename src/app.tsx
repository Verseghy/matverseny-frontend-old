import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const LandingPage = React.lazy(() => import('./pages/landing'))

const App: React.FC = () => {
  return (
    <main>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path='/' exact component={LandingPage} />
          </Switch>
        </Suspense>
      </Router>
    </main>
  );
}

export default App
