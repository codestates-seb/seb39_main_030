import styled from 'styled-components';
import { Text } from '../../../atom/Text';
import Button from '../../../atom/Button';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { useState } from 'react';
import { getStoredUser } from '../../../../auth/user-storage';
import useModal from '../../../app/hooks/useModal';
import { useNavigate } from 'react-router-dom';
import useUpdateLike from '../hooks/useUpdateLike';
import { socket } from '../../../../auth/SingletonSocket';

const DebateMain = ({ debate, getKST }) => {
  const [like, setLike] = useState<boolean>(false);
  const user = getStoredUser();
  const upDateLike = useUpdateLike();
  const { openModal } = useModal();
  const navigate = useNavigate();
  const likeHandler = () => {
    setLike(!like);
    if (debate?.recommendState === 'Y') {
      upDateLike({
        userCode: Number(user.userCode),
        targetCode: debate?.discussionCode,
        likes: 'N',
      });
    } else {
      upDateLike({
        userCode: Number(user.userCode),
        targetCode: debate?.discussionCode,
        likes: 'Y',
      });
    }
  };

  const userModalHandler = (userData) => {
    openModal({
      type: 'guestbook',
      props: {
        userCode: userData.userCode,
        nickname: userData.userInfo.nickname,
      },
    });
  };

  const debateDeleteHandler = () => {
    openModal({
      type: 'deleteDebate',
      props: {
        data: {
          userCode: debate?.userCode,
          discussionCode: debate?.discussionCode,
        },
      },
    });
  };

  const debateUpdateHandler = () => {
    navigate('/add-debate', {
      state: {
        title: debate?.title,
        content: debate?.contents,
        discussionCode: debate?.discussionCode,
      },
    });
  };

  const addDeclarationHandler = () => {
    openModal({
      type: 'addDeclaration',
      props: {
        data: {
          userCode: debate?.userCode,
          discussionCode: debate?.discussionCode,
        },
      },
    });
  };

  const moveVideoPage = () => {
    socket.emit('requestFight', {
      targetUserCode: debate?.userCode.toString(),
      // TODO 로컬에서 테스트 할 때, temp로 변경
      userCode: user.userCode.toString(),
      //userCode: user.temp.toString(),
    });

    navigate('/video');
  };

  return (
    <>
      <section className="tag">
        <Text fontSize="lg" fontWeight="bold">
          {`${debate?.category}/${debate?.tag}`}
        </Text>
      </section>
      <hr />
      <StyledTitle>
        <Text fontSize="lg" fontWeight="bold">
          {debate?.title}
        </Text>
        <Text>{debate && getKST(debate?.createTime)}</Text>
      </StyledTitle>
      <hr />
      <StyledUser>
        <img
          className="debate-profile"
          src={debate?.userInfo.profileImg}
          onClick={() => userModalHandler(debate)}
        />
        <Text
          fontWeight="semiBold"
          className="nickname"
          onClick={() => userModalHandler(debate)}
        >
          {debate?.userInfo.nickname}
        </Text>
        {debate?.userInfo.userState === 'Y' ? (
          <Text fontSize="sm" className="online">
            ONLINE
          </Text>
        ) : (
          <Text fontSize="sm" className="offline">
            OFFLINE
          </Text>
        )}
      </StyledUser>
      <hr className="custom-hr-thin" />
      <StyledContent>
        {debate?.userCode === Number(user?.userCode) && (
          <div className="comment-bottom">
            <Text
              onClick={debateUpdateHandler}
              fontSize="sm"
              className="comment-modify"
            >
              수정
            </Text>
            <Text
              onClick={debateDeleteHandler}
              fontSize="sm"
              className="comment-delete"
            >
              삭제
            </Text>
          </div>
        )}
        <Text>{debate?.contents}</Text>
      </StyledContent>
      <ContentBottom>
        <Text
          onClick={addDeclarationHandler}
          fontSize="sm"
          className="declaration"
        >
          신고하기
        </Text>
        <Button
          onClick={moveVideoPage}
          disabled={debate?.userInfo.userState === 'Y' && user ? false : true}
        >
          토론 신청
        </Button>
        <div className="like" onClick={likeHandler}>
          {debate?.recommendState === 'Y' ? <AiFillLike /> : <AiOutlineLike />}
          <Text fontSize="sm">{debate?.likes}</Text>
        </div>
      </ContentBottom>
    </>
  );
};

export default DebateMain;

const StyledTitle = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: ${({ theme }) => theme.mode.background};
  word-break: break-all;
`;

const StyledUser = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;

  & .nickname {
    margin-right: auto;
    cursor: pointer;
  }

  & .debate-profile {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;
  }

  & .online {
    border: 1px solid #5ecc5e;
    height: 25px;
    width: 4rem;
    text-align: center;
    line-height: 25px;
    border-radius: 30px;
    color: #5ecc5e;
  }

  .offline {
    border: 1px solid #da3030;
    height: 25px;
    width: 4rem;
    text-align: center;
    line-height: 25px;
    border-radius: 30px;
    color: #da3030;
    display: flex;
    justify-content: center;
    align-self: center;
  }
`;

const StyledContent = styled.section`
  padding: 2rem 1rem;
  line-height: 25px;
  margin-bottom: 2rem;

  & .comment-bottom {
    margin-top: -1rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-end;

    .comment-modify,
    .comment-delete {
      border: 1px solid ${({ theme }) => theme.mode.themeIcon};
      height: 25px;
      width: 4rem;
      text-align: center;
      line-height: 25px;
      border-radius: 30px;
      color: ${({ theme }) => theme.mode.themeIcon};
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

const ContentBottom = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 2rem;

  & .declaration {
    border: 1px solid ${({ theme }) => theme.mode.secondaryText};
    height: 25px;
    width: 4rem;
    text-align: center;
    line-height: 25px;
    border-radius: 30px;
    color: ${({ theme }) => theme.mode.secondaryText};
    cursor: pointer;
  }

  & .declaration:hover {
    border: 1px solid ${({ theme }) => theme.mode.hover};
    background-color: ${({ theme }) => theme.mode.hoverBackground};
    color: ${({ theme }) => theme.mode.hover};
  }

  & .like {
    display: flex;
    align-items: flex-end;
    border: 1px solid ${({ theme }) => theme.mode.themeIcon};
    padding: 2px 10px;
    border-radius: 30px;
    cursor: pointer;
    width: 50px;
    svg {
      margin-right: 5px;
      color: ${({ theme }) => theme.mode.themeIcon};
    }
    span {
      cursor: pointer;
    }
  }

  & .like:hover {
    border: 1px solid ${({ theme }) => theme.mode.hover};
    background-color: ${({ theme }) => theme.mode.hoverBackground};
    span {
      color: ${({ theme }) => theme.mode.hover};
    }
    svg {
      color: ${({ theme }) => theme.mode.hover};
    }
  }
`;
