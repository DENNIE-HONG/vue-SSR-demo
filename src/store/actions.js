/**
 * 用户数据相关接口api
 * 涉及到cookie，建议异步获取
 * @author luyanhong 2018-10-29
*/
import { getUser, signOut, postLogin, postUser, signUp } from 'api/user';
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
  // 登录
  SIGN_IN: ({ commit }, params) => new Promise((resolve, reject) => {
    postLogin(params).then((res) => {
      commit('SIGN_IN');
      resolve(res);
    }).catch((err) => {
      reject(err);
    })
  }),
  // 修改昵称、头像
  CHANGE_INFO: ({ commit }, params) => new Promise((resolve, reject) => {
    postUser(params).then((res) => {
      commit('CHANGE_INFO', res.data);
      resolve(res);
    }).catch((err) => {
      reject(err);
    })
  }),
  // 注册
  SIGN_UP: ({ commit }, name) => new Promise((resolve, reject) => {
    signUp(name).then((res) => {
      commit('SIGN_UP', res.data);
      resolve(res);
    }).catch((err) => {
      reject(err);
    })
  })

}
