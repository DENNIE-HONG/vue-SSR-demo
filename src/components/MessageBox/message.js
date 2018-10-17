/**
 * 消息提示对外接口
 * @param {string}    type，可选，默认是info，有info/warning/error/success
 * @param {string}    message，必须，消息内容文本
 * @author luyanhong 2018-08-03
*/
import Vue from 'vue';
import MessageBox from './index.vue';
const required = () => {
  throw Error('missing parameter message');
}
const message = ({ type = 'info', message = required() }) => {
  const root = document.createElement('div');
  document.body.appendChild(root);
  const props = {
    type,
    message
  };
  new Vue({
    el: root,
    components: { MessageBox },
    render (createElement) {
      return createElement('MessageBox', {
        props
      })
    }
  })
}
export default message;
