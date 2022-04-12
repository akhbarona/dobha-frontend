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
      <Card.Body style={{overflowX:'scroll'}}>
          {props.pesanan.map((item, index) => {
            return (
              <Col lg={6} key={index} className="mb-3">
              <Card>
                <Row>
                  <Card.Img
                    className="col-lg-3"
                    style={{ width: "25%" }}
                    variant="left"
                    src={item.gambar_produk?"https://pasaminang.com/wp-content/uploads/2021/01/Screenshot_2020-12-30-12-53-35-12.jpg":item.gambar_produk
                    }/>
                    
                    <Card.Body className="col-lg-9">
                      <Card.Title>{item.nama_produk}</Card.Title>
                    <table>
                      <tr>
                        <th style={{ width: "60%" }}>Harga total</th>
                        <th>: {formatRupiah(item.tagihan_total)}</th>
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
                        <td>: {item.status?"Dikirin":"Belum dikirim"}</td>
                      </tr>
                      
                      <tr>
                        <td>No Resi</td>
                        <td>: {item.no_resi?item.no_resi:'-'}</td>
                      </tr>

                    </table>
                  </Card.Body>
                </Row>
              </Card>
              </Col>
            );
          })}
        
      </Card.Body>
    </Card>
  );
};

export default CardPesanan;
