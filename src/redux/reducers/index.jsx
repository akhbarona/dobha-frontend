import { combineReducers } from 'redux';
import { authUserReducers } from './authReducers';
import { getBlogsReducers, getBlogsDetailsReducers, getBlogsRelatedReducers } from './blogReducers';
import { cartReducers } from './cartReducers';
import { getProductsReducers, getProductDetailsReducers, getMoreProductsReducers, getProductsPopularReducers } from './productReducers';
import { getReviewReducers } from './reviewsReducers';
import { getAddressReducers } from './address';

export default combineReducers({
  cart: cartReducers,
  getProducts: getProductsReducers,
  getProductsPopular: getProductsPopularReducers,
  getProductDetails: getProductDetailsReducers,
  getMoreProducts: getMoreProductsReducers,
  getBlogs: getBlogsReducers,
  getBlogDetails: getBlogsDetailsReducers,
  getBlogsRelated: getBlogsRelatedReducers,
  getReviews: getReviewReducers,
  getAdress: getAddressReducers,
  authUser: authUserReducers,
});
