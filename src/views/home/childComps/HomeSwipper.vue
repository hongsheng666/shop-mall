<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import Swiper from "components/common/swiper/Swiper.vue";
import SwiperItem from "components/common/swiper/SwiperItem.vue";
export default {
  data() {
    return {
      isLoad: false,
    };
  },
  components: { Swiper, SwiperItem },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    // 或者在home里的自定义事件里@swipperImageLoad.once="swipperImageLoad"
    // imgLoad(){
    //   if(!this.isLoad){
    //  this.$emit('swipperImageLoad')
    //     this.isLoad = true
    //   }
    // },
    imgLoad() {
      this.$emit("swipperImageLoad");
    },
  },
};
</script>

<style scoped>
</style>