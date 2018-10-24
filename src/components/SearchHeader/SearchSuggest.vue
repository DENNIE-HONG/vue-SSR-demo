<template>
  <div class="com-search">
    <header class="com-search-box">
      <div class="search-header">
        <i class="iconfont icon-search"></i>
        <input
          type="text"
          class="com-search-header-input"
          :placeholder="placeholder"
          @keydown.13="submit(value)"
          v-model="value"
        />
      </div>
      <button @click="destroy">取消</button>
    </header>
    <article class="com-search-result">
      <ul>
        <li
          v-for="item in result"
          class="com-search-result-item"
          @click="submit(item[0])">{{item[0]}}
        </li>
      </ul>
    </article>
    <section v-show="historyWords.length">
      <h3>历史搜索</h3>
      <span
        v-for="tag in historyWords"
        class="tag"
        @click="linkToSearch(tag)">{{tag}}
      </span>
    </section>
  </div>
</template>
<script>
/**
 * 搜索自动匹配模块
 * @param {String}      placeholder,搜索输入提示
 * @author luyanhong 2018-10-24
*/
import { debounce } from 'throttle-debounce';
import lockWindow from 'utils/lockWindow.js';
import { getSuggest } from 'api';
const MAX_HISTORY_WORDS = 10;
/**
 * @param {Array}   存储的数组
*/
const storage = (data) => {
  const key = 'history-words';
  if (!data) {
    const dataStr = localStorage.getItem(key);
    return JSON.parse(dataStr) || [];
  }
  const historyStr = JSON.stringify(data)
  localStorage.setItem(key, historyStr);
};
// 强制参数
const required = () => {
  throw Error('missing parameter');
};
export default {
  name: 'SearchSuggest',
  props: {
    placeholder: {
      default: '',
      type: String
    },
    defaultValue: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      value: this.defaultValue,
      result: [],
      sendData: {
        q: ''
      },
      historyWords: []
    }
  },
  watch: {
    value () {
      this.debounceGetSearch();
    },
    '$route' (to, from) {
      // 对路由变化作出响应...
      console.log(to);
      this.destroy();
    },
    historyWords () {
      if (this.historyWords.length > MAX_HISTORY_WORDS) {
        this.historyWords.splice(-1, 1);
      }
    }
  },
  created () {
    this.debounceGetSearch = debounce(400, this.getSearch);
    this.historyWords = storage();
  },
  methods: {
    destroy () {
      this.$el.parentNode.removeChild(this.$el);
      lockWindow({
        isLock: false
      });
      this.$destroy();
    },
    getSearch () {
      if (!this.value) {
        return;
      }
      this.sendData.q = this.value;
      getSuggest(this.value).then((res) => {
        this.result = res.data.result;
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err.toSring()
        });
      });
    },
    submit (keyword = required()) {
      keyword = keyword.trim();
      if (!keyword) {
        return;
      }
      if (!this.historyWords.includes(keyword)) {
        this.historyWords.unshift(keyword);
        storage(this.historyWords);
      }
      this.$router.push({ path: `/search?keyword=${keyword}` });
      this.destroy();
    },
    linkToSearch (keyword) {
      console.log(this.$router);
      this.$router.push({ path: `/search?keyword=${keyword}` });
      this.destroy();
    }
  }
}
</script>

<style lang="scss">
.com-search {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  padding: rem(20);
  background-color: nth($fgray, 3);
  z-index: 1000;
  &-box {
    display: flex;
    .search-header {
      flex: 1;
    }
  }
  button {
    padding: 0 rem(30);
  }
  &-result {
    background-color: white;
    &-item {
      padding: rem(30) rem(40);
      font-size: rem(28);
      line-height: rem(40);
      border-bottom: 1px solid nth($fgray, 1);
    }
  }
}
</style>
