import { useMutation, useQueryClient, UseMutateFunction } from 'react-query';

import { axiosInstance } from '../../../../axiosInstance';
import { queryKeys } from '../../../../react-query/constants';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { basicToastOption } from '../../../app/Layout';

interface DeleteDebate {
  discussionCode: number;
  userCode: number;
}

const deleteDebate = async (data: DeleteDebate): Promise<void> => {
  await axiosInstance.delete(
    `/discussion?discussionCode=${data.discussionCode}&userCode=${data.userCode}`
  );
};

const useDeleteDebate = (): UseMutateFunction<
  void,
  unknown,
  DeleteDebate,
  unknown
> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation((data: DeleteDebate) => deleteDebate(data), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.debateList]);
      navigate('/');
      toast.success('토론 삭제가 완료되었습니다.', {
        position: 'top-center',
        ...basicToastOption,
      });
    },
  });
  return mutate;
};

export default useDeleteDebate;
