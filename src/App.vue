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
    flex: 1;
  }
}
</style>

