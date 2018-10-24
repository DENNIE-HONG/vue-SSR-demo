<template>
  <div class="com-header">
    <a href="javascript:;" class="com-header-user"><i class="iconfont icon-user"></i></a>
    <div class="com-header-logo"></div>
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
  }
}
</style>
