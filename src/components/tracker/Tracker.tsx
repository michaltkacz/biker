import React, { useEffect, useState } from 'react';
import { Checkbox, message } from 'antd';

import MapCanvas from '../mapCanvas/MapCanvas';
import Map from '../map/Map';
import TrackerDashboard from '../trackerDashboard/TrackerDashboard';
import TrackerControls from '../trackerControls/TrackerControls';

import useTracker from '../../hooks/useTracker';

import './tracker.less';

import {
  PauseCircleOutlined,
  PlayCircleOutlined,
  CompassOutlined,
  AimOutlined,
} from '@ant-design/icons';

const Tracker: React.FC = () => {
  const {
    latestPosition: position, //temporary test
    currentTrack,
    startTracking,
    stopTracking,
    isTracking,
    trackingTime,
  } = useTracker();

  // const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [panToPosition, setPanToPosition] = useState<boolean>(false);
  const [followPosition, setFollowPosition] = useState<boolean>(true);

  // useEffect(() => {
  //   if (latestPosition) {
  //     setPosition(latestPosition);
  //     return;
  //   }

  //   if (lastKnownPosition) {
  //     setPosition(lastKnownPosition);
  //     return;
  //   }
  // }, [latestPosition, lastKnownPosition]);

  useEffect(() => {
    message.info('Searching for position...');
  }, []);

  const startTrackingCallback = (): void => {
    startTracking();
  };

  const stopTrackingCallback = (): void => {
    stopTracking();
  };

  const followPositionCallback = () => {
    setFollowPosition(!followPosition);
  };

  const panToPositionCallback = () => {
    setPanToPosition(true);

    setTimeout(() => {
      setPanToPosition(false);
    }, 1000);
  };

  return (
    <div className='tracker'>
      <TrackerDashboard
        show={isTracking}
        position={position}
        trackingTime={trackingTime}
      />
      <MapCanvas
        render={(height) => (
          <Map
            height={height}
            track={currentTrack}
            position={position}
            followPosition={followPosition}
            panToPosition={panToPosition}
          />
        )}
      />
      <TrackerControls>
        <TrackerControls.ToggleControl
          toggled={isTracking}
          primaryControl={
            <TrackerControls.Button
              text='Start Tracking'
              messageText='Tracking activated'
              icon={<PlayCircleOutlined />}
              onClick={startTrackingCallback}
            />
          }
          secondaryControl={
            <TrackerControls.PopconfirmButton
              buttonText='Stop Tracking'
              popconfirmText='Do you want to stop tracking?'
              messageTextConfirm='Tracking stopped'
              messageTextCancel='Tracking continues'
              icon={<PauseCircleOutlined />}
              onConfirm={stopTrackingCallback}
            />
          }
        />
        <TrackerControls.Button
          text='Follow Position'
          messageText={`${
            followPosition
              ? 'Following position disabled'
              : 'Following position enabled'
          }`}
          icon={<CompassOutlined />}
          onClick={followPositionCallback}
        >
          <Checkbox
            checked={followPosition}
            style={{ marginLeft: '0.25rem' }}
          />
        </TrackerControls.Button>
        <TrackerControls.Button
          text='Pan To Position'
          messageText='Panning to position...'
          icon={<AimOutlined />}
          onClick={panToPositionCallback}
        />
      </TrackerControls>
    </div>
  );
};

export default Tracker;
