import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const hamburgerMenuSlice = createSlice({
  name: 'sideMenu',
  initialState: {
    checked: false,
  },
  reducers: {
    change(state, action: PayloadAction<boolean>) {
      state.checked = action.payload;
    },
  },
});

export const hamburgerMenuActions = hamburgerMenuSlice.actions;
export default hamburgerMenuSlice;
