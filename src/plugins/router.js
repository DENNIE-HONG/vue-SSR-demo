/**
 * 路由注册
 * 注意要为每个请求一个新的router实例
 * @author luyanhong 2018-10-17
*/
import Vue from 'vue';
import Router from 'vue-router';
import routes from '../routes/index.js';
Vue.use(Router);

export default function createRouter (token) {
  const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes
  });
  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth) && !token) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      next({
        path: '/login'
      })
    } else {
      next(); // make sure to always call next()!
    }
  });
  return router;
}

