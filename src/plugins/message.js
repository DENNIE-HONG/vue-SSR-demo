/**
 * 封装message方法
 * @author luyanhong 2018-09-04
*/
import Vue from 'vue';
import MessageBox from 'coms/MessageBox/index';
const MessageComponent = Vue.extend(MessageBox);
let instance = null;

const showMessageBox = (options) => {
  const { type , message } = options;
  const propsData = { type, message };
  instance = new MessageComponent({ propsData }).$mount();
  document.body.appendChild(instance.$el);
}

const message = (options) => showMessageBox(options);

export default message;
