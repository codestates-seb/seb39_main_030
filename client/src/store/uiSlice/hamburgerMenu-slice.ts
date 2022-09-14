import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const hamburgerMenuSlice = createSlice({
  name: 'sideMenu',
  initialState: {
    closed: false,
    checked: false,
  },
  reducers: {
    change(state, action: PayloadAction<boolean>) {
      state.checked = action.payload;
    },
    close(state) {
      state.closed = !state.closed;
      state.checked = false;
    },
  },
});

export const hamburgerMenuActions = hamburgerMenuSlice.actions;
export default hamburgerMenuSlice;
