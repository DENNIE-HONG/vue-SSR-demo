<template>
  <div class="question">
    <header-banner>问答专区</header-banner>
    <section
      v-if="questionList.length"
      class="question-box">
      <dl class="question-list">
        <dt>
          <router-link
            :to="'/product/' + productId"
            class="title question-link">关于“ <span class="question-link-txt">{{questionTitle}}</span>” 的{{total}}个问题
            <span class="pull-right"><i class="iconfont icon-right"></i></span>
          </router-link>
        </dt>
        <dd
          v-for="item in questionList"
          :key="item.id"
          class="question-item">
          <router-link :to="'/question/' + productId + '/detail/' + item.id">
            <div class="question-info">
              {{item.pin}}的提问:
              <span class="pull-right">{{item.created}}</span>
            </div>
            <h4 class="question-title"><i class="iconfont icon-ask"></i>{{item.content}}</h4>
            <article class="question-content"><i class="iconfont icon-write"></i>{{item.answerCount ? item.answerList[0].content:
            '暂无回答'}}</article>
            <div
              v-if="item.answerCount"
              class="question-more pull-right">查看全部{{item.answerCount}}个回答<i class="iconfont icon-right"></i></div>
          </router-link>
        </dd>
      </dl>
      <load-more
        v-if="questionList.length >= sentData.pageSize"
        ref="loadmore"
        url="question/FETCH"
        :params="sentData"
        :success="fetchData"
      />
    </section>
  </div>
</template>
<script>
import HeaderBanner from 'coms/HeaderBanner';
import LoadMore from 'coms/LoadMore';
export default {
  name: 'Question',
  components: {
    HeaderBanner,
    LoadMore
  },
  metaInfo: {
    title: 'my question',
    meta: [
      {
        'property': 'keywords',
        'content': 'vue问题页'
      },
      {
        'name': 'description',
        'content': 'vue问题页'
      }
    ]
  },
  asyncData ({ store, route }) {
    return store.dispatch('question/FETCH', { page: 1, productId: route.params.productId });
  },
  mounted () {
    this.sentData.page += 1;
  },
  data () {
    return {
      productId: this.$route.params.productId,
      sentData: {
        pageSize: 10,
        page: 1,
        productId: this.$route.params.productId
      }
    }
  },
  computed: {
    questionList () {
      return this.$store.state.question.questionList;
    },
    questionTitle () {
      return this.$store.state.question.questionTitle;
    },
    total () {
      return this.$store.state.question.total;
    }
  },
  methods: {
    fetchData (res) {
      if (res.resultCode === '0') {
        const { questionList } = res.result;
        if (questionList.length) {
          if (questionList.length < this.sentData.pageSize) {
            if (this.sentData.page === 1) {
              this.$refs.loadmore.hide();
            } else {
              this.$refs.loadmore.toEnd();
            }
            return;
          }
          this.sentData.page += 1;
        } else {
          this.$refs.loadmore.toEnd();
        }
      } else {
        this.$refs.loadmore.fail('error');
      }
    }
  }
}
</script>
<style lang="scss">
.question {
  .question-link {
    display: flex;
    &-txt {
      display: inline-block;
      flex: 1;
      @include txthid;
      @include hid;
      @include wordbreak;
    }
  }
  &-item {
    padding: rem(20);
    margin-top: rem(15);
    background-color: white;
    @include hid;
  }
  &-info {
    color: nth($fblack, 3);
    font-size: rem(24);
  }
  &-title {
    margin: rem(15) 0;
    font-size: rem(34);
    > .iconfont {
      padding-right: rem(5);
      color: nth($fyellow, 2);
    }
  }
  &-content {
    > .iconfont {
      padding-right: rem(5);
      color: nth($fgreen, 1);
    }
  }
  &-more {
    margin-top: rem(10);
    color: nth($fgreen, 1);
    font-size: rem(24);
    line-height: 1;
    .iconfont {
      position: relative;
      top: 1px;
      font-size: rem(28);
    }
  }
}
</style>
