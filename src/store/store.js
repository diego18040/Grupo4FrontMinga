// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import chaptersReducer from './reducers/chaptersReducer';
import cardReducer from '../store/reducers/CardReducer';
import mangaReducer from './reducers/ReadReducer.js';
import CommentsReducers from './reducers/CommentsReducers.js';
import favReducer from './reducers/FavReducer';
import { loadFavorites } from './actions/FavActions';

export const store = configureStore({
  reducer: {
    chapters: chaptersReducer,
    cards: cardReducer,
    manga: mangaReducer,
    comments: CommentsReducers,
    favorites: favReducer,


  }
});

store.dispatch(loadFavorites());
