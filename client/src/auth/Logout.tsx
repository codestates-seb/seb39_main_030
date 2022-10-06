import styled from 'styled-components';

import Modal from '../components/block/Modal/Modal';
import { Text } from '../components/atom/Text';
import { getStoredUser } from './user-storage';
import Button from '../components/atom/Button';
import { useMutation, useQueryClient } from 'react-query';
import { axiosInstance } from '../axiosInstance';
import { queryKeys } from '../react-query/constants';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onClose }) => {
  const user = getStoredUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logoutApi = async (): Promise<void> => {
    if (
      process.env.NODE_ENV === 'development' &&
      process.env.REACT_APP_MOCK === '1'
    ) {
      await axiosInstance.get(`/user/logout`);
    } else {
      const params = {
        userCode: user.userCode,
      };
      await axiosInstance.post(`/user/logout`, null, {
        params,
      });
    }
  };

  const logoutMutation = useMutation(logoutApi, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.infiniteDebateList);
      navigate('/socket', { state: 'logout' });
    },
  });
  const logoutHandler = async () => {
    logoutMutation.mutate();
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
