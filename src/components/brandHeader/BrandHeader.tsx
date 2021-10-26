import React from 'react';
import { Layout } from 'antd';

import Brand from '../brand/Brand';

import './brandHeader.less';

const BrandHeader: React.FC = () => {
  return (
    <Layout.Header>
      <Brand />
    </Layout.Header>
  );
};

export default BrandHeader;
