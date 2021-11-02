import React, { useEffect, useState } from 'react';

import { UploadOutlined } from '@ant-design/icons';

import './fileImporter.less';

const FileImporter = () => {
  const [files, setFiles] = useState<Array<File>>([]);

  useEffect(() => {
    console.log(files);
    if (files.length > 0) {
      files[0].text().then((text) => console.log(text));
    }
  }, [files]);

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className='file-importer'>
      <label role='button' className='file-import-button ant-btn button'>
        <input
          type='file'
          accept='.gpx'
          multiple
          onChange={handleSelectFiles}
        />
        <UploadOutlined /> Import GPX
      </label>
    </div>
  );
};

export default FileImporter;
