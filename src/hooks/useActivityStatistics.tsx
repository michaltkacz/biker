import { useState, useEffect } from 'react';
import { Track, ActivityStatistics } from '../database/schema';
import { geoSpeed2, geoMove, deltaTime } from '../global/geolocationMath';

export type ActivityStatisticsExtended = {
  latestSpeed: number | null;
  latestElevation: number | null;
} & ActivityStatistics;

const useActivityStatistics = (track: Track): ActivityStatisticsExtended => {
  const [latestSpeed, setLatestSpeed] = useState<number | null>(null);
  const [latestElevation, setLatestElevation] = useState<number | null>(null);

  const [totalDistance, setTotalDistance] = useState<number | null>(null);
  const [totalDuration, setTotalDuration] = useState<number | null>(null);
  const [inMotionDuration, setInMotionDuration] = useState<number | null>(null);
  const [maxSpeed, setMaxSpeed] = useState<number | null>(null);
  const [elevationUp, setElevationUp] = useState<number | null>(null);
  const [elevationDown, setElevationDown] = useState<number | null>(null);

  useEffect(() => {
    // there must be at least one segment
    // there must be at least one point in segment
    if (track.length === 0 || track[0].length === 0) {
      return;
    }

    // index of last segment and last point
    const lsi = track.length - 1;
    const lpi = track[lsi].length - 1;
    const firstTrackPoint = track[0][0];
    const lastTrackPoint = track[lsi][lpi];

    const newLatestElevation = lastTrackPoint.ele; // meters
    const newTotalDuration = deltaTime(
      firstTrackPoint.time,
      lastTrackPoint.time
    ); // miliseconds
    let newLatestSpeed = null;
    let newMaxSpeed = null;
    let newTotalDistance = 0;
    let newInMotionDuration = 0;
    let newElevationUp = 0;
    let newElevationDown = 0;

    // latestSpeed
    if (lpi >= 1) {
      const secondLastPoint = track[lsi][lpi - 1];
      newLatestSpeed = geoSpeed2(
        secondLastPoint.lat,
        secondLastPoint.lon,
        secondLastPoint.time,
        lastTrackPoint.lat,
        lastTrackPoint.lon,
        lastTrackPoint.time
      );
    }

    track.forEach((trackSegment) => {
      // at least two points in segment required
      for (let i = 1; i < trackSegment.length; i++) {
        const prevTrackPoint = trackSegment[i - 1];
        const currTrackPoint = trackSegment[i];

        const { distance, speed, dTime, dElevation } = geoMove(
          prevTrackPoint.lat,
          prevTrackPoint.lon,
          prevTrackPoint.time,
          currTrackPoint.lat,
          currTrackPoint.lon,
          currTrackPoint.time,
          prevTrackPoint.ele,
          currTrackPoint.ele
        );

        // greater than one meter
        if (distance > 1) {
          newTotalDistance += distance; // m
          newInMotionDuration += dTime; // miliseconds
          newMaxSpeed = speed;
          if (dElevation) {
            if (dElevation > 0) {
              newElevationDown += dElevation;
            } else {
              newElevationUp += Math.abs(dElevation);
            }
          }
        }
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
