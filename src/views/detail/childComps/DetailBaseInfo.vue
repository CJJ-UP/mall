<!--  -->
<template>
  <div class="detail-base-info">
    <div class="goods-title">
      <p>{{ goodsInfo.title }}</p>
    </div>
    <div class="goods-price">
      <span class="new-price">{{ goodsInfo.newPrice }}</span>
      <span class="old-price">{{ goodsInfo.oldPrice }}</span>
      <span
        v-if="goodsInfo.discount"
        class="discount"
        :style="{ backgroundColor: goodsInfo.bgColor }"
        >{{ goodsInfo.discount }}</span
      >
    </div>
    <div v-if="goodsInfo.columns" class="goods-columns">
      <span v-for="index in goodsInfo.columns.length - 1" :key="index"
        >{{ goodsInfo.columns[index - 1] }}
      </span>
      <span>{{ goodsInfo.services[0].name }}</span>
    </div>
    <div v-if="goodsInfo.services" class="goods-services">
      <span
        v-for="index in goodsInfo.services.length - 1"
        :key="index"
        class="goods-services-item"
      >
        <img :src="goodsInfo.services[index].icon" alt="" />
        <span>{{ goodsInfo.services[index].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style scoped>
.detail-base-info {
  padding: 10px 5px 0px 5px;
}
.goods-title {
  font-size: 16px;
  line-height: 1.25;
  padding-bottom: 10px;
}
.new-price {
  font-size: 22px;
  font-weight: 500;
  color: #ff8e97;
  margin-right: 5px;
}
.old-price {
  color: #666;
  text-decoration: line-through;
}
.discount {
  position: relative;
  top: -8px;
  padding: 0px 5px;
  border-radius: 10px;
  color: #fff;
}
.goods-columns {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  color: #666;
  border-bottom: 2px solid rgba(100, 100, 100, 0.1);
}
.goods-services {
  display: flex;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
  color: #666;
  border-bottom: 3px solid rgba(100, 100, 100, 0.1);
}
.goods-services-item img {
  position: relative;
  top: -1px;
  width: 12px;
  height: 12px;
}
</style>