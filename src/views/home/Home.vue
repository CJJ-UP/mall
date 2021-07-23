<!--  -->
<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners" />
    <recommend-view :recommends="recommends" />
    <feature-view />
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
    />
    <goods-list :goodsList="showGoods" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "api/home";
export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      parameters: "pop",
    };
  },
  components: {
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  methods: {
    //事件相关方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.parameters = "pop";
          break;
        case 1:
          this.parameters = "new";
          break;
        case 2:
          this.parameters = "sell";
          break;
      }
    },

    //网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.parameters].list;
    },
  },

  //生命周期函数
  created() {
    //请求首页轮播推荐多个数据
    this.getHomeMultidata();
    //请求首页商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
};
</script>
<style scoped>
#home {
  padding-top: 44px;
  height: 1800px;
}
.nav-bar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
  background-color: #ff8e97;
  font-size: 18px;
  color: #fff;
}
.tab-control {
  position: sticky;
  top: 44px;
}
</style>