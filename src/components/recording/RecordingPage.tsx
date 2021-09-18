import { Layout } from 'antd';
import React from 'react';
import NavBar from '../navbar/NavBar';
import FullScreenLayout from '../layout/FullScreenLayout';

const { Content } = Layout;

const RecordingPage: React.FC = () => {
  return (
    <FullScreenLayout>
      <NavBar />
      <Content>HELLOOO</Content>
    </FullScreenLayout>
  );
};

export default RecordingPage;
