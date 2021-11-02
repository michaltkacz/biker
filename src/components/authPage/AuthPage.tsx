import React from 'react';

import './authPage.less';

import Hero from '../hero/Hero';
import Auth from '../auth/Auth';

const AuthPage: React.FC = () => {
  return (
    <div className='auth-page'>
      <div className='auth-page-content'>
        <Hero />
        <Auth />
      </div>
    </div>
  );
};

export default AuthPage;
