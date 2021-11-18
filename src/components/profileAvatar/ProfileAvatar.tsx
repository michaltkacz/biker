import React, { useState } from 'react';
import { message, Typography } from 'antd';

import { UserOutlined } from '@ant-design/icons';

import { useAuth } from '../../firebase/hooks/useAuth';

import EditableAvatar from '../editableAvatar/EditableAvatar';

import './profileAvatar.less';

const ProfileAvatar: React.FC = () => {
  const { currentUser, updateUser } = useAuth();
  const [name, setName] = useState<string>(
    currentUser?.displayName || 'Unknown User'
  );
  const [url, setUrl] = useState<string>(currentUser?.photoURL || '');

  const onNameChange = (newName: string) => {
    if (newName === '') {
      message.error('Invalid name');
      return;
    }

    updateUser({ displayName: newName })
      .then(() => {
        message.success('Name updated');
        setName(newName);
      })
      .catch(() => {
        message.error("Name couldn't be updated");
      });
  };

  const onUrlChange = (newUrl: string) => {
    updateUser({ photoURL: newUrl })
      .then(() => {
        message.success('Photo updated');
        setUrl(newUrl);
      })
      .catch(() => {
        message.error("Photo couldn't be updated");
      });
  };

  return (
    <div className='profile-avatar'>
      <EditableAvatar
        size={150}
        alt='User profile avatar'
        icon={<UserOutlined />}
        src={url}
        className='profile-avatar-image'
        url={url}
        onUrlChange={onUrlChange}
      />
      <Typography.Title
        level={1}
        editable={{
          autoSize: true,
          onChange: onNameChange,
        }}
        className='profile-avatar-name'
      >
        {name}
      </Typography.Title>
    </div>
  );
};

export default ProfileAvatar;
