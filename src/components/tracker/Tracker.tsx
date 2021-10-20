import React, { useEffect, useState } from 'react';
import { Checkbox } from 'antd';

import MapCanvas from '../mapCanvas/MapCanvas';
import Map, { Position, PositionType } from '../map/Map';
import TrackerDashboard from '../trackerDashboard/TrackerDashboard';
import TrackerControls from '../trackerControls/TrackerControls';

import useTracker from '../../hooks/useTracker';

import './tracker.less';

import {
  PauseCircleOutlined,
  PlayCircleOutlined,
  // SettingOutlined,
  CompassOutlined,
  AimOutlined,
} from '@ant-design/icons';

const Tracker: React.FC = () => {
  const {
    latestPosition,
    lastKnownPosition,
    currentTrack,
    startTracking,
    stopTracking,
    isTracking,
  } = useTracker();

  const [position, setPosition] = useState<Position | null>(null);
  const [panToPosition, setPanToPosition] = useState<boolean>(false);
  const [followPosition, setFollowPosition] = useState<boolean>(true);
  // const { value: followPosition, toggleValue: toggleFollowPosition } =
  //   useToggle(true);
  // const { value: panToPosition, toggleValue: togglePanToPosition } =
  //   useToggle(false);

  useEffect(() => {
    console.log(currentTrack);
  }, [currentTrack]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (latestPosition) {
      setPosition({ position: latestPosition, type: PositionType.latest });
      return;
    }

    if (lastKnownPosition) {
      setPosition({
        position: lastKnownPosition,
        type: PositionType.lastKnown,
      });
      return;
    }
  }, [latestPosition, lastKnownPosition]);

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
      <TrackerDashboard />
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
