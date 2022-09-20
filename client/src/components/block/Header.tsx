import styled from 'styled-components';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { SearchMenuActions } from '../../store/uiSlice/SearchMenu-slice';

import { TbSearch } from 'react-icons/tb';
import { FiLogIn } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';
import { GiDiscussion } from 'react-icons/gi';
import { TbZoomCancel } from 'react-icons/tb';

import { media } from '../../style/media';
import { Text } from '../atom/Text';
import DarkModeButton from '../atom/DarkModeButton';
import HamburgerMenu from '../atom/HamburgerMenu';
import { NavLink } from 'react-router-dom';
import useModal from '../app/hooks/useModal';
import { useRef, useState } from 'react';
import useOutSideClick from '../app/hooks/useOutSideClick';

const Header = () => {
  const [showProfile, setShowProfile] = useState<boolean>();
  const userProfileRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userInfo);

  const searchOpen = useSelector(
    (state: RootState) => state.searchMenu.clicked
  );

  const searchButtonHandler = () => {
    dispatch(SearchMenuActions.change());
  };

  const { openModal } = useModal();

  const openLoginHandler = () => {
    openModal({ type: 'login' });
  };

  const openLogoutHandler = () => {
    closeProfileHandler();
    openModal({ type: 'logout' });
  };

  const openProfileHandler = () => {
    setShowProfile(!showProfile);
  };

  const closeProfileHandler = () => {
    setShowProfile(false);
  };

  useOutSideClick(
    userProfileRef,
    showProfile
      ? closeProfileHandler
      : () => {
          return;
        }
  );

  return (
    <StyledHeader searchOpen={searchOpen} userProfileOpen={showProfile}>
      <div className="HamburgerMenu">
        <HamburgerMenu />
      </div>
      <div className="DarkModeButton">
        <DarkModeButton />
      </div>
      <NavLink to="/">
        <Text className="logo" fontSize="xl" fontWeight="bold">
          와글와글
        </Text>
      </NavLink>
      <NavLink className="logoIcon" to="/">
        <GiDiscussion />
      </NavLink>
      <nav>
        <ul>
          <li className="menu">
            <NavStyle to="/add-debate">토론생성</NavStyle>
          </li>
          <li className="search-menu">
            <TbSearch className="search" onClick={searchButtonHandler} />
            <TbZoomCancel className="close" onClick={searchButtonHandler} />
          </li>
          <li className="dark-mode--desktop">
            <DarkModeButton />
          </li>
          {user && (
            <li ref={userProfileRef}>
              <img
                onClick={openProfileHandler}
                className="userProfile"
                src={user.profileImg}
              />
              <div className="userProfileInfo">
                <ul>
                  <li>
                    <BiUser />내 정보
                  </li>
                  <li onClick={openLogoutHandler}>
                    <FiLogOut /> 로그아웃
                  </li>
                </ul>
              </div>
            </li>
          )}
          {!user && (
            <li className="login" onClick={openLoginHandler}>
              <FiLogIn />
            </li>
          )}
        </ul>
      </nav>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header<{
  searchOpen: boolean;
  userProfileOpen: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  background-color: ${({ theme }) => theme.mode.background};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${({ theme }) => `1px solid ${theme.mode.divider}`};
  z-index: 9000;

  .userProfileInfo {
    position: absolute;
    top: 90%;
    right: 10px;
    border: 2px solid ${({ theme }) => theme.mode.searchBar};
    background-color: ${({ theme }) => theme.mode.mainBackground};
    border-radius: 5px;
    visibility: ${(props) => (props.userProfileOpen ? 'visible' : 'hidden')};
    opacity: ${(props) => (props.userProfileOpen ? '1' : '0')};
    transition: all 0.3s;

    ul {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 10px;
      margin-top: 5px;
    }

    li {
      cursor: pointer;
      margin: 10px 15px;
      display: flex;
      align-items: center;
      color: ${({ theme }) => theme.mode.primaryText};
      font-weight: ${({ theme }) => theme.fontWeights.semiBold};
      svg {
        margin-bottom: 5px;
        margin-right: 10px;
        width: 25px;
        height: 25px;
      }
    }
  }

  .userProfileInfo::after {
    content: '';
    border-top: 9px solid transparent;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 10px solid ${({ theme }) => theme.mode.mainBackground};
    position: absolute;
    top: -16px;
    left: 112px;
  }

  .userProfileInfo::before {
    content: '';
    position: absolute;
    border-top: 8px solid transparent;
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
    border-bottom: 10px solid ${({ theme }) => theme.mode.themeIcon};
    top: -18px;
    left: 112px;
  }

  .dark-mode--desktop {
    ${media.custom('768px')} {
      display: none;
    }
  }

  .userProfile {
    border-radius: 50%;
    width: 32px;
    height: 32px;
    margin-top: 4px;
    cursor: pointer;
    box-shadow: 0px 0px 15px ${({ theme }) => theme.mode.searchBar};
  }
  a:link,
  a:visited {
    text-decoration: none;
  }

  .logo {
    margin-left: 3rem;
    margin-right: auto;
    display: block;
    cursor: pointer;

    ${media.custom('768px')} {
      display: none;
    }
  }

  .logoIcon {
    position: absolute;
    left: 48%;
    top: 25%;
    display: none;
    cursor: pointer;
    svg {
      color: ${({ theme }) => theme.mode.themeIcon};
      width: 30px;
      height: 30px;
    }
    ${media.custom('768px')} {
      display: block;
    }
  }

  .logo:hover,
  .logo:active {
    color: rgb(198, 198, 203);
  }

  .HamburgerMenu {
    display: none;
    margin-left: 2rem;
    ${media.custom('768px')} {
      display: block;
    }
  }

  .DarkModeButton {
    display: none;
    margin-left: 2rem;
    ${media.custom('768px')} {
      display: block;
      margin-right: auto;
      margin-top: 2px;
    }
  }

  .menu {
    display: block;
    margin-top: 2px;
    color: ${({ theme }) => theme.mode.primaryText};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    cursor: pointer;

    ${media.custom('768px')} {
      display: none;
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    align-items: center;
  }

  li {
    margin: 0 1rem;
  }

  .search-menu,
  .login,
  .logout {
    margin-left: 1rem;

    svg {
      color: ${({ theme }) => theme.mode.themeIcon};
      height: 27px;
      width: 27px;
      cursor: pointer;
    }

    .search {
      display: ${(props) => (props.searchOpen ? 'none' : 'block')};
    }

    .close {
      display: ${(props) => (props.searchOpen ? 'block' : 'none')};
    }
  }
`;

const NavStyle = styled(NavLink)`
  color: ${({ theme }) => theme.mode.primaryText};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};

  &::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.mode.themeIcon};
    transition: width 0.2s;
  }

  &:hover::after {
    width: 100%;
  }

  &.active {
    color: ${({ theme }) => theme.mode.themeIcon};
  }

  &:link,
  &:visited {
    text-decoration: none;
  }
`;
