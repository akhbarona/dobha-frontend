import { Row, Col, Container, Form } from 'react-bootstrap';
import './Login.css';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthService from '../service/auth.service';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, SetshowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password).then(
        (res) => {
          navigate('/');
          window.location.reload();
          console.log(res.token);
        },
        (error) => {
          Swal.fire(
            'Oops...',
            error.response.statusText,
            'error'
          )
          console.log(error.response);
        }
      );
    } catch (err) {

     
      console.log(err);
    }
  };
  return (
    <div className="body">
      {' '}
      <>
        <Row className="body-register">
          {/* kiri */}
          <Col md={5} className="left-col">
            <div className="pembungkus-image-left">
              <img src="./letters-paperplanes-messages-by-oblik-studio.png" className="image-left" />
            </div>
          </Col>
          {/* kanan */}
          <Col md={7} className="right-col">
            <div className="login-wrapper">
              <Row>
                <Link className="back-wrapper" to="/">
                  <h4 className="back-to  p-2">
                    <i className="fa-solid fa-chevron-left"></i>
                    &ensp; Kembali
                  </h4>
                </Link>
                <div className="input-wrapper">
                  <div className="teks-Register">
                    <Link to="/login">
                      <h1>Login</h1>
                    </Link>
                    &ensp; &ensp; &ensp;
                    <Link to="/register">
                      <h1>Register</h1>
                    </Link>
                  </div>
                  <Form onSubmit={handleLogin}>
                    <div className="input-text">
                      <p>Masukan Email:</p>
                      <input type="text" className="input-res" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" autoComplete="current-email" />
                    </div>
                    <div className="input-text">
                      <p>Masukkan Password:</p>
                      <input type={showPassword ? 'text' : 'password'} className="from-control input-res" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" id="number" autoComplete="current-password" />
                      <button className="Button-show-password" onClick={() => SetshowPassword(!showPassword)}>
                        {showPassword ? <i className="fa-solid fa-eye-slash" /> : <i className="fa-solid fa-eye" />}
                      </button>
                    </div>
                    <div className="btn-p">
                      <Button type="submit" className="Button-Login">
                        Log In
                      </Button>
                      <p>
                        <a href="/">Lupa Password?</a>
                      </p>
                    </div>
                  </Form>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </>
    </div>
  );
};

export default Login;
