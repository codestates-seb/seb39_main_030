import Modal from './Modal';
import useModal from '../../app/hooks/useModal';
import { Text } from '../../atom/Text';
import styled from 'styled-components';

const SimpleModal = ({ title, onClose }) => {
  return (
    <Modal onClose={onClose}>
      <StyledSimpleModal>
        <Text fontSize="xl" className="title">
          {title}
        </Text>
        <Text fontSize="md" className="content">
          여기에 모달 내용이 들어갑니다.
        </Text>
      </StyledSimpleModal>
    </Modal>
  );
};

export default SimpleModal;

const StyledSimpleModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .title {
    text-align: center;
    margin-top: -15px;
  }
  .content {
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: center;
  }
`;
