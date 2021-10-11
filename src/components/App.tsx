import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.less';

import { AuthContextProvider } from '../firebase/AuthContext';
import AuthPage from './authPage/AuthPage';
import TrackerPage from './trackerPage/TrackerPage';

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path='/'>
            <AuthPage />
          </Route>
          <Route exact path='/record'>
            <TrackerPage />
          </Route>
          <Route path='*'>
            <AuthPage />
          </Route>
        </Switch>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
