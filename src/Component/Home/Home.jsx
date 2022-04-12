import './Home.css';
import { Badge } from '@mui/material';
import { Card, Col, Container, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsappOutlinedIcon from '@mui/icons-material/WhatsappOutlined';
import dataRatingsTerbaru from '../../dataRatingsTerbaru.json';
import dataRatingsTerpopuler from '../../dataRatingsTerpopuler.json';
import { useEffect, useState, memo, useCallback, useMemo, useRef } from 'react';
import { Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import Products from '../Products/Products';
import ProductDetail from '../Products/Product/Detail';
import { Blogs } from '../Blogs/Blogs';
import DetailArtikel from '../Blogs/Artikel/DetailArtikel';
import Login from '../Register/Login';
import Register from '../Register/Register';
import Cart from '../Cart/Cart';
import { useSelector } from 'react-redux';
import Checkout from '../Checkout/Checkout';
import AuthService from '../service/auth.service';

import axios from 'axios';
import Profile from '../Profile/Profile';
import Pesanan from '../Pesanan';
/* Bagian Kepala */
function compare(prevProps, nextProps) {
  // console.log(prevProps, nextProps);
  return prevProps.value === nextProps.value;
}
const InputSearch = memo(() => {
  console.log('Render Search');
  const [SearchText, setSearchText] = useState('');
  const handleInput = (e) => {
    setSearchText(e.target.value);
  };
  return <input value={SearchText} onChange={handleInput} type="text" className="navbar-input" placeholder="Ketik Pencarian..." />;
}, compare);
const Header = memo(() => {
  console.log('Render Header');
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  const logOut = () => {
    AuthService.logout();
    window.location.reload();
  };
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const getCartCount = () => {
    return cartItems.reduce((qty, item) => qty + item.qty, 0);
  };
  return (
    <header className="sticky-top">
      <nav>
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
                  <Link to="/blogs">BLOG</Link>
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
                // <Link className="navbar-menu" to="/login" onClick={logOut}>
                //   <div className="navbar-menu-item page-btn-register">LOGOUT</div>
                // </Link>
                <DropdownButton variant="warning" id="dropdown-basic-button" className="btn-profile" title={`Hi ${currentUser.user.name}`}>
                  <Dropdown.Item className="btn-profile-pemilik" as={Link} to="/profile">
                    PROFILE
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/pesanan">
                    PESANAN SAYA
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/login" onClick={logOut}>
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
      </nav>
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
  const [DataTerbaru, setDataTerbaru] = useState(dataRatingsTerbaru);
  const [DataPopuler, setDataPopuler] = useState(dataRatingsTerpopuler);
  console.log('Render Main');

  useEffect(() => {
    getRatings();

    axios
      .get(`https://dobha.herokuapp.com/api/product`)
      .then((res) => setDataTerbaru(res.data.data.product))
      .catch((err) => console.log(err));
  }, []);

  const getRatings = () => {
    const starsTotal = 5;
    // for (let rating = 0; rating < DataTerbaru.length; rating++) {
    //   const starPercentage = (DataTerbaru[rating].rate / starsTotal) * 100;
    //   const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    //   document.querySelector(`.${DataTerbaru[rating].slug} .stars-inner`).style.width = starPercentageRounded;
    //   document.querySelector(`.${DataTerbaru[rating].slug} .number-rating`).innerHTML = DataTerbaru[rating].rate;
    // }
    for (let rating = 0; rating < DataPopuler.length; rating++) {
      const starPercentage = (DataPopuler[rating].rate / starsTotal) * 100;
      const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
      document.querySelector(`.${DataPopuler[rating].slug} .stars-inner`).style.width = starPercentageRounded;
      document.querySelector(`.${DataPopuler[rating].slug} .number-rating`).innerHTML = DataPopuler[rating].rate;
    }
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
  return (
    <main>
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
                      <Card>
                        <Card.Img variant="top" src="/1.jpg" />
                        <Card.Body>
                          <Card.Title>{item.nama_produk}</Card.Title>
                          <Card.Text className="price">{formatRupiah(item.harga)}</Card.Text>
                          <div className="star-produk">
                            <div className="stars-outer">
                              <div className="stars-inner" style={{ width: countRate(item.rate) }}></div>
                            </div>
                            <span className="number-rating" dangerouslySetInnerHTML={{ __html: item.rate }}></span>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Container>
            <div className="btn-readmore">
              <a className="btn-item-readmore" href="#">
                Lihat Semua
              </a>
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
                        <Card>
                          <Card.Img variant="top" src="/1.jpg" />
                          <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text className="price">{item.price}</Card.Text>
                            <div className={item.slug}>
                              <div className="stars-outer">
                                <div className="stars-inner"></div>
                              </div>
                              <span className="number-rating"></span>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
              </Row>
            </Container>
            <div className="btn-readmore">
              <a className="btn-item-readmore" href="#">
                Lihat Semua
              </a>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="new-post-container">
          <div className="new-post-wrapper">
            <h1 className="title-label-section">
              <span>New Post</span>
            </h1>
            <Container className="new-post-product">
              <Row className="g-4  row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3">
                <Col>
                  <div className="card-new-post">
                    <div style={{ textAlign: 'center', padding: '30px' }}>
                      <img className="img-new-post" src="/1.jpg" />
                    </div>
                    <div className="body-new-post">
                      <h5>Kegunaan Parfum untuk Berbagai Acara</h5>
                      <p>
                        Parfum memiliki berbagai kegunaan yang jelas akan sangat dibutuhkan, terutama pada waktu-waktu tertentu. Yang terkesan formal. Namun apa saja minyak wangi yang cocok untuk berbagai acara tersebut dan apa kegunaannya?
                      </p>
                      <div className="btn-read-more">
                        <a href="#" className="btn-item-read-more">
                          Lihat Selengkapnya
                        </a>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="card-new-post">
                    <div style={{ textAlign: 'center', padding: '30px' }}>
                      <img className="img-new-post" src="/1.jpg" />
                    </div>
                    <div className="body-new-post">
                      <h5>Kegunaan Parfum untuk Berbagai Acara</h5>
                      <p>
                        Parfum memiliki berbagai kegunaan yang jelas akan sangat dibutuhkan, terutama pada waktu-waktu tertentu. Yang terkesan formal. Namun apa saja minyak wangi yang cocok untuk berbagai acara tersebut dan apa kegunaannya?
                      </p>
                      <div className="btn-read-more">
                        <a href="#" className="btn-item-read-more">
                          Lihat Selengkapnya
                        </a>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="card-new-post">
                    <div style={{ textAlign: 'center', padding: '30px' }}>
                      <img className="img-new-post" src="/1.jpg" />
                    </div>
                    <div className="body-new-post">
                      <h5>Kegunaan Parfum untuk Berbagai Acara</h5>
                      <p>
                        Parfum memiliki berbagai kegunaan yang jelas akan sangat dibutuhkan, terutama pada waktu-waktu tertentu. Yang terkesan formal. Namun apa saja minyak wangi yang cocok untuk berbagai acara tersebut dan apa kegunaannya?
                      </p>
                      <div className="btn-read-more">
                        <a href="#" className="btn-item-read-more">
                          Lihat Selengkapnya
                        </a>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </section>
    </main>
  );
}, compare);
/* Bagian Footer */
const Footer = memo(() => {
  console.log('Render Footer');
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
      <Header />
      {location.pathname !== '/login' &&
        location.pathname !== '/register' &&
        location.pathname !== '/checkout' &&
        location.pathname !== '/cart' &&
        location.pathname !== '/profile' &&
        location.pathname !== '/blogs' &&
        location.pathname !== '/pesanan' &&
        location.pathname !== `/products/${id}` &&
        location.pathname !== `/blogs/${id}` && <LogoBrand />}

      <div className="content-wrapper">
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/products/:id" element={<ProductDetail />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/blogs" element={<Blogs />} />
          <Route exact path="/blogs/:id" element={<DetailArtikel />} />
          <Route exact path="/pesanan" element={<Pesanan />} />
        </Routes>
      </div>
      {location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/cart' && <Footer />}
    </div>
  );
}
export default memo(Home);
