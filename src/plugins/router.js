/**
 * 路由注册
 * 注意要为每个请求一个新的router实例
 * @author luyanhong 2018-10-17
*/
import Vue from 'vue';
import Router from 'vue-router';
import routes from '../routes/index.js';
// import isLogin from 'utils/isLogin.js';
Vue.use(Router);
export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes
  });
}

