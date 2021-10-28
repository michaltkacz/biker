import React from 'react';

import './authPage.less';

import Hero from '../hero/Hero';
import Auth from '../auth/Auth';

const AuthPage: React.FC = () => {
  return (
    <div className='auth-page'>
      <div className='content-wrapper'>
        <Hero />
        <Auth />
      </div>
    </div>
  );
};

export default AuthPage;
