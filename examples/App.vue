<!--
 * @Author: xiongdaoqi
 * @Date: 2023-08-23 16:44:13
 * @LastEditors: xiongdaoqi
 * @LastEditTime: 2023-08-30 16:22:19
 * @Description: 请输入
-->
<template>
  <div id="app">
    <!-- <I3vFileAttribute></I3vFileAttribute> -->
    <!-- <I3vProjectDirectory></I3vProjectDirectory> -->
    <I3vTaskDirectory></I3vTaskDirectory>
  </div>
</template>

<script>
// import I3vFileAttribute from '../packages/file-attribute/src/main.vue'
// import I3vProjectDirectory from '../packages/project-directory/src/main.vue'
import I3vTaskDirectory from '../packages/task-directory/src/main.vue'

export default {
  name: 'App',
  components: {
    // I3vFileAttribute,
    // I3vProjectDirectory,
    I3vTaskDirectory,
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
</style>
