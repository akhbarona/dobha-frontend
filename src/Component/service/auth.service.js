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
  setTimeout(() => {
    dispatch(logoutUser());
  }, 1800000 - 10000);
};
const authService = {
  getCurrentUser,
  runLogoutTimer,
};
export default authService;
