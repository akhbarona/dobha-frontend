import {
  GET_MORE_PRODUCT_FAIL,
  GET_MORE_PRODUCT_REQUEST,
  GET_MORE_PRODUCT_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  GET_PRODUCT_DETAILS_REQUEST,
  GET_PRODUCT_DETAILS_RESET,
  GET_PRODUCT_DETAILS_SUCCESS,
} from '../../actions/ProductActions';

const initialState = { products: [] };

export const getProductsReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case GET_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const getProductDetailsReducers = (state = { product: {} }, action) => {
  switch (action.type) {
    case GET_PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case GET_PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case GET_PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_PRODUCT_DETAILS_RESET:
      return {
        product: {},
      };
    default:
      return state;
  }
};
export const getMoreProductsReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_MORE_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case GET_MORE_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case GET_MORE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
