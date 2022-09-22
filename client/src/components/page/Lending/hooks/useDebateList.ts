import { useQuery } from 'react-query';
import { axiosInstance } from '../../../../axiosInstance';
import { queryKeys } from '../../../../react-query/constants';
import { Debate } from '../../../../type';
import { filterBySearchWord, filterTagByDebate } from './util';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

const getDebateList = async (): Promise<Debate[]> => {
  const { data } = await axiosInstance.get('/discussion');
  return data;
};

interface UseDebateList {
  debateList: Debate[];
  searchWord: string;
  setSearchWord: Dispatch<SetStateAction<string>>;
  currentTag: string;
  setCurrentTag: Dispatch<SetStateAction<string>>;
  setOnline: Dispatch<SetStateAction<boolean>>;
}

const useDebateList = (): UseDebateList => {
  const [searchWord, setSearchWord] = useState('all#@!');
  const [currentTag, setCurrentTag] = useState('all#@!');
  const [online, setOnline] = useState(false);

  const selectFn = useCallback(
    (debateList: Debate[]) => {
      if (searchWord !== 'all#@!') {
        if (online) {
          return filterBySearchWord(debateList, searchWord).filter(
            (debate) => debate.userState
          );
        }
        return filterBySearchWord(debateList, searchWord);
      }
      if (currentTag !== 'all#@!') {
        if (online) {
          return filterTagByDebate(debateList, currentTag).filter(
            (debate) => debate.userState
          );
        }
        return filterTagByDebate(debateList, currentTag);
      }
    },
    [currentTag, searchWord, online]
  );

  const defaultFn = useCallback(
    (debateList: Debate[]) => {
      if (online) {
        return debateList.filter((debate) => debate.userState);
      }
      return debateList;
    },
    [online]
  );

  const fallback: any[] = [];
  const { data: debateList = fallback } = useQuery(
    queryKeys.debateList,
    getDebateList,
    {
      select:
        searchWord !== 'all#@!' || currentTag !== 'all#@!'
          ? selectFn
          : defaultFn,
    }
  );

  return {
    debateList,
    searchWord,
    setSearchWord,
    currentTag,
    setCurrentTag,
    setOnline,
  };
};

export default useDebateList;
