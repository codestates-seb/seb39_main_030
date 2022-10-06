import styled from 'styled-components';
import Card from '../../../atom/Card';
import { Text } from '../../../atom/Text';
import { AiFillLike } from 'react-icons/ai';

interface Props {
  nickname: number;
  discussionTitle: string;
  discussionContents: string;
  discussionTag: string;
  discussionLikes: number;
  profileImg: string;
  userState: string;
}

const Debate = (props: Props) => {
  const makeContents = (contents: string) => {
    if (contents.length > 35) {
      return contents.slice(0, 40) + ' ...';
    }
    return contents;
  };

  return (
    <StyledDebate>
      <div className="debate-title-container">
        <Text className="title" fontSize="xl" fontWeight="bold">
          {makeContents(props.discussionTitle)}
        </Text>
      </div>
      <div className="contents-container">
        <Text className="debate-content" fontSize="lg">
          {makeContents(props.discussionContents)}
        </Text>
      </div>
      <Text className="debate-tag" fontSize="md" fontWeight="regular">
        {props.discussionTag}
      </Text>
      <hr />
      <div className="debate-bottom">
        <img className="debate-profile" src={props.profileImg} />
        <Text className="debate-nickname">{props.nickname}</Text>
        {props.userState === 'Y' ? (
          <Text fontSize="sm" className="list-online">
            ONLINE
          </Text>
        ) : (
          <Text fontSize="sm" className="list-offline">
            OFFLINE
          </Text>
        )}
        <Text className="like">
          <AiFillLike /> {props.discussionLikes}
        </Text>
      </div>
    </StyledDebate>
  );
};

export default Debate;

const StyledDebate = styled(Card)`
  display: flex;
  flex-direction: column;
  background-color: transparent;

  .list-online {
    border: 1px solid #5ecc5e;
    height: 25px;
    width: 4rem;
    text-align: center;
    line-height: 25px;
    border-radius: 30px;
    color: #5ecc5e;
    margin-left: auto;
    margin-right: 1rem;
  }

  .list-offline {
    border: 1px solid #da3030;
    height: 25px;
    width: 4rem;
    text-align: center;
    line-height: 25px;
    border-radius: 30px;
    color: #da3030;
    margin-left: auto;
    margin-right: 1rem;
  }

  .title {
    margin-top: 1rem;
  }

  .debate-title-container {
    height: 70px;
  }

  .contents-container {
    height: 7rem;
  }

  .debate-content {
    margin-top: 2rem;
  }

  & hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.mode.searchBar};
  }
  .debate-tag {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.mode.themeIcon};
    border-radius: 20px;
    width: 6rem;
    height: 35px;
    padding: 10px 10px;
    margin-top: 1rem;
  }

  .debate-profile {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }

  .debate-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .debate-nickname {
      margin-right: auto;
      margin-left: 10px;
      width: 70px;
    }
  }

  .like {
    display: flex;
    align-items: center;

    svg {
      width: 20px;
      height: 20px;
      margin-bottom: 5px;
      margin-right: 5px;
      color: ${({ theme }) => theme.mode.themeIcon};
    }
  }
`;
