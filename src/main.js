/**
 * 入口文件
 * @author luyanhong 2018-10-15
*/
import Vue from 'vue';
import App from './App.vue';
import 'assets/main.scss';
import { createRouter } from './plugins/router';
import inject from './plugins/inject.js';
import { createStore } from './store';
Vue.use(inject);
export function createApp (ssrContext) {
  const router = createRouter();
  const store = createStore()
  const app = new Vue({
    router,
    store,
    ssrContext,
    render: (h) => h(App)
  });
  return { app, router, store };
}
