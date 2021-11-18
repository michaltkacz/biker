import React, { useEffect, useState } from 'react';

import GpxParser from 'gpxparser';
import he from 'he';

import {
  Activity,
  ActivityCategoryTypes,
  ActivitySportTypes,
  Track,
  TrackPoint,
  TrackSegment,
} from '../../database/schema';

import './gpxToActivityParser.less';

import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

import { useAuth } from '../../firebase/hooks/useAuth';
import { calculateStatistics } from '../../hooks/useActivityStatistics';
import { writeActivityWithTrack } from '../../firebase/hooks/useDatabase';
import { Typography } from 'antd';
import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';

export type GpxToActivityParserProps = {
  file: File;
};

const GpxToActivityParser: React.FC<GpxToActivityParserProps> = ({ file }) => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const [error, setError] = useState<boolean>(false);

  const { currentUserId } = useAuth();

  useEffect(() => {
    file.text().then((gpx) => {
      const gpxParser = new GpxParser();
      gpxParser.parse(gpx);

      let lastTime = 0;

      const newTrack: Track = {
        activityId: '',
        segments: gpxParser.tracks.map((parsedTrackSegment) => {
          const newTrackSegment: TrackSegment = parsedTrackSegment.points.map(
            (parsedTrackPoint) => {
              lastTime = parsedTrackPoint.time.getTime();
              const newTrackPoint: TrackPoint = {
                lat: parsedTrackPoint.lat,
                lon: parsedTrackPoint.lon,
                ele: parsedTrackPoint.ele,
                time: lastTime,
              };
              return newTrackPoint;
            }
          );
          return newTrackSegment;
        }),
      };
      const { latestSpeed, latestElevation, ...statistics } =
        calculateStatistics(newTrack);

      const newActivity: Activity = {
        activityId: '',
        creatorId: currentUserId || '',
        name: he.decode(gpxParser.metadata.name),
        createdAt: newTrack.segments[0][0].time,
        lastModifiedAt: Date.now(),
        startTime: newTrack.segments[0][0].time,
        endTime: lastTime,
        sport: ActivitySportTypes.Other,
        category: ActivityCategoryTypes.Other,
        shape: { isLoop: false, from: 'unknown', to: 'unknown' },
        statistics: statistics,
      };

      writeActivityWithTrack(currentUserId, newActivity, newTrack)
        .then(({ updatedActivity }) => {
          setActivity(updatedActivity);
          setError(false);
        })
        .catch(() => {
          setActivity(newActivity);
          setError(true);
        });
    });
  }, [file, currentUserId]);

  if (!activity) {
    return <LoadingSpinner />;
  }

  return (
    <Typography.Title level={5}>
      {error ? (
        <WarningOutlined style={{ color: 'red' }} />
      ) : (
        <CheckCircleOutlined style={{ color: 'green' }} />
      )}
      {activity.name}
    </Typography.Title>
  );
};

export default GpxToActivityParser;
