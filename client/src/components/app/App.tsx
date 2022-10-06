import React, { useEffect, useState } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import useCustomTheme from '../../style/useCustomTheme';
import GlobalStyled from '../../style/GlobalStyled';
import queryClient from '../../react-query/queryClient';
import Layout, { basicToastOption } from './Layout';

import RouteList from './RouteList';
import { ThemeProvider } from 'styled-components';
import ModalPortal from '../block/Modal/ModalPortal';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import useModal from './hooks/useModal';
import { getStoredUser } from '../../auth/user-storage';

const App = () => {
  const { openModal } = useModal();
  const theme = useCustomTheme();
  const mode = useSelector((state: RootState) => state.darkMode.mode) as string;
  // useEffect(() => {
  //   const user = getStoredUser();
  //   setStoredUser({ ...user, userRole: 'ROLE_ADMIN' });
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyled />
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={mode === 'light' ? 'light' : 'dark'}
        />
        <ModalPortal />
        <Layout>
          <RouteList />
        </Layout>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
