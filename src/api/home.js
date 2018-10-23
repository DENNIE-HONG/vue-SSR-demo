/**
 * 首页api
 * 数据来源m.jd.com
 * @author luyanhong 2018-10-18
 */
import axios from '../plugins/axios';
export const getRecommend = (data) => {
  const params = {
    pc: data.pageSize,
    pi: data.page || 1
  };
  return axios({
    method: 'get',
    url: '/jdapi/mcoss/reclike/getrecinfo',
    params,
    responseType: 'json'
  });
}
