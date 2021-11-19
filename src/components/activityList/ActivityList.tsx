import React from 'react';
import { Result } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import './activityList.less';

import Activity from '../activity/Activity';
import LoadingSpinner from './../loadingSpinner/LoadingSpinner';

import { useReadActivities } from '../../firebase/hooks/useDatabase';
import { useAuth } from '../../firebase/hooks/useAuth';

export type ActivityListProps = {};

const ActivityList: React.FC<ActivityListProps> = () => {
  const { currentUserId } = useAuth();
  const { activities, loading, error } = useReadActivities(currentUserId);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Result status='error' title='Something has gone wrong' />;
  }

  if (activities.length === 0) {
    return <Result status='info' title='No activities to display' />;
  }

  return (
    <>
      {activities.map((activity) => (
        <Activity activity={activity} key={uuidv4()} />
      ))}
    </>
  );
};

export default ActivityList;
