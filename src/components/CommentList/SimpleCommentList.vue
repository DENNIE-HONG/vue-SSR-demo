<template>
  <div class="simple">
    <div
      v-if="commentList.length">
      <div class="com-comment-tab">
        评价
        <span class="tab-good-score">好评{{summary.GoodRateShow}}%</span>
        <div
          class="pull-right"
          @click="checkMore">共 {{summary.CommentCountStr}} 条<i class="iconfont icon-right"></i></div>
      </div>
      <div
        class="com-comment-type"
        @click="changeScore($event)">
        <div
          class="com-comment-tag tag-default"
          data-score="0">全部{{summary.CommentCountStr}}</div>
        <div
          class="com-comment-tag tag-default"
          data-score="3">好评{{summary.GoodCountStr}}</div>
        <div
          class="com-comment-tag tag-default"
          data-score="2"
          >中评{{summary.GeneralCountStr}}</div>
        <div
          class="com-comment-tag tag-default"
          data-score="1"
          >差评{{summary.PoorCountStr}}</div>
      </div>
      <ul class="com-comment-list">
        <li
          v-for="item in commentList"
          class="com-comment-item">
            <div class="com-comment-info">
              <span class="com-comment-name">{{item.nickname}}</span>
              <div class="com-comment-time pull-right">{{item.referenceTime}}</div>
            </div>
            <p
              class="com-comment-detail"
              @click="checkMore">{{item.content}}</p>
            <div
              v-if="item.imageCount"
              class="com-comment-pics">
              <div
                v-for="(img, index) in item.images"
                class="com-comment-pic"
                @click="checkImgDetail(item.images, index + 1)">
                <img :src="img.imgUrl + '!cc_100x100.dpg'"/>
              </div>
            </div>
        </li>
      </ul>
      <div
        class="com-comment-more">
        <div
          class="btn-default"
          @click="checkMore">查看全部评价<i class="iconfont icon-right"></i>
        </div>
      </div>
    </div>
    <h4
      v-else
      class="title">
      评价
      <span class="pull-right">暂无评价，欢迎您购买之后留下宝贵的评价</span>
    </h4>
  </div>
</template>
<script>
export default {
  name: 'SimpleCommentList',
  props: {
    summary: {
      requird: true,
      type: Object
    },
    commentList: {
      required: true,
      type: Array
    }
  },
  methods: {
    // 绑定查看评论类型
    changeScore ($event) {
      let { score } = $event.target.dataset;
      if (score) {
        score = parseInt(score);
        this.$emit('changeScore', score);
      }
    },
    // 查看更多评论
    checkMore () {
      this.$emit('checkMore');
    },
    checkImgDetail (imgList, imgIndex) {
      this.$emit('checkImgDetail', imgList, imgIndex);
    }
  }
}
</script>
<style lang="scss">
.com-comment {
  .simple {
    .com-comment{
      &-detail {
        @include linehid(3);
      }
      &-tab,
      &-type {
        position: static;
      }
    }
  }
}
</style>


