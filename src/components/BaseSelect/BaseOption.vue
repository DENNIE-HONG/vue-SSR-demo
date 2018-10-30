<template>
  <li
    :class="['com-option', {active: selected.includes(label)}]"
    :value="value"
    @click="onSelect">{{label}}
  </li>
</template>
<script>
/**
 * @param {String|Number}  value, 选项代表的值
 * @param {String}         label, 选项的文本
 * @author luyanhong   2018-08-14
 * @example
 * <base-option value="1" label="选项1""></base-option>
*/
export default {
  name: 'BaseOption',
  props: {
    value: {
      required: true,
      type: [String, Number]
    },
    label: {
      required: true,
      tyep: String
    }
  },
  created () {
    // 接收初始选中的值,参数是{Array}，注意必须是引用对象，多个option需要共享同个数组
    this.$on('defaultSelected', (selectedArr) => {
      this.selected = selectedArr;
    });
    this.multiple = this.$parent.multiple;
    this.isGroup = this.$parent.$options._componentTag === 'base-select';
  },
  data () {
    return {
      multiple: false,
      isSelected: false,
      selected: [],
      isGroup: false
    }
  },
  methods: {
    onSelect () {
      // 向父组件通知
      const name = this.label;
      const { value } = this;
      const selectedData = {
        name,
        value
      };
      if (!this.multiple) {
        this.selected.length = 0;
      }
      if (this.selected.includes(name)) {
        // 多选情况，再次点击是取消选项
        this.selected.splice(this.selected.findIndex((item) => { item === name}));
        this.isGroup && this.$parent.$emit('cancelSelected', selectedData);
      } else {
        this.selected.push(name);
        this.isGroup && this.$parent.$emit('selectChange', selectedData);
      }
      // 通知父组件
    }
  }
}
</script>
<style lang="scss">
.com-option {
  position: relative;
  padding: 0 rem(40);
  border-bottom: 1px solid nth($fgray, 1);
  text-align: left;
  &.active {
    &:after {
      position: absolute;
      top: 50%;
      right: rem(40);
      display: block;
      width: rem(20);
      height: rem(20);
      margin-top: rem(-20);
      content: '';
      border-radius: 50%;
      border: rem(10) solid white;
      box-shadow: 0 0 0 rem(3) nth($fblack, 3);
      background-color: nth($fgreen, 1);
    }
  }
}
</style>


