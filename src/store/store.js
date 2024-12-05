import { configureStore } from '@reduxjs/toolkit';
import cardReducer from '../store/reducers/CardReducer';

const store = configureStore({
  reducer: {
    cards: cardReducer
  }
});

export default store;
