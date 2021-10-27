import { useContext } from 'react';
import { DatabaseContext } from '../contexts/DatabaseContext';

export const useDatabase = () => {
  const context = useContext(DatabaseContext);

  if (context === undefined) {
    throw new Error('useDatabase must be within DatabaseProvider');
  }

  return context;
};
