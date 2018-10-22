<template>
  <div id="app">
    <keep-alive>
      <router-view
        :key="$route.fullpath +new Date()"
        class="content"></router-view>
    </keep-alive>
    <the-footer />
  </div>
</template>
<script>
import TheFooter from 'coms/Layout/TheFooter';
export default {
  name: 'app',
  components: {
    TheFooter
  }
};
</script>
<style lang="scss">
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

