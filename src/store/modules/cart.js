import { getCart } from 'api/cart';
const isServer = process.env.VUE_ENV === 'server';
const cart = {
  namespaced: true,
  state: () => ({
    cartList: [],
    allCount: 0,
    totalObj: {}
  }),
  mutations: {
    FETCH: (state, res) => {
      if (isServer) {
        res = res.data;
      }
      state.allCount = res.data.cartShow.allCount;
      state.cartList = res.data.cartShow.cartRegionList;
      state.cartList.map((item)=> {
        state.$set(state.totalObj, item.cartRegionId, 0);
      });
    }
  },
  actions: {
    FETCH: ({ commit }) => {
      getCart().then((res) => {
        if (res.data.status === 200 || res.state === 200) {
          commit('FETCH', res);
        }
      }).catch((err) => {
        throw err;
      });
    }
  }
}
export default cart;
