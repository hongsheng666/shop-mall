<template>
  <nav-bar>
    <div slot="center" class="cart-nav-bar">
      <h3>购物车({{ getTotalCounter }})</h3>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    NavBar,
  },
  computed: {
    ...mapGetters(["getTotalCounter"]),
  },
};
</script>

    
<style scoped>
.cart-nav-bar {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  width: 100%;
  background: #ff5777;
  color: #fff;
}
</style>