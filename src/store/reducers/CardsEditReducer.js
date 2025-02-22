import { createReducer } from '@reduxjs/toolkit';
import {
  FETCH_MANGAS_REQUEST, FETCH_MANGAS_SUCCESS, FETCH_MANGAS_FAILURE,
  FETCH_GENRES_REQUEST, FETCH_GENRES_SUCCESS, FETCH_GENRES_FAILURE,
  FETCH_MANGA_BY_ID_REQUEST, FETCH_MANGA_BY_ID_SUCCESS, FETCH_MANGA_BY_ID_FAILURE
} from '../actions/CardsEditActions';

const initialState = {
  loading: false,
  mangas: [],
  genres: [],
  selectedTitle: '',
  selectedGenre: [],
  error: ''
};

const cardEditReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(FETCH_MANGAS_REQUEST, (state) => {
      state.loading = true;
      state.error = ''; 
    })
    .addCase(FETCH_MANGAS_SUCCESS, (state, action) => {
      state.loading = false;
      state.mangas = action.payload;
      state.error = '';
    })
    .addCase(FETCH_MANGAS_FAILURE, (state, action) => {
      state.loading = false;
      state.mangas = [];
      state.error = action.payload;
    })
    .addCase(FETCH_GENRES_REQUEST, (state) => {
      state.loading = true;
      state.error = ''; 
    })
    .addCase(FETCH_GENRES_SUCCESS, (state, action) => {
      state.loading = false;
      state.genres = action.payload;
      state.error = '';
    })
    .addCase(FETCH_GENRES_FAILURE, (state, action) => {
      state.loading = false;
      state.genres = [];
      state.error = action.payload;
    })
    .addCase('SET_SELECTED_TITLE', (state, action) => {
      state.selectedTitle = action.payload;
    })
    .addCase('SET_SELECTED_GENRE', (state, action) => {
      state.selectedGenre = action.payload;
    })
    .addCase(FETCH_MANGA_BY_ID_REQUEST, (state) => {
      state.loading = true;
      state.error = '';
    })
    .addCase(FETCH_MANGA_BY_ID_SUCCESS, (state, action) => {
      state.loading = false;
      state.currentManga = action.payload;
      state.error = '';
    })
    .addCase(FETCH_MANGA_BY_ID_FAILURE, (state, action) => {
      state.loading = false;
      state.currentManga = null;
      state.error = action.payload;
    });
});

export default cardEditReducer;
