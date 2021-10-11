import { useEffect, useState } from 'react';

const defaultPosition: GeolocationPosition = {
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

const useGeolocation = (): {
  lastPosition: GeolocationPosition | null;
  defaultPosition: GeolocationPosition;
  updateOncePosition: () => void;
  startWatchingPosition: () => void;
  stopWatchingPosition: () => void;
  geolocationError: GeolocationPositionError | null;
} => {
  const [lastPosition, setLastPosition] = useState<GeolocationPosition | null>(
    null
  );
  const [watchId, setWatchId] = useState<number | null>(null);
  const [geolocationError, setGeolocationError] =
    useState<GeolocationPositionError | null>(null);

  useEffect(() => {
    updateOncePosition();
  }, []);

  // useEffect(() => {
  //   console.log('LP_UPDATED: ', new Date(), lastPosition);
  //   // console.log('geolocationError: ', geolocationError);
  // }, [lastPosition]);

  const updateOncePosition = (): void => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Updated position once', position);
        setLastPosition(position);
        setGeolocationError(null);
      },
      (error) => {
        setLastPosition(null);
        setGeolocationError(error);
      },
      {
        enableHighAccuracy: false,
      }
    );
  };

  const startWatchingPosition = (): void => {
    if (watchId !== null) {
      return;
    }

    console.log('Watching position...');
    const id = navigator.geolocation.watchPosition(
      (position) => {
        setLastPosition(position);
        setGeolocationError(null);
      },
      (error) => {
        setLastPosition(null);
        setGeolocationError(error);
      },
      {
        enableHighAccuracy: false,
      }
    );

    setWatchId(id);
  };

  const stopWatchingPosition = (): void => {
    if (watchId === null) {
      return;
    }

    console.log('Clearing watch...', watchId);
    navigator.geolocation.clearWatch(watchId);
    setWatchId(null);
  };

  return {
    lastPosition,
    defaultPosition,
    updateOncePosition,
    startWatchingPosition,
    stopWatchingPosition,
    geolocationError,
  };
};

export default useGeolocation;
