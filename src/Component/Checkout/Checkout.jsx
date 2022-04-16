import { useEffect, useState, memo } from "react";
import CheckoutSUb from "./CheckoutSUb";
import { useSelector, useDispatch } from "react-redux";
import { getAddress as listAddress } from "../../redux/actions/addressActions";
import authService from "../service/auth.service";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Checkout = () => {
  const dispatch = useDispatch();
  const getAdress = useSelector((state) => state.getAdress);
  const { address, loading, error } = getAdress.address;
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const user = authService.getCurrentUser();
      dispatch(listAddress(user.id));
      if (!user) {
        navigate("/login");
      }
    } catch (er) {}
  }, [dispatch]);

  // console.log("data checout", address);
  return (
    <>
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
      ) : error ? (
        <div class="alert alert-danger" role="alert">
          {error}{" "}
        </div>
      ) : (
        <CheckoutSUb dataUser={address.data} />
      )}
    </>
  );
};

export default memo(Checkout);
