<template>
  <div id="cart">
    <cart-nav-bar />
    <scroll class="content">
      <cart-list></cart-list>
    </scroll>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import Scroll from "../../components/common/scroll/Scroll.vue";
import BottomBar from './childCopms/BottomBar.vue';
import CartList from "./childCopms/CartList.vue";
import CartNavBar from "./childCopms/CartNavBar.vue";
export default {
  components: { CartNavBar, CartList, Scroll, BottomBar },
};
</script>

<style scoped>
#cart {
  height: 100vh;
}
.content {
  height: calc(100% - 93px);
}
</style>