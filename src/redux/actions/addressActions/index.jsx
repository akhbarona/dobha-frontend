import axios from 'axios';
export const GET_ADDRES_REQUEST = 'GET_ADDRES_REQUEST';
export const GET_ADDRES_SUCCESS = 'GET_ADDRES_SUCCESS';
export const GET_ADDRESS_FAIL = 'GET_ADDRESS_FAIL';


export const getAddress = (id) => async (dispatch) => {
    try {
      dispatch({ type: GET_ADDRES_REQUEST });
      const { data } = await axios.get(`https://dobha.herokuapp.com/api/user/${id}`);
      dispatch({
        type: GET_ADDRES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ADDRESS_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
  