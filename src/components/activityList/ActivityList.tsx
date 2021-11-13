import React from 'react';
import { Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import './activityList.less';

import Activity from '../activity/Activity';
import { useReadActivites } from '../../firebase/hooks/useActivities';

// export type ActivityListProps = {
//   activities: Array<ActivityType>;
// };

const ActivityList: React.FC = () => {
  const activities = useReadActivites();

  return (
    <>
      {activities.length === 0 ? (
        <Typography.Title level={2}></Typography.Title>
      ) : (
        activities.map((activity) => (
          <Activity activity={activity} key={uuidv4()} />
        ))
      )}
    </>
  );
};

export default ActivityList;
