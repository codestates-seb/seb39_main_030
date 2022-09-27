import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface Modal {
  type: string;
  props: any;
  signal: boolean;
}
const initialState: Modal = {
  type: null,
  props: null,
  signal: false,
};

export const modalSelector = (state: RootState) => state.modal;

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { type, props } = action.payload;
      state.type = type;
      state.props = props;
    },
    closeModal: () => {
      return initialState;
    },
    signal: (state, action) => {
      state.signal = action.payload;
    },
  },
});

export const { openModal, closeModal, signal } = modalSlice.actions;
export default modalSlice;
