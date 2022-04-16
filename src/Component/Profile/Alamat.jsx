import { useState, useEffect } from "react";
import { Col, Container, Form, Card, Button, Row } from "react-bootstrap";
import authHeader from "../service/auth.header";
import axios from "axios";
import Swal from 'sweetalert2';
import './Alamat.css';
const provinsi = {
  provinsi: [
    {
      province_id: '1',
      province: 'Bali',
    },
    {
      province_id: '2',
      province: 'Bangka Belitung',
    },
    {
      province_id: '3',
      province: 'Banten',
    },
    {
      province_id: '4',
      province: 'Bengkulu',
    },
    {
      province_id: '5',
      province: 'DI Yogyakarta',
    },
    {
      province_id: '6',
      province: 'DKI Jakarta',
    },
    {
      province_id: '7',
      province: 'Gorontalo',
    },
    {
      province_id: '8',
      province: 'Jambi',
    },
    {
      province_id: '9',
      province: 'Jawa Barat',
    },
    {
      province_id: '10',
      province: 'Jawa Tengah',
    },
    {
      province_id: '11',
      province: 'Jawa Timur',
    },
    {
      province_id: '12',
      province: 'Kalimantan Barat',
    },
    {
      province_id: '13',
      province: 'Kalimantan Selatan',
    },
    {
      province_id: '14',
      province: 'Kalimantan Tengah',
    },
    {
      province_id: '15',
      province: 'Kalimantan Timur',
    },
    {
      province_id: '16',
      province: 'Kalimantan Utara',
    },
    {
      province_id: '17',
      province: 'Kepulauan Riau',
    },
    {
      province_id: '18',
      province: 'Lampung',
    },
    {
      province_id: '19',
      province: 'Maluku',
    },
    {
      province_id: '20',
      province: 'Maluku Utara',
    },
    {
      province_id: '21',
      province: 'Nanggroe Aceh Darussalam (NAD)',
    },
    {
      province_id: '22',
      province: 'Nusa Tenggara Barat (NTB)',
    },
    {
      province_id: '23',
      province: 'Nusa Tenggara Timur (NTT)',
    },
    {
      province_id: '24',
      province: 'Papua',
    },
    {
      province_id: '25',
      province: 'Papua Barat',
    },
    {
      province_id: '26',
      province: 'Riau',
    },
    {
      province_id: '27',
      province: 'Sulawesi Barat',
    },
    {
      province_id: '28',
      province: 'Sulawesi Selatan',
    },
    {
      province_id: '29',
      province: 'Sulawesi Tengah',
    },
    {
      province_id: '30',
      province: 'Sulawesi Tenggara',
    },
    {
      province_id: '31',
      province: 'Sulawesi Utara',
    },
    {
      province_id: '32',
      province: 'Sumatera Barat',
    },
    {
      province_id: '33',
      province: 'Sumatera Selatan',
    },
    {
      province_id: '34',
      province: 'Sumatera Utara',
    },
  ],
};

const Alamat = (props) => {
  const [prov, setProv] = useState('');
  const [idKota, setIdKota] = useState('');
  const [dataKota, setDataKota] = useState([]);
  const [kabkota, setKabKota] = useState('');
  const [alamat, setAlamat] = useState('')
  const [loading , setLoading] = useState(false);
console.log(props.dataUser)

  const handleChange = (e) => {
    setProv(e.target.value);
  };

  const handleChangeKota = (e) => {
    const data = e.target.value.split('-');
    const kota = data[0];
    const id = data[1];
    setIdKota(id);
    setKabKota(kota);
  };

  const getDataKota = async () => {
    const hasil = provinsi.provinsi.filter((item) => item['province'] === prov);
    // console.log(hasil[0].province_id)
    if (hasil[0]?.province_id) {
      const dataSend = { id_prov: hasil[0]?.province_id };
      const getDataKota1 = await fetch(`http://localhost:3002/api/kota`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataSend),
      });

      const hasilDataKota1 = await getDataKota1.json();
      setDataKota(hasilDataKota1);
    }
  };

  useEffect(() => {
    getDataKota();
  }, [prov]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!alamat || ! prov || ! idKota || ! kabkota){
      Swal.fire({
        title: 'Form Harus Terisi Semua',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
      })
      return;
    }
    setLoading(true)
    const data = {
      alamat: alamat ,
      provinsi: prov ,
      kabupaten: kabkota ,
      id_kabupaten: parseInt(idKota),
    };
     
    axios
      .post(`https://dobha.herokuapp.com/api/auth/user/update-alamat/${props.dataUser.username}`, data, {
        headers: {
          "Content-Type": "application/json",
           Authorization: authHeader().Authorization,
        },
      })
      .then((data) => {
        // console.log(data)
       if(data.status === 200){
        setLoading(false)
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
          `
        })
      
       }else{
        setLoading(false)
        Swal.fire({
          title: 'Kesalahan Serever 1',
          width: 600,
          padding: '3em',
          color: '#716add',
          background: '#fff url(/images/trees.png)',
          backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `
        })
       }
      })
      .catch((error) => {
        // console.log(error.response && error.response.data.message ? error.response.data.message : error.message)
        setLoading(false)
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
          `
        })
      });

  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={12}>
            <Form.Group className="mb-1">
              <Form.Label style={{color:'black',fontSize:14,fontWeight:'bold'}}>Provinsi</Form.Label>
              <Form.Select
                defaultValue={props.dataUser.provinsi}
                onChange={(e) => handleChange(e)}
              >
                <option value="">Pilih Provinsi</option>
                {provinsi.provinsi.map((prov, index) => {
                  return (
                    <option key={index} value={prov.province}>
                      {prov.province}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col lg={12}>
            {dataKota.length > 0 ? (
              <Form.Group className="mb-1">
                <Form.Label style={{color:'black',fontSize:14,fontWeight:'bold'}}>Kota</Form.Label>
                <Form.Select
                  defaultValue={`${props.dataUser.kabupaten}-${props.dataUser.id_kabupaten}`}
                  onChange={(e) => handleChangeKota(e)}
                >
                  <option value="">Pilih Kota</option>
                  {dataKota.map((kab, index) => {
                    return (
                      <option
                        key={index}
                        value={`${kab.city_name}-${kab.city_id}`}
                      >
                        {kab.city_name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
          <Form.Label style={{color:'black',fontSize:14,fontWeight:'bold'}}>Alamat Detail</Form.Label>
          <Form.Control
            defaultValue={props.dataUser.alamat}
            onChange={(e) => setAlamat(e.target.value)}
            as="textarea"
            placeholder="Alamat detail"
            rows={3}
          />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
         {
           loading?
           <Button type="button" className="btn btn-primary mt-2" disabled>
           Loading...
         </Button>:
          <Button type="submit" className="btn btn-primary mt-2">
          SIMPAN
        </Button>
         }
        </Form.Group>
      </Form>
    </>
  );
};

export default Alamat;
