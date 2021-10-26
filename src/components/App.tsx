import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.less';

import { AuthContextProvider } from '../contexts/AuthContext';

import Pages from '../global/pages';
import GlobalPageLayout from './globalPageLayout/GlobalPageLayout';
import AuthPage from './authPage/AuthPage';
import TrackerPage from './trackerPage/TrackerPage';
import ProfilePage from './ProfilePage/ProfilePage';
import ActivityPage from './activityPage/ActivityPage';

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path='/'>
            <AuthPage />
          </Route>
          <GlobalPageLayout>
            <Route exact path={`/${Pages.Profile}`}>
              <ProfilePage />
            </Route>
            <Route exact path={`/${Pages.Tracker}`}>
              <TrackerPage />
            </Route>
            <Route exact path={`/${Pages.Activity}`}>
              <ActivityPage />
            </Route>
          </GlobalPageLayout>
          <Route path='*'>
            <AuthPage />
          </Route>
        </Switch>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
