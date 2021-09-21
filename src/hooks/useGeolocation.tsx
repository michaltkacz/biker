import { useEffect, useState } from 'react';

const useGeolocation = (): {
  currentLocation: GeolocationPosition | null;
  geolocationError: GeolocationPositionError | null;
  defaultLocation: GeolocationPosition;
} => {
  const [defaultLocation] = useState<GeolocationPosition>({
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
  });
  const [currentLocation, setCurrentLocation] =
    useState<GeolocationPosition | null>(null);
  const [geolocationError, setGeolocationError] =
    useState<GeolocationPositionError | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation(position);
        setGeolocationError(null);
      },
      (error) => {
        setCurrentLocation(null);
        setGeolocationError(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 10000,
      }
    );
  }, []);

  useEffect(() => {
    console.log('currentLocation: ', currentLocation);
    console.log('geolocationError: ', geolocationError);
  }, [currentLocation, geolocationError]);

  return { currentLocation, geolocationError, defaultLocation };
};

export default useGeolocation;
