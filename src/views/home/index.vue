<template>
  <div class="home">
    <header-box />
    <section>
      <div class="home-guess">
        <span class="line"></span>
        <h3 class="home-guess-txt"><i class="iconfont icon-search"></i>猜你喜欢</h3>
      </div>
      <product-list :productList="productList"/>
      <load-more :url="url" :success="loadSuccess" :params="sendData" ref="loadmore"/>
    </section>
    <footer class="home-footer">
      <nav>
        <a class="active" href="javascript:;  "><i class="iconfont icon-home"></i><p class="footer-txt">首页</p></a>
        <router-link to="/cart"><i class="iconfont icon-cart"></i><p class="footer-txt">购物车</p></router-link>
        <router-link to="/my"><i class="iconfont icon-user"></i><p class="footer-txt">我的</p></router-link>
      </nav>
    </footer>
  </div>
</template>
<script>
import HeaderBox from 'coms/HeaderBox';
import ProductList from 'coms/ProductList';
import LoadMore from 'coms/LoadMore';
export default {
  name: 'Home',
  components: {
    HeaderBox,
    ProductList,
    LoadMore
  },
  metaInfo: {
    title: 'My Vue Home',
    meta: [
      {
        'property': 'keywords',
        'content': 'vue练习首页'
      },
      {
        'property': 'description',
        'content': 'vue练习首页'
      }
    ]
  },
  data () {
    return {
      url: 'home/FETCH',
      sendData: {
        page: 1,
        pageSize: 22
      }
    }
  },
  computed: {
    productList () {
      return this.$store.state.home.productList;
    }
  },
  asyncData ({ store }) {
    return store.dispatch('home/FETCH', { page: 1, pageSize: 22 });
  },
  // 服务端加载第一页后更新页数
  mounted () {
    this.loadSuccess();
  },
  methods: {
    loadSuccess () {
      this.sendData.page += 1;
    }
  }
}
</script>
<style lang="scss">
.home {
  &-guess {
    position: relative;
    background-color: white;
    text-align: center;
    .line {
      position: absolute;
      top: 50%;
      left: 50%;
      display: inline-block;
      width: 50%;
      height: 1px;
      margin-left: -25%;
      background-color: nth($fgreen, 1);
    }
    &-txt {
      position: relative;
      display: inline-block;
      padding: 0 rem(25);
      background-color: white;
      z-index: 2;
      color: nth($fgreen, 1);
      > .iconfont {
        display: inline-block;
        font-size: rem(44);
        vertical-align: top;
      }
    }
  }
  &-footer {
    position: fixed;
    height: rem(90);
    width: 100%;
    border-top: 1px solid nth($fgray, 1);
    bottom: 0;
    box-sizing: border-box;
    box-shadow: 0 0 10px 0 hsla(0,6%,58%,.6);
    > nav {
      display: flex;
      height: 100%;
      justify-content: space-around;
      background-color: white;
    }
    a {
      text-align: center;
      color: nth($fblack, 2);
      &.active {
        color: nth($fgreen, 1);
      }
    }
    .footer-txt {
      margin-top: 0;
      line-height: 1;
      font-size: rem(24);
    }
  }
}
</style>


