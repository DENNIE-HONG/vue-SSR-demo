import Vue from 'vue';
import Vuex from 'vuex';
import { getQuestion } from 'api/product';
// import actions from './actions';
Vue.use(Vuex);

export function createStore () {
  return new Vuex.Store({
    state: {
      items: ''
    },
    mutations: {
      setItem (state, res) {
        console.log(res.data);
        state.items = res;
      }
    },
    actions: {
      setItem ({ commit }, id) {
        getQuestion(id).then((res) => {
          commit('setItem', res);
        });
      }
    }
  })
}
