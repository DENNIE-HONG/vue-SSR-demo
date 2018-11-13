<template>
  <section
    v-if="productList.length"
    class="product-list">
    <dl class="product-list-box">
      <dd
        v-for="(list, index) in productList"
        :key="list.sku + index"
        class="product-list-item">
        <router-link
          :to="'product/' + list.sku">
          <div class="product-list-pic">
            <img
              :alt="list.t"
              v-lazy="imgPrefix + list.img"/>
          </div>
          <h4 class="product-list-title">{{list.t}}</h4>
          <div class="product-list-info">
            <span>￥{{list.jp / 100}}</span>
          </div>
        </router-link>
      </dd>
    </dl>
  </section>
</template>
<script>
/**
 * 商品列表模块
 * @param {Array} productList, 数据组
 * @author luyanhong 2018-08-15
 * @example
 * <product-list productLis="xxx"/>
*/
export default {
  name: 'ProductList',
  props: {
    productList: {
      default: [],
      type: Array
    },
    imgPrefix: {
      default: '//img14.360buyimg.com/n7/',
      type: String
    }
  }
}
</script>
<style lang="scss">
.product-list {
  &-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  &-item {
    width: 49%;
    margin-bottom: 2%;
    background-color: white;
  }
  &-pic {
    position: relative;
    height: 0;
    padding-top: 100%;
    @include hid;
    &.small {
      padding-top: 40%;
      width: 70%;
      margin: rem(30) auto rem(20);
      > img {
        width: 100%;
      }
    }
    > img {
      position: absolute;
      top: 0;
      left: 0;
      height: auto;
      width: 100%;
    }
  }
  &-title {
    padding: 0 rem(10);
    margin: rem(15) 0;
    line-height: rem(36);
    @include linehid(2);
  }
  &-info {
    > span {
      color: nth($fred, 1);
    }
  }
  &-shop {
    text-align: center;
    > span {
      color: nth($fblack, 3);
    }
  }
}

</style>


