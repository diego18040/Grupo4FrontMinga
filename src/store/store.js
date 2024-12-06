// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import chaptersReducer from './reducers/chaptersReducer';
import cardReducer from '../store/reducers/CardReducer';

export const store = configureStore({
  reducer: {
    chapters: chaptersReducer,
    cards: cardReducer
  }
});