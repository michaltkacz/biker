import React from 'react';
import { Typography } from 'antd';

import GpxImporter from '../gpxImporter/GpxImporter';
import GpxExporter from '../gpxExporter/GpxExporter';

import './activitiesTransferPage.less';

const ActivitiesTransferPage = () => {
  return (
    <div className='activity-page'>
      <Typography.Title level={1}>Activities</Typography.Title>
      <GpxImporter />
      <GpxExporter />
    </div>
  );
};

export default ActivitiesTransferPage;
