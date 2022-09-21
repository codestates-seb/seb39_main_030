import { createSlice } from '@reduxjs/toolkit';

const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    currentTag: 'all#@!',
  },
  reducers: {
    setTag: (state, action) => {
      state.currentTag = action.payload;
    },
  },
});

export const tagActions = tagSlice.actions;
export default tagSlice;
