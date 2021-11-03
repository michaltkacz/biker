import React from 'react';
import { Typography } from 'antd';

import GpxFileParser from '../GpxFileParser/GpxToActivityParser';

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
        files.map((file, index) => (
          <GpxFileParser file={file} key={`gpx-file-parser-${index}`} />
        ))
      )}
    </>
  );
};

export default ImportActivityList;
