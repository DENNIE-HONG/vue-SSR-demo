<template>
  <div class="com-header">
    <router-link
      class="com-header-user"
      to="/my"><i class="iconfont icon-user"></i></router-link>
    <h1 class="com-header-logo">vue-SSR-demo</h1>
    <search-header />
  </div>
</template>
<script>
import SearchHeader from 'coms/SearchHeader/index.vue';
export default {
  name: 'HeaderBox',
  components: {
    SearchHeader
  },
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>
<style lang="scss">
.com-header {
  height: rem(188);
  padding: rem(20);
  box-sizing: border-box;
  &-user {
    float: left;
    > .iconfont {
      font-size: rem(36);
    }
  }
  &-logo {
    display: block;
    width: rem(60);
    height: rem(60);
    margin: 0 auto rem(15);
    background: url('./img/logo.png') top/100% no-repeat;
    text-indent: -999px;
  }
}
</style>
