import { ADD_TO_CART, REMOVE_FROM_CART, CART_RESET } from '../../actions/cartActions';

const intialState = { cartItems: [] };

export const cartReducers = (state = intialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      // Jika barang sudah ada di cart maka:
      const existItem = state.cartItems.find((x) => x.product === item.product);
      // console.log(existItem);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) => (x.product === existItem.product ? item : x)),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_RESET:
      return {
        ...state,
        cartItems: [],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    default:
      return state;
  }
};
