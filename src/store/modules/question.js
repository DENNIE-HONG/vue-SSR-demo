import { getQuestion } from 'api/question';
const isServer = process.env.VUE_ENV === 'server';
const question = {
  namespaced: true,
  // 重要信息：state 必须是一个函数，
  // 因此可以创建多个实例化该模块
  state () {
    return {
      questionList: [],
      questionTitle: '',
      total: 0
    }
  },
  mutations: {
    // 首次加载
    FETCH: (state, res) => {
      if (isServer) {
        const jsonpStr = res.data.substring(20, res.data.length - 13);
        res.data = JSON.parse(jsonpStr);
        state.questionList = res.data.result.questionList;
        state.questionTitle = res.data.result.skuInfo.fullName;
        state.total = res.data.result.totalItem;
      } else {
        state.questionList = res.result.questionList;
        state.questionTitle = res.result.skuInfo.fullName;
        state.total = res.result.totalItem;
      }
    },
    // 异步加载第n页
    LOADMORE: (state, data) => {
      state.questionList = state.questionList.concat(data);
    }
  },
  actions: {
    FETCH: ({ commit }, params) => new Promise((resolve, reject) => {
      getQuestion(params.productId, params.page).then((res) => {
        if(params.page === 1) {
          commit('FETCH', res);
        } else {
          commit('LOADMORE', res.result.questionList);
        }
        resolve(res);
      }).catch((err) => {
        reject(err);
      })
    })
  }
};
export default question;
