<template>
  <div class="com-broadcast">
    <v-touch
      ref="swiper"
      class="com-broadcast-list"
      tag="ul"
      @swipeleft="swipeLeft"
      @swiperight="swipeRight"
      :style="{width: 100 * total + '%'}">
      <router-link
        :to="'/product/' + item.sku"
        v-for="(item, i) in broadcastList"
        :key="item.sku"
        class="com-broadcast-item"
        :style="{width: 1/total/column * 100 + '%'}">
        <div class="pic">
          <img :src="'//img14.360buyimg.com/mobilecms/s270x270_'+ item.img">
        </div>
        <h5 class="com-broadcast-title">{{item.t}}</h5>
        <span class="com-broadcast-price">{{(item.jp/100).toFixed(2)}}</span>
      </router-link>
    </v-touch>
    <div class="com-broadcast-page">
      <span
        v-for="page in 5"
        :class="['page-spot', {active: page === index}]"></span>
    </div>
  </div>
</template>
<script>
/**
 * 图片轮播（不自动转动）
 * @param {Array}  broadcastList, 列表数据
 * @param {Number} row, 行数，默认2行
 * @param {Number} column, 列数，默认3列
 * @author luyanhong 2018-09-05
 * @example
 * <broad-cast broadcastList="[]"/>
*/
export default {
  name: 'BroadCast',
  props: {
    broadcastList: {
      default: [],
      type: Array
    },
    row: {
      default: 2,
      type: Number
    },
    column: {
      default: 3,
      type: Number
    }
  },
  data () {
    return {
      index: 1
    }
  },
  watch: {
    index (val) {
      this.setTransform(val);
    }
  },
  computed: {
    total () {
      return this.broadcastList.length / this.row / this.column;
    }

  },
  methods: {
    // 向左滑动
    swipeLeft () {
      if (this.index === this.total) {
        return;
      }
      this.index += 1;
    },
    // 向右滑动
    swipeRight () {
      if (this.index === 1) {
        return;
      }
      this.index -= 1;
    },
    // 根据index设置滚动距离
    setTransform (index) {
      const translateX = -1 / this.total * (index - 1) * 100;
      this.$refs.swiper.$el.style.transform = `translateX(${translateX}%)`;
    }
  }
}
</script>
<style lang="scss">
.com-broadcast {
  width: 100%;
  @include hid;
  &-list {
    width: 500%;
    height: 200%;
    transition: transform 0.4s ease;
    @include hid;
  }
  &-item {
    float: left;
    width: 6.66%;
    border-right: 1px solid nth($fgray, 1);
    border-bottom: 1px solid nth($fgray, 1);
    box-sizing: border-box;
    .pic {
      position: relative;
      width: 100%;
      padding-top: 100%;
      > img {
        position: absolute;
        max-width: 100%;
        max-height: 100%;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
    }
  }
  &-title {
    margin: rem(10) rem(20) rem(5);
    height: rem(60);
    @include linehid(2);
    line-height: rem(30);
    font-size: rem(24);
    @include wordbreak;
  }
  &-price {
    padding-left: rem(20);
    color: nth($fgreen, 1);
  }
  &-page {
    padding: rem(20) 0;
    text-align: center;
    line-height: 0;
    .page-spot {
      display: inline-block;
      margin-right: rem(10);
      width: rem(7);
      height: rem(7);
      border-radius: 50%;
      background-color: nth($fgray, 5);
      vertical-align: middle;
      &.active {
        width: rem(15);
        background-color: nth($fgreen, 1);
      }
    }
  }
}
</style>

