<template>
  <div
    class="cart-list-item">
    <base-checkbox
      :checked="selected"
      @change="changeGood($event, cart.currentPrice)"
      ref="checkbox"></base-checkbox>
    <div class="cart-list-item-box">
      <div class="cart-list-pic">
        <img :src="cart.imageUrl" />
      </div>
      <div class="cart-list-info">
        <h5 class="cart-list-title">{{cart.goodsName}}</h5>
        <div class="pull-left">
          <p class="cart-list-desc">{{cart.skuDesc}}</p>
          <b
            v-once
            class="cart-list-price">￥{{cart.currentPrice}}</b>
        </div>
        <div class="pull-right">
          <input-number
            v-model="cartCount"
            :min="1"
            :max="cart.userLimitBuyCount? cart.userLimitBuyCount: cart.maxSelectedStore "></input-number>
          <div
            class="cart-list-delete"
            @click="handleDelete(cart.goodsId)"><i class="iconfont icon-empty"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 购物车单项
 * @param {Object}    cart，数据
 * @param {Boolean}   isSelected, 初始化是否选中
 * @param {function}  checked, 选中商品事件
 * @param {function}  change, 商品数量改变事件, 参数是差价
 * @param {function}  delete, 删除商品事件，参数是id
 * @author luyanhong 2018-09-25
 * @example
 * <cart-item cart={}></cart-item>
 *
*/
import InputNumber from 'coms/InputNumber';
export default {
  name: 'CartItem',
  props: {
    cart: {
      default: {},
      type: Object
    },
    isSelected: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      cartCount: 1,
      selected: this.isSelected
    }
  },
  components: {
    InputNumber
  },
  watch: {
    cartCount (newCount, oldCount) {
      if (this.selected) {
        const diff = (newCount - oldCount) * this.cart.currentPrice;
        this.$emit('change', diff);
      }
    }
  },
  methods: {
    // 是否选中商品事件
    changeGood (checked, price) {
      const total = price * this.cartCount;
      this.selected = checked;
      // 通知父组件
      this.$emit('checked', checked, total);
    },
    // 删除商品事件
    handleDelete (goodsId) {
      // this.$emit('delete', goodsId);
      this.$confirm('很抢手哦~下次不一定能买到，确定要删除我吗~', {
        confirmButtonText: '留在购物车',
        cancelButtonText: '狠心删除'
      }).then(()=> {

      }).catch(()=> {
        this.$emit('delete', goodsId);
      });
    }
  }
}
</script>
<style lang="scss">
.cart-list {
  &-item {
    display: flex;
    padding: rem(20);
    .pull-right {
      margin-top: rem(15);
      text-align: right;
    }
    &-box {
      display: flex;
      @include hid;
      flex: 1;
      border-bottom: 1px solid nth($fgray, 1);
    }
    .com-checkbox {
      display: flex;
      align-items: center;
      margin-right: rem(40);
    }
  }
  &-pic {
    width: rem(150);
    margin-right: rem(20);
    min-width: rem(150);
    > img {
      width: 100%;
    }
  }
  &-info {
    width: 100%;
    @include hid;
    font-size: rem(24);
  }
  &-title {
    margin: 0;
    @include txthid;
    @include hid;
  }
  &-desc {
    height: rem(50);
    margin: 0 0 rem(20);
    color: nth($fblack, 3);
  }
  &-delete {
    margin-top: rem(10);
    color: nth($fblack, 3);
    > .iconfont {
      font-size: rem(38);
    }
  }
}
</style>


