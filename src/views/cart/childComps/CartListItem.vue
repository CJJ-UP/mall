<!--  -->
<template>
  <div class="cart-list-item">
    <div class="check-icon">
      <check-icon :isChecked="listItem.checked" @click.native="checkClick" />
    </div>
    <div class="goods-img">
      <img :src="listItem.image" alt="" />
    </div>
    <div class="goods-info">
      <p class="goods-title">{{ listItem.title }}</p>
      <p class="goods-dexc">{{ listItem.desc }}</p>
      <span class="goods-price">{{ listItem.price }}</span>
      <span class="goods-count">×{{ listItem.count }}</span>
    </div>
  </div>
</template>

<script>
import CheckIcon from "components/content/checkIcon/CheckIcon";
export default {
  name: "CartListItem",
  props: {
    listItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    CheckIcon,
  },
  methods: {
    checkClick() {
      this.listItem.checked = !this.listItem.checked;
      this.$bus.$emit("itemCheck");
    },
  },
};
</script>
<style scoped>
.cart-list-item {
  display: flex;
  padding: 10px;
  border-bottom: 2px solid rgba(100, 100, 100, 0.1);
}
.check-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.goods-img {
  margin: 0px 10px;
}
.goods-img img {
  width: 64px;
  height: 64px;
}
.goods-info {
  width: 190px;
}
.goods-title {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.goods-dexc {
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.goods-price {
  font-size: 16px;
  color: #ff4500;
}
.goods-count {
  float: right;
  font-size: 14px;
}
</style>