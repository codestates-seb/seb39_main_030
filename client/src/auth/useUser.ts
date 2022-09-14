import { useQuery, useQueryClient } from 'react-query';

import type { User } from '../type';
import { axiosInstance, getJWTHeader } from '../axiosInstance';
import { queryKeys } from '../react-query/constants';
import { clearStoredUser, getStoredUser, setStoredUser } from './user-storage';

async function getUser(
  user: User | null,
  signal: AbortSignal
): Promise<User | null> {
  if (!user) return null;
  const { data } = await axiosInstance.get(`/user/${user.id}`, {
    headers: getJWTHeader(user),
    signal,
  });
  return data;
}

interface UseUser {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

const useUser = (): UseUser => {
  const queryClient = useQueryClient();
  // TODO: call useQuery to update user data from server
  const { data: user } = useQuery(
    queryKeys.user,
    ({ signal }) => getUser(user, signal),
    {
      initialData: getStoredUser(),
      onSuccess: (received: User | null) => {
        if (!received) {
          clearStoredUser();
        } else {
          setStoredUser(received);
        }
      },
    }
  );

  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    // TODO: update the user in the query cache
    queryClient.setQueryData(queryKeys.user, newUser);
  }

  // meant to be called from useAuth
  function clearUser() {
    // TODO: reset user to null in query cache
    queryClient.setQueryData(queryKeys.user, null);
  }

  return { user, updateUser, clearUser };
};

export default useUser;
