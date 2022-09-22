import { createSlice } from '@reduxjs/toolkit';

const debateToggleSlice = createSlice({
  name: 'debateToggle',
  initialState: {
    currentState: false,
  },
  reducers: {
    setToggle: (state, action) => {
      state.currentState = action.payload;
    },
  },
});

export const toggleActions = debateToggleSlice.actions;
export default debateToggleSlice;
