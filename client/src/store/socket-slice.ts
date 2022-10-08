import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    socketId: '',
    endSignal: false,
  },
  reducers: {
    setSocketId: (state, action) => {
      state.socketId = action.payload;
    },
    endChat: (state) => {
      state.endSignal = !state.endSignal;
    },
  },
});

export const socketActions = socketSlice.actions;
export default socketSlice;
