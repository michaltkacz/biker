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

const emptySegment: TrackSegment = [];
const emptyTrack: Track = [emptySegment];

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
      if (track[track.length - 1].length === 0) {
        setTrack([...track, emptySegment]);
      }
      return;
    }

    const newTrackPoint: TrackPoint = {
      lat: latestPosition.coords.latitude,
      lon: latestPosition.coords.longitude,
      ele: latestPosition.coords.altitude,
      time: Date.now(),
    };

    // add new track point to last track segment
    const newTrack = [...track];
    newTrack[newTrack.length - 1].push(newTrackPoint);

    setTrack(newTrack);
  };

  const startTracking = (): void => {
    if (isTracking) {
      return;
    }

    if (!isWatchingPosition) {
      startWatchingPosition();
    }

    setTrack(emptyTrack);
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
