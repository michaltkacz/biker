import React, { useState, useEffect, createContext } from 'react';

import { collection, addDoc } from 'firebase/firestore';

import { database } from '../firebase/firebase';
import { ref, set } from '@firebase/database';

export interface IDatabaseContext {}

export const DatabaseContext = createContext<IDatabaseContext | undefined>(
  undefined
);

export const DatabaseContextProvider: React.FC = ({ children }) => {
  useEffect(() => {}, []);

  const value: IDatabaseContext = {};

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
};
