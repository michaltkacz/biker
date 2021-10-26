import { Layout } from 'antd';
import React from 'react';

import './globalPageLayout.less';

import Brand from '../brand/Brand';
import UserCard from '../userCard/UserCard';
import NavigationMenu from '../navigationMenu/NavigationMenu';

const GlobalPageLayout: React.FC = ({ children }) => {
  return (
    <Layout className='page-layout'>
      <Layout.Sider
        breakpoint='md'
        collapsible
        collapsedWidth={0}
        theme='dark'
        style={{ zIndex: 999 }}
        zeroWidthTriggerStyle={{ top: '80%' }}
        className='page-sider'
      >
        <Layout className='page-sider-layout'>
          <Layout.Header className='page-sider-layout-header'>
            <Brand />
          </Layout.Header>
          <Layout.Content className='page-sider-layout-content'>
            <UserCard />
            <NavigationMenu />
          </Layout.Content>
        </Layout>
      </Layout.Sider>
      <Layout.Content className='page-layout-content'>
        {children}
      </Layout.Content>
    </Layout>
  );
};

export default GlobalPageLayout;
