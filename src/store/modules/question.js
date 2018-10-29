import { getQuestion } from 'api/question';
const question = {
  namespaced: true,
  state: {
    questionList: [],
    questionTitle: ''
  },
  mutations: {
    FETCH: ({ state }, res) => {
      console.log(res.data);
      state.questionList = state.questionList.concat(res.data.result.questionList);
      const a = new Function(res.data);
      console.log(a);
      if (!state.questionList) {
        state.questionTitle = res.result.skuInfo.fullName;
      }
    }
  },
  actions: {
    FETCH: ({ commit }, params) => new Promise((resolve, reject) => {
      getQuestion(params.productId, params.page).then((res) => {
        commit('FETCH', res);
        resolve(res);
      }).catch((err) => {
        reject(err);
      })
    })
  }
};
export default question;
