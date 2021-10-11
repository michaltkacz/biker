import { Typography } from 'antd';
import React, { useEffect } from 'react';

import { startFirebaseUI, elementID } from '../../firebase/firebaseUI';

import './auth.less';

const Auth: React.FC = () => {
  useEffect(() => {
    startFirebaseUI();
  }, []);

  return (
    <div className='auth'>
      <div className='auth-wrapper'>
        <Typography.Title level={2}>Sign In</Typography.Title>
        <div id={elementID} className='auth-widget'></div>
      </div>
    </div>
  );
};

export default Auth;
