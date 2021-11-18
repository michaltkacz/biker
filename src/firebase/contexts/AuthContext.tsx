import React, { useState, useEffect, createContext } from 'react';
import {
  User,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from '@firebase/auth';

import { auth } from '../firebase';
import { Result, Spin } from 'antd';

export type IAuthContext = {
  currentUser: User | null;
  currentUserId: string | null;
  updateUser: (payload: UpdateUserPayload) => Promise<void>;
  logoutUser: () => void;
};

export type UpdateUserPayload = {
  displayName?: string;
  photoURL?: string;
};

const style = {
  width: '100%',
  height: '100%',
  display: 'flex',
  placeContent: 'center',
  placeItems: 'center',
};

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setCurrentUser(user);
        setAuthLoading(false);
        setAuthError(false);
      },
      (error) => {
        console.log(error);
        setCurrentUser(null);
        setAuthLoading(false);
        setAuthError(true);
      }
    );
    return unsubscribe;
  }, []);

  if (authLoading) {
    return <Spin style={style} />;
  }

  if (authError) {
    return <Result status='error' title='Authorization failed' style={style} />;
  }

  const updateUser = async (payload: UpdateUserPayload): Promise<void> => {
    try {
      if (!currentUser) {
        throw new Error('UserID cannot be null');
      }

      updateProfile(currentUser, payload).then(() => currentUser.reload());
      return;
    } catch (er) {
      console.error(er);
      throw new Error(`updateUser failed. ${er}`);
    }
  };

  const logoutUser = (): void => {
    signOut(auth);
  };

  const currentUserId = currentUser ? currentUser.uid : null;

  const value: IAuthContext = {
    currentUser,
    currentUserId,
    updateUser,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
