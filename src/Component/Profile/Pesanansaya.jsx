import { useState, useEffect } from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import './Pesanansaya.css';
import axios from 'axios';
import Table from './Table';
import AuthService from '../service/auth.service';
import { useNavigate } from 'react-router-dom';

const Pesanansaya = () => {
  const [orderLists, setOrderLists] = useState([]);
  const navigate = useNavigate();

  const apiEndpoint = 'http://localhost:3001/pesanansaya';
  useEffect(() => {
    const getOrderLists = () => {
      axios
        .get(apiEndpoint)
        .then((response) => {
          const data = response.data;
          const newData = data.map((item, index) => {
            item.no = index + 1;
            return item;
          });
          //   console.log(pushNo);
          setOrderLists(newData);
        })
        .catch((error) => console.log(error));
    };
    getOrderLists();
  }, []);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (!user) {
      // -> jika user belum login maka nge-redirect ke halaman login
      navigate('/login');
    }
  }, []);
  const columns = [
    {
      header: 'No',
      field: 'no',
    },
    {
      header: 'Nomor Pemesanan',
      field: 'nomor_pesanan',
    },
    {
      header: 'Pemesanan',
      field: 'tanggal_pemesanan',
    },
    {
      header: 'Nama',
      field: 'name',
    },
    {
      header: 'Email',
      field: 'email',
    },
    {
      header: 'Phone',
      field: 'phone_number',
    },
    {
      header: 'Nama Produk',
      field: 'nama_produk',
    },
    {
      header: 'Jumlah Produk',
      field: 'jumlah_produk',
    },
    {
      header: 'Total',
      field: 'total',
    },
    {
      header: 'Alamat Pengiriman',
      field: 'alamat_pengiriman',
    },
    {
      header: 'Kurir',
      field: 'kurir_pengiriman',
    },
    {
      header: 'Status',
      field: 'status_produk',
    },
  ];

  return (
    <section>
      <div className="pesanan-wrapper">
        <Container>
          <Row className="pesanan-content">
            <div className="pesanan-content">
              <Card className="border-0">
                <Card.Body className="p-0 ">
                  <Table columns={columns} records={orderLists} setOrderLists={setOrderLists} />
                </Card.Body>
              </Card>
            </div>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default Pesanansaya;
