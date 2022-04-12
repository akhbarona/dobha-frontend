const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/api/auth/user/login', {
      target: 'https://dobha.000webhostapp.com',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/auth/user/register', {
      target: 'https://dobha.000webhostapp.com',
      changeOrigin: true,
    })
  );
  app.use(createProxyMiddleware("/api", {
  target: 'https://dobha.000webhostapp.com',
  changeOrigin: true, }));
  // app.use(
  //   createProxyMiddleware('/api/auth/user/update/test', {
  //     target: 'https://dobha.000webhostapp.com',
  //     changeOrigin: true,
  //   })
  // );
};
