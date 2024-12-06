// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import chaptersReducer from './reducers/chaptersReducer';

export const store = configureStore({
  reducer: {
    chapters: chaptersReducer,
  }
});