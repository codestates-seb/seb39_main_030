import { useMutation, useQueryClient, UseMutateFunction } from 'react-query';

import { axiosInstance } from '../../../../axiosInstance';
import { queryKeys } from '../../../../react-query/constants';

import { toast } from 'react-toastify';
import { basicToastOption } from '../../../app/Layout';

interface UpdateComment {
  userCode: number;
  commentCode: number;
  commentContents: string;
}

const updateComment = async (comment: UpdateComment): Promise<void> => {
  const payload = {
    userCode: comment.userCode,
    commentCode: comment.commentCode,
    commentContents: comment.commentContents,
  };

  await axiosInstance.post(
    `/comments/update?userCode=${comment.userCode}`,
    payload
  );
};

const useUpdateComment = (): UseMutateFunction<
  void,
  unknown,
  UpdateComment,
  unknown
> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (comment: UpdateComment) => updateComment(comment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.debate]);
        toast.success('댓글 수정이 완료되었습니다.', {
          position: 'top-center',
          ...basicToastOption,
        });
      },
    }
  );
  return mutate;
};

export default useUpdateComment;
