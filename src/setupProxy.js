const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware('/api/auth/user/login', {
      target: 'https://dobha.herokuapp.com',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/auth/user/register', {
      target: 'https://dobha.herokuapp.com',
      changeOrigin: true,
    })
  );
  app.use(createProxyMiddleware('/api', {
  target: 'https://dobha.herokuapp.com',
  changeOrigin: true, }));
};
