import React from 'react';
import { Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import GpxFileParser from '../gpxFileParser/GpxToActivityParser';

import './importActivityList.less';

export type ImportActivityListProps = { files: Array<File> };

const ImportActivityList: React.FC<ImportActivityListProps> = ({ files }) => {
  return (
    <>
      {files.length === 0 ? (
        <Typography.Paragraph style={{ margin: 4 }}>
          Choose files to import
        </Typography.Paragraph>
      ) : (
        files.map((file) => <GpxFileParser file={file} key={uuidv4()} />)
      )}
    </>
  );
};

export default ImportActivityList;
