import axios from 'axios';
import getCookie from '../../hooks/getCookie';

const authHeader = () => {
  // const token = JSON.parse(sessionStorage.getItem('token'));
  const token = JSON.parse(getCookie('token'));
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  if (token && token) {
    return { Authorization: 'Bearer ' + token };
  } else {
    return {};
  }
};

export default authHeader;
