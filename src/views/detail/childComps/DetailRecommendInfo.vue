<template>
  <div class="recommend-info">
    <div class="info-header">热门推荐</div>
    <goods-list>
      <goods-list-item v-for="(item, index) in recommendList" :key="index" :goods="item"></goods-list-item>
    </goods-list>
  </div>
</template>

<script>
import GoodsList from 'components/content/goods/GoodsList.vue'
import GoodsListItem from 'components/content/goods/GoodsListItem.vue'

	export default {
		name: "DetailRecommendInfo",
    components: {
        GoodsList,
        GoodsListItem
    },
    props: {
		  recommendList: {
		    type: Array,
        default(){
          return []
        }
      }
    }
	}
</script>

<style scoped>
  .recommend-info {
    padding: 5px;
  }

  .info-header {
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
  }
</style>
