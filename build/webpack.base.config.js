/**
 * webpack通用配置
 * @author luyanhong 2018-10-15
*/
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WEBPACK_COMMON_CONFIG } = require('../config/index.js');
const isProd = process.env.NODE_ENV === 'production';

const config = {
  resolve: {
    extensions: ['.js','.vue', '.json'],
    alias: {
      assets: path.resolve(__dirname, '../src/assets'),
      coms: path.resolve(__dirname, '../src/components'),
      config: path.resolve(__dirname, '../config'),
      utils: path.resolve(__dirname, '../src/utils'),
      views: path.resolve(__dirname, '../src/views'),
      api: path.resolve(__dirname, '../src/api'),
      store: path.resolve(__dirname, '../src/store')
    }
  },
  devtool: isProd ? false : '#cheap-module-source-map',
  mode: isProd ? 'production': 'development',
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    path: WEBPACK_COMMON_CONFIG.assetsDirectory,
    publicPath: WEBPACK_COMMON_CONFIG.assetsPublicPath,
    chunkFilename: 'js/[name].[chunkhash:8].js'
  },
  plugins: isProd ? [
    new VueLoaderPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: 'css/[name].[contenthash:8].css',
    //   chunkFilename: 'css/[name].[contenthash:8].css'
    // })
  ]: [
    new VueLoaderPlugin(),
    new StyleLintPlugin({
      files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
    }),
    // new MiniCssExtractPlugin({
    //   filename: 'css/[name].css',
    //   chunkFilename: 'css/[name].css'
    // })
  ],
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: isProd ? 'babel-loader' : ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProd
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !isProd
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProd
            }
          },
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
              name: isProd ? 'img/[name].[hash:7].[ext]' : 'img/[name].[ext]'
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
              name: isProd ? 'fonts/[name].[hash:7].[ext]': 'fonts/[name].[ext]'
            }
          }
        ]
      }
    ]
  }
};
isProd && (config.optimization = {
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
});

module.exports = config;

