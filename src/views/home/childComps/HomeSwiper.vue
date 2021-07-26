<!--  -->
<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.value">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="ImageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad: true,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    //轮播图片加载时发送事件 只需发送一次
    ImageLoad() {
      if (this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = false;
      }
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>