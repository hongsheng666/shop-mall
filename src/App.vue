<template>
  <div id="app">
    <router-view></router-view>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "../../05-Vue-router使用/02-tabbar/src/components/tabbar/MainTabBar.vue";
export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import url("../src/assets/css/base.css");
</style>
