import { useEffect, useState } from 'react';

export const defaultPosition: GeolocationPosition = {
  coords: {
    accuracy: 0,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: 52.1788,
    longitude: 20.9981,
    speed: null,
  },
  timestamp: Date.now(),
};

export type Geolocation = {
  latestPosition: GeolocationPosition | null;
  lastKnownPosition: GeolocationPosition | null;
  defaultPosition: GeolocationPosition;
  updatePositionOnce: () => void;
  startWatchingPosition: () => void;
  stopWatchingPosition: () => void;
  isWatchingPosition: boolean;
  geolocationError: GeolocationPositionError | null;
};

const useGeolocation = (): Geolocation => {
  const [latestPosition, setLatestPosition] =
    useState<GeolocationPosition | null>(null);
  const [lastKnownPosition, setLastKnownPosition] =
    useState<GeolocationPosition | null>(null);
  const [geolocationError, setGeolocationError] =
    useState<GeolocationPositionError | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [isWatchingPosition, setIsWatchingPosition] = useState<boolean>(false);

  useEffect(() => {
    updatePositionOnce();
  }, []);

  useEffect(() => {
    setIsWatchingPosition(watchId !== null);
  }, [watchId]);

  const getCurrentPositionSuccess = (position: GeolocationPosition): void => {
    setLatestPosition(position);
    setLastKnownPosition(position);
    setGeolocationError(null);
  };

  const getCurrentPositionError = (error: GeolocationPositionError): void => {
    setLatestPosition(null);
    setGeolocationError(error);
  };

  const positionOptions: PositionOptions = {
    maximumAge: 0,
    timeout: 10000,
    enableHighAccuracy: false,
  };

  const updatePositionOnce = (): void => {
    navigator.geolocation.getCurrentPosition(
      getCurrentPositionSuccess,
      getCurrentPositionError,
      positionOptions
    );
  };

  const startWatchingPosition = (): void => {
    if (watchId !== null) {
      return;
    }

    const newWatchId = navigator.geolocation.watchPosition(
      getCurrentPositionSuccess,
      getCurrentPositionError,
      positionOptions
    );
    setWatchId(newWatchId);
  };

  const stopWatchingPosition = (): void => {
    if (watchId === null) {
      return;
    }

    navigator.geolocation.clearWatch(watchId);
    setWatchId(null);
  };

  return {
    latestPosition,
    lastKnownPosition,
    defaultPosition,
    updatePositionOnce,
    startWatchingPosition,
    stopWatchingPosition,
    isWatchingPosition,
    geolocationError,
  };
};

export default useGeolocation;
