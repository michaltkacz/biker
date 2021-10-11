import React from 'react';

import { Layout } from 'antd';

import MenuSider from '../navMenu/NavMenu';
import Tracker from '../tracker/Tracker';

import './trackerPage.less';

const TrackerPage: React.FC = () => {
  return (
    <Layout className='tracker-page'>
      <MenuSider />
      <Layout.Content>
        <Tracker />
      </Layout.Content>
    </Layout>
  );
};

export default TrackerPage;
