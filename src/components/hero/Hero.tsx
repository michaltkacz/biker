import React from 'react';

import { Typography } from 'antd';

import './hero.less';

const Hero: React.FC = () => {
  return (
    <div className='hero'>
      <div className='hero-content'>
        <Typography.Title level={1}>Biker</Typography.Title>
        <Typography.Title level={2}>
          Monitor all your cycling statistics in one place
        </Typography.Title>
        <Typography.Text>Sign in to continue</Typography.Text>
      </div>
    </div>
  );
};

export default Hero;
