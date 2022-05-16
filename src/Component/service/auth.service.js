import getCookie from '../../hooks/getCookie';
import { logoutUser } from '../../redux/actions/authActions';

const getCurrentUser = () => {
  // return JSON.parse(sessionStorage.getItem('user'));
  const userCookie = getCookie('user');
  if (userCookie && userCookie) {
    return JSON.parse(userCookie);
  }
};
const runLogoutTimer = (dispatch, timer) => {
  const oneMinute = new Date(new Date().getTime() + timer);
  console.log(oneMinute);
  const dateNow = new Date();
  const myTimetoExpired = oneMinute - dateNow;
  console.log(myTimetoExpired);
  console.log(myTimetoExpired - 5000);
  setTimeout(() => {
    dispatch(logoutUser());
  }, myTimetoExpired - 5000);
};
const authService = {
  getCurrentUser,
  runLogoutTimer,
};
export default authService;
