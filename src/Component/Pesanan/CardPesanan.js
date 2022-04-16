import { Card, Col, Row, Spinner } from "react-bootstrap";
import moment from "moment";
import "moment/locale/id";
import { useState, useEffect } from "react";
const formatRupiah = (money) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
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
    fetch(
      `${process.env.REACT_APP_API_URL_TRANSAKSI}/api/pesanan/${props.dataUser.email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
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
          err:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        }));
      });
  };

  useEffect(() => {
    getPesanan();
  }, []);


  return (
    <>
      {pesanan.loading ? (
        <center>
        <div className="loading">
          <Spinner
            animation="border"
            variant="warning"
            role="status"
            className="m-auto"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
        </center>
      ) : pesanan.err ? (
        <div class="alert alert-danger" role="alert">
          {pesanan.err}{" "}
        </div>
      ) : (
        <Card style={{ height: 400 }} className="col-lg-12">
          <Card.Header>Pesanan</Card.Header>
          <Card.Body style={{ overflowX: "scroll" }}>
            {pesanan.data.length > 0 ? pesanan.data.map((item, index) => {
              return (
                <Col lg={6} key={index} className="mb-3">
                  <Card>
                    <Row>
                        <>
                          <Card.Img
                            className="col-lg-3"
                            style={{ width: "25%" }}
                            variant="left"
                            src={
                              item.gambar_produk
                                ? "https://pasaminang.com/wp-content/uploads/2021/01/Screenshot_2020-12-30-12-53-35-12.jpg"
                                : item.gambar_produk
                            }
                          />

                          <Card.Body className="col-lg-9">
                            <Card.Title>{item.nama_produk}</Card.Title>
                          
                            <table>
                              <tr>
                                <th style={{ width: "60%" }}>Harga total</th>
                                <th>: {formatRupiah(item.tagihan_total)}</th>
                              </tr>
                              <tr>
                                <td>Tgl Pesanan</td>
                                <td>
                                  : {moment(item.created_at).format("LL")}
                                </td>
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
                                <td>
                                  : {item.status ? "Dikirin" : "Belum dikirim"}
                                </td>
                              </tr>

                              <tr>
                                <td>No Resi</td>
                                <td>: {item.no_resi ? item.no_resi : "-"}</td>
                              </tr>
                            </table>
                          </Card.Body>
                        </>
                    </Row>
                  </Card>
                </Col>
              )
            }): <h1 style={{color:'lightgrey', fontWeight:'bold'}}>Belum ada pesanan</h1>}
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default CardPesanan;
