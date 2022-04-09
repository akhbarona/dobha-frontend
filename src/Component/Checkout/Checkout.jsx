import { useEffect, useState, memo } from "react";
import "./Checkout.css";
// import Confirm from './Confirm';
import axios from "axios";
import { Col, Row, Form, Container, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/actions/cartActions";

import AuthService from "../service/auth.service";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const [ongkir, setOngkir] = useState([]);
  const [hargaOngkir, setHargaOngkir] = useState(0);
  const methodPayment = [
    { method: "gopay", image: "logo-gopay.png" },
    { method: "dana", image: "logo-dana.png" },
    { method: "bank bca", image: "logo-bca.png" },
  ];
  const address = {
    name: "Jhon Doe",
    no: "081234567890",
    address: "Jl.Gatot Subroto No.79 Garuntang, Bandar Lampung",
  };

  const ketikaModalKebuka = [
    {
      method: "gopay",
      title: "Dobha Parfume",
      nomor: "081234567890",
      image_file_data: "logo-gopay.png",
      transaksi: [
        {
          invoice: {
            id: "BS2022750001",
            weight: 2,
            total: 119000,
          },
        },
      ],
      nama: "Justin",
      user_id: "7",
      username: "justin",
    },
  ];
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const [Address, setAddress] = useState(address);
  const [Payment, setPayment] = useState(methodPayment);
  const [GetPayment, setGetPayment] = useState("");
  // const [buttonPopup, setButtonPopup] = useState(false);

  const getMethodHandler = (e) => {
    const value = e.target.value;
    console.log(value);
    setGetPayment(value);
  };
  const handleMethod = (e) => {
    const { name, checked } = e.target;
    if (GetPayment === null || GetPayment === "") {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Silahkan pilih Metode Pembayaran!",
      });
    }else if (hargaOngkir === 0) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Silahkan pilih Metode Pengiriman!",
      });
    } 
    else if (GetPayment === "gopay") {
      dispatch(resetCart());
      setModalShow(true);
    } else if (GetPayment === "dana") {
    } else if (GetPayment === "bank bca") {
      setModalShow(true);
    }
    // let tempMethod = Payment.map((method) => (method.method === name ? { ...method, isChecked: checked } : method));
    // console.log(tempMethod);
    // setPayment(tempMethod);
  };
  const metodePembayaran = () => {
    return (
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Using Grid in Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <div className="payment-gateway-wrapper">
              <Row className="payment-gateway-info">
                <div className="payment-gateway-image">
                  <img src="logo-gopay.png" alt="" />
                </div>
                <h3>Dobha Parfume</h3>
                <p>081234567890</p>
              </Row>
              <Row className="payment-gateway-price">
                <Col>
                  <p className="pg-price">Total bayar</p>
                </Col>
                <Col>
                  <p className="pg-price">
                    Rp. {location.state.totalHarga + Number(hargaOngkir)}
                  </p>
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
                    <Form.Control type="file" size="md" />
                    <button className="mt-3 w-50 btn-buy">Submit</button>
                  </Form>
                </div>
              </div>
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  // const handleBayar = () => {
  //   setButtonPopup(true);
  // };
  // const methodPayments = () => {
  //   const pilih = 'gopay';
  //   if (pilih === 'gopay') {
  //     return (

  //   }
  // };

  const getOngkir = async () => {
    const dataSend = {
      destination: `114`,
      // weight: parseInt(localStorage.getItem('berat')),
      weight: 1000,
    };
    const getDataKota1 = await fetch(
      `https://apiongkir.herokuapp.com/api/ongkir`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataSend),
      }
    );

    const hasilDataKota1 = await getDataKota1.json();
    setOngkir(hasilDataKota1);
  };

  useEffect(() => {
    getOngkir();
  }, []);

  console.log("ongkir", ongkir);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (!user) {
      navigate("/login");
    }
  }, []);

  const getMetodePengriman = (e) => {
    console.log(e.target.value);
    setHargaOngkir(e.target.value);
  };

  return (
    <section>
      <div className="checkout-screen">
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
                        <img
                          src={item.image}
                          width="180"
                          height="70"
                          alt="hello"
                        />
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
                      <>
                        <div
                          key={i}
                          className="payment-method mt-2"
                          style={{ color: "black" }}
                        >
                          <Form.Check
                            inline
                            name="method"
                            type="radio"
                            value={d?.cost[0].value}
                            onChange={(e) => getMetodePengriman(e)}
                            label={
                              <div style={{ color: "black" }}>
                                {/* <p> Ongkir : {d?.cost[0].value}</p>
                               <p> Estimasi : {d?.cost[0].etd} Hari</p>
                               <p>Service : {d.service} </p> */}
                                <table className="table-payment-info">
                                  <tbody>
                                    <tr
                                      style={{
                                        height: "30px",
                                        fontWeight: "500",
                                      }}
                                    >
                                      <th style={{ verticalAlign: "middle" }}>
                                      Ongkos kirim
                                      </th>
                                      <td
                                        style={{
                                          verticalAlign: "middle",
                                          textAlign: "end",
                                        }}
                                      >
                                       Rp. {d?.cost[0].value}
                                      </td>
                                    </tr>
                                    <tr
                                      style={{
                                        height: "30px",
                                        fontWeight: "500",
                                      }}
                                    >
                                      <th style={{ verticalAlign: "middle" }}>
                                      Estimasi Pengiriman
                                      </th>
                                      <td
                                        style={{
                                          verticalAlign: "middle",
                                          textAlign: "end",
                                        }}
                                      >
                                        {d?.cost[0].etd}
                                      </td>
                                    </tr>
                                    <tr
                                      style={{
                                        height: "50px",
                                      }}
                                    >
                                      <th style={{ verticalAlign: "middle" }}>
                                      Service Pengiriman
                                      </th>
                                      <td
                                        style={{
                                          verticalAlign: "middle",
                                          textAlign: "end",
                                        }}
                                      >
                                       {d.service}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            }
                          />
                        </div>
                      </>
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
                        <tr style={{ height: "30px", fontWeight: "500" }}>
                          <th style={{ verticalAlign: "middle" }}>
                            Total Harga (1 Produk)
                          </th>
                          <td
                            style={{
                              verticalAlign: "middle",
                              fontWeight: "bold",
                              textAlign: "end",
                            }}
                          >
                            Rp{location.state.totalHarga}
                          </td>
                        </tr>
                        <tr style={{ height: "30px", fontWeight: "500" }}>
                          <th style={{ verticalAlign: "middle" }}>
                            Ongkos kirim
                          </th>
                          <td
                            style={{
                              verticalAlign: "middle",
                              fontWeight: "bold",
                              textAlign: "end",
                            }}
                          >
                            {hargaOngkir}
                          </td>
                        </tr>
                        <tr
                          style={{
                            height: "50px",
                            fontWeight: "bold",
                            borderTop: "1.2px solid #000",
                          }}
                        >
                          <th style={{ verticalAlign: "middle" }}>
                            Total Tagihan
                          </th>
                          <td
                            style={{
                              verticalAlign: "middle",
                              textAlign: "end",
                            }}
                          >
                            Rp{location.state.totalHarga + Number(hargaOngkir)}
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
                        <span>{Address.name}</span>
                      </li>
                      <li>
                        <span>{Address.no}</span>
                      </li>
                      <li>
                        <span>{Address.address}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="button-beli">
                    <Link
                      to="/profile"
                      className=" btn-buy text-decoration-none"
                    >
                      Ubah Alamat
                    </Link>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default memo(Checkout);
