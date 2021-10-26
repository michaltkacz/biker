import React from 'react';

import { Layout } from 'antd';

import './authPage.less';

import Hero from '../hero/Hero';
import Auth from '../auth/Auth';
import Brand from '../brand/Brand';

const AuthPage: React.FC = () => {
  return (
    <Layout className='auth-page'>
      <Layout.Header className='auth-page-header'>
        <Brand />
      </Layout.Header>
      <Layout.Content className='auth-page-content'>
        <div className='content-wrapper'>
          <Hero />
          <Auth />
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default AuthPage;
