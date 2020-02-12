import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link, Redirect,
} from 'react-router-dom';
import Helmet from 'react-helmet';
import Modal from 'react-modal';
import AppBurnDownView from './burndown/AppBurnDownView';
import AppVelocityView from './AppVelocityView';
import AppTaskBoardView from './taskborad/AppTaskBoardView';
import AppLogin from './AppLogin';
import { useAuthed, useBoard } from '../modules/userModule';

Modal.setAppElement('#root');

const App: React.FC = () => {
  const authed = useAuthed();
  const board = useBoard();

  return   <div className="App">
  <Helmet>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
    <title>BurnDown App</title>
  </Helmet>
  <Router>
  {authed && (
    <header>
      <Link to={`/board/${board}/burndown`}>BurnDown</Link>
      |
      <Link to={`/board/${board}/velocity`}>Velocity</Link>
      |
      <Link to={`/board/${board}/taskboard`}>TaskBoard</Link>
    </header>
  )}
        <Switch>
          <Route path="/board/:boardId/login" component={AppLogin} />
          <PrivateRoute exact authed={authed} path="/board/:boardId/">
            <Redirect to="burndown" />
          </PrivateRoute>
          <PrivateRoute authed={authed} path="/board/:boardId/burndown">
            <AppBurnDownView />
          </PrivateRoute>
          <PrivateRoute authed={authed} path="/board/:boardId/velocity">
            <AppVelocityView />
          </PrivateRoute>
          <PrivateRoute authed={authed} path="/board/:boardId/taskboard">
            <AppTaskBoardView />
          </PrivateRoute>
          <Route path="/*">
            <p>404</p>
          </Route>
        </Switch>
  </Router>
</div>;
};

export default App;

function PrivateRoute(prop: any) {
  const {
    children, authed, computedMatch, ...rest
  } = prop;

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={({ location }) => (authed ? (
        children
      ) : (
          <Redirect
            to={{
              pathname: `/board/${computedMatch.params.boardId}/login`,
              state: { from: location },
            }}
          />
        ))}
    />
  );
}
