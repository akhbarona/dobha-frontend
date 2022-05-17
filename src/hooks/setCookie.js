import Cookie from 'js-cookie';
const setCookie = (cookiename, value, expiresIn) => {
  // const oneMinute = new Date(new Date().getTime() + expiresIn);

  const toISOString = new Date(expiresIn); // <- example 2022-05-17T16:10:36.540Z

  // if (cookiename === 'expired') {
  //   Cookie.set(cookiename, JSON.stringify(oneMinute), {
  //     expires: oneMinute,
  //     secure: true,
  //     sameSite: 'strict',
  //     path: '/',
  //   });
  // } else if (cookiename === 'expired_timestamp') {
  //   Cookie.set(cookiename, value, {
  //     expires: toISOString,
  //     secure: true,
  //     sameSite: 'strict',
  //     path: '/',
  //   });
  // } else {
  //   Cookie.set(cookiename, value, {
  //     expires: toISOString,
  //     secure: true,
  //     sameSite: 'strict',
  //     path: '/',
  //   });
  // }

  Cookie.set(cookiename, value, {
    expires: toISOString,
    secure: true,
    sameSite: 'strict',
    path: '/',
  });
};
export default setCookie;
