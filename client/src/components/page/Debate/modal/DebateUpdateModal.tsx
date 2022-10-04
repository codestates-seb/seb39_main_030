import Modal from '../../../block/Modal/Modal';
import { Text } from '../../../atom/Text';
import styled from 'styled-components';
import Button from '../../../atom/Button';
import useUpdateDebate from '../hooks/useUpdateDebate';

const DebateUpdateModal = ({
  onClose,
  discussionCode,
  discussionTitle,
  discussionContents,
  userCode,
  discussionCategory,
  discussionTag,
}) => {
  const updateDebate = useUpdateDebate();
  return (
    <Modal onClose={onClose}>
      <StyledSimpleModal>
        <Text fontSize="md" className="title">
          이대로 수정하시겠습니까?
        </Text>
        <div className="buttonSection">
          <Button className="cancel" onClick={onClose}>
            취소
          </Button>
          <Button
            onClick={() => {
              updateDebate({
                discussionCode,
                discussionTitle,
                discussionContents,
                userCode,
                discussionCategory,
                discussionTag,
              });
              onClose();
            }}
          >
            수정
          </Button>
        </div>
      </StyledSimpleModal>
    </Modal>
  );
};

export default DebateUpdateModal;

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
