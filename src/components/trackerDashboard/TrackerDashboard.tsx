import React from 'react';
import { Statistic } from 'antd';

import './trackerDashboard.less';

import { QuestionCircleOutlined } from '@ant-design/icons';

interface TrackerDashboardProps {
  show: boolean;
  position: GeolocationPosition | null;
  trackingTime: number;
}

const degreeSymbol = String.fromCharCode(0x00b0);
const plusMinusSymbol = String.fromCharCode(0x00b1);

const TrackerDashboard: React.FC<TrackerDashboardProps> = ({
  show,
  position,
  trackingTime,
}) => {
  if (!show) {
    return null;
  }

  const formatTrackingTime = () => {
    return new Date(trackingTime).toISOString().substr(11, 8);
  };

  return (
    <div className='tracker-dashboard'>
      <Statistic
        title='Speed'
        value={position?.coords.speed || 'N/A'}
        prefix={<QuestionCircleOutlined />}
        suffix='m/s'
        precision={2}
      />
      <Statistic
        title='Time'
        value={formatTrackingTime()}
        prefix={<QuestionCircleOutlined />}
        suffix=''
      />
      <Statistic
        title='Altitude'
        value={position?.coords.altitude || 'N/A'}
        prefix={<QuestionCircleOutlined />}
        suffix='m'
        precision={0}
      />
      <Statistic
        title='Latitude'
        value={position?.coords.latitude || 'N/A'}
        prefix={<QuestionCircleOutlined />}
        suffix={degreeSymbol}
        precision={2}
      />
      <Statistic
        title='Longitude'
        value={position?.coords.longitude || 'N/A'}
        prefix={<QuestionCircleOutlined />}
        suffix={degreeSymbol}
        precision={2}
      />
    </div>
  );
};

export default TrackerDashboard;
