/**
 * client的入口文件
 * @author luyanhong 2018-10-15
 */
import { createApp } from './main';

const { app, router } = createApp();
router.onReady(() => {
  app.$mount('#app')
});
