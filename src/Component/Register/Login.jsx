import { Row, Col, Form, Button } from 'react-bootstrap';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import AuthService from '../service/auth.service'; // -> mengambil data return fungsi login
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
        (response) => {
          navigate('/'); // -> me-redirect ke halaman utama || produk
          window.location.reload(); // -> memberikan efek memuat kembali browser window
          console.log(response);
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Terjadi Kesalahan ',
            html: '<p>Email dan Password tidak valid </p>' + `${error}`,
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Row className="body-login">
        {/* kiri */}
        <Col md={5} className="left-col">
          <div className="pembungkus-image-left">
            <Row>
              <img src="./letters-paperplanes-messages-by-oblik-studio.png" className="image-left" />
            </Row>
          </div>
        </Col>
        {/* kanan */}
        <Col md={7} className="right-col">
          <div className="login-wrapper pt-5">
            <Row className="g-3  row-cols-1">
              <Col className="m-auto px-4">
                <Link className="back-wrapper" to="/">
                  <h4 className="back-to  p-2">
                    <i className="fa-solid fa-chevron-left"></i>
                    &ensp; Kembali
                  </h4>
                </Link>
              </Col>
              <Col className="p-3">
                <div className="input-wrapper">
                  <div className="teks-Register w-100 px-3">
                    <Link to="/login">
                      <h1>Login</h1>
                    </Link>
                    &ensp; &ensp; &ensp;
                    <Link to="/register">
                      <h1>Register</h1>
                    </Link>
                  </div>
                  <div className="container-form w-100 p-3">
                    <Form onSubmit={handleLogin}>
                      <div className="input-text">
                        <p>Email:</p>
                        <input type="text" spellCheck="false" className="input-res" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukan Email" autoComplete="current-email" />
                      </div>
                      <div className="input-text">
                        <p>Password:</p>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          spellCheck="false"
                          className="from-control input-res"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Masukkan Password"
                          id="number"
                          autoComplete="current-password"
                        />
                        <button type="button" className="Button-show-password" onClick={() => SetshowPassword(!showPassword)}>
                          {showPassword ? <i className="fa-solid fa-eye-slash" /> : <i className="fa-solid fa-eye" />}
                        </button>
                      </div>
                      <div className="btn-p">
                        <Button type="submit" className="Button-Login p-3">
                          Log In
                        </Button>
                        <span className="text-password">
                          <Link className="text-decoration-none" to="/">
                            Lupa Password?
                          </Link>
                        </span>
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

export default Login;
