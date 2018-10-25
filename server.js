/**
 * 服务端渲染脚本
 * @author luyanhong 2018-10-15
 */
const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const KoaRuoter = require('koa-router');
const serve = require('koa-static');
const proxy = require('koa-server-http-proxy');
const { createBundleRenderer } = require('vue-server-renderer');
const LRU = require('lru-cache');
const favicon = require('koa-favicon');
const PORT = 4444;
const isProd = process.env.NODE_ENV === 'production';
const resolve = file => path.resolve(__dirname, file);
const app = new Koa();
const router = new KoaRuoter();
const templatePath = resolve('./index.html');
const proxyTable = require('./config/proxy');
function createRenderer (bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    basedir: resolve('./dist'),
    runInNewContext: false
  }));
}
let renderer;
let readyPromise;
if (isProd) {
  // In production: create server renderer using template and built server bundle.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const template = fs.readFileSync(templatePath, 'utf-8');
  const bundle = require('./dist/vue-ssr-server-bundle.json');
  // The client manifests are optional, but it allows the renderer
  // to automatically infer preload/prefetch links and directly add <script>
  // tags for any async chunks used during render, avoiding waterfall requests.
  const clientManifest = require('./dist/vue-ssr-client-manifest.json');
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  });
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  readyPromise = require('./build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options);
    }
  );
}

app.use(serve(path.resolve(__dirname, './dist')))
  .use(favicon(__dirname + '/favicon.ico'));
// proxy
Object.keys(proxyTable).forEach((context) => {
  const options = proxyTable[context];
  app.use(proxy(context, options));
});


const renderData = (ctx, renderer) => {
  const context = {
    url: ctx.url
  };
  if (!isProd) {
    readyPromise.then( () => {
      return new Promise( (resolve, reject) => {
        renderer.renderToString(context, (err, html) => {
          if (err) {
            return reject(err);
          }
          resolve(html);
        });
      });
    });
  }
  return new Promise( (resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      if (err) {
        return reject(err);
      }
      resolve(html);
    });
  });
};

router.get('*', async (ctx, next) => {
  const s = Date.now();
  let html,status;
  try {
    html = await renderData(ctx, renderer);
  } catch(e) {
    if (e.code === 404) {
      status = 404;
      html = '404 | Not Found';
    }else {
      status = 500;
      html = '500 | Internal Server Error';
      console.error(`error during render : ${ctx.url}`);
    }
  }
  ctx.type = 'html';
  ctx.status = status ? status : ctx.status;
  ctx.body = html;
  if (!isProd) {
    console.log(`whole request: ${Date.now() - s}ms`);
  }
});
app.use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT, () => {
    console.log(`server started at 127.0.0.1:${PORT}`);
  });
