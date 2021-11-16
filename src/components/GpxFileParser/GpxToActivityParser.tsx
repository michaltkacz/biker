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

import { useWriteActivity } from '../../firebase/hooks/useActivities';
import { useAuth } from '../../firebase/hooks/useAuth';
import { calculateStatistics } from '../../hooks/useActivityStatistics';

export type GpxToActivityParserProps = {
  file: File;
  render: (activity: Activity) => React.ReactNode;
};

const GpxToActivityParser: React.FC<GpxToActivityParserProps> = ({
  file,
  render,
}) => {
  const [activity, setActivity] = useState<Activity | null>(null);
  const writeActivity = useWriteActivity();
  const { currentUserId } = useAuth();

  useEffect(() => {
    file.text().then((gpx) => {
      const gpxParser = new GpxParser();
      gpxParser.parse(gpx);

      let lastTime = 0;

      const newTrack: Track = gpxParser.tracks.map((parsedTrackSegment) => {
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
      });

      const { latestSpeed, latestElevation, ...statistics } =
        calculateStatistics(newTrack);

      const newActivity: Activity = {
        activityId: '',
        creatorId: currentUserId,
        name: he.decode(gpxParser.metadata.name),
        createdAt: newTrack[0][0].time,
        lastModifiedAt: Date.now(),
        startTime: newTrack[0][0].time,
        endTime: lastTime,
        sport: ActivitySportTypes.Other,
        category: ActivityCategoryTypes.Other,
        shape: { isLoop: false, from: 'unknown', to: 'unknown' },
        statistics: statistics,
        track: newTrack,
      };

      writeActivity(newActivity).then(({ activity: activityWithId, error }) => {
        if (error) {
          setActivity(null);
        } else {
          setActivity(activityWithId);
        }
      });
    });
  }, [file, currentUserId]);

  if (!activity) {
    return <LoadingSpinner />;
  }

  return <>{render(activity)}</>;
};

export default GpxToActivityParser;
