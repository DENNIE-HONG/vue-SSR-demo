import jsonp from 'jsonp';
import querystring from 'querystring';
import request from '../plugins/axios';
const GET_GUESS_URL = 'https://wqcoss.jd.com/mcoss/reclike/getrecinfo';
const GET_QUESTION_URL = 'https://wq.jd.com/questionanswer/GetSkuQuestionListWeChat';
const GET_SPECIFICATION_URL = 'https://wq.jd.com/commodity/itembranch/getspecification';
const required = () => {
  throw Error('missing parameter！');
}
export const getQuestion = (productId = required()) => {
  const params = {
    productId
  };
  const q = querystring.encode(params);
  return request.get(`${GET_QUESTION_URL}?${q}&callback=askAnswerCBA`);
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
  return request.get(`${GET_GUESS_URL}?${q}&callback=`);
  // const q = querystring.encode(params);
  // return new Promise((resolve, reject) => {
  //   jsonp(`${GET_GUESS_URL}?${q}`, { timeout: 10000 }, (err, res) => {
  //     if (err) {
  //       reject('网络不给力，请稍后再试');
  //     }
  //     resolve(res);
  //   })
  // });
}
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
