import React from 'react';
import { Typography } from 'antd';

import './activitiesHistoryPage.less';

import ActivityList from '../activityList/ActivityList';

const ActivitiesHistoryPage = () => {
  return (
    <div className='activity-page'>
      <Typography.Title level={1}>Activities History</Typography.Title>
      <ActivityList />
    </div>
  );
};

export default ActivitiesHistoryPage;
