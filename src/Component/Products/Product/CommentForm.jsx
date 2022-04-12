import { Button, Form, Spinner } from 'react-bootstrap';
import { useState, memo } from 'react';
import { toast } from 'react-toastify';
const CommentForm = ({ handleSubmit, submitLabel, hasCancelButton = false, handleCancel, initialText = '', currentValue, currentUserId, currentUsername, currentName }) => {
  const [text, setText] = useState(initialText);
  const [bintang, setbintang] = useState(currentValue);
  // console.log(typeof currentUsername);
  // console.log(bintang);
  // console.log(currentUserId);
  // const [textReviwesValue, setTextReviews] = useState('');
  const [hoverValue, setHoverValue] = useState(undefined);
  // const [loading, setLoading] = useState(false);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (bintang !== 0) {
      // setLoading(true);
      if (submitLabel === 'Write') {
        handleSubmit(text, bintang, null, currentName, currentUsername);
      } else if (submitLabel === 'Update') {
        handleSubmit(text, bintang);
      } else if (submitLabel === 'Reply') {
        // const username = 'Admin';
        handleSubmit(text, null, null, currentName, currentUsername);
      }
      // const data = {
      //   id_user: 1,
      //   rate: currentValue,
      //   text: textReviwesValue,
      // };
      // console.log(data);
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
      {currentUserId === 1 ? undefined : (
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
      )}

      <Form onSubmit={onSubmit}>
        <textarea className="comment-form-textarea" value={text} onChange={(e) => setText(e.target.value)} />
        <Button type="submit" className="comment-form-button" disabled={isTextareaDisabled}>
          {submitLabel}
        </Button>
        {hasCancelButton && (
          <Button type="button" className="comment-form-button comment-form-cancel-button" onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </Form>
    </>
  );
};

export default memo(CommentForm);
