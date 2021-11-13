import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.less';

import { AuthContextProvider } from '../firebase/contexts/AuthContext';

import Pages from '../global/pages';
import PageLayout from './pageLayout/PageLayout';
import AuthPage from './authPage/AuthPage';
import TrackerPage from './trackerPage/TrackerPage';
import ProfilePage from './profilePage/ProfilePage';
import NotFoundPage from './notFoundPage/notFoundPage';
import ActivitiesTransferPage from './activitiesTransferPage/ActivitiesTransferPage';
import ActivitiesHistoryPage from './activitiesHistoryPage/ActivitiesHistoryPage';

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <Router>
        <PageLayout>
          <Switch>
            <Route exact path={`/${Pages.Authorize}`} component={AuthPage} />
            <Route exact path={`/${Pages.Profile}`} component={ProfilePage} />
            <Route exact path={`/${Pages.Tracker}`} component={TrackerPage} />
            <Route
              exact
              path={`/${Pages.ActivitiesHistory}`}
              component={ActivitiesHistoryPage}
            />
            <Route
              exact
              path={`/${Pages.ActivitiesTransfer}`}
              component={ActivitiesTransferPage}
            />
            <Route path='/*' component={NotFoundPage} />
          </Switch>
        </PageLayout>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
