<template>
  <div id="tab-bar">
    <slot>
        <tab-bar-item></tab-bar-item>
    </slot>
  </div>
</template>

<script>
import TabBarItem from "./TabBarItem.vue";
export default {
  components: { TabBarItem },
};
</script>

<style scoped>
#tab-bar {
  display: flex;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  background: #f6f6f6;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
}
</style>