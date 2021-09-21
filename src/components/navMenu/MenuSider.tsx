import React from 'react';
import { Layout, Menu } from 'antd';
import BrandHeader from './BrandHeader';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useHistory } from 'react-router-dom';
import Profile from './Profile';

const { Content, Header, Sider } = Layout;

const MenuSider: React.FC = () => {
  const history = useHistory();

  const handleClick = (e: MenuInfo) => {
    console.log('click ', e);
    switch (e.key) {
      case '1':
        history.push('/record');
        break;
      case '2':
        history.push('/');
        break;
      default:
        console.log('Key not found in navigation');
        break;
    }
  };

  return (
    <Sider
      breakpoint='md'
      collapsible
      collapsedWidth={0}
      theme='light'
      style={{ zIndex: 999 }}
    >
      <Layout>
        <BrandHeader />
        <Content>
          <Profile />
          <Menu
            defaultSelectedKeys={['1']}
            mode='inline'
            theme='light'
            onClick={handleClick}
          >
            <Menu.Item key='1'>Record</Menu.Item>
            <Menu.Item key='2'>Logout</Menu.Item>
          </Menu>
        </Content>
      </Layout>
    </Sider>
  );
};

export default MenuSider;
