import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import customerReducer from './slices/customerSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
