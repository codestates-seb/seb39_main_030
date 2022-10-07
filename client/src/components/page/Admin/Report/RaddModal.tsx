import styled from 'styled-components';
import Modal from '../../../block/Modal/Modal';
import { Text } from '../../../atom/Text';
import Button from '../../../atom/Button';
import { axiosInstance } from '../../../../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { basicToastOption } from '../../../app/Layout';

const RaddModal = ({
  onClose,
  userCode,
  declarationCode,
  declarationAnswer,
}) => {
  const navigate = useNavigate();
  const addModalHandler = async () => {
    await axiosInstance
      .post('/declaration/feedback', {
        declarationCode: declarationCode,
        userCode: userCode,
        declarationAnswer: declarationAnswer,
      })
      .then(() => {
        navigate('/admin');
        toast.success('신고가 처리되었습니다.', {
          position: 'top-center',
          ...basicToastOption,
        });
      });
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <StyledLogout>
        <Text className="title" fontSize="md" fontWeight="semiBold">
          답변하시겠습니까?
        </Text>
        <div className="button">
          <Button onClick={addModalHandler}>예</Button>
          <Button onClick={onClose}>아니오</Button>
        </div>
      </StyledLogout>
    </Modal>
  );
};

export default RaddModal;

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
