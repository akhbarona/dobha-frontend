import { combineReducers } from 'redux';
import { authUserReducers } from './authReducers';
import { getBlogsReducers, getBlogsDetailsReducers, getBlogsRelatedReducers } from './blogReducers';
import { cartReducers } from './cartReducers';
import { getProductsReducers, getProductDetailsReducers, getMoreProductsReducers } from './productReducers';
import { getReviewReducers } from './reviewsReducers';
export default combineReducers({
  cart: cartReducers,
  getProducts: getProductsReducers,
  getProductDetails: getProductDetailsReducers,
  getMoreProducts: getMoreProductsReducers,
  getBlogs: getBlogsReducers,
  getBlogDetails: getBlogsDetailsReducers,
  getBlogsRelated: getBlogsRelatedReducers,
  getReviews: getReviewReducers,
  authUser: authUserReducers,
});
