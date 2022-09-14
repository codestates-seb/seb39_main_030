import React from 'react';
import styled from 'styled-components';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { darkModeActions } from '../../store/uiSlice/darkMode-slice';

interface IWrapper {
  themeMode: string;
}

const DarkModeButton = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.darkMode.mode) as string;
  const toggleTheme = () => {
    if (mode === 'light') {
      window.localStorage.setItem('theme', 'dark');
      dispatch(darkModeActions.change());
    } else {
      window.localStorage.setItem('theme', 'light');
      dispatch(darkModeActions.change());
    }
  };

  return (
    <StyledDarkModeButton onClick={toggleTheme} themeMode={mode}>
      {mode === 'light' ? <MdLightMode /> : <MdDarkMode />}
    </StyledDarkModeButton>
  );
};

export default DarkModeButton;

const StyledDarkModeButton = styled.button<IWrapper>`
  background: ${({ theme }) => theme.mode.mainBackground};
  border: 1px solid ${({ theme }) => theme.mode.border};
  box-shadow: 0 1px 3px ${({ theme }) => theme.mode.divider};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  overflow: hidden;
  padding: 0.2rem;
  z-index: 1;
  width: 2rem;
  height: 2rem;
  top: 2rem;
  right: 2rem;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${({ theme }) => theme.mode.background};
    }
  }

  svg {
    color: ${({ theme }) => theme.mode.themeIcon};

    &:first-child {
      width: 24px;
      height: 24px;
      animation: show 0.6s ease forwards;
    }

    @keyframes show {
      0% {
        transform: rotate(0deg);
        opacity: 0;
      }
      50% {
        transform: rotate(180deg);
      }
      95% {
        transform: scale(1.2);
      }
      100% {
        opacity: 1;
      }
    }
  }
`;
