import { getRecommend } from 'api/home';
const home = {
  namespaced: true,
  state () {
    return {
      productList: []
    }
  },
  mutations: {
    FETCH: (state, res) => {
      const result = JSON.parse(res.data.recommend);
      state.productList = result.wareInfoList;
    }
  },
  actions: {
    FETCH: ({ commit }, page) => getRecommend(page).then((res) => {
      commit('FETCH', res);
    }).catch((error) => {
      console.error(error.Error);
    })
  }
}
export default home;
