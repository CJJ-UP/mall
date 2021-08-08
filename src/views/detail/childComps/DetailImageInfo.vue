<!--  -->
<template>
  <div v-if="Object.keys(imageInfo).length !== 0" class="detail-image-info">
    <div class="desc">
      <div class="start"></div>
      <p>{{ imageInfo.desc }}</p>
      <div class="end"></div>
    </div>
    <div v-for="item in imageInfo.detailImage" :key="item.value">
      <p class="image-title">{{ item.key }}</p>
      <img
        class="image-show"
        v-for="img in item.list"
        :key="img.value"
        :src="img"
        alt=""
        @load="detailImageLoad"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailImageInfo",
  props: {
    imageInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    detailImageLoad() {
      this.$emit("detailImageLoad");
    },
  },
};
</script>
<style scoped>
.desc {
  position: relative;
}
.desc p {
  padding: 10px;
  font-size: 14px;
}
.start,
.end {
  width: 100px;
  height: 1px;
  background-color: #000;
}
.end {
  float: right;
}
.start::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: -5px;
  width: 5px;
  height: 5px;
  background-color: #000;
}
.end::before {
  content: "";
  display: inline-block;
  position: absolute;
  top: 37px;
  right: 0px;
  width: 5px;
  height: 5px;
  background-color: #000;
}
.image-title {
  height: 40px;
  padding: 0px 10px;
  line-height: 40px;
  font-size: 16px;
}
.image-show {
  width: 100%;
}
</style>