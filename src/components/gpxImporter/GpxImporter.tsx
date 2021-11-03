import React, { useEffect, useState } from 'react';
import { Collapse, Typography } from 'antd';

import { UploadOutlined } from '@ant-design/icons';

import './gpxImporter.less';

import FileButton from '../fileButton/FileButton';
import ImportActivityList from '../importActivityList/ImportActivityList';

const GpxImporter = () => {
  const [files, setFiles] = useState<Array<File>>([]);

  useEffect(() => {
    console.log(files);
  }, [files]);

  const handleFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <Collapse
      className='gpx-importer'
      // ghost
      defaultActiveKey='gpx-importer'
    >
      <Collapse.Panel
        key='gpx-importer'
        header={
          <Typography.Title level={3} className='gpx-importer-header'>
            Import
          </Typography.Title>
        }
        extra={
          <FileButton
            accept='.gpx'
            multiple
            onChange={handleFilesSelect}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <UploadOutlined
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </FileButton>
        }
      >
        <ImportActivityList files={files} />
      </Collapse.Panel>
    </Collapse>
  );
};

export default GpxImporter;
