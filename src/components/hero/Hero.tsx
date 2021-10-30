import React from 'react';
import { Typography } from 'antd';

import Brand from '../brand/Brand';

import './hero.less';

const Hero: React.FC = () => {
  return (
    <div className='hero'>
      <div className='hero-header'>
        <Brand />
      </div>
      <Typography.Title level={2} className='hero-content'>
        Monitor all your cycling statistics in one place
      </Typography.Title>
    </div>
  );
};

export default Hero;
