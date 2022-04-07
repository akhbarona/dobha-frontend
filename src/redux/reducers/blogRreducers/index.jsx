import {
  GET_BLOGS_DETAILS_FAIL,
  GET_BLOGS_DETAILS_REQUEST,
  GET_BLOGS_DETAILS_RESET,
  GET_BLOGS_DETAILS_SUCCESS,
  GET_BLOGS_FAIL,
  GET_BLOGS_RELATED_FAIL,
  GET_BLOGS_RELATED_REQUEST,
  GET_BLOGS_RELATED_SUCCESS,
  GET_BLOGS_REQUEST,
  GET_BLOGS_SUCCESS,
} from '../../actions/blogActions';

const initialState = { blogs: [] };

export const getBlogsReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOGS_REQUEST:
      return {
        loading: true,
        blogs: [],
      };
    case GET_BLOGS_SUCCESS:
      return {
        loading: false,
        blogs: action.payload,
      };
    case GET_BLOGS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const getBlogsDetailsReducers = (state = { blog: {} }, action) => {
  switch (action.type) {
    case GET_BLOGS_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case GET_BLOGS_DETAILS_SUCCESS:
      return {
        loading: false,
        blog: action.payload,
      };
    case GET_BLOGS_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_BLOGS_DETAILS_RESET:
      return {
        blog: {},
      };
    default:
      return state;
  }
};
export const getBlogsRelatedReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOGS_RELATED_REQUEST:
      return {
        loading: true,
        blogs: [],
      };
    case GET_BLOGS_RELATED_SUCCESS:
      return {
        loading: false,
        blogs: action.payload,
      };
    case GET_BLOGS_RELATED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
