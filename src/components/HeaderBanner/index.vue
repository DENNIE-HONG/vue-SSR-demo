<template>
  <header class="com-header-banner">
    <div
      class="header-go-back"
      v-once
      @click="goBack"><i class="iconfont icon-left"></i>
    </div>
    <span class="com-header-banner-slot"><slot></slot></span>
    <drop-down
      v-once
      class="com-header-banner-right">
      <div class="header-more"><i class="iconfont icon-transverse-more"></i></div>
      <drop-down-menu slot="dropdown">
        <drop-down-item>
          <router-link to="/"><i class="iconfont icon-home"></i>首页</router-link>
        </drop-down-item>
        <drop-down-item>
          <router-link to="/my"><i class="iconfont icon-user"></i>我的vue</router-link>
        </drop-down-item>
      </drop-down-menu>
    </drop-down>
  </header>
</template>
<script>
/**
 * 通用头部通栏
 * 插槽显示的是中间部分
 * @author luyanhong 2018-08-24
*/
import DropDown from 'coms/DropDown/index.vue';
import DropDownMenu from 'coms/DropDown/menu.vue';
import DropDownItem from 'coms/DropDown/item.vue';
export default {
  name: 'HeaderBanner',
  components: {
    DropDown,
    DropDownMenu,
    DropDownItem
  },
  methods: {
    goBack () {
      this.$router.go(-1);
    }
  }
}
</script>
<style lang="scss">
.com-header-banner {
  display: flex;
  padding: rem(20) 0;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid nth($fgray, 1);
  box-sizing: border-box;
  &-slot {
    flex: 1;
    text-align: center;
    font-size: rem(30);
  }
  &-right {
    font-size: rem(28);
  }
}
</style>


