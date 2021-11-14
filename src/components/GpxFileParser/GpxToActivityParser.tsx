import React, { useEffect, useState } from 'react';

import GpxParser from 'gpxparser';
import he from 'he';

import {
  Activity as ActivityType,
  ActivityCategoryTypes,
  ActivitySportTypes,
  Track,
  TrackPoint,
  TrackSegment,
} from '../../database/schema';

import './gpxToActivityParser.less';

import Activity from '../activity/Activity';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

import useUserId from '../../firebase/hooks/useUserId';
import { useWriteActivity } from '../../firebase/hooks/useActivities';
import { calculateStatistics } from '../../hooks/useActivityStatistics';

export type GpxToActivityParserProps = {
  file: File;
};

const GpxToActivityParser: React.FC<GpxToActivityParserProps> = ({ file }) => {
  const [activity, setActivity] = useState<ActivityType | null>(null);
  const writeActivity = useWriteActivity();
  const userId = useUserId();

  useEffect(() => {
    file.text().then((gpx) => {
      const gpxParser = new GpxParser();
      gpxParser.parse(gpx);

      const newTrack: Track = gpxParser.tracks.map((parsedTrackSegment) => {
        const newTrackSegment: TrackSegment = parsedTrackSegment.points.map(
          (parsedTrackPoint) => {
            const newTrackPoint: TrackPoint = {
              lat: parsedTrackPoint.lat,
              lon: parsedTrackPoint.lon,
              ele: parsedTrackPoint.ele,
              time: parsedTrackPoint.time.getTime(),
            };
            return newTrackPoint;
          }
        );
        return newTrackSegment;
      });

      const { latestSpeed, latestElevation, ...statistics } =
        calculateStatistics(newTrack);

      const newActivity: ActivityType = {
        activityId: '',
        creatorId: userId,
        name: he.decode(gpxParser.metadata.name),
        createdAt: newTrack[0][0].time,
        lastModifiedAt: Date.now(),
        sport: ActivitySportTypes.Other,
        category: ActivityCategoryTypes.Other,
        shape: { isLoop: false, from: 'unknown', to: 'unknown' },
        statistics: statistics,
        track: newTrack,
      };

      const activityWithId = writeActivity(newActivity);
      setActivity(activityWithId);
    });
  }, [file, userId]);

  if (!activity) {
    return <LoadingSpinner />;
  }

  return <Activity activity={activity} />;
};

export default GpxToActivityParser;
