import { useEffect, useState } from 'react';
import { ActivityStatistics, Track } from '../database/schema';
import useActivityStatistics from './useActivityStatistics';

export type TrackerStatistics = {
  speed: number | null;
  elevation: number | null;
} & ActivityStatistics;

const useTrackerStatistics = (track: Track) => {
  const [speed, setSpeed] = useState<number | null>(null);
  const [elevation, setElevation] = useState<number | null>(null);

  const activityStatistics = useActivityStatistics(track);

  useEffect(() => {
    const { segments, timestamp } = track;

    // there must be a timestamp,
    // there must be at least one segment
    // there must be at least one point in segment
    if (
      !timestamp ||
      segments.length === 0 ||
      segments[0].points.length === 0
    ) {
      return;
    }

    // index of last segment and last point
    const lsi = segments.length - 1;
    const lpi = segments[lsi].points.length - 1;
    const lastPoint = segments[lsi].points[lpi];

    // speed
    const newSpeed = lastPoint.speed; // m/s
    setSpeed(newSpeed);

    // elevation
    const newElevation = lastPoint.ele; // meters
    setElevation(newElevation);
  }, [track]);

  return {
    speed,
    elevation,
    ...activityStatistics,
  };
};

export default useTrackerStatistics;
