import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Tab,
  Tabs,
  Spinner,
} from "react-bootstrap";
import "./Profile.css";
import Alamat from "./Alamat";
import AuthService from "../service/auth.service";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAddress as listAddress } from "../../redux/actions/addressActions";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getAdress = useSelector((state) => state.getAdress);
  const { address , loading,error } = getAdress.address;

  useEffect(() => {
    try {
      const user = AuthService.getCurrentUser();
      dispatch(listAddress(user.id));
      if (!user) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response && error.response.data.message ? error.response.data.message : error.message)
    }
  }, [dispatch]);

  const Biodata = () => {
    return (
      <Card className="border-0">
        <Card.Body className="p-0 ">
          <Row xl={2} lg={2} md={2} sm={12}>
            <Col
              xl={4}
              lg={4}
              className="d-flex flex-column justify-content-center "
            >
              <i className="fa-solid fa-user fa-10x m-auto icon-profile"></i>
              <span className="p-2  d-flex  w-100">
                <Button variant="primary" className="m-auto w-50">
                  <i class="fas fa-edit"></i>Ubah Foto
                </Button>
              </span>
            </Col>

            <Col xs={12} md={8}>
              <table className="h-50 isi-content">
                <tr>
                  <td>Nama</td>
                  <td>: {address?.data?.username}</td>
                </tr>
                <tr>
                  <td>Email</td>

                  <td>: {address?.data?.email}</td>
                </tr>
                <tr>
                  <td>Nomor Telpon</td>
                  <td>: {address?.data?.phone_number}</td>
                </tr>
              </table>
              <Row className="p-2">
                <Button variant="primary" className="w-25">
                  <i class="fas fa-edit"></i>Edit
                </Button>
              </Row>
            </Col>
          </Row>
          {/* </Table> */}
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
        <Container>
          <Row className="profile-content">
            <div className="background-content">
              {loading ? (
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
              ): error? 
              <div class="alert alert-danger" role="alert">
              {error}{" "}
              </div>:
              (
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
