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
const PORT = 4444;

const resolve = file => path.resolve(__dirname, file);
const app = new Koa();
const router = new KoaRuoter();
const template = fs.readFileSync(resolve('./index.html'), 'utf-8');

function createRenderer (bundle, options) {
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      template,
      runInNewContext: false
    })
  )
}
const bundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');
let renderer = createRenderer(bundle, {
  clientManifest
})
/**
 * 渲染函数
 * @param ctx
 * @param next
 * @returns {Promise}
 */
function render (ctx, next) {
  ctx.set('Content-Type', 'text/html');
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
      resolve();
    })
  })
}
router.get('*', render);
app.use(serve('/', path.join(__dirname, '/dist')))
   .use(router.routes())
   .use(router.allowedMethods())
   .listen(PORT, () => {
    console.log(`server started at localhost:${PORT}`)
   });
