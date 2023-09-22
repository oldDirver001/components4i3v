<template>
  <div class="i3v-file-attribute-panel">
    <div class="attribute-wrapper" ref="attributeWrapper">
      <div class="attribute-header">
        <div class="resize-box" ref="resizeBox">
          <div class="resize-box-cell one-line" ref="resizeLeft">名称</div>
          <div class="resize-box-div" ref="resizeDiv"></div>
          <div class="resize-box-cell-right">值</div>
        </div>
        <i
          v-if="attributeDetail.fileType === '2'"
          style="display: inline-block; margin: 0 20px; cursor: pointer"
          class="el-icon-plus"
          title="添加自定义属性"
          @click="showAttributeDialog(null)"
        ></i>
        <!-- <i
          style="display: inline-block; cursor: not-allowed"
          class="el-icon-s-tools"
          title="权限"
        ></i> -->
      </div>
      <div class="attribute-row">
        <span
          class="one-line"
          :style="`width: ${attributeLabelWidth}px;padding-left: 10px;`"
          >文件来源：</span
        >
        <span class="attribute-row__content">{{
          attributeDetail.filePosition || attributeDetail.folderPosition
        }}</span>
      </div>
      <template v-for="item in attributeDetail.fsDictQueryVOList">
        <div
          v-if="item.dictUseType === 1"
          class="file-attribute"
          :key="item.dictId"
        >
          <div
            class="file-attribute__label one-line"
            :style="`width: ${attributeLabelWidth}px;`"
          >
            {{ item.dictName }}：
          </div>
          <div class="file-attribute__content">
            <el-checkbox-group
              v-model="item.itemTextId"
              class="xs-checkbox-group"
              size="small"
              :disabled="isPreview"
              @change="changeCheckbox($event, item)"
            >
              <el-checkbox
                v-for="site in item.detailDTOList"
                border
                :key="site.id"
                :label="site.id"
                :disabled="
                  defaultSelect.includes(site.id) ||
                  disabledList.includes(site.id)
                "
                >{{ site.itemText }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
        </div>
        <div
          v-if="item.dictUseType === 2"
          class="attribute-row"
          :key="item.dictId"
          :class="{
            'attribute-row-2': item.dictItemType === 2,
            'custom-attribute': !isPreview && item.dictType === 2,
          }"
        >
          <span
            class="one-line"
            :style="`width: ${attributeLabelWidth}px;padding-left: 10px;`"
            >{{ item.dictName }}：</span
          >
          <span v-if="item.dictItemType === 1" class="attribute-row__content">{{
            item.itemText
          }}</span>
          <span v-if="item.dictItemType === 2" class="attribute-row__content">
            <el-select
              v-model="item.itemTextId"
              placeholder="请选择"
              popper-class="xs-select"
              size="small"
              style="width: 180px"
              :disabled="isPreview"
              @change="changeAttrValue($event, item)"
            >
              <el-option label="空值" value=""></el-option>
              <el-option
                v-for="site in item.detailDTOList"
                :key="site.id"
                :label="site.itemText"
                :value="site.id"
              ></el-option>
            </el-select>
            <span class="descr">{{ item.description }}</span>
          </span>
          <div
            v-if="!isPreview && item.dictType === 2"
            class="custom-attribute-icon"
          >
            <!-- <svg-icon
                  class="pointer"
                  icon="xs-icon-edit"
                  color="#8997b0"
                  style="margin-right: 16px"
                  @click.native="showAttributeDialog(item)"
                ></svg-icon>
                <svg-icon
                  class="pointer"
                  icon="xs-icon-delete"
                  color="#8997b0"
                  @click.native="deleteAttribute(item)"
                ></svg-icon> -->
            <i
              class="el-icon-edit-outline"
              style="display: inline-block; margin-right: 16px"
              @click="showAttributeDialog(item)"
            ></i>
            <i class="el-icon-delete" @click="deleteAttribute(item)"></i>
          </div>
        </div>
      </template>
      <div class="file-info">
        <div class="file-info-row">
          文件大小：{{ formatFileSize(attributeDetail.fileSize ||
                attributeDetail.folderSize) }}
        </div>
        <div class="file-info-item">
          更新时间：{{ attributeDetail.updateTime }}
        </div>
        <div class="file-info-item">
          更新人：{{ attributeDetail.updateBy }}
        </div>
        <div class="file-info-item">
          创建时间：{{ attributeDetail.createTime }}
        </div>
        <div class="file-info-item">
          创建人：{{ attributeDetail.createBy }}
        </div>
      </div>
    </div>
    <AddAttrPanel
      ref="AddAttrPanel"
      @add-attribute="handleAddAttrbute"
      @edit-attribute="handleEditAttrbute"
    ></AddAttrPanel>
  </div>
</template>
<script>
import { cloneDeep } from "lodash";
import AddAttrPanel from "./add-attr-panel.vue";

export default {
  name: "I3vAttrPanel",
  components: { AddAttrPanel },
  data() {
    return {
      options: [],
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
        fileType: '1', // 1是文件，2是文件夹
      },
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
      attributeLabelWidth: 76, // 属性名称的宽度
      disabledList: [], // 不能选择的二级分类id
    };
  },
  computed: {
    // 未删除的值列表
    attributeFilterList() {
      return this.attributeList.filter((item) => item.delFlag !== 1);
    },
  },
  methods: {
    /**
     * @description: 拖动改变属性名称的宽度
     * @return {void}
     */
    setResize() {
      let leftDiv = this.$refs.resizeLeft;
      const resizeDom = this.$refs.resizeDiv;
      resizeDom.onmousedown = (e) => {
        let startX = e.clientX;
        const resizeLeft = leftDiv.offsetWidth;
        const maxWidth = this.$refs.resizeBox.offsetWidth;
        document.onmousemove = (e) => {
          const endX = e.clientX;
          let offsetWidth = endX - startX + resizeLeft;
          if (offsetWidth < 30) {
            offsetWidth = 30;
          }
          if (offsetWidth > maxWidth - 60) {
            offsetWidth = maxWidth - 60;
          }
          leftDiv.style.width = `${offsetWidth}px`;
          this.attributeLabelWidth = offsetWidth;
        };
        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
        return false;
      };
    },
    /**
     * @description: 修改文件/文件夹分类
     * @param {Array} ids 选择的分类
     * @param {Object} value 一级分类
     * @return {void}
     */
    async changeCheckbox(ids, value) {
      const payload = {
        dataId: '',
        dictId: value.dictId,
        dictItemIds: ids,
      };
      this.$emit("change-category", payload);
    },
    setCategoryTree(value) {
      this.options = value;
    },
    /**
     * @description: 外部通过ref调用此方法给 attributeDetail 赋值
     * @return {void}
     */
    setAttributeDetail(value) {
      if (value && value.id && value.fsDictQueryVOList) {
        value.fsDictQueryVOList.forEach((element) => {
          element.disabled = false;
          const selected = element.detailDTOList
            ? element.detailDTOList.filter((item) => item.isSelected)
            : [];
          if (this.defaultSelect.length === 0 && selected.length) {
            this.defaultSelect.push(selected[0].id);
          }
          if (element.dictItemType === 1) {
            element.itemText = selected.length ? selected[0].itemText : "";
            element.description = selected.length
              ? selected[0].description
              : "";
          } else if (element.dictItemType === 2) {
            element.itemTextId = selected.length ? selected[0].id : "";
            element.description = selected.length
              ? selected[0].description
              : "";
          } else {
            element.itemTextId = [];
            selected.forEach((item) => element.itemTextId.push(item.id));
          }
        });
        this.attributeDetail = value;
      } else {
        this.attributeDetail = {
          fsDictQueryVOList: [],
          filePosition: "",
          folderPosition: "",
          fileSize: "",
          folderSize: "",
          updateTime: "",
          updateBy: "",
          createTime: "",
          createBy: "",
          fileType: '1', // 1是文件，2是文件夹
        };
      }
      this.setResize();
    },
    handleAddAttrbute(value) {
      this.$emit("add-attribute", value);
    },
    handleEditAttrbute(value) {
      this.$emit("edit-attribute", value);
    },
    /**
     * @description: 自定义属性-固定值-选择文件属性值
     * @param {String} valueId 选择项
     * @return {void}
     */
    async changeAttrValue(valueId, attr) {
      const attribute = attr.detailDTOList.find((item) => item.id === valueId);
      attr.description = attribute.description;
      const payload = {
        dataId: "",
        dictId: attr.dictId,
        dictItemId: valueId,
      };
      const pre = attr.detailDTOList.find((item) => item.isSelected);
      attr.itemTextId = pre ? pre.id : "";
      attr.description = pre ? pre.description : "";
      this.$emit("update-dictItem", payload);
    },
    /**
     * @description: 删除属性
     * @param {Object} value 属性
     * @return {void}
     */
    deleteAttribute(value) {
      this.$emit("delete-attribute", value);
    },
    /**
     * @description: 选择属性列表的属性
     * @param {Object} value 选择项
     * @return {void}
     */
    selectAttr(value) {
      if (this.currentAttr && this.currentAttr.id === value.id) {
        this.currentAttr = null;
      } else {
        this.currentAttr = value;
      }
    },
    /**
     * @description: 值类型发生变化
     * @param {String} value 选中值
     * @return {void}
     */
    changeValue() {
      this.customAttribute.itemText = "";
      this.customAttribute.description = "";
      this.customAttribute.detailDTOS = [];
      this.$nextTick(() => {
        this.$refs.customAttribute.clearValidate("dictItemType");
      });
    },
    /**
     * @description: 确定添加、修改属性
     * @return {void}
     */
    confirmUpdateAttr() {
      this.$refs.anAttr.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const param = cloneDeep(this.anAttr);
        if (param.id) {
          const index = this.attributeList.findIndex(
            (item) => item.id === param.id
          );
          this.$set(this.attributeList, index, param);
          this.currentAttr = { ...param };
        } else {
          param.id = `attr-${Date.now()}`;
          this.attributeList.push(param);
        }
        this.attrVisible = false;
      });
    },
    /**
     * @description: 清空 anAttr 这个表单的数据
     * @return {void}
     */
    handleAnAttrClose() {
      this.$refs.anAttr.resetFields();
    },
    /**
     * @description: 显示 添加、修改属性 弹窗
     * @return {void}
     */
    updateAnAttr(value) {
      if (value) {
        this.anAttr = { ...value };
      } else {
        this.anAttr = {
          id: "",
          isSelected: 0,
          itemText: "",
          description: "",
          delFlag: 0,
        };
      }
      this.attrVisible = true;
    },
    /**
     * @description: 确定属性列表
     * @return {void}
     */
    async confirmAttrList() {
      this.customAttribute.detailDTOS = this.attributeList;
      this.innerVisible = false;
    },
    /**
     * @description: 删除属性
     * @return {void}
     */
    deleteAnAttr() {
      if (this.currentAttr.isSelected) {
        return this.$message.warning("该值为当前属性选中值，无法删除");
      }
      const index = this.attributeList.findIndex(
        (item) => item.id === this.currentAttr.id
      );
      if (this.currentAttr.id.startsWith("attr-")) {
        this.attributeList.splice(index, 1);
      } else {
        this.$set(this.attributeList[index], "delFlag", 1);
      }
      this.currentAttr = null;
    },
    /**
     * @description: 显示 属性列表 弹窗
     * @return {void}
     */
    showInnerDialog() {
      this.attributeList = cloneDeep(this.customAttribute.detailDTOS);
      this.currentAttr = null;
      this.innerVisible = true;
    },
    /**
     * @description: 显示 自定义属性 弹窗
     * @return {void}
     */
    showAttributeDialog(value) {
      this.$refs.AddAttrPanel.editFormDefData(value);
      // this.$refs.AddAttrPanel.dialogVisible = true;
    },
    /**
     * @description: 格式化文件大小
     * @param {Number} size 文件大小
     * @return {String} 格式化后的文件大小
     */
    formatFileSize(size) {
      if (typeof size !== "number") {
        return "--";
      }
      if (size < 1024) {
        return size + "B";
      } else if (size >= 1024 && size < 1024 * 1024) {
        return Math.ceil((size / 1024) * 100) / 100 + "KB";
      } else if (size >= 1024 * 1024 && size < 1024 * 1024 * 1024) {
        return Math.ceil((size / 1024 / 1024) * 100) / 100 + "MB";
      } else {
        return Math.ceil((size / 1024 / 1024 / 1024) * 100) / 100 + "GB";
      }
    },
  },
};
</script>
<style lang="scss">
.attribute-header {
  width: 100%;
  height: 32px;
  border-radius: 5px 5px 0 0;
  margin-bottom: 16px;
  background-color: #fafbfc;
  display: flex;
  align-items: center;

  .resize-box {
    flex: 1;
    display: flex;
    align-items: center;

    .resize-box-cell {
      width: 76px;
      padding-left: 10px;
    }

    .resize-box-div {
      width: 2px;
      height: 12px;
      border-radius: 2px;
      background-color: #e6ebf2;
      cursor: col-resize;
    }

    .resize-box-cell-right {
      box-sizing: border-box;
      flex: 1;
      padding-left: 40px;
    }
  }
}
.attribute-wrapper {
  overflow: auto;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-regular);

  .attribute-row {
    line-height: 20px;
    border-radius: 5px;
    margin-bottom: 16px;
    display: flex;
    position: relative;

    &.custom-attribute {
      line-height: 32px;
      padding-right: 56px;

      &:hover {
        background-color: #fafbfc;

        .custom-attribute-icon {
          display: flex;
          align-items: center;
        }
      }

      .custom-attribute-icon {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        display: none;
      }
    }

    .attribute-row__content {
      flex: 1;
      word-break: break-all;

      .descr {
        padding-left: 16px;
        color: #9facc2;
      }
    }
  }

  .file-attribute {
    display: flex;

    .file-attribute__label {
      width: fit-content;
      line-height: 32px;
      padding-left: 10px;
    }

    .file-attribute__content {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;

      .xs-checkbox-group {
        .el-checkbox {
          margin: 0 16px 16px 0;
        }

        .el-checkbox.is-bordered {
          border-radius: 5px;
        }

        .el-checkbox.is-bordered + .el-checkbox.is-bordered {
          margin-left: 0;
        }
      }
    }
  }

  .file-info {
    box-sizing: border-box;
    padding: 20px;
    border-radius: 10px;
    background: #fafbfc;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;

    .file-info-row {
      width: 100%;
    }

    .file-info-item {
      width: 50%;
      margin-top: 12px;
      word-break: break-all;
    }
  }

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
</style>
