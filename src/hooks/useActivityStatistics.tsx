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
  const [minElevation, setMinElevation] = useState<number>();
  const [maxElevation, setMaxElevation] = useState<number>();

  useEffect(() => {
    // maxSpeed
    const s = calculateStatistics(track);

    setMaxSpeed(s.maxSpeed); // m/s
    setLatestSpeed(s.latestSpeed);
    setLatestElevation(s.latestElevation);
    setTotalDuration(s.totalDuration);
    setTotalDistance(s.totalDistance);
    setInMotionDuration(s.inMotionDuration);
    setElevationUp(s.elevationUp);
    setElevationDown(s.elevationDown);
    setMinElevation(s.minElevation);
    setMaxElevation(s.maxElevation);
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
    minElevation,
    maxElevation,
  };
};

export const calculateStatistics = (
  track: Track
): ActivityStatisticsExtended => {
  // there must be at least one segment
  // there must be at least one point in segment
  let latestElevation: number = 0;
  let totalDuration: number = 0;
  let latestSpeed: number = 0;
  let maxSpeed: number = 0;
  let totalDistance: number = 0;
  let inMotionDuration: number = 0;
  let elevationUp: number = 0;
  let elevationDown: number = 0;

  let minElevation: number = 0;
  let maxElevation: number = 0;

  const trackFlat = track.segments.flat();
  if (trackFlat.length > 0) {
    // index of last last point
    const lpi = trackFlat.length - 1;
    const firstTrackPoint = trackFlat[0];
    const lastTrackPoint = trackFlat[lpi];

    latestElevation = lastTrackPoint.ele || 0; // meters
    totalDuration = deltaTime(firstTrackPoint.time, lastTrackPoint.time); // miliseconds

    minElevation = firstTrackPoint.ele || 0;
    maxElevation = firstTrackPoint.ele || 0;

    // latestSpeed
    if (lpi >= 1) {
      const secondLastPoint = trackFlat[lpi - 1];
      latestSpeed = geoSpeed2(
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

      const { distance, speed, time, dElevation } = geoMove(
        prevPoint.lat,
        prevPoint.lon,
        prevPoint.time,
        currPoint.lat,
        currPoint.lon,
        currPoint.time,
        prevPoint.ele || null,
        currPoint?.ele || null
      );

      // sensitivity
      if (speed > 1) {
        totalDistance += distance; // m
        inMotionDuration += time; // miliseconds

        if (currPoint.ele) {
          if (currPoint.ele > maxElevation) maxElevation = currPoint.ele;
          if (currPoint.ele < minElevation) minElevation = currPoint.ele;
        }

        if (!maxSpeed || speed > maxSpeed) {
          maxSpeed = speed;
        }

        dElevation &&
          (dElevation > 0
            ? (elevationDown += dElevation)
            : (elevationUp += -dElevation));
      }
    });
  }

  return {
    latestSpeed,
    latestElevation,
    totalDistance,
    totalDuration,
    inMotionDuration,
    maxSpeed,
    elevationUp,
    elevationDown,
    minElevation,
    maxElevation,
  };
};

export default useActivityStatistics;
