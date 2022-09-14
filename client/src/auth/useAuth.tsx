import axios, { AxiosResponse } from 'axios';

import { User } from '../type';
import { axiosInstance } from '../axiosInstance';
import useUser from './useUser';

interface UseAuth {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

type UserResponse = { user: User };
type ErrorResponse = { message: string };
type AuthResponseType = UserResponse | ErrorResponse;

export function useAuth(): UseAuth {
  const SERVER_ERROR = 'There was an error contacting the server.';
  const { clearUser, updateUser } = useUser();

  async function authServerCall(
    urlEndpoint: string,
    email: string,
    password: string
  ): Promise<void> {
    try {
      const { data, status }: AxiosResponse<AuthResponseType> =
        await axiosInstance({
          url: urlEndpoint,
          method: 'POST',
          data: { email, password },
          headers: { 'Content-Type': 'application/json' },
        });

      if (status === 400) {
        const title = 'message' in data ? data.message : 'Unauthorized';
        // toast({ title, status: 'warning' });
        return;
      }

      if ('user' in data && 'token' in data.user) {
        // toast({
        //   title: `Logged in as ${data.user.email}`,
        //   status: 'info',
        // });

        // update stored user data
        updateUser(data.user);
      }
    } catch (errorResponse) {
      const title =
        axios.isAxiosError(errorResponse) &&
        (errorResponse.response.data as any).message
          ? (errorResponse.response.data as any).message
          : SERVER_ERROR;
      // toast({
      //   title,
      //   status: 'error',
      // });
    }
  }

  async function signIn(email: string, password: string): Promise<void> {
    authServerCall('/signin', email, password);
  }
  async function signUp(email: string, password: string): Promise<void> {
    authServerCall('/user', email, password);
  }

  function signOut(): void {
    // clear user from stored user data
    clearUser();
    // toast({
    //   title: 'Logged out!',
    //   status: 'info',
    // });
  }

  // Return the user object and auth methods
  return {
    signIn,
    signUp,
    signOut,
  };
}
