<!--
 * @Author: xiongdaoqi
 * @Date: 2023-08-25 14:37:25
 * @LastEditors: xiongdaoqi
 * @LastEditTime: 2023-08-25 17:13:04
 * @Description: 请输入
-->
<template>
  <div class="i3v-task-dir">
    <div class="title">
      <b>目录结构</b>
    </div>
    <!--  -->
    <el-container class="i3v-task-dir__container">
      <el-aside class="i3v-task-dir__aside" width="200px">
        <I3vScrollPane>
          <div
            class="classify-item"
            :class="{ active: activeClassifyKey === c.id }"
            v-for="c in classifyList"
            :key="c.id"
            @click="handleClassifyClick(c)"
          >
            {{ c.name }}
          </div>
        </I3vScrollPane>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "I3vTaskDirectory",
  data() {
    return {
      classifyList: [
        { id: 1, name: "全部" },
        { id: 2, name: "目录类型" },
        { id: 3, name: "专业分类" },
        { id: 4, name: "演示材料" },
        { id: 5, name: "开发服务" },
      ],
      activeClassifyKey: 1,
    };
  },
  methods: {
    handleClassifyClick(classify) {
      const { id } = classify;
      this.activeClassifyKey = id;
    },
  },
};
</script>
<style lang="scss">
.i3v-task-dir {
  width: 100%;
  height: 100%;
  .title {
    font-size: 16px;
    padding: 6px;
    border-bottom: 1px solid #eeeeee;
  }
  &__container {
    width: 100%;
    height: calc(100% - 34px);
  }
  &__aside {
    border-right: 1px solid #eeeeee;
  }
  .classify-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
  }
  .classify-item.active {
    background-color: #42b983;
    color: #fff;
    border-color: #42b983;
    &::before {
      content: "";
      background: #fff;
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: relative;
      margin-right: 2px;
    }
  }
}
</style>
