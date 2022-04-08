import { Row, Col, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FormInput from './FormInput';
import AuthService from '../service/auth.service';
import './Register.css';
const Register = () => {
  const [showPassword, SetshowPassword] = useState(false);
  const [values, setValues] = useState({
    name: '',
    username: '',
    email: '',
    phone_number: '',
    password: '',
    // confirmpassword: '',
  });
  const navigate = useNavigate();

  const inputs = [
    {
      id: 1,
      name: 'name',
      type: 'text',
      placeholder: 'Nama',
      errorMessage: 'Nama harus terdiri dari 3-25 karakter dan tidak boleh menyertakan karakter khusus apa pun!',
      label: 'Nama',
      pattern: '^[A-Za-z0-9]{3,25}$',
      required: true,
    },
    {
      id: 2,
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      errorMessage: 'Nama pengguna harus terdiri dari 3-16 karakter dan tidak boleh menyertakan karakter khusus apa pun!',
      label: 'Username',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true,
    },
    {
      id: 3,
      name: 'email',
      type: 'text',
      placeholder: 'Email',
      errorMessage: 'Harus Menggunakan Email Yang Benar!',
      label: 'Email',
      required: true,
    },
    {
      id: 4,
      name: 'phone_number',
      type: 'text',
      placeholder: 'Nomor Phone',
      errorMessage: 'Isi nomor handphone minimal 10-12 karakter angka',
      label: 'Nomor Handphone',
      pattern: '^[0-9]{10,12}$',
      required: true,
      autoComplete: 'on',
    },
    {
      id: 5,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage: 'Kata sandi harus 8-20 karakter dan menyertakan setidaknya 1 huruf, 1 angka, dan 1 karakter khusus!',
      label: 'Password',
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
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
  // console.log(typeof password);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    try {
      await AuthService.signup(values.name, values.username, values.email, values.phone_number, values.password).then(
        (response) => {
          console.log(response);
          // check for token and user already exists with 200
          // console.log('Sign up successfully', response);
          navigate('/');
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err.response.data);
    }
    // console.log(values.password);
  };
  // console.log(values.confirmpassword);
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  // console.log(values);

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
          <div className="register-wrapper pt-5">
            <Row className="g-3 row-cols-1">
              <Col className="m-auto px-4">
                <Link className="back-wrapper " to="/login">
                  <h4 className="back-to p-2">
                    <i className="fa-solid fa-chevron-left"></i>
                    &ensp; Kembali
                  </h4>
                </Link>
              </Col>
              <Col className="mt-0">
                <div className="input-wrapper">
                  <div className="container-form w-100 p-3">
                    <Form onSubmit={handleSubmit}>
                      {inputs.map((input) => (
                        <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
                      ))}
                      <div>
                        <button className="Button-Login-Register">Submit</button>
                      </div>
                    </Form>
                  </div>
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
