<!--  -->
<template>
  <div class="cart-nav-bar">
    <nav-bar>
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import { mapGetters } from "vuex";

export default {
  name: "CartNavBar",
  components: {
    NavBar,
  },
  computed: {
    ...mapGetters({
      length: "cartGoodsLength",
    }),
    //或...mapGetters(["cartGoodsLength"])
  },
};
NavBar;
</script>
<style scoped>
.cart-nav-bar {
  background-color: #ff8198;
  font-size: 18px;
  color: #fff;
}
</style>