import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useAuth } from '../../firebase/hooks/useAuth';
import Pages from '../../global/pages';

import './routePublic.less';

const RoutePublic: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={() => (!currentUser ? children : <Redirect to={Pages.Profile} />)}
    />
  );
};

export default RoutePublic;
