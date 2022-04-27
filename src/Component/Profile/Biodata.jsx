import { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Tab, Tabs, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

const Biodata = ({ address }) => {
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState(address.username);
  const [name, setName] = useState(address.name);
  const [phone_number, setPhoneNumber] = useState(address.phone_number);

  const handleSimpan = async () => {
    const dataSend = {
      email: address.email,
      username,
      name,
      phone_number,
    };

    try {
      // https://dobha.herokuapp.com/api/auth/user/update-user/{username}
      const hasil = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/user/update-user/${address.username}`, dataSend, {
        header: {
          'Content-Type': 'application/json',
        },
      });
      if (hasil.status === 200) {
        Swal.fire({
          title: 'Update Berhasil',
          width: 600,
          padding: '3em',
          color: '#716add',
          background: '#fff url(/images/trees.png)',
          backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `,
        });
      }
      setEdit(false);
    } catch (error) {
      // console.log(error.response && error.response.data.message
      //   ? error.response.data.message
      //   : error.message);
      setEdit(false);
      Swal.fire({
        title: `${error.response && error.response.data.message ? error.response.data.message : error.message}`,
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(/images/trees.png)',
        backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `,
      });
    }
  };
  const [gantiFoto, setGantiFoto] = useState(null);
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      //  setGantiFoto(file);
      const data = new FormData();
      data.append('photo', file);
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/auth/user/update-photo/${username}`, data)
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((error) => console.log(error));

      // setImagePreview(URL.createObjectURL(file));
      //  const reader = new FileReader();
      // reader.onload(() => {
      //   setImagePreview(reader.result);
      // });
      //  reader.onload = (e) => {
      //    setImagePreview(e.target.result);
      //  };
      //  reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <Card className="border-0">
      <Card.Body className="p-0 ">
        <Row xl={2} lg={2} md={2} sm={12}>
          <Col xl={4} lg={4} className="d-flex flex-column justify-content-center ">
            <i className="fa-solid fa-user fa-10x m-auto icon-profile"></i>
            <span className="p-2  d-flex  w-100" style={{ position: 'relative' }}>
              <input onChange={handleImage} className="css-19nhuia" type="file" name="profilePicture" accept="image/png, image/jpg, image/jpeg" />
              <Button variant="primary" className="m-auto w-50 css-dg3e5c-unf-btn">
                <i className="fas fa-edit"></i>Ubah Foto
              </Button>
            </span>
          </Col>

          <Col style={edit ? { display: 'block' } : { display: 'none' }} xs={12} md={8}>
            <table className="h-50 isi-content">
              <tbody>
                <tr>
                  <td>Email</td>

                  <td>
                    : <input style={{ border: '1px solid blue', borderRadius: 4 }} type={'text'} value={address.email} disabled />
                  </td>
                </tr>
                <tr>
                  <td>Username</td>
                  <td>
                    : <input type="text" onChange={(e) => setUsername(e.target.value)} style={{ border: '1px solid blue', borderRadius: 4 }} value={username} />
                  </td>
                </tr>
                <tr>
                  <td>Nama</td>
                  <td>
                    : <input value={name} onChange={(e) => setName(e.target.value)} style={{ border: '1px solid blue', borderRadius: 4 }} type={'text'} />
                  </td>
                </tr>
                <tr>
                  <td>Nomor Telpon</td>
                  <td>
                    : <input onChange={(e) => setPhoneNumber(e.target.value)} style={{ border: '1px solid blue', borderRadius: 4 }} type={'text'} value={phone_number} />
                  </td>
                </tr>
              </tbody>
            </table>
            <Row className="p-2">
              <Button onClick={() => handleSimpan()} variant="primary" className="w-25">
                <i className="fas fa-edit"></i>SIMPAN
              </Button>
            </Row>
          </Col>

          <Col style={edit ? { display: 'none' } : { display: 'block' }} xs={12} md={8}>
            <table className="h-50 isi-content">
              <tbody>
                <tr>
                  <td>Email</td>

                  <td>: {address.email}</td>
                </tr>
                <tr>
                  <td>Username</td>
                  <td>: {address.username}</td>
                </tr>
                <tr>
                  <td>Nama</td>
                  <td>: {address.name}</td>
                </tr>
                <tr>
                  <td>Nomor Telpon</td>
                  <td>: {address.phone_number}</td>
                </tr>
              </tbody>
            </table>
            <Row className="p-2">
              <Button onClick={() => setEdit(true)} variant="primary" className="w-25">
                <i className="fas fa-edit"></i>Edit
              </Button>
            </Row>
          </Col>
        </Row>
        {/* </Table> */}
      </Card.Body>
    </Card>
  );
};

export default Biodata;
