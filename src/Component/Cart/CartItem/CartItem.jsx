import './CartItem.css';
import { useState, useEffect, memo } from 'react';

import { Link } from 'react-router-dom';
import { FormControl, InputGroup, NavItem } from 'react-bootstrap';
const CartItem = ({ index, item, qtyChangeHandler, removeHandler }) => {
  const [kuantitas, setKuantitas] = useState(item.qty);
  const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(money);
  };

  // console.zg(item)
  useEffect(() => {
    if (kuantitas) {
      qtyChangeHandler(item.slug_produk, kuantitas);
    }
  }, [kuantitas]);
  const onlyNumber = (e) => {
    const re = /^[0-9\b]+$/;
    const newValue = e.target.value;
    if (newValue <= 0) {
      setKuantitas(0);
    } else {
      if (newValue === '' || re.test(newValue)) {
        if (newValue > item.countInStock) {
          setKuantitas(1);
        } else {
          setKuantitas(Number(newValue));
        }
      }
    }
    qtyChangeHandler(item.slug_produk, e.target.value);
  };
  const handleDecrement = () => {
    if (kuantitas > 1) {
      setKuantitas((prevCount) => prevCount - 1);
    }
  };
  const handleIncrement = () => {
    if (kuantitas < item.countInStock) {
      setKuantitas((nextCount) => nextCount + 1);
    } else {
      setKuantitas(1);
    }
  };

  const onlyNol = (e) => {
    if (e.target.value <= 0) {
      setKuantitas(Number(1));
      qtyChangeHandler(item.slug_produk, 1);
    }
  };

  return (
    <div className="cartitem" key={index}>
      <div className="cartItem-image">
        <img src={item.imageUrl} alt="Product Item" />
      </div>
      <Link to={`/products/${item.product}`} className="cartItem-name">
        <p>{item.name}</p>
      </Link>

      <p className="cartItem-price">{formatRupiah(item.price)}</p>
      <InputGroup className="cartItem-input">
        <InputGroup.Text onClick={handleDecrement} type="button">
          -
        </InputGroup.Text>
        <FormControl min="1" onBlur={onlyNol} onChange={onlyNumber} value={kuantitas} className="text-center" />
        <InputGroup.Text onClick={handleIncrement} type="button">
          +
        </InputGroup.Text>
      </InputGroup>
      <button className="cartItem-delte" onClick={() => removeHandler(item.product)}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default memo(CartItem);
