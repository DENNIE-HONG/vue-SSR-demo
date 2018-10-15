/**
 * 服务层api插件
 * @author luyanhong 2018-07-27
*/
import axios from './axios.js';
import isEmpty from 'utils/isEmpty.js';
const config = require('config/index.js');
const { AXIOS_DEFAULT_CONFIG } = config;
import API_CONFIG from '../service/api/index.js';
class MakeApi {
  constructor (opts) {
    this.api = {};
    this.apiBuilder(opts);
  }
  apiBuilder ({ sep = '/', config = {}}) {
    Object.keys(config).map((namespace) => {
      _apiSingleBuilder.call(this, {
        namespace,
        sep,
        config: config[namespace]
      });
    });
  }
}
/**
 * 封装单个api请求
 *
 * @param {*} { namespace, sep = '|', config = {}}
 */
function _apiSingleBuilder ({ namespace, sep = '/', config = {}}) {
  const self = this;
  config.forEach((api) => {
    const { name, desc, params, method, path } = api;
    const apiName = `${namespace}${sep}${name}`;
    Object.defineProperty(self.api, apiName, {
      value (outerParams, outerOptions) {
        //请求参数自动截取
        // 请求参数不穿则发送默认配置参数。
        const data = isEmpty(outerParams) ? params : Object.assign(params, outerParams);
        const options = Object.assign({
          url: path,
          desc,
          method
        }, outerOptions);
        return axios(_normoalize(options, data));
      }
    })
  });
}
function _normoalize (options, data) {
  // 这里可以做大小写转换，也可以做其他类型 RESTFUl 的兼容
  if (options.method === 'POST') {
    options.data = data
  } else if (options.method === 'GET') {
    options.params = data
  }
  return options
}
// 注入模型和全局配置，并暴露出去
export default new MakeApi({
  config: API_CONFIG,
  ...AXIOS_DEFAULT_CONFIG
})['api']
