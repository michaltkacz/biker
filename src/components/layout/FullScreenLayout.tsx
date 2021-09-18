import React from 'react';
import { Layout } from 'antd';

const FullScreenLayout: React.FC<{ style?: React.CSSProperties }> = ({
  children,
  style,
}) => {
  return (
    <Layout
      style={{
        minHeight: '100vh',
        ...style,
      }}
    >
      {children}
    </Layout>
  );
};

export default FullScreenLayout;
