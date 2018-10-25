<template>
  <div class="com-dropdown">
    <span @click.stop="toggleShow"><slot></slot></span>
    <div
      ref="dropmenu"
      :class="['com-dropdown-box', {hide: isHide}]">
      <slot name="dropdown"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DropDown',
  data () {
    return {
      isHide: true
    }
  },
  mounted () {
    const body = document.querySelector('body');
    body.addEventListener('click', (e) => {
      if (this.$refs.dropmenu && !this.$refs.dropmenu.contains(e.target)) {
        this.isHide = true;
      }
    });
  },
  methods: {
    toggleShow () {
      this.isHide = !this.isHide;
    }
  }
}
</script>
<style lang="scss">
.com-dropdown {
  position: relative;
  &-box {
    position: absolute;
    top: 150%;
    right: rem(10);
    min-width: rem(250);
    background-color: nth($fblack, 1);
    color: white;
    border-radius: rem(10);
    z-index: 1000;
    &:after {
      position: absolute;
      top: rem(-15);
      right: rem(10);
      width: 0;
      height: 0;
      border-bottom: rem(20) solid nth($fblack, 1);
      border-left: rem(20) solid transparent;
      border-right: rem(20) solid transparent;
      content: '';
    }
  }
}

</style>

