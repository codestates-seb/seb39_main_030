import { useMutation, useQueryClient, UseMutateFunction } from 'react-query';
import { axiosInstance } from '../../../../axiosInstance';
import { useNavigate } from 'react-router-dom';

interface ISocket {
  userCode: number;
  socketId: string;
}

const updateSocketId = async (data: ISocket): Promise<void> => {
  const params = {
    userCode: data.userCode,
    socketId: data.socketId,
  };
  await axiosInstance.post('/user/socket', null, { params });
};

const useAddComment = (): UseMutateFunction<
  void,
  unknown,
  ISocket,
  unknown
> => {
  const navigate = useNavigate();
  const { mutate } = useMutation((data: ISocket) => updateSocketId(data), {
    onSuccess: () => navigate('/'),
  });
  return mutate;
};

export default useAddComment;
