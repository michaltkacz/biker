import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import '../styles/App.less';

import AuthPage from './authentication/AuthPage';
import RecordingPage from './recording/RecordingPage';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <AuthPage />
        </Route>
        <Route exact path='/record'>
          <RecordingPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
