import { configureStore } from '@reduxjs/toolkit';
import darkModeSlice from './uiSlice/darkMode-slice';
import hamburgerMenuSlice from './uiSlice/hamburgerMenu-slice';
import SearchMenuSlice from './uiSlice/SearchMenu-slice';
import searchMenuSlice from './uiSlice/SearchMenu-slice';

const store = configureStore({
  reducer: {
    darkMode: darkModeSlice.reducer,
    hamburgerMenu: hamburgerMenuSlice.reducer,
    searchMenu: searchMenuSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
