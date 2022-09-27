import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { hamburgerMenuActions } from '../../store/uiSlice/hamburgerMenu-slice';
import useOutSideClick from '../app/hooks/useOutSideClick';

import { NavLink } from 'react-router-dom';
import { useRef } from 'react';
import { media } from '../../style/media';
import useModal from '../app/hooks/useModal';

const SideMenu = () => {
  const dispatch = useDispatch();
  const sideMenuRef = useRef();
  const open = useSelector((state: RootState) => state.hamburgerMenu.checked);
  const user = useSelector((state: RootState) => state.user.userInfo);

  const { openModal } = useModal();

  const openLoginHandler = () => {
    sideMenuCloseHandler();
    openModal({ type: 'login' });
  };

  const openLogoutHandler = () => {
    sideMenuCloseHandler();
    openModal({ type: 'logout' });
  };

  const sideMenuCloseHandler = () => {
    dispatch(hamburgerMenuActions.change(false));
  };

  useOutSideClick(
    sideMenuRef,
    open
      ? sideMenuCloseHandler
      : () => {
          return;
        }
  );

  return (
    <StyledSideMenu ref={sideMenuRef} open={open}>
      <div className="margin"></div>
      {user && (
        <li className="menu" onClick={sideMenuCloseHandler}>
          <NavStyle to="/add-debate">토론생성</NavStyle>
        </li>
      )}
      {user && (
        <li className="menu" onClick={sideMenuCloseHandler}>
          <NavStyle to="/admin-contact">문의하기</NavStyle>
        </li>
      )}
      {user ? (
        <li className="menu" onClick={openLogoutHandler}>
          <NavStyle to={window.location.pathname}>로그아웃</NavStyle>
        </li>
      ) : (
        <li className="menu" onClick={openLoginHandler}>
          <NavStyle to={window.location.pathname}>로그인</NavStyle>
        </li>
      )}
      {user?.userRole === 'ROLE_ADMIN' && (
        <li className="menu" onClick={sideMenuCloseHandler}>
          <NavStyle to="/admin">⚙️ 관리자</NavStyle>
        </li>
      )}
    </StyledSideMenu>
  );
};

export default SideMenu;

const StyledSideMenu = styled.ul<{ open: boolean }>`
  position: fixed;
  top: 64px;
  left: 0;
  width: 200px;
  height: 100%;
  background-color: ${({ theme }) => theme.mode.background};
  list-style: none;
  z-index: 99999;
  visibility: hidden;

  ${media.custom('768px')} {
    visibility: visible;
  }

  .margin {
    margin-top: 30px;
  }

  .menu {
    display: block;
    margin-top: 30px;
    margin-left: 30px;
  }

  transform: ${(props) =>
    props.open ? css`translateX(0px)` : css`translateX(-100%)`};

  transition: transform 0.4s;

  li {
    transition: 0.1s;
  }

  li:hover {
    transform: scale(1.1, 1.1) translateX(10px);
  }
`;

const NavStyle = styled(NavLink)`
  color: ${({ theme }) => theme.mode.primaryText};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  font-size: 20px;
  &:link,
  &:visited {
    text-decoration: none;
  }
`;
