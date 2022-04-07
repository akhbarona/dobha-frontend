import CartItem from './CartItem/CartItem';
import './Cart.css';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';
import { useCallback } from 'react';
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const qtyChangeHandler = useCallback((id, qty) => {
    dispatch(addToCart(id, qty));
  }, []);

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };
  const totalHarga = getCartSubTotal();
  const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(money);
  };

  const checkOutHandler = () => {
    navigate(`/checkout`);
  };
  return (
    <section>
      <div className="cart-screen">
        <div className={cartItems.length === 0 ? 'cart-flex-one' : 'cart-screen-left'}>
          <h2>Keranjang</h2>
          {cartItems.length === 0 ? (
            <div className="card card-body py-5 text-center shadow-sm">
              <h4 className="title-cart-empty">Your Shopping Cart is Empty</h4>
              <Link className="please-buy" to="/products">
                <h5>Sihlakan Berbelanja</h5>
              </Link>
            </div>
          ) : (
            cartItems.map((item, index) => <CartItem key={index} item={item} qtyChangeHandler={qtyChangeHandler} removeHandler={removeHandler} />)
          )}
        </div>
        {cartItems.length === 0 ? null : (
          <div className="cart-screen-right">
            <>
              <div className="cart-screen-info">
                <p>Total Belanja ({getCartCount()}) items</p>
                <p>{formatRupiah(totalHarga)}</p>
              </div>
              <div>
                <button onClick={checkOutHandler}>Beli</button>
              </div>
            </>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
