import { Row, Col, Form, Button } from 'react-bootstrap';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, SetshowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const LoginUser = useSelector((state) => state.authUser);
  const { isSuccess } = LoginUser;
  const [getUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  console.log(getUser);
  useEffect(() => {
    if (isSuccess) {
      setEmail('');
      setPassword('');
      navigate('/');
    }
    if (getUser) {
      navigate('/');
    }
  }, [isSuccess, getUser]);
  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    dispatch(loginUser(data));
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
        <Col md={7}>
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable={false} pauseOnHover />
          <div className="login-wrapper ">
            <Row className="g-3  row-cols-1 pt-5 w-100">
              <Col className="m-auto px-4">
                <Link className="back-wrapper" to="/">
                  <h4 className="back-to  p-2">Kembali</h4>
                </Link>
              </Col>
              <Col className="mt-0">
                <div className="w-100 p-3">
                  <span className="text-white">Belum memiliki akun ? silahkan </span>
                  <Link className="btn-daftar" to="/register">
                    DAFTAR
                  </Link>
                </div>
                <div className="container-form w-100 p-3 d-flex justify-content-center">
                  <Form onSubmit={handleLogin} className="w-100">
                    <div className="input-text">
                      <label>Email</label>
                      <input type="email" name="email" className="from-control input-res" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukan Email" autoComplete="email" required />
                    </div>
                    <div className="input-text">
                      <label>Password:</label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="from-control input-res"
                        value={password}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Masukkan Password"
                        autoComplete="current-password"
                        required
                      />
                      <button type="button" className="Button-show-password" onClick={() => SetshowPassword(!showPassword)}>
                        {showPassword ? <i className="fa-solid fa-eye-slash icon-fa" /> : <i className="fa-solid fa-eye icon-fa" />}
                      </button>
                    </div>
                    <div className="btn-readmore">
                      <button type="submit" className="btn-item-readmore text-decoration-none">
                        MASUK
                      </button>
                      <span className="text-password">
                        <Link className="text-decoration-none" to="/">
                          Lupa Password?
                        </Link>
                      </span>
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

export default Login;
