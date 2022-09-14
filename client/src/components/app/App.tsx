import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import useCustomTheme from '../../style/useCustomTheme';
import GlobalStyled from '../../style/GlobalStyled';
import queryClient from '../../react-query/queryClient';
import Layout from './Layout';

import RouteList from './RouteList';
import { ThemeProvider } from 'styled-components';

function App() {
  const theme = useCustomTheme();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyled />
      <QueryClientProvider client={queryClient}>
        <Layout>
          <RouteList />
        </Layout>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
