import React, { useState, useEffect, createContext } from 'react';
import { User, onAuthStateChanged, signOut } from '@firebase/auth';

import { auth } from '../firebase/firebase';

export interface IAuthContext {
  currentUser: User | null;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const logout = (): void => {
    signOut(auth);
  };

  const value: IAuthContext = {
    currentUser,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
