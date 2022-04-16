import axios from 'axios';
const authHeader = () => {
  const token = JSON.parse(sessionStorage.getItem('token'));
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  if (token && token) {
    return { Authorization: 'Bearer ' + token };
  } else {
    return {};
  }
};

export default authHeader;
