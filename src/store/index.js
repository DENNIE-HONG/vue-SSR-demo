import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import home from './modules/home';
import product from './modules/product';
import question from './modules/question';
import answer from './modules/answer';
import search from './modules/search';
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
      search
    },
    mutations: {
      USER (state, data) {
        Object.assign(state, data);
      },
      SIGN_OUT (state) {
        state.name = 'vueSSR游客';
        state.isLogin = false;
      },
      SIGN_IN (state) {
        state.isLogin = true;
      }
    },
    actions
  })
}
