import { getQuestion, getGuess, getComments } from 'api/product';
const product = {
  namespaced: true,
  state: {
    broadcastList: [],
    questionList: [],
    commentList: []
  },
  mutations: {
    GUESS: (state, data) => {
      state.broadcastList = data;
    },
    QUESTION: (state, data) => {
      state.questionList = data;
    },
    COMMENT: (state, payload) => {
      if (payload.reload) {
        state.commentList = payload.data;
      } else {
        state.commentList = state.commentList.concat(payload.data);
      }
    }
  },
  actions: {
    GUESS ({ commit }, productId) {
      getGuess(productId).then((res) => {
        commit('GUESS', res.data.data);
      }).catch((err) => {
        throw err;
      });
    },
    QUESTION ({ commit }, productId) {
      getQuestion(productId).then((res) => {
        commit('QUESTION', res.data.results.questionList);
      }).catch((err) => {
        throw err;
      })
    },
    COMMENT: ({ commit }, params) => new Promise((resolve, reject) => {
      getComments(params).then((res) => {
        const data = {
          data: res.result.comments,
          reload: params.reload
        };
        commit('COMMENT', data);
        resolve(res);
      }).catch((err) => {
        console.log(err);
        reject(err);
      })
    }),
    FETCH: async ({ commit }, productId) => {
      try {
        const [ broadcastList, questionList] = await Promise.all([
          getGuess(productId),
          getQuestion(productId)
        ]);
        let jsonpStr = questionList.data.substring(17, questionList.data.length - 13);
        jsonpStr = JSON.parse(jsonpStr);
        commit('GUESS', broadcastList.data.data);
        commit('QUESTION', jsonpStr.result.questionList);
      } catch(err) {
        throw err;
      }
    }
  }
}
export default product;
