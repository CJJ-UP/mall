<!--  -->
<template>
  <div v-if="Object.keys(paramsInfo).length !== 0" class="detail-params-info">
    <div v-if="paramsInfo.rule">
      <table
        v-for="(table, index) in paramsInfo.rule.tables"
        :key="index"
        class="params-rule"
      >
        <tr v-for="(item, indey) in table" :key="indey">
          <td v-for="td in item" :key="td.value">{{ td }}</td>
        </tr>
      </table>
    </div>
    <div v-if="paramsInfo.info">
      <table class="params-info">
        <tr v-for="(set, indez) in paramsInfo.info.set" :key="indez">
          <td class="left-td">{{ set.key }}</td>
          <td class="right-td">{{ set.value }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamsInfo",
  props: {
    paramsInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style scoped>
.detail-params-info {
  padding: 0px 10px;
}
.params-rule {
  width: 100%;
  border-collapse: collapse;
}
.params-rule tr {
  border-bottom: 2px solid rgba(100, 100, 100, 0.1);
}
.params-rule td {
  padding: 10px 0px;
}
.params-info {
  width: 100%;
  border-collapse: collapse;
}
.params-info tr {
  border-bottom: 2px solid rgba(100, 100, 100, 0.1);
}
.left-td {
  width: 25%;
  padding: 10px 0px;
}
.right-td {
  color: #eb4868;
}
</style>