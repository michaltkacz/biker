import React from 'react';
import { Layout, Menu } from 'antd';

import { MenuInfo } from 'rc-menu/lib/interface';

import { useHistory } from 'react-router-dom';
import { useAuth } from './../../firebase/useAuth';

import BrandHeader from '../brandHeader/BrandHeader';
import Profile from '../profile/Profile';
import useGpsTracker from './../../hooks/useGpsTracker';

import './navMenu.less';

const NavMenu: React.FC = () => {
  const history = useHistory();
  const { logout } = useAuth();
  const { startTracking, stopTracking } = useGpsTracker();

  const handleClick = (e: MenuInfo) => {
    switch (e.key) {
      case '1':
        history.push('/record');
        break;
      case '2':
        logout();
        history.push('/');
        break;
      case '3':
        startTracking();
        break;
      case '4':
        stopTracking();
        break;
      default:
        console.log('Key not found in navigation');
        break;
    }
  };

  return (
    <Layout.Sider
      breakpoint='md'
      collapsible
      collapsedWidth={0}
      theme='dark'
      style={{ zIndex: 999 }}
    >
      <Layout>
        <Layout.Content>
          <BrandHeader />
          <Profile />
          <Menu
            defaultSelectedKeys={['1']}
            mode='inline'
            theme='light'
            onClick={handleClick}
          >
            <Menu.Item key='1'>Record</Menu.Item>
            <Menu.Item key='2'>Logout</Menu.Item>
            <Menu.Item key='3'>START</Menu.Item>
            <Menu.Item key='4'>STOP</Menu.Item>
          </Menu>
        </Layout.Content>
      </Layout>
    </Layout.Sider>
  );
};

export default NavMenu;
