import React, { useEffect, useState } from 'react';
import { Checkbox, message } from 'antd';

import MapCanvas from '../mapCanvas/MapCanvas';
import Map from '../map/Map';
import TrackerDashboard from '../trackerDashboard/TrackerDashboard';
import TrackerControls from '../trackerControls/TrackerControls';

import useTracker from '../../hooks/useTracker';
import useActivityStatistics from '../../hooks/useActivityStatistics';

import './trackerPage.less';

import {
  PauseCircleOutlined,
  PlayCircleOutlined,
  CompassOutlined,
  AimOutlined,
} from '@ant-design/icons';

const TrackerPage: React.FC = () => {
  const {
    latestPosition,
    lastKnownPosition,
    track,
    startTracking,
    stopTracking,
    isTracking,
  } = useTracker();

  const activityStatistics = useActivityStatistics(track);

  const [panToPosition, setPanToPosition] = useState<boolean>(false);
  const [followPosition, setFollowPosition] = useState<boolean>(true);

  useEffect(() => {
    message.info('Searching for position...');
  }, []);

  const handleStartTracking = (): void => {
    startTracking();
  };

  const handleStopTracking = (): void => {
    stopTracking();
    console.log(track);
    // todo: save to database, redirect to track saving screen
  };

  const handleFollowPosition = (): void => {
    setFollowPosition(!followPosition);
  };

  const handlePanToPosition = (): void => {
    setPanToPosition(true);

    setTimeout(() => {
      setPanToPosition(false);
    }, 1000);
  };

  return (
    <div className='tracker-page'>
      <TrackerDashboard show={isTracking} {...activityStatistics} />
      <MapCanvas
        render={(height) => (
          <Map
            height={height}
            track={track}
            position={latestPosition || lastKnownPosition}
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
              onClick={handleStartTracking}
            />
          }
          secondaryControl={
            <TrackerControls.PopconfirmButton
              buttonText='Stop Tracking'
              popconfirmText='Do you want to stop tracking?'
              messageTextConfirm='Tracking stopped'
              messageTextCancel='Tracking continues'
              icon={<PauseCircleOutlined />}
              onConfirm={handleStopTracking}
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
          onClick={handleFollowPosition}
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
          onClick={handlePanToPosition}
        />
      </TrackerControls>
    </div>
  );
};

export default TrackerPage;
