<template>
  <div class="com-basetab">
    <ul class="com-basetab-box">
      <li
        v-for="(tab, index) in tabs"
        :class="['tab', { active: tab.name === activeName }]"
        @click="changeTab(tab.name, index)">{{tab.label}}</li>
    </ul>
    <div
      class="com-basetab-content"
      ref="pane"
      :style="{width: tabCount * 100 + '%'}">
      <slot></slot>
    </div>
  </div>
</template>
<script>
/**
 * tabs页
 * @param {String}   activeName, 当前默认tab
 * @author luyanhong 2018-09-17
 * @example
 * <base-tabs>
 *  <base-tabs-pane name="1" label="1">我是一</base-tabs-pane>
 * </base-tabs>
*/
export default {
  name: 'BaseTabs',
  model: {
    prop: 'activeName',
    event: 'tab-change'
  },
  props: {
    activeName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      tabs: [],
      name: this.activeName
    }
  },
  computed: {
    tabCount () {
      return this.tabs.length;
    }
  },
  mounted () {
    this.getTabs();
  },
  methods: {
    getTabs () {
      this.$children.map((child, index) => {
        const data = {
          name: child.name,
          label: child.label,
          panels: child.$slots.default
        };
        this.tabs.push(data);
        if (child.name === this.activeName) {
          this.setTransform(index);
        }
      });
    },
    // 标签切换
    changeTab (activeName, index) {
      this.$emit('tab-change', activeName);
      this.name = activeName;
      this.setTransform(index);
    },
    // 根据index设置tab滚动距离,index从0开始算
    setTransform (index) {
      const translateX = -1 / this.tabCount * index * 100;
      this.$refs.pane.style.transform = `translateX(${translateX}%)`;
    }
  }
}
</script>
<style lang="scss">
.com-basetab {
  background-color: white;
  @include hid;
  &-box {
    height: rem(90);
    display: flex;
    justify-content: space-around;
    align-items: center;
    .tab {
      padding: rem(15) 0;
      flex: 1;
      border-right: 1px solid nth($fgray, 1);
      &.active {
        color: nth($fgreen, 1);
      }
    }
  }
  &-content {
    display: flex;
    transition: transform 0.3s ease;
  }
}
</style>


