<!--  -->
<template>
  <div v-if="commentInfo.length !== 0" class="detail-comment-info">
    <div class="comment-title">
      <span>用户评价</span>
      <a>更多</a>
    </div>
    <div v-for="item in commentInfo" :key="item.value" class="comment-detail">
      <div class="comment-user">
        <img :src="item.user.avatar" alt="" />
        <span>{{ item.user.uname }}1111</span>
      </div>
      <div class="comment-content">
        <p>{{ item.content }}</p>
      </div>
      <div class="comment-tail">
        <span class="comment-time">{{ item.created | filterTime }}</span>
        <span class="shop-style">{{ item.style }}</span>
      </div>
      <div v-if="item.images" class="comment-images">
        <img v-for="img in item.images" :src="img" :key="img.value" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";
export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  filters: {
    //对时间戳进行格式化处理
    filterTime(value) {
      const data = new Date(value * 1000);
      //调用封装好的时间戳格式化方法
      return formatDate(data, "yyyy/MM/dd");
    },
  },
};
</script>
<style scoped>
.detail-comment-info {
  padding: 0px 10px 10px 10px;
}
.comment-title {
  padding: 10px 0px;
  border-bottom: 2px solid rgba(100, 100, 100, 0.1);
}
.comment-title a {
  float: right;
}
.comment-user {
  padding: 10px 0px;
  font-size: 14px;
}
.comment-user img {
  width: 38px;
  height: 38px;
  margin-right: 10px;
}
.comment-content {
  color: #333;
}
.comment-tail {
  padding: 5px 0px;
  color: #666;
}
.comment-time {
  margin-right: 5px;
}
.comment-images img {
  width: 60px;
  height: 60px;
  margin-right: 5px;
}
</style>