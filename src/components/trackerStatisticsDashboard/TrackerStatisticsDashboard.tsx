import React from 'react';
import { Statistic } from 'antd';

import './trackerStatisticsDashboard.less';

import {
  ArrowRightOutlined,
  ClockCircleOutlined,
  DoubleRightOutlined,
  FallOutlined,
  HistoryOutlined,
  RiseOutlined,
  StockOutlined,
  SwapOutlined,
  VerticalLeftOutlined,
} from '@ant-design/icons';

import { ActivityStatisticsExtended } from '../../hooks/useActivityStatistics';

import {
  formatAverageSpeedValue,
  formatDistanceValue,
  formatDurationValue,
  formatSpeedValue,
  validateValue,
} from '../../global/statisiticsFormatters';

type TrackerDashboardProps = {
  show: boolean;
} & ActivityStatisticsExtended;

const TrackerStatisticsDashboard: React.FC<TrackerDashboardProps> = ({
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

  return (
    <div className='tracker-statistics-dashboard'>
      <Statistic
        title='Speed'
        value={formatSpeedValue(latestSpeed)}
        prefix={<DoubleRightOutlined />}
        suffix='km/h'
        precision={1}
      />
      <Statistic
        title='Average Speed'
        value={formatAverageSpeedValue(totalDistance, inMotionDuration)}
        prefix={<SwapOutlined />}
        suffix='km/h'
        precision={1}
      />
      <Statistic
        title='Max Speed'
        value={formatSpeedValue(maxSpeed)}
        prefix={<VerticalLeftOutlined />}
        suffix='km/h'
        precision={1}
      />
      <Statistic
        title='Distance'
        value={formatDistanceValue(totalDistance)}
        prefix={<ArrowRightOutlined />}
        suffix='km'
        precision={1}
      />
      <Statistic
        title='In Motion Time'
        value={formatDurationValue(inMotionDuration)}
        prefix={<HistoryOutlined />}
      />
      <Statistic
        title='Total Time'
        value={formatDurationValue(totalDuration)}
        prefix={<ClockCircleOutlined />}
      />
      <Statistic
        title='Current Elevation'
        value={validateValue(latestElevation)}
        prefix={<StockOutlined />}
        suffix='m'
        precision={0}
      />
      <Statistic
        title='Elevation Up'
        value={validateValue(elevationUp)}
        prefix={<RiseOutlined />}
        suffix='m'
        precision={0}
      />
      <Statistic
        title='Elevation Down'
        value={validateValue(elevationDown)}
        prefix={<FallOutlined />}
        suffix='m'
        precision={0}
      />
    </div>
  );
};

export default TrackerStatisticsDashboard;
