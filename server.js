/**
 * 服务端渲染脚本
 * @author luyanhong 2018-10-15
 */
const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const KoaRuoter = require('koa-router');
const serve = require('koa-static2');
const { createBundleRenderer } = require('vue-server-renderer');
const LRU = require('lru-cache');
const PORT = 4444;
const isProd = process.env.NODE_ENV === 'production';
const resolve = file => path.resolve(__dirname, file);
const app = new Koa();
const router = new KoaRuoter();
const templatePath = resolve('./index.html');

function createRenderer (bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    basedir: resolve('./dist'),
    runInNewContext: false
    }))
}
let renderer;
let readyPromise;
if (isProd) {
  // In production: create server renderer using template and built server bundle.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const template = fs.readFileSync(templatePath, 'utf-8')
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  // The client manifests are optional, but it allows the renderer
  // to automatically infer preload/prefetch links and directly add <script>
  // tags for any async chunks used during render, avoiding waterfall requests.
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  });
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  readyPromise = require('./build/dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}

// const bundle = require('./dist/vue-ssr-server-bundle.json');
// const clientManifest = require('./dist/vue-ssr-client-manifest.json');
// let renderer = createRenderer(bundle, {
//   clientManifest
// });
/**
 * 渲染函数
 * @param ctx
 * @param next
 * @returns {Promise}
 */
function render (ctx, next) {
  ctx.set('Content-Type', 'text/html');
  const s = Date.now();
  return new Promise (function (resolve, reject) {
    const handleError = err => {
      if (err && err.code === 404) {
        ctx.status = 404;
        ctx.body = '404 | Page Not Found';
      } else {
        ctx.status = 500;
        ctx.body = '500 | Internal Server Error';
        console.error(`error during render : ${ctx.url}`);
        console.error(err.stack);
      }
      resolve();
    }
    const context = {
      title: '测试ssr',
      url: ctx.url
    };
    // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
    // 现在我们的服务器与应用程序已经解耦！
    renderer.renderToString(context, (err, html) => {
      if (err) {
        return handleError(err);
      }
      ctx.body = html;
      if (!isProd) {
        console.log(`whole request: ${Date.now() - s}ms`);
      }
      resolve();
    })
  })
}

router.get('/', async (ctx, next) => {
  if (isProd) {
    await render(ctx, next);
  } else {
    await readyPromise.then(() => render(ctx, next));
  }
});
app.use(serve('/', path.join(__dirname, '/dist')))
   .use(router.routes())
   .use(router.allowedMethods())
   .listen(PORT, () => {
    console.log(`server started at localhost:${PORT}`)
   });
