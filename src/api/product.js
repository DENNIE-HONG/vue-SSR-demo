import jsonp from 'jsonp';
import querystring from 'querystring';
import request from '../plugins/axios';
const GET_GUESS_URL = 'https://wqcoss.jd.com/mcoss/reclike/getrecinfo';
const GET_QUESTION_URL = 'https://wq.jd.com/questionanswer/GetSkuQuestionListWeChat';
const GET_SPECIFICATION_URL = 'https://wq.jd.com/commodity/itembranch/getspecification';
const GET_COMMENT_URL = 'https://wq.jd.com/commodity/comment/getcommentlist';
const required = () => {
  throw Error('missing parameter！');
}
// const isServer = process.env.VUE_ENV === 'server';
/**
 * 获取问题列表接口
 * SSR直出
 * @param {String} productId
*/
export const getQuestion = (productId = required()) => {
  const params = {
    productId,
    callback: 'askAnswerCBA'
  };
  const q = querystring.encode(params);
  return request.get(`${GET_QUESTION_URL}?${q}`);
  // return request({
  //   method: 'get',
  //   url: GET_QUESTION_URL,
  //   params,
  //   responseType: 'text'
  // });
  // return new Promise((resolve, reject) => {
  //   jsonp(`${GET_QUESTION_URL}?${q}`, { timeout: 10000 }, (err, res) => {
  //     if (err) {
  //       reject('网络不给力，请稍后再试');
  //     }
  //     resolve(res);
  //   })
  // });
}
/***
 * 猜你喜欢接口，SSR直出
 * @param {String} productId, 商品id
 */
export const getGuess = (productId = required()) => {
  const params = {
    sku: productId,
    pc: 30
  };
  const q = querystring.encode(params);
  return request.get(`${GET_GUESS_URL}?${q}`);
}
/**
 * 参数规格接口，异步
 * @param {String} productId, 商品id
*/
export const getSpecification = (productId = required()) => {
  const params = {
    skuid: productId
  };
  const q = querystring.encode(params);
  return new Promise((resolve, reject) => {
    jsonp(`${GET_SPECIFICATION_URL}?${q}`, { timeout: 10000 }, (err, res) => {
      if (err) {
        reject('网络不给力，请稍后再试');
      }
      resolve(res);
    })
  });
}
/**
 * 获取评论数据，异步
 * @param {Object} params，参数
 */
export const getComments = (params) => {
  // const sendData = {
  //   sorttype: params.srottype || 5,
  //   sku: params.productId || '',
  //   page: params.page || 1,
  //   score: params.score || 0,
  //   pagesize: params.pageSize || 10
  // };
  const q = querystring.encode(params);
  return new Promise((resolve, reject) => {
    jsonp(`${GET_COMMENT_URL}?${q}`, { timeout: 10000 }, (err, res) => {
      if (err) {
        reject('网络不给力');
      }
      resolve(res);
    })
  })
}
