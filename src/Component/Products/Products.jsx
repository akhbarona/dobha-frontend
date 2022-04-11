import './Products.css';
import { memo } from 'react';
import { useState, useEffect } from 'react';
import { Row, Card, Container, Col, Spinner } from 'react-bootstrap';
import dataProdukTerbaru from '../../dataProdukTerbaru.json';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts as listProducts } from '../../redux/actions/ProductActions';
import { Link } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;
  const [Products, setProducts] = useState([]);
  const [SProducts, setSProducts] = useState('default');
  // const [Loading, setLoading] = useState(false);

  useEffect(() => {
    // getProducts();
    dispatch(listProducts());
  }, [dispatch]);

  // const getProducts = () => {
  //   axios
  //     .get(`http://localhost:3001/products`)
  //     .then((res) => {
  //       setProducts(res.data);
  //       setLoading(!Loading);
  //     })
  //     .catch((err) => console.log(err));
  // };
  // const getRatings = () => {
  //   const starsTotal = 5;
  //   for (let rating = 0; rating < Products.length; rating++) {
  //     const starPercentage = (Products[rating].rate / starsTotal) * 100;
  //     const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
  //     document.querySelector(`.${Products[rating].slug} .stars-inner`).style.width = starPercentageRounded;
  //     document.querySelector(`.${Products[rating].slug} .number-rating`).innerHTML = Products[rating].rate;
  //   }
  // };
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
      {loading || loading === undefined?<p>loading</p>:
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
              {loading ? (
                <div className="loading">
                  <Spinner animation="border" variant="warning" role="status" className="m-auto">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : error ? (
                { error }
              ) : (
                <Row className="g-4 row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-5">
                  {products.data.map((item, index) => {
                    console.log(item)
                    return (
                      <Col key={index}>
                        <Card className="card-center">
                          {/* {Products && <img src={'/' + Products.[0]} alt="" />} */}
                          <Card.Img variant="top" src={'https://pasaminang.com/wp-content/uploads/2021/01/Screenshot_2020-12-30-12-53-35-12.jpg'} />
                          <Card.Body>
                            <Link className="link-title" to={`/products/${item.slug_produk}`}>
                              <Card.Title>{item.nama_produk}</Card.Title>
                            </Link>
                            <Card.Text className="price">{formatRupiah(item.harga_satuan)}</Card.Text>
                            <div className={item.slug}>
                              <div className="stars-outer">
                                <div className="stars-inner" style={{ width: countRate(item.rating_produk) }}></div>
                              </div>
                              <span className="number-rating" dangerouslySetInnerHTML={{ __html: item.rating_produk }}></span>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              )}
            </Container>
          </div>
        </div>
      </section>
      }
    </main>
  );
};

export default memo(Products);
