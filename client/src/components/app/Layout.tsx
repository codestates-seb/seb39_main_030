import React from 'react';
import styled from 'styled-components';

import Header from '../block/Header';
import Footer from '../block/Footer';

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <StyledLayout>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </StyledLayout>
  );
};

export default Layout;

const StyledLayout = styled.div`
  padding-top: 4rem;

  main {
    min-height: calc(100vh - 9rem);
    display: flex;
  }
`;
