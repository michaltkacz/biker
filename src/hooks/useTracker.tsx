import { useEffect, useState } from 'react';
import { Track, TrackPoint, TrackSegment } from '../database/schema';

import useGeolocation, { Geolocation } from './useGeolocation';
import useInterval from './useInterval';
import useNoSleep from './useNoSleep';

export type TrackRecorder = {
  startTracking: () => void;
  stopTracking: () => void;
  isTracking: boolean;
  track: Track;
} & Geolocation;

const emptySegment: TrackSegment = { points: [] };
const emptyTrack: Track = { segments: [emptySegment], timestamp: null };

const useTracker = (interval: number = 2000): TrackRecorder => {
  const { enableNoSleep, disableNoSleep } = useNoSleep();
  const geolocation = useGeolocation();
  const {
    startWatchingPosition,
    stopWatchingPosition,
    latestPosition,
    isWatchingPosition,
  } = geolocation;

  const [isTracking, setIsTracking] = useState<boolean>(false);

  const [track, setTrack] = useState<Track>(emptyTrack);

  useEffect(() => {
    console.log(track);
  }, [track]);

  useEffect(() => {
    startWatchingPosition();

    return () => {
      stopWatchingPosition();
    };
  }, [startWatchingPosition, stopWatchingPosition]);

  useInterval(
    () => {
      updateTrack();
    },
    isTracking ? interval : null
  );

  const updateTrack = () => {
    if (!latestPosition) {
      // if last track segment is not empty, add new empty track segment
      if (track.segments[track.segments.length - 1].points.length !== 0) {
        setTrack({
          segments: [...track.segments, emptySegment],
          timestamp: track.timestamp,
        });
      }
      return;
    }

    const newTrackPoint: TrackPoint = {
      lat: latestPosition.coords.latitude,
      lon: latestPosition.coords.longitude,
      ele: latestPosition.coords.altitude,
      speed: latestPosition.coords.speed,
      time: Date.now(),
    };

    // add new track point to last track segment
    const segments = [...track.segments];
    const timestamp = track.timestamp;
    segments[segments.length - 1].points.push(newTrackPoint);

    setTrack({ segments, timestamp });
  };

  const startTracking = (): void => {
    if (isTracking) {
      return;
    }

    if (!isWatchingPosition) {
      startWatchingPosition();
    }

    setTrack({ segments: [emptySegment], timestamp: Date.now() });
    setIsTracking(true);
    enableNoSleep();
  };

  const stopTracking = (): void => {
    if (!isTracking) {
      return;
    }
    setIsTracking(false);
    disableNoSleep();
  };

  return {
    track,
    startTracking,
    stopTracking,
    isTracking,
    ...geolocation,
  };
};

export default useTracker;
