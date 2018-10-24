<template>
  <div
    class="search-header"
    @click="showSearch">
    <i class="iconfont icon-search"></i>
    <div :class="['search-header-txt', {active: defaultValue}]">{{defaultValue ? defaultValue: placeholder}}</div>
  </div>
</template>
<script>
import Vue from 'vue';
import SearchSuggest from './SearchSuggest.vue';
import lockWindow from 'utils/lockWindow';
/**
 * 搜索头部模块
 * @param {String}   placeholder
 * @author luyanhong 2018-07-30
 * @example
 * <search-header placeholder="搜索"></search-header>
*/
export default {
  name: 'SearchHeader',
  props: {
    placeholder: {
      default: '搜索你感兴趣的',
      type: String
    },
    defaultValue: {
      default: '',
      type: String
    }
  },
  components: {
    SearchSuggest
  },
  methods: {
    showSearch () {
      lockWindow({
        isLock: true
      });
      Object.assign(SearchSuggest, {
        router: this.$router
      });
      const MessageComponent = Vue.extend(SearchSuggest);
      let instance = null;
      const propsData = {
        placeholder: this.placeholder,
        defaultValue: this.defaultValue
      };
      instance = new MessageComponent({ propsData }).$mount();
      document.body.appendChild(instance.$el);
    }
  }
}
</script>


