import { getRecommend } from 'api/home';
const home = {
  namespaced: true,
  state () {
    return {
      productList: []
    }
  },
  mutations: {
    FETCH: (state, data) => {
      if (data.length) {
        state.productList = data;
      }
    },
    LOADMORE: (state, data) => {
      state.productList = state.productList.concat(data);
    }
  },
  actions: {
    FETCH: ({ commit }, sendData) => new Promise((resolve, reject) => {
      getRecommend(sendData).then((res) => {
        const results = res.data.data;
        commit('FETCH', results);
        resolve(results);
      }).catch((error) => {
        console.error(error);
        reject(error);
      })
    }),
    LOADMORE: ({ commit }, sendData) => new Promise((resolve, reject) => {
      getRecommend(sendData).then((res) => {
        const results = res.data.data;
        commit('LOADMORE', results);
        resolve(results);
      }).catch((error) => {
        console.error(error);
        reject(error);
      })
    })
  }
}
export default home;
