<!--  -->
<template>
  <div class="detail-bottom-bar">
    <div class="left-bar">
      <div>
        <li class="icon service"></li>
        <span>客服</span>
      </div>
      <div>
        <li class="icon shop"></li>
        <span>店铺</span>
      </div>
      <div>
        <li class="icon collect"></li>
        <span>收藏</span>
      </div>
    </div>
    <div class="right-bar">
      <div class="add" @click="addCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addCart() {
      this.$emit("addCart");
    },
  },
};
</script>
<style scoped>
.detail-bottom-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  display: flex;
  height: 49px;
  background-color: #fff;
  box-shadow: 0px -2px 1px rgba(100, 100, 100, 0.1);
}
.left-bar {
  display: flex;
  justify-content: space-around;
  flex: 1;
  padding-top: 5px;
}
.right-bar {
  display: flex;
  flex: 1;
  line-height: 49px;
  text-align: center;
}
.icon {
  flex: 1;
  width: 24px;
  height: 24px;
}
.service {
  background: url("~assets/img/detail/detail_bottom.png") no-repeat 0px -57px;
  background-size: 100%;
}
.shop {
  background: url("~assets/img/detail/detail_bottom.png") no-repeat 0px -107px;
  background-size: 100%;
}
.collect {
  background: url("~assets/img/detail/detail_bottom.png") no-repeat;
  background-size: 100%;
}
.add {
  flex: 1;
  background-color: #ffe817;
  font-size: 14px;
}
.buy {
  flex: 1;
  background-color: #f69;
  font-size: 16px;
  color: #fff;
}
</style>