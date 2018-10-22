/**
 * 客户端webpack打包
 * @author luyanhong 2018-10-15
 */
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WEBPACK_COMMON_CONFIG = require('../config/index.js').WEBPACK_COMMON_CONFIG;
module.exports = merge(baseConfig, {
  entry: {
    app: path.resolve(__dirname, '../src/client-entry.js')
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          minChunks: 3,
          name: 'common',
          minSize: 1000
        },
        vendors: {
          test: /node_modules/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    },
  },
  plugins: [
    new CleanWebpackPlugin([
      `${WEBPACK_COMMON_CONFIG.assetsDirectory}/`,
      `${WEBPACK_COMMON_CONFIG.assetsDirectory}/js/`,
      `${WEBPACK_COMMON_CONFIG.assetsDirectory}/css/`,
      `${WEBPACK_COMMON_CONFIG.assetsDirectory}/img/`,
      `${WEBPACK_COMMON_CONFIG.assetsDirectory}/fonts`
    ], {
      root: WEBPACK_COMMON_CONFIG.projectRoot
    }),
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin()
  ]
});
