import styled from 'styled-components';

import Modal from '../components/block/Modal/Modal';
import { Text } from '../components/atom/Text';
import { getStoredUser } from './user-storage';
import { useAuth } from './useAuth';
import Button from '../components/atom/Button';

const Logout = ({ onClose }) => {
  const { signOut } = useAuth();

  const logoutHandler = async () => {
    const user = getStoredUser();
    signOut(user.userCode);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <StyledLogout>
        <Text className="title" fontSize="md" fontWeight="semiBold">
          정말 로그아웃 하실건가요? 🥺
        </Text>
        <div className="button">
          <Button onClick={logoutHandler}>예</Button>
          <Button onClick={onClose}>아니오</Button>
        </div>
      </StyledLogout>
    </Modal>
  );
};

export default Logout;

const StyledLogout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;

  .button {
    margin-top: 20px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
  }

  ${Button} {
    margin: 10px;
    height: 30px;
    width: 15vw;
    max-width: 200px;
    min-width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 600;
  }
`;
