import { Row, Col, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FormInput from './FormInput';
import AuthService from '../service/auth.service';
import './Register.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector, useDispatch } from 'react-redux';
import { createNewUser } from '../../redux/actions/authActions';

const Register = () => {
  const [showPassword, SetshowPassword] = useState(false);
  const dispatch = useDispatch();
  const AddUser = useSelector((state) => state.authUser);
  const { isRegistrasi } = AddUser;
  const [values, setValues] = useState({
    name: '',
    username: '',
    email: '',
    phone_number: '',
    password: '',
    // confirmpassword: '',
  });
  const navigate = useNavigate();
  const [getUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  useEffect(() => {
    if (isRegistrasi) {
      navigate('/login');
    }
    if (getUser) {
      navigate('/');
    }
  }, [isRegistrasi, getUser]);

  const inputs = [
    {
      id: 1,
      name: 'name',
      type: 'text',
      placeholder: 'Nama',
      errorMessage: 'Nama harus terdiri dari 3-25 huruf kombinasi abjad besar dan kecil',
      label: 'Nama',
      pattern: '^[A-Za-z]{3,25}$',
      required: true,
    },
    {
      id: 2,
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      errorMessage: 'Username harus terdiri dari 3-25 karakter, huruf pertama abjad kombinasi angka atau garis bawah',
      label: 'Username',
      pattern: '^[A-Za-z][A-Za-z0-9_]{2,25}$',
      required: true,
    },
    {
      id: 3,
      name: 'email',
      type: 'email',
      placeholder: 'E-mail',
      errorMessage: 'E-mail harus menggunakan format yang valid',
      label: 'E-mail',
      required: true,
    },
    {
      id: 4,
      name: 'phone_number',
      type: 'tel',
      placeholder: 'Nomor Handphone',
      errorMessage: 'Nomor handphone minimal 10-12 karakter angka',
      label: 'Nomor Handphone',
      pattern: '^[0-9]{10,12}$',
      required: true,
      autoComplete: 'on',
    },
    {
      id: 5,
      name: 'password',
      type: `${showPassword ? 'text' : 'password'}`,
      placeholder: 'Password',
      errorMessage: 'Kata sandi wajib 8-20 karakter dengan menyertakan setidaknya 1 huruf, 1 angka, dan 1 karakter khusus!',
      label: 'Password',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
      autoComplete: 'current-password',
    },
    // {
    //   id: 5,
    //   name: 'confirmpassword',
    //   type: 'password',
    //   placeholder: 'Confirm Password',
    //   errorMessage: 'Konfirmasi password harus sama dengan kolom password!',
    //   label: 'Confirm Password',
    //   pattern: values.password,
    //   required: true,
    //   autoComplete: 'current-password',
    // },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: values.name,
      username: values.username,
      email: values.email,
      phone_number: values.phone_number,
      password: values.password,
    };

    dispatch(createNewUser(data));
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Row className="body-register">
        <Col md={5} className="left-col">
          <div className="pembungkus-image-left">
            <Row>
              <img src="./letters-paperplanes-messages-by-oblik-studio.png" className="image-left" />
            </Row>
          </div>
        </Col>
        <Col md={7}>
          <div className="register-wrapper ">
            <Row className="g-3 row-cols-1 pt-5 w-100">
              <Col className="m-auto px-4">
                <Link className="back-wrapper" to="/login">
                  <h4 className="back-to p-2">Kembali</h4>
                </Link>
              </Col>

              <Col className="mt-0">
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable={false} pauseOnHover />

                <div className="container-form w-100 p-3 d-flex justify-content-center">
                  <Form onSubmit={handleSubmit} className="w-100">
                    {inputs.map((input) => (
                      <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} showPassword={showPassword} SetshowPassword={SetshowPassword} />
                    ))}

                    <div className="btn-readmore">
                      <button type="submit" className="btn-item-readmore text-decoration-none">
                        BUAT AKUN
                      </button>
                    </div>
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Register;
