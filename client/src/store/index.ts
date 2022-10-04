import { configureStore } from '@reduxjs/toolkit';
import darkModeSlice from './uiSlice/darkMode-slice';
import hamburgerMenuSlice from './uiSlice/hamburgerMenu-slice';
import searchMenuSlice from './uiSlice/SearchMenu-slice';
import modalSlice from './uiSlice/modal-slice';
import userSlice from './user-slice';
import tagSlice from './tag-slice';
import urlSlice from './url-slice';
import debateToggleSlice from './debateToggle-slice';
import myPageSlice from './myPage';
import socketSlice from './socket-slice';

const store = configureStore({
  reducer: {
    darkMode: darkModeSlice.reducer,
    hamburgerMenu: hamburgerMenuSlice.reducer,
    searchMenu: searchMenuSlice.reducer,
    modal: modalSlice.reducer,
    user: userSlice.reducer,
    tag: tagSlice.reducer,
    url: urlSlice.reducer,
    debateToggle: debateToggleSlice.reducer,
    myPage: myPageSlice.reducer,
    socket: socketSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
