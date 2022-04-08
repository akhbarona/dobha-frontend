import { useState } from 'react';
import { Button, Card, Col, Container, Nav, Row, Tab, Table, Tabs } from 'react-bootstrap';
import './Profile.css';
import Alamat from './Alamat';

const Profile = () => {
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
                </table>
              </Col>
            </Row>
          </Table>
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
        <Container className="profile-container">
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
