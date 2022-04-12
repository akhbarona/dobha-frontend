import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Col, Row, InputGroup, Card, Spinner, FormControl } from 'react-bootstrap';
import { useState, useEffect, useRef, memo } from 'react';
import './Detail.css';

import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, getMoreProducts } from '../../../redux/actions/ProductActions';
import { addToCart } from '../../../redux/actions/cartActions';

import Swal from 'sweetalert2';
// import axios from 'axios';
import Comments from './Comments';

import AuthService from '../../service/auth.service';

const Detail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.getProductDetails);
  const moreProduct = useSelector((state) => state.getMoreProducts);
  const { product, loading, error } = productDetails;
  const [Quantity, setQuantity] = useState(1);
  const [Index, setIndex] = useState(0);
  // const [MoreProducts, setMoreProducts] = useState([]);
  const navigate = useNavigate();
  const myRef = useRef(null);

 
  const {user:currentUser} = AuthService.getCurrentUser()? AuthService.getCurrentUser():{user:null};

  useEffect(() => {
    if (product && id !== product.id) {
      dispatch(getProductDetails(id));
    }
    // dispatch(getMoreProducts());
  }, [dispatch, id]);

  const handleDecrement = () => {
    if (Quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };
  const handleIncrement = () => {
    if (Quantity < product.data.stock_produk) {
      setQuantity((nextCount) => nextCount + 1);
    } else {
      setQuantity(1);
    }
  };
  // const submitAddtocart = (e) => {
  //   e.preventDefault();

  //   const data = {
  //     product: product.id,
  //     product_qty: Quantity,
  //   };
  //   const Auth = false;

  //   Auth
  //     ? axios.post(`http://localhost:3001/add-to-cart`, data).then((res) => {
  //         if (res.status === 201) {
  //           Swal.fire({
  //             title: 'Success',
  //             type: 'success',
  //             text: 'Berhasil menambahkan',
  //           });
  //         } else if (res.status === 409) {
  //           Swal.fire({
  //             title: 'Are you sure?',
  //             text: 'User will have Admin Privileges',
  //             icon: 'warning',
  //             showCancelButton: true,
  //             confirmButtonColor: '#3085d6',
  //             cancelButtonColor: '#d33',
  //             confirmButtonText: 'Yes!',
  //           });
  //         } else if (res.status === 401) {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Oops...',
  //             text: 'Something went wrong!',
  //             footer: '<a href>Why do I have this issue?</a>',
  //           });
  //         }
  //       })
  //     : Swal.fire({
  //         icon: 'error',
  //         title: 'Silahkan Login Terlebih Dahulu!',
  //         showCloseButton: true,
  //         confirmButtonColor: '#3085d6',
  //         confirmButtonText: 'Login',
  //       });
  // };

  const submitAddtocart = (e) => {
    e.preventDefault();
  
    // const Auth = true;
    if (currentUser) {
      dispatch(addToCart(product.data[0].slug_produk, Quantity));
      Swal.fire({
        title: 'Success',
        text: 'Berhasil menambahkan',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Silahkan Login Terlebih Dahulu!',
        showCloseButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Login',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
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

  const handleTab = (index) => {
    setIndex(index);
    const images = myRef.current.children;

    // console.log(images);
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace('active', '');
    }
    images[index].className = 'active';
  };

  const onlyNumber = (e) => {
    const re = /^[0-9\b]+$/;
    const newValue = e.target.value;
    if (newValue <= 0) {
      setQuantity(0);
    } else {
      if (newValue === '' || re.test(newValue)) {
        if (newValue > product.data.stock_produk) {
          setQuantity(1);
        } else {
          setQuantity(Number(newValue));
        }
      }
    }
  };
  const onlyNol = (e) => {
    if (e.target.value <= 0) {
      setQuantity(Number(1));
    }
  };

  return (
    <main>
      <section>
        <div className="product-detail-container mt-1">
        <Container>
            {loading || loading === undefined? (
              <div className="loading">
                <Spinner animation="border" variant="warning" role="status" className="m-auto">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : error ? (
              <h2>{error}</h2>
            ) : (
              <Row className="show-grid details" key={product.id}>
                {console.log('product.data =>',product.data[0])}
                <Col md={4}>
                  <div className="big-image">{product.image && <img src={'/' + product.image[Index]} alt="" />}</div>

                  <div ref={myRef} className="thumb">
                    {product.image && product.image.map((image, idx) => <img onClick={() => handleTab(idx)} key={idx} src={'/' + image} alt="" />)}
                  </div>
                </Col>

                <Col md={6}>
                  <div className="box">
                    <h2>{product.data[0].nama_produk}</h2>

                    <div className={`${product.slug}`}>
                      <div className="stars-outer">
                        <div className="stars-inner" style={{ width: countRate(product.data[0].rating_produk) }}></div>
                      </div>
                      <span className="number-rating" dangerouslySetInnerHTML={{ __html: product.rate }}></span>
                    </div>

                    <p className="price">{formatRupiah(product.data[0].harga_satuan)}</p>
                    <p>{product.data[0].deskripsi_produk}</p>
                  </div>
                </Col>
                <Col md={2}>
                  <div className="box-cart">
                    <p>
                      Stock
                      <span>{product.data[0].stock_produk}</span>
                    </p>

                    {product.data[0].stock_produk > 0 ? (
                      <InputGroup className="w-100 mt-2 mb-3">
                        <InputGroup.Text onClick={handleDecrement} type="button">
                          -
                        </InputGroup.Text>
                        {/* <div className="form-control text-center">{Quantity}</div> */}
                        <FormControl min="1" onBlur={onlyNol} onChange={onlyNumber} value={Quantity} className="text-center" />
                        <InputGroup.Text onClick={handleIncrement} type="button">
                          +
                        </InputGroup.Text>
                      </InputGroup>
                    ) : (
                      <label className="btn-sm btn-success px-4 mb-2">Out of stock</label>
                    )}

                    <button className="w-100 cart" onClick={submitAddtocart}>
                      Tambah ke Keranjang
                    </button>
                  </div>
                </Col>
              </Row>
            )}

            <div className="comment-box">
              <h3>Review</h3>
              <Row className="g-2">
                <Col xl={12}>
                  <Comments currentUserId={11} currentUsername={`${currentUser?.name}`} />
                </Col>
                <Col xl={12}></Col>
              </Row>
            </div>
            <div className="more-products">
              <h3>Produk Lainnya</h3>
              {moreProduct.loading ? (
                <h2>Loding...</h2>
              ) : error ? (
                <h2>{error}</h2>
              ) : (
                <Row className="g-4 row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-5">
                  {moreProduct.products &&
                    moreProduct.products.map((item, index) => {
                      return (
                        <Col key={index}>
                          <Card className="card-center">
                            <Card.Img variant="top" src={'/' + item.image[0]} />
                            <Card.Body>
                              <Link className="link-title" to={`/products/${item.id}`}>
                                <Card.Title>{item.title}</Card.Title>
                              </Link>
                              <Card.Text className="price">{formatRupiah(item.price)}</Card.Text>
                              <div className={item.slug}>
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
              )}
            </div>
          </Container> 
        </div>
      </section>
    </main>
  );
};

export default memo(Detail);
