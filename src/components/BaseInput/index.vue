<template>
  <div class="com-input">
    <input
      class="com-input-box"
      :type="type"
      v-bind="$attrs"
      :value="value"
      @input="onInput"
      autocomplete="off"
    />
    <i
      v-if="clearable"
      class="iconfont icon-close"
      @click="clear"
      :class="{ hide: isHideClearBtn}">
    </i>
  </div>
</template>
<script>
/**
 * 输入模块
 * @author luyanhong
*/
export default {
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    type: {
      default: 'text',
      type: String,
      validator (value) {
        return ['email', 'number', 'password', 'search', 'text', 'url', 'tel'].indexOf(value) !== -1
      }
    },
    value: String,
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isHideClearBtn: true
    }
  },
  watch: {
    value (val) {
      if (this.clearable) {
        val && (this.isHideClearBtn = false);
        !val && (this.isHideClearBtn = true);
      }
    }
  },

  methods: {
    // 输入事件
    onInput ($event) {
      this.$emit('input', $event.target.value);
    },
    // 清空输入框
    clear () {
      this.$emit('input', '');
      this.isHideClearBtn = true;
    }
  }
}
</script>
<style lang="scss">
.com-input {
  display: flex;
  padding: 0 rem(20);
  background-color: white;
  border: 1px solid nth($fgray, 1);
  border-radius: rem(8);
  align-items: center;
  &-box {
    flex: 1;
    padding: rem(20) 0;
    font-size: rem(28);
  }
  &:active,
  &:hover {
    border-color: nth($fgreen, 1);
  }
  .iconfont {
    color: nth($fblack, 3);
  }
}
</style>


