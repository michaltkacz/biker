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

import { Activity } from '../../database/schema';

export const useReadActivites = () => {
  const [activities, setActivities] = useState<Array<Activity>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const userId = useUserId();

  useEffect(() => {
    const path = 'users/' + userId + '/activities';
    try {
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
        setLoading(false);
      });
    } catch (er) {
      setActivities([]);
      setLoading(false);
      setError(true);
    }
  }, [userId]);

  return { activities, loading, error };
};

export const useWriteActivity = () => {
  const userId = useUserId();

  const writeActivity = async (
    activity: Activity
  ): Promise<{ activity: Activity; error: boolean }> => {
    const parentPath = 'users/' + userId + '/activities';
    try {
      const activityId = push(child(ref(database), parentPath)).key || '';
      const targetPath = parentPath + '/' + activityId;
      const newActivity = { ...activity, activityId };
      set(ref(database, targetPath), newActivity);
      return { activity: newActivity, error: false };
    } catch (er) {
      return { activity, error: true };
    }
  };

  return writeActivity;
};

export const useDeleteActivity = () => {
  const userId = useUserId();

  const deleteActivity = async (
    activityId: string
  ): Promise<{ error: boolean }> => {
    const path = 'users/' + userId + '/activities/' + activityId;
    try {
      remove(ref(database, path));
      return { error: false };
    } catch (er) {
      return { error: true };
    }
  };

  return deleteActivity;
};

export const useUpdateActivity = () => {
  const userId = useUserId();

  const updateActivity = async (
    activityId: string,
    payload: { [filed: string]: any }
  ): Promise<{ error: boolean }> => {
    const path = 'users/' + userId + '/activities/' + activityId;
    try {
      update(ref(database, path), payload);
      return { error: false };
    } catch (er) {
      return { error: true };
    }
  };

  return updateActivity;
};
