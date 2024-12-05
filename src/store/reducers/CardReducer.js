import { createReducer } from '@reduxjs/toolkit';
import {
  FETCH_MANGAS_REQUEST, FETCH_MANGAS_SUCCESS, FETCH_MANGAS_FAILURE,
  FETCH_GENRES_REQUEST, FETCH_GENRES_SUCCESS, FETCH_GENRES_FAILURE
} from '../actions/CardActions';

const initialState = {
  loading: false,
  mangas: [],
  genres: [],
  selectedTitle: '',
  selectedGenre: [],
  error: ''
};

const cardReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(FETCH_MANGAS_REQUEST, (state) => {
      state.loading = true;
      state.error = ''; // Clear any previous errors
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
      state.error = ''; // Clear any previous errors
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
    });
});

export default cardReducer;
