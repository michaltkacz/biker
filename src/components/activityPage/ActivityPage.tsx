import React from 'react';
import { Typography } from 'antd';

import './activityPage.less';
import GpxImporter from '../gpxImporter/GpxImporter';

const ActivityPage = () => {
  return (
    <div className='activity-page'>
      <Typography.Title level={1}>Activity</Typography.Title>
      <GpxImporter />
    </div>
  );
};

export default ActivityPage;
