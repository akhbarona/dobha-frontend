import axios from 'axios';

export const GET_REVIEWS_REQUEST = 'GET_REVIEWS_REQUEST';
export const GET_REVIEWS_SUCCESS = 'GET_REVIEWS_SUCCESS';
export const GET_REVIEWS_FAIL = 'GET_REVIEWS_FAIL';

export const getReviews = (slug_produk) => async (dispatch) => {
  dispatch({ type: GET_REVIEWS_REQUEST });
  await axios
    .get(`/api/read-product/${slug_produk}`)
    .then((res) => {
      console.log(res.data.data.review);
      dispatch({
        type: GET_REVIEWS_SUCCESS,
        payload: res.data.data.review,
      });
    })
    .catch((error) =>
      dispatch({
        type: GET_REVIEWS_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      })
    );
};
