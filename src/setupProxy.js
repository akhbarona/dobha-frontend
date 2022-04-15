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
  app.use(
    createProxyMiddleware('/api/auth/user/logout', {
      target: 'https://dobha.000webhostapp.com',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/product/update-review', {
      target: 'https://dobha.000webhostapp.com',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/product/review-product', {
      target: 'https://dobha.000webhostapp.com',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/read-all-product', {
      target: 'https://dobha.000webhostapp.com',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/read-product/', {
      target: 'https://dobha.000webhostapp.com',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/read-all-article', {
      target: 'https://dobha.000webhostapp.com',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/newest-articles', {
      target: 'https://dobha.000webhostapp.com',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/popular-products', {
      target: 'https://dobha.000webhostapp.com',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/newest-products', {
      target: 'https://dobha.000webhostapp.com',
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/api/read-article', {
      target: 'https://dobha.000webhostapp.com',
      changeOrigin: true,
    })
  );
  // app.use(
  //   createProxyMiddleware('/api/auth/user/update/test', {
  //     target: 'https://dobha.000webhostapp.com',
  //     changeOrigin: true,
  //   })
  // );
};
