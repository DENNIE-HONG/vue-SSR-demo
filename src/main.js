/**
 * 入口文件
 * @author luyanhong 2018-10-15
*/
// import 'assets/main.scss';
import Vue from 'vue';
import App from './App.vue';
import { sync } from 'vuex-router-sync';
import VueLazyload from 'vue-lazyload';
import VueTouch from 'vue-touch-hotfix';
import Meta from 'vue-meta';
import VueJsonp from 'vue-jsonp';
// 引入插件
import createRouter from './plugins/router';
import inject from './plugins/inject.js';
require('./plugins/componentRegister.js');

import { createStore } from './store';
import loadingImg from 'assets/img/loading.gif';
import errorImg from 'assets/img/error.png';
Vue.use(Meta);
Vue.use(inject);
Vue.use(VueJsonp);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorImg,
  loading: loadingImg,
  attempt: 1
});
Vue.use(VueTouch, { name: 'v-touch' });
export function createApp (token) {
  // 创建 router 和 store 实例
  const router = createRouter(token);
  const store = createStore();
  // 同步路由状态(route state)到 store
  sync(store, router);
  const app = new Vue({
    router,
    store,
    render: (h) => h(App)
  });
  return { app, router, store };
}
