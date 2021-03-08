<template>
  <swiper class="topImages">
    <swiper-item v-for="item in topImages" :key="item.index">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import Swiper from "components/common/swiper/Swiper.vue";
import SwiperItem from "components/common/swiper/SwiperItem.vue";
export default {
  components: { Swiper, SwiperItem },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.topImages {
  height: 300px;
  overflow: hidden;
}
</style>