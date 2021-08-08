<!--  -->
<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <span
          v-for="(item, index) in titles"
          :key="item.value"
          class="title-item"
          @click="titleClick(index)"
          :class="{ active: select === index }"
        >
          {{ item }}
        </span>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["详情", "参数", "评价", "推荐"],
      select: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
    //监听详情导航栏文字点击
    titleClick(index) {
      this.select = index;
      this.$emit("navClick", index);
    },
    //监听返回按钮点击 并返回上个页面
    backClick() {
      this.$router.back();
    },
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
};
</script>
<style scoped>
.detail-nav-bar {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.title {
  display: flex;
  font-size: 14px;
}
.title-item {
  flex: 1;
}

.active {
  color: #ff8e97;
}
</style>