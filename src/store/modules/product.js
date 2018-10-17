import { getQuestion } from 'api/product';
const product = {
  state: {
    productList: []
  },
  mutations: {
    FETCH: (state, data) => {
      state.productList = data;
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
