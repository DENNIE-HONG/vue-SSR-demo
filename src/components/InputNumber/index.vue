<template>
  <div class="com-inputnum">
    <span
      class="com-inputnum-btn"
      @click="minus">-</span>
    <span class="com-inputnum-txt">{{inputNumber}}</span>
    <span
      class="com-inputnum-btn"
      @click="add">+</span>
  </div>
</template>
<script>
/**
 * 计数器
 * @param {Number} number, 初始值
 * @param {Number} step, 步数, 默认1
 * @param {Number} min, 最小值, 默认无限小
 * @param {Number} max, 最大值，默认无限大
 * @param {function} change, 计数变化回调
 * @author luyanhong 2018-09-21
 * @example
 * <input-number v-model="xxx" :min="1"></input-number>
*/
export default {
  name: 'InputNumber',
  model: {
    prop: 'number',
    event: 'change'
  },
  props: {
    number: {
      required: true,
      type: Number
    },
    step: {
      default: 1,
      type: Number
    },
    min: {
      default: -Infinity,
      type: Number
    },
    max: {
      default: Infinity,
      type: Number
    }
  },
  watch: {
    inputNumber (val) {
      this.$emit('change', val);
    }
  },
  data () {
    return {
      inputNumber: this.number
    }
  },
  methods: {
    // 减少
    minus () {
      const result = this.inputNumber - this.step;
      if (result < this.min) {
        return;
      }
      this.inputNumber = result;
    },
    // 增加
    add () {
      const result = this.inputNumber + this.step;
      if (result > this.max) {
        return;
      }
      this.inputNumber = this.inputNumber + this.step;
    }
  }
}
</script>
<style lang="scss">
.com-inputnum {
  display: inline-block;
  border: 1px solid nth($fgray, 5);
  line-height: rem(40);
  text-align: center;
  vertical-align: top;
  &-btn {
    display: inline-block;
    padding: 0 rem(15);
    background-color: nth($fgray, 3);
    font-size: rem(28);
    vertical-align: top;
  }
  &-txt {
    display: inline-block;
    width: rem(70);
  }
}
</style>


