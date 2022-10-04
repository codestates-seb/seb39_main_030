import { createSlice } from '@reduxjs/toolkit';

const myPageSlice = createSlice({
  name: 'myPage',
  initialState: {
    flag: false,
  },
  reducers: {
    changeUserInfo: (state) => {
      state.flag = !state.flag;
    },
  },
});

export const myPageActions = myPageSlice.actions;
export default myPageSlice;
