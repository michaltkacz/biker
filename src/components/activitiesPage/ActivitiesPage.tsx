import React from 'react';
import { Typography } from 'antd';

import './activitiesPage.less';

import ActivityList from '../activityList/ActivityList';
import GpxImporter from '../gpxImporter/GpxImporter';

const ActivitiesPage = () => {
  return (
    <div className='activity-page'>
      <Typography.Title level={1}>Activities</Typography.Title>
      <GpxImporter />
      <ActivityList />
    </div>
  );
};

export default ActivitiesPage;
