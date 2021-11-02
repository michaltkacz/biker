import React from 'react';
import { Statistic } from 'antd';

import './trackerDashboard.less';

import { QuestionCircleOutlined } from '@ant-design/icons';
import { ActivityStatisticsExtended } from '../../hooks/useActivityStatistics';

type TrackerDashboardProps = {
  show: boolean;
} & ActivityStatisticsExtended;

const TrackerDashboard: React.FC<TrackerDashboardProps> = ({
  show,
  latestSpeed,
  latestElevation,
  totalDistance,
  totalDuration,
  inMotionDuration,
  maxSpeed,
  elevationUp,
  elevationDown,
}) => {
  if (!show) {
    return null;
  }

  const validateValue = (value: number | null): number | string => {
    if (value === null) return '-';
    return value;
  };

  const formatDistanceValue = (value: number | null): number | string => {
    const validatedValue = validateValue(value);
    if (typeof validatedValue === 'string') {
      return validatedValue;
    }
    return validatedValue / 1000;
  };

  const formatSpeedValue = (value: number | null): number | string => {
    const validatedValue = validateValue(value);
    if (typeof validatedValue === 'string') {
      return validatedValue;
    }
    return validatedValue * 3.6;
  };

  const formatAverageSpeedValue = (
    distance: number | null,
    time: number | null
  ): number | string => {
    const validatedDistance = validateValue(distance);
    const validatedTime = validateValue(time);
    if (
      typeof validatedDistance === 'string' ||
      typeof validatedTime === 'string'
    ) {
      return validatedDistance;
    }
    return (validatedDistance / validatedTime) * 3600;
  };

  const formatTimeValue = (value: number | null): string => {
    const validatedValue = validateValue(value);
    if (typeof validatedValue === 'string') {
      return validatedValue;
    }
    return validatedValue > 60000
      ? new Date(validatedValue).toISOString().substr(11, 5)
      : new Date(validatedValue).toISOString().substr(11, 8);
  };

  return (
    <div className='tracker-dashboard'>
      <Statistic
        title='Distance'
        value={formatDistanceValue(totalDistance)}
        prefix={<QuestionCircleOutlined />}
        suffix='km'
        precision={1}
      />
      <Statistic
        title='In Motion Time'
        value={formatTimeValue(inMotionDuration)}
        prefix={<QuestionCircleOutlined />}
      />
      <Statistic
        title='Total Time'
        value={formatTimeValue(totalDuration)}
        prefix={<QuestionCircleOutlined />}
      />
      <Statistic
        title='Speed'
        value={formatSpeedValue(latestSpeed)}
        prefix={<QuestionCircleOutlined />}
        suffix='km/s'
        precision={1}
      />
      <Statistic
        title='Average Speed'
        value={formatAverageSpeedValue(totalDistance, inMotionDuration)}
        prefix={<QuestionCircleOutlined />}
        suffix='km/s'
        precision={1}
      />
      <Statistic
        title='Max Speed'
        value={formatSpeedValue(maxSpeed)}
        prefix={<QuestionCircleOutlined />}
        suffix='km/s'
        precision={1}
      />
      <Statistic
        title='Current Elevation'
        value={validateValue(latestElevation)}
        prefix={<QuestionCircleOutlined />}
        suffix='m'
        precision={0}
      />
      <Statistic
        title='Elevation Up'
        value={validateValue(elevationUp)}
        prefix={<QuestionCircleOutlined />}
        suffix='m'
        precision={0}
      />
      <Statistic
        title='Elevation Down'
        value={validateValue(elevationDown)}
        prefix={<QuestionCircleOutlined />}
        suffix='m'
        precision={0}
      />
    </div>
  );
};

export default TrackerDashboard;
