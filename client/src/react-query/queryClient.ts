import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: () => {
        console.log('서버 에러 발생');
      },
    },
    mutations: {
      onError: () => {
        console.log('서버 에러 발생');
      },
    },
  },
});

export default queryClient;
