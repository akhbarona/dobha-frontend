import { useState, useEffect } from 'react';
import { Container, Row, Tab, Tabs, Spinner } from 'react-bootstrap';
import './Profile.css';
import Alamat from './Alamat';
import AuthService from '../service/auth.service';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAddress as listAddress } from '../../redux/actions/addressActions';
import Biodata from './Biodata';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getAdress = useSelector((state) => state.getAdress);
  const { address, loading, error } = getAdress.address;

  useEffect(() => {
    try {
      const user = AuthService.getCurrentUser();
      dispatch(listAddress(user.id));
      if (!user) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error.response && error.response.data.message ? error.response.data.message : error.message);
    }
  }, [dispatch]);

  // const handleUpdateProfile = () => {

  //   const dataSend = {
  //     name: "admin_2022",
  //     username: "admin_2022",
  //     email: "admin2@gmail.com",
  //     password: "12345678",
  //     phone_number: "085816790359",
  //     alamat: "Jl in ajadululah",
  //     provinsi: "lampung",
  //     kabupaten: "tanggamus",
  //     id_kabupaten: "343",
  //   };

  //   axios.post('/api/auth/user/update/admin', dataSend, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": authHeader().Authorization,
  //     },
  //   })
  //   .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })

  // };

  const [pilih, setPilih] = useState(1);
  const handleSelect = (value) => {
    setPilih(value);
  };

  // console.log(address.data)

  return (
    <section>
      <div className="profile-wrapper">
        <Container>
          <Row className="profile-content">
            <div className="background-content">
              {loading ? (
                <center>
                  <div className="loading">
                    <Spinner animation="border" variant="warning" role="status" className="m-auto">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                </center>
              ) : error ? (
                <div class="alert alert-danger" role="alert">
                  {error}{' '}
                </div>
              ) : (
                <Tabs defaultActiveKey={pilih} id="uncontrolled-tab-example" className="mb-3" onSelect={handleSelect}>
                  <Tab eventKey={1} title="Biodata Diri">
                    <Biodata address={address.data} />
                  </Tab>
                  <Tab eventKey={2} title="Alamat">
                    <Alamat dataUser={address.data} />
                  </Tab>
                </Tabs>
              )}
            </div>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default Profile;
