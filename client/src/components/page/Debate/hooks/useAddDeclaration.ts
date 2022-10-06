import { useMutation, useQueryClient, UseMutateFunction } from 'react-query';

import { axiosInstance } from '../../../../axiosInstance';
import { queryKeys } from '../../../../react-query/constants';

import { toast } from 'react-toastify';
import { basicToastOption } from '../../../app/Layout';

interface AddDeclaration {
  userCode: number;
  discussionCode: number;
  declarationReason: string;
}

const addDeclaration = async (data: AddDeclaration): Promise<void> => {
  const payload = {
    userCode: data.userCode,
    discussionCode: data.discussionCode,
    declarationReason: data.declarationReason,
  };

  await axiosInstance.post('/declaration', payload);
};

const useAddDeclaration = (): UseMutateFunction<
  void,
  unknown,
  AddDeclaration,
  unknown
> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (data: AddDeclaration) => addDeclaration(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.debate]);
        toast.success('신고 등록이 완료되었습니다.', {
          position: 'top-center',
          ...basicToastOption,
        });
      },
    }
  );
  return mutate;
};

export default useAddDeclaration;
