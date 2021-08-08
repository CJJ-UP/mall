<!--  -->
<template>
  <div class="check-icon" :class="{ checked: isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckIcon",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped>
.check-icon {
  width: 18px;
  height: 18px;
  border-radius: 18px;
  border: 1px solid #999;
}
.check-icon img {
  width: 100%;
  height: 100%;
}
.checked {
  background-color: red;
}
</style>