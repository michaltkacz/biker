import { Layout } from 'antd';
import React from 'react';

import { useLocation } from 'react-router';

import './pageLayout.less';

import Brand from '../brand/Brand';
import ProfilePreview from './../profilePreview/ProfilePreview';
import NavigationMenu from '../navigationMenu/NavigationMenu';

import Pages from '../../global/pages';

const PageLayout: React.FC = ({ children }) => {
  const location = useLocation();

  return (
    <Layout className='page'>
      {location.pathname !== `/${Pages.Authorize}` && (
        <Layout.Sider
          breakpoint='md'
          collapsible
          collapsedWidth={0}
          theme='dark'
          style={{ zIndex: 999 }}
          zeroWidthTriggerStyle={{ top: 'calc(100% - 80px)', opacity: '75%' }}
          className='page-sider'
        >
          <Layout className='page-sider-layout'>
            <Layout.Header className='page-sider-layout-header'>
              <Brand />
            </Layout.Header>
            <Layout.Content>
              <ProfilePreview />
              <NavigationMenu />
            </Layout.Content>
          </Layout>
        </Layout.Sider>
      )}
      <Layout.Content className='page-content'>{children}</Layout.Content>
    </Layout>
  );
};

export default PageLayout;
