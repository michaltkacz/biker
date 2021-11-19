import React from 'react';
import { Col, Result, Row } from 'antd';

import './profilePage.less';

import ProfileAvatar from '../profileAvatar/ProfileAvatar';
import ProfileData from '../profileData/ProfileData';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

import { useAuth } from '../../firebase/hooks/useAuth';
import { useReadActivities } from '../../firebase/hooks/useDatabase';

import ProfileDashboard from '../profileDashboard/ProfileDashboard';
import ProfileCharts from '../profileCharts/ProfileCharts';

const ProfilePage = () => {
  const { currentUserId } = useAuth();
  const { activities, loading, error } = useReadActivities(currentUserId);

  if (!currentUserId) {
    return <Result status='error' title='No profile data' />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='profile-page'>
      <Row
        gutter={[
          { xs: 0, sm: 8, md: 16, lg: 24, xxl: 32 },
          { xs: 0, sm: 8, md: 16, lg: 24, xxl: 32 },
        ]}
      >
        <Col xs={24} lg={12}>
          <ProfileAvatar />
        </Col>
        <Col xs={24} lg={12}>
          <ProfileData />
        </Col>
        <Col xs={24} lg={12}>
          <ProfileDashboard
            activities={activities}
            loading={loading}
            error={error}
          />
        </Col>
        <Col xs={24} lg={12}>
          <ProfileCharts
            activities={activities}
            loading={loading}
            error={error}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
