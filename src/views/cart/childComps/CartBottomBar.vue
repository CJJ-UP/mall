<!--  -->
<template>
  <div class="cart-bottom-bar">
    <div class="icon">
      <check-icon
        class="check-icon"
        :isChecked="this.checkAll"
        @click.native="checkClick"
      />
      <span>全选</span>
    </div>
    <div class="total">
      <span>合计:{{ totalPrice }}</span>
    </div>
    <div class="settle">
      <span>去计算{{ settleCount }}</span>
    </div>
  </div>
</template>

<script>
import CheckIcon from "components/content/checkIcon/CheckIcon";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  data() {
    return {
      checkAll: false,
    };
  },
  components: {
    CheckIcon,
  },
  computed: {
    ...mapGetters(["cartGoods"]),

    //合计选中商品的价格
    totalPrice() {
      return (
        "¥" +
        this.cartGoods
          .filter((item) => item.checked)
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    //去计算显示商品件数
    settleCount() {
      return this.cartGoods.filter((item) => item.checked).length;
    },

    //全选
  },
  methods: {
    checkClick() {
      this.checkAll = !this.checkAll;
      if (this.checkAll) {
        this.cartGoods.forEach((item) => {
          item.checked = true;
        });
      } else {
        this.cartGoods.forEach((item) => {
          item.checked = false;
        });
      }
    },
  },
  mounted() {
    this.$bus.$on("itemCheck", () => {
      let result = this.cartGoods.find((item) => {
        return !item.checked;
      });
      if (result) {
        this.checkAll = false;
      } else {
        this.checkAll = true;
      }
    });
  },
};
</script>
<style scoped>
.cart-bottom-bar {
  display: flex;
  height: 40px;
  background-color: #eee;
  line-height: 40px;
  box-shadow: 0px -2px 1px rgba(100, 100, 100, 0.1);
}
.icon {
  width: 60px;
  height: 100%;
  display: flex;
  align-items: center;
}
.check-icon {
  display: flex;
}
.total {
  flex: 1;
}
.settle {
  width: 80px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>