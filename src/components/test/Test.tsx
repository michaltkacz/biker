import React from 'react';

import './test.less';

import MenuSider from '../menuSider/MenuSider';

import { Layout } from 'antd';

const Test = () => {
  return (
    <Layout style={{ height: '100%' }}>
      <MenuSider />
      <Layout.Content></Layout.Content>
    </Layout>
  );
};

export default Test;
