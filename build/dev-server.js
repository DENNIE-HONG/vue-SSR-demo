/**
 * dev开发脚本
 * 参考https://github.com/vuejs/vue-hackernews-2.0/blob/master/build/setup-dev-server.js
*/
const fs = require('fs');
const path = require('path');
const MFS = require('memory-fs');
const webpack = require('webpack');
const chokidar = require('chokidar');
const clientConfig = require('./webpack.client.config');
const serverConfig = require('./webpack.server.config');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');

const readFile = (fs, file) => {
  try {
    return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8');
  } catch (e) {
    console.error(e);
  }
};
module.exports = function setupDevServer (app, templatePath, cb) {
  let bundle;
  let template;
  let clientManifest;

  let ready;
  const readyPromise = new Promise(r => { ready = r; });
  const update = () => {
    if (bundle && clientManifest) {
      ready();
      cb(bundle, {
        template,
        clientManifest
      });
    }
  };

  // read template from disk and watch
  template = fs.readFileSync(templatePath, 'utf-8');
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8');
    console.log('index.html template updated.');
    update();
  });

  // modify client config to work with hot middleware
  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app];
  clientConfig.output.filename = '[name].js';
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );

  // dev middleware
  const clientCompiler = webpack(clientConfig);
  const webpackDevMiddleware = devMiddleware(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true
  });
  app.use(webpackDevMiddleware);
  clientCompiler.plugin('done', stats => {
    stats = stats.toJson();
    stats.errors.forEach(err => console.error(err));
    stats.warnings.forEach(err => console.warn(err));
    if (stats.errors.length) return;
    clientManifest = JSON.parse(readFile(
      webpackDevMiddleware.fileSystem,
      'vue-ssr-client-manifest.json'
    ));
    update();
  });

  // hot middleware
  app.use(hotMiddleware(clientCompiler, { heartbeat: 5000 }));

  // watch and update server renderer
  const serverCompiler = webpack(serverConfig);
  const mfs = new MFS();
  serverCompiler.outputFileSystem = mfs;
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    stats = stats.toJson();
    if (stats.errors.length) {
      console.error(stats.errors);
      throw stats.errors;
    }
    // read bundle generated by vue-ssr-webpack-plugin
    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'));
    update();
  });

  return readyPromise;
};
