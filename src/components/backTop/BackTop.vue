<template>
  <div id="components-back-top-demo-custom">
    <a-back-top :visibilityHeight="visibilityHeight">
      <div class="ant-back-top-service">
        <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=3189427318&site=qq&menu=yes">
          <img
            border="0"
            src="http://wpa.qq.com/pa?p=2:3189427318:52"
            alt="点击这里给我发消息"
            title="点击这里给我发消息"
          />
        </a>
      </div>
      <div class="ant-back-top-inner">
        <a-icon type="rocket" />
      </div>
    </a-back-top>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonWidth: 40,
      visibilityHeight: 0
    }
  }
}
</script>

<style lang="less" scope>
#components-back-top-demo-custom {
  .ant-back-top {
    bottom: 300px;
  }

  .ant-back-top-service {
    width: 40px;
    background-color: #da5054;
    text-align: center;
    padding: 6px 0;
    border-radius: 4px 4px 0 0;
    border-bottom: 1px solid #fff;
  }
  .ant-back-top-inner {
    height: 40px;
    width: 40px;
    line-height: 40px;
    border-radius: 0 0 4px 4px;
    background-color: #da5054;
    color: #fff;
    text-align: center;
    font-size: 20px;
  }
}
</style>
