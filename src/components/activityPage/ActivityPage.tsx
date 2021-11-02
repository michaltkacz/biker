import React from 'react';
import { Typography } from 'antd';

import './activityPage.less';

import FileImporter from './../fileImporter/FileImporter';

const ActivityPage = () => {
  return (
    <div className='activity-page'>
      <Typography.Title level={1}>Activity</Typography.Title>
      <FileImporter />
    </div>
  );
};

export default ActivityPage;
