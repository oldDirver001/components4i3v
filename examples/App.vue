<!--
 * @Author: xiongdaoqi
 * @Date: 2023-08-23 16:44:13
 * @LastEditors: xiongdaoqi
 * @LastEditTime: 2023-08-25 14:41:00
 * @Description: 请输入
-->
<template>
  <div id="app">
    <I3vTaskDirectory></I3vTaskDirectory>
  </div>
</template>

<script>
import I3vTaskDirectory from '../packages/task-directory/src/main.vue'

export default {
  name: 'App',
  components: {
    I3vTaskDirectory
  }
}
</script>

<style lang="scss">
* {
  font-family: "PingFangSC", "Microsoft Yahei", "Avenir", Helvetica, Arial, sans-serif;
}
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
}

.el-tree--highlight-current {
  .el-tree-node.is-current {
    & > .el-tree-node__content {
      background: #347eff!important;
      color: #ffffff!important;
      .el-button--text {
        color: #ffffff!important;
      }
    }
  }
}

.el-scrollbar__wrap {
  overflow-x: hidden!important;
}

</style>
