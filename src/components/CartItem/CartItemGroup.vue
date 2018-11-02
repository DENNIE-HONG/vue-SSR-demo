<template>
  <div class="cart-list">
    <div class="title">
      <base-checkbox
        :checked="allChecked"
        ref="checkbox"
        @change="changeAll"></base-checkbox>
      <i class="iconfont icon-home"></i>{{list.goodsSource}}</div>
    <ul>
      <div
        v-if="list.cartActivityGoodsList.length"
        v-for="cart in list.cartActivityGoodsList">
        <li
          v-for="li in cart.cartGoodsList"
          :key="li.cartId">
          <cart-item
            :cart="li"
            @checked="changeGoods"
            @change="changeNumber"
            @delete="handleDelete"
            ref="cartItem"></cart-item>
        </li>
      </div>
      <li
        v-for="cart in list.cartItemList"
        :key="cart.cartGoods.cartId">
        <cart-item
          :cart="cart.cartGoods"
          @checked="changeGoods"
          ref="cartItem"
          @change="changeNumber"
          @delete="handleDelete"
        ></cart-item>
      </li>
    </ul>
    <div class="cart-list-total global-clearfix">
      <span class="pull-right">本仓总计：￥{{total.toFixed(2)}}</span>
    </div>
  </div>
</template>
<script>
/**
 * 购物车群组
 * @param {Object}  list，数据
 * @param {Boolean} selected, 是否仓库选中，默认否
 * @author luyanhong 2018-09-25
 * @example
 * <cart-item-group list={}></cart-item-group>
 */
import CartItem from './index';
export default {
  name: 'CartItemGroup',
  components: {
    CartItem
  },
  props: {
    list: {
      required: true,
      type: Object
    },
    selected: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    totalNum () {
      return this.list.cartActivityGoodsList.length + this.list.cartItemList.length;
    }
  },
  data () {
    return {
      total: 0,
      allChecked: this.selected,
      selectedTotal: 0
    }
  },
  watch: {
    selectedTotal (val) {
      if (val < this.totalNum) {
        // 通知父组件
        this.allChecked = false;
      } else {
        this.allChecked = true;
      }
      this.noticeParent();
    }
  },
  methods: {
    // 点击每项商品多选框事件
    changeGoods (checked, total) {
      if (checked) {
        if (this.selectedTotal >= this.totalNum) {
          return;
        }
        this.total += total;
        this.selectedTotal += 1;
      } else {
        if (this.selectedTotal === 0) {
          return;
        }
        this.total -= total;
        this.selectedTotal -= 1;
      }
    },
    // 点击仓库多选框事件
    changeAll (checked) {
      this.$refs.cartItem.map((ref) => {
        checked !== ref.selected && ref.$refs.checkbox.$el.click();
      });
    },
    /**
     * 商品数增加或者减少改变事件
     * @param {Number}  diffCount, 改变的差额
    */
    changeNumber (diffCount) {
      this.total += diffCount;
      this.noticeParent();
    },
    noticeParent () {
      this.$emit('change', this.allChecked, this.total);
    },
    // 删除商品
    handleDelete (goodsId) {
      this.$emit('delete', goodsId);
    }
  }
}
</script>
<style lang="scss">
.cart {
  &-list {
    margin-bottom: rem(20);
    background-color: white;
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
    &-total {
      padding: 0 rem(20) rem(20);
      font-size: rem(24);
    }
  }
}
</style>
