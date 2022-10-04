import { createSlice } from '@reduxjs/toolkit';

const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    currentTag: 'all#@!',
    category: '정치',
    tag: '정당',
  },
  reducers: {
    setTag: (state, action) => {
      state.currentTag = action.payload;
    },
    changeCategory: (state, action) => {
      state.category = action.payload;
    },
    changeTag: (state, action) => {
      state.tag = action.payload;
    },
  },
});

export const tagActions = tagSlice.actions;
export default tagSlice;
