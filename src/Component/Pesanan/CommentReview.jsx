import { Button, Form } from 'react-bootstrap';
import { useState, memo } from 'react';
import './CommentReview.css';
import { toast } from 'react-toastify';

import axios from 'axios';
import authHeader from '../service/auth.header';
import Swal from 'sweetalert2';

const CommentReview = ({ currentUserId, product_id, setModalShow }) => {
  console.log(currentUserId);
  console.log(product_id);
  const [text, setText] = useState('');
  const [bintang, setbintang] = useState(0);

  const [hoverValue, setHoverValue] = useState(undefined);

  const isTextareaDisabled = text.length === 0;

  const addComment = (text, bintang = null) => {
    console.log(text);
    console.log(bintang);
    const data = {
      body: text,
      rate: bintang,
    };
    axios
      .post(`https://dobha.herokuapp.com/api/product/review-product/${product_id}/${currentUserId}`, data, {
        headers: authHeader(),
      })
      .then((comment) => {
        console.log(comment);
        Swal.fire({ title: 'Terima Kasih Review Anda!', icon: 'success', showConfirmButton: false });
        setModalShow(false);
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (bintang !== 0) {
      addComment(text, bintang);
      setText('');
    } else {
      toast.error('Error Notification !', {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    if (value === bintang) {
      setbintang(value - 1);
    } else {
      setbintang(value);
    }
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <>
      <div className="stars">
        {stars.map((_, index) => {
          return (
            <i
              key={index}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              style={{
                marginRight: 10,
                cursor: 'pointer',
                fontSize: '2rem',
                color: (hoverValue || bintang) > index ? '#FFBA5A' : '#a9a9a9',
              }}
              className="fa-solid fa-star"
            />
          );
        })}
        <span className="rating">{bintang}</span>
      </div>

      <Form onSubmit={onSubmit}>
        <textarea className="comment-form-textarea" value={text} onChange={(e) => setText(e.target.value)} />
        <Button type="submit" className="comment-form-button" disabled={isTextareaDisabled}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default memo(CommentReview);
