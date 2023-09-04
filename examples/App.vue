<!--
 * @Author: xiongdaoqi
 * @Date: 2023-08-23 16:44:13
 * @LastEditors: xiongdaoqi
 * @LastEditTime: 2023-09-04 11:21:37
 * @Description: 请输入
-->
<template>
  <div id="app">
    <!-- <I3vFileAttribute></I3vFileAttribute> -->
    <!-- <I3vProjectDirectory></I3vProjectDirectory> -->
    <!-- <I3vTaskDirectory></I3vTaskDirectory> -->
    <I3vAddAttrPanel ref="I3vAddAttrPanel"></I3vAddAttrPanel>
    <button @click="handleShow">button</button>
  </div>
</template>

<script>
// import I3vFileAttribute from '../packages/file-attribute/src/main.vue'
// import I3vProjectDirectory from '../packages/project-directory/src/main.vue'
// import I3vTaskDirectory from '../packages/task-directory/src/main.vue'
import I3vAddAttrPanel from '../packages/file-attribute/src/add-attr-panel.vue'

export default {
  name: 'App',
  components: {
    // I3vFileAttribute,
    // I3vProjectDirectory,
    // I3vTaskDirectory,
    I3vAddAttrPanel,
  },
  methods: {
    handleShow() {
      console.log('this.$refs.I3vAddAttrPanel :>> ', this.$refs.I3vAddAttrPanel);
      this.$refs.I3vAddAttrPanel.showDialog()
    }
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
