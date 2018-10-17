<template>
  <div>测试SSR</div>
</template>
<script>
export default {
  data () {
    return {
      msg: ''
    }
  },
  asyncData ({ store }) {
    return store.dispatch('setItem', 6545259);
  },
  created () {
    console.log('开始');
  }
}
</script>

