import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

const BrandHeader: React.FC = () => {
  return (
    <Header>
      <h1 style={{ color: 'white' }}>Biker</h1>
    </Header>
  );
};

export default BrandHeader;
