import axios from 'axios';
import './Products.css';
import { memo } from 'react';
import { useState, useEffect } from 'react';
import { Row, Card, Container, Col, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts as listProducts, getProdcutsPopular as listProductsPopular } from '../../redux/actions/ProductActions';
import { Link } from 'react-router-dom';
import Pages from './Pages';
const Products = () => {
  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;
  // const [Products, setProducts] = useState([]);

  const getProdcutsPopular = useSelector((state) => state.getProductsPopular);
  const { productspopular, loadingPopular, errorPopular } = getProdcutsPopular;
  console.log(productspopular);
  const [SProducts, setSProducts] = useState('default');

  const [currentPage, setCurrentPage] = useState(1);
  const [sessionsPerPage, setSessionsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    // getProducts();

    dispatch(listProducts(currentPage));

    dispatch(listProductsPopular(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (products && products.meta) {
      setTotalItems(products.meta.total);
      setSessionsPerPage(products.meta.per_page);
      setCurrentPage(products.meta.current_page);
    }

    if (productspopular && productspopular.data) {
      setTotalItems(productspopular.total);
      setSessionsPerPage(productspopular.per_page);
      setCurrentPage(productspopular.current_page);
    }
  }, [products, productspopular]);

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
  return (
    <main>
      <section>
        <div className="products-container">
          <Container>
            {/* {Loading ? getRatings() : null} */}
            <Row>
              <div className="combo-box-wrapper">
                <select
                  className="p-2"
                  onChange={(e) => {
                    setSProducts(e.target.value);
                  }}
                >
                  <option value="default">Sortir: Default</option>
                  <option value="teratas">Teratas</option>
                </select>
              </div>
            </Row>
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
                  ) : (
                    <Row className="g-4 row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-5">
                      {products.data.map((item, index) => {
                        return (
                          <Col key={index}>
                            <Link className="link-title" to={`/products/${item.slug_produk}`}>
                              <Card className="card-center h-100">
                                {/* {Products && <img src={'/' + Products.[0]} alt="" />} */}
                                <Card.Img
                                  variant="top"
                                  className="h-75"
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
                  <div className="d-flex justify-content-center mt-5">
                    <Pages itemsCount={totalItems} itemsPerPage={sessionsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                  </div>
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
                          return (
                            <Col key={index}>
                              <Link className="link-title" to={`/products/${item.slug_produk}`}>
                                <Card className="card-center h-100">
                                  {/* {Products && <img src={'/' + Products.[0]} alt="" />} */}
                                  <Card.Img
                                    variant="top"
                                    className="h-75"
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
                  <div className="d-flex justify-content-center mt-5">
                    <Pages itemsCount={totalItems} itemsPerPage={sessionsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                  </div>
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
