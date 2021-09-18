import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button, Card, Col, Row } from 'antd';
import { FacebookFilled, GoogleSquareFilled } from '@ant-design/icons';

const ProviderAuth: React.FC = () => {
  const history = useHistory();

  return (
    <Card title='or authorize' bordered={false}>
      <Row gutter={8}>
        <Col span={12}>
          <Button
            block
            type='primary'
            size='large'
            icon={<GoogleSquareFilled />}
            onClick={() => history.push('/record')}
          >
            Google
          </Button>
        </Col>
        <Col span={12}>
          <Button
            block
            type='primary'
            size='large'
            icon={<FacebookFilled />}
            onClick={() => history.push('/record')}
          >
            Facebook
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default ProviderAuth;
