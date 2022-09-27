import { useMutation, useQueryClient, UseMutateFunction } from 'react-query';

import { axiosInstance } from '../../../../axiosInstance';
import { queryKeys } from '../../../../react-query/constants';

import { toast } from 'react-toastify';
import { basicToastOption } from '../../../app/Layout';

interface UpdateBook {
  bookCode: number;
  userCode: number;
  guestbookContents: string;
}

const updateGuestBook = async (book: UpdateBook): Promise<void> => {
  const payload = {
    userCode: book.userCode,
    bookCode: book.bookCode,
    guestbookContents: book.guestbookContents,
  };

  await axiosInstance.post(`/guestbook/update`, payload);
};

const useUpdateGuestBook = (): UseMutateFunction<
  void,
  unknown,
  UpdateBook,
  unknown
> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation((book: UpdateBook) => updateGuestBook(book), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.guestbook]);
      toast.success('방명록 수정이 완료되었습니다.', {
        position: 'top-center',
        ...basicToastOption,
      });
    },
  });
  return mutate;
};

export default useUpdateGuestBook;
