import styled from 'styled-components';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

import { media } from '../../style/media';
import { Text } from '../atom/Text';
import DarkModeButton from '../atom/DarkModeButton';
import HamburgerMenu from '../atom/HamburgerMenu';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const searchOpen = useSelector(
    (state: RootState) => state.searchMenu.clicked
  );

  const menuItem = [
    { name: '토론 열기', path: '/add-debate' },
    { name: '로그인', path: '/login' },
  ].map((menu, idx) => (
    <li key={idx} className="menu">
      <NavStyle to={menu.path}>{menu.name}</NavStyle>
    </li>
  ));

  return (
    <StyledHeader open={searchOpen}>
      <div className="HamburgerMenu">
        <HamburgerMenu />
      </div>
      <NavLink to="/">
        <Text className="logo" fontSize="xl" fontWeight="bold">
          와글와글
        </Text>
      </NavLink>
      <nav>
        <ul>
          {menuItem}
          <li>
            <DarkModeButton />
          </li>
        </ul>
      </nav>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header<{ open: boolean }>`
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

  .menu {
    display: block;
    margin-top: 2px;

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
