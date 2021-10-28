import React from 'react';
import { Menu } from 'antd';

import Pages from '../../global/pages';

import { MenuInfo } from 'rc-menu/lib/interface';

import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import './navigationMenu.less';

const NavigationMenu: React.FC = () => {
  const history = useHistory();
  const { currentUser, logout } = useAuth();
  console.log(currentUser);
  const handleClick = (e: MenuInfo) => {
    if (e.key === Pages.Logout) {
      logout();
      history.push('/');
      return;
    }

    history.push(`/${e.key}`);
  };

  return (
    <Menu
      defaultSelectedKeys={[Pages.Tracker]}
      mode='inline'
      theme='light'
      onClick={handleClick}
      className='navigation-menu'
    >
      {currentUser ? (
        <>
          <Menu.Item key={Pages.Profile}>{Pages.Profile}</Menu.Item>
          <Menu.Item key={Pages.Tracker}>{Pages.Tracker}</Menu.Item>
          <Menu.Item key={Pages.Activity}>{Pages.Activity}</Menu.Item>
          <Menu.Item key={Pages.Logout}>{Pages.Logout}</Menu.Item>
        </>
      ) : (
        <Menu.Item key={Pages.Authorize}>Authorize</Menu.Item>
      )}
    </Menu>
  );
};

export default NavigationMenu;
