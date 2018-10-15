/**
 * 封装confirm的方法
 * @author luyanhong 2018-09-27
*/
import Vue from 'vue';
import ConfirmBox from 'coms/ConfirmBox';
const ConfirmConponent = Vue.extend(ConfirmBox);
let instance = null;
const callback = (action) => {
  if (action === 'confirm') {
    if (instance.showInput) {
      instance.resolve({ value: instance.inputValue, action });
    } else {
      instance.resolve(action);
    }
  } else {
    instance.reject(action);
  }

  instance = null;
}
const showConfirm = (text, opts) => new Promise((resolve, reject) => {
  const propsData = { text, ...opts }

  instance = new ConfirmConponent({ propsData }).$mount();
  instance.reject = reject;
  instance.resolve = resolve;
  instance.callback = callback;
  document.body.appendChild(instance.$el);
});


const confirm = (text, opts) => showConfirm(text, opts);
export default confirm;

