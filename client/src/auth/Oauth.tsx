import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { axiosInstance } from '../axiosInstance';
import { useAuth } from './useAuth';

const Oauth = () => {
  const { signIn } = useAuth();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (window.localStorage.getItem('code') !== code) {
      console.log(code);
      window.localStorage.setItem('code', code);
      signIn(code);
    }
  }, []);

  return <></>;
};

export default Oauth;
