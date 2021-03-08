<template>
  <div class="tab-control">
    <div
      @click="itemClick(index)"
      v-for="(item, index) in titles"
      :key="item"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index){
      this.currentIndex = index
      this.$emit('itemClick',index)
    }
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
  height: 40px;
  line-height: 40px;
}
.tab-control-item span {
  padding: 5px;
}
.active span {
  color: #ff5777;
  border-bottom: 3px solid #ff5777;
}
</style>