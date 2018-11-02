import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import home from './modules/home';
import product from './modules/product';
import question from './modules/question';
import answer from './modules/answer';
import search from './modules/search';
import cart from './modules/cart';
Vue.use(Vuex);
import defaultAvatar from 'assets/img/user.png';
export function createStore () {
  return new Vuex.Store({
    state: {
      avatar: defaultAvatar,
      name: 'vueSSR游客',
      isLogin: false
    },
    modules: {
      home,
      product,
      question,
      answer,
      search,
      cart
    },
    mutations: {
      USER (state, data) {
        const { name, avatar, isLogin } = data;
        if (isLogin) {
          name && (state.name = name);
          avatar && (state.avatar = avatar);
          state.isLogin = true;
        }
      },
      SIGN_OUT (state) {
        state.name = 'vueSSR游客';
        state.isLogin = false;
      },
      SIGN_IN (state) {
        state.isLogin = true;
      },
      CHANGE_INFO (state, { name, avatar }) {
        state.name = name;
        state.avatar = avatar;
      },
      SIGN_UP (state, name) {
        state.name = name;
      }
    },
    actions
  })
}
