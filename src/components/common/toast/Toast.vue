<!--  -->
<template>
  <div v-show="isShow" class="toast">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    show(mes, time = 2000) {
      this.message = mes;
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
      }, time);
    },
  },
};
</script>
<style scoped>
.toast {
  position: fixed;
  z-index: 999;
  top: 50%;
  right: 50%;
  transform: translate(50%, 50%);
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  font-size: 16px;
  border-radius: 10px;
}
</style>