<template>
  <div class="skeleton">
    <img src="../../assets/image/nodata.png" alt="暂无数据" />
    <h3>暂无数据</h3>
  </div>
</template>

<script>
export default {
  name: 'Skeleton',
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.skeleton {
  padding: 120px;
  text-align: center;
  img {
    margin: 24px auto;
  }
  h3 {
    font-size: 20px;
    color: #999;
    font-weight: 500;
  }
}
</style>
