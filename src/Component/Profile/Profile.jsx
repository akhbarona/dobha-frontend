import { useState } from 'react';
import { Button, Card, Col, Container, Nav, Row, Tab, Table, Tabs } from 'react-bootstrap';
import './Profile.css';
import Alamat from './Alamat';

const Profile = () => {
  const Biodata = () => {
    return (
      <Card className="border-0">
        <Card.Body className="p-0 ">
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
              <Row>
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
                <Row xl={2}>
                  <Col xl={2} lg={4}>
                    <h5 className="my-2" style={{ fontWeight: '500' }}>
                      Username
                    </h5>
                  </Col>
                  <Col xl={10} lg={8}>
                    <h5 className="my-2" style={{ fontWeight: '500' }}>
                      Daniap
                    </h5>
                  </Col>
                </Row>
                <Row xl={2}>
                  <Col xl={2} lg={4}>
                    <h5 className="my-2" style={{ fontWeight: '500' }}>
                      Email
                    </h5>
                  </Col>
                  <Col xl={10} lg={8}>
                    <h5 className="my-2" style={{ fontWeight: '500' }}>
                      dani@gmail.com
                    </h5>
                  </Col>
                </Row>
                <Row xl={2}>
                  <Col xl={2} lg={4}>
                    <h5 className="my-2" style={{ fontWeight: '500' }}>
                      No. Hp
                    </h5>
                  </Col>
                  <Col xl={10} lg={8}>
                    <h5 className="my-2" style={{ fontWeight: '500' }}>
                      081234567890
                    </h5>
                  </Col>
                </Row>
              </Row>
              <Row className="p-2">
                <Button variant="primary" className="w-25">
                  <i class="fas fa-edit"></i>Edit
                </Button>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };

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
              <Tabs defaultActiveKey={pilih} id="uncontrolled-tab-example" className="mb-3" onSelect={handleSelect}>
                <Tab eventKey={1} title="Biodata Diri">
                  <Biodata />
                </Tab>
                <Tab eventKey={2} title="Alamat">
                  <Alamat />
                </Tab>
              </Tabs>
            </div>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default Profile;
