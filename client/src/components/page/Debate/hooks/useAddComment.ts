import { useMutation, useQueryClient, UseMutateFunction } from 'react-query';

import { axiosInstance } from '../../../../axiosInstance';
import { queryKeys } from '../../../../react-query/constants';
import { AddComment } from '../../../../type';

import { toast } from 'react-toastify';
import { basicToastOption } from '../../../app/Layout';

const addComment = async (data: AddComment): Promise<void> => {
  const payload = {
    userCode: data.userCode,
    discussionCode: data.discussionCode,
    commentContents: data.commentContents,
  };

  await axiosInstance.post('/comments', payload);
};

const useAddComment = (): UseMutateFunction<
  void,
  unknown,
  AddComment,
  unknown
> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation((comment: AddComment) => addComment(comment), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.debate]);
      toast.success('댓글 등록이 완료되었습니다.', {
        position: 'top-center',
        ...basicToastOption,
      });
    },
  });
  return mutate;
};

export default useAddComment;
