import { Container } from "react-bootstrap"
import CardPesanan from "./CardPesanan";
import { useState , useEffect } from "react";

const Pesanan = () => {
    const[pesanan, setPesanan] = useState([]);

    const getPesanan = () => {

        fetch(`http://localhost:3002/api/pesanan/admin@admin.com`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(data => data.json())
        .then(res => {
            setPesanan(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getPesanan()
    },[])

    console.log(pesanan)
    return(
        <Container className="mt-5" style={{height: 450}}>
            {
                pesanan.length === 0?
                <h1>loading</h1>:
                <CardPesanan pesanan={pesanan}/>
            }
           
        </Container>
    )
}

export default Pesanan;