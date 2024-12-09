// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import chaptersReducer from './reducers/chaptersReducer';
import cardReducer from '../store/reducers/CardReducer';
import mangaReducer from './reducers/ReadReducer.js';
import CommentsReducers from './reducers/CommentsReducers.js';
import favReducer from './reducers/FavReducer';
import authReducer from "./reducers/authReducer.js"
import { loadFavorites } from './actions/FavActions';
import cardEditReducer from './reducers/CardsEditReducer.js';

export const store = configureStore({
  reducer: {
    
    authStore: authReducer,
    chapters: chaptersReducer,
    cards: cardReducer,
    manga: mangaReducer,
    comments: CommentsReducers,
    favorites: favReducer,
    cardEdit: cardEditReducer


  }
});

store.dispatch(loadFavorites());
