import React from 'react';

import './fileButton.less';

export type FileButtonProps = {} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const FileButton: React.FC<FileButtonProps> = ({ children, ...rest }) => {
  return (
    <label
      role='button'
      className='file-import-button ant-btn ant-btn-primary button ant-btn-block'
    >
      <input type='file' {...rest} />
      {children}
    </label>
  );
};

export default FileButton;
