import React from 'react';
import { Col, Result, Row } from 'antd';

import './profilePage.less';

import { useAuth } from '../../firebase/hooks/useAuth';

import ProfileAvatar from '../profileAvatar/ProfileAvatar';
import ProfileData from '../profileData/ProfileData';

const ProfilePage = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Result status='error' title='No profile data' />;
  }

  return (
    <div className='profile-page'>
      <Row
        gutter={[
          { xs: 0, sm: 8, md: 16, lg: 24, xxl: 32 },
          { xs: 0, sm: 8, md: 16, lg: 24, xxl: 32 },
        ]}
      >
        <Col xs={24} sm={12}>
          <ProfileAvatar />
        </Col>
        <Col xs={24} sm={12}>
          <ProfileData />
        </Col>
        <Col xs={24}>
          <div>stats and charts</div>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
