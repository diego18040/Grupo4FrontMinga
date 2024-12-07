// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import chaptersReducer from './reducers/chaptersReducer';
import cardReducer from './reducers/CardReducer';
import favReducer from './reducers/FavReducer';
import { loadFavorites } from './actions/FavActions';

export const store = configureStore({
  reducer: {
    chapters: chaptersReducer,
    cards: cardReducer,
    favorites: favReducer,
  },
});

store.dispatch(loadFavorites());
