<template>
  <div id="home">
    <!-- 导航栏 -->
    <home-nav-bar></home-nav-bar>
    <tab-control
      v-show="isShowTabControl"
      ref="tabControl1"
      :titles="['流行', '新款', '精选']"
      class="tab-control-zindex"
      @itemClick="tabTarggle"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="contentScroll"
      @pullingUp="contentPullingUp"
    >
      <!-- 轮播图 -->
      <home-swipper
        :banners="banners"
        @swipperImageLoad.once="swipperImageLoad"
      ></home-swipper>
      <!-- 推荐部分 -->
      <hom-recommend :recommends="recommends"></hom-recommend>
      <!-- 本周流行 -->
      <home-feature></home-feature>
      <!-- tabcontrol -->
      <tab-control
        ref="tabControl2"
        :titles="['流行', '新款', '精选']"
        @itemClick="tabTarggle"
      ></tab-control>
      <!-- 商品展示 -->
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeNavBar from "./childComps/HomeNavBar.vue";
import HomeSwipper from "./childComps/HomeSwipper.vue";
import HomRecommend from "./childComps/HomRecommend.vue";
import HomeFeature from "./childComps/HomeFeature.vue";

import { getHomeData, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import TabControl from "../../components/content/tabcomtrol/TabControl.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import BackTop from "../../components/content/backtop/BackTop.vue";

export default {
  components: {
    HomeNavBar,
    HomeSwipper,
    HomRecommend,
    HomeFeature,
    GoodsList,
    TabControl,
    Scroll,
    BackTop,
  },
  data() {
    return {
      // 保存离开home时的Y值
      saveY: 0,
      // tabcontrol吸顶
      taboffsetTop: 0,
      // 显示返回顶部
      isShowBackTop: false,
      // 是否显示tabcontrol
      isShowTabControl: false,
      currentType: "pop",
      banners: [],
      recommends: [],
      // 商品的数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
    };
  },
  activated() {
    // 保留离开时状态
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 保留离开时状态
    this.saveY = this.$refs.scroll.scroll.y;
  },
  created() {
    this.getHomeData();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    // 监听item图片加载完成事件
    this.$bus.$on("itemImgLoad", () => {
      refresh();
    });
  },
  methods: {
    // 事件监听方法
    swipperImageLoad() {
      // 获取tabcontrol的offsetTop属性
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    tabTarggle(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 返回顶部事件
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },

    contentScroll(position) {
      // 显示隐藏返回顶部
      this.isShowBackTop = -position.y > 1000;
      // 显示tabcontrol
      this.isShowTabControl = -position.y > this.taboffsetTop;
    },
    // 上拉加载更多
    contentPullingUp() {
      this.getHomeGoods(this.currentType);
    },
    // 1.拿到首页多个数据
    getHomeData() {
      getHomeData().then((res) => {
        // 1.1拿到轮播图数据
        this.banners = res.data.banner.list;
        // 1.2拿到推荐数据
        this.recommends = res.data.recommend.list;
      });
    },
    // 2.拿到商品列表数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finshPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control-zindex {
  position: relative;
  z-index: 9;
}
</style>