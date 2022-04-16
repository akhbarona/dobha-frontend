import { useState } from 'react';

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, showPassword, SetshowPassword, ...inputProps } = props;
  // console.log({ ...inputProps });
  const handleFocus = (e) => {
    setFocused(true);

    if (label === 'Username') {
      e.target.value = e.target.value.toLowerCase();
    }

    if (label === 'E-mail') {
      e.target.value = e.target.value.toLowerCase();
    }
  };

  return (
    <div className="formInput">
      <label>{label}</label>
      <input {...inputProps} onChange={onChange} onBlur={handleFocus} onFocus={() => inputProps.name === 'confirmpassword' && setFocused(true)} focused={focused.toString()} className="from-control" />
      {label === 'Password' ? (
        <button type="button" data-toggle="tooltip" data-placement="top" title={showPassword ? 'Sembunyikan sandi' : 'Perlihatkan sandi'} className="Button-show-password" onClick={() => SetshowPassword(!showPassword)}>
          {showPassword ? <i className="fa-solid fa-eye-slash icon-fa" /> : <i className="fa-solid fa-eye icon-fa" />}
        </button>
      ) : null}
      <span className="error-pesan">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
