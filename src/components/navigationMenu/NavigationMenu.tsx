import React from 'react';
import { Menu } from 'antd';

import Pages from '../../global/pages';

import { MenuInfo } from 'rc-menu/lib/interface';

import { useHistory } from 'react-router-dom';
import { useAuth } from '../../firebase/hooks/useAuth';

import './navigationMenu.less';

const NavigationMenu: React.FC = () => {
  const history = useHistory();
  const { currentUser, logout } = useAuth();

  const handleClick = (e: MenuInfo) => {
    if (e.key === Pages.Logout) {
      logout();
      history.push('/');
      return;
    }

    history.push(`/${e.key}`);
  };

  const extractPathName = (path: string): string => {
    return path.slice(path.lastIndexOf('/') + 1);
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
          <Menu.Item key={Pages.Profile}>{Pages.Profile}</Menu.Item>
          <Menu.Item key={Pages.Tracker}>{Pages.Tracker}</Menu.Item>
          <Menu.SubMenu key={Pages.Activities} title={Pages.Activities}>
            <Menu.Item key={Pages.ActivitiesHistory}>
              {extractPathName(Pages.ActivitiesHistory)}
            </Menu.Item>
            <Menu.Item key={Pages.ActivitiesTransfer}>
              {extractPathName(Pages.ActivitiesTransfer)}
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key={Pages.Logout}>{Pages.Logout}</Menu.Item>
        </>
      ) : (
        <Menu.Item key={Pages.Authorize}>Authorize</Menu.Item>
      )}
    </Menu>
  );
};

export default NavigationMenu;
