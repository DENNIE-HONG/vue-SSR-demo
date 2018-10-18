import Vue from 'vue';
import Vuex from 'vuex';
// import actions from './actions';
Vue.use(Vuex);

export function createStore () {
  return new Vuex.Store({
    state: {
      items: ''
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
