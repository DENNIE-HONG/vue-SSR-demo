/**
 * 路由配置
 * @author luyanhong 2018-10-15
*/
// import Home from 'views/home/index.vue';
// import NotFound from 'views/404/index.vue';
// import Product from 'views/product/index.vue';
// import My from 'views/my/index.vue';
// import Login from 'views/login/index.vue';
// import Question from 'views/question/index.vue';
// import QuestionDetail from 'views/question-detail/index.vue';
// import Search from 'views/search/index.vue';
// import Setting from 'views/setting/index.vue';
// import Cart from 'views/cart/index.vue';
const Home = () => import(/* webpackChunkName:"home" */ 'views/home/index.vue');
const NotFound = () => import(/* webpackChunkName:"404" */ 'views/404/index.vue');
const Product = () => import(/* webpackChunkName:"product" */ 'views/product');
const My = () => import(/* webpackChunkName:"my" */ 'views/my');
const Login = () => import(/* webpackChunkName:"login" */ 'views/login');
const Question = () => import(/* webpackChunkName:"question" */ 'views/question');
const QuestionDetail = () => import(/* webpackChunkName:"question-detail" */ 'views/question-detail');
const Search = () => import(/* webpackChunkName:"search" */ 'views/search');
const Setting = () => import(/* webpackChunkName:"setting" */ 'views/setting');
const Cart = () => import(/* webpackChunkName:"cart" */ 'views/cart');
const routes = [
  { path: '/', component: Home },
  { path: '/product/:productId', component: Product },
  { path: '/my', component: My },
  { path: '/login', component: Login },
  { path: '/question/:productId', component: Question },
  { path: '/question/:productId/detail/:id', component: QuestionDetail },
  { path: '/search', component: Search },
  { path: '/setting',
    component: Setting,
    meta: { requiresAuth: true }
  },
  { path: '/cart', component: Cart },
  { path: '*', component: NotFound }
];
export default routes;
