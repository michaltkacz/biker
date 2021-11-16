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
  currentUserId: string;
  updateUser: (payload: UpdateUserPayload) => Promise<{
    error: boolean;
  }>;
  logoutUser: () => void;
};

export type UpdateUserPayload = {
  displayName?: string;
  photoURL?: string;
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
        setCurrentUser(null);
        setAuthLoading(false);
        setAuthError(true);
      }
    );
    return unsubscribe;
  }, []);

  if (authLoading) {
    return (
      <Spin
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          placeContent: 'center',
          placeItems: 'center',
        }}
      />
    );
  }

  if (authError) {
    return <Result status='error' title='Authorization failed' />;
  }

  const updateUser = async (
    payload: UpdateUserPayload
  ): Promise<{
    error: boolean;
  }> => {
    if (!currentUser) {
      return { error: true };
    }

    try {
      updateProfile(currentUser, payload).then(() => currentUser.reload());
      return { error: false };
    } catch (er) {
      return { error: true };
    }
  };

  const logoutUser = (): void => {
    signOut(auth);
  };

  const currentUserId = currentUser ? currentUser.uid : '';

  const value: IAuthContext = {
    currentUser,
    currentUserId,
    updateUser,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
