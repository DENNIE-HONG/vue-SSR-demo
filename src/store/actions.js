/**
 * 用户数据相关接口api
 * 涉及到cookie，建议异步获取
 * @author luyanhong 2018-10-29
*/
import { getUser, signOut, postLogin } from 'api/user';
export default {
  USER: ({ commit }, userInfo) => {
    getUser(userInfo).then((res) => {
      commit('USER', res.data);
    })
  },
  SIGN_OUT: ({ commit }) => new Promise((resolve, reject) => {
    signOut().then((res) => {
      commit('SIGN_OUT');
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  }),
  SIGN_IN: ({ commit }, params) => new Promise((resolve, reject) => {
    postLogin(params).then((res) => {
      commit('SIGN_IN');
      resolve(res);
    }).catch((err) => {
      reject(err);
    })
  })

}
