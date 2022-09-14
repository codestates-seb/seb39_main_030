import styled from 'styled-components';
import { RiKakaoTalkFill } from 'react-icons/ri';

const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URI = 'http://localhost:3000/auth';

const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const Login = () => {
  return (
    <StyledLogin>
      <a href={KAKAO_AUTH_URI}>
        <RiKakaoTalkFill className="logo-kakao" />
        카카오로 시작하기
      </a>
    </StyledLogin>
  );
};

export default Login;

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 45px;
    background: #f9e000;
    color: #4f3131;
    border-radius: 10px;
  }

  a:link,
  a:visited {
    text-decoration: none;
  }

  font-size: 15px;
  font-weight: 600;

  .logo-kakao {
    width: 26px;
    height: 26px;
    margin-bottom: 3px;
    margin-right: 10px;
  }
`;
