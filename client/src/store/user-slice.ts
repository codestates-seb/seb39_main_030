import { createSlice } from '@reduxjs/toolkit';
import { getStoredUser } from '../auth/user-storage';
import { User } from '../type';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: getStoredUser() as User,
  },
  reducers: {
    change: (state) => {
      state.userInfo = getStoredUser();
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
