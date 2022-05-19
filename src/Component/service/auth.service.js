import getCookie from '../../hooks/getCookie';
import { logoutUser } from '../../redux/actions/authActions';
import jwt_decode from 'jwt-decode';
const getCurrentUser = () => {
  // return JSON.parse(sessionStorage.getItem('user'));
  const userCookie = getCookie('user');
  if (userCookie && userCookie) {
    return JSON.parse(userCookie);
  }
};
const getToken = () => {
  // return JSON.parse(sessionStorage.getItem('user'));
  const token = getCookie('token');
  if (token && token) {
    return jwt_decode(JSON.parse(token));
  }
};
// const runLogoutTimer = (dispatch, timer) => {
//   // const oneMinute = new Date(new Date().getTime() + timer);
//   // console.log(oneMinute);
//   // const dateNow = new Date();
//   // const myTimetoExpired = oneMinute - dateNow;
//   // console.log(myTimetoExpired);
//   // console.log(myTimetoExpired - 5000);

//   const tanggalKedepan = new Date(timer); // <- 2022-05-17T16:10:36.540Z
//   console.log(tanggalKedepan);

//   const tanggalSekarang = new Date(); // <- 2022-05-17T16:10:36.540Z
//   console.log(tanggalSekarang);

//   const berapaDetik = tanggalKedepan - tanggalSekarang;
//   console.log(berapaDetik);
//   setTimeout(() => {
//     dispatch(logoutUser());
//   }, berapaDetik - 5000); // <- dikurang 5s
// };

const authService = {
  getCurrentUser,
  // runLogoutTimer,
  getToken,
};
export default authService;
