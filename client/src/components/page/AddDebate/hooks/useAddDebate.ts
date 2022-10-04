import { useMutation, useQueryClient, UseMutateFunction } from 'react-query';

import { axiosInstance } from '../../../../axiosInstance';
import { queryKeys } from '../../../../react-query/constants';
import { useNavigate } from 'react-router-dom';
import { AddDebate } from '../../../../type';

import { toast } from 'react-toastify';
import { basicToastOption } from '../../../app/Layout';

const addDebate = async (debate: AddDebate): Promise<void> => {
  const payload = {
    discussionTitle: debate.discussionTitle,
    discussionContents: debate.discussionContents,
    userCode: debate.userCode,
    discussionCategory: debate.discussionCategory,
    discussionTag: debate.discussionTag,
  };

  await axiosInstance.post('/discussion', payload);
};

export const useAddDebate = (): UseMutateFunction<
  void,
  unknown,
  AddDebate,
  unknown
> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation((debate: AddDebate) => addDebate(debate), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.debateList]);
      navigate('/');
      toast.success('토론 등록이 완료되었습니다.', {
        position: 'top-center',
        ...basicToastOption,
      });
    },
  });
  return mutate;
};
