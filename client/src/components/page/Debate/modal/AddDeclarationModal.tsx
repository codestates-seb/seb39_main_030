import Modal from '../../../block/Modal/Modal';
import { Text } from '../../../atom/Text';
import styled from 'styled-components';
import DebateCommentInput from '../component/DebateCommentInput';
import useAddDeclaration from '../hooks/useAddDeclaration';

const AddDeclarationModal = ({ onClose, data }) => {
  const addDeclaration = useAddDeclaration();

  const addDeclarationHandler = (text, ref) => {
    addDeclaration({
      userCode: data.userCode,
      discussionCode: data.discussionCode,
      declarationReason: text,
    });

    ref.value = '';
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <StyledSimpleModal>
        <Text fontSize="md" className="declaration-title">
          🚨 신고하기
        </Text>
        <div className="declaration-content">
          <DebateCommentInput
            type="main"
            isSelected={true}
            placeHolder={'신고 내용을 작성해주세요.'}
            updateText={null}
            handler={addDeclarationHandler}
          />
        </div>
      </StyledSimpleModal>
    </Modal>
  );
};

export default AddDeclarationModal;

const StyledSimpleModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & .declaration-title {
    text-align: center;
  }
  & .declaration-content {
    margin-top: 20px;
    margin-bottom: 10px;
  }

  & .buttonSection {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
`;
