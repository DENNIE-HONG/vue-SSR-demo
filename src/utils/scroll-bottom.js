/**
 * 判断是否滚动到底
 * @param {$div}     $container, 滚动容器，一般是$window
 * @param {Number}   threshold, 滚动距离底部的值，默认是0
 * @return {Boolean}
 * @author luyanhong 2018-08-15
 */
const required = () => {
  throw Error('missing parameter $container!');
};
const scrollBottom = (container = required(), threshold = 0) => {
  let container_H = container.scrollHeight;
  let { scrollTop } = container;
  let { offsetHeight } = container;
  if (container === window || container === document) {
    container_H = document.documentElement.scrollHeight;
    scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    offsetHeight = container.innerHeight;
  }
  const scroll_H = container_H - offsetHeight;
  if (scroll_H - scrollTop <= threshold) {
    return true;
  }
};
export default scrollBottom;
