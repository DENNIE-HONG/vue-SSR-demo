/**
 * server的入口文件
 * @author luyanhong 2018-10-15
*/
import { createApp } from './main';
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp(context);
    router.push(context.url);
    router.onReady(() => {
      resolve(app);
    }, reject);
  });
}
