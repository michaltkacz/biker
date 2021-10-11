import React from 'react';

import { Layout, Typography } from 'antd';
import { StarOutlined } from '@ant-design/icons';

import './brandHeader.less';

const BrandHeader: React.FC = () => {
  return (
    <Layout.Header className='brand-header'>
      <div className='brand-wrapper'>
        <StarOutlined className='brand-logo' />
        <Typography.Title level={2} className='brand-name'>
          Biker
        </Typography.Title>
      </div>
    </Layout.Header>
  );
};

export default BrandHeader;
