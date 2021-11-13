import { useState, useEffect } from 'react';
import { Track, ActivityStatistics } from '../database/schema';
import { geoSpeed2, geoMove, deltaTime } from '../global/geolocationMath';

export type ActivityStatisticsExtended = {
  latestSpeed?: number;
  latestElevation?: number;
} & ActivityStatistics;

const useActivityStatistics = (track: Track): ActivityStatisticsExtended => {
  const [latestSpeed, setLatestSpeed] = useState<number>();
  const [latestElevation, setLatestElevation] = useState<number>();

  const [totalDistance, setTotalDistance] = useState<number>();
  const [totalDuration, setTotalDuration] = useState<number>();
  const [inMotionDuration, setInMotionDuration] = useState<number>();
  const [maxSpeed, setMaxSpeed] = useState<number>();
  const [elevationUp, setElevationUp] = useState<number>();
  const [elevationDown, setElevationDown] = useState<number>();

  useEffect(() => {
    // there must be at least one segment
    // there must be at least one point in segment
    const trackFlat = track.flat();
    if (trackFlat.length === 0) {
      return;
    }

    // index of last segment and last point
    const lpi = trackFlat.length - 1;
    const firstTrackPoint = trackFlat[0];
    const lastTrackPoint = trackFlat[lpi];

    const newLatestElevation = lastTrackPoint.ele || undefined; // meters
    const newTotalDuration = deltaTime(
      firstTrackPoint.time,
      lastTrackPoint.time
    ); // miliseconds
    let newLatestSpeed: number | undefined;
    let newMaxSpeed: number | undefined;
    let newTotalDistance: number = 0;
    let newInMotionDuration: number = 0;
    let newElevationUp: number = 0;
    let newElevationDown: number = 0;

    // latestSpeed
    if (lpi >= 1) {
      const secondLastPoint = trackFlat[lpi - 1];
      newLatestSpeed = geoSpeed2(
        secondLastPoint.lat,
        secondLastPoint.lon,
        secondLastPoint.time,
        lastTrackPoint.lat,
        lastTrackPoint.lon,
        lastTrackPoint.time
      );
    }

    trackFlat.forEach((currPoint, index) => {
      // at least two points in segment required
      if (index === 0) {
        return;
      }

      const prevPoint = trackFlat[index - 1];

      const { distance, speed, dTime, dElevation } = geoMove(
        prevPoint.lat,
        prevPoint.lon,
        prevPoint.time,
        currPoint.lat,
        currPoint.lon,
        currPoint.time,
        prevPoint.ele || null,
        currPoint?.ele || null
      );

      // greater than one meter
      if (speed > 1) {
        newTotalDistance += distance; // m
        newInMotionDuration += dTime; // miliseconds

        if (!newMaxSpeed || speed > newMaxSpeed) {
          newMaxSpeed = speed;
        }

        dElevation &&
          (dElevation > 0
            ? (newElevationDown += dElevation)
            : (newElevationUp += -dElevation));
      }
    });

    // maxSpeed
    if (!maxSpeed || (newMaxSpeed && newMaxSpeed > maxSpeed)) {
      setMaxSpeed(newMaxSpeed); // m/s
    }

    setLatestSpeed(newLatestSpeed);
    setLatestElevation(newLatestElevation);
    setTotalDuration(newTotalDuration);
    setTotalDistance(newTotalDistance);
    setInMotionDuration(newInMotionDuration);
    setElevationUp(newElevationUp);
    setElevationDown(newElevationDown);
  }, [track]);

  return {
    latestSpeed,
    latestElevation,
    totalDistance,
    totalDuration,
    inMotionDuration,
    maxSpeed,
    elevationUp,
    elevationDown,
  };
};

export default useActivityStatistics;
