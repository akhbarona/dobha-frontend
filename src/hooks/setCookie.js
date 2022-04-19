import Cookie from 'js-cookie';
const setCookie = (cookiename, value, expiresIn) => {
  let oneMinute = new Date(new Date().getTime() + expiresIn);
  Cookie.set(cookiename, value, {
    expires: 1800000,
    secure: true,
    sameSite: 'strict',
    path: '/',
  });
};
export default setCookie;
