import React, { useEffect, useState } from 'react';
import { Checkbox, message } from 'antd';

import MapCanvas from '../mapCanvas/MapCanvas';
import Map from '../map/Map';
import TrackerStatisticsDashboard from '../trackerStatisticsDashboard/TrackerStatisticsDashboard';
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

import {
  Activity,
  ActivityCategoryTypes,
  ActivitySportTypes,
} from '../../database/schema';
import Pages from '../../global/pages';
import { useHistory } from 'react-router';
import { useWriteActivity } from '../../firebase/hooks/useActivities';
import useUserId from '../../firebase/hooks/useUserId';

const TrackerPage: React.FC = () => {
  const {
    latestPosition,
    lastKnownPosition,
    track,
    startTracking,
    stopTracking,
    isTracking,
  } = useTracker();
  const writeActivity = useWriteActivity();
  const history = useHistory();
  const userId = useUserId();

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
    const { latestSpeed, latestElevation, ...statistics } = activityStatistics;
    const activity: Activity = {
      activityId: '',
      creatorId: userId,
      name: 'Activity ' + new Date().toLocaleString(),
      createdAt: Date.now(),
      lastModifiedAt: Date.now(),
      startTime: track[0][0].time,
      endTime: Date.now(),
      sport: ActivitySportTypes.Other,
      category: ActivityCategoryTypes.Other,
      shape: { isLoop: false, from: 'unknown', to: 'unknown' },
      statistics: statistics,
      track: track,
    };

    message.info('Saving activity');
    writeActivity(activity).then(({ error }) => {
      if (error) {
        message.error("Activity coludn't be saved");
      } else {
        message.success('Activity saved');
        history.push(Pages.Activities);
      }
    });
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
      <TrackerStatisticsDashboard show={isTracking} {...activityStatistics} />
      <MapCanvas
        render={(height) => (
          <Map
            height={height}
            track={track}
            position={
              (latestPosition && {
                lat: latestPosition.coords.latitude,
                lon: latestPosition.coords.longitude,
              }) ||
              (lastKnownPosition && {
                lat: lastKnownPosition.coords.latitude,
                lon: lastKnownPosition.coords.longitude,
              }) ||
              null
            }
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
