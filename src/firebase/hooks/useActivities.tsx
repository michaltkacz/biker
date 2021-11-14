import { useEffect, useState } from 'react';
import {
  ref,
  set,
  onValue,
  push,
  child,
  remove,
  update,
} from 'firebase/database';

import { database } from '../firebase';

import useUserId from './useUserId';

import { Activity, ActivityUpdate } from '../../database/schema';

export const useReadActivites = () => {
  const [activities, setActivities] = useState<Array<Activity>>([]);

  const userId = useUserId();

  useEffect(() => {
    const path = 'users/' + userId + '/activities';
    onValue(ref(database, path), (snapshot) => {
      const newData = snapshot.val();
      if (newData) {
        const arrayData: Array<Activity> = Object.values(newData);
        arrayData.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });
        setActivities(arrayData);
      } else {
        setActivities([]);
      }
    });
  }, []);

  return activities;
};

export const useWriteActivity = () => {
  const userId = useUserId();

  const writeActivity = (activity: Activity): Activity => {
    const parentPath = 'users/' + userId + '/activities';
    const activityId = push(child(ref(database), parentPath)).key || '';

    const targetPath = parentPath + '/' + activityId;
    const activityWithId = { ...activity, activityId };

    set(ref(database, targetPath), activityWithId);

    return activityWithId;
  };

  return writeActivity;
};

export const useDeleteActivity = () => {
  const userId = useUserId();

  const deleteActivity = (activityId: string): void => {
    const path = 'users/' + userId + '/activities/' + activityId;
    remove(ref(database, path));
  };

  return deleteActivity;
};

export const useUpdateActivity = () => {
  const userId = useUserId();

  const updateActivity = (
    activityId: string,
    payload: { [filed: string]: any }
  ): void => {
    const path = 'users/' + userId + '/activities/' + activityId;
    update(ref(database, path), payload);
  };

  return updateActivity;
};
