<template>
  <div class="cart">
    <header-banner>购物车({{allCount}})</header-banner>
    <div class="cart-box">
      <section
        v-for="item of cartList"
        :key="item.cartRegionId"
        class="cart-list">
        <cart-item-group
          :list="item"
          ref="cartGroup"
          @change="changeWareHouse(arguments, item.cartRegionId)"
          @delete="handleDelete"></cart-item-group>
      </section>
    </div>
    <div class="cart-settlement">
      <base-checkbox
        v-model="allSelected"
        @change="changeAll">全选</base-checkbox>
      <div class="pull-right">
        <span>总价：<b class="cart-settlement-total">￥{{total.toFixed(2)}}</b></span>
        <div :class="['cart-settlement-btn', {active: total != 0}]">结算</div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderBanner from 'coms/HeaderBanner';
import CartItemGroup from 'coms/CartItem/CartItemGroup';
import ConfirmBox from 'coms/ConfirmBox';
export default {
  name: 'Cart',
  components: {
    HeaderBanner,
    CartItemGroup,
    ConfirmBox
  },
  data () {
    return {
      allSelected: false,
      selectedSet: new Set(),
      total: 0
    }
  },
  asyncData (store) {
    return store.dispatch('cart/FETCH');
  },
  computed: {
    wareHouseSize () {
      return this.cartList.length;
    },
    cartList () {
      return this.$store.state.cartList;
    },
    allCount () {
      return this.$store.state.allCount;
    },
    totalObj () {
      return this.$store.state.totalObj;
    }
  },
  watch: {
    // 每个仓库价格变化，就重新计算总价
    totalObj: {
      handler (val) {
        const totalList = Object.values(val);
        let all = 0;
        for (const value of totalList) {
          all += value;
        }
        this.total = all;
      },
      deep: true
    }
  },
  created () {
    // this.$api['kaola/cart']({}).then((res) => {
    //   if (res.status === 200) {
    //     this.allCount = res.data.cartShow.allCount;
    //     this.cartList = res.data.cartShow.cartRegionList;
    //     this.cartList.map((item)=> {
    //       this.$set(this.totalObj, item.cartRegionId, 0);
    //     });
    //   } else {
    //     this.$message({
    //       type: 'error',
    //       message: res.statusText
    //     });
    //   }
    // }).catch((err) => {
    //   this.$message({
    //     type: 'error',
    //     message: err
    //   });
    // });
  },
  methods: {
    // 是否全选事件
    changeAll (checked) {
      this.$refs.cartGroup.map((ref)=> {
        checked !== ref.allChecked && ref.$refs.checkbox.$el.click();
      });
    },
    /**
     * 每个仓库选中事件
     * @param {checked} args[0], 是否选中
     * @param {Number}  args[1], 本仓库总额
    */
    changeWareHouse (args, id) {
      const [checked, total] = args;
      checked && this.selectedSet.add(id, total);
      !checked && this.selectedSet.delete(id);
      if (this.selectedSet.size === this.wareHouseSize) {
        this.allSelected = true;
      } else {
        this.allSelected = false;
      }
      this.$set(this.totalObj, id, total);
    },
    // 删除商品
    handleDelete (cartId) {
      this.$message({
        type: 'success',
        message: '假装删除成功啦'
      });
    }
  }
}
</script>
<style lang="scss">
.cart {
  &-settlement {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: white;
    border-top: 2px solid nth($fgray, 1);
    .com-checkbox {
      padding-left: rem(20);
      margin-top: rem(30);
    }
    &-btn {
      display: inline-block;
      width: rem(150);
      height: rem(100);
      text-align: center;
      background-color: nth($fgray, 2);
      line-height: rem(100);
      &.active {
        background-color: nth($fgreen, 1);
        color: white;
      }
    }
    &-total {
      color: nth($fgreen, 1);
    }
  }
}
</style>
