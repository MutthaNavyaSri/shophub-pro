import { configureStore } from '@reduxjs/toolkit';
import { fakestoreApi } from './api/fakestoreApi';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    [fakestoreApi.reducerPath]: fakestoreApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fakestoreApi.middleware),
});

export default store;
