import styled from 'styled-components';
import { Text } from '../../../atom/Text';
import useDeleteGuestbook from '../hooks/useDeleteGuestbook';

const GuestbookList = ({
  comment,
  sameUser,
  getKST,
  modifyHandler,
  isSelected,
}) => {
  const deleteBook = useDeleteGuestbook();
  return (
    <StyledGuestbookList>
      <div className="info">
        <img className="comment-profile" src={comment.guestInfo.profileImg} />
        <Text fontWeight="semiBold" fontSize="sm" className="nickname">
          {comment.guestInfo.nickname}
        </Text>
        <Text className="date" fontSize="xsm">
          {getKST(comment.createDate)}
        </Text>
      </div>
      <Text fontSize="sm" className="comment">
        {comment.contents}
      </Text>
      {sameUser && (
        <div className="comment-bottom">
          <Text
            onClick={modifyHandler}
            fontSize="xsm"
            className="comment-modify"
          >
            {isSelected ? '접기' : '수정'}
          </Text>
          <Text
            onClick={() =>
              deleteBook({
                bookCode: comment.bookCode,
                userCode: comment.guestInfo.userCode,
              })
            }
            fontSize="xsm"
            className="comment-delete"
          >
            삭제
          </Text>
        </div>
      )}
    </StyledGuestbookList>
  );
};

export default GuestbookList;

const StyledGuestbookList = styled.li`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  & .info {
    display: flex;
    align-items: center;
    cursor: pointer;
    .nickname {
      cursor: pointer;
      min-width: 50px;
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
      height: 20px;
      width: 3rem;
      text-align: center;
      line-height: 20px;
      border-radius: 30px;
      color: ${({ theme }) => theme.mode.secondaryText};
      cursor: pointer;
      margin-left: 10px;
    }

    .comment-modify:hover,
    .comment-delete:hover {
      border: 1px solid ${({ theme }) => theme.mode.hover};
      background-color: ${({ theme }) => theme.mode.hoverBackground};
      color: ${({ theme }) => theme.mode.hover};
    }
  }
`;
