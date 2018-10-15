/**
 * 锁屏
 * @param {Object} { isLock: true} 是否锁屏
*/
const lockWindow = ({ isLock = true } = {}) => {
  isLock && document.documentElement.classList.add('lock');
  !isLock && document.documentElement.classList.remove('lock');
}
export default lockWindow;
