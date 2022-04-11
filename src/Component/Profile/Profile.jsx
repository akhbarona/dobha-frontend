import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Nav,
  Row,
  Tab,
  Table,
  Tabs,
  Spinner,
} from "react-bootstrap";
import "./Profile.css";
import Alamat from "./Alamat";
import axios from "axios";
import authHeader from "../service/auth.header";
import AuthService from "../service/auth.service";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Profile = () => {
  const [dataUser, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (!user) {
      navigate("/login");
    }
    setUser(user.user);
  }, []);

  const Biodata = () => {
    return (
      <Card>
        <Card.Body className="card-profile" id="#first">
          <Table striped bordered hover>
            <Row>
              <Col xs={6} md={4}>
                <Row className="text-center justify-content-center">
                  <i class="fa-solid fa-user fa-10x"></i>

                  <Button variant="primary mt-3 w-50">Ubah Profile</Button>
                </Row>
              </Col>
              <Col xs={12} md={8}>
                <table className="h-50 w-50 isi-content">
                  <tr>
                    <td>Nama</td>
                    <td>{dataUser.username}</td>
                  </tr>
                  <tr>
                    <td>Email</td>

                    <td>{dataUser.email}</td>
                  </tr>
                  <tr>
                    <td>Nomor Telpon</td>
                    <td>{dataUser.phone_number}</td>
                  </tr>
                </table>
              </Col>
            </Row>
          </Table>
        </Card.Body>
      </Card>
    );
  };

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

  return (
    <section>
      <div className="profile-wrapper">
        <Container className="profile-container">
          <Row className="profile-content">
            <div className="background-content">
              {dataUser.length != 0 ? (
                <Tabs
                  defaultActiveKey={pilih}
                  id="uncontrolled-tab-example"
                  className="mb-3"
                  onSelect={handleSelect}
                >
                  <Tab eventKey={1} title="Biodata Diri">
                    <Biodata />
                  </Tab>
                  <Tab eventKey={2} title="Alamat">
                    <Alamat dataUser={dataUser} />
                  </Tab>
                </Tabs>
              ) : (
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
              )}
            </div>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default Profile;
