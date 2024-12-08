// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import chaptersReducer from './reducers/chaptersReducer';
import cardReducer from '../store/reducers/CardReducer';
import mangaReducer from './reducers/ReadReducer.js';
import CommentsReducers from './reducers/CommentsReducers.js';

export const store = configureStore({
  reducer: {
    chapters: chaptersReducer,
    cards: cardReducer,
    manga: mangaReducer,
    comments: CommentsReducers


  }
});