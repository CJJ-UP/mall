<!--  -->
<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />
      <goods-list :goodsList="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "api/home";
import Scroll from "components/common/scroll/Scroll";
export default {
  name: "Home",
  data() {
    return {
      //用于存放请求过来的轮播图和推荐相关数据
      banners: [],
      recommends: [],
      //用于存放首页商品列表相关数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      //默认显示流行商品数据
      parameters: "pop",
      //放回顶部按钮默认显示
      isShowBackTop: true,
    };
  },
  components: {
    NavBar,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView,
    Scroll,
  },
  methods: {
    /**事件相关方法**/
    //tab栏切换
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
    //放回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
    //滚动监听是否显示返回顶部按钮
    contentScroll(position) {
      this.isShowBackTop = position.y < -1000;
    },
    //上拉加载更多
    loadMore() {
      this.getHomeGoods(this.parameters);
    },

    /**网络请求相关方法**/
    //首页轮播图 推荐相关数据请求
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //首页商品列表相关数据请求
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
  },
  computed: {
    //tab栏切换显示对应数据
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
  position: relative;
  height: 100vh;
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
.content {
  /* margin-top: 44px;
  height: calc(100% - 93px); */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>