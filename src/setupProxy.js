const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://192.168.100.74:8080/TegaCEPP17_2023Produx',
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/api': '' },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'token': 'askldjuiawe8981dnnu3y471231j0qkd903jfnfu3h487'
      },
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('token', 'askldjuiawe8981dnnu3y471231j0qkd903jfnfu3h487');
        proxyReq.setHeader('Content-Type', 'application/json;charset=UTF-8');
      }
    })
  );
};
