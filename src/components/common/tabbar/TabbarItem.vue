<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :class="{ active: isActive }"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // isActive: true,
    };
  },
  computed: {
    isActive() {
     return this.$route.path.indexOf(this.path) !== -1;
    },
  },
  props: {
    path: {
      type: String,
    },
  },
  methods: {
    itemClick() {
      this.$router.push(this.path);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  vertical-align: middle;
  margin-top: 3px;
  margin-bottom: 2px;
  width: 24px;
  height: 24px;
}
.active {
  color: #ff5777;
}
</style>