import { useMutation, useQueryClient, UseMutateFunction } from 'react-query';

import { axiosInstance } from '../../../../axiosInstance';
import { queryKeys } from '../../../../react-query/constants';
import { AddGuestBook } from '../../../../type';

import { toast } from 'react-toastify';
import { basicToastOption } from '../../../app/Layout';

const addGuestBook = async (data: AddGuestBook): Promise<void> => {
  const payload = {
    userCode: data.userCode,
    guestCode: data.guestCode,
    guestbookContents: data.guestbookContents,
  };

  await axiosInstance.post('/guestbook', payload);
};

const useAddGuestBook = (): UseMutateFunction<
  void,
  unknown,
  AddGuestBook,
  unknown
> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    (guestBook: AddGuestBook) => addGuestBook(guestBook),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.guestbook]);
        toast.success('방명록 등록이 완료되었습니다.', {
          position: 'top-center',
          ...basicToastOption,
        });
      },
    }
  );
  return mutate;
};

export default useAddGuestBook;
