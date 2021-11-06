import React from 'react';
import { Statistic } from 'antd';

import {
  ArrowRightOutlined,
  ClockCircleOutlined,
  FallOutlined,
  HistoryOutlined,
  RiseOutlined,
  SwapOutlined,
  VerticalLeftOutlined,
} from '@ant-design/icons';

import {
  formatAverageSpeedValue,
  formatDistanceValue,
  formatDurationValue,
  formatSpeedValue,
  validateValue,
} from '../../global/statisiticsFormatters';

import { ActivityStatistics } from '../../database/schema';

import './activityStatisticsDashboard.less';

export type ActivityStatisticsDashboardProps = {} & ActivityStatistics;

const ActivityStatisticsDashboard: React.FC<ActivityStatisticsDashboardProps> =
  ({
    totalDistance,
    totalDuration,
    inMotionDuration,
    maxSpeed,
    elevationUp,
    elevationDown,
  }) => {
    return (
      <div className='activity-statistics-dashboard'>
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
      </div>
    );
  };

export default ActivityStatisticsDashboard;
