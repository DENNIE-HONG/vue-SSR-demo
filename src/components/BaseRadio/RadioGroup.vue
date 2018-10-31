<template>
  <div
    :class="['com-radio-group', 'modal-bg', 'black', {hide: isHide}]"
    @click="close">
    <div class="com-radio-box">
      <h3>{{title}}</h3>
      <slot></slot>
    </div>
  </div>
</template>
<script>
/**
 * 单选组模块
 * @param {String}    title, 标题
 * @param {Boolean}   isHide, 是否隐藏
 * @param {event}     closeRadio, 隐藏事件，参数是true
 * @author luyanhong 2018-08-06
*/
import Bus from 'utils/bus.js';
export default {
  name: 'BaseRadioGroup',
  model: {
    prop: 'value',
    event: 'changeRadio'
  },
  props: {
    title: {
      default: '请选择',
      type: String
    },
    isHide: {
      default: true,
      type: Boolean
    },
    value: [String, Number]
  },
  data () {
    return {
      isVisible: false
    }
  },
  created () {
    Bus.$on('radioGroupChange', (value) => {
      this.$emit('changeRadio', value);
      this.noticeParentClose();
    });
  },
  methods: {
    // 点击空白区域关闭
    close ($event) {
      if ($event.target.className.includes('com-radio-group')) {
        this.noticeParentClose();
      }
    },
    // 通知父组件关闭窗口
    noticeParentClose () {
      this.$emit('closeRadio', { isHide: true });
    }
  }
}
</script>
<style lang="scss">
.com-radio-group {
  display: flex;
  align-items: center;
  justify-content: center;
  .com-radio-box {
    width: 80%;
    padding: 0 rem(20);
    background-color: white;
    border-radius: rem(8);
    box-sizing: border-box;
  }
}
</style>
