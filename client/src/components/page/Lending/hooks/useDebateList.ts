import { useQuery } from 'react-query';
import { axiosInstance } from '../../../../axiosInstance';
import { queryKeys } from '../../../../react-query/constants';
import { Debate } from '../../../../type';
import { filterBySearchWord, filterTagByDebate } from './util';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

const getDebateList = async (): Promise<Debate[]> => {
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.REACT_APP_MOCK === '1'
  ) {
    const { data } = await axiosInstance.get('/discussion');
    return data.data;
  } else {
    const { data } = await axiosInstance.get(
      '/discussion?page=0&size=2147483647'
    );
    return data.data;
  }
};

interface UseDebateList {
  debateList: Debate[];
  searchWord: string;
  setSearchWord: Dispatch<SetStateAction<string>>;
  currentTag: string;
  setCurrentTag: Dispatch<SetStateAction<string>>;
  setOnline: Dispatch<SetStateAction<boolean>>;
  serverError: boolean;
}

const useDebateList = (): UseDebateList => {
  const [searchWord, setSearchWord] = useState('all#@!');
  const [currentTag, setCurrentTag] = useState('all#@!');
  const [online, setOnline] = useState(false);
  const [serverError, setServerError] = useState(false);

  const selectFn = useCallback(
    (debateList: Debate[]) => {
      if (searchWord !== 'all#@!') {
        if (online) {
          return filterBySearchWord(debateList, searchWord).filter(
            (debate) => debate.userState === 'Y'
          );
        }
        return filterBySearchWord(debateList, searchWord);
      }
      if (currentTag !== 'all#@!') {
        if (online) {
          return filterTagByDebate(debateList, currentTag).filter(
            (debate) => debate.userState === 'Y'
          );
        }
        return filterTagByDebate(debateList, currentTag);
      }
    },
    [currentTag, searchWord, online]
  );

  const fallback: any[] = [];
  const { data: debateList = fallback } = useQuery(
    [queryKeys.debateList],
    getDebateList,
    {
      select: selectFn,
      onError: () => {
        setServerError(true);
      },
      onSuccess: () => {
        setServerError(false);
      },
    }
  );

  return {
    debateList,
    searchWord,
    setSearchWord,
    currentTag,
    setCurrentTag,
    setOnline,
    serverError,
  };
};

export default useDebateList;
