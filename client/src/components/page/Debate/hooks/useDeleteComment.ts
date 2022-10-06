import { useMutation, useQueryClient, UseMutateFunction } from 'react-query';

import { axiosInstance } from '../../../../axiosInstance';
import { queryKeys } from '../../../../react-query/constants';

import { toast } from 'react-toastify';
import { basicToastOption } from '../../../app/Layout';

interface DeleteComment {
  commentCode: number;
  userCode: number;
}

const deleteComment = async (data: DeleteComment): Promise<void> => {
  await axiosInstance.delete(
    `/comments/delete?commentCode=${data.commentCode}&userCode=${data.userCode}`
  );
};

const useDeleteComment = (): UseMutateFunction<
  void,
  unknown,
  DeleteComment,
  unknown
> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation((data: DeleteComment) => deleteComment(data), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.debate]);
      toast.success('댓글 삭제가 완료되었습니다.', {
        position: 'top-center',
        ...basicToastOption,
      });
    },
  });
  return mutate;
};

export default useDeleteComment;
