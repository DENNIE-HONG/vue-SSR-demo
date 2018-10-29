import Vue from 'vue';
import querystring from 'querystring';
import request from '../plugins/axios';
const GET_GUESS_URL = 'https://wqcoss.jd.com/mcoss/reclike/getrecinfo';
const GET_QUESTION_URL = 'https://wq.jd.com/questionanswer/GetSkuQuestionListWeChat';
const GET_SPECIFICATION_URL = 'https://wq.jd.com/commodity/itembranch/getspecification';
const GET_COMMENT_URL = 'https://wq.jd.com/commodity/comment/getcommentlist';
const required = () => {
  throw Error('missing parameter！');
}
const isServer = process.env.VUE_ENV === 'server';
/**
 * 获取问题列表接口
 * SSR直出or异步
 * @param {String} productId
*/
export const getQuestion = (productId = required()) => {
  const params = {
    productId,
    callback: 'askAnswerCBA'
  };
  const q = querystring.encode(params);
  if (isServer) {
    return request.get(`${GET_QUESTION_URL}?${q}`);
  }
  return Vue.jsonp(GET_QUESTION_URL, params);
}
/***
 * 猜你喜欢接口，SSR直出or异步
 * @param {String} productId, 商品id
 */
export const getGuess = (productId = required()) => {
  const params = {
    sku: productId,
    pc: 30
  };
  const q = querystring.encode(params);
  if (isServer) {
    return request.get(`${GET_GUESS_URL}?${q}`);
  }
  return Vue.jsonp(GET_GUESS_URL, params);
  // return new Promise((resolve, reject) => {
  //   Vue.jsonp(GET_GUESS_URL, params).then((json) => {
  //     json.data = json;
  //     resolve(json);
  //   }).catch((err) => {
  //     reject(err);
  //   })
  // })
}
/**
 * 参数规格接口，异步
 * @param {String} productId, 商品id
*/
export const getSpecification = (productId = required()) => {
  const params = {
    skuid: productId
  };
  return Vue.jsonp(GET_SPECIFICATION_URL, params);
}
/**
 * 获取评论数据，异步
 * @param {Object} params，参数
 */
export const getComments = (params) => Vue.jsonp(GET_COMMENT_URL, params)


