import styled from 'styled-components';
import { RiKakaoTalkFill } from 'react-icons/ri';
import Modal from '../components/block/Modal/Modal';
import { Text } from '../components/atom/Text';

const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL;

const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;

const Login = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <StyledLogin>
        <Text fontSize="lg" fontWeight="semiBold" className="title">
          시작하기
        </Text>
        <a className="kakao" href={KAKAO_AUTH_URI}>
          <RiKakaoTalkFill className="logo-kakao" />
          카카오로 시작하기
        </a>
      </StyledLogin>
    </Modal>
  );
};

export default Login;

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 1rem 3rem;

  .title {
    margin-top: -15px;
  }

  .kakao {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18vw;
    min-width: 200px;
    height: 45px;
    background: #f9e000;
    color: #4f3131;
    border-radius: 10px;
    margin-top: 30px;
    margin-bottom: 10px;
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
