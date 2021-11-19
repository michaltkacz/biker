import React, { useEffect, useState } from 'react';
import { Card, Result, Statistic, Typography, Divider } from 'antd';
import { MonitorOutlined } from '@ant-design/icons';

import './profileDashboard.less';

import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

import { Activity, UserStatistics } from '../../database/schema';
import {
  formatAverageSpeedValue,
  formatDateValue,
  formatDistanceValue,
  formatSpeedValue,
  formatDurationValue,
  validateValue,
} from '../../global/statisiticsFormatters';

export type ProfileDashboardProps = {
  activities: Activity[];
  loading: boolean;
  error: boolean;
};

const ProfileDashboard: React.FC<ProfileDashboardProps> = ({
  activities,
  loading,
  error,
}) => {
  const [userStatistics, setUserStatistics] = useState<UserStatistics>({});
  const [numberOfActivities, setNumberOfActivities] = useState<number>(0);

  useEffect(() => {
    if (activities.length === 0) {
      return;
    }

    const uStats: UserStatistics = {};

    activities.forEach((a) => {
      if (!uStats.firstActivityAt || a.createdAt < uStats.firstActivityAt)
        uStats.firstActivityAt = a.createdAt;

      if (!uStats.lastActivityAt || a.createdAt > uStats.lastActivityAt)
        uStats.lastActivityAt = a.createdAt;

      const {
        totalDistance,
        totalDuration,
        inMotionDuration,
        maxSpeed,
        elevationUp,
        elevationDown,
        minElevation,
        maxElevation,
      } = a.statistics;

      // distance
      if (!uStats.totalDistance) uStats.totalDistance = totalDistance;
      else if (totalDistance) uStats.totalDistance += totalDistance;

      if (!uStats.minDistance) uStats.minDistance = totalDistance;
      else if (totalDistance && totalDistance < uStats.minDistance)
        uStats.minDistance = totalDistance;

      if (!uStats.maxDistance) uStats.maxDistance = totalDistance;
      else if (totalDistance && totalDistance > uStats.maxDistance)
        uStats.maxDistance = totalDistance;

      // elevation
      if (!uStats.totalElevationUp) uStats.totalElevationUp = elevationUp;
      else if (elevationUp) uStats.totalElevationUp += elevationUp;

      if (!uStats.totalElevationDown) uStats.totalElevationDown = elevationDown;
      else if (elevationDown) uStats.totalElevationDown += elevationDown;

      if (!uStats.minElevation) uStats.minElevation = minElevation;
      else if (minElevation && minElevation < uStats.minElevation)
        uStats.minElevation = minElevation;

      if (!uStats.maxElevation) uStats.maxElevation = maxElevation;
      else if (maxElevation && maxElevation > uStats.maxElevation)
        uStats.maxElevation = maxElevation;

      // speed
      uStats.maxSpeed = maxSpeed;

      // total duration
      if (!uStats.totalDuration) uStats.totalDuration = totalDuration;
      else if (totalDuration) uStats.totalDuration += totalDuration;

      if (!uStats.minDuration) uStats.minDuration = totalDuration;
      else if (totalDuration && totalDuration < uStats.minDuration)
        uStats.minDuration = totalDuration;

      if (!uStats.maxDuration) uStats.maxDuration = totalDuration;
      else if (totalDuration && totalDuration > uStats.maxDuration)
        uStats.maxDuration = totalDuration;

      // total in motion duration
      if (!uStats.inMotionDuration) uStats.inMotionDuration = inMotionDuration;
      else if (inMotionDuration) uStats.inMotionDuration += inMotionDuration;

      if (!uStats.minInMotionDuration)
        uStats.minInMotionDuration = inMotionDuration;
      else if (
        inMotionDuration &&
        inMotionDuration < uStats.minInMotionDuration
      )
        uStats.minInMotionDuration = inMotionDuration;

      if (!uStats.maxInMotionDuration)
        uStats.maxInMotionDuration = inMotionDuration;
      else if (
        inMotionDuration &&
        inMotionDuration > uStats.maxInMotionDuration
      )
        uStats.maxInMotionDuration = inMotionDuration;
    });

    // console.log(uStats);
    setUserStatistics(uStats);
    setNumberOfActivities(activities.length);
  }, [activities]);

  if (loading) {
    return <Result status='error' title='Something has gone wrong' />;
  }

  if (error) {
    return <LoadingSpinner />;
  }

  if (activities.length === 0) {
    return <Result status='info' title='No statistics to display' />;
  }

  return (
    <Card
      size='small'
      title={
        <Typography.Title className='' level={5}>
          Statistics <MonitorOutlined />
        </Typography.Title>
      }
    >
      <div className='profile-dashboard'>
        <div className='profile-dashboard-grid'>
          <Statistic
            title='Number of Activities'
            value={validateValue(numberOfActivities)}
          />
          <Statistic
            title='Max Speed'
            value={formatSpeedValue(userStatistics.maxSpeed)}
            suffix='km/h'
            precision={1}
          />
        </div>
        <Divider />
        <div className='profile-dashboard-grid'>
          <Statistic
            title='First Activity At'
            value={formatDateValue(userStatistics.firstActivityAt)}
          />
          <Statistic
            title='Last Activity At'
            value={formatDateValue(userStatistics.lastActivityAt)}
          />
        </div>
        <Divider />

        <div className='profile-dashboard-grid'>
          <Statistic
            title='Total Duration'
            value={formatDurationValue(userStatistics.totalDuration)}
            suffix='h'
          />
          <Statistic
            title='Total Duration (In Motion)'
            value={formatDurationValue(userStatistics.inMotionDuration)}
            suffix='h'
          />
          <Statistic
            title='Average Duration'
            value={formatDurationValue(
              (userStatistics.totalDuration || 0) / numberOfActivities
            )}
            suffix='h'
          />
          <Statistic
            title='Average Duration (In Motion)'
            value={formatDurationValue(
              (userStatistics.inMotionDuration || 0) / numberOfActivities
            )}
            suffix='h'
          />
          <Statistic
            title='Min Duration'
            value={formatDurationValue(userStatistics.minDuration)}
            suffix='h'
          />
          <Statistic
            title='Min Duration (In Motion)'
            value={formatDurationValue(userStatistics.minInMotionDuration)}
            suffix='h'
          />
          <Statistic
            title='Max Duration'
            value={formatDurationValue(userStatistics.maxDuration)}
            suffix='h'
          />
          <Statistic
            title='Max Duration (In Motion)'
            value={formatDurationValue(userStatistics.maxInMotionDuration)}
            suffix='h'
          />
        </div>
        <Divider />

        <div className='profile-dashboard-grid'>
          <Statistic
            title='Average Speed'
            value={formatAverageSpeedValue(
              userStatistics.totalDistance,
              userStatistics.totalDuration
            )}
            suffix='km/h'
            precision={1}
          />
          <Statistic
            title='Average Speed (In Motion)'
            value={formatAverageSpeedValue(
              userStatistics.totalDistance,
              userStatistics.inMotionDuration
            )}
            suffix='km/h'
            precision={1}
          />
        </div>
        <Divider />

        <div className='profile-dashboard-grid'>
          <Statistic
            title='Total Distance'
            value={formatDistanceValue(userStatistics.totalDistance)}
            suffix='km'
            precision={1}
          />
          <Statistic
            title='Average Distance'
            value={formatDistanceValue(
              (userStatistics.totalDistance || 0) / numberOfActivities
            )}
            suffix='km'
            precision={1}
          />
          <Statistic
            title='Min Distance'
            value={formatDistanceValue(userStatistics.minDistance)}
            suffix='km'
            precision={1}
          />
          <Statistic
            title='Max Distance'
            value={formatDistanceValue(userStatistics.maxDistance)}
            suffix='km'
            precision={1}
          />
        </div>
        <Divider />

        <div className='profile-dashboard-grid'>
          <Statistic
            title='Total Elevation Up'
            value={validateValue(userStatistics.totalElevationUp)}
            suffix='m'
            precision={0}
          />
          <Statistic
            title='Total Elevation Up'
            value={validateValue(userStatistics.totalElevationDown)}
            suffix='m'
            precision={0}
          />
          <Statistic
            title='Lowest Elevation'
            value={validateValue(userStatistics.minElevation)}
            suffix='m'
            precision={0}
          />
          <Statistic
            title='Highest Elevation'
            value={validateValue(userStatistics.maxElevation)}
            suffix='m'
            precision={0}
          />
        </div>
      </div>
    </Card>
  );
};

export default ProfileDashboard;
