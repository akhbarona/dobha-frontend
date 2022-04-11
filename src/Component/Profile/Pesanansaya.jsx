import { useState, useEffect, useMemo } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import './Pesanansaya.css';
import axios from 'axios';
import Table from './Table';
// import { useTable } from 'react-table';

// import { COLUMNS } from './columns';

const Pesanansaya = () => {
  const [orderLists, setOrderLists] = useState([]);
  //   console.log(orderLists);
  const apiEndpoint = 'http://localhost:3001/pesanansaya';
  useEffect(() => {
    const getOrderLists = () => {
      axios
        .get(apiEndpoint)
        .then((response) => setOrderLists(response.data))
        .catch((error) => console.log(error));
    };
    getOrderLists();
  }, []);

  const columns = [
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
                  <Table columns={columns} records={orderLists} />
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
