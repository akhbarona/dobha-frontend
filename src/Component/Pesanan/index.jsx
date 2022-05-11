import { Container } from 'react-bootstrap';
import CardPesanan from './CardPesanan';
import { useState, useEffect } from 'react';
import AuthService from '../service/auth.service';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const Pesanan = () => {
  const navigate = useNavigate();
  const [dataUser, setUser] = useState({ data: [], loading: true });
  useEffect(() => {
    try {
      const user = AuthService.getCurrentUser();
      if (!user) {
        navigate('/login');
      }
      setUser((prevState) => ({
        ...prevState,
        data: user,
        loading: false,
      }));
    } catch (err) {
      navigate('/login');
      //    console.log(err)
    }
  }, []);

  return (
    <Container className="mt-5" style={{ height: 450 }}>
      {dataUser.loading ? (
        <center>
          <div className="loading">
            <Spinner animation="border" variant="warning" role="status" className="m-auto">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </center>
      ) : (
        <CardPesanan dataUser={dataUser.data} />
      )}
    </Container>
  );
};

export default Pesanan;
