// src/store/reducers/FavReducer.js
import { createReducer } from '@reduxjs/toolkit';
import { ADD_FAVORITE, REMOVE_FAVORITE, LOAD_FAVORITES } from '../actions/FavActions';

const initialState = {
  favorites: [],
};

const favReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ADD_FAVORITE, (state, action) => {
      state.favorites.push(action.payload);
    })
    .addCase(REMOVE_FAVORITE, (state, action) => {
      state.favorites = state.favorites.filter((manga) => manga._id !== action.payload);
    })
    .addCase(LOAD_FAVORITES, (state, action) => {
      state.favorites = action.payload;
    });
});

export default favReducer;
