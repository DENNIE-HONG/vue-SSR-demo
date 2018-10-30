<template>
  <div
    class="com-select"
    @click="close">
    <div
      class="com-select-btn"
      @click.stop="show">
      <span v-if="!multiple || collapseTags">{{selectedNames.length ? selectedNames.toString(): placeholder}}</span>
    </div>
    <div
      v-if="multiple && !collapseTags"
      class="com-select-tags">
      <span
        v-for="tag in selectedNames"
        class="tag-default"
        @click="cancel(tag)"
        :key="tag"
        :value="tag">{{tag}}<i class="iconfont icon-close"></i>
      </span>
      <span v-if="!selectedNames.length">{{placeholder}}</span>
    </div>
    <div :class="['com-select-box', 'modal-bg', 'black', {hide: isHide}]">
      <ul class="com-select-list">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>
<script>
/**
 * 选择器
 * @param {String}   placeholder, 提示文本
 * @param {Array| Number| String} value, 选中的值
 * @param {Boolean}  multiple, 是否是多选，默认否
 * @param {Boolean}  collapseTags, 是否将选中值合并为一段文字，默认否，
 * @author luyanhong 2018-08-14
 * @example
 * <base-select v-modal="xxx"></base-select>
*/
import lockWindow from 'utils/lockWindow.js';
export default {
  name: 'BaseSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: [String, Number, Array],
    placeholder: {
      default: '请选择',
      type: String
    },
    multiple: {
      default: false,
      type: Boolean
    },
    collapseTags: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      isHide: true,
      selected: new Map(),
      selectedNames: []
    }
  },
  created () {
    // 接受子组件option传递参数, 当前选中对象，{Object}
    this.$on('selectChange', (data) => {
      if (!this.selected.has(data.name)) {
        // 多选情况/单选情况
        if (this.multiple) {
          this.selected.set(data.name, data.value);
          this.$emit('change', [...this.selected.values()]);
        } else {
          this.showOff();
          this.selected.clear();
          this.selected.set(data.name, data.value);
          this.$emit('change', data.value);
        }
      }
    });
    // 多选情况，接受子组件取消事件
    this.$on('cancelSelected', (data) => {
      this.selected.delete(data.name);
      this.$emit('change', [...this.selected.values()]);
    })
  },
  mounted () {
    // 获取初始选中的option
    this.getSelected();
  },
  methods: {
    show () {
      this.isHide = false;
      lockWindow({
        isLock: true
      });
    },
    showOff () {
      this.isHide = true;
      lockWindow({
        isLock: false
      });
    },
    // 点击空白区域收起
    close ($event) {
      if ($event.target.className.includes('com-select')) {
        this.showOff();
      }
    },
    getSelected () {
      let valueArr = Array.isArray(this.value) ? this.value : [this.value];
      if (!this.multiple && valueArr.length > 1) {
        [valueArr] = valueArr;
      }
      valueArr.map((value) => {
        for (let $child of this.$children) {
          if ($child.value === value) {
            this.selected.set($child.label, $child.value);
            break;
          }
        }
      });
      this.selectedNames = [...this.selected.keys()];
      this.noticeChildrenSelected(this.selectedNames);
    },
    /**
     * 通知子组件初始选中值
     * @param {Array}  选中选项数组
    */
    noticeChildrenSelected (selectedArr) {
      this.$children.map(($child) => {
        $child.$options._componentTag === 'base-option' && $child.$emit('defaultSelected', selectedArr);
      });
    },
    // 删除当前选中标签
    cancel (tagName) {
      const { selectedNames } = this;
      this.selected.delete(tagName);
      selectedNames.splice(selectedNames.findIndex((item) => item === tagName), 1);
      this.$emit('change', [...this.selected.values()]);
    }
  }
}
</script>
<style lang="scss">
.com-select {
  position: relative;
  height: 100%;
  width: 90%;
  @include hid;
  &-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-btn {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
  &-list {
    width: 80%;
    border: 1px solid nth($fgray, 1);
    background-color: white;
    @include boxShadow;
    border-radius: rem(8);
    color: nth($fblack, 1);
  }
  &-tags {
    .tag-default {
      position: relative;
      margin-bottom: rem(5);
      z-index: 1;
    }
  }
}
</style>
