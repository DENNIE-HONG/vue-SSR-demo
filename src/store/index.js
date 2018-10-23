import Vue from 'vue';
import Vuex from 'vuex';
// import actions from './actions';
import home from './modules/home';
Vue.use(Vuex);

export function createStore () {
  return new Vuex.Store({
    state: {
      items: ''
    },
    modules: {
      home
    },
    mutations: {
      setItem (state, res) {
        state.items = res;
      }
    },
    actions: {
      setItem ({ commit }, id) {
        commit('setItem');
      }
    }
  })
}
