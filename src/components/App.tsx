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
import ActivitiesPage from './activitiesPage/ActivitiesPage';
import RoutePublic from './routePublic/RoutePublic';
import RoutePrivate from './routePrivate/RoutePrivate';

const App: React.FC = () => {
  return (
    <Router>
      <AuthContextProvider>
        <PageLayout>
          <Switch>
            <RoutePublic exact path={`/${Pages.Authorize}`}>
              <AuthPage />
            </RoutePublic>
            <RoutePrivate exact path={`/${Pages.Profile}`}>
              <ProfilePage />
            </RoutePrivate>
            <RoutePrivate exact path={`/${Pages.Tracker}`}>
              <TrackerPage />
            </RoutePrivate>
            <RoutePrivate exact path={`/${Pages.Activities}`}>
              <ActivitiesPage />
            </RoutePrivate>
            <Route path='/*' component={NotFoundPage} />
          </Switch>
        </PageLayout>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
