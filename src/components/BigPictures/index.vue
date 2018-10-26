<template>
  <div :class="['com-bigpic', {hide: isHide}]">
    <div
      class="modal-bg"
      @click="close">
      <div class="com-bigpic-box">
        <v-touch
          ref="swiper"
          tag="ul"
          class="com-bigpic-list"
          @swipeleft="swipeLeft"
          @swiperight="swipeRight"
          :style="{width: imgCount * 100 + '%'}">
          <li
            v-for="img in imgList"
            :key="img.id"
            class="com-bigpic-item">
            <img v-lazy="img.imgUrl" />
          </li>
        </v-touch>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 查看大图
 * @param {Array}  imgList, 图片列表
 * @param {Number} startIndex, 从第几张开始看
 * @author luyanhong 2018-08-31
 * @example
 * <big-pictures imgList="[]" />
*/
import lockWindow from 'utils/lockWindow.js';
export default {
  name: 'BigPictures',
  props: {
    imgList: {
      required: true,
      type: Array
    },
    startIndex: {
      default: 1,
      type: Number
    }
  },
  data () {
    return {
      imgIndex: this.startIndex,
      isHide: true
    }
  },
  computed: {
    imgCount () {
      return this.imgList.length;
    }
  },
  watch: {
    imgIndex (index) {
      this.setTransform(index);
    },
    imgList () {
      this.setTransform(this.startIndex);
      this.imgIndex = this.startIndex;
      this.isHide = false;
    },
    isHide (isHide) {
      if (isHide) {
        lockWindow({ isLock: false });
      } else {
        lockWindow();
      }
    }
  },
  methods: {
    // 向左滑动
    swipeLeft () {
      if (this.imgIndex === this.imgCount) {
        return;
      }
      this.imgIndex += 1;
    },
    // 向右滑动
    swipeRight () {
      if (this.imgIndex === 1) {
        return;
      }
      this.imgIndex -= 1;
    },
    // 根据index设置图片滚动距离
    setTransform (index) {
      const translateX = -1 / this.imgCount * (index - 1) * 100;
      this.$refs.swiper.$el.style.transform = `translateX(${translateX}%)`;
    },
    // 点击其他区域关闭
    close () {
      this.isHide = true;
    }
  }
}
</script>
<style lang="scss">
.com-bigpic {
  .modal-bg {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
  }
  &-box {
    height: 100%;
    @include hid;
  }
  &-list {
    display: flex;
    width: 200%;
    height: 100%;
    transition: transform 0.5s ease;
  }
  &-item {
    display: flex;
    width: 100%;
    height: 100%;
    @include hid;
    align-items: center;
    > img {
      display: block;
      max-width: 90%;
      height: auto;
      margin: auto;
      @include hid;
    }
  }
}
</style>
