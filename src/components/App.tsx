import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.less';

import { AuthContextProvider } from '../contexts/AuthContext';
import { DatabaseContextProvider } from '../contexts/DatabaseContext';

import Pages from '../global/pages';
import PageLayout from './pageLayout/PageLayout';
import AuthPage from './authPage/AuthPage';
import TrackerPage from './trackerPage/TrackerPage';
import ProfilePage from './ProfilePage/ProfilePage';
import ActivityPage from './activityPage/ActivityPage';
import NotFoundPage from './notFoundPage/notFoundPage';

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <DatabaseContextProvider>
        <Router>
          <PageLayout>
            <Switch>
              <Route exact path={`/${Pages.Authorize}`} component={AuthPage} />
              <Route exact path={`/${Pages.Profile}`} component={ProfilePage} />
              <Route exact path={`/${Pages.Tracker}`} component={TrackerPage} />
              <Route
                exact
                path={`/${Pages.Activity}`}
                component={ActivityPage}
              />
              <Route path='/*' component={NotFoundPage} />
            </Switch>
          </PageLayout>
        </Router>
      </DatabaseContextProvider>
    </AuthContextProvider>
  );
};

export default App;
