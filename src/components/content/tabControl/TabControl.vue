<!--  -->
<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="item.value"
      class="tab-control-item"
    >
      <span :class="{ active: select === index }" @click="selected(index)">
        {{ item }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      select: 0,
    };
  },
  methods: {
    selected(index) {
      this.select = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>
<style scoped>
.tab-control {
  display: flex;
  height: 44px;
  font-size: 15px;
  line-height: 44px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0px 2px 1px rgba(100, 100, 100, 0.1);
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: #ff8e97;
  border-bottom: 3px solid #ff8e97;
}
</style>