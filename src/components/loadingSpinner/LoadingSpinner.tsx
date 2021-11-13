import React from 'react';
import { Spin } from 'antd';

import './loadingSpinner.less';

const LoadingSpinner = () => {
  return (
    <div className='loading-spinner'>
      <Spin tip='Loading...' />
    </div>
  );
};

export default LoadingSpinner;
