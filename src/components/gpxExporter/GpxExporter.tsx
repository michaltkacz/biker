import React from 'react';
import { Button, Collapse, Typography } from 'antd';

import { DownloadOutlined } from '@ant-design/icons';

import './gpxExporter.less';

export const GpxExporter = () => {
  return (
    <Collapse className='gpx-exporter' defaultActiveKey='gpx-exporter'>
      <Collapse.Panel
        key='gpx-exporter'
        header={
          <Typography.Title level={3} className='gpx-exporter-header'>
            Export
          </Typography.Title>
        }
        extra={
          <Button type='primary' onChange={() => console.log('export')}>
            <DownloadOutlined style={{ width: '1.25em', height: '1.25em' }} />
          </Button>
        }
      >
        <div>EXPORT LIST HERE</div>
      </Collapse.Panel>
    </Collapse>
  );
};

export default GpxExporter;
