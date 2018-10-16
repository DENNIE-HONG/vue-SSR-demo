/**
 * 入口文件
 * @author luyanhong 2018-10-15
*/
import Vue from 'vue';
import App from './App.vue';
import 'assets/main.scss';
import router from './plugins/router';
export function createApp (ssrContext) {
  // const router = createRouter();
  const app = new Vue({
    router,
    ssrContext,
    render: (h) => h(App)
  });
  return { app, router }
}
