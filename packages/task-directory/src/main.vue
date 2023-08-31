<!--
 * @Author: xiongdaoqi
 * @Date: 2023-08-25 14:37:25
 * @LastEditors: xiongdaoqi
 * @LastEditTime: 2023-08-31 09:28:50
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
        <div style="margin-bottom: 4px;">
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
        </div>
        <!--  -->
        <el-scrollbar style="height: 300px">
          <div class="list-item" v-for="l in subList" :key="l.id">
            <i class="el-icon-document"></i>
            <span>{{ l.label }}</span>
          </div>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <div class="head">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
          <div>
            <el-button type="primary">上传</el-button>
            <el-button type="primary">创建目录</el-button>
          </div>
        </div>
        <el-table stripe border :data="tableData">
          <el-table-column prop="name" label="名称">
            <template slot-scope="scope">
              <div class="name">
                <img
                  src="@/assets/document-icons/folder.png"
                  :style="imageStyle"
                />
                <span>{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>
<script>
const loopData = () => {
  let arr = [];
  for (let i = 0; i < 200; i++) {
    const obj = { id: i + 1, label: "过程文件" };
    arr.push(obj);
  }
  return arr;
};
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
      tableData: [{ id: 1, name: "1" }],
      subList: [
        { id: 1, label: "过程文件" },
        { id: 2, label: "成果文件" },
        { id: 3, label: "其他文件" },
      ],
    };
  },
  computed: {
    imageStyle() {
      return {
        width: "24px",
        height: "24px",
        "margin-right": "8px",
      };
    },
  },
  created() {
    this.subList = loopData();
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
    background-color: #409EFF;
    color: #fff;
    border-color: #409EFF;
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
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .list-item {
    padding: 4px;
    cursor: pointer;
  }
}
</style>
