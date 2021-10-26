import React from 'react';
import { Typography } from 'antd';

import './brand.less';
import { StarOutlined } from '@ant-design/icons';

const Brand = () => {
  return (
    <div className='brand'>
      <StarOutlined className='brand-logo' />
      <Typography.Title level={2} className='brand-name'>
        Biker
      </Typography.Title>
    </div>
  );
};

export default Brand;
