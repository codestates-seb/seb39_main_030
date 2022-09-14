import { createSlice } from '@reduxjs/toolkit';

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    mode: window.localStorage.getItem('theme') || 'light',
  },
  reducers: {
    change(state) {
      if (state.mode === 'dark') state.mode = 'light';
      else state.mode = 'dark';
    },
  },
});

export const darkModeActions = darkModeSlice.actions;
export default darkModeSlice;
