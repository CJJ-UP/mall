<!--  -->
<template>
  <div class="detail">
    <detail-nav-bar @navClick="navClick" ref="detailNav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods-info="goods" />
      <detail-shop-info :shop-info="shop" />
      <detail-image-info
        :image-info="images"
        @detailImageLoad="detailImageLoad"
      />
      <detail-params-info :params-info="params" ref="params" />
      <detail-comment-info :comment-info="comments" ref="comment" />
      <goods-list :goods-list="recommends" ref="recommend" />
    </scroll>
    <detail-bottom-bar @addCart="addCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <toast />
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import Toast from "components/common/toast/Toast";
import GoodsList from "components/content/goods/GoodsList";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailImageInfo from "./childComps/DetailImageInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import { getDetail, getRecommend, Goods } from "api/detail";

import { debounce } from "common/utils";
import { itemListenerMixin, BackTopMixin } from "common/mixin";

export default {
  name: "Detail",
  data() {
    return {
      iid: null, //商品iid
      topImages: [], //商品详情轮播图
      goods: {}, //商品详情基本信息
      shop: {}, //商品店铺信息
      images: {}, //商品详情图片信息
      params: {}, //商品详情参数信息
      comments: [], //商品详情评论信息
      recommends: [], //商品详情推荐信息
      liftNav: [], //电梯导航各阶段高度信息
      getLiftNav: null,
      select: 0,
    };
  },
  mixins: [itemListenerMixin, BackTopMixin],
  components: {
    Scroll,
    Toast,
    GoodsList,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
  },
  created() {
    //获取当前商品iid
    this.iid = this.$route.params.iid;
    //通过商品iid发送该商品详情页面数据请求
    getDetail(this.iid).then((res) => {
      const data = res.result;
      //获取商品轮播图数据
      this.topImages = data.itemInfo.topImages;

      //整理出有用的商品信息 保存到创建的Goods类中
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //获取店铺相关数据
      this.shop = data.shopInfo;

      //获取商品详情图片相关数据
      this.images = data.detailInfo;

      //获取商品参数相关数据
      this.params = data.itemParams;

      //获取商品评论相关数据
      if (data.rate.cRate !== 0) {
        this.comments = data.rate.list;
      }
    });

    //获取商品详情页推荐相关数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });

    //将获取电梯导航高度进行防抖处理
    this.getLiftNav = debounce(() => {
      this.liftNav = [];
      this.liftNav.push(0);
      this.liftNav.push(this.$refs.params.$el.offsetTop);
      this.liftNav.push(this.$refs.comment.$el.offsetTop);
      this.liftNav.push(this.$refs.recommend.$el.offsetTop);
      this.liftNav.push(Number.MAX_VALUE);
    }, 100);
  },
  mounted() {},
  //组件销毁时(没有用keepAlive保持状态 不能使用deactivated)
  destroyed() {
    //取消对图片加载的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    //点击NavBar选项 跳转到对应内容
    navClick(index) {
      this.$refs.scroll.scrollTo(0, -this.liftNav[index], 500);
    },
    //监听详情图片加载
    detailImageLoad() {
      //调用mixins混入的刷新函数
      this.refresh();
      //调用防抖处理过的获取电梯导航高度函数
      this.getLiftNav();
    },
    //监听滚动位置跳转到对应NavBar选项
    contentScroll(position) {
      let positionY = -position.y;
      for (let i = 0; i < this.liftNav.length; i++) {
        if (
          this.select !== i &&
          positionY >= this.liftNav[i] &&
          positionY < this.liftNav[i + 1]
        ) {
          this.$refs.detailNav.select = i;
          this.select = i;
        }
      }
      //调用混入中的返回顶部函数
      this.backTop(position);
    },
    addCart() {
      let product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      product.count = 1;
      product.checked = false;

      this.$store.dispatch("addCart", product).then((res) => {
        this.$toast.show(res, 2000);
      });
    },
  },
};
</script>
<style scoped>
.detail {
  position: relative;
  z-index: 9;
  height: 100vh;
  background-color: #fff;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>