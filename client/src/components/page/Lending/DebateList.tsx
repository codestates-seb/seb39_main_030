import styled from 'styled-components';
import Card from '../../atom/Card';
import Debate from './Debate';
import { Text } from '../../atom/Text';

import useDebateList from './hooks/useDebateList';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useLayoutEffect } from 'react';

const DebateList = () => {
  const {
    debateList,
    searchWord,
    currentTag,
    setSearchWord,
    setCurrentTag,
    setOnline,
  } = useDebateList();

  const searchSignal = useSelector(
    (state: RootState) => state.url.searchSignal
  );

  const toggleState = useSelector(
    (state: RootState) => state.debateToggle.currentState
  );

  const curTag = useSelector((state: RootState) => state.tag.currentTag);

  const params = useParams();

  useLayoutEffect(() => {
    setSearchWord((params.searchWord as string) || 'all#@!');
    setCurrentTag(curTag || 'all#@!');
    setOnline(toggleState);
    return () => {
      setSearchWord('all#@!');
      setCurrentTag('all#@!');
    };
  }, [searchSignal, params.searchWord, curTag, toggleState]);

  return (
    <StyledDebateList>
      {searchWord !== 'all#@!' && currentTag === 'all#@!' && (
        <Text className="search-result" fontWeight="semiBold">
          "{params.searchWord}"에 대해 총 {debateList.length}건이
          검색되었습니다.
        </Text>
      )}
      {debateList.length === 0 && currentTag !== 'all#@!' && (
        <Text className="search-result" fontWeight="semiBold">
          {`${currentTag}에 대한 토론이 존재하지 않습니다.`}
        </Text>
      )}
      {debateList.map((debate) => (
        <Link
          key={debate.discussionCode}
          to={`/debate/${debate.discussionCode}`}
        >
          <Debate
            nickname={debate.nickname}
            discussionTitle={debate.discussionTitle}
            discussionContents={debate.discussionContents}
            discussionTag={debate.discussionTag}
            discussionLikes={debate.discussionLikes}
            profileImg={debate.profileImg}
            userState={debate.userState}
          />
        </Link>
      ))}
    </StyledDebateList>
  );
};

export default DebateList;

const StyledDebateList = styled.div`
  width: 100%;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .search-result {
    display: block;
    width: 100%;
    margin-top: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  a:link,
  a:visited {
    text-decoration: none;
  }

  ${Card} {
    margin: 15px;
    transition: all 0.2s;
    border-radius: 10%;
  }

  ${Card}:hover {
    box-shadow: 2px 3px 10px 2px ${({ theme }) => theme.mode.searchBar};
  }
`;
