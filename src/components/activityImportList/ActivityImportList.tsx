import { Result } from 'antd';
import React from 'react';
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
        <GpxFileParser file={file} key={uuidv4()} />
      ))}
    </>
  );
};

export default ActivityImportList;
