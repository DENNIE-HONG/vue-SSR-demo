/**
 * webpack通用配置
 * @author luyanhong 2018-10-15
*/
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WEBPACK_COMMON_CONFIG = require('../config/index.js').WEBPACK_COMMON_CONFIG;
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const WEBPACK_PROD_CONFIG = require('../config/index.js').WEBPACK_PROD_CONFIG;
module.exports = {
  mode: 'production',
  resolve: {
    extensions: ['.js','.vue'],
    alias: {
      assets: path.resolve(__dirname, '../src/assets'),
      coms: path.resolve(__dirname, '../src/components'),
      config: path.resolve(__dirname, '../config'),
      utils: path.resolve(__dirname, '../src/utils'),
      views: path.resolve(__dirname, '../src/views'),
      service: path.resolve(__dirname, '../src/service'),
    }
  },
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    path: WEBPACK_PROD_CONFIG.assetsDirectory,
    publicPath: WEBPACK_PROD_CONFIG.assetsPublicPath
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            drop_console: true
          },
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        },
      })
    ],
    moduleIds: 'hashed'
  },
  plugins: [
    new VueLoaderPlugin(),
    new StyleLintPlugin({
      files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [path.resolve(__dirname, '../src/assets/vars.scss'), path.resolve(__dirname, '../src/assets/mixins.scss')]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'img/[name].[hash:7].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
              name: 'fonts/[name].[hash:7].[ext]'
            }
          }
        ]
      }
    ]
  }
};
