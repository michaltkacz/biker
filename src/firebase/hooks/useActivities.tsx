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

import { Activity } from '../../database/schema';
import { useAuth } from './useAuth';

export const useReadActivites = () => {
  const [activities, setActivities] = useState<Array<Activity>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const { currentUserId } = useAuth();

  useEffect(() => {
    const path = 'users/' + currentUserId + '/activities';
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
  }, [currentUserId]);

  return { activities, loading, error };
};

export const useWriteActivity = () => {
  const { currentUserId } = useAuth();

  const writeActivity = async (
    activity: Activity
  ): Promise<{ activity: Activity; error: boolean }> => {
    const parentPath = 'users/' + currentUserId + '/activities';
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
  const { currentUserId } = useAuth();

  const deleteActivity = async (
    activityId: string
  ): Promise<{ error: boolean }> => {
    const path = 'users/' + currentUserId + '/activities/' + activityId;
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
  const { currentUserId } = useAuth();

  const updateActivity = async (
    activityId: string,
    payload: { [filed: string]: any }
  ): Promise<{ error: boolean }> => {
    const path = 'users/' + currentUserId + '/activities/' + activityId;
    try {
      update(ref(database, path), payload);
      return { error: false };
    } catch (er) {
      return { error: true };
    }
  };

  return updateActivity;
};
