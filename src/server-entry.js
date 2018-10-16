/**
 * server的入口文件
 * @author luyanhong 2018-10-15
*/
import { createApp } from './main';
export default (context) => new Promise((resolve, reject) => {
  const { app, router } = createApp(context);
  const { url } = context;
  const { fullPath } = router.resolve(url).route;
  if (fullPath !== url) {
    return reject({ url: fullPath });
  }
  router.push(url);
  // wait until router has resolved possible async hooks
  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents();
    if (!matchedComponents.length) {
      return reject({ code: 404 });
    }
    resolve(app);
  }, reject);
});
