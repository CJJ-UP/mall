<!--  -->
<template>
  <div class="detail-shop-info">
    <div class="shop-head">
      <img :src="shopInfo.shopLogo" alt="" />
      <span>{{ shopInfo.name }}</span>
    </div>
    <div class="shop-body">
      <div class="shop-record">
        <div class="shop-sell">
          <div class="shop-sell-num">{{ shopInfo.cSells | filterNum }}</div>
          <div>总销量</div>
        </div>
        <div class="shop-goods">
          <div class="shop-sell-num">{{ shopInfo.cGoods }}</div>
          <div>全部宝贝</div>
        </div>
      </div>
      <div class="shop-assess">
        <table align="right" cellspacing="6">
          <tr v-for="item in shopInfo.score" :key="item.value">
            <td>{{ item.name }}</td>
            <td>
              <i
                :style="{
                  color: item.isBetter ? 'red' : 'green',
                }"
                >{{ item.score }}</i
              >
            </td>
            <td>
              <i
                :style="{
                  backgroundColor: item.isBetter ? 'red' : 'green',
                  color: '#fff',
                }"
              >
                {{ item.isBetter ? "高" : "低" }}
              </i>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-foot">
      <button class="go">进入店铺</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    filterNum(value) {
      if (value >= 10000) {
        return (value / 10000).toFixed(1) + "万";
      } else {
        return value;
      }
    },
  },
};
</script>
<style scoped>
.detail-shop-info {
  padding: 0px 10px;
}
.shop-head {
  height: 70px;
  line-height: 70px;
  font-size: 18px;
}
.shop-head img {
  width: 36px;
  height: 36px;
  margin-right: 10px;
}
.shop-body {
  display: flex;
  align-items: center;
}
.shop-record {
  display: flex;
  flex: 1;
  justify-content: space-around;
  border-right: 1px solid rgba(100, 100, 100, 0.2);
}
.shop-sell {
  text-align: center;
}
.shop-sell-num {
  font-size: 18px;
}
.shop-goods {
  text-align: center;
}
.shop-assess {
  flex: 1;
  text-align: center;
}
.shop-foot {
  padding: 20px 0px;
  text-align: center;
  border-bottom: 3px solid rgba(100, 100, 100, 0.1);
}
.go {
  width: 150px;
  height: 36px;
  font-size: 14px;
  color: #666;
  border-radius: 18px;
}
</style>