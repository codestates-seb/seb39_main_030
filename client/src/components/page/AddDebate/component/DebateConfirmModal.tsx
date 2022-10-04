import Modal from '../../../block/Modal/Modal';
import { Text } from '../../../atom/Text';
import styled from 'styled-components';
import Button from '../../../atom/Button';
import { useAddDebate } from '../hooks/useAddDebate';

const DebateConfirmModal = ({
  onClose,
  discussionTitle,
  discussionContents,
  userCode,
  discussionCategory,
  discussionTag,
}) => {
  const addDebate = useAddDebate();
  return (
    <Modal onClose={onClose}>
      <StyledSimpleModal>
        <Text fontSize="md" className="title">
          이대로 등록하시겠습니까?
        </Text>
        <div className="buttonSection">
          <Button className="cancel" onClick={onClose}>
            취소
          </Button>
          <Button
            onClick={() => {
              addDebate({
                discussionTitle,
                discussionContents,
                userCode,
                discussionCategory,
                discussionTag,
              });
              onClose();
            }}
          >
            등록
          </Button>
        </div>
      </StyledSimpleModal>
    </Modal>
  );
};

export default DebateConfirmModal;

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
