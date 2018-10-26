<template>
  <div
    v-show="state"
    class="com-loadmore">
    <div
      v-show="state === 1"
      @click="loadmore">点击加载更多
    </div>
    <div
      v-show="state === 2"
      class="com-loadmore-loading">拼命加载中...
    </div>
    <div
      v-show="state === 3"
      class="com-loadmore-end"><span>我是有底线的</span>
    </div>
    <div
      v-show="state === 4"
      @click="loadmore">加载失败
    </div>
  </div>
</template>
<script>
/**
 * 加载更多模块
 * @param {String}      url，加载资源url
 * @param {Function}    success, 加载成功后事件
 * @param {Object}      params, 请求传送数据
 * @param {Boolean}     isImmediateLoad, 是否立马加载数据，默认是
 * @param {Boolean}     jsonp, 是否跨域，默认否
 * @author luyanhong 2018-08-15
 * @example
 * <load-more url="xxx" success="function" params="{}" />
*/
// import jsonp from 'jsonp';
// import querystring from 'querystring';
import { debounce } from 'throttle-debounce';
import scrollBottom from 'utils/scroll-bottom.js';
const READY = 1; // 准备
const LOADING = 2; // 加载中动画
const END = 3; // 加载到底了
const FAIL = 4; // 加载失败
const HIDE = 0
const required = () => {
  throw Error('missing parameter error!');
}
export default {
  name: 'LoadMore',
  props: {
    url: {
      required: true,
      type: String
    },
    success: {
      required: true,
      type: Function
    },
    params: Object,
    jsonp: {
      default: false,
      type: Boolean
    },
    async: {
      default: false,
      type: Boolean
    }
  },
  mounted () {
    // 绑定触底加载更多
    const debounceScroll = debounce(100, this.scrollToBottomLoading.bind(this));
    window.addEventListener('scroll', debounceScroll);
    // 异步渲染
    if (this.async) {
      this.loadmore();
    }
  },
  data () {
    return {
      state: READY
    }
  },
  methods: {
    /**
     * 点击加载更多
    */
    loadmore () {
      this.state = LOADING;
      this.$store.dispatch(this.url, this.params).then((data)=> {
        this.state = READY;
        if (data.length < this.params.pageSize) {
          this.toEnd();
        } else {
          this.success(data);
        }
      }).catch(() => {
        this.fail('网络开小差啦');
      });
    },
    /**
     * 加载失败
     * @param {String}  error, 失败信息
    */
    fail (error = required()) {
      this.state = FAIL;
      this.$message({
        type: 'error',
        message: error
      });
    },
    // 加载到底了
    toEnd () {
      this.state = END;
    },
    // 触底加载事件
    scrollToBottomLoading () {
      if (scrollBottom(window, 30)) {
        const isHide = this.$el.offsetParent === null;
        !isHide && this.state !== END && this.params.page % 3 !== 0 && this.loadmore();
      }
    },
    hide () {
      this.state = HIDE;
    }
  }
}
</script>
<style lang="scss">
.com-loadmore {
  text-align: center;
  border-top: 1px solid nth($fgray, 1);
  border-bottom: 1px solid nth($fgray, 1);
  background-color: white;
  color: nth($fblack, 3);
  line-height: rem(80);
  @include hid;
  &-end {
    width: 60%;
    margin: rem(80) auto 0;
    border-top: 1px solid nth($fblack, 3);
    > span {
      display: inline-block;
      position: relative;
      top: rem(-40);
      width: 55%;
      background-color: white;
      line-height: 1;
    }
  }
  &-loading {
    &:before {
      display: inline-block;
      width: rem(40);
      height: rem(40);
      margin-right: rem(10);
      margin-top: rem(20);
      content: '';
      background: url('./img/loading.gif') top/100% no-repeat;
      vertical-align: top;
    }
  }
}
</style>


