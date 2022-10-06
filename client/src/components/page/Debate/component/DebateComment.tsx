import styled from 'styled-components';
import { Text } from '../../../atom/Text';
import useModal from '../../../app/hooks/useModal';
import useDeleteComment from '../hooks/useDeleteComment';
import useUpdateComment from '../hooks/useUpdateComment';

const DebateComment = ({
  comment,
  sameUser,
  getKST,
  modifyHandler,
  isSelected,
}) => {
  const deleteComment = useDeleteComment();
  const { openModal } = useModal();
  const userModalHandler = (userData) => {
    openModal({
      type: 'guestbook',
      props: {
        userCode: userData.userCode,
        nickname: userData.nickname,
      },
    });
  };

  return (
    <StyledComment>
      <div className="info">
        <img
          className="comment-profile"
          src={comment.profileImg}
          onClick={() => userModalHandler(comment)}
        />
        <Text
          fontWeight="semiBold"
          className="nickname"
          onClick={() => userModalHandler(comment)}
        >
          {comment.nickname}
        </Text>
        <Text className="date" fontSize="sm">
          {getKST(comment.commentCreateDate)}
        </Text>
      </div>
      <Text className="comment">{comment.commentContents}</Text>
      {sameUser && (
        <div className="comment-bottom">
          <Text
            onClick={modifyHandler}
            fontSize="sm"
            className="comment-modify"
          >
            {isSelected ? '접기' : '수정'}
          </Text>
          <Text
            onClick={() =>
              deleteComment({
                userCode: comment.userCode,
                commentCode: comment.commentCode,
              })
            }
            fontSize="sm"
            className="comment-delete"
          >
            삭제
          </Text>
        </div>
      )}
    </StyledComment>
  );
};

export default DebateComment;

const StyledComment = styled.li`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  & .info {
    display: flex;
    align-items: center;
    cursor: pointer;
    .nickname {
      cursor: pointer;
    }

    .comment-profile {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      margin-right: 10px;
      cursor: pointer;
    }

    .date {
      margin-left: 10px;
    }
  }

  & .comment {
    margin-top: 10px;
    line-height: 25px;
  }

  & .comment-bottom {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;

    .comment-modify,
    .comment-delete {
      border: 1px solid ${({ theme }) => theme.mode.secondaryText};
      height: 25px;
      width: 4rem;
      text-align: center;
      line-height: 25px;
      border-radius: 30px;
      color: ${({ theme }) => theme.mode.secondaryText};
      cursor: pointer;
      margin-left: 1rem;
    }

    .comment-modify:hover,
    .comment-delete:hover {
      border: 1px solid ${({ theme }) => theme.mode.hover};
      background-color: ${({ theme }) => theme.mode.hoverBackground};
      color: ${({ theme }) => theme.mode.hover};
    }
  }
`;
