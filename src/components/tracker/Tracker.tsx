import React from 'react';

import MapCanvas from '../mapCanvas/MapCanvas';
import TrackerDashboard from '../trackerDashboard/TrackerDashboard';
import TrackerControls from '../trackerControls/TrackerControls';

import './tracker.less';

const Tracker: React.FC = () => {
  return (
    <div className='tracker'>
      <TrackerDashboard />
      <MapCanvas />
      <TrackerControls />
    </div>
  );
};

export default Tracker;
