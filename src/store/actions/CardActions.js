import axios from 'axios';

export const FETCH_MANGAS_REQUEST = 'FETCH_MANGAS_REQUEST';
export const FETCH_MANGAS_SUCCESS = 'FETCH_MANGAS_SUCCESS';
export const FETCH_MANGAS_FAILURE = 'FETCH_MANGAS_FAILURE';
export const FETCH_GENRES_REQUEST = 'FETCH_GENRES_REQUEST';
export const FETCH_GENRES_SUCCESS = 'FETCH_GENRES_SUCCESS';
export const FETCH_GENRES_FAILURE = 'FETCH_GENRES_FAILURE';
//manga por id
export const FETCH_MANGA_BY_ID_REQUEST = 'FETCH_MANGA_BY_ID_REQUEST';
export const FETCH_MANGA_BY_ID_SUCCESS = 'FETCH_MANGA_BY_ID_SUCCESS';
export const FETCH_MANGA_BY_ID_FAILURE = 'FETCH_MANGA_BY_ID_FAILURE';

export const fetchMangas = (title = '', genres = []) => {
  return async dispatch => {
    dispatch({ type: FETCH_MANGAS_REQUEST });
    try {
      const response = await axios.get(`http://localhost:8080/api/mangas/all`, {
        params: { title, category: genres.join(',') }
      });
      dispatch({ type: FETCH_MANGAS_SUCCESS, payload: response.data.response });
    } catch (error) {
      dispatch({ type: FETCH_MANGAS_FAILURE, payload: error.message });
    }
  };
};

export const fetchGenres = () => {
  return async dispatch => {
    dispatch({ type: FETCH_GENRES_REQUEST });
    try {
      const response = await axios.get('http://localhost:8080/api/categories/all');
      dispatch({ type: FETCH_GENRES_SUCCESS, payload: response.data.response });
    } catch (error) {
      dispatch({ type: FETCH_GENRES_FAILURE, payload: error.message });
    }
  };
};

export const fetchMangaById = (id) => {
  return async dispatch => {
    dispatch({ type: FETCH_MANGA_BY_ID_REQUEST });
    try {
      const response = await axios.get(`http://localhost:8080/api/mangas/${id}`);
      dispatch({ type: FETCH_MANGA_BY_ID_SUCCESS, payload: response.data.response });
    } catch (error) {
      dispatch({ type: FETCH_MANGA_BY_ID_FAILURE, payload: error.message });
    }
  };
};
