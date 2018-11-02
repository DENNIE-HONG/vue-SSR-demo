const proxyTable = {
  '/taobao': {
    target: 'https://suggest.taobao.com',
    changeOrigin: true,
    pathRewrite: { '^/taobao': '' }
  },
  '/jdapi': {
    target: 'https://wqcoss.jd.com',
    changeOrigin: true,
    pathRewrite: { '^/jdapi': '' }
  },
  '/kaola': {
    target: 'https://m.kaola.com',
    changeOrigin: true,
    pathRewrite: { '^/kaola': '' }
  }
};
module.exports = proxyTable;
