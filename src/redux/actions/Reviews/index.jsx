import axios from 'axios';

export const GET_REVIEWS_REQUEST = 'GET_REVIEWS_REQUEST';
export const GET_REVIEWS_SUCCESS = 'GET_REVIEWS_SUCCESS';
export const GET_REVIEWS_FAIL = 'GET_REVIEWS_FAIL';

export const getReviews = () => async (dispatch) => {
  dispatch({ type: GET_REVIEWS_REQUEST });
  await axios
    .get(`http://localhost:3001/comments?_sort=createdAt`)
    .then((res) => {
      dispatch({
        type: GET_REVIEWS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) =>
      dispatch({
        type: GET_REVIEWS_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
    );
};
