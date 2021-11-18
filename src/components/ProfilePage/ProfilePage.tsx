import React from 'react';
import { Button, Card, Col, Result, Row, Typography } from 'antd';

import './profilePage.less';

import { useAuth } from '../../firebase/hooks/useAuth';

import ProfileAvatar from '../profileAvatar/ProfileAvatar';
import ProfileData from '../profileData/ProfileData';
import { AreaChartOutlined, MonitorOutlined } from '@ant-design/icons';
import { updateStatistics } from '../../firebase/hooks/useDatabase';

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
          <ProfileDashboard />
        </Col>
        <Col xs={24}>
          <ProfileCharts />
        </Col>
      </Row>
    </div>
  );
};

export const ProfileDashboard = () => {
  const { currentUserId } = useAuth();
  return (
    <Card
      size='small'
      title={
        <Typography.Title className='' level={5}>
          Statistics <MonitorOutlined />
        </Typography.Title>
      }
    >
      DASHBOARD
      <Button onClick={() => updateStatistics(currentUserId)}>
        updateStatistics
      </Button>
    </Card>
  );
};

export const ProfileCharts = () => {
  return (
    <Card
      size='small'
      title={
        <Typography.Title className='' level={5}>
          Charts <AreaChartOutlined />
        </Typography.Title>
      }
    >
      CHARTS
    </Card>
  );
};

export default ProfilePage;
