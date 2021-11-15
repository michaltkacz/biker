import React from 'react';
import { Result, Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import GpxFileParser from '../gpxFileParser/GpxToActivityParser';

import './activityImportList.less';

export type ActivityImportListProps = { files: Array<File> };

const ActivityImportList: React.FC<ActivityImportListProps> = ({ files }) => {
  if (files.length === 0) {
    return <Result status='info' title='Choose files to import' />;
  }

  return (
    <>
      {files.map((file) => (
        <GpxFileParser
          file={file}
          key={uuidv4()}
          render={(activity) => (
            <Typography.Title level={5}>{activity.name}</Typography.Title>
          )}
        />
      ))}
    </>
  );
};

export default ActivityImportList;
