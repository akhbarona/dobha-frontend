import axios from 'axios';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CART_RESET = 'CART_RESET';

// file ini berhubungan dengan backend

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`https://dobha.000webhostapp.com/api/read-product-by-slug/${id}`);
  console.log(data)
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.data.id,
      name: data.data.nama_produk,
      imageUrl: data.data.gambar_produk,
      slug_produk: data.data.slug_produk,
      price: data.data.harga_satuan,
      countInStock: data.data.stock_produk,
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
