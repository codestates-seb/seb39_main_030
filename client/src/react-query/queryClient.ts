import { QueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { basicToastOption } from '../components/app/Layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: () => {
        toast.error('서버에 문제가 발생했습니다.', {
          position: 'top-center',
          ...basicToastOption,
        });
      },
    },
    mutations: {
      onError: () => {
        toast.error('서버에 문제가 발생했습니다.', {
          position: 'top-center',
          ...basicToastOption,
        });
      },
    },
  },
});

export default queryClient;
