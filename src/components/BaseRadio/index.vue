<template>
  <label class="com-radio">
    <span><slot></slot></span>
    <input
      type="radio"
      class="com-radio-input"
      :name="name"
      :value="label"
      :checked="value === label"
      @click="onChange"
      v-model="model"
    />
  </label>
</template>
<script>
/**
 * 单选框
 * @param label   必须, {String|Number} 选中radio代表的值
 * @param name    可选, {String}
 * @author luyanhong 2018-08-06
*/
import Bus from 'utils/bus.js';
export default {
  name: 'BaseRadio',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    name: {
      default: 'radio',
      type: String
    },
    label: {
      default: '',
      type: [String, Number],
      required: true
    },

    value: {
      type: [String, Number]
    }

  },
  data () {
    return {
      isGroup: false
    }
  },
  computed: {
    model: {
      get () {
        return this.isGroup ? this.$parent.value : this.value;
      },
      set (val) {
        !this.isGroup && this.$emit('change', val);
        this.isGroup && Bus.$emit('radioGroupChange', val);
      }
    }
  },
  created () {
    this.isGroup = this.$parent.$options._componentTag === 'base-radio-group';
  },
  methods: {
    onChange ($event) {
      // 选中的值没有改变, 也要关闭弹窗
      if (this.model === $event.target._value) {
        this.isGroup && this.$parent.noticeParentClose();
      }
    }
  }
}
</script>
<style lang="scss">
.com-radio {
  display: block;
  padding: rem(20);
  background-color: white;
  font-size: rem(30);
  border-top: 1px solid nth($fgray, 1);
  &-input {
    opacity: 0;
  }
}
</style>
