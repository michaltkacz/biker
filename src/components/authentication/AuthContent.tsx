import React from 'react';
import { Card, Layout } from 'antd';

import { useMediaQuery } from 'react-responsive';

import { screenMin } from '../../styles/screen';

const { Content } = Layout;

const AuthContent: React.FC = ({ children }) => {
  return (
    <Content
      style={{
        display: 'flex',
        alignContent: 'center',
        alignItems: useMediaQuery({ query: `(min-width: ${screenMin.sm})` })
          ? 'center'
          : 'stretch',
        justifyContent: 'center',
      }}
    >
      <Card bordered={false} size='small' style={{ width: '500px' }}>
        {children}
      </Card>
    </Content>
  );
};

export default AuthContent;
