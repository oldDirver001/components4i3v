<template>
  <div class="attribute-container">
    <div class="right-close"></div>
    <el-tabs v-model="activeTab" class="attribute-tabs">
      <el-tab-pane label="属性" name="attribute">
        <I3vAttrPanel
          ref="I3vAttrPanel"
          @add-attribute="handleAddAttribute"
          @edit-attribute="handleEditAttribute"
          @delete-attribute="handleDelAttribute"
          @update-dictItem="handleUpdateAttribute"
          @change-category="handleChangeCategory"
        ></I3vAttrPanel>
      </el-tab-pane>
      <el-tab-pane label="日志" name="log">
        <div v-for="item in operationLog" class="log-item" :key="item.id">
          <div class="log-item-top">
            <div class="log-item-top-left">
              <div class="log-item-top__avatar no-avatar">
                <span>{{ getFirstChat(item.createBy.realName || item.createBy.userName) }}</span>
              </div>
              <span class="log-item-top__name">{{
                item.createBy.realName || item.createBy.userName
              }}</span>
            </div>
            <span class="log-item-top__date">{{ item.createTime }}</span>
          </div>
          <span class="log-item-content">{{ item.optContent }}</span>
        </div>
      </el-tab-pane>
      <el-tab-pane label="关联" name="associate">
        <el-table
          header-cell-class-name="app-header-cell"
          :data="associateList"
          border
        >
          <el-table-column
            show-overflow-tooltip
            label="名称"
            prop="eventName"
            min-width="200"
          ></el-table-column>
          <el-table-column
            label="类型"
            prop="eventType"
            min-width="80"
          ></el-table-column>
          <el-table-column
            label="负责人"
            prop="responsibleBy"
            min-width="100"
          ></el-table-column>
          <el-table-column
            label="状态"
            prop="status"
            min-width="80"
          ></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import I3vAttrPanel from "./attr-panel.vue";

export default {
  name: "I3vFileAttribute",
  components: { I3vAttrPanel },
  data() {
    return {
      fileTableHeight: 400,
      uploadAccept: "", // 接受上传的文件类型
      uploadAction: "", // 上传的地址
      uploadData: {}, // 上传时附带的额外参数
      uploadHeaders: {}, // 设置上传的请求头部
      uploadTip: "", // 上传提示
      uploadPercent: 0, // 上传进度信息
      uploadFile: null, // 上传的文件
      progressVisible: false, // 上传进度弹窗
      breadcrumbList: [],
      tableData: [],
      tableLoading: true,
      pagingData: {},

      categoryDialogVisible: false, // 分类弹窗
      folderDialogVisible: false,
      uploadDialogVisible: false,
      updateFolderVisible: false,
      fileVersionVisible: false,
      updateFolderType: 1,
      clickItem: null,

      activeName: "first",
      computerBreadcrumb: [],
      computerTable: [],
      cloudTable: [],
      cloudTableLoading: false,
      flattenCloudTable: [],

      currentItem: {}, // 选中的文件/文件夹
      activeTab: "attribute",
      showAttribute: false,
      dialogVisible: false,
      customAttribute: {
        dataId: "", // 文件或文件夹id
        delFlag: 0,
        dictName: "", // 属性名称
        dictItemType: "", // 属性值类型（1：自由输入，2：固定值）
        itemText: "", // 值内容
        description: "",
        dictType: 2, // 属性类型（1：基础数据，2：定义）
        detailDTOS: [], // 值列表
      }, // 自定义属性
      rules: {
        dictName: {
          required: true,
          message: "请输入属性名称",
          trigger: ["change", "blur"],
        },
        dictItemType: {
          required: true,
          message: "请选择类型",
          trigger: ["change", "blur"],
        },
      },
      valueRule: {
        required: true,
        message: "请输入值",
        trigger: ["change", "blur"],
      },
      innerVisible: false,
      attributeList: [], // 属性值列表
      currentAttr: null, // 选中的属性

      attrVisible: false,
      anAttr: {
        delFlag: 0, // 删除标记(0.未删除，1.删除)
        id: "",
        isSelected: 0, // 是否选中(1:是，0：否)
        itemText: "",
        description: "",
      },
      anAttrRules: {
        itemText: {
          required: true,
          message: "请输入值",
          trigger: ["change", "blur"],
        },
      },
      attributeDetail: {}, // 属性详情
      operationLog: [], // 操作日志
      associateList: [],

      queryId: {
        moduleId: "",
        subjectId: "",
        subjectColumnId: "",
      },
      categoryLoading: true, // 分类区域 loading
      allItem: {
        children: [],
        countNum: null,
        dictName: "全部",
        dictType: 1,
        id: "all",
      },
      firstCategoryList: [], // 一级分类列表
      firstCategory: {}, // 选中的一级分类
      secondCategoryList: [], // 二级分类列表
      secondCategory: {}, // 选中的二级分类
      queryFile: {
        dictItemIds: "", // 二级分类id
        folderId: "",
        name: "",
        pageNo: 1,
        pageSize: 10,
      },
      fileList: [], // 文件列表
      // 属性的分类里默认不能删除的选中项,因为文件和文件夹一定要属于某个二级分类,但是不能明确上传时的二级分类是哪个
      // 目前规则是(后续可能会修改)：1、选中二级分类时,不能删除当前二级分类 2、选中全部时,文件属性里第一个选中的二级分类不能删除
      defaultSelect: [],
      disabledList: [], // 不能选择的二级分类id
      attributeLoading: false,
      attributeLabelWidth: 76, // 属性名称的宽度
      cloudTableHeight: 550,
    };
  },
  methods: {
    handleAddAttribute(value) {
      console.log("add-attribute :>> ", value);
      this.$emit("add-attribute", value);
    },
    handleEditAttribute(value) {
      console.log("edit-attribute :>> ", value);
      this.$emit("edit-attribute", value);
    },
    handleDelAttribute(value) {
      console.log("delete-attribute :>> ", value);
      this.$emit("delete-attribute", value);
    },
    handleUpdateAttribute(value) {
      console.log("update-dictItem :>> ", value);
      this.$emit("update-dictItem", value);
    },
    handleChangeCategory(value) {
      console.log("change-category :>> ", value);
      this.$emit("change-category", value);
    },
    /**
     * @description: 清空数据
     * @return {void}
     */
    handleClear() {
      this.setAttributeDetail();
      this.setLog();
      this.setAssociateList();
    },
    /**
     * @description: 外部通过ref调用此方法给 associateList 赋值
     * @param {Array} value 关联数据列表
     * @return {void}
     */
    setAssociateList(value) {
      if (value && value instanceof Array && value.length > 0) {
        this.associateList = value;
      } else {
        this.associateList = [];
      }
    },
    /**
     * @description: 外部通过ref调用此方法给 operationLog 赋值
     * @param {Array} value 日志数据列表
     * @return {void}
     */
    setLog(value) {
      if (value && value instanceof Array && value.length > 0) {
        this.operationLog = value;
      } else {
        this.operationLog = [];
      }
    },
    /**
     * @description: 外部通过ref调用此方法给 attributeDetail 赋值
     * @return {void}
     */
    setAttributeDetail(value) {
      this.$refs.I3vAttrPanel.setAttributeDetail(value);
    },
    /**
     * @description: 获取字符串的第一个字符
     * @param {String} str 字符串
     * @return {String} 第一个字符
     */
    getFirstChat(str) {
      if (typeof str !== "string") {
        return {};
      }
      return str.charAt(0);
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep .el-button {
  border-radius: 5px;
}

.attribute-container {
  box-sizing: border-box;
  flex: 1;
  min-width: 400px;
  padding: 20px;
  border-radius: 5px 5px 0 0;
  margin-left: 14px;
  background-color: #fff;
  position: relative;

  .right-close {
    position: absolute;
    z-index: 1;
    top: 30px;
    right: 30px;
    height: 20px;
    cursor: pointer;
    display: flex;
    flex-direction: row-reverse;

    i {
      &:hover {
        color: var(--color-primary) !important;
      }
    }
  }

  ::v-deep(.el-tabs) {
    height: 100%;
    display: flex;
    flex-direction: column;

    .el-tabs__nav-wrap::after {
      height: 0;
    }

    .el-tabs__content {
      flex: 1;

      .el-tab-pane {
        height: 100%;
        overflow: auto;
      }
    }
  }

  .associate-wrapper {
    height: 30%;
    overflow: auto;
  }

  .log-item {
    padding: 30px 0 28px;
    border-bottom: 1px solid #e6ebf2;

    &:last-child {
      border: none;
    }

    .log-item-top {
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .log-item-top-left {
        display: flex;
        align-items: center;

        .log-item-top__avatar {
          width: 16px;
          height: 16px;
          border-radius: 5px;

          &.no-avatar {
            font-size: 12px;
            font-weight: 400;
            color: #fff;
            line-height: 1;
            background-color: var(--color-primary);
            display: flex;
            align-items: center;
            justify-content: center;

            span {
              transform: scale(0.83);
            }
          }
        }

        .log-item-top__name {
          padding-left: 8px;
        }
      }

      .log-item-top__date {
        color: #cfd7e6;
      }
    }

    .log-item-content {
      padding-left: 24px;
      word-break: break-all;
    }

    .log-item__value {
      flex: 1;
      font-size: 14px;
      color: #666;
      word-break: break-all;
    }

    .log-item__user {
      display: flex;
      align-items: center;
      padding-left: 12px;
    }

    .log-item__date {
      position: absolute;
      right: 16px;
      bottom: 0;
    }
  }
}
</style>
<style>
.app-header-cell {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-regular);
  background-color: #f5f7fa !important;
}
</style>
