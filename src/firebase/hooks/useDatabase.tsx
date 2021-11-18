import { useEffect, useState } from 'react';
import {
  ref,
  set,
  onValue,
  push,
  child,
  remove,
  update,
  get,
} from 'firebase/database';

import { database } from '../firebase';

import {
  Activity,
  Track,
  UserProfile,
  UserStatistics,
} from '../../database/schema';

// *
// * READ
// *

export const useReadAllActivities = (userId: string | null) => {
  const [activities, setActivities] = useState<Array<Activity>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let unsubscribe;
    try {
      if (!userId) {
        throw new Error('useReadAllActivities failed. UserID cannot be null.');
      }

      const pathToActivities = 'users/' + userId + '/activities';
      unsubscribe = onValue(ref(database, pathToActivities), (snapshot) => {
        if (snapshot.exists()) {
          const newData: Array<Activity> = Object.values(snapshot.val());
          newData.sort((a, b) => {
            return b.createdAt - a.createdAt;
          });
          setActivities(newData);
        } else {
          setActivities([]);
        }
        setLoading(false);
      });
    } catch (er) {
      setActivities([]);
      setLoading(false);
      setError(true);
    } finally {
      return unsubscribe;
    }
  }, [userId]);

  return { activities, loading, error };
};

export const useReadTrack = (userId: string | null, trackId: string) => {
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let unsubscribe;
    try {
      if (!userId) {
        throw new Error('useReadTrack failed. UserID cannot be null.');
      }
      const pathToTrack = 'users/' + userId + '/tracks/' + trackId;
      unsubscribe = onValue(ref(database, pathToTrack), (snapshot) => {
        if (snapshot.exists()) {
          setTrack(snapshot.val());
        }
        setLoading(false);
        setError(false);
      });
    } catch (er) {
      setTrack(null);
      setLoading(false);
      setError(true);
    } finally {
      return unsubscribe;
    }
  }, [userId, trackId]);

  return { track, loading, error };
};

export const useReadStatistics = (userId: string | null) => {
  const [statistics, setStatistics] = useState<UserStatistics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let unsubscribe;
    try {
      if (!userId) {
        throw new Error('useReadStatistics failed. UserID cannot be null.');
      }
      const pathToStatistics = 'users/' + userId + '/statistics';
      unsubscribe = onValue(ref(database, pathToStatistics), (snapshot) => {
        if (snapshot.exists()) {
          setStatistics(snapshot.val());
        }
        setLoading(false);
        setError(false);
      });
    } catch (er) {
      setStatistics(null);
      setLoading(false);
      setError(true);
    } finally {
      return unsubscribe;
    }
  }, [userId]);

  return { statistics, loading, error };
};

export const useReadProfile = (userId: string | null) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let unsubscribe;
    try {
      if (!userId) {
        throw new Error('useReadProfile failed. UserID cannot be null.');
      }

      const path = 'users/' + userId + '/profile';
      unsubscribe = onValue(ref(database, path), (snapshot) => {
        if (snapshot.exists()) {
          setProfile(snapshot.val());
        }
        setLoading(false);
        setError(false);
      });
    } catch (er) {
      setProfile(null);
      setLoading(false);
      setError(true);
    } finally {
      return unsubscribe;
    }
  }, [userId]);

  return { profile, loading, error };
};

// *
// * WRITE
// *

export const writeActivityWithTrack = async (
  userId: string | null,
  activity: Activity,
  track: Track
): Promise<{ updatedActivity: Activity; updatedTrack: Track }> => {
  try {
    if (!userId) {
      throw new Error('UserID cannot be null');
    }
    const activityParentPath = 'users/' + userId + '/activities';
    const activityId = push(child(ref(database), activityParentPath)).key || '';
    const updatedActivity = { ...activity, activityId };
    set(ref(database, activityParentPath + '/' + activityId), updatedActivity);

    const trackParentPath = 'users/' + userId + '/tracks';
    const updatedTrack = { ...track, activityId };
    set(ref(database, trackParentPath + '/' + activityId), updatedTrack);

    return { updatedActivity, updatedTrack };
  } catch (er) {
    throw new Error(`writeActivityWithTrack failed. ${er}`);
  }
};

// *
// * DELETE
// *

export const deleteActivityWithTrack = async (
  userId: string | null,
  activityId: string
): Promise<void> => {
  try {
    if (!userId) {
      throw new Error('UserID cannot be null');
    }

    const activityPath = 'users/' + userId + '/activities/' + activityId;
    const trackPath = 'users/' + userId + '/tracks/' + activityId;
    remove(ref(database, activityPath));
    remove(ref(database, trackPath));
    return;
  } catch (er) {
    throw new Error(`deleteActivityWithTrack failed. ${er}`);
  }
};

// *
// * UPDATE
// *

export const updateActivity = async (
  userId: string | null,
  activityId: string,
  payload: { [field: string]: any }
) => {
  try {
    if (!userId) {
      throw new Error('UserID cannot be null');
    }

    const activityPath = 'users/' + userId + '/activities/' + activityId;
    update(ref(database, activityPath), payload);
    return;
  } catch (er) {
    throw new Error(`deleteActivityWithTrack failed. ${er}`);
  }
};

export const updateProfile = async (
  userId: string | null,
  payload: { [field: string]: any }
): Promise<void> => {
  try {
    if (!userId) {
      throw new Error('UserID cannot be null');
    }

    const profilePath = 'users/' + userId + '/profile';
    update(ref(database, profilePath), payload);
    return;
  } catch (er) {
    throw new Error(`writeProfile failed. ${er}`);
  }
};

export const updateStatistics = async (
  userId: string | null
): Promise<void> => {
  try {
    if (!userId) {
      throw new Error('UserID cannot be null');
    }

    const pathToActivities = 'users/' + userId + '/activities';
    const snapshot = await get(ref(database, pathToActivities));
    if (snapshot.exists()) {
      const newData: Array<Activity> = Object.values(snapshot.val());
      console.log(newData);
    }

    // const statisticsPath = 'users/' + userId + '/statistics';
    // update(ref(database, statisticsPath), payload);
    return;
  } catch (er) {
    throw new Error(`updateStatistics failed. ${er}`);
  }
};
