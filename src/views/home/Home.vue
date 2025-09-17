<!--  -->
<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <!-- 在scroll中使用fixed定位做吸顶效果有问题 所以用第二个显示隐藏方案-->
    <!-- 此tabControl作为吸顶效果展示 -->
    <tab-control
      class="tab-control2"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl2"
      v-show="isShowFixedTab"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        class="tab-control1"
        :titles="['流行', '新款', '这里进行了修改']"
        @tabClick="tabClick"
        ref="tabControl1"
      />
      <goods-list :goodsList="showGoods" />
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "api/home";

import { itemListenerMixin } from "common/mixin";

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
      //放回顶部按钮默认不显示
      isShowBackTop: false,
      //用于存放tabcontrol栏到顶部的距离
      tabOffsetTop: 0,
      //吸顶tabcontrol栏默认不显示
      isShowFixedTab: false,
      //用于存放滚动的Y轴距离
      scrollY: 0,
    };
  },
  mixins: [itemListenerMixin],
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView,
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
  mounted() {},
  //利用mixins对这段代码抽离封装 detail里图片加载刷新也会用到
  // mounted() {
  //   //对调用refresh方法进行防抖优化
  //   const refresh = debounce(this.$refs.scroll.refresh, 50);
  //   //接收事件总线的图片加载事件并监听
  //   this.$bus.$on("itemImageLoad", () => {
  //     refresh();
  //     //每当图片加载就调用scroll里的refresh方法重新计算滚动高度
  //     // this.$refs.scroll.refresh();
  //   });
  // },
  //使用keepAlive保持组件状态才能使用-回来时
  activated() {
    //先重新计算滚动距离 避免bug
    this.$refs.scroll.refresh();
    //再将页面滚动到离开前的位置
    this.$refs.scroll.scrollTo(0, this.scrollY, 0);
  },
  //使用keepAlive保持组件状态才能使用-离开时
  deactivated() {
    //记录离开时滚动Y轴距离
    this.scrollY = this.$refs.scroll.getScrollY();
    //取消对图片加载的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
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
      //吸顶tab和实际tab点击显示效果同步
      this.$refs.tabControl1.select = index;
      this.$refs.tabControl2.select = index;
    },
    //放回顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
    //滚动监听
    contentScroll(position) {
      //是否显示返回顶部按钮
      this.isShowBackTop = -position.y > 1000;
      //是否显示tab吸顶效果
      this.isShowFixedTab = -position.y > this.tabOffsetTop;
    },
    //上拉加载更多
    loadMore() {
      this.getHomeGoods(this.parameters);
    },
    //当轮播图加载成功时 获取tabControl到顶部距离
    swiperImageLoad() {
      //组件不能直接使用offsetTop方法 需接$el
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop;
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
        //默认只能加载一次 需调用完成加载函数
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
};
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}
.nav-bar {
  /* 用scroll规定了滚动区域就不再需要定位了
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1; */
  background-color: #ff8e97;
  font-size: 18px;
  color: #fff;
}
/*使用scroll后粘性定位不生效
.tab-control1 {
  position: sticky;
  top: 44px;
} */
.tab-control2 {
  position: relative;
  z-index: 1;
}

.content {
  /*计算可滚动范围
   margin-top: 44px;
  height: calc(100vh - 93px); 或*/
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>