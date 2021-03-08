<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navBar" />
    <scroll class="content" ref="scroll" :probeType="3" @scroll="detailScroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imgLoad="imgLoad"
      ></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="params" />
      <detail-comment-info :commentInfo="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
import BackTop from "components/content/backtop/BackTop.vue";

import { debounce } from "common/utils";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      isShowBackTop: false,
    };
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    // 监听item图片加载完成事件
    this.$bus.$on("itemImgLoad", () => {
      refresh();
    });
  },
  created() {
    this.iid = this.$route.params.iid;
    // 获取详情页数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      // 获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages;
      // 获取其他数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 店家信息
      this.shop = new Shop(data.shopInfo);
      // 商品图片信息
      this.detailInfo = data.detailInfo;
      // 参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 获取用户评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 获取推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
  },

  methods: {
    // 添加到购物车事件
    addToCart() {
      // 添加商品信息到购物车
      const product = {};
      product.img = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      this.$store.dispatch("addToCart", product).then((res) => {
        // 添加toast
        this.$toast.show(res);
        console.log(res);
      });
    },
    // 返回顶部事件
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    imgLoad() {
      this.$refs.scroll.refresh();
      // 获取每个tabbar的offsetTop
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    },
    // 监听顶部导航栏点击事件
    titleClick(index) {
      // 加上导航栏的44px
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 500);
    },
    detailScroll(position) {
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          this.$refs.navBar.currentIndex = this.currentIndex;
        }
      }
      // 是否显示回到顶部
      this.isShowBackTop = -position.y > 1000;
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background: #fff;
}
.content {
  height: calc(100% - 102px);
}
</style>