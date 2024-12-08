// src/store/actions/FavActions.js
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const LOAD_FAVORITES = 'LOAD_FAVORITES';

export const addFavorite = (manga) => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favorites.some(fav => fav._id === manga._id)) {
    const newFavorites = [...favorites, manga];
    localStorage.setItem('favorites', JSON.stringify(newFavorites));

    return {
      type: ADD_FAVORITE,
      payload: manga,
    };
  }
  return {
    type: 'DUPLICATE_FAVORITE',
  };
};

export const removeFavorite = (mangaId) => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const newFavorites = favorites.filter((manga) => manga._id !== mangaId);
  localStorage.setItem('favorites', JSON.stringify(newFavorites));

  return {
    type: REMOVE_FAVORITE,
    payload: mangaId,
  };
};

export const loadFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return {
    type: LOAD_FAVORITES,
    payload: favorites,
  };
};
