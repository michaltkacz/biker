import { useEffect, useState } from 'react';

import useGeolocation, { Geolocation } from './useGeolocation';
import useInterval from './useInterval';

export type TrackRecorder = {
  startTracking: () => void;
  stopTracking: () => void;
  resetTracker: () => void;
  isTracking: boolean;
  track: GeolocationPosition[];
  trackingStartTime: number | null;
  trackingTotalTime: number;
} & Geolocation;

const useTracker = (interval: number = 2000): TrackRecorder => {
  const geolocation = useGeolocation();
  const {
    startWatchingPosition,
    stopWatchingPosition,
    latestPosition,
    isWatchingPosition,
  } = geolocation;

  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [track, setTrack] = useState<GeolocationPosition[]>([]);
  const [trackingStartTime, setTrackingStartTime] = useState<number | null>(
    null
  );
  const [trackingTotalTime, setTrackingTotalTime] = useState<number>(0);

  useEffect(() => {
    startWatchingPosition();

    return () => {
      stopWatchingPosition();
    };
  }, [startWatchingPosition, stopWatchingPosition]);

  useInterval(
    () => {
      updateTrack();
      updateTrackingTotalTime();
    },
    isTracking ? interval : null
  );

  const updateTrack = () => {
    if (!latestPosition) {
      return;
    }

    setTrack([...track, latestPosition]);
  };

  const updateTrackingTotalTime = () => {
    if (!trackingStartTime) {
      return null;
    }

    setTrackingTotalTime(Date.now() - trackingStartTime);
  };

  const startTracking = (): void => {
    if (isTracking) {
      return;
    }

    if (!isWatchingPosition) {
      startWatchingPosition();
    }

    setTrackingStartTime(Date.now());
    setIsTracking(true);
  };

  const stopTracking = (): void => {
    if (!isTracking) {
      return;
    }
    setIsTracking(false);
  };

  const resetTracker = (): void => {
    stopTracking();

    setTrackingStartTime(null);
    setTrack([]);
  };

  return {
    track,
    startTracking,
    stopTracking,
    resetTracker,
    isTracking,
    trackingStartTime,
    trackingTotalTime,
    ...geolocation,
  };
};

export default useTracker;
