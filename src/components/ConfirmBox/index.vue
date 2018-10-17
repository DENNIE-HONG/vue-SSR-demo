<template>
  <div class="com-confirm modal-bg black">
    <div class="com-confirm-box">
      <div class="com-confirm-content">{{text}}</div>
      <div class="com-confirm-btns">
        <div
          class="com-confirm-btn"
          @click="handleCancel">{{cancelButtonText}}</div>
        <b
          class="com-confirm-btn"
          @click="handleOk"
        >{{confirmButtonText}}</b>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 消息提示框
 * @param {String}   text, 文案
 * @param {String}   confirmButtonText, 确定按钮文案，默认‘确定’
 * @param {String}   cancelButtonText, 取消操作文案，默认‘取消’
 * @param {function} ok, 确定事件
 * @param {function} cancel, 取消事件
 * @author luyanhong 2018-09-27
*/
import lockWindow from 'utils/lockWindow';
export default {
  name: 'ConfirmBox',
  props: {
    text: {
      required: true,
      type: String
    },
    confirmButtonText: {
      default: '确定',
      type: String
    },
    cancelButtonText: {
      default: '取消',
      type: String
    },
    ok: {
      default: function () {},
      type: Function
    },
    cancel: {
      default: function () {},
      type: Function
    }
  },
  created () {
    lockWindow();
  },
  methods: {
    remove () {
      this.$el.parentNode.removeChild(this.$el);
      this.$destroy();
      lockWindow({ isLock: false });
    },
    handleOk () {
      this.remove();
      this.callback && this.callback('confirm')
    },
    handleCancel () {
      this.remove();
      this.callback && this.callback('cancel');
    }
  }
}
</script>
<style lang="scss">
.com-confirm {
  display: flex;
  justify-content: center;
  align-items: center;
  &-box {
    width: 70%;
    background-color: white;
    border-radius: rem(8);
  }
  &-content {
    min-height: rem(100);
    padding: rem(30) rem(50);
    line-height: rem(44);
    @include wordbreak;
    text-align: center;
    font-size: rem(28);
    border-bottom: 1px solid nth($fgray, 1);
  }
  &-btn {
    width: 50%;
    float: left;
    height: rem(80);
    line-height: rem(80);
    text-align: center;
    font-size: rem(32);
    color: nth($fgreen, 1);
    box-sizing: border-box;
    @include wordbreak;
    @include hid;
    &:first-child {
      border-right: 1px solid nth($fgray, 1);
    }
  }
}
</style>


