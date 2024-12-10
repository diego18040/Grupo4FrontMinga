import axios from 'axios';

export const FETCH_MANGAS_REQUEST = 'FETCH_MANGAS_REQUEST';
export const FETCH_MANGAS_SUCCESS = 'FETCH_MANGAS_SUCCESS';
export const FETCH_MANGAS_FAILURE = 'FETCH_MANGAS_FAILURE';
export const FETCH_GENRES_REQUEST = 'FETCH_GENRES_REQUEST';
export const FETCH_GENRES_SUCCESS = 'FETCH_GENRES_SUCCESS';
export const FETCH_GENRES_FAILURE = 'FETCH_GENRES_FAILURE';

export const FETCH_MANGA_BY_ID_REQUEST = 'FETCH_MANGA_BY_ID_REQUEST';
export const FETCH_MANGA_BY_ID_SUCCESS = 'FETCH_MANGA_BY_ID_SUCCESS';
export const FETCH_MANGA_BY_ID_FAILURE = 'FETCH_MANGA_BY_ID_FAILURE';

const getAuthToken = () => {
  return localStorage.getItem('token'); 
};

export const fetchMangasEdit = (id, title = '', genres = []) => {
  return async dispatch => {
    dispatch({ type: FETCH_MANGAS_REQUEST });
    try {
      const token = getAuthToken();
      const response = await axios.get(`http://localhost:8080/api/mangas/creator/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
        params: {
          title,
          genres: genres.join(',') 
        }
      });
      dispatch({ type: FETCH_MANGAS_SUCCESS, payload: response.data.response });
    } catch (error) {
      dispatch({ type: FETCH_MANGAS_FAILURE, payload: error.message  });
    }
  };
};

export const fetchGenresEdit = () => {
  return async dispatch => {
    dispatch({ type: FETCH_GENRES_REQUEST });
    try {
      const token = getAuthToken();
      const response = await axios.get('http://localhost:8080/api/categories/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      dispatch({ type: FETCH_GENRES_SUCCESS, payload: response.data.response });
    } catch (error) {
      dispatch({ type: FETCH_GENRES_FAILURE, payload: error.message });
    }
  };
};
