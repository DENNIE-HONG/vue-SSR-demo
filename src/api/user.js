/**
 * 用户数据相关接口api
 * token 默认存储3天
 * 一般用token判断是否登录，退出则清理token
 * 暂时localStore 存用户信息，因为没有数据库
 * @author luyanhong 2018-11-01
*/
import Cookie from 'universal-cookie';
import jwt from 'jsonwebtoken';
const clientCookies = new Cookie();
const required = () => {
  throw Error('missing parameter');
}
const userName = 'name';
const vueToken = 'vue_token';
// import defaultAvatar from 'assets/img/user.png';
const saveToken = (params) => {
  const token = jwt.sign(params, 'secret', { expiresIn: '3 days' });
  clientCookies.set(vueToken, token);
}
/**
 * 登入接口，异步
 * @param {Object} 请求参数
*/
export function postLogin (params = required()) {
  return new Promise((resolve, reject) => {
    const { name } = params;
    if (!name) {
      reject({
        code: 1,
        msg: '缺少参数name'
      });
    }
    const originName = localStorage.getItem(userName);
    if (originName === name) {
      saveToken({ name });
      resolve({
        code: 200,
        msg: ''
      });
    } else {
      reject({
        code: 0,
        msg: '用户名不对哦'
      });
    }
  })
}

// 获取用户信息,支持异步orSSR
export function getUser (cookies) {
  let token;
  if (cookies) {
    // 服务端传递
    token = cookies[vueToken];
  } else {
    // 浏览器cookie获取
    token = clientCookies.get(vueToken);
  }
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
    const avatar = deCoded[avatar];
    const name = deCoded[userName];
    Object.assign(data, {
      name,
      avatar,
      isLogin: true
    });
  }
  return Promise.resolve({
    code: 200,
    data,
    msg: ''
  });
}

// 退出，异步
export function signOut () {
  const token = clientCookies.get(vueToken);
  return new Promise((resolve, reject) => {
    if (token) {
      clientCookies.remove(vueToken);
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

/**
 * 修改昵称、头像
 * 只支持异步
 * @param {Object}
 */

export function postUser ({ name, avatar }) {
  return new Promise(async (resolve, reject) => {
    if (!name && !avatar) {
      reject({
        code: 1,
        msg: '缺少参数name'
      });
    }
    // 存储用户数据
    name && localStorage.setItem(userName, name);
    // 修改用户名，重新存储token
    const { data } = await getUser();
    const responseData = {
      name: name || data.name,
      avatar: avatar || data.avatar
    };
    saveToken({ name: responseData.name });
    resolve({
      code: 200,
      data: responseData,
      msg: ''
    })
  })
}
/**
 * 注册, 异步
 * @param {String} name, 昵称
*/
export function signUp (name = required()) {
  return new Promise((resolve, reject) => {
    if (!name) {
      reject({
        code: 1,
        msg: '昵称不能为空'
      });
    }
    const data = {
      name
    };
    saveToken(data);
    localStorage.setItem(userName, name);
    resolve({
      code: 200,
      data,
      msg: ''
    });
  });
}
