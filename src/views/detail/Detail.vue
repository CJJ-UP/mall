<!--  -->
<template>
  <div class="detail">
    <detail-nav-bar />
    <detail-swiper :top-images="topImages" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import { getDetail } from "api/detail";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
  },
  created() {
    //获取当前商品iid
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      this.topImages = res.result.itemInfo.topImages;
    });
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>