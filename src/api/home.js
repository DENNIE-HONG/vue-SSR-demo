/**
 * 首页api
 * 数据来源m.jd.com
 * @author luyanhong 2018-10-18
 */
import axios from '../plugins/axios';
export const getRecommend = (page = 1) => {
  const params = {
    _format_: 'json',
    page
  };
  return axios({
    method: 'get',
    url: 'https://m.jd.com/index/recommend.action',
    params,
    responseType: 'json'
  });
}
