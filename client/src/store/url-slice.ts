import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const urlSlice = createSlice({
  name: 'url',
  initialState: {
    debateCode: 0,
    searchSignal: false,
  },
  reducers: {
    setDebateId: (state, action: PayloadAction<number>) => {
      state.debateCode = action.payload;
    },
    setSearchSignal(state) {
      state.searchSignal = !state.searchSignal;
    },
  },
});

export const urlAction = urlSlice.actions;
export default urlSlice;
