<template>
  <div class="question-detail">
    <header-banner>问题详情</header-banner>
    <section class="question-detail-info">
      <router-link
        :to="'/product/' + productId"
        class="question-detail-product">
        <div class="detail-pic">
          <img
            :src="'//img12.360buyimg.com/evalpic/s240x240_' + productInfo.imgUrl"
            :alt="productInfo.shortName"/>
        </div>
        <h5 class="product-title">{{productInfo.fullName}}</h5>
        <div class="pull-right"><i class="iconfont icon-right"></i></div>
      </router-link>
      <div class="question-detail-box">
        <div class="detail-user">用户{{questionInfo.pin}}的提问：<span class="pull-right">{{questionInfo.created}}</span></div>
        <h3 class="detail-title"><i class="iconfont icon-ask"></i>{{questionInfo.content}}</h3>
      </div>
    </section>
    <section class="question-detail-answer">
      <p class="detail-count">{{questionInfo.answerCount? '共' + questionInfo.answerCount + '个回答': '暂无回答'}}</p>
      <ul
        v-if="answerList.length"
        class="question-detail-list">
        <li
          v-for="item in answerList"
          :key="item.id"
          class="question-detail-item">
          <div class="detail-answer-user"><span class="red">已买的人</span>用户{{item.pin}}说：</div>
          <article class="detail-answer-content"><i class="iconfont icon-write"></i>{{item.content}}</article>
          <div class="detail-answer-time">{{item.created}}</div>
        </li>
      </ul>
      <empty-list
        v-else
        text="回答的人正在赶来的路上..."
      />
      <load-more
        v-if="answerList.length >= sentData.pageSize"
        ref="loadmore"
        url="answer/FETCH"
        :params="sentData"
        :success="fetchData"
      />
    </section>
  </div>
</template>
<script>
import HeaderBanner from 'coms/HeaderBanner';
import LoadMore from 'coms/LoadMore';
import EmptyList from 'coms/EmptyList';
export default {
  name: 'QuestionDetail',
  metaInfo: {
    title: 'my question detail',
    meta: [
      {
        'property': 'keywords',
        'content': 'vue问题详情页'
      },
      {
        'property': 'description',
        'content': 'vue问题详情页'
      }
    ]
  },
  components: {
    HeaderBanner,
    LoadMore,
    EmptyList
  },
  computed: {
    productId () {
      return this.$route.params.productId;
    },
    questionId () {
      return this.$route.params.id;
    },
    answerList () {
      return this.$store.state.answer.answerList;
    },
    questionInfo () {
      return this.$store.state.answer.questionInfo;
    },
    productInfo () {
      return this.$store.state.answer.productInfo;
    }
  },
  mounted () {
    this.sentData.page += 1;
  },
  data () {
    return {
      sentData: {
        page: 1,
        pageSize: 10,
        productId: this.$route.params.productId,
        id: this.$route.params.id
      }
    }
  },
  asyncData ({ store, route: { params: { productId, id }}}) {
    return store.dispatch('answer/FETCH', { page: 1, productId, id })
  },
  methods: {
    fetchData (res) {
      if (res.resultCode === '0') {
        const { answerList } = res.result.question;
        if (answerList.length) {
          if (answerList.length < this.sentData.pageSize) {
            this.$refs.loadmore.toEnd();
          } else {
            this.sentData.page += 1;
          }
        } else {
          this.$refs.loadmore.toEnd();
        }
      } else {
        this.$refs.loadmore.fail('网络开小差啦');
      }
    }
  }

}
</script>
<style lang="scss">
.question-detail {
  &-info {
    padding: rem(20);
    background-color: white;
  }
  &-product {
    display: flex;
    align-items: center;
    .detail-pic {
      position: relative;
      width: rem(100);
      height: rem(100);
      margin-right: rem(20);
      > img {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        transform: translate(-50%,-50%);
      }
    }
    .product-title {
      margin: 0 0 rem(10);
      @include linehid(2);
      flex: 1;
    }
    .pull-right {
      > .iconfont {
        font-size: rem(40);
      }
    }
  }
  &-box {
    position: relative;
    padding: rem(15);
    margin-top: rem(20);
    background-color: nth($fgray, 2);
    border-radius: rem(5);
    .detail-user {
      color: nth($fblack, 3);
      font-size: rem(24);
    }
    .detail-title {
      margin: 0;
      font-weight: bold;
      > .iconfont {
        padding-right: rem(5);
        color: nth($fyellow, 2);
        font-size: rem(36);
      }
    }
    &:before {
      position: absolute;
      top: rem(-10);
      left: rem(50);
      height: 0;
      width: 0;
      border-bottom: rem(10) solid nth($fgray, 2);
      border-right: rem(10) solid transparent;
      border-left: rem(10) solid transparent;
      content: '';
    }
  }
  &-answer {
    .detail-count {
      margin: rem(20) rem(20);
      line-height: 1;
      font-size: rem(24);
      color: nth($fblack, 3);
    }
  }
  &-list {
    padding: 0 rem(20);
    background-color: white;
  }
  &-item {
    padding: rem(20) 0;
    border-bottom: 1px solid nth($fgray, 1);
    .detail-answer {
      &-user {
        color: nth($fblack, 2);
        font-size: rem(24);
        > .red {
          margin-right: rem(5);
          padding: rem(5);
          background-color: nth($fred, 1);
          color: white;
        }
      }
      &-content {
        margin: rem(15) 0;
        font-size: rem(32);
        .iconfont {
          padding-right: rem(5);
          color: nth($fgreen, 1);
          font-size: rem(36);
        }
      }
      &-time {
        color: nth($fblack, 3);
        font-size: rem(24);
      }
    }
  }
}
</style>

