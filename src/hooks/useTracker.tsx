import { useEffect, useState } from 'react';

import useGeolocation from './useGeolocation';
import useInterval from './useInterval';

export type TrackRecorder = {
  currentTrack: GeolocationPosition[];
  latestPosition: GeolocationPosition | null;
  lastKnownPosition: GeolocationPosition | null;
  startTracking: () => void;
  stopTracking: () => void;
  resetTracker: () => void;
  isTracking: boolean;
  geolocationError: GeolocationPositionError | null;
};

const useTracker = (interval: number = 2000): TrackRecorder => {
  const {
    latestPosition,
    lastKnownPosition,
    startWatchingPosition,
    stopWatchingPosition,
    geolocationError,
    isWatchingPosition,
  } = useGeolocation();

  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<GeolocationPosition[]>([]);

  useEffect(() => {
    startWatchingPosition();

    return () => {
      stopWatchingPosition();
    };
  }, []);

  useInterval(
    () => {
      updateCurrentTrack();
    },
    isTracking ? interval : null
  );

  const updateCurrentTrack = () => {
    if (latestPosition === null) {
      return;
    }

    console.log(latestPosition);
    setCurrentTrack([...currentTrack, latestPosition]);
  };

  // const startWatching = (): void => {
  //   if (isWatchingPosition) {
  //     return;
  //   }
  //   startWatchingPosition();
  // };

  // const stopWatching = (): void => {
  //   if (!isWatchingPosition) {
  //     return;
  //   }
  //   stopWatchingPosition();
  // };

  const startTracking = (): void => {
    if (isTracking) {
      return;
    }

    if (!isWatchingPosition) {
      startWatchingPosition();
    }

    setIsTracking(true);
  };

  const stopTracking = (): void => {
    if (!isTracking) {
      return;
    }

    setIsTracking(false);
    console.log(currentTrack);
  };

  const resetTracker = (): void => {
    setIsTracking(false);
    setCurrentTrack([]);
  };

  return {
    currentTrack,
    latestPosition,
    lastKnownPosition,
    startTracking,
    stopTracking,
    resetTracker,
    isTracking,
    geolocationError,
  };
};

export default useTracker;
