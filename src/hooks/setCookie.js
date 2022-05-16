import Cookie from 'js-cookie';
const setCookie = (cookiename, value, expiresIn) => {
  const oneMinute = new Date(new Date().getTime() + expiresIn);
  if (cookiename === 'expired') {
    Cookie.set(cookiename, JSON.stringify(oneMinute), {
      expires: oneMinute,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
  } else {
    Cookie.set(cookiename, value, {
      expires: oneMinute,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
  }
};
export default setCookie;
