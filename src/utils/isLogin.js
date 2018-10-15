import Cookie from 'universal-cookie';
const cookies = new Cookie();
const userName = 'name';
const isLogin = () => !!cookies.get(userName);
export default isLogin;
