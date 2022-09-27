import { useQuery } from 'react-query';
import type { Comment, DetailDebate } from '../../../../type';
import { axiosInstance } from '../../../../axiosInstance';
import { queryKeys } from '../../../../react-query/constants';
import { useState } from 'react';
import { getStoredUser } from '../../../../auth/user-storage';

type DebatePage = [DetailDebate, Comment[]];

interface UseGetDebate {
  debate: DetailDebate;
  comment: Comment[];
}
const getDetailDebate = async (
  discussionCode: string | undefined
): Promise<DebatePage> => {
  const user = getStoredUser();
  const { data } = await axiosInstance.get(
    `discussion/detail?discussionCode=${discussionCode}&loginUserCode=${
      user ? user.userCode : 0
    }`
  );
  return data;
};

export const useDebate = (postNumber: string | undefined): UseGetDebate => {
  const [debate, setDebate] = useState<DetailDebate>();
  const [comment, setComment] = useState<Comment[]>();

  useQuery([queryKeys.debate], () => getDetailDebate(postNumber), {
    onSuccess: (res) => {
      setDebate(res[0]);
      setComment(res[1]);
    },
  });
  return { debate, comment };
};
