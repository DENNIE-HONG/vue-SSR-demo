<template>
  <li class="com-dropdown-item">
    <slot></slot>
  </li>
</template>
<script>
export default {
  name: 'DropDownItem'
}
</script>
<style lang="scss">
.com-dropdown-item {
  padding: rem(15) rem(30);
  border-bottom: 1px solid gray;
  color: white;
  .iconfont {
    font-size: rem(34);
    padding-right: rem(10);
  }
  a {
    color: currentColor;
  }
  &:last-child {
    border-bottom: 0;
  }
}
</style>


