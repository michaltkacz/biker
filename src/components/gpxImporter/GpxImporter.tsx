import React, { useEffect, useState } from 'react';
import { Collapse, Typography, message } from 'antd';

import { UploadOutlined } from '@ant-design/icons';

import './gpxImporter.less';

import FileButton from '../fileButton/FileButton';
import ActivityImportList from '../activityImportList/ActivityImportList';

const GpxImporter = () => {
  const [files, setFiles] = useState<Array<File>>([]);

  const handleFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  useEffect(() => {
    if (files.length === 0) {
      return;
    }
    message.success('Importing...');
  }, [files]);

  return (
    <Collapse className='gpx-importer'>
      <Collapse.Panel
        key='gpx-importer'
        header={
          <Typography.Title level={4} className='gpx-importer-header'>
            Import
          </Typography.Title>
        }
        extra={
          <FileButton accept='.gpx' multiple onChange={handleFilesSelect}>
            <UploadOutlined className='icon' />
          </FileButton>
        }
        forceRender
      >
        <ActivityImportList files={files} />
      </Collapse.Panel>
    </Collapse>
  );
};

export default GpxImporter;
