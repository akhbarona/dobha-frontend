import './Home.css';
import { Badge } from '@mui/material';
import { Card, Col, Container, Dropdown, DropdownButton, Row, Navbar, Nav, Spinner } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsappOutlinedIcon from '@mui/icons-material/WhatsappOutlined';
import { useEffect, useState, memo, useCallback, useMemo, useRef } from 'react';
import { Routes, Route, Link, useLocation, useParams, useNavigate, Navigate, NavLink } from 'react-router-dom';
import Products from '../Products/Products';
import ProductDetail from '../Products/Product/Detail';
import { Blogs } from '../Blogs/Blogs';
import DetailArtikel from '../Blogs/Artikel/DetailArtikel';
import Login from '../Register/Login';
import Register from '../Register/Register';
import Cart from '../Cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import Checkout from '../Checkout/Checkout';
import AuthService from '../service/auth.service';
import axios from 'axios';
import Profile from '../Profile/Profile';
import Pesanan from '../Pesanan';
// import Pesanansaya from '../Profile/Pesanansaya';

import { logoutUser } from '../../redux/actions/authActions';
import PageNotFound from './PageNotFound';
import getCookie from '../../hooks/getCookie';

import { getAddress as listAddress } from '../../redux/actions/addressActions';
/* Bagian Kepala */
function compare(prevProps, nextProps) {
  return prevProps.value === nextProps.value;
}
// const InputSearch = memo(() => {
//   // console.log('Render Search');
//   const [SearchText, setSearchText] = useState('');
//   const handleInput = (e) => {
//     setSearchText(e.target.value);
//   };
//   return <input value={SearchText} onChange={handleInput} type="text" className="navbar-input" placeholder="Ketik Pencarian..." />;
// }, compare);

const Header = memo(() => {
  // console.log('Render Header');

  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  const outUser = useSelector((state) => state.authUser);
  const { isLogout } = outUser;
  const navigate = useNavigate();
  const getAdress = useSelector((state) => state.getAdress);
  const { address, loading, error } = getAdress.address;

  console.log(address);

  useEffect(() => {
    // const getTime = getCookie('expiredtime');
    const user = AuthService.getCurrentUser();
    // console.log(user);
    if (user && user.id) {
      setCurrentUser(user);
      dispatch(listAddress(user.id));
    }
    // console.log(user);

    // AuthService.runLogoutTimer(dispatch, Number(getTime));

    if (isLogout) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }, [isLogout]);

  const logOut = () => {
    dispatch(logoutUser());
  };
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const getCartCount = () => {
    return cartItems.reduce((qty, item) => qty + item.qty, 0);
  };
  return (
    <header className="sticky-top">
      {/* <nav>
        <div className="navbar-container">
          <div className="navbar-wrapper">
            <div className="navbar-left">
              <ul className="navbar-menu-core">
                <li>
                  <Link to="/">HOME</Link>
                </li>
                <li>
                  <Link to="/products">PRODUK</Link>
                </li>
                <li>
                  <Link to="/article">ARTIKEL</Link>
                </li>
              </ul>
            </div>
            <div className="navbar-center">
              <div className="navbar-search-container">
                <SearchIcon style={{ color: 'gray', fontSize: 25 }} /> <InputSearch />
              </div>
            </div>
            <div className="navbar-right">
              {currentUser && (
                <div className="navbar-menu-item">
                  <Link to="/cart">
                    <Badge badgeContent={getCartCount()} color="primary">
                      <div className="cart-filled">
                        <ShoppingCartOutlined style={{ color: 'black' }} />
                      </div>
                    </Badge>
                  </Link>
                </div>
              )}
              {currentUser ? (
                <DropdownButton variant="warning" id="dropdown-basic-button" className="btn-profile" title={`Hi ${currentUser.name}`}>
                  <Dropdown.Item className="btn-profile-pemilik" as={Link} to="/profile">
                    PROFILE
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/pesanan">
                    PESANAN SAYA
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="#" onClick={logOut}>
                    LOGOUT
                  </Dropdown.Item>
                </DropdownButton>
              ) : (
                <>
                  <Link className="navbar-menu" to="/login">
                    <div className="navbar-menu-item page-btn-login">LOGIN</div>
                  </Link>
                  <Link className="navbar-menu" to="/register">
                    <div className="navbar-menu-item page-btn-register">REGISTER</div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav> */}
      <Navbar style={{ backgroundColor: '#202744' }} expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse style={{ padding: '10px 20px', backgroundColor: '#202744' }} id="basic-navbar-nav">
          <Nav className="container-fluid">
            <Nav.Item>
              <Nav.Link style={{ color: '#fff', fontWeight: '600' }} as={Link} to="/">
                HOME
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link style={{ color: '#fff', fontWeight: '600' }} as={Link} to="/products">
                PRODUK
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link style={{ color: '#fff', fontWeight: '600' }} as={Link} to="/article">
                ARTIKEL
              </Nav.Link>
            </Nav.Item>
          </Nav>
          {currentUser && (
            <Nav.Item className="ml-auto">
              <div className="navbar-menu-item">
                <Link to="/cart">
                  <Badge badgeContent={getCartCount()} color="primary">
                    <div className="cart-filled">
                      <ShoppingCartOutlined style={{ color: 'black' }} />
                    </div>
                  </Badge>
                </Link>
              </div>
            </Nav.Item>
          )}
          {currentUser ? (
            <Nav.Item>
              <DropdownButton variant="warning" id="dropdown-basic-button" className="btn-profile" title={`Hi ${address.data ? address.data.name : 'Loading...'}`}>
                <Dropdown.Item as={NavLink} to="/profile">
                  PROFILE
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/pesanan">
                  PESANAN SAYA
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="#" onClick={logOut}>
                  LOGOUT
                </Dropdown.Item>
              </DropdownButton>
            </Nav.Item>
          ) : (
            <>
              <Link className="navbar-menu" to="/login">
                <div className="navbar-menu-item page-btn-login">LOGIN</div>
              </Link>
              <Link className="navbar-menu" to="/register">
                <div className="navbar-menu-item page-btn-register">REGISTER</div>
              </Link>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
});
/* Bagian Logo Brand */
const LogoBrand = () => {
  return (
    <section>
      <div className="logo-container">
        <div className="logo-wrapper">
          <img src="/dobha.jpg" width="25%" />
          <h1>Dobha Parfume Non Alkohol</h1>
        </div>
      </div>
    </section>
  );
};
/* Bagian Main Content */
const Main = memo(() => {
  const [DataTerbaru, setDataTerbaru] = useState([]); // -> berisi data-data produk terbaru
  const [DataPopuler, setDataPopuler] = useState([]); // -> berisi data-data produk terpopuler
  const [DataArtikel, setDataArtikelTerbaru] = useState([]); // -> berisi data post terbaru
  // console.log('Render Main');

  useEffect(() => {
    const controller = new AbortController();

    getNPA(controller);

    return () => controller.abort();
  }, []);

  const getNPA = (controller) => {
    axios
      .all([axios.get(`https://dobha.herokuapp.com/api/newest-products`), axios.get(`https://dobha.herokuapp.com/api/popular-products`), axios.get(`https://dobha.herokuapp.com/api/newest-articles`)], {
        signal: controller.signal,
      })
      .then(
        axios.spread((new_products, popular_products, new_articles) => {
          setDataTerbaru(new_products.data.data);
          setDataPopuler(popular_products.data.data);
          setDataArtikelTerbaru(new_articles.data.data);
          // console.log('produk baru', new_products, 'popular', popular_products, 'artikel baru', new_articles);
        })
      )
      .catch((err) => {
        console.log(err.message);
      });
  };

  const countRate = (rate) => {
    const starsTotal = 5;
    const starPercentage = (rate / starsTotal) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    return starPercentageRounded;
  };
  const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(money);
  };
  function handleLength(value, lengths) {
    if (value.length < lengths) {
      return value;
    } else {
      return value.substring(0, lengths).substring(0, value.substring(0, lengths).lastIndexOf(' ')) + '...';
    }
  }
  function isImage(url) {
    const regex = /https:\/\/drive\.google\.com/g;
    return regex.test(url);
  }
  return (
    <>
      <section>
        <div className="new-product-container">
          <div className="new-product-wrapper">
            <h1 className="title-label-section">
              <span>Produk Terbaru</span>
            </h1>
            <Container className="content-new-product">
              <Row className="g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
                {DataTerbaru.map((item, index) => {
                  return (
                    <Col key={index}>
                      <Link className="text-decoration-none text-dark" to={`/products/${item.slug_produk}`}>
                        <Card className="h-100">
                          <Card.Img
                            className="image-top"
                            variant="top"
                            src={isImage(item.gambar_produk) ? item.gambar_produk : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'}
                          />
                          <Card.Body>
                            <Card.Title>{item.nama_produk}</Card.Title>
                            <Card.Text className="price">{formatRupiah(item.harga_satuan)}</Card.Text>
                            <div className="star-produk">
                              <div className="stars-outer">
                                <div className="stars-inner" style={{ width: countRate(item.rating_produk) }}></div>
                              </div>
                              <span className="number-rating">{parseFloat(item.rating_produk).toFixed(1)}</span>
                            </div>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  );
                })}
              </Row>
            </Container>
            <div className="btn-readmore">
              <Link className="btn-item-readmore text-decoration-none" to="/products">
                Lihat Semua
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="top-product-container">
          <div className="top-product-wrapper">
            <h1 className="title-label-section">
              <span>Produk Terpopuler</span>
            </h1>
            <Container className="content-top-product">
              <Row className="g-4 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4">
                {DataPopuler &&
                  DataPopuler.map((item, index) => {
                    return (
                      <Col key={index}>
                        <Link className="text-decoration-none text-dark" to={`/products/${item.slug_produk}`}>
                          <Card className="h-100">
                            <Card.Img
                              className="image-top"
                              variant="top"
                              src={isImage(item.gambar_produk) ? item.gambar_produk : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'}
                              alt="gambar-produk"
                            />
                            <Card.Body>
                              <Card.Title>{item.nama_produk}</Card.Title>
                              <Card.Text className="price">{formatRupiah(item.harga_satuan)}</Card.Text>
                              <div className="star-produk">
                                <div className="stars-outer">
                                  <div className="stars-inner" style={{ width: countRate(item.rating_produk) }}></div>
                                </div>
                                <span className="number-rating">{parseFloat(item.rating_produk).toFixed(1)}</span>
                              </div>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                    );
                  })}
              </Row>
            </Container>
            <div className="btn-readmore">
              <Link className="btn-item-readmore text-decoration-none" to="/products">
                Lihat Semua
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="new-post-container">
          <div className="new-post-wrapper">
            <h1 className="title-label-section">
              <span>Artikel Terbaru</span>
            </h1>
            <Container className="new-post-product">
              <Row className="g-4  row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3">
                {DataArtikel.map((item, index) => {
                  return (
                    <Col key={index}>
                      <div className="card-new-post" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ textAlign: 'center', padding: '30px' }}>
                          <img className="img-new-post" src={isImage(item.image) ? item.image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'} />
                        </div>
                        <div className="body-new-post" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                          <div>
                            <h5>{handleLength(item.title, 37)}</h5> {/*-> 37 karakter */}
                            <p
                              dangerouslySetInnerHTML={{
                                __html: `${item.excerpt}`,
                              }}
                            ></p>
                            {/* 216 karakter */}
                          </div>
                          <div className="btn-read-more">
                            <Link to={`/article/${item.slug}`} className="btn-item-read-more text-decoration-none">
                              Lihat Selengkapnya
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </div>
        </div>
      </section>
    </>
  );
}, compare);
/* Bagian Footer */
const Footer = memo(() => {
  // console.log('Render Footer');
  return (
    <footer>
      <div className="footer-container">
        <Container className="footer-wrapper">
          <Row>
            <div className="footer-meta-info">
              <h2>Dobha Parfume Non Alkohol</h2>
              <ul className="nobull">
                <li>
                  <p>Jl.Gatot Subroto No.79 Garuntang. Bandar Lampung</p>
                </li>
                <li>
                  <p>081234567890</p>
                </li>
                <li>
                  <p>email@email.com</p>
                </li>
              </ul>
            </div>
          </Row>
          <div className="footer-icon">
            <span>
              <WhatsappOutlinedIcon style={{ fontSize: 30 }} />
            </span>
            <span>
              <InstagramIcon style={{ fontSize: 30 }} />
            </span>
          </div>
        </Container>
        <div className="footer-copyright">
          <span>Copyright &copy; 2022. Berkah Startup</span>
        </div>
      </div>
    </footer>
  );
});

function Home() {
  let location = useLocation();
  let id = location.pathname.split('/').pop();

  return (
    <div className="main-home-wrapper">
      {location.pathname !== '/login' && location.pathname !== '/register' && <Header />}
      {location.pathname !== '/login' &&
        location.pathname !== '/register' &&
        location.pathname !== '/pagenotfound' &&
        location.pathname !== '/checkout' &&
        location.pathname !== '/pesanansaya' &&
        location.pathname !== '/cart' &&
        location.pathname !== '/profile' &&
        location.pathname !== '/article' &&
        location.pathname !== '/pesanan' &&
        location.pathname !== `/products/${id}` &&
        location.pathname !== `/article/${id}` && <LogoBrand />}

      <div className="content-wrapper">
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/login" element={<Login />} />

          <Route exact path="/register" element={<Register />} />

          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/profile" element={<Profile />} />
          {/* <Route exact path="/pesanansaya" element={<Pesanansaya />} /> */}
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/products/:id" element={<ProductDetail />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/article" element={<Blogs />} />
          <Route exact path="/article/:id" element={<DetailArtikel />} />
          {/* ubah yudi */}
          <Route exact path="/pesanan" element={<Pesanan />} />
          <Route path="/pagenotfound" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/pagenotfound" />} />
        </Routes>
      </div>
      {location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/cart' && <Footer />}
    </div>
  );
}
export default memo(Home);
