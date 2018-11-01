练习 vue SSR

记踩过的坑：
1、接口数据来自京东，客户端可能会跨域问题
  用koa-server-http-proxy代理请求，
  当使用asyncData方法在组件渲染前异步请求数据时，node url parse 去解析你的这个 /api 参数的，然后再传给相应的如 http request所以默认就是80端口，会报错
  因为：asyncData方法异步请求数据时，以为/api/${params.id}这个接口的网址是　127.0.0.1:80, 所以将请求发送给了127.0.0.1:80，而我的接口服务器并没有跑在80端口上，所以报错
  解决：
  在axios的baseURL配置改为http://127.0.0.1: ${端口号}
  在浏览器打开http://127.0.0.1:${端口号}进行开发


2、store不用注册模式
  因为node端的store和客户端不同，加载更多列表无法dispatch到数据，actions无法复用
  直接在index里注册模块

3、直出需要用到vue-touch, 用vue-touch-hotfix模块修复window报错

4、注意有加载更多的列表模块
  store的actions指令，首次加载和其他次加载分开。
  路由跳转后需要将列表重置，不能再用concat

5、用koa-cookie模块，将cookie带上
  获取ctx.cookie后，传入createApp, 再注册到store里，部分需要用到用户登录信息的页面，
  即可直接在SSR里全局获取用户信息。
  同理，client-entry里的createApp，也需要传入cookie信息
