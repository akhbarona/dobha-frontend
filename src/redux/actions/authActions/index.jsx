import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authHeader from '../../../Component/service/auth.header';
import setCookie from '../../../hooks/setCookie';
import Authservice from '../../../Component/service/auth.service';
export const ADD_NEW_USER = 'ADD_NEW_USER';

export const LOGIN_USER = 'LOGIN_USER';

export const LOGOUT_USER = 'LOGOUT_USER';

const API_URL = process.env.REACT_APP_API_URL;

export const createNewUser = (data_user) => async (dispatch, getState) => {
  console.log(data_user);
  try {
    const { data } = await axios.post(`${API_URL}/api/auth/user/register`, data_user);
    console.log(data);
    dispatch({
      type: ADD_NEW_USER,
      payload: data,
    });

    // Swal.fire({
    //   position: 'center',
    //   icon: 'success',
    //   title: `${error.response?.data?.message}`,
    //   showConfirmButton: false,
    //   timer: 5000,
    // });
  } catch (error) {
    // console.log(error.response?.data);
    toast.error(error.response?.data?.message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    toast.error(error.response?.data?.errors?.email[0], {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    toast.error(error.response?.data?.errors?.username[0], {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
    toast.error(error.response?.data?.errors?.password[0], {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }
};

export const loginUser = (data_user) => async (dispatch, getState) => {
  console.log(data_user);
  try {
    const { data } = await axios.post(`${API_URL}/api/auth/user/login`, data_user);
    // console.log(data);
    // sessionStorage.setItem('token', JSON.stringify(data.token));
    // sessionStorage.setItem('user', JSON.stringify(data.user));
    // sessionStorage.setItem('expired', JSON.stringify(data.expired_token));
    setCookie('token', JSON.stringify(data.token), data.expired_token);
    setCookie('user', JSON.stringify(data.user), data.expired_token);
    // setCookie('expired', data.expired_token, data.expired_token);
    Authservice.runLogoutTimer(dispatch, data.expired_token);
    dispatch({
      type: LOGIN_USER,
    });
  } catch (error) {
    // console.log(error.response);
    toast.error(error.response?.data?.error, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_URL}/api/auth/user/logout`, {
      headers: authHeader(),
    });
    // console.log(data);
    dispatch({
      type: LOGOUT_USER,
    });
  } catch (error) {
    console.log(error.message);
  }
};
