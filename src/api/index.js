/**
 * 通用挨批接口
 * @author luyanhong 2018-10-24
 */
import axios from '../plugins/axios';
export const getSuggest = (keyword) => {
  const params = {
    q: keyword,
    extras: 1,
    code: 'utf-8'
  }
  return axios({
    method: 'GET',
    url: '/taobao/sug',
    responseType: 'json',
    params
  });
}
