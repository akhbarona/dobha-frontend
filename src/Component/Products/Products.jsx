import axios from 'axios';
import './Products.css';
import { memo } from 'react';
import { useState, useEffect } from 'react';
import { Row, Card, Container, Col, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts as listProducts, getProdcutsPopular as listProductsPopular, resetPosts } from '../../redux/actions/ProductActions';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Pages from './Pages';

const Products = () => {
  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;
  // const [Products, setProducts] = useState([]);

  const getProdcutsPopular = useSelector((state) => state.getProductsPopular);
  const { productspopular, loadingPopular, errorPopular } = getProdcutsPopular;
  console.log(productspopular);
  // console.log(productspopular);
  const [SProducts, setSProducts] = useState('default');

  const [currentPage, setCurrentPage] = useState(1);
  const [sessionsPerPage, setSessionsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [SearchText, setSearchText] = useState('');
  useEffect(() => {
    // getProducts();

    // if (SearchText !== '') {
    //   dispatch(listProductsPopular(currentPage));
    // } else {
    //   dispatch(listProducts('', currentPage));
    //   dispatch(listProductsPopular(currentPage));
    // }

    //ketika pertama kali bener di buka

    dispatch(listProducts(SearchText, currentPage)); // <- tampilin data default
    dispatch(listProductsPopular(currentPage)); // <- tampilin data popular

    return () => {
      dispatch(resetPosts());
    };

    //ketika input berisi
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (products && products.meta) {
      // setTotalItems(products.meta.total);
      // setSessionsPerPage(products.meta.per_page);
      setCurrentPage(products.meta.current_page);
    }
    if (productspopular && productspopular.meta) {
      // setTotalItems(productspopular.meta.total);
      // setSessionsPerPage(productspopular.meta.per_page);
      setCurrentPage(productspopular.meta.current_page);
    }
  }, [products, productspopular]);

  // useEffect(() => {
  //   if (products && products.meta) {
  //     // setTotalItems(products.meta.total);
  //     // setSessionsPerPage(products.meta.per_page);
  //     setCurrentPage(products.meta.current_page);
  //   }
  // }, [products]);

  // useEffect(() => {
  //   if (productspopular && productspopular.data) {
  //     // setTotalItems(productspopular.total);
  //     // setSessionsPerPage(productspopular.per_page);
  //     setCurrentPage(productspopular.current_page);
  //   }
  // }, [productspopular]);

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
  const countRate = (rate) => {
    const starsTotal = 5;
    const starPercentage = (rate / starsTotal) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    return starPercentageRounded;
  };
  const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(money);
  };

  const handleInput = (e) => {
    if (e.target.value === '') {
      setSearchText('');
    } else {
      setSearchText(e.target.value);
    }
  };
  const handleEnterKeyPressed = (e) => {
    if (e.key === 'Enter') {
      // onSearch(searchText); // <- ambil di action redux
      // setCurrentPage(1);

      setSProducts('default');

      dispatch(listProducts(SearchText, currentPage));
    }
  };
  return (
    <main>
      <section>
        <div className="products-container">
          <Container>
            {/* {Loading ? getRatings() : null} */}
            <div className="d-flex justify-content-between">
              <div className="navbar-search-container w-25">
                <SearchIcon style={{ color: 'gray', fontSize: 25 }} /> <input onKeyPress={handleEnterKeyPressed} value={SearchText} onChange={handleInput} type="text" className="navbar-input" placeholder="Ketik Pencarian..." />;
              </div>
              <div className="combo-box-wrapper">
                <select
                  className="p-2"
                  value={SProducts}
                  onChange={(e) => {
                    if (e.target.value === 'default') {
                      setSProducts(e.target.value);
                      dispatch(listProducts('', 1));
                    }
                    if (e.target.value === 'teratas') {
                      setSProducts(e.target.value);
                      dispatch(listProductsPopular(1));
                    }
                  }}
                >
                  <option value="default">Sortir: Default</option>
                  <option value="teratas">Teratas</option>
                </select>
              </div>
            </div>
          </Container>
          <div className="products-wrapper">
            <Container>
              {SProducts === 'default' ? (
                <>
                  {loading || loading === undefined ? (
                    <div className="loading">
                      <Spinner animation="border" variant="warning" role="status" className="m-auto">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  ) : error ? (
                    <div className="alert alert-danger" role="alert">
                      {error}{' '}
                    </div>
                  ) : products.meta && products.meta.total !== 0 ? (
                    <Row className="g-4 row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-5">
                      {products &&
                        products.data.map((item, index) => {
                          return (
                            <Col key={index}>
                              <Link className="link-title" to={`/products/${item.slug_produk}`}>
                                <Card className="card-center h-100">
                                  {/* {Products && <img src={'/' + Products.[0]} alt="" />} */}

                                  <Card.Img
                                    variant="top"
                                    style={{ minHeight: '293px' }}
                                    className="h-100"
                                    src={isImage(item.gambar_produk) ? item.gambar_produk : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'}
                                  />

                                  <Card.Body>
                                    <Card.Title>{handleLength(item.nama_produk, 20)}</Card.Title>
                                    <Card.Text className="price">{formatRupiah(item.harga_satuan)}</Card.Text>
                                    <div className={item.slug}>
                                      <div className="stars-outer">
                                        <div className="stars-inner" style={{ width: countRate(item.rating_produk) }}></div>
                                      </div>
                                      <span className="number-rating">{item.rating_produk !== null ? parseFloat(item.rating_produk).toFixed(1) : 0}</span>
                                    </div>
                                  </Card.Body>
                                </Card>
                              </Link>
                            </Col>
                          );
                        })}
                    </Row>
                  ) : (
                    <h2 className="text-white text-center p-3">Produk Tidak Ditemukan</h2>
                  )}
                  {products.meta && products.meta.total !== 0 ? (
                    <div className="d-flex justify-content-center mt-5">
                      <Pages itemsCount={products.meta.total} itemsPerPage={products.meta.per_page} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                  ) : undefined}
                </>
              ) : SProducts === 'teratas' ? (
                <>
                  {loadingPopular ? (
                    <div className="loading">
                      <Spinner animation="border" variant="warning" role="status" className="m-auto">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  ) : errorPopular ? (
                    <div className="alert alert-danger" role="alert">
                      {error}{' '}
                    </div>
                  ) : (
                    <Row className="g-4 row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-5">
                      {productspopular &&
                        productspopular.data.map((item, index) => {
                          console.log(item);
                          return (
                            <Col key={index}>
                              <Link className="link-title" to={`/products/${item.slug_produk}`}>
                                <Card className="card-center h-100">
                                  {/* {Products && <img src={'/' + Products.[0]} alt="" />} */}
                                  <Card.Img
                                    variant="top"
                                    style={{ minHeight: '293px' }}
                                    className="h-100"
                                    src={isImage(item.gambar_produk) ? item.gambar_produk : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'}
                                  />
                                  <Card.Body>
                                    <Card.Title>{handleLength(item.nama_produk, 20)}</Card.Title>
                                    <Card.Text className="price">{formatRupiah(item.harga_satuan)}</Card.Text>
                                    <div className={item.slug}>
                                      <div className="stars-outer">
                                        <div className="stars-inner" style={{ width: countRate(item.rating_produk) }}></div>
                                      </div>
                                      <span className="number-rating">{item.rating_produk !== null ? parseFloat(item.rating_produk).toFixed(1) : 0}</span>
                                    </div>
                                  </Card.Body>
                                </Card>
                              </Link>
                            </Col>
                          );
                        })}
                    </Row>
                  )}
                  {productspopular && productspopular.meta ? (
                    <div className="d-flex justify-content-center mt-5">
                      <Pages itemsCount={productspopular.meta.total} itemsPerPage={productspopular.meta.per_page} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                  ) : undefined}
                </>
              ) : undefined}
            </Container>
          </div>
        </div>
      </section>
    </main>
  );
};

export default memo(Products);
