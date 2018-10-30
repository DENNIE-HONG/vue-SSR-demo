import request from '../plugins/axios';
import Vue from 'vue';
import querystring from 'querystring';
const GET_QUESTION_URL = 'https://wq.jd.com/questionanswer/GetSkuQuestionList';
const GET_ANSWER_URL = 'https://wq.jd.com/questionanswer/GetQuestionDetail';
const isServer = process.env.VUE_ENV === 'server';

/**
 * 获取问题列表接口
 * 支持SSR/异步
 * @param {String} productId, 商品id
 * @param {Number} page, 页码
 */
export const getQuestion = (productId, page = 1) => {
  const params = {
    pageSize: 10,
    page,
    productId,
    callback: 'getFaqsCallback'
  };
  const q = querystring.encode(params);
  if (isServer) {
    return request.get(`${GET_QUESTION_URL}?${q}`);
  }
  return Vue.jsonp(GET_QUESTION_URL, params);
}

/**
 * 获取回答列表接口
 * 支持SSR、异步
 * @param {Object} params, 参数
 */
export const getAnswer = (params) => {
  const sentData = {
    page: params.page,
    pageSize: 10,
    productId: params.productId,
    id: params.id,
    callback: 'getQuestionDetailCb'
  }
  const q = querystring.encode(sentData);
  if (isServer) {
    return request.get(`${GET_ANSWER_URL}?${q}`);
  }
  return Vue.jsonp(GET_ANSWER_URL, sentData);
}
