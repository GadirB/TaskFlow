import { configureStore } from '@reduxjs/toolkit';
import auhtReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: auhtReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;