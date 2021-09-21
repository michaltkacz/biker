import React from 'react';
import { Layout } from 'antd';
import FullScreenLayout from '../layout/FullScreenLayout';
import MenuSider from '../navMenu/MenuSider';
import Map from './Map';

const { Content, Header, Sider } = Layout;

const RecordingPage: React.FC = () => {
  return (
    <FullScreenLayout>
      <MenuSider />
      <Content
        style={{
          height: '100%',
        }}
      >
        <Map />
      </Content>
    </FullScreenLayout>
  );
};

export default RecordingPage;
