import { useState, useEffect } from 'react';
import { Track, ActivityStatistics } from '../database/schema';
import { geodistance } from '../global/mathHelpers';

const useActivityStatistics = (track: Track): ActivityStatistics => {
  const [maxSpeed, setMaxSpeed] = useState<number | null>(null);
  const [averageSpeed, setAverageSpeed] = useState<number | null>(null);

  const [totalDistance, setTotalDistance] = useState<number | null>(null);

  const [totalDuration, setTotalDuration] = useState<number | null>(null);
  const [inMotionDuration, setInMotionDuration] = useState<number | null>(null);

  const [elevationUp, setElevationUp] = useState<number | null>(null);
  const [elevationDown, setElevationDown] = useState<number | null>(null);

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

    // maxSpeed
    const newSpeed = lastPoint.speed; // m/s
    if (!maxSpeed || (newSpeed && newSpeed > maxSpeed)) {
      setMaxSpeed(newSpeed); // m/s
    }

    // totalDuration
    const newTotalDuration = lastPoint.time - timestamp; // miliseconds
    setTotalDuration(newTotalDuration);

    let newTotalDistance = 0;
    let newInMotionDuration = 0;
    let newElevationUp = 0;
    let newElevationDown = 0;

    segments.forEach((segment) => {
      // at least two points
      for (let i = 1; i < segment.points.length; i++) {
        const prevPoint = segment.points[i - 1];
        const point = segment.points[i];

        const distanceChange = geodistance(
          prevPoint.lat,
          prevPoint.lon,
          point.lat,
          point.lon
        ); // meters

        // greater than one meter
        if (distanceChange > 1) {
          //totalDistance
          newTotalDistance += distanceChange;

          // inMotionDuraiton
          newInMotionDuration += point.time - prevPoint.time; // miliseconds

          // elevationUp, elevationDown
          if (prevPoint.ele && point.ele) {
            const elevationDifference = prevPoint.ele - point.ele; // meters
            if (elevationDifference > 0) {
              newElevationDown += elevationDifference;
            } else {
              newElevationUp += Math.abs(elevationDifference);
            }
          }
        }
      }
    });

    if (totalDuration && totalDistance) {
      const newAverageSpeed = (totalDistance * 1000) / totalDuration; // m/ms -> m/s
      setAverageSpeed(newAverageSpeed);
    }

    setTotalDistance(newTotalDistance);
    setInMotionDuration(newInMotionDuration);
    setElevationUp(newElevationUp);
    setElevationDown(newElevationDown);
  }, [track]);

  return {
    totalDistance,
    totalDuration,
    inMotionDuration,
    maxSpeed,
    averageSpeed,
    elevationUp,
    elevationDown,
  };
};

export default useActivityStatistics;
