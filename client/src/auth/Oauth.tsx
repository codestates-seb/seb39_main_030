import { useEffect } from 'react';
import { useAuth } from './useAuth';
import Loading from '../components/app/Loading';

const Oauth = () => {
  const { signIn } = useAuth();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (window.localStorage.getItem('code') !== code) {
      window.localStorage.setItem('code', code);
      signIn(code);
    }
  }, []);

  return (
    <div>
      <Loading sub={false} />
    </div>
  );
};

export default Oauth;
