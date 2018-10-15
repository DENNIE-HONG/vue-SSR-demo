/**
 * 请求实例插件，并注入配置
 * @author luyanhong 2018-07-27
*/
import axios from 'axios';
import { requestSuccessFunc, requestFailFunc, responseSuccessFunc, responseFailFunc } from 'config/interceptors/axios';
const config = require('config/index.js');
const { AXIOS_DEFAULT_CONFIG } = config;
let request = {};
request = axios.create(AXIOS_DEFAULT_CONFIG);
request.interceptors.request.use(requestSuccessFunc, requestFailFunc);
request.interceptors.response.use(responseSuccessFunc, responseFailFunc);
export default request;
