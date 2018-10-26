<template>
  <label class="com-checkbox">
    <input
      type="checkbox"
      class="com-checkbox-input"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
    />
    <div class="com-checkbox-box"><i class="checked"></i></div>
    <span class="com-checkbox-txt"><slot></slot></span>
  </label>
</template>
<script>
/**
 * 多选框
 * @param {Boolean} checked, 是否选中，默认否
 * @author luyanhong 2018-08-08
 * @example
 * <base-checkbox model="xx"></base-checkbox>
*/
export default {
  name: 'BaseCheckbox',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: {
      default: false,
      type: Boolean
    }
  }
}
</script>
<style lang="scss">
.com-checkbox {
  display: inline-block;
  line-height: rem(30);
  &-input {
    display: none;
  }
  &-input:checked {
    & + .com-checkbox-box {
      background-color: nth($fgreen, 1);
      .checked {
        display: block;
      }
    }
  }
  &-box {
    display: inline-block;
    width: rem(28);
    height: rem(28);
    border: 1px solid nth($fgreen, 1);
    text-align: center;
    vertical-align: middle;
    @include hid;
    .checked {
      display: none;
      color: white;
      font-size: rem(24);
      &:after {
        display: block;
        content: '\2713';
      }
    }
  }
  &-txt {
    display: inline-block;
    margin-top: rem(4);
    vertical-align: middle;
    font-size: rem(28);
  }
}
</style>


