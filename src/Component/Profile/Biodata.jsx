import { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Row, Tab, Tabs, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import authHeader from '../service/auth.header';
import authService from '../service/auth.service';
import getCookie from '../../hooks/getCookie';
import { getAddress as listAddress } from '../../redux/actions/addressActions';

import Cookie from 'js-cookie';
import { useDispatch } from 'react-redux';
import setCookie from '../../hooks/setCookie';
const Biodata = ({ address }) => {
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState(address.username);
  const [name, setName] = useState(address.name);
  const [phone_number, setPhoneNumber] = useState(address.phone_number);
  const dispatch = useDispatch();
  const [loadingUpdate, setloadingUpdate] = useState(true);

  const handleSimpan = async () => {
    const data = new FormData();
    data.append('email', address.email);
    data.append('username', username);
    data.append('name', name);
    data.append('phone_number', phone_number);

    try {
      setloadingUpdate(false);
      // https://dobha.herokuapp.com/api/auth/user/update-user/{username}
      const hasil = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/user/update-user/${address.username}`, data, {
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: authHeader().Authorization,
        },
      });
      if (hasil.status === 200) {
        setloadingUpdate(true);
        const user = authService.getCurrentUser();
        // setCookie('user', JSON.stringify(data.user), getCookie('')); // ini harusnya dipakai

        // const OldTime = JSON.parse(getCookie('expired'));
        // console.log(new Date(OldTime));
        // const newTime = new Date(OldTime) - new Date();
        // const newExpiredTime = new Date(new Date().getTime() + newTime);
        // console.log(newExpiredTime);

        const OldUNIX = JSON.parse(getCookie('expired_timestamp'));
        const toISOString = new Date(OldUNIX);
        dispatch(listAddress(address.id));
        setCookie('user', JSON.stringify(hasil.data.user), OldUNIX);
        // Cookie.set('user', JSON.stringify(hasil.data.user), {
        //   expires: toISOString,
        //   secure: true,
        //   sameSite: 'strict',
        //   path: '/',
        // });
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
  const [loading, setLoading] = useState(false);
  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log(file.size);
    const MaxFileSize = 1024000 * 1;

    if (file.size < MaxFileSize) {
      setGantiFoto(file);
      const data = new FormData();
      data.append('photo', file);
      setLoading(true);
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/auth/user/update-photo/${username}`, data)
        .then((res) => {
          setLoading(false);
          console.log(res);
          window.location.reload();
        })
        .catch((error) => {
          setLoading(false);

          Swal.fire({
            title: `${error}`,
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
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        });

      // setImagePreview(URL.createObjectURL(file));
      //  const reader = new FileReader();
      // reader.onload(() => {
      //   setImagePreview(reader.result);
      // });
      //  reader.onload = (e) => {
      //    setImagePreview(e.target.result);
      //  };
      //  reader.readAsDataURL(e.target.files[0]);
    } else {
      Swal.fire({
        title: `The photo must not be greater than 1 MB.`,
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
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
  };
  const [LoadingResend, setLoadingResend] = useState(false);
  const [TextSend, setTextSend] = useState('');
  const onSubmitResend = (id) => {
    setLoadingResend(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/email/resend/${id}`, {
        headers: authHeader(),
      })
      .then((res) => {
        setLoadingResend(false);
        console.log(res);
        setTextSend(res.data.message);
      });
  };
  const konfirmasiemail = null;
  return (
    <Card className="border-0">
      <Card.Body className="p-0 ">
        <Row xl={2} lg={2} md={2} sm={12}>
          <Col xl={4} lg={4} className="d-flex flex-column justify-content-center ">
            {/* <i className="fa-solid fa-user fa-10x m-auto icon-profile"></i> */}
            <div style={{ maxHeight: '120px' }} className="d-flex justify-content-center">
              <img src={address.photo} height="100%" />
            </div>

            <span className="p-2  d-flex  w-100" style={{ position: 'relative' }}>
              <input onChange={(e) => handleImage(e)} className="css-19nhuia" type="file" name="profilePicture" accept="image/png, image/jpg, image/jpeg" />
              {loading ? (
                <Button variant="primary" className="m-auto w-50 css-dg3e5c-unf-btn">
                  <Spinner size="sm" animation="border" variant="warning" />
                  Loading ...
                </Button>
              ) : (
                <Button variant="primary" className="m-auto w-50 css-dg3e5c-unf-btn">
                  <i className="fas fa-edit"></i>Ubah Foto
                </Button>
              )}
            </span>
          </Col>

          <Col style={edit ? { display: 'block' } : { display: 'none' }} xs={12} md={8}>
            <table className="h-50 isi-content">
              {loadingUpdate ? (
                <tbody>
                  <tr>
                    <td>Email</td>

                    <td>
                      : <input style={{ border: '1px solid blue', borderRadius: 4 }} type={'text'} value={address.email} disabled />{' '}
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
              ) : (
                <tbody>
                  <tr>
                    <td>Loading...</td>
                  </tr>
                </tbody>
              )}
            </table>
            <Row className="p-2">
              <Button onClick={handleSimpan} variant="primary" className="w-25">
                <i className="fas fa-edit"></i>SIMPAN
              </Button>
            </Row>
          </Col>

          <Col style={edit ? { display: 'none' } : { display: 'block' }} xs={12} md={8}>
            <table className="h-50 isi-content">
              <tbody>
                <tr>
                  <td>Email</td>

                  <td>
                    : {address.email}
                    {address.email_verified_at === null ? (
                      LoadingResend ? (
                        <span style={{ marginLeft: '10px' }}>
                          <Spinner size="sm" animation="border" variant="warning" />
                        </span>
                      ) : TextSend ? (
                        <span style={{ marginLeft: '10px' }}>{TextSend}</span>
                      ) : (
                        <a href="#" onClick={() => onSubmitResend(address.id)} style={{ marginLeft: '10px', color: 'blue', textDecoration: 'underline' }}>
                          Resend confirmation email
                        </a>
                      )
                    ) : null}
                  </td>
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
