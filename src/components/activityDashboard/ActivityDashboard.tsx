import React from 'react';
import { Statistic } from 'antd';

import {
  ArrowRightOutlined,
  ClockCircleOutlined,
  FallOutlined,
  HistoryOutlined,
  LoginOutlined,
  LogoutOutlined,
  RiseOutlined,
  SwapOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
  VerticalLeftOutlined,
} from '@ant-design/icons';

import {
  formatAverageSpeedValue,
  formatDistanceValue,
  formatDurationValue,
  formatSpeedValue,
  validateValue,
  formatTimeValue,
} from '../../global/statisiticsFormatters';

import { ActivityStatistics } from '../../database/schema';

import './activityDashboard.less';

export type ActivityDashboardProps = {
  startTime?: number;
  endTime?: number;
} & ActivityStatistics;

const ActivityDashboard: React.FC<ActivityDashboardProps> = ({
  startTime,
  endTime,
  totalDistance,
  totalDuration,
  inMotionDuration,
  maxSpeed,
  elevationUp,
  elevationDown,
  minElevation,
  maxElevation,
}) => {
  return (
    <div className='activity-dashboard'>
      <Statistic
        title='Start Time'
        value={formatTimeValue(startTime)}
        prefix={<LogoutOutlined />}
      />
      <Statistic
        title='End Time'
        value={formatTimeValue(endTime)}
        prefix={<LoginOutlined />}
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
        title='Distance'
        value={formatDistanceValue(totalDistance)}
        prefix={<ArrowRightOutlined />}
        suffix='km'
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
        title='Average Speed (Motion)'
        value={formatAverageSpeedValue(totalDistance, inMotionDuration)}
        prefix={<SwapOutlined />}
        suffix='km/h'
        precision={1}
      />
      <Statistic
        title='Average Speed (Total)'
        value={formatAverageSpeedValue(totalDistance, totalDuration)}
        prefix={<SwapOutlined />}
        suffix='km/h'
        precision={1}
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
      <Statistic
        title='Lowest Elevation'
        value={validateValue(minElevation)}
        prefix={<VerticalAlignBottomOutlined />}
        suffix='m'
        precision={0}
      />
      <Statistic
        title='Highest Elevation'
        value={validateValue(maxElevation)}
        prefix={<VerticalAlignTopOutlined />}
        suffix='m'
        precision={0}
      />
    </div>
  );
};

export default ActivityDashboard;
