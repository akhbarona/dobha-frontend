import axios from 'axios';

export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAIL = 'GET_PRODUCTS_FAIL';
export const GET_PRODUCTS_RESET = 'GET_PRODUCTS_RESET';

export const GET_PRODUCTS_POPULAR_REQUEST = 'GET_PRODUCTS_POPULAR_REQUEST';
export const GET_PRODUCTS_POPULAR_SUCCESS = 'GET_PRODUCTS_POPULAR_SUCCESS';
export const GET_PRODUCTS_POPULAR_FAIL = 'GET_PRODUCTS_POPULAR_FAIL';

export const GET_PRODUCT_DETAILS_REQUEST = 'GET_PRODUCT_DETAILS_REQUEST';
export const GET_PRODUCT_DETAILS_SUCCESS = 'GET_PRODUCT_DETAILS_SUCCESS';
export const GET_PRODUCT_DETAILS_FAIL = 'GET_PRODUCT_DETAILS_FAIL';
export const GET_PRODUCT_DETAILS_RESET = 'GET_PRODUCT_DETAILS_RESET';

export const GET_MORE_PRODUCT_REQUEST = 'GET_MORE_PRODUCT_REQUEST';
export const GET_MORE_PRODUCT_SUCCESS = 'GET_MORE_PRODUCT_SUCCESS';
export const GET_MORE_PRODUCT_FAIL = 'GET_MORE_PRODUCT_FAIL';

const API_URL = process.env.REACT_APP_API_URL;

export const getProducts = (text, page) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS_REQUEST });
    let urlTitle = '';

    if (text != '') {
      urlTitle = '&q=' + text;
    } else {
      urlTitle = '';
    }
    const { data } = await axios.get(`${API_URL}/api/read-all-product-paginate?page=${page}${urlTitle}`);
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
export const resetPosts = () => {
  return { type: GET_PRODUCTS_RESET };
};
export const getProdcutsPopular = (page) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS_POPULAR_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/sort/popular-products?page=` + page);
    // console.log(data);
    dispatch({
      type: GET_PRODUCTS_POPULAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_POPULAR_FAIL,
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

export const getMoreProducts = (category_id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_MORE_PRODUCT_REQUEST,
    });
    const { data } = await axios.get(`${API_URL}/api/related-products/${category_id}`);
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
