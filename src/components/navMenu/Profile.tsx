import React from 'react';
import { Avatar, Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Profile = () => {
  return (
    <Row gutter={8} align='middle' justify='start'>
      <Col>
        <Avatar
          size='large'
          icon={<UserOutlined />}
          style={{ margin: '0.25rem' }}
        />
      </Col>
      <Col>
        <h2>User Name</h2>
      </Col>
    </Row>
  );
};

export default Profile;
