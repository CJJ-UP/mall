<!--  -->
<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="#d81e06">
      <img src="~assets/img/tabbar/home.png" alt="" slot="item-icon" />
      <img
        src="~assets/img/tabbar/home-active.png"
        alt=""
        slot="active-item-icon"
      />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="#d81e06">
      <img src="~assets/img/tabbar/category.png" alt="" slot="item-icon" />
      <img
        src="~assets/img/tabbar/category-active.png"
        alt=""
        slot="active-item-icon"
      />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="#d81e06">
      <img src="~assets/img/tabbar/cart.png" alt="" slot="item-icon" />
      <img
        src="~assets/img/tabbar/cart-active.png"
        alt=""
        slot="active-item-icon"
      />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="#d81e06">
      <img src="~assets/img/tabbar/profile.png" alt="" slot="item-icon" />
      <img
        src="~assets/img/tabbar/profile-active.png"
        alt=""
        slot="active-item-icon"
      />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>
<style scoped>
</style>