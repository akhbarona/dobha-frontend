import Cookie from 'js-cookie';
const setCookie = (cookiename, value, expiresIn) => {
  // let oneMinute = new Date(new Date().getTime() + expiresIn);
  let oneMinute = new Date(new Date().getTime() + 1800000);
  Cookie.set(cookiename, value, {
    expires: oneMinute,
    secure: true,
    sameSite: 'strict',
    path: '/',
  });
};
export default setCookie;
