import styled from 'styled-components';
import Button from '../../../atom/Button';
import { axiosInstance } from '../../../../axiosInstance';
import Modal from '../../../block/Modal/Modal';
import { Text } from '../../../atom/Text';
import { useNavigate } from 'react-router-dom';

const LeaveModal = ({ onClose, userCode, kakaoEmail }) => {
  const navigate = useNavigate();
  const params = { userCode, kakaoEmail };

  const LeveModalHandler = async () => {
    const res = await axiosInstance.delete(`/user`, { params });
    onClose();
    navigate('/');
  };

  return (
    <Modal onClose={onClose}>
      <StyledLogout>
        <Text className="title" fontSize="md" fontWeight="semiBold">
          정말 탈퇴하실건가요? 🥲
        </Text>
        <div className="button">
          <Button onClick={LeveModalHandler}>예</Button>
          <Button onClick={onClose}>아니오</Button>
        </div>
      </StyledLogout>
    </Modal>
  );
};

export default LeaveModal;

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
