import React from 'react';
import { Layout } from 'antd';

const FullScreenLayout: React.FC<{ style?: React.CSSProperties }> = ({
  children,
  style,
}) => {
  return (
    <Layout
      style={{
        minHeight: '100%',
        height: '100%',
        ...style,
      }}
    >
      {children}
    </Layout>
  );
};

export default FullScreenLayout;
