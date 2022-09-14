import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { axiosInstance } from '../axiosInstance';
import { setStoredUser } from './user-storage';

const Oauth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (window.localStorage.getItem('code') !== code) {
      window.localStorage.setItem('code', code);
      (async () => {
        try {
          const res = await axiosInstance.get(`/user/oauth/token?code=${code}`);
          console.log(res.data);
          navigate('/');
        } catch (e) {
          console.error(e);
          navigate('/');
        }
      })();
    }
  }, []);

  return <></>;
};

export default Oauth;
