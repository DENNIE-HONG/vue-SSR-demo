import { getQuestion } from 'api/product';
const product = {
  namespaced: true,
  state: {
    broadcastList: []
  },
  mutations: {
    GUESS: (state, data) => {
      state.broadcastList = data;
    }
  },
  actions: {
    FETCH ({ commit }, id) {
      getQuestion(id).then((res) => {
        commit('FETCH', res);
      });
    }
  }
}
export default product;
