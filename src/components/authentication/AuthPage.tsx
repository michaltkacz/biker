import React from 'react';

import EmailPasswordAuth from './EmailPasswordAuth';
import ProviderAuth from './ProviderAuth';
import FullScreenLayout from '../layout/FullScreenLayout';
import BrandHeader from '../navMenu/BrandHeader';
import AuthContent from './AuthContent';
import backgroundImage from '../../assets/bg.jpg';

const AuthenticationPage: React.FC = () => {
  return (
    <FullScreenLayout
      style={{
        background: `top / cover no-repeat url(${backgroundImage})`,
      }}
    >
      <BrandHeader />
      <AuthContent>
        <EmailPasswordAuth />
        <ProviderAuth />
      </AuthContent>
    </FullScreenLayout>
  );
};

export default AuthenticationPage;
