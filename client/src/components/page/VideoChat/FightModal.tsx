import styled from 'styled-components';
import { Text } from '../../atom/Text';
import Button from '../../atom/Button';
import Modal from '../../block/Modal/Modal';
import { useNavigate } from 'react-router-dom';

const FightModal = ({ onClose, fightUser }) => {
  const navigate = useNavigate();
  const moveToVideo = () => {
    navigate('/video', {
      state: fightUser,
    });
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <StyledSimpleModal>
        <Text fontSize="md" className="title">
          토론신청이 왔습니다.
        </Text>
        <div className="buttonSection">
          <Button className="cancel" onClick={onClose}>
            거절
          </Button>
          <Button onClick={moveToVideo}>수락</Button>
        </div>
      </StyledSimpleModal>
    </Modal>
  );
};

export default FightModal;

const StyledSimpleModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & .title {
    text-align: center;
  }
  & .content {
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: center;
  }

  & .buttonSection {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    .cancel {
      margin-right: 1rem;
    }
  }
`;
