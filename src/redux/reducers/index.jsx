import { combineReducers } from 'redux';
import { getBlogsReducers, getBlogsDetailsReducers, getBlogsRelatedReducers } from './blogRreducers';
import { cartReducers } from './cartReducers';
import { getProductsReducers, getProductDetailsReducers, getMoreProductsReducers } from './productReducers';
import { getReviewReducers } from './reviewsReducers';
import { getAddressReducers } from './address';

export default combineReducers({
  cart: cartReducers,
  getProducts: getProductsReducers,
  getProductDetails: getProductDetailsReducers,
  getMoreProducts: getMoreProductsReducers,
  getBlogs: getBlogsReducers,
  getBlogDetails: getBlogsDetailsReducers,
  getBlogsRelated: getBlogsRelatedReducers,
  getReviews: getReviewReducers,
  getAdress: getAddressReducers
});
