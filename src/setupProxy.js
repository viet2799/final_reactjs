/* eslint-disable */
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    proxy({
      target: 'https://dev.ims.anvita.com.vn',
      changeOrigin: true,
    }),
  );
};
