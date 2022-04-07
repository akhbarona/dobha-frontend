import { GET_REVIEWS_FAIL, GET_REVIEWS_REQUEST, GET_REVIEWS_SUCCESS } from '../../actions/Reviews';

const initialState = { comment: [] };

export const getReviewReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
        comment: [],
      };
    case GET_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        comment: action.payload,
      };
    case GET_REVIEWS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
