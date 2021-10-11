import React from 'react';

import { Layout } from 'antd';

import './authPage.less';

import BrandHeader from '../brandHeader/BrandHeader';
import Hero from '../hero/Hero';
import Auth from '../auth/Auth';

const AuthPage: React.FC = () => {
  return (
    <Layout className='auth-page'>
      <BrandHeader />
      <Layout.Content className='auth-page-content'>
        <Hero />
        <Auth />
      </Layout.Content>
    </Layout>
  );
};

export default AuthPage;
