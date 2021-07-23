<!--  -->
<template>
  <div class="recommend">
    <a
      v-for="item in recommends"
      :key="item.value"
      class="recommend-item"
      :href="item.link"
    >
      <img :src="item.image" alt="" />
      <div>{{ item.title }}</div>
    </a>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.recommend {
  display: flex;
  padding: 10px 0 20px 0;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: 1;
  text-align: center;
}
.recommend-item img {
  width: 68px;
  height: 68px;
  margin-bottom: 10px;
}
</style>