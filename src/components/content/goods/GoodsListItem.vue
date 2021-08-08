<!--  -->
<template>
  <div class="goods-list-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad" />
    <p>{{ goodsListItem.title }}</p>
    <span class="price">{{ goodsListItem.price }}</span>
    <span class="cfav"><i class="icon"></i>{{ goodsListItem.cfav }}</span>
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
  computed: {
    showImage() {
      return this.goodsListItem.image || this.goodsListItem.show.img;
    },
  },
};
</script>
<style scoped>
.goods-list-item {
  width: 150px;
  text-align: center;
}
.goods-list-item img {
  width: 100%;
}
.goods-list-item p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.price {
  font-size: 15px;
  color: #ff5777;
  margin-right: 8px;
}

.icon {
  display: inline-block;
  position: relative;
  top: 1px;
  width: 12px;
  height: 12px;
  background-image: url("~assets/img/common/collect.svg");
  background-size: 100%;
}
</style>