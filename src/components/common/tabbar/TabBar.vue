<!--  -->
<template>
  <div class="tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>
<style scoped>
.tabbar {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 49px;
  padding-top: 3px;
  background-color: #f6f6f6;
  box-shadow: 0px -2px 1px rgba(100, 100, 100, 0.1);
}
</style>