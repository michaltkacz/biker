import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';

import GpxParser from 'gpxparser';
import he from 'he';

import {
  Activity as ActivityType,
  Track,
  TrackPoint,
  TrackSegment,
} from '../../database/schema';

import './gpxToActivityParser.less';

import Activity from '../activity/Activity';

import { useAuth } from '../../hooks/useAuth';
import { User } from '@firebase/auth';

export type GpxToActivityParserProps = {
  file: File;
};

const GpxToActivityParser: React.FC<GpxToActivityParserProps> = ({ file }) => {
  const [activity, setActivity] = useState<ActivityType>();
  const { currentUser } = useAuth();

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

      const newActivity: ActivityType = {
        activityId: '',
        creatorId: (currentUser as User).uid,
        name: he.decode(gpxParser.metadata.name),
        createdAt: newTrack[0][0].time,
        lastModifiedAt: Date.now(),
        track: newTrack,
        sport: null,
        category: null,
        shape: null,
        statistics: null,
        rating: null,
        tags: ['tag1', 'tag2', 'Tag3'], //null,
      };

      setActivity(newActivity);
    });
  }, [file, currentUser]);

  if (!activity) {
    return (
      <div className='loading-container'>
        <Spin tip='Loading...' />
      </div>
    );
  }

  return <Activity activity={activity} />;
};

export default GpxToActivityParser;
