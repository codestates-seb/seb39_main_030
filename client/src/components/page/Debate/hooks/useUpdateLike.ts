import { useMutation, useQueryClient, UseMutateFunction } from 'react-query';

import { axiosInstance } from '../../../../axiosInstance';
import { queryKeys } from '../../../../react-query/constants';

interface UpdateLike {
  userCode: number;
  targetCode: number;
  likes: string;
}

const updateLike = async (book: UpdateLike): Promise<void> => {
  const payload = {
    userCode: book.userCode,
    targetCode: book.targetCode,
    likes: book.likes,
  };

  await axiosInstance.post(`/user/likes`, payload);
};

const useUpdateLike = (): UseMutateFunction<
  void,
  unknown,
  UpdateLike,
  unknown
> => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation((like: UpdateLike) => updateLike(like), {
    onMutate: async (arg: UpdateLike | null) => {
      //queryClient.cancelQueries([queryKeys.debate]);

      // 기존데이터
      const oldDebate = queryClient.getQueryData([queryKeys.debate]);

      // 낙관적 업데이트
      queryClient.setQueryData(
        [queryKeys.debate],
        [
          {
            ...oldDebate[0],
            recommendState: arg.likes,
            likes:
              arg.likes === 'Y'
                ? oldDebate[0].likes + 1
                : oldDebate[0].likes - 1,
          },
          oldDebate[1],
        ]
      );

      // 롤백할 데이터 반환
      return { oldDebate };
    },
    onError: (previousDataContext, newData, context) => {
      // 롤백
      if (context.oldDebate) {
        queryClient.setQueryData([queryKeys.debate], context.oldDebate);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries([queryKeys.debate]);
    },
  });
  return mutate;
};

export default useUpdateLike;
