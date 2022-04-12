import { memo } from 'react';
import './Confirm.css';
const Confirm = (props) => {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <i className="fa-solid fa-arrow-left close-btn" onClick={() => props.setTrigger(false)}></i>

        {props.children}
      </div>
    </div>
  ) : (
    ''
  );
};

export default memo(Confirm);
