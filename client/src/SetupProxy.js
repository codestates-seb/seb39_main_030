// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    createProxyMiddleware([], {
      target: `http://ec2-54-180-106-244.ap-northeast-2.compute.amazonaws.com:8080`,
      changeOrigin: true,
      ws: true,
      router: {
        '/socket.io': 'ws://nginx:80',
      },
    })
  );
};
