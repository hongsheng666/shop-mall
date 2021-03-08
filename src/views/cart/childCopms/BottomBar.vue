<template>
  <div class="bottom-menu">
    <check-button
      class="select-all"
      :isChecked="allCheck"
      @click.native="allChecked"
    ></check-button>
    <span>全选</span>
    <span class="total-price">合计: ¥{{ totalPrice }}</span>
    <span class="buy-product" @click="account">去结算({{ settlement }})</span>
  </div>
</template>

<script>
import CheckButton from "./CheckButton.vue";

export default {
  name: "BottomBar",
  components: {
    CheckButton,
  },
  computed: {
    // 总价计算属性
    totalPrice() {
      const cartList = this.$store.getters.cartList;
      return cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.count * item.price;
        }, 0)
        .toFixed(2);
    },
    // 去结算计算属性
    settlement() {
      return this.$store.state.cartList
        .filter((item) => item.checked)
        .reduce((prev, item) => {
          return prev + item.count;
        }, 0);
    },
    // 是否显示全选
    allCheck() {
      const cartList = this.$store.state.cartList;
      if (cartList.length === 0) {
        return false;
      }
      return !cartList.find((item) => !item.checked);
    },
  },

  methods: {
    allChecked() {
      // 判断是否有为选中的
      let unCheck = this.$store.state.cartList.find((item) => !item.checked);

      // 如果有未选中的
      if (unCheck) {
        this.$store.state.cartList.forEach((item) => {
          item.checked = true;
        });
      } else {
        this.$store.state.cartList.forEach((item) => {
          item.checked = false;
        });
      }
    },
    // 去结算
    account(){
      if(this.$store.state.cartList.length<=0){
        this.$toast.show('请添加商品')
      }
    }
  },
};
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>
