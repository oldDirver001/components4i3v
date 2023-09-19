<template>
  <div class="i3v-file-attribute__wrapper">
    <div class="i3v-file-attribute-file-disk">
      <div class="right-close">
        <!-- <svg-icon icon="close"></svg-icon> -->
      </div>
      <el-tabs v-model="activeTab">
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
        <el-tab-pane label="关联" name="rela">
          <el-table
            header-cell-class-name="app-header-cell"
            :data="associateList"
          >
            <el-table-column
              label="名称"
              prop="eventName"
              min-width="180"
            ></el-table-column>
            <el-table-column
              label="类型"
              prop="eventType"
              min-width="180"
            ></el-table-column>
            <el-table-column
              label="负责人"
              prop="responsibleBy"
              min-width="180"
            ></el-table-column>
            <el-table-column
              label="状态"
              prop="status"
              min-width="180"
            ></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="操作日志" name="log">
          <div
            v-for="(item, index) in operationLog"
            class="log-item"
            :key="index"
          >
            <span class="log-item__value">{{ item.optContent }}</span>
            <div class="log-item__user">
              <el-avatar icon="el-icon-user-solid" :size="24"></el-avatar>
              <span style="padding-left: 12px">{{
                item.createBy.realName || item.createBy.userName
              }}</span>
            </div>
            <div class="log-item__date">{{ item.createTime }}</div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import I3vAttrPanel from "./attr-panel.vue";

export default {
  name: "I3vFileAttribute",
  components: { I3vAttrPanel },
  data() {
    return {
      activeTab: "attribute",
      associateList: [],
      detailDTOList: [],
      attributeDetail: {
        fsDictQueryVOList: [],
        filePosition: "",
        folderPosition: "",
        fileSize: "",
        folderSize: "",
        updateTime: "",
        updateBy: "",
        createTime: "",
        createBy: "",
      },
      // 选中的文件/文件夹
      currentItem: {
        createTime: "",
      },
      operationLog: [],
      isPreview: false,
      dialogVisible: false,
      innerVisible: false,
      customAttribute: {
        dictId: "",
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
      // 属性的分类里默认不能删除的选中项,因为文件和文件夹一定要属于某个二级分类,但是不能明确上传时的二级分类是哪个
      // 目前规则是(后续可能会修改)：1、选中二级分类时,不能删除当前二级分类 2、选中全部时,文件属性里第一个选中的二级分类不能删除
      defaultSelect: [],
    };
  },
  computed: {
    // 未删除的值列表
    attributeFilterList() {
      return this.attributeList.filter((item) => item.delFlag !== 1);
    },
  },
  methods: {
    handleAddAttribute(value) {
      this.$emit("add-attribute", value);
    },
    handleEditAttribute(value) {
      this.$emit("edit-attribute", value);
    },
    handleDelAttribute(value) {
      this.$emit("delete-attribute", value);
    },
    handleUpdateAttribute(value) {
      this.$emit("update-dictItem", value);
    },
    handleChangeCategory(value) {
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
     * @description: 外部通过ref调用此方法给 attributeDetail 赋值 别删了
     * @return {void}
     */
    setAttributeDetail(value) {
      this.$refs.I3vAttrPanel.setAttributeDetail(value)
    },
    /**
     * @description: 外部通过ref调用此方法给 attributeDetail 赋值 别删了
     * @return {void}
     */
    setCategoryTree(value) {
      this.$refs.I3vAttrPanel.setCategoryTree(value)
    },
  },
};
</script>
<style lang="scss">
.i3v-file-attribute__wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: auto;

  ::v-deep .el-button {
    border-radius: 5px;
  }

  .i3v-file-attribute-file-disk {
    box-sizing: border-box;
    flex: 1;
    min-width: 400px;
    border-radius: 5px 5px 0 0;
    background-color: #fff;
    position: relative;

    .right-close {
      position: absolute;
      z-index: 1;
      top: 30px;
      right: 30px;
      width: 20px;
      height: 20px;
      cursor: pointer;

      &:hover {
        .svg-icon {
          color: #1664ff !important;
        }
      }
    }

    ::v-deep .el-tabs {
      height: 100%;
      display: flex;
      flex-direction: column;

      .el-tabs__content {
        flex: 1;

        .el-tab-pane {
          height: 100%;
          overflow: auto;
        }
      }
    }

    .attribute-wrapper {
      height: 70%;
      overflow: auto;

      .attr-item {
        font-size: 14px;
        display: flex;
        border-top: 1px solid #f7f7f7;
        border-bottom: 1px solid #f7f7f7;

        .attr-item-label {
          flex-shrink: 0;
          box-sizing: border-box;
          width: 100px;
          min-height: 32px;
          padding: 6px 8px;
          text-align: center;
          background-color: #f2f2f2;

          > span {
            line-height: 20px;
            word-break: break-all;
          }
        }

        .attr-item-label-value {
          box-sizing: border-box;
          width: calc(100% - 100px);
          min-height: 32px;
          padding: 0 6px;
          background-color: #fff;
          display: flex;
          align-items: center;
          position: relative;

          &.custom-attribute {
            padding-right: 34px;
          }

          > span {
            word-break: break-all;
          }

          &:hover {
            .attr-action {
              display: block;
            }
          }

          .descr {
            padding-left: 6px;
            color: #c0c4cc;
          }

          .attr-action {
            display: none;
            position: absolute;
            top: calc(50% - 8px);
            right: 6px;
            font-size: 16px;
            cursor: pointer;

            &.attr-edit {
              right: 28px;
            }
          }
        }
      }
    }

    .associate-wrapper {
      height: 30%;
      overflow: auto;
    }

    .log-item {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 500;
      color: #ababab;
      padding-right: 16px;
      padding-bottom: 28px;
      margin-bottom: 12px;
      position: relative;

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
}
.fileattr-dialog-content {
  padding: 0 30px;

  .attr-value {
    display: flex;
    align-items: center;
  }
}

.inner-dialog-content {
  padding: 20px 30px;
  display: flex;

  .attr-list {
    box-sizing: border-box;
    width: 240px;
    height: 240px;
    padding: 8px;
    border: 1px solid #f7f7f7;
    overflow-y: auto;

    .attr-list-row {
      display: flex;
      border-radius: 5px;
      font-size: 14px;
      font-weight: 500;
      color: #344563;

      &.is-active {
        color: #fff;
        background-color: #1664ff;
      }

      .attr-list-item {
        box-sizing: border-box;
        width: 50%;
        padding: 6px 8px;

        > span {
          line-height: 20px;
          word-break: break-all;
        }

        &.border-right {
          border-right: 1px solid #f7f7f7;
        }
      }
    }
  }

  .attr-button {
    margin-left: 24px;
    display: flex;
    flex-direction: column;

    .el-button {
      margin-bottom: 8px;
    }

    .el-button + .el-button {
      margin-left: 0;
    }
  }
}
</style>

<style lang="scss">
@mixin popover($min-width: 80px) {
  box-sizing: border-box;
  min-width: $min-width !important;
  padding: 10px 8px !important;
  border-radius: 5px;
  border: 1px solid #d3dae6;
  box-shadow: 0px 0px 5px 2px rgba(94, 108, 132, 0.2);
}

@mixin popover-item {
  height: 32px;
  line-height: 32px;
  padding: 0 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #344563;
  text-align: center;

  &.disabled {
    color: #abb4c4;
    cursor: not-allowed;
  }

  &:not(.del):not(.disabled):hover {
    color: #fff;
    background-color: #1664ff;
  }

  &.del:hover {
    color: #ff5733;
  }
}
.category-popover {
  @include popover(96px);
  width: fit-content !important;
}

.category-popover-item {
  @include popover-item;
  box-sizing: border-box;
  text-align: left;
  padding: 0 12px;
  font-size: 14px;
  cursor: pointer;
}
</style>
<style lang="scss">
.ss-dialog .el-dialog {
  border-radius: 10px;
}

.ss-dialog .el-dialog .el-dialog__header {
  box-sizing: content-box;
  height: 24px;
  padding: 28px 0 21px;
  margin: 0 30px 0 30px;
  border-bottom: 1px solid #e6ebf2;
}

.ss-dialog.no-header-bottom .el-dialog .el-dialog__header {
  border-bottom-color: #fff;
}

.ss-dialog.no-header .el-dialog .el-dialog__header {
  display: none;
}

.ss-dialog .el-dialog .el-dialog__header .el-dialog__title {
  line-height: 24px;
  font-size: 18px;
  font-weight: 500;
  color: #344563;
}

.ss-dialog .el-dialog .el-dialog__header .el-dialog__headerbtn {
  top: 30px;
  right: 30px;
  font-size: 20px;
}

.ss-dialog .el-dialog .el-dialog__header .el-dialog__headerbtn i {
  display: block;
}

.ss-dialog .el-dialog .el-dialog__body {
  padding: 0;
}

.ss-dialog .el-dialog .el-dialog__footer {
  min-height: 90px;
  padding: 26px 30px 24px;
  background-color: #f5f7fa;
  border-radius: 0 0 10px 10px;
}
</style>