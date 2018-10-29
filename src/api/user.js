/**
 * 用户数据相关接口api
 * @author luyanhong 2018-08-03
*/
import Cookie from 'universal-cookie';
import jwt from 'jsonwebtoken';
const cookies = new Cookie();
const required = () => {
  throw Error('missing parameter');
}
const userName = 'name';
// const defaultName = 'vue宝宝';
const vueToken = 'vue_token';
// import defaultAvatar from 'assets/img/user.png';
// 登入
export function postLogin (params = required()) {
  return new Promise((resolve, reject) => {
    const { name } = params;
    if (!name) {
      reject({
        code: 1,
        msg: '缺少参数name'
      });
    }
    const token = jwt.sign({
      name
    }, 'secret', { expiresIn: '3 days' });
    cookies.set(vueToken, token, {
      path: '/'
    });
    localStorage.setItem(userName, name);
    resolve({
      code: 200,
      msg: ''
    });
  })
}

// 用户信息
export function getUser () {
  const token = cookies.get(vueToken);
  let deCoded;
  if (token) {
    jwt.verify(token, 'secret', function (err, decoded) {
      if (err) {
        return;
      }
      deCoded = decoded;
    });
  }
  let data = {};
  if (deCoded && deCoded[userName]) {
    const name = localStorage.getItem(userName);
    Object.assign(data, {
      name,
      isLogin: true
    });
  }
  return Promise.resolve({
    code: 200,
    data,
    msg: ''
  });
}

// 退出
export function signOut () {
  const token = cookies.get(vueToken);
  return new Promise((resolve, reject) => {
    if (token) {
      cookies.remove(vueToken);
      resolve({
        code: 200,
        msg: ''
      });
    } else {
      reject({
        code: 1,
        msg: '您还没有登入哦'
      });
    }
  });
}
