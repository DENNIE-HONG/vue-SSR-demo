import Cookie from 'universal-cookie';
const cookies = new Cookie();
const vueToken = 'vue_token';
const isLogin = () => !!cookies.get(vueToken);
export default isLogin;
