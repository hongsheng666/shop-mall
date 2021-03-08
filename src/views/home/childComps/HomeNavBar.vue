<template>
  <nav-bar>
    <div slot="center" class="nav-bar-center">
      <h2>购物街</h2>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>

    
<style scoped>
.nav-bar-center {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  width: 100%;
  background: #ff5777;
  color: #fff;
}

</style>