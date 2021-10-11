import { useState } from 'react';

import useGeolocation from './useGeolocation';
import useInterval from './useInterval';

export enum GPS_TRACKER_STATE {
  'ON',
  'OFF',
}

const useGpsTracker = (interval: number = 3000) => {
  const { lastPosition, startWatchingPosition, stopWatchingPosition } =
    useGeolocation();

  const [trackerState, setTrackerState] = useState<GPS_TRACKER_STATE>(
    GPS_TRACKER_STATE.OFF
  );
  const [positions, setPositions] = useState<GeolocationPosition[]>([]);

  const intervalRef = useInterval(
    () => {
      saveLastPosition();
    },
    trackerState === GPS_TRACKER_STATE.ON ? interval : null
  );

  const saveLastPosition = () => {
    if (lastPosition === null) {
      console.error('null position, skipping save');
      return;
    }
    console.log('saving position', new Date().toLocaleString());

    setPositions([...positions, lastPosition]);
  };

  const startTracking = (): void => {
    console.log('TRACKER START');
    setTrackerState(GPS_TRACKER_STATE.ON);
    startWatchingPosition();
  };

  const pauseTracking = (): void => {
    setTrackerState(GPS_TRACKER_STATE.OFF);
    stopWatchingPosition();
  };

  const stopTracking = (): void => {
    console.log('TRACKER STOP');
    console.log(positions);
    setTrackerState(GPS_TRACKER_STATE.OFF);
    stopWatchingPosition();
    // todo: save positions
  };

  return {
    startTracking,
    pauseTracking,
    stopTracking,
  };
};

export default useGpsTracker;
