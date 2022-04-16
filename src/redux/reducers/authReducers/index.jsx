import { ADD_NEW_USER, LOGIN_USER, LOGOUT_USER } from '../../actions/authActions';
import Swal from 'sweetalert2';

const user = {};

export const authUserReducers = (state = user, action) => {
  switch (action.type) {
    case ADD_NEW_USER:
      Swal.fire({ title: 'Terima Kasih Telah Mendaftar!', text: 'E-mail verifikasi telah dikirim silahkan cek e-mail anda', icon: 'success', showConfirmButton: true });
      return {
        ...state,
        isSuccess: true,
        users: action.payload,
      };
    case LOGIN_USER:
      Swal.fire({ title: 'Selamat Anda Telah Login, Silahkan Berbelanja!', icon: 'success', showConfirmButton: false });
      return {
        ...state,
        isSuccess: true,
      };
    case LOGOUT_USER:
      sessionStorage.clear();
      Swal.fire({ title: 'Anda Telah Logout!', icon: 'success', showConfirmButton: true });
      return {
        isLogout: true,
      };
    default:
      return state;
  }
};
