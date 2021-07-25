<!--  -->
<template>
  <div class="goods-list-item">
    <a :href="goodsListItem.link">
      <img :src="goodsListItem.show.img" alt="" />
      <p>{{ goodsListItem.title }}</p>
      <span>{{ goodsListItem.price }}</span>
      <span>{{ goodsListItem.cfav }}</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsListItem: {
      type: Object,
      default() {
        return null;
      },
    },
  },
};
</script>
<style scoped>
.goods-list-item {
  width: 150px;
}
.goods-list-item img {
  width: 100%;
}
.goods-list-item p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>