import { useState, useEffect } from "react";
import { Col, Container, Form, Card, Button, Row } from "react-bootstrap";
import authHeader from "../service/auth.header";
import axios from "axios";


const provinsi = {
  provinsi: [
    {
      province_id: "1",
      province: "Bali",
    },
    {
      province_id: "2",
      province: "Bangka Belitung",
    },
    {
      province_id: "3",
      province: "Banten",
    },
    {
      province_id: "4",
      province: "Bengkulu",
    },
    {
      province_id: "5",
      province: "DI Yogyakarta",
    },
    {
      province_id: "6",
      province: "DKI Jakarta",
    },
    {
      province_id: "7",
      province: "Gorontalo",
    },
    {
      province_id: "8",
      province: "Jambi",
    },
    {
      province_id: "9",
      province: "Jawa Barat",
    },
    {
      province_id: "10",
      province: "Jawa Tengah",
    },
    {
      province_id: "11",
      province: "Jawa Timur",
    },
    {
      province_id: "12",
      province: "Kalimantan Barat",
    },
    {
      province_id: "13",
      province: "Kalimantan Selatan",
    },
    {
      province_id: "14",
      province: "Kalimantan Tengah",
    },
    {
      province_id: "15",
      province: "Kalimantan Timur",
    },
    {
      province_id: "16",
      province: "Kalimantan Utara",
    },
    {
      province_id: "17",
      province: "Kepulauan Riau",
    },
    {
      province_id: "18",
      province: "Lampung",
    },
    {
      province_id: "19",
      province: "Maluku",
    },
    {
      province_id: "20",
      province: "Maluku Utara",
    },
    {
      province_id: "21",
      province: "Nanggroe Aceh Darussalam (NAD)",
    },
    {
      province_id: "22",
      province: "Nusa Tenggara Barat (NTB)",
    },
    {
      province_id: "23",
      province: "Nusa Tenggara Timur (NTT)",
    },
    {
      province_id: "24",
      province: "Papua",
    },
    {
      province_id: "25",
      province: "Papua Barat",
    },
    {
      province_id: "26",
      province: "Riau",
    },
    {
      province_id: "27",
      province: "Sulawesi Barat",
    },
    {
      province_id: "28",
      province: "Sulawesi Selatan",
    },
    {
      province_id: "29",
      province: "Sulawesi Tengah",
    },
    {
      province_id: "30",
      province: "Sulawesi Tenggara",
    },
    {
      province_id: "31",
      province: "Sulawesi Utara",
    },
    {
      province_id: "32",
      province: "Sumatera Barat",
    },
    {
      province_id: "33",
      province: "Sumatera Selatan",
    },
    {
      province_id: "34",
      province: "Sumatera Utara",
    },
  ],
};

const Alamat = (props) => {
  const [prov, setProv] = useState("");
  const [idKota, setIdKota] = useState("");
  const [dataKota, setDataKota] = useState([]);
  const [kabkota, setKabKota] = useState("");
  const [alamat, setAlamat] = useState("");

  const handleChange = (e) => {
    setProv(e.target.value);
  };

  const handleChangeKota = (e) => {
    const data = e.target.value.split("-");
    const kota = data[0];
    const id = data[1];
    setIdKota(id);
    setKabKota(kota);
  };

  const getDataKota = async () => {
    const hasil = provinsi.provinsi.filter((item) => item["province"] === prov);
    if (hasil[0]?.province_id) {
      const dataSend = { id_prov: hasil[0]?.province_id };
      const getDataKota1 = await fetch(
        `https://apiongkir.herokuapp.com/api/kota`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataSend),
        }
      );

      const hasilDataKota1 = await getDataKota1.json();
      setDataKota(hasilDataKota1);
    }
  };

  useEffect(() => {
    getDataKota();
  }, [prov]);

  const handleSubmit = () => {
    const data = {
      name: props.dataUser.name,
      username: props.dataUser.username,
      email: props.dataUser.email,
      password: "12345678",
      phone_number: props.dataUser.phone_number,
      alamat: alamat?alamat:props.dataUser.alamat,
      provinsi: prov?prov:props.dataUser.provinsi,
      kabupaten: kabkota?kabkota:props.dataUser.kabupaten,
      id_kabupaten: idKota ? idKota : props.dataUser.id_kabupaten    
    };
    console.log(data);
    axios
      .post("/api/auth/user/update/admin", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader().Authorization,
        },
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(data);
  };


  return (
    <>
      <Row>
        <Col lg={6}>
          <Form.Group className="mb-1">
            <Form.Label>Provinsi</Form.Label>
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

        <Col lg={6}>
          {dataKota.length > 0 ? (
            <Form.Group className="mb-1">
              <Form.Label>Kota</Form.Label>
              <Form.Select
                defaultValue={props.dataUser.kabupaten}
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
        <Form.Label>Example textarea</Form.Label>
        {console.log(props.dataUser)}
        <Form.Control
          defaultValue={props.dataUser.alamat}
          onChange={(e) => setAlamat(e.target.value)}
          as="textarea"
          placeholder="Alamat detail"
          rows={3}
        />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary mt-2"
        >
          SIMPAN
        </button>
      </Form.Group>
    </>
  );
};

export default Alamat;
