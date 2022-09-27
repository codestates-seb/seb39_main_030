import { useMutation, useQueryClient, UseMutateFunction } from 'react-query';

import { axiosInstance } from '../../../../axiosInstance';
import { queryKeys } from '../../../../react-query/constants';

import { toast } from 'react-toastify';
import { basicToastOption } from '../../../app/Layout';

interface DeleteBook {
  userCode: number;
  bookCode: number;
}

const deleteBook = async (data: DeleteBook): Promise<void> => {
  await axiosInstance.delete(
    `/guestbook?bookCode=${data.bookCode}&userCode=${data.userCode}`
  );
};

const useDeleteGuestbook = (): UseMutateFunction<
  void,
  unknown,
  DeleteBook,
  unknown
> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation((data: DeleteBook) => deleteBook(data), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.guestbook]);
      toast.success('방명록 삭제가 완료되었습니다.', {
        position: 'top-center',
        ...basicToastOption,
      });
    },
  });
  return mutate;
};

export default useDeleteGuestbook;
