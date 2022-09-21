import React from 'react';
import styled from 'styled-components';

import Header from '../block/Header';
import Footer from '../block/Footer';
import SideMenu from '../block/SideMenu';
import { Overlay } from '../block/Modal/Modal';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import SearchBar from '../block/SearchBar';
import 'react-toastify/dist/ReactToastify.css';

export const basicToastOption = {
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const Layout = (props: { children: React.ReactNode }) => {
  const showSideMenu = useSelector(
    (state: RootState) => state.hamburgerMenu.checked
  );

  const showSearchBar = useSelector(
    (state: RootState) => state.searchMenu.clicked
  );

  return (
    <StyledLayout>
      <Header />
      <SideMenu />
      <SearchBar />
      {showSideMenu && <BackDrop />}
      {showSearchBar && <Overlay />}
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
  }
`;

const BackDrop = styled(Overlay)`
  background: rgba(255, 255, 255, 0);
  z-index: 9999;
`;
