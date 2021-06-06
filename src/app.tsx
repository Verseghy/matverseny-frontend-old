import React, { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const LandingPage = React.lazy(() => import('./pages/landing'))

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path='/' exact component={LandingPage} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App
