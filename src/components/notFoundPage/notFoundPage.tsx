import React from 'react';
import { Button, Result } from 'antd';

import { useHistory } from 'react-router-dom';
import { useAuth } from './../../hooks/useAuth';

import Pages from '../../global/pages';

import './notFoundPage.less';

const NotFoundPage = () => {
  const history = useHistory();
  const { currentUser } = useAuth();

  const handleRedirect = () => {
    if (currentUser) {
      history.push(Pages.Profile);
      return;
    }
    history.push(Pages.Authorize);
  };

  return (
    <div className='not-found-page'>
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={
          <Button type='primary' onClick={handleRedirect}>
            Back to Safe Place
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
