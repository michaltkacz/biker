import React from 'react';
import { Layout } from 'antd';
import Brand from './Brand';

const { Header } = Layout;

const NavBar: React.FC = () => {
  return (
    <Header>
      <Brand />
    </Header>
  );
};

export default NavBar;
