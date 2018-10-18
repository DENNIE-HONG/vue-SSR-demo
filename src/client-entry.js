/**
 * client的入口文件
 * @author luyanhong 2018-10-15
 */
import Vue from 'vue';
import { createApp } from './main';
// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options;
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next);
    } else {
      next();
    }
  }
});

const { app, router, store } = createApp();
// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
router.onReady(() => {
  // 添加路由钩子函数，用于处理 asyncData.
  // 在初始路由 resolve 后执行，
  // 以便我们不会二次预取(double-fetch)已有的数据。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    let diffed = false;
    const activated = matched.filter((c, i) => diffed || (diffed = (prevMatched[i] !== c)));
    const asyncDataHooks = activated.map((c) => c.asyncData).filter((_) => _);
    if (!asyncDataHooks.length) {
      return next();
    }
    Promise.all(asyncDataHooks.map((hook) => hook({ store, route: to })))
      .then(() => {
        next();
      })
      .catch(next)
  });
  app.$mount('#app')
});
