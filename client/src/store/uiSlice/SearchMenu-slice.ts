import { createSlice } from '@reduxjs/toolkit';

const SearchMenuSlice = createSlice({
  name: 'SearchMenu',
  initialState: {
    closed: false,
    clicked: false,
  },
  reducers: {
    change(state) {
      state.clicked = !state.clicked;
    },
    close(state) {
      state.closed = !state.closed;
      state.clicked = false;
    },
  },
});

export const SearchMenuActions = SearchMenuSlice.actions;
export default SearchMenuSlice;
