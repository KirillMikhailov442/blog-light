import { configureStore } from '@reduxjs/toolkit';
import showComponetsSlice from './slices/showComponet';

export const store = configureStore({
  reducer: {
    showComponents: showComponetsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
