import React from 'react';

import './profilePage.less';
import { PageHeader } from 'antd';

const ProfilePage = () => {
  return (
    <div className='profile-page'>
      {/* <Typography.Title level={1}>Profile</Typography.Title> */}
      <PageHeader title='Profile'></PageHeader>
    </div>
  );
};

export default ProfilePage;
