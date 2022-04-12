import { Card, Col, Row } from "react-bootstrap";
import moment from 'moment';
import 'moment/locale/id';

const formatRupiah = (money) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(money);
  };
const CardPesanan = (props) => {
  console.log(props.pesanan[0]);



  return (
    <Card style={{ height: 400 }} className="col-lg-12">
      <Card.Header>Pesanan</Card.Header>
      <Card.Body>
        <Col lg={6}>
          {props.pesanan.map((item, index) => {
            return (
              <Card>
                <Row>
                  <Card.Img
                    className="col-lg-3"
                    style={{ width: "25%" }}
                    variant="left"
                    src="https://s2.bukalapak.com/img/7952299781/large/DOBHA___MINYAK_WANGI___PARFUM_DOBHA_SULTAN_6ML_GROSIR.jpg"
                  />
                  <Card.Body className="col-lg-9">
                    <Card.Title>Parfume Dobha</Card.Title>
                    <table>
                      <tr>
                        <th style={{ width: "60%" }}>Harga total</th>
                        <th>{formatRupiah(item.tagihan_total)}</th>
                      </tr>
                      <tr>
                        <td>Tgl Pesanan</td>
                        <td>{moment(item.created_at).format('LL')}</td>
                      </tr>
                      <tr>
                        <td>Estimasi</td>
                        <td>{item.estimasi} Hari</td>
                      </tr>
                      <tr>
                        <td>Service</td>
                        <td>{item.service}</td>
                      </tr>
                      <tr>
                        <td>Ekspedisi</td>
                        <td>JNE</td>
                      </tr>
                    </table>
                  </Card.Body>
                </Row>
              </Card>
            );
          })}
        </Col>
      </Card.Body>
    </Card>
  );
};

export default CardPesanan;
