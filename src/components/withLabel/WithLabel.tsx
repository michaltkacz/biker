import { Typography } from 'antd';
import React from 'react';

import './withLabel.less';

export type WithLabelProps = {
  label: string;
};

const WithLabel: React.FC<WithLabelProps> = ({ label, children }) => {
  return (
    <div className='labeled-enum-select'>
      <Typography.Text type='secondary' className='label'>
        {label}
      </Typography.Text>
      {children}
    </div>
  );
};

export default WithLabel;
