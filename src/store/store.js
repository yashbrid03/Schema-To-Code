import { configureStore } from '@reduxjs/toolkit';
import tablesReducer from './tablesSlice';
import nodesReducer from './nodeSlice'

const store = configureStore({
  reducer: {
    data: tablesReducer,
    node:nodesReducer,
  }
});

export default store;
