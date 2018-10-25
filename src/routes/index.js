/**
 * 路由配置
 * @author luyanhong 2018-10-15
*/
import Home from 'views/home/index.vue';
import NotFound from 'views/404/index.vue';
import Product from 'views/product/index.vue';
// const Home = () => import('views/home/index.vue');
// const NotFound = () => import('views/404/index.vue');
const routes = [
  { path: '/', component: Home },
  { path: '/product/:productId', component: Product },
  { path: '*', component: NotFound }
];
export default routes;
