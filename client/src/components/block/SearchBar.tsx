import react, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { NavLink, useNavigate } from 'react-router-dom';

import { TbSearch } from 'react-icons/tb';
import { MdOutlineClose } from 'react-icons/md';
import { SearchMenuActions } from '../../store/uiSlice/SearchMenu-slice';
import useOutSideClick from '../app/hooks/useOutSideClick';
import { urlAction } from '../../store/url-slice';

const SearchBar = () => {
  const searchRef = useRef();
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchOpen = useSelector(
    (state: RootState) => state.searchMenu.clicked
  );

  useEffect(() => {
    searchOpen &&
      setTimeout(() => document.getElementById('search')!.focus(), 400);
  });

  const inputHandler = (e: react.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const afterSearch = () => {
    if (!text) return;
    dispatch(urlAction.setSearchSignal());
    dispatch(SearchMenuActions.close());
    navigate(`/${text}`);
    setText('');
    document.getElementById('search')!.blur();
  };

  const searchHandler = (e: react.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    afterSearch();
  };

  const searchButtonHandler = () => {
    afterSearch();
  };

  const clearHandler = () => {
    setText('');
  };

  const closeSearchHandler = () => {
    document.getElementById('search')!.blur();
    dispatch(SearchMenuActions.close());
  };

  useOutSideClick(
    searchRef,
    searchOpen
      ? closeSearchHandler
      : () => {
          return;
        }
  );

  return (
    <form ref={searchRef} onSubmit={searchHandler}>
      <StyledSearchBar open={searchOpen}>
        <div className="search">
          <NavLink onClick={searchButtonHandler} to={`/questions/${text}`}>
            <TbSearch />
          </NavLink>
          <input
            type="search"
            id="search"
            placeholder={`  Search...`}
            onChange={inputHandler}
            value={text}
          />
          <MdOutlineClose onClick={clearHandler} />
        </div>
        <div className="underline" />
      </StyledSearchBar>
    </form>
  );
};

export default SearchBar;

const StyledSearchBar = styled.div<{ open: boolean }>`
  background: ${({ theme }) => theme.mode.background};
  position: fixed;
  right: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 8000;

  transform: ${(props) =>
    props.open ? css`translateY(0px)` : css`translateY(-4rem)`};

  transition: transform 0.4s;

  ${(props) =>
    props.open
      ? css`
          animation: searchBarShow 0.4s ease forwards;
        `
      : css`
          animation: searchBarHide 0.4s ease forwards;
        `};

  @keyframes searchBarHide {
    0% {
    }
    100% {
      visibility: hidden;
    }
  }

  @keyframes searchBarShow {
    0% {
      visibility: visible;
    }
    100% {
    }
  }

  .search {
    text-align: center;
    display: flex;
    width: 60%;
  }

  .underline {
    margin-top: -2px;
    height: 2px;
    width: calc(60% - 30px);
    margin-left: 30px;
    background-color: ${({ theme }) => theme.mode.searchBar};
  }

  svg {
    margin-right: 3px;
    margin-bottom: -7px;
    color: ${({ theme }) => theme.mode.searchBar};
    height: 27px;
    width: 27px;
    cursor: pointer;
  }

  input {
    height: 30px;
    width: calc(100% - 30px);
    border: none;
    background: transparent;
    font-size: 20px;
    color: ${({ theme }) => theme.mode.primaryText};
  }

  input:focus {
    outline: none;
  }

  input::-webkit-search-decoration,
  input::-webkit-search-cancel-button,
  input::-webkit-search-results-button,
  input::-webkit-search-results-decoration {
    display: none;
  }
`;
