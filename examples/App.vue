<!--
 * @Author: xiongdaoqi
 * @Date: 2023-08-23 16:44:13
 * @LastEditors: xiongdaoqi
 * @LastEditTime: 2023-09-12 19:14:52
 * @Description: 请输入
-->
<template>
  <div id="app">
    <button @click="handleShowAttr">button</button>
    <I3vFileAttribute ref="I3vFileAttribute"></I3vFileAttribute>
    <!-- <I3vProjectDirectory></I3vProjectDirectory> -->
    <!-- <I3vTaskDirectory></I3vTaskDirectory> -->
    <!-- <I3vAddAttrPanel ref="I3vAddAttrPanel"></I3vAddAttrPanel> -->
    <!-- <button @click="handleShow">button</button> -->
  </div>
</template>

<script>
import I3vFileAttribute from "../packages/file-attribute/src/main.vue";
// import I3vProjectDirectory from '../packages/project-directory/src/main.vue'
// import I3vTaskDirectory from '../packages/task-directory/src/main.vue'
// import I3vAddAttrPanel from "../packages/file-attribute/src/add-attr-panel.vue";

export default {
  name: "App",
  components: {
    I3vFileAttribute,
    // I3vProjectDirectory,
    // I3vTaskDirectory,
    // I3vAddAttrPanel,
  },
  methods: {
    handleShowAttr() {
      this.$refs.I3vFileAttribute.setAttributeDetail({
        id: "40287e118a884dfa018a88966fc1001d",
        folderName: "高桥凉介",
        folderDescribe: "群马县1",
        folderAttribute: null,
        identifyId: "40287e118a884dfa018a88966fc1001d",
        createBy: "熊道齐",
        createTime: "2023-09-12 16:51:15",
        updateBy: "熊道齐",
        updateTime: "2023-09-12 17:51:52",
        folderPosition: "艾尔登法环/企业网盘/高桥凉介",
        fsDictQueryVOList: [
          {
            dictId: "40287e118a83c9ef018a83ceeb7f0010",
            dictName: "网盘全部分类",
            dictItemId: null,
            dictItemType: 0,
            dictUseType: 1,
            dictType: 1,
            detailDTOList: [
              {
                id: "40287e118a83c9ef018a83ceeba90011",
                itemText: "企业文件",
                description: null,
                isSelected: 0,
                dictType: null,
                delFlag: 0,
              },
              {
                id: "40287e118a83c9ef018a83ceeba90012",
                itemText: "个人文件",
                description: null,
                isSelected: 0,
                dictType: null,
                delFlag: 0,
              },
              {
                id: "40287e118a83c9ef018a83d8d1ae0013",
                itemText: "其他文件",
                description: null,
                isSelected: 0,
                dictType: null,
                delFlag: 0,
              },
              {
                id: "40287e118a83c9ef018a83d933e70014",
                itemText: "其他文件",
                description: null,
                isSelected: 0,
                dictType: null,
                delFlag: 0,
              },
              {
                id: "40287e118a83c9ef018a86f468a90016",
                itemText: "其他文件2",
                description: null,
                isSelected: 0,
                dictType: 2,
                delFlag: 0,
              },
              {
                id: "40287e118a871f99018a871f99cf0000",
                itemText: "我的收藏",
                description: null,
                isSelected: 0,
                dictType: 2,
                delFlag: 0,
              },
              {
                id: "40287e118a871f99018a8730ac1f000b",
                itemText: "视频收藏",
                description: null,
                isSelected: 0,
                dictType: 2,
                delFlag: 0,
              },
              {
                id: "40287e118a871f99018a876c6b2d0019",
                itemText: "同级1",
                description: null,
                isSelected: 0,
                dictType: 2,
                delFlag: 0,
              },
              {
                id: "40287e118a871f99018a876e4d54001b",
                itemText: "同级2",
                description: null,
                isSelected: 0,
                dictType: 2,
                delFlag: 0,
              },
              {
                id: "40287e118a884dfa018a88740fc40014",
                itemText: "子分类C-1",
                description: null,
                isSelected: 0,
                dictType: 2,
                delFlag: 0,
              },
              {
                id: "40287e118a884dfa018a8890a5e40019",
                itemText: "asdf",
                description: null,
                isSelected: 1,
                dictType: 2,
                delFlag: 0,
              },
              {
                id: "40287e118a884dfa018a8890d8db001a",
                itemText: "allin",
                description: null,
                isSelected: 0,
                dictType: 2,
                delFlag: 0,
              },
            ],
          },
          {
            dictId: "40287e118a890269018a890d1e820004",
            dictName: "添加一个自定义属性",
            dictItemId: null,
            dictItemType: 2,
            dictUseType: 2,
            dictType: 2,
            detailDTOList: [
              {
                id: "40287e118a890269018a890d1f0b0006",
                itemText: "1",
                description: "1",
                isSelected: 1,
                dictType: null,
                delFlag: 0,
              },
              {
                id: "40287e118a890269018a890d1f0b0007",
                itemText: "2",
                description: "2",
                isSelected: 0,
                dictType: null,
                delFlag: 0,
              },
              {
                id: "40287e118a890269018a890d1f0b0008",
                itemText: "3",
                description: "3",
                isSelected: 0,
                dictType: null,
                delFlag: 0,
              },
            ],
          },
        ],
      });
    },
    handleShow() {
      console.log(
        "this.$refs.I3vAddAttrPanel :>> ",
        this.$refs.I3vAddAttrPanel
      );
      // this.$refs.I3vAddAttrPanel.showDialog()
      this.$refs.I3vAddAttrPanel.editFormDefData({
        id: "40287e118a63d749018a6429d6910004",
        dictName: "tonight",
        dictType: 2,
        delFlag: 0,
        dictUseType: 2,
        dictItemType: 2,
        detailDTOList: [
          {
            id: "40287e118a63d749018a6429d7040006",
            itemText: "tonight-1",
            delFlag: 0,
          },
          {
            id: "40287e118a63d749018a6429d7040007",
            itemText: "tonight-2",
            delFlag: 0,
          },
          {
            id: "40287e118a63d749018a6429d7040008",
            itemText: "tonight-3",
            delFlag: 0,
          },
          {
            id: "40287e118a63d749018a6429d7040009",
            itemText: "tonight-5",
            delFlag: 0,
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss">
* {
  font-family: "PingFangSC", "Microsoft Yahei", "Avenir", Helvetica, Arial,
    sans-serif;
}
html,
body {
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
      background: #347eff !important;
      color: #ffffff !important;
      .el-button--text {
        color: #ffffff !important;
      }
    }
  }
}
</style>
