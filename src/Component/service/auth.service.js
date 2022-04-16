const getCurrentUser = () => {
  return JSON.parse(sessionStorage.getItem('user'));
};

const authService = {
  getCurrentUser,
};
export default authService;
