import { GET_ADDRESS_FAIL, GET_ADDRES_SUCCESS, GET_ADDRES_REQUEST } from '../../actions/addressActions';

const initialState = {
  address: {
    loading: true,
    address: [],
    error: null,
  },
};

export const getAddressReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADDRES_REQUEST:
      return {
        ...state,
        address: {
          loading: true,
          address: [],
          error: null,
        },
      };
    case GET_ADDRES_SUCCESS:
      return {
        ...state,
        address: {
          loading: false,
          address: action.payload,
          error: null,
        },
      };
    case GET_ADDRESS_FAIL:
      return {
        ...state,
        address: {
          loading: false,
          address: [],
          error: action.payload,
        },
      };
    default:
      return state;
  }
};
