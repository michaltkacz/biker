import React from 'react';
import { Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './profilePreview.less';

import { useAuth } from '../../firebase/hooks/useAuth';
// import { useHistory } from 'react-router';

// import Pages from '../../global/pages';

const ProfilePreview = () => {
  const { currentUser } = useAuth();
  // const history = useHistory();

  if (!currentUser) {
    return null;
  }

  return (
    <div className='profile-preview'>
      <div
        className='profile-preview-wrapper'
        // onClick={() => {
        //   history.push(Pages.Profile);
        // }}
      >
        <Avatar
          size={111}
          alt='User profile avatar'
          icon={<UserOutlined />}
          src={currentUser.photoURL}
          className='profile-preview-avatar'
        />
        <Typography.Text strong className='profile-preview-username'>
          {currentUser.displayName}
        </Typography.Text>
      </div>
    </div>
  );
};

export default ProfilePreview;
