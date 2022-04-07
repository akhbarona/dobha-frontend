import axios from 'axios';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CART_RESET = 'CART_RESET';

// file ini berhubungan dengan backend

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`http://localhost:3001/products/${id}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.id,
      name: data.title,
      imageUrl: data.image,
      price: data.price,
      countInStock: data.qty,
      qty,
    },
  });
  localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });
  localStorage.removeItem('cart', JSON.stringify(getState().cart.cartItems));
};

export const resetCart = () => (dispatch, getState) => {
  dispatch({
    type: CART_RESET,
  });
  localStorage.removeItem('cart', JSON.stringify(getState().cart.cartItems));
};
