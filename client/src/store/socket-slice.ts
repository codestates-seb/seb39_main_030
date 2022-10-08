import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    socketId: '',
    endSignal: false,
    masterUserCode: '',
    slaveUserCode: '',
  },
  reducers: {
    setSocketId: (state, action) => {
      state.socketId = action.payload;
    },
    endChat: (state) => {
      state.endSignal = !state.endSignal;
    },
    setMaster: (state, action) => {
      state.masterUserCode = action.payload;
    },
    setSlave: (state, action) => {
      state.masterUserCode = action.payload;
    },
  },
});

export const socketActions = socketSlice.actions;
export default socketSlice;
