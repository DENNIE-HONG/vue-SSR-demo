/**
 * 路由配置
 * @author luyanhong 2018-10-15
*/
import Home from 'views/home/index.vue';
import NotFound from 'views/404/index.vue';
import Product from 'views/product/index.vue';
import My from 'views/my/index.vue';
import Login from 'views/login/index.vue';
import Question from 'views/question/index.vue';
import QuestionDetail from 'views/question-detail/index.vue';
// const Home = () => import('views/home/index.vue');
// const NotFound = () => import('views/404/index.vue');
const routes = [
  { path: '/', component: Home },
  { path: '/product/:productId', component: Product },
  { path: '/my', component: My },
  { path: '/login', component: Login },
  { path: '/question/:productId', component: Question },
  { path: '/question/:productId/detail/:id', component: QuestionDetail },
  { path: '*', component: NotFound }
];
export default routes;
