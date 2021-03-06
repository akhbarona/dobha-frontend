import { useEffect, useState, memo } from 'react';
import './Checkout.css';
// import Confirm from './Confirm';
import axios from 'axios';
import { Col, Row, Form, Container, Button, Modal, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { resetCart } from '../../redux/actions/cartActions';
import AuthService from '../service/auth.service';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const CheckoutSUb = (props) => {
  const location = useLocation();
  const [ongkir, setOngkir] = useState([]);
  const [hargaOngkir, setHargaOngkir] = useState(0);
  const [estimasiOngkir, setEstimasiOngkir] = useState(0);
  const [serviceOngkir, setServiceOngkir] = useState(0);
  const [dataUser, setUser] = useState([]);
  const [buktiBayar, setBuktiBayar] = useState('');
  const [loading, setLoading] = useState(false);
  const methodPayment = [
    { method: 'gopay', image: 'logo-gopay.png' },
    { method: 'dana', image: 'logo-dana.png' },
    { method: 'bca', image: 'logo-bca.png' },
  ];

  const dispatch = useDispatch();
  const [modalShow, setModalShowGopay] = useState(false);
  const [modalShowBca, setModalShowBca] = useState(false);
  const [modalShowDana, setModalShowDana] = useState(false);
  const [modalShowPembayaran, setModalShowPembayaran] = useState(false);
  const navigate = useNavigate();
  const [Payment, setPayment] = useState(methodPayment);
  const [GetPayment, setGetPayment] = useState('');
  // const [buttonPopup, setButtonPopup] = useState(false);

  const getMethodHandler = (e) => {
    const value = e.target.value;
    console.log(value);
    setGetPayment(value);
  };
  const handleMethod = (e) => {
    // const { name, checked } = e.target;
    if (GetPayment === null || GetPayment === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Silahkan pilih Metode Pembayaran!',
      });
    } else if (hargaOngkir === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Silahkan pilih Metode Pengiriman!',
      });
    } else if (GetPayment === 'gopay' || GetPayment === 'dana' || GetPayment === 'bca') {
      dispatch(resetCart());
      setModalShowPembayaran(true);
      getMetodeAPIPembayaran();
    }
  };
  const [metodeBayar, setMetodeBayar] = useState([]);
  const [loadingBayar, setLoadingBayar] = useState(false);
  console.log('isi', metodeBayar);
  const getMetodeAPIPembayaran = () => {
    setLoadingBayar(true);
    axios
      .get(`https://dobha.herokuapp.com/api/payment?method=${GetPayment}`)
      .then((response) => {
        setLoadingBayar(false);
        setMetodeBayar(response.data.data);
      })
      .catch((error) => {
        setLoadingBayar(false);
        if (error.response) {
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Sistem Metode Pembayaran Ada Kendala, Harap menunggu beberapa menit atau pilih metode lain',
          });
          setGetPayment('');
        }
      });
  };

  const metodePembayaran = () => {
    return (
      <Modal show={modalShowPembayaran} onHide={() => setModalShowPembayaran(false)} aria-labelledby="contained-modal-title-vcenter" centered>
        <>
          {console.log(metodeBayar)}
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">{GetPayment === 'dana' ? 'Metode Pembayaran Dana' : GetPayment === 'gopay' ? 'Metode Pembayaran Gopay' : GetPayment === 'bca' ? ' Metode Pembayaran Bank BCA' : null}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
            {loadingBayar ? (
              'Loading...'
            ) : (
              <Container>
                <div className="payment-gateway-wrapper">
                  <Row className="payment-gateway-info">
                    <div className="payment-gateway-image">
                      <img src={GetPayment === 'dana' ? 'logo-dana.png' : GetPayment === 'gopay' ? 'logo-gopay.png' : GetPayment === 'bca' ? 'logo-bca.png' : null} alt="" />
                    </div>
                    <h3>Dobha Parfume</h3>
                    {metodeBayar.map((item, index) => (
                      <p key={index}> {item.payment_number}</p>
                    ))}
                  </Row>
                  <Row className="payment-gateway-price">
                    <Col>
                      <p className="pg-price">Total bayar</p>
                    </Col>
                    <Col>
                      <p className="pg-price">{location.state && formatRupiah(location.state.totalHarga + Number(hargaOngkir))}</p>
                    </Col>
                  </Row>
                  <div className="note-payment">
                    <p className="note-payment-sub">Note</p>
                    <p>Harap transfer sesuai dengan nominal yang tertera</p>
                  </div>
                  <div className="upload-confirm-wrapper">
                    <h6>Silahkan Upload Bukti Pembayaran Anda</h6>
                    <div className="confirm-wrapper">
                      <Form controlId="formFileLg" className="mt-3 mb-3">
                        <Form.Control onChange={(e) => setBuktiBayar(e)} type="file" size="md" name="bukti_bayar" />
                        {loading ? (
                          <button disabled type="button" className="mt-3 w-50 btn-buy">
                            Loading ...
                          </button>
                        ) : (
                          <button onClick={() => handleSubmit()} type="button" className="mt-3 w-50 btn-buy">
                            Submit
                          </button>
                        )}
                      </Form>
                    </div>
                  </div>
                </div>
              </Container>
            )}
          </Modal.Body>
        </>

        <Modal.Footer>
          <Button onClick={() => setModalShowPembayaran(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const getOngkir = async () => {
    const berat = 50 * parseInt(location.state.qty);
    // dataUser?.user?.id_kabupaten
    try {
      const dataSend = {
        destination: props.dataUser.id_kabupaten,
        weight: berat,
      };
      // https://apiongkir.herokuapp.com${process.env.REACT_APP_API_URL_TRANSAKSI}
      const getDataKota1 = await fetch(`${process.env.REACT_APP_API_URL_TRANSAKSI}/api/ongkir`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataSend),
      });

      const hasilDataKota1 = await getDataKota1.json();
      setOngkir(hasilDataKota1);
    } catch (err) {
      Swal.fire({
        title: 'Silahkan Lengkapi alamat',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'OK',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate('/profile');
          window.location.reload();
        } else {
          navigate('/');
          window.location.reload();
        }
      });
    }
  };

  useEffect(() => {
    if (dataUser.length != 0) {
      getOngkir();
    }
  }, [dataUser]);

  // console.log("ongkir", ongkir);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    // console.log(user)
    if (!user || location.state === null) {
      navigate('/login');
    }

    setUser(user);
  }, []);

  const getMetodePengriman = (e) => {
    const data = e.target.value.split(',');
    setHargaOngkir(data[0]);
    setEstimasiOngkir(data[1]);
    setServiceOngkir(data[2]);
  };
  const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(money);
  };

  const handleSubmit = async () => {
    if (buktiBayar !== '') {
      setLoading(true);
      const formData = new FormData();
      if (buktiBayar.target.files[0].size > 1000000) {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Batas Ukruan Gambar 1MB!',
        });
        return;
      }
      // handle image extension
      const extName = buktiBayar.target.files[0].name.split('.').pop().toLowerCase();
      if (extName !== 'jpg' && extName !== 'jpeg' && extName !== 'png') {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Extensi File Tidak di izinkan!',
        });
        return;
      }

      Swal.fire({
        title: 'Pastikan Bukti Pembayaran Benar dan Jumlah Sesuai',
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: 'Konfimasi',
        denyButtonText: `Cancel`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          formData.append('bukti_bayar', buktiBayar.target.files[0]);
          formData.set('username', props.dataUser.username);
          formData.set('email', props.dataUser.email);
          formData.set('provinsi', props.dataUser.provinsi);
          formData.set('kabupaten', props.dataUser.kabupaten);
          formData.set('alamat', props.dataUser.alamat);
          formData.set('ongkir', hargaOngkir);
          formData.set('tagihan_total', location.state.totalHarga + Number(hargaOngkir));
          formData.set('user_id', props.dataUser.id);
          formData.set('produk_id', location.state.id);
          formData.set('estimasi', estimasiOngkir);
          formData.set('service', serviceOngkir);
          formData.set('gambar_produk', location.state.imageUrl);
          formData.set('nama_produk', location.state.name);
          formData.set('jumlah', location.state.qty);
          formData.set('metode_pembayaran', GetPayment);

          try {
            const config = {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              onUploadProgress: (event) => {},
            };
            // https://apiongkir.herokuapp.com
            const response = await axios.post(`${process.env.REACT_APP_API_URL_TRANSAKSI}/api/transaksi`, formData, config);
            if (response.status === 200) {
              setLoading(false);
              Swal.fire({
                icon: 'success',
                title: 'success',
                text: 'Berhasil Membeli Barang',
              }).then(() => {
                navigate('/pesanan');
                window.location.reload();
              });
            } else {
              setLoading(false);
              Swal.fire({
                icon: 'error',
                title: 'Oops..',
                text: 'Terjadi Kesalahan Server',
              });
            }
          } catch (err) {
            setLoading(false);
          }
          // Swal.fire('Saved!', '', 'success')
        } else {
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Gambar Tidak boleh kosong',
      });
    }
  };

  // console.log('location.state', ongkir)
  return (
    <section>
      <div className="checkout-screen">
        {ongkir.length <= 0 ? (
          <center>
            <div className="loading">
              <Spinner animation="border" variant="warning" role="status" className="m-auto">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          </center>
        ) : (
          <Container className="checkout-container">
            <Row>
              <div className="title-checkout">
                <h2>Checkout</h2>
              </div>
            </Row>
            <Row className="g-4">
              <Col>
                <div className="title-method">
                  <h4>Pilih Metode Pembayaran</h4>
                </div>
                <div className="payment-method">
                  {Payment.map((item, index) => (
                    <Form.Check
                      inline
                      key={index}
                      name="method"
                      type="radio"
                      value={item.method}
                      onChange={getMethodHandler}
                      label={
                        <>
                          <img src={item.image} width="180" height="70" alt="hello" />
                          {/* <span className="name-method">{item.method}</span> */}
                        </>
                      }
                    />
                  ))}
                </div>
                <div className="button-beli">
                  <button onClick={handleMethod} className="w-50 btn-buy">
                    Bayar
                  </button>
                </div>
                {/* <Confirm trigger={buttonPopup} setTrigger={setButtonPopup}>
                {methodPayments()}
              </Confirm> */}

                {metodePembayaran()}
              </Col>

              <Col>
                <Row className="d-flex flex-column h-100">
                  <Col>
                    <div className="title-method">
                      <h4>Pilih Metode Pengiriman JNE</h4>
                    </div>
                    {ongkir?.rajaongkir?.results[0]?.costs.map((d, i) => {
                      return (
                        <div key={i} className="payment-method mt-2" style={{ color: 'black' }}>
                          <Form.Check
                            inline
                            name="method-jne"
                            type="radio"
                            value={`${d?.cost[0].value},${d?.cost[0].etd},${d?.service}`}
                            onChange={(e) => getMetodePengriman(e)}
                            label={
                              <div style={{ color: 'black' }}>
                                <table className="table-payment-info">
                                  <tbody>
                                    <tr
                                      style={{
                                        height: '30px',
                                        fontWeight: '500',
                                      }}
                                    >
                                      <th style={{ verticalAlign: 'middle' }}>Ongkos kirim</th>
                                      <td
                                        style={{
                                          verticalAlign: 'middle',
                                          textAlign: 'end',
                                        }}
                                      >
                                        {formatRupiah(d?.cost[0].value)}
                                      </td>
                                    </tr>
                                    <tr
                                      style={{
                                        height: '30px',
                                        fontWeight: '500',
                                      }}
                                    >
                                      <th style={{ verticalAlign: 'middle' }}>Estimasi Pengiriman</th>
                                      <td
                                        style={{
                                          verticalAlign: 'middle',
                                          textAlign: 'end',
                                        }}
                                      >
                                        {d?.cost[0].etd}
                                      </td>
                                    </tr>
                                    <tr
                                      style={{
                                        height: '50px',
                                      }}
                                    >
                                      <th style={{ verticalAlign: 'middle' }}>Service Pengiriman</th>
                                      <td
                                        style={{
                                          verticalAlign: 'middle',
                                          textAlign: 'end',
                                        }}
                                      >
                                        {d.service}
                                      </td>
                                    </tr>
                                    <tr
                                      style={{
                                        height: '50px',
                                      }}
                                    >
                                      <th style={{ verticalAlign: 'middle' }}>Berat Produk</th>
                                      <td
                                        style={{
                                          verticalAlign: 'middle',
                                          textAlign: 'end',
                                        }}
                                      >
                                        {location.state && 50 * parseInt(location.state.qty)}gr
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            }
                          />
                        </div>
                      );
                    })}
                  </Col>
                  <Col>
                    <div className="title-method mt-3">
                      <h4>Ringkasan Belanja</h4>
                    </div>
                    <div className="payment-info">
                      <table className="table-payment-info">
                        <tbody>
                          <tr style={{ height: '30px', fontWeight: '500' }}>
                            <th style={{ verticalAlign: 'middle' }}>Total Harga (1 Produk)</th>
                            <td
                              style={{
                                verticalAlign: 'middle',
                                fontWeight: 'bold',
                                textAlign: 'end',
                              }}
                            >
                              {location.state && formatRupiah(location.state.totalHarga)}
                            </td>
                          </tr>
                          <tr style={{ height: '30px', fontWeight: '500' }}>
                            <th style={{ verticalAlign: 'middle' }}>Ongkos kirim</th>
                            <td
                              style={{
                                verticalAlign: 'middle',
                                fontWeight: 'bold',
                                textAlign: 'end',
                              }}
                            >
                              {formatRupiah(hargaOngkir)}
                            </td>
                          </tr>
                          <tr
                            style={{
                              height: '50px',
                              fontWeight: 'bold',
                              borderTop: '1.2px solid #000',
                            }}
                          >
                            <th style={{ verticalAlign: 'middle' }}>Total Tagihan</th>
                            <td
                              style={{
                                verticalAlign: 'middle',
                                textAlign: 'end',
                              }}
                            >
                              {location.state && formatRupiah(location.state.totalHarga + Number(hargaOngkir))}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Col>

                  <Col>
                    <div className="title-method mt-3">
                      <h4 className="address-method">Alamat Pengiriman</h4>
                    </div>
                    <div className="payment-info">
                      <ul className="address-info">
                        <li>
                          <span>{props.dataUser.username}</span>
                        </li>
                        <li>
                          <span>{props.dataUser.phone_number}</span>
                        </li>
                        <li>
                          <span>{props.dataUser.provinsi ? props.dataUser.provinsi : 'alamat belum di seting'}</span>
                        </li>
                        <li>
                          <span>{props.dataUser.kabupaten ? props.dataUser.kabupaten : 'alamat belum di seting'}</span>
                        </li>
                        <li>
                          <span>{props.dataUser.alamat ? props.dataUser.alamat : 'alamat belum di seting'}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="button-beli">
                      <Link to="/profile" className=" btn-buy text-decoration-none">
                        Ubah Alamat
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </section>
  );
};

export default CheckoutSUb;
