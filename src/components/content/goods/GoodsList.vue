<template>
  <div class="goods" >
    <goods-list-item v-for="item in goods" :key="item.index" :goodsItem = "item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
  export default {
  components: { GoodsListItem },
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>

.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>