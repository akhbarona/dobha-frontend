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
      <Card className="border-0">
        <Card.Body className="p-0 ">
        <Table>
          <Row xl={2} lg={2} md={2} sm={12}>
            <Col xl={4} lg={4} className="d-flex flex-column justify-content-center ">
              <i className="fa-solid fa-user fa-10x m-auto icon-profile"></i>
              <span className="p-2  d-flex  w-100">
                <Button variant="primary" className="m-auto w-50">
                  <i class="fas fa-edit"></i>Ubah Foto
                </Button>
              </span>
            </Col>
            <Col xl={8} lg={8}>
              {/* <table className="h-50 w-50">
                <tr>
                  <td>Nama</td>
                  <td>Dhany</td>
                </tr>
                <tr>
                  <td>Email</td>

                  <td>dani@gmail.com</td>
                </tr>
                <tr>
                  <td>Nomor Telpon</td>
                  <td>081234567890</td>
                </tr>
              </table> */}
              {/* <Row> */}
                <Row xl={2}>
                  <Col xl={2} lg={4}>
                    <h5 className="my-2" style={{ fontWeight: '500' }}>
                      Nama
                    </h5>
                  </Col>
                  <Col xl={10} lg={8}>
                    <h5 className="my-2" style={{ fontWeight: '500' }}>
                      Dani
                    </h5>
                  </Col>
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
          <Row className="p-2">
                <Button variant="primary" className="w-25">
                  <i class="fas fa-edit"></i>Edit
                </Button>
          </Row>
        </Card.Body>
      </Card>
    );
  };

  {/* // const handleUpdateProfile = () => {

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

  // }; */}

  const [pilih, setPilih] = useState(1);
  const handleSelect = (value) => {
    setPilih(value);
  };

  return (
    <section>
      <div className="profile-wrapper">
        <Container>
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
