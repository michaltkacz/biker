import React from 'react';
import { Col, Result, Row } from 'antd';

import './profilePage.less';

import ProfileAvatar from '../profileAvatar/ProfileAvatar';
import ProfileData from '../profileData/ProfileData';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

import { useAuth } from '../../firebase/hooks/useAuth';
import {
  useReadActivities,
  useReadProfile,
} from '../../firebase/hooks/useDatabase';

import ProfileDashboard from '../profileDashboard/ProfileDashboard';
import ProfileCharts from '../profileCharts/ProfileCharts';

export type ProfilePageProps = {};

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const { currentUserId } = useAuth();
  const {
    activities,
    loading: loadingActivities,
    error: errorActivities,
  } = useReadActivities(currentUserId);
  const {
    profile,
    loading: loadingProfile,
    error: errorProfile,
  } = useReadProfile(currentUserId);

  if (!currentUserId) {
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
        <Col xs={24} lg={12}>
          <ProfileAvatar />
        </Col>
        <Col xs={24} lg={12}>
          {loadingProfile ? (
            <LoadingSpinner />
          ) : (
            <ProfileData
              profile={profile}
              loading={loadingProfile}
              error={errorProfile}
            />
          )}
        </Col>
        <Col xs={24} lg={12}>
          {loadingActivities ? (
            <LoadingSpinner />
          ) : (
            <ProfileDashboard
              activities={activities}
              loading={loadingActivities}
              error={errorActivities}
            />
          )}
        </Col>
        <Col xs={24} lg={12}>
          {loadingActivities ? (
            <LoadingSpinner />
          ) : (
            <ProfileCharts
              activities={activities}
              loading={loadingActivities}
              error={errorActivities}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
