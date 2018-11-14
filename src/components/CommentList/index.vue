<template>
  <div class="com-comment">
    <simple-comment-list
      v-show="isSimple"
      :commentList="simpleCommentList"
      :summary="simpleSummary"
      @changeScore="simpleChangeScore"
      @checkMore="checkMore"
      @checkImgDetail="checkImgDetail"/>
    <div v-show="!isSimple">
      <div class="com-header-banner">
        <div
          @click="backToSimple"
          class="header-go-back"><i class="iconfont icon-left"></i></div>
        <span class="com-header-banner-slot">商品评价</span>
      </div>
      <div class="com-comment-tab">
        <base-checkbox v-model="onlyCurrent">只看当前商品</base-checkbox>
        <div class="pull-right">好评度{{summary.GoodRateShow}}%</div>
      </div>
      <div
        class="com-comment-type"
        @click="changeScore($event)">
        <div
          :class="['com-comment-tag', 'tag-default', {active :sendData.score === 0}]"
          data-score="0">全部{{summary.CommentCountStr}}</div>
        <div
          :class="['com-comment-tag', 'tag-default', {active :sendData.score === 3}]"
          data-score="3">好评{{summary.GoodCountStr}}</div>
        <div
          :class="['com-comment-tag', 'tag-default', {active :sendData.score === 2}]"
          data-score="2"
          >中评{{summary.GeneralCountStr}}</div>
        <div
          :class="['com-comment-tag', 'tag-default', {active :sendData.score === 1}]"
          data-score="1"
          >差评{{summary.PoorCountStr}}</div>
      </div>
      <ul class="com-comment-list">
        <li
          v-for="(item,index) in commentList"
          :key="item.id + index"
          class="com-comment-item">
            <div class="com-comment-info">
              <span class="com-comment-name">{{item.nickname}}</span>
              <div class="com-comment-time pull-right">{{item.referenceTime}}</div>
            </div>
            <p class="com-comment-detail">{{item.content}}</p>
            <ul
              v-if="item.imageCount"
              class="com-comment-pics">
              <li
                v-for="(img, i) in item.images"
                class="com-comment-pic"
                @click="checkImgDetail(item.images, i+1)">
                <img
                  v-lazy="img.imgUrl + '!cc_100x100.dpg'"
                  alt="用户评论" />
              </li>
            </ul>
        </li>
      </ul>
      <div
        v-show="FirstLoadEmpty"
        class="com-comment-empty">暂无评价，欢迎您购买之后留下您的宝贵评价：）
      </div>
      <load-more
        v-show="!FirstLoadEmpty"
        url="product/COMMENT" :success="loadSuccess"
        :params="sendData"
        ref="loadmore"
        async
      />
    </div>
    <big-pictures :imgList="imgList" :startIndex="imgStartIndex"/>
  </div>
</template>
<script>
/**
 * 评论模块
 * @param {Boolean}   isSimple, 是否简易版，默认是
 * @param {Function}  showComment, 通知父组件切换成评论详细版
 * @author luyanhong 2018-08-29
 * @example
*/
import LoadMore from 'coms/LoadMore';
import SimpleCommentList from './SimpleCommentList';
import BigPictures from 'coms/BigPictures';
import HeaderBanner from 'coms/HeaderBanner';
const PAGE_SIZE = 10;
export default {
  name: 'CommentList',
  components: {
    LoadMore,
    SimpleCommentList,
    BigPictures,
    HeaderBanner
  },
  props: {
    isSimple: {
      default: true,
      type: Boolean
    },
    showComment: Function,
    productId: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      simpleCommentList: [],
      simpleSummary: {},
      sendData: {
        sorttype: 5,
        sku: this.productId,
        page: 1,
        score: 0,
        pagesize: PAGE_SIZE
      },
      summary: '',
      type: '',
      onlyCurrent: false,
      FirstLoadEmpty: false,
      imgList: [],
      imgStartIndex: 1
    }
  },
  watch: {
    'sendData.score' () {
      this.reload();
    },
    onlyCurrent (checked) {
      if (checked) {
        this.$set(this.sendData, 'skucomment', 1);
      } else {
        delete this.sendData['skucomment'];
      }
      this.reload();
    }
  },
  computed: {
    commentList () {
      return this.$store.state.product.commentList;
    }
  },
  methods: {
    // 数据加载成功后回调
    loadSuccess (res) {
      if (res.errcode !== '0') {
        this.$refs.loadmore.fail(res.errmsg);
        return;
      }
      const { comments } = res.result;
      if (comments.length) {
        this.FirstLoadEmpty = false;
        this.summary = res.result.productCommentSummary;
        if (comments.length < PAGE_SIZE) {
          // 如果是第一页则隐藏加载更多
          if (this.sendData.page === 1) {
            this.$refs.loadmore.hide();
          } else {
            this.$refs.loadmore.toEnd();
          }
        } else {
          this.sendData.page += 1;
        }
        this.setSimpleData(res.result);
      } else {
        this.sendData.page === 1 && (this.FirstLoadEmpty = true);
        this.$refs.loadmore.toEnd();
      }
    },
    // 查看好评、差评
    changeScore ($event) {
      const { score } = $event.target.dataset;
      score && (this.sendData.score = parseInt(score));
      this.checkMore();
    },
    // 查看更多评论
    checkMore () {
      const isSimple = false;
      this.$emit('showComment', isSimple);
    },
    // 重置数据并重载
    reload () {
      this.sendData.page = 1;
      this.$refs.loadmore.loadmore();
    },
    // 简版子组件设置score回调
    simpleChangeScore (score) {
      this.sendData.score = score;
      this.checkMore();
    },
    setSimpleData (result) {
      if (this.simpleCommentList.length) {
        return;
      }
      this.simpleSummary = result.productCommentSummary;
      this.simpleCommentList = result.comments.slice(0, 2);
    },
    // 查看大图
    checkImgDetail (imgList, startIndex) {
      imgList.map((img) => {
        img.imgUrl = img.imgUrl.replace('s128x96_', '');
        return img;
      });
      this.imgList = [...imgList];
      this.imgStartIndex = startIndex;
    },
    // 返回评论简版
    backToSimple () {
      const isSimple = true;
      this.$emit('showComment', isSimple);
    }
  }
}
</script>
<style lang="scss">
.com-comment {
  background-color: white;
  .com-header-banner {
    position: sticky;
    top: 0;
  }
  &-tab {
    position: sticky;
    top: rem(102);
    padding: rem(20);
    border-bottom: 1px solid nth($fgray, 1);
    font-size: rem(28);
    background-color: white;
    .tab-good-score {
      padding-left: rem(5);
      color: nth($fgreen, 1);
      font-size: rem(24);
    }
    .pull-right {
      display: flex;
      color: nth($fblack, 2);
      font-size: rem(24);
    }
  }
  &-list {
    padding: 0 rem(20);
  }
  &-item {
    padding: rem(20) 0;
    border-bottom: 1px solid nth($fgray, 1);
    font-size: rem(24);
    &:last-child {
      border-bottom: 0;
    }
  }
  &-name,
  &-time {
    color: nth($fblack, 3);
  }
  &-pics {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    @include hid;
  }
  &-pic {
    width: rem(160);
    height: rem(160);
    margin-right: rem(10);
    margin-bottom: rem(10);
    @include hid;
    > img {
      max-width: 100%;
      max-width: 100%;
      width: auto;
    }
  }
  &-type {
    position: sticky;
    top: rem(194);
    padding-left: rem(20);
    background-color: white;
  }
  &-tag {
    margin-top: rem(20);
    font-size: rem(24);
    &.active {
      background-color: nth($fgreen, 1);
      color: white;
      border-color: nth($fgreen, 1);
    }
  }
  &-more {
    padding: rem(18) 0;
    text-align: center;
    border-top: 1px solid nth($fgray, 1);
  }
  &-empty {
    padding: rem(30) rem(20);
    text-align: center;
  }
}
</style>
