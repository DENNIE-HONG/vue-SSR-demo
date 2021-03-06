/**
 * server的入口文件
 * @author luyanhong 2018-10-15
*/
import { createApp } from './main';
const isDev = process.env.NODE_ENV !== 'production';
const token = 'vue_token';
export default (context) => new Promise((resolve, reject) => {
  const s = isDev && Date.now();
  const { url, cookie } = context;
  const { app, router, store } = createApp(cookie && cookie[token]);
  const { fullPath } = router.resolve(url).route;
  if (fullPath !== url) {
    return reject({ url: fullPath });
  }
  router.push(url);
  // wait until router has resolved possible async hooks
  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents();
    if (!matchedComponents.length) {
      return reject({ code: 404 });
    }
    // Call fetchData hooks on components matched by the route.
    // A preFetch hook dispatches a store action and returns a Promise,
    // which is resolved when the action is complete and store state has been
    // updated.
    Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
      store,
      route: router.currentRoute
    }))).then(() => {
      isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`);
      // 在所有预取钩子(preFetch hook) resolve 后，
      // 我们的 store 现在已经填充入渲染应用程序所需的状态。
      // 当我们将状态附加到上下文，
      // 并且 `template` 选项用于 renderer 时，
      // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
      context.state = store.state;
      store.dispatch('USER', cookie);
      resolve(app);
    }).catch(reject);
  }, reject);
});
