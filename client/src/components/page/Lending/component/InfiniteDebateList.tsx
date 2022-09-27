import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroller';

import styled from 'styled-components';
import Card from '../../../atom/Card';
import Debate from './Debate';
import { Link } from 'react-router-dom';
import { queryKeys } from '../../../../react-query/constants';
import { axiosInstance } from '../../../../axiosInstance';
import Loading from '../../../app/Loading';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const InfiniteDebateList = () => {
  const toggleState = useSelector(
    (state: RootState) => state.debateToggle.currentState
  );

  const getDebateList = async (pageParam) => {
    const { data } = await axiosInstance(
      `/discussion?page=${pageParam}&size=4`
    );
    return data;
  };

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    queryKeys.infiniteDebateList,
    ({ pageParam = 0 }) => getDebateList(pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.pageInfo.page === lastPage.pageInfo.totalPages) {
          return undefined;
        }
        return lastPage.pageInfo.page;
      },
    }
  );

  const renderDebate = (debate) => (
    <Link key={debate.discussionCode} to={`/debate/${debate.discussionCode}`}>
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
  );

  if (isLoading) return <Loading key={0} sub={true} />;
  return (
    <InfiniteScroll
      hasMore={hasNextPage}
      loadMore={fetchNextPage}
      loader={<Loading key={0} sub={true} />}
    >
      <StyledDebateList>
        {data.pages?.map((pageData) => {
          if (toggleState) {
            return pageData.data
              .filter((debate) => debate.userState === 'Y')
              .map(renderDebate);
          }
          return pageData.data.map(renderDebate);
        })}
      </StyledDebateList>
    </InfiniteScroll>
  );
};

export default InfiniteDebateList;

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
