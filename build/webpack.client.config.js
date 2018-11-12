/**
 * 客户端webpack打包
 * @author luyanhong 2018-10-15
 */
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const { WEBPACK_COMMON_CONFIG } = require('../config/index.js');
const isProd = process.env.NODE_ENV === 'production';
module.exports = merge(baseConfig, {
  entry: {
    app: path.resolve(__dirname, '../src/client-entry.js')
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          minChunks: 5,
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
  plugins: isProd ? [
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
    new VueSSRClientPlugin(),
    new SWPrecacheWebpackPlugin({
      cacheId: 'vue-SSR-demo',
      filepath: path.resolve(__dirname, '../sw.js'),
      stripPrefix: WEBPACK_COMMON_CONFIG.assetsDirectory,
      staticFileGlobs: [
        `${WEBPACK_COMMON_CONFIG.assetsDirectory}/fonts/*.*`
      ],
      minify: true,
      runtimeCaching: [{
        urlPattern: /\/js\/(.*)\.(.*)\.js$/,
        handler: 'cacheFirst',
        options: {
          cache: {
            name: 'js-cache',
            maxAgeSeconds: 60 * 60 * 24 * 7
          }
        }
      }, {
        urlPattern: /\/img\/(.*)\.(png|jpg|svg|gif)$/,
        handler: 'cacheFirst',
        options: {
          cache: {
            name: 'img-cache',
            maxAgeSeconds: 60 * 60 * 24 * 7
          }
        }
      }, {
        urlPattern: /^http:\/\/127\.0\.0\.1:4444\//,
        handler: 'networkFirst',
        options: {
          cache: {
            name: 'page-cache',
            maxEntries: 20
          }
        }
      }]
    })
  ] : [new CleanWebpackPlugin([
    `${WEBPACK_COMMON_CONFIG.assetsDirectory}/`,
    `${WEBPACK_COMMON_CONFIG.assetsDirectory}/js/`,
    `${WEBPACK_COMMON_CONFIG.assetsDirectory}/css/`,
    `${WEBPACK_COMMON_CONFIG.assetsDirectory}/img/`,
    `${WEBPACK_COMMON_CONFIG.assetsDirectory}/fonts`
  ], {
    root: WEBPACK_COMMON_CONFIG.projectRoot
  }),
  new VueSSRClientPlugin(),]
});
