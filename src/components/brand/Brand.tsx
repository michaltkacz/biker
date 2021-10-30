import React from 'react';
// import { Typography } from 'antd';

import './brand.less';
// import { StarOutlined } from '@ant-design/icons';

const Brand = () => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    // <div className='brand'>
    //   <StarOutlined className='brand-logo' />
    //   <Typography.Title level={2} className='brand-name'>
    //     Biker
    //   </Typography.Title>
    // </div>
    <div className='brand' onClick={handleClick}></div>
  );
};

export default Brand;
