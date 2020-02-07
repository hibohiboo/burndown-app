import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link, Redirect,
} from 'react-router-dom';
import Helmet from 'react-helmet';
import AppBurnDownView from './AppBurnDownView';

const App: React.FC = () => {
  return   <div className="App">
  <Helmet>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
    <title>BurnDown App</title>
  </Helmet>
  <Router>
    <header>
      <Link to="/burndown">BurnDown</Link>
      |
      <Link to="/velocity">Velocity</Link>
      |
      <Link to="/taskboard">TaskBoard</Link>
    </header>
    <Switch>

      <Route exact path="/">
        <Redirect to="/burndown" />
      </Route>
      <Route path="/burndown">
          <AppBurnDownView />
      </Route>
      <Route path="/*">
        <p>404</p>
      </Route>
    </Switch>
  </Router>
</div>;
};

export default App;