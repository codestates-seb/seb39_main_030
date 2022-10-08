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
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { socket } from '../../auth/SingletonSocket';
import { socketActions } from '../../store/socket-slice';
import { getStoredUser, setStoredUser } from '../../auth/user-storage';

const App = () => {
  const theme = useCustomTheme();
  const mode = useSelector((state: RootState) => state.darkMode.mode) as string;
  const user = getStoredUser();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      socket.on('me', (id) => {
        dispatch(socketActions.setSocketId(id));
        setStoredUser({
          ...user,
          socketId: id,
          temp: Number(user?.userCode) + 1,
        });
        socket.emit('setUserCode', {
          userCode: Number(user?.userCode) + 1,
          socketId: id,
        });
        console.log('현재 나의 아이디는?', id);
      });
    }
  }, []);
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
