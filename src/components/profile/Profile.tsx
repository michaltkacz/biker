import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './profile.less';

import { useAuth } from '../../hooks/useAuth';

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div className='profile'>
      <Avatar
        size={100}
        alt='User profile avatar'
        icon={<UserOutlined />}
        style={{ margin: '0.25rem' }}
        src='https://images.unsplash.com/photo-1574158622682-e40e69881006?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80'
      />
      <h2>{currentUser ? currentUser.email : 'no-user'}</h2>
    </div>
  );
};

export default Profile;
