import axios from 'axios';

export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAIL = 'GET_PRODUCTS_FAIL';

export const GET_PRODUCT_DETAILS_REQUEST = 'GET_PRODUCT_DETAILS_REQUEST';
export const GET_PRODUCT_DETAILS_SUCCESS = 'GET_PRODUCT_DETAILS_SUCCESS';
export const GET_PRODUCT_DETAILS_FAIL = 'GET_PRODUCT_DETAILS_FAIL';
export const GET_PRODUCT_DETAILS_RESET = 'GET_PRODUCT_DETAILS_RESET';

export const GET_MORE_PRODUCT_REQUEST = 'GET_MORE_PRODUCT_REQUEST';
export const GET_MORE_PRODUCT_SUCCESS = 'GET_MORE_PRODUCT_SUCCESS';
export const GET_MORE_PRODUCT_FAIL = 'GET_MORE_PRODUCT_FAIL';

const API_URL = process.env.REACT_APP_API_URL;

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/read-all-product`);
    console.log(data);
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/read-product/${id}`);
    dispatch({
      type: GET_PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
export const removeProductDetails = () => (dispatch) => {
  dispatch({
    type: GET_PRODUCT_DETAILS_RESET,
  });
};

export const getMoreProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_MORE_PRODUCT_REQUEST,
    });
    const { data } = await axios.get(`http://localhost:3001/products?_limit=5`);
    dispatch({
      type: GET_MORE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_MORE_PRODUCT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
