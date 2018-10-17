<template>
  <div class="com-message modal-bg">
    <div :class="['com-message-txt', type]">
      <i :class="['iconfont', 'icon-' + type]"></i>
      {{message}}
    </div>
  </div>
</template>
<script>
/**
 * 消息提示模块
 * @author luyanhong 2018-08-03
*/
export default {
  name: 'MessageBox',
  props: {
    type: {
      default: 'info',
      type: String,
      validator (value) {
        return ['success', 'info', 'error', 'warning'].indexOf(value) !== -1
      }
    },

    message: {
      type: String,
      required: true
    }
  },
  // 默认消息提示3秒后消失
  created () {
    setTimeout(()=> {
      this.destroy();
    }, 3000);
  },
  methods: {
    destroy () {
      this.$el.parentNode.removeChild(this.$el);
      this.$destroy();
    }
  }
}

</script>
<style lang="scss">
.com-message {
  display: flex;
  align-items: center;
  justify-content: center;
  &-txt {
    max-width: 80%;
    padding: rem(20) rem(30);
    font-size: rem(28);
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: rem(10);
    color: white;
    @include wordbreak;
    > .iconfont {
      padding-right: rem(5);
    }
    &.error {
      color: nth($fred, 1);
      background-color: rgba(nth($fred, 2), 0.8);
    }
    &.warning {
      color: nth($fyellow, 1);
      background-color: nth($fyellow, 2);
    }
    &.success {
      color: nth($fgreen, 1);
      background-color: nth($fgreen, 3);
    }
  }
}
</style>


