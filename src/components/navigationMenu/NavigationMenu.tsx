import React from 'react';
import { Menu } from 'antd';

import {
  AimOutlined,
  SwapLeftOutlined,
  SwapRightOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';

import Pages from '../../global/pages';

import { useHistory } from 'react-router-dom';
import { useAuth } from '../../firebase/hooks/useAuth';

import './navigationMenu.less';

const NavigationMenu: React.FC = () => {
  const history = useHistory();
  const { currentUser, logoutUser } = useAuth();

  const handleClick = (e: MenuInfo) => {
    if (e.key === Pages.Logout) {
      logoutUser();
      history.push('/');
      return;
    }

    history.push(`/${e.key}`);
  };

  return (
    <Menu
      mode='inline'
      theme='dark'
      onClick={handleClick}
      className='navigation-menu'
      defaultOpenKeys={[Pages.Activities]}
    >
      {currentUser ? (
        <>
          <Menu.Item key={Pages.Profile} icon={<UserOutlined />}>
            {Pages.Profile}
          </Menu.Item>
          <Menu.Item key={Pages.Tracker} icon={<AimOutlined />}>
            {Pages.Tracker}
          </Menu.Item>
          <Menu.Item key={Pages.Activities} icon={<ThunderboltOutlined />}>
            {Pages.Activities}
          </Menu.Item>
          <Menu.Item key={Pages.Logout} icon={<SwapLeftOutlined />}>
            {Pages.Logout}
          </Menu.Item>
        </>
      ) : (
        <Menu.Item key={Pages.Authorize} icon={<SwapRightOutlined />}>
          Authorize
        </Menu.Item>
      )}
    </Menu>
  );
};

export default NavigationMenu;
