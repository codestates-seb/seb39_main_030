import { useMutation, useQueryClient, UseMutateFunction } from 'react-query';

import { axiosInstance } from '../../../../axiosInstance';
import { queryKeys } from '../../../../react-query/constants';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { basicToastOption } from '../../../app/Layout';
import { UpdateDebate } from '../../../../type';

const updateDebate = async (debate: UpdateDebate): Promise<void> => {
  const payload = {
    discussionCode: debate.discussionCode,
    userCode: debate.userCode,
    discussionTitle: debate.discussionTitle,
    discussionContents: debate.discussionContents,
    discussionCategory: debate.discussionCategory,
    discussionTag: debate.discussionTag,
  };

  await axiosInstance.post('./discussion/update', payload);
};

const useUpdateDebate = (): UseMutateFunction<
  void,
  unknown,
  UpdateDebate,
  unknown
> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation(
    (debate: UpdateDebate) => updateDebate(debate),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.debate]);
        navigate(-1);
        toast.success('토론 수정이 완료되었습니다.', {
          position: 'top-center',
          ...basicToastOption,
        });
      },
    }
  );
  return mutate;
};

export default useUpdateDebate;
