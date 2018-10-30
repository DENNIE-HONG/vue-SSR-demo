/**
 * 问题详情页的数据
 * @author luyanhong 2018-10-30
*/
import { getAnswer } from 'api/question';
const isServer = process.env.VUE_ENV === 'server';
const answer = {
  namespaced: true,
  state: () => ({
    answerList: [],
    questionInfo: {
      pin: '',
      created: '',
      content: '',
      answerCount: 0
    },
    productInfo: null
  }),
  mutations: {
    // 首次数据
    FETCH: (state, res) => {
      if (isServer) {
        const jsonpStr = res.data.substring(24, res.data.length - 13);
        res = JSON.parse(jsonpStr);
      }
      const { answerList, pin, created, content, answerCount } = res.result.question;
      state.answerList = answerList;
      state.questionInfo.pin = pin;
      state.questionInfo.created = created;
      state.questionInfo.content = content;
      state.questionInfo.answerCount = answerCount;
      state.productInfo = res.result.skuInfo;
    },
    LOADMORE: (state, answerList) => {
      state.answerList = state.answerList.concat(answerList);
    }
  },
  actions: {
    FETCH: ({ commit }, { page, id, productId }) => new Promise((resolve, reject) => {
      getAnswer({ page, id, productId }).then((res) => {
        if (page === 1) {
          commit('FETCH', res);
        } else {
          commit('LOADMORE', res.result.question.answerList);
        }
        resolve(res);
      }).catch((err) => {
        reject(err);
      })
    })
  }
}
export default answer;
