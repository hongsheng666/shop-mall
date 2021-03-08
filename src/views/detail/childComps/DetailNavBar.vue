<template>
  <div>
    <nav-bar >
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <span
          @click="titleClick(index)"
          v-for="(item, index) in titles"
          :key="item"
          class="title-item"
          :class="{ active: currentIndex === index }"
          >{{ item }}</span
        >
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick',index)
    },
    backClick(){
      this.$router.go(-1)
    }
  },
};
</script>

    
<style scoped>
.title {
  display: flex;
  width: 80%;
}
.title-item {
  flex: 1;
  font-size: 14px;
}
.active {
  color: #ff8198;
}
.back{
  width: 60px;
}
.back img {
  margin-top: 10px;
}
</style>