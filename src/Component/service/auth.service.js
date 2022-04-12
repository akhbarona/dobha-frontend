import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL);
const signup = (name, username, email, phone_number, password) => {
  const data = {
    name: name,
    username: username,
    email: email,
    phone_number: phone_number,
    password: password,
  };

  return axios
    .post('/api/auth/user/register', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      // console.log(res);
      if (res.data.user) {
        sessionStorage.setItem('user', JSON.stringify(res.data));
      }
      return res.data;
    });
};

const login = (email, password) => {
  const data = {
    email: email,
    password: password,
  };
  return axios
    .post('/api/auth/user/login', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      // console.log(response);
      if (response.data.token) {
        sessionStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  axios.post('/api/auth/user/logout').then((res) => console.log(res.data.message));
  sessionStorage.clear();
};

const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem('user'));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};
export default authService;
