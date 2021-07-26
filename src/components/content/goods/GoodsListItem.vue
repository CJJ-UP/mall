<!--  -->
<template>
  <div class="goods-list-item" @click="itemClick">
    <img :src="goodsListItem.show.img" alt="" @load="imageLoad" />
    <p>{{ goodsListItem.title }}</p>
    <span>{{ goodsListItem.price }}</span>
    <span>{{ goodsListItem.cfav }}</span>
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
  methods: {
    //发射到事件总线 让home组件监听
    imageLoad() {
      this.$bus.$emit("itemImageLoad");
    },
    //监听item的点击 跳转路由
    itemClick() {
      this.$router.push("/detail/" + this.goodsListItem.iid);
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