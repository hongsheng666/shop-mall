<template>
  <div class="tab-bar">
    <Slot></Slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.tab-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  background: #f6f6f6;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
}
</style>