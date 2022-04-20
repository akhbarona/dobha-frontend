import { Card, Col, Modal, Row, Spinner } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/id';
import { useState, useEffect } from 'react';
// import CommentForm from '../Products/Product/CommentForm';
import CommentReview from './CommentReview';
import AuthService from '../service/auth.service';
const formatRupiah = (money) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(money);
};
const CardPesanan = (props) => {
  const [pesanan, setPesanan] = useState({
    data: [],
    loading: true,
    err: null,
  });
  const getPesanan = () => {
    setPesanan((prevState) => ({
      ...prevState,
      data: [],
      loading: true,
      err: null,
    }));
    // https://apiongkir.herokuapp.com
    fetch(`${process.env.REACT_APP_API_URL_TRANSAKSI}/api/pesanan/${props.dataUser.email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .then((res) => {
        setPesanan((prevState) => ({
          ...prevState,
          data: res.data,
          loading: false,
          err: null,
        }));
      })
      .catch((error) => {
        setPesanan((prevState) => ({
          ...prevState,
          data: [],
          loading: false,
          err: error.response && error.response.data.message ? error.response.data.message : error.message,
        }));
      });
  };

  useEffect(() => {
    getPesanan();
  }, []);

  const [modalShow, setModalShow] = useState(false);
  const [Produk_id, setProduk_id] = useState(null);
  const [User_id, setUser_id] = useState(null);
  // const currentUser = AuthService.getCurrentUser() ? AuthService.getCurrentUser() : null;
  // console.log(currentUser);
  const ModalReview = ({ produk_id, currentUserId }) => {
    // console.log(produk_id);

    return (
      <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CommentReview product_id={produk_id} setModalShow={setModalShow} currentUserId={currentUserId} />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setModalShow(false)}>Close</button>
        </Modal.Footer>
      </Modal>
    );
  };

  const handleReview = (item) => {
    // console.log(item.user_id);
    setModalShow(true);
    setUser_id(item.user_id);
    setProduk_id(item.produk_id);
  };

  return (
    <>
      {pesanan.loading ? (
        <center>
          <div className="loading">
            <Spinner animation="border" variant="warning" role="status" className="m-auto">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </center>
      ) : pesanan.err ? (
        <div class="alert alert-danger" role="alert">
          {pesanan.err}{' '}
        </div>
      ) : (
        <>
          <Card style={{ height: 400 }} className="col-lg-12">
            <Card.Header>Pesanan</Card.Header>
            <Card.Body style={{ overflowX: 'scroll' }}>
              {pesanan.data.length > 0 ? (
                pesanan.data.map((item, index) => {
                  return (
                    <Col lg={12} key={index} className="mb-3">
                      <Card>
                        {console.log(item)}
                        <Row>
                          <>
                            <Card.Img className="col-lg-4" variant="left" src={item.gambar_produk ? 'https://pasaminang.com/wp-content/uploads/2021/01/Screenshot_2020-12-30-12-53-35-12.jpg' : item.gambar_produk} />

                            <Card.Body className="col-lg-8">
                              <Card.Title>{item.nama_produk}</Card.Title>

                              <table>
                                <tbody>
                                  <tr>
                                    <th style={{ width: '60%' }}>Harga total</th>
                                    <th style={{ fontWeight: 'bold' }}>: {formatRupiah(item.tagihan_total)}</th>
                                  </tr>
                                  <tr>
                                    <td>Tgl Pesanan</td>
                                    <td>: {moment(item.created_at).format('LL')}</td>
                                  </tr>
                                  <tr>
                                    <td>Estimasi</td>
                                    <td>: {item.estimasi} Hari</td>
                                  </tr>
                                  <tr>
                                    <td>Service</td>
                                    <td>: {item.service}</td>
                                  </tr>
                                  <tr>
                                    <td>Jumlah</td>
                                    <td>: {item.jumlah}</td>
                                  </tr>
                                  <tr>
                                    <td>Ekspedisi</td>
                                    <td>: JNE</td>
                                  </tr>
                                  <tr>
                                    <td>Status</td>
                                    <td>: {item.status ? <span style={{ fontWeight: 'bold', color: 'green' }}>Dikirim</span> : <span style={{ fontWeight: 'bold', color: 'red' }}>Belum Dikirim</span>}</td>
                                  </tr>

                                  <tr>
                                    <td>No Resi</td>
                                    <td>: {item.no_resi ? item.no_resi : '-'}</td>
                                  </tr>
                                </tbody>
                              </table>
                              {item.status ? (
                                <>
                                  {/* item.statuscomment ? undefined : */}
                                  <button className="btn btn-success mt-3" onClick={() => handleReview(item)}>
                                    Review
                                  </button>
                                  <a href={`https://cekresi.com/tracking/cek-resi-jne.php?noresi=${item.no_resi ? item.no_resi : '-'}`} target="_blank" className="btn btn-warning mt-3" style={{ marginLeft: 5 }}>
                                    Cek Resi
                                  </a>
                                </>
                              ) : (
                                <>
                                  <button className="btn btn-success mt-3" disabled>
                                    Review
                                  </button>
                                  <button className="btn btn-warning mt-3" style={{ marginLeft: 5 }} disabled>
                                    Cek Resi
                                  </button>
                                </>
                              )}
                              {/* <button className="btn btn-success mt-3">Review</button>
                            <a href={`https://cekresi.com/tracking/cek-resi-jne.php?noresi=${item.no_resi ? item.no_resi : "-"}`}  target="_blank"className="btn btn-warning mt-3" style={{marginLeft: 5}}>Cek Resi</a> */}
                            </Card.Body>
                          </>
                        </Row>
                      </Card>
                    </Col>
                  );
                })
              ) : (
                <h1 style={{ color: 'lightgrey', fontWeight: 'bold' }}>Belum ada pesanan</h1>
              )}
            </Card.Body>
          </Card>
          <ModalReview produk_id={Produk_id} currentUserId={User_id} />
        </>
      )}
    </>
  );
};

export default CardPesanan;
