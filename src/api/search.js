import Vue from 'vue';
import request from '../plugins/axios';
const GET_SEARCH_URL = 'https://so.m.jd.com/ware/search._m2wq_list';
const isServer = process.env.VUE_ENV === 'server';
/**
 * 搜索接口
 * 支持SSR、异步
 */
export const getSearch = ({ page, keyword, sort_type, filt_type }) => {
  const params = {
    keyword,
    page,
    fdesc: '北京',
    sort_type,
    filt_type,
    pagesize: 10,
    callback: 'jdSearchResultBkCbA'
  };
  return isServer ? request({ method: 'GET', url: GET_SEARCH_URL, params }) : Vue.jsonp(GET_SEARCH_URL, params);
}
