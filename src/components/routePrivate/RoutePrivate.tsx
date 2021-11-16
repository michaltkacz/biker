import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useAuth } from '../../firebase/hooks/useAuth';
import Pages from '../../global/pages';

import './routePrivate.less';

const RoutePrivate: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={() =>
        currentUser ? children : <Redirect to={Pages.Authorize} />
      }
    />
  );
};

export default RoutePrivate;
