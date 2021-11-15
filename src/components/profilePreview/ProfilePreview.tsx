import React from 'react';
import { Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './profilePreview.less';

import { useAuth } from '../../firebase/hooks/useAuth';

const ProfilePreview = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null;
  }

  return (
    <div className='profile'>
      <div className='profile-wrapper'>
        <Avatar
          size={111}
          alt='User profile avatar'
          icon={<UserOutlined />}
          src='https://images.unsplash.com/photo-1574158622682-e40e69881006?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=880&q=80'
          // src={currentUser.photoURL}
        />
        <Typography.Text strong className='profile-username'>
          {currentUser.displayName}
        </Typography.Text>
      </div>
    </div>
  );
};

export default ProfilePreview;