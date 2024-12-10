import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthorData, fetchCardsData } from '../actions/UserProfileActions';

const initialState = {
  loading: false,
  authorData: {
    id: '',
    imageUrl: '',
    name: '',
    lastName: '',
    city: '',
    country: '',
    birthDate: '',
  },
  cardsData: [],
  error: '',
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Manejar fetchAuthorData
      .addCase(fetchAuthorData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAuthorData.fulfilled, (state, action) => {
        state.loading = false;
        state.authorData = action.payload;
        state.error = '';
      })
      .addCase(fetchAuthorData.rejected, (state, action) => {
        state.loading = false;
        state.authorData = initialState.authorData;
        state.error = action.payload;
      })
      // Manejar fetchCardsData
      .addCase(fetchCardsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCardsData.fulfilled, (state, action) => {
        state.loading = false;
        state.cardsData = action.payload;
        state.error = '';
      })
      .addCase(fetchCardsData.rejected, (state, action) => {
        state.loading = false;
        state.cardsData = [];
        state.error = action.payload;
      });
  },
});

export default userProfileSlice.reducer;

