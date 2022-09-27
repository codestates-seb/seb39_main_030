import { useQuery } from 'react-query';
import { axiosInstance } from '../../../../axiosInstance';
import { queryKeys } from '../../../../react-query/constants';
import { GuestBook } from '../../../../type';

const getGuestBook = async (userCode: number): Promise<GuestBook[]> => {
  const params = { userCode };
  const { data } = await axiosInstance.get('/guestbook', {
    params,
  });
  return data;
};

interface UseGetGuestbook {
  guestbookList: GuestBook[];
}

const useGuestbook = (userCode: number): UseGetGuestbook => {
  const fallback: any[] = [];
  const { data: guestbookList = fallback } = useQuery(
    [queryKeys.guestbook, userCode],
    () => getGuestBook(userCode)
  );

  return { guestbookList };
};

export default useGuestbook;
