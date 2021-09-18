import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const CenterContent: React.FC = ({ children }) => {
  return (
    <Content
      style={{
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Content>
  );
};

export default CenterContent;
