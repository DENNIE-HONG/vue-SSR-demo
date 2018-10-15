/**
 * 路由注册
 * @author luyanhong 2018-07-26
*/
import Vue from 'vue';
import Router from 'vue-router';
import routes from '../router/index.js';
import isLogin from 'utils/isLogin.js';
Vue.use(Router);
const router = new Router({
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLogin()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
});
export default router;
