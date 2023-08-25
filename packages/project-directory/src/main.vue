<!--
 * @Author: xiongdaoqi
 * @Date: 2023-08-24 14:43:24
 * @LastEditors: xiongdaoqi
 * @LastEditTime: 2023-08-25 11:05:13
 * @Description: 请输入
-->
<template>
  <div class="i3v-project-directory">
    <div ref="dir" class="dir">
      <div class="title">
        <b>目录结构</b>
        <el-button type="text" icon="el-icon-plus" @click="handleAdd"></el-button>
      </div>
      <el-scrollbar :style="{ height: tableHeight }">
        <el-tree
          node-key="id"
          :data="treeData"
          :props="defaultProps"
          :highlight-current="true"
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
        >
          <div class="custom-tree-node" slot-scope="{ node, data }">
            <span class="-left-flex"
              ><img
                src="@/assets/document-icons/folder.png"
                :style="imageStyle"
              />
              <span>{{ data.label }}</span></span
            >
            <!-- <span>{{ data.label }}</span> -->
            <span>
              <el-popover
                :ref="`popRef${data.id}`"
                placement="bottom"
                trigger="click"
                popper-class="project-folder-tree-pop"
              >
                <el-button
                  style="transform: rotateZ(90deg)"
                  slot="reference"
                  icon="el-icon-more"
                  type="text"
                  size="small"
                  @click="handlePopShow(data)"
                >
                </el-button>
                <ul>
                  <li>
                    <el-button type="text" @click="handleLiEdit(node, data)"
                      >编辑</el-button
                    >
                  </li>
                  <li>
                    <el-button type="text">添加子目录</el-button>
                  </li>
                  <li>
                    <el-button type="text" @click="handleLiDel(node, data)"
                      >删除</el-button
                    >
                  </li>
                </ul>
              </el-popover>
            </span>
          </div>
        </el-tree>
      </el-scrollbar>
    </div>
    <div class="attr">
      <div class="title">
        <b>属性</b>
      </div>
      <el-scrollbar :style="{ height: tableHeight }">
        <I3vAttrPanel></I3vAttrPanel>
      </el-scrollbar>
    </div>

    <!-- 添加目录dialog -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="600px"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div>
        <el-form :model="form">
          <el-form-item prop="id" v-show="false"></el-form-item>
          <el-form-item
            prop="name"
            label="目录"
            :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]"
          >
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-form>
        <I3vAttrPanel></I3vAttrPanel>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
const TREE_DATA = [];
const TREE_LEVEL = 10;
let globalId = 2000;
function loopData(parent, currentLevel = 1) {
  // console.log('currentLevel :>> ', currentLevel);
  // console.log("TREE_LEVEL :>> ", TREE_LEVEL);
  if (currentLevel > TREE_LEVEL) {
    return;
  }
  for (let i = 1; i <= TREE_LEVEL; i++) {
    parent.children.push({
      id: `${parent.id}-${i}`,
      label: `${parent.id}-${i}`,
      children: [],
    });
  }
  parent.children.forEach((_) => {
    loopData(_, ++currentLevel);
  });
}
loopData({ id: `${globalId}`, label: `${globalId}`, children: TREE_DATA }, 1);
console.log("TREE_DATA :>> ", TREE_DATA);
export default {
  name: "I3vProjectDirectory",
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      tableHeight: 0,
      dialogVisible: false,
      form: {
        id: "",
        name: "",
      },
      previousNodeId: "",
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
    this.treeData = TREE_DATA;
  },
  mounted() {
    this.handleSetTableHeight();
    window.addEventListener("resize", this.handleSetTableHeight);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleSetTableHeight);
  },
  methods: {
    handleAdd() {
      this.dialogVisible = true;
    },
    handlePopShow(data) {
      // 关闭上一个节点的popover
      if (this.previousNodeId) {
        const preRefName = `popRef${this.previousNodeId}`;
        this.$refs[preRefName] && this.$refs[preRefName].doClose();
      }
      this.previousNodeId = data.id;
    },
    handleLiDel() {
      this.$confirm(`此操作将删除该目录, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleLiEdit() {
      this.dialogVisible = true;
    },
    handleSetTableHeight() {
      this.tableHeight = `calc(100% - 34px)`;
    },
    handleNodeClick(data) {
      console.log(data);
      if (this.previousNodeId !== data.id) {
        const preRefName = `popRef${this.previousNodeId}`;
        this.$refs[preRefName] && this.$refs[preRefName].doClose();
      }
    },
  },
};
</script>
<style lang="scss">
.i3v-project-directory {
  display: flex;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  padding: 20px;
  .dir {
    flex: 1;
    border: 1px solid #eeeeee;
    margin-right: 10px;
  }
  .attr {
    flex: 1;
    border: 1px solid #eeeeee;
    margin-left: 10px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    padding: 6px;
    border-bottom: 1px solid #eeeeee;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;

    .-left-flex {
      display: flex;
      align-items: center;
    }
  }
}
.project-folder-tree-pop {
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
</style>
