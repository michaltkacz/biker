import { useAuth } from './useAuth';
import { User } from '@firebase/auth';

const useUserId = () => {
  const { currentUser } = useAuth();
  return (currentUser as User).uid;
};

export default useUserId;
