import styled from 'styled-components';
import { Text } from '../../atom/Text';
import { useDebate } from './hooks/useGetDebate';
import { useParams } from 'react-router-dom';
import DebateMain from './component/DebateMain';
import DebateCommentInput from './component/DebateCommentInput';
import DebateComment from './component/DebateComment';
import { getStoredUser } from '../../../auth/user-storage';
import { useState } from 'react';
import { getKST } from '../../app/util';
import useAddComment from './hooks/useAddComment';
import useUpdateComment from './hooks/useUpdateComment';

const DebatePage = () => {
  const user = getStoredUser();
  const [commentIdx, setCommentIdx] = useState<number>(null);
  const param = useParams();
  const { debate, comment } = useDebate(param.debateCode);
  const addComment = useAddComment();
  const updateComment = useUpdateComment();

  const modifyHandler = (idx) => {
    if (commentIdx === idx) setCommentIdx(null);
    else setCommentIdx(idx);
  };

  const addCommentHandler = (text, ref) => {
    addComment({
      userCode: Number(user.userCode),
      discussionCode: debate.discussionCode,
      commentContents: text,
    });
    ref.value = '';
  };

  const updateCommentHandler = (text, ref) => {
    updateComment({
      userCode: Number(user.userCode),
      commentCode: comment[commentIdx].commentCode,
      commentContents: text,
    });
    ref.value = '';
  };

  return (
    <StyledDebatePage>
      <DebateMain debate={debate} getKST={getKST} />
      <hr />
      <DebateCommentInput
        type="main"
        isSelected={true}
        placeHolder={'댓글을 작성해주세요'}
        updateText={null}
        handler={addCommentHandler}
      />
      <hr />
      {comment?.map((c, idx) => (
        <ul key={idx}>
          <DebateComment
            getKST={getKST}
            comment={c}
            sameUser={user && Number(user.userCode) === c.userCode}
            modifyHandler={() => modifyHandler(idx)}
            isSelected={commentIdx === idx}
          />
          {commentIdx === idx ? null : <hr className="custom-hr-thin" />}
          <DebateCommentInput
            type="updateComment"
            isSelected={commentIdx === idx}
            placeHolder={'수정할 내용을 작성해주세요.'}
            updateText={c.commentContents}
            handler={updateCommentHandler}
          />
          {commentIdx === idx ? <hr className="custom-hr-thin" /> : null}
        </ul>
      ))}
    </StyledDebatePage>
  );
};

export default DebatePage;

const StyledDebatePage = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: auto;

  & .tag {
    margin: 2rem 10px 1rem;
  }

  & .tag ${Text} {
    color: ${({ theme }) => theme.mode.secondaryText};
  }

  & .custom-hr-thin {
    border: 0;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.mode.divider};
  }
`;
