import { configureStore } from '@reduxjs/toolkit';
import tablesReducer from './tablesSlice';

const store = configureStore({
  reducer: {
    data: tablesReducer,
  }
});

export default store;
