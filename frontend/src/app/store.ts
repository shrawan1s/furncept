import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import customerReducer from './slices/customerSlice';
import packingDataReducer from './slices/packingDataSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    packingData: packingDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
