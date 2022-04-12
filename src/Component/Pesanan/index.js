import { Container } from "react-bootstrap"
import CardPesanan from "./CardPesanan";
import { useState , useEffect } from "react";
import AuthService from '../service/auth.service';
import { useNavigate } from "react-router-dom";

const Pesanan = () => {
    const navigate = useNavigate();

   
    const [dataUser, setUser] =  useState({ data: [], loading: true});
    
    
    useEffect(() => {
       try{
        const user = AuthService.getCurrentUser();
        if (!user) {
          navigate("/login");
        }
        setUser(prevState => ({
            ...prevState,
            data: user,
            loading: false
        }));
       }catch(err){
        navigate("/login");
           console.log(err)
       }
      }, []);

    // console.log('dataUser' , dataUser.data)
    return(
        <Container className="mt-5" style={{height: 450}}>
            {
                 dataUser.loading?
                <h1>loading</h1>:
                <CardPesanan dataUser={dataUser.data.user}/>
            }
           
        </Container>
    )
}

export default Pesanan;