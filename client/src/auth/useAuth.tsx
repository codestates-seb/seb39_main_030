import axios, { AxiosResponse } from 'axios';

import { User } from '../type';
import { axiosInstance } from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { clearStoredUser, setStoredUser } from './user-storage';
import { useDispatch } from 'react-redux';
import { userActions } from '../store/user-slice';
import { toast } from 'react-toastify';
import { basicToastOption } from '../components/app/Layout';

interface UseAuth {
  signIn: (code: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: (code: string) => void;
}

type Logout = 'N';
type UserResponse = User;
type AuthResponseType = UserResponse | Logout;

export function useAuth(): UseAuth {
  const SERVER_ERROR = 'There was an error contacting the server.';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function authServerCall(urlEndpoint: string): Promise<void> {
    try {
      const { data, status }: AxiosResponse<AuthResponseType> =
        await axiosInstance.get(urlEndpoint);

      if (data === 'N') {
        clearStoredUser();
        dispatch(userActions.change());
        toast.info('로그아웃이 완료되었습니다.', {
          position: 'top-center',
          ...basicToastOption,
        });
        navigate('/');
        return;
      }

      if (status === 400) {
        toast.warn('잘못된 요청입니다.', {
          position: 'top-center',
          ...basicToastOption,
        });
        navigate('/');
        return;
      }

      if (data) {
        toast.info(`${data.nickname}님, 환영합니다 😘`, {
          position: 'top-center',
          ...basicToastOption,
        });

        setStoredUser(data);
        dispatch(userActions.change());
        navigate('/');
      }
    } catch (errorResponse) {
      const title =
        axios.isAxiosError(errorResponse) &&
        (errorResponse.response.data as any).message
          ? (errorResponse.response.data as any).message
          : SERVER_ERROR;
      toast.error(title, {
        position: 'top-center',
        ...basicToastOption,
      });
      navigate('/');
    }
  }

  async function signIn(code: string): Promise<void> {
    // authServerCall(`/user/oauth/token?code=${code}`); 실데이터
    authServerCall(`/user/oauth/token`);
  }
  async function signUp(): Promise<void> {
    authServerCall('/user');
  }

  function signOut(code: string): void {
    // clear user from stored user data
    // authServerCall(`/user/logout?userCode=${code}`); 실데이터
    authServerCall(`/user/logout`);
  }

  // Return the user object and auth methods
  return {
    signIn,
    signUp,
    signOut,
  };
}
