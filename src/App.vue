<template>
  <div id="app">
    <router-view
      :key="$route.fullpath +new Date()"
      class="content"></router-view>
    <the-footer />
  </div>
</template>
<script>
import TheFooter from 'coms/Layout/TheFooter';
import '@babel/polyfill';
export default {
  name: 'app',
  components: {
    TheFooter
  }
};
</script>
<style lang="scss">
@import './assets/main.scss';
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    width: 100%;
    flex: 1;
  }
}
</style>

