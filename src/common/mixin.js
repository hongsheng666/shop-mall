import { debounce } from "./utils";

// 混入的代码
// scroll refresh混入代码

// export const itemListenerImage = {
//   mounted() {
//     const refresh = debounce(this.$refs.scroll.refresh, 200);
//     // 监听item图片加载完成事件
//     this.$bus.$on("itemImgLoad", () => {
//       refresh();
//       console.log("我是混入的内容");
//     });
//   },
// }

import BackTop from "components/content/backtop/BackTop.vue";

export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
     
    }
  },
  methods: {
    
  },

}