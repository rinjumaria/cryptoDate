const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/v3/markets/summaries',
    createProxyMiddleware({
      target: 'https://api.bittrex.com',
      changeOrigin: true,
    })
  );
};