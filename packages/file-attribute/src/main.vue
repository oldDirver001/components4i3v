<template>
  <div class="i3v-file-attribute__wrapper">
    <div class="i3v-file-attribute-file-disk">
      <div class="right-close">
        <!-- <svg-icon icon="close"></svg-icon> -->
      </div>
      <el-tabs v-model="activeTab" @tab-click="attributeTabClick">
        <el-tab-pane label="属性" name="attribute">
          <div class="attribute-wrapper" ref="attributeWrapper">
            <div class="attr-item">
              <div class="attr-item-label"><span>文件来源</span></div>
              <div class="attr-item-label-value">
                <span>{{
                  attributeDetail.filePosition || attributeDetail.folderPosition
                }}</span>
              </div>
            </div>
            <template v-if="attributeDetail.fsDictQueryVOList">
              <div
                v-for="item in attributeDetail.fsDictQueryVOList"
                class="attr-item"
                :key="item.dictId"
              >
                <div class="attr-item-label">{{ item.dictName }}</div>
                <div
                  class="attr-item-label-value"
                  :class="{
                    'custom-attribute':
                      item.dictUseType === 2 && item.dictType === 2,
                  }"
                >
                  <template v-if="item.dictUseType === 1">
                    <el-select
                      v-model="item.itemTextId"
                      v-defaultSelect="[defaultSelect, item.itemTextId]"
                      multiple
                      placeholder="请选择"
                      size="mini"
                      style="width: 100%"
                      :disabled="isPreview"
                      @change="changeItemCategory($event, item)"
                    >
                      <el-option
                        v-for="site in item.detailDTOList"
                        :key="site.id"
                        :label="site.itemText"
                        :value="site.id"
                        :disabled="defaultSelect.includes(site.id)"
                      ></el-option>
                    </el-select>
                    <span class="descr">{{ item.description }}</span>
                  </template>
                  <template
                    v-if="item.dictUseType === 2 && item.dictItemType === 2"
                  >
                    <el-select
                      v-model="item.itemTextId"
                      placeholder="请选择"
                      size="mini"
                      style="width: 140px"
                      :disabled="isPreview"
                      @change="changeAttrValue($event, item)"
                    >
                      <el-option
                        v-for="site in item.detailDTOList"
                        :key="site.id"
                        :label="site.itemText"
                        :value="site.id"
                      ></el-option>
                    </el-select>
                    <span class="descr">{{ item.description }}</span>
                  </template>
                  <template
                    v-if="item.dictUseType === 2 && item.dictItemType === 1"
                  >
                    <span>{{ item.detailDTOList[0].itemText }}</span>
                  </template>
                  <template
                    v-if="
                      item.dictType === 2 &&
                      item.dictItemType !== 0 &&
                      !isPreview
                    "
                  >
                    <i
                      class="el-icon-edit attr-action attr-edit"
                      title="编辑"
                      @click="showAttributeDialog(item)"
                    ></i>
                    <i
                      class="el-icon-delete attr-action"
                      title="删除"
                      @click="deleteAttribute(item)"
                    ></i>
                  </template>
                </div>
              </div>
            </template>
            <div class="attr-item">
              <div class="attr-item-label">文件大小</div>
              <div class="attr-item-label-value">
                {{
                  formatFileSize(
                    attributeDetail.fileSize || attributeDetail.folderSize
                  )
                }}
              </div>
            </div>
            <div class="attr-item">
              <div class="attr-item-label">更新时间</div>
              <div class="attr-item-label-value">
                <!-- {{ Object.dayjs(attributeDetail.updateTime) }} -->
                {{ attributeDetail.updateTime }}
              </div>
            </div>
            <div class="attr-item">
              <div class="attr-item-label">更新人</div>
              <div class="attr-item-label-value">
                {{ attributeDetail.updateBy }}
              </div>
            </div>
            <div class="attr-item">
              <div class="attr-item-label">创建时间</div>
              <div class="attr-item-label-value">
                <!-- {{ Object.dayjs(attributeDetail.createTime) }} -->
                {{ attributeDetail.createTime }}
              </div>
            </div>
            <div class="attr-item">
              <div class="attr-item-label">创建人</div>
              <div class="attr-item-label-value">
                {{ attributeDetail.createBy }}
              </div>
            </div>
            <div class="attr-item">
              <div class="attr-item-label">权限</div>
              <div class="attr-item-label-value">
                <i class="el-icon-setting"></i>
              </div>
            </div>
            <div v-if="!isPreview" class="attr-item">
              <div
                class="attr-item-label pointer"
                @click="showAttributeDialog(null)"
              >
                +自定义属性
              </div>
            </div>
          </div>
          <div class="associate-wrapper" ref="associateWrapper">
            <span>关联</span>
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
          </div>
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
    <!-- 自定义属性 -->
    <el-dialog
      v-if="dialogVisible"
      append-to-body
      class="ss-dialog no-header-bottom"
      title="自定义属性"
      width="460px"
      :visible.sync="dialogVisible"
    >
      <div class="fileattr-dialog-content">
        <el-form
          label-width="100px"
          ref="customAttribute"
          :model="customAttribute"
          :rules="rules"
        >
          <el-form-item label="属性名称" prop="dictName">
            <el-input
              v-model.trim="customAttribute.dictName"
              placeholder="请输入属性名称"
              :maxlength="10"
            ></el-input>
          </el-form-item>
          <el-form-item label="值类型" prop="dictItemType">
            <el-select
              v-model="customAttribute.dictItemType"
              placeholder="请选择"
              style="width: 100%"
              :disabled="!!customAttribute.dictId"
              @change="changeValue"
            >
              <el-option label="自由输入" :value="1"></el-option>
              <el-option label="固定值" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="值" prop="itemText">
            <div class="attr-value">
              <el-input
                v-model.trim="customAttribute.itemText"
                :placeholder="
                  customAttribute.dictItemType
                    ? `请${
                        customAttribute.dictItemType === 1
                          ? '输入值'
                          : '点击右侧设置值列表'
                      }`
                    : '请选择值类型'
                "
                :disabled="customAttribute.dictItemType !== 1"
                :maxlength="10"
              ></el-input>
              <i
                v-if="customAttribute.dictItemType === 2"
                class="el-icon-more pointer"
                style="margin-left: 16px"
                @click="showInnerDialog"
              ></i>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type="info" @click="dialogVisible = false"
          >取&nbsp;&nbsp;消</el-button
        >
        <el-button style="width: 110px" type="primary" @click="confirmAddAttr"
          >确&nbsp;&nbsp;定</el-button
        >
      </div>
      <el-dialog
        append-to-body
        class="ss-dialog"
        title="属性列表"
        width="460px"
        :visible.sync="innerVisible"
      >
        <div class="inner-dialog-content">
          <div class="attr-list">
            <div class="attr-list-row">
              <div class="attr-list-item border-right">值</div>
              <div class="attr-list-item">描述</div>
            </div>
            <div
              v-for="item in attributeFilterList"
              class="attr-list-row pointer"
              :key="item.id"
              :class="{
                'is-active': currentAttr && currentAttr.id === item.id,
              }"
              @click="selectAttr(item)"
            >
              <div class="attr-list-item">
                <span>{{ item.itemText }}</span>
              </div>
              <div class="attr-list-item">
                <span>{{ item.description }}</span>
              </div>
            </div>
          </div>
          <div class="attr-button">
            <el-button type="primary" @click="confirmAttrList">确定</el-button>
            <el-button type="info" @click="innerVisible = false"
              >取消</el-button
            >
            <el-button type="primary" @click="updateAnAttr(null)"
              >添加</el-button
            >
            <el-button
              type="primary"
              :disabled="currentAttr === null"
              @click="updateAnAttr(currentAttr)"
              >修改</el-button
            >
            <el-button
              type="primary"
              :disabled="currentAttr === null"
              @click="deleteAnAttr"
              >删除</el-button
            >
          </div>
        </div>
      </el-dialog>
    </el-dialog>
    <!-- 属性 -->
    <el-dialog
      append-to-body
      class="ss-dialog no-header-bottom"
      title="属性"
      width="400px"
      :visible.sync="attrVisible"
      @close="handleAnAttrClose"
    >
      <div style="padding: 0 30px">
        <el-form
          label-width="80px"
          ref="anAttr"
          :model="anAttr"
          :rules="anAttrRules"
        >
          <el-form-item label="值" prop="itemText">
            <el-input
              v-model.trim="anAttr.itemText"
              placeholder="请输入值"
              :maxlength="10"
            ></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input
              v-model.trim="anAttr.description"
              placeholder="请输入描述"
              :maxlength="10"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button type="info" @click="attrVisible = false"
          >取&nbsp;&nbsp;消</el-button
        >
        <el-button
          style="width: 110px"
          type="primary"
          @click="confirmUpdateAttr"
          >确&nbsp;&nbsp;定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { cloneDeep, pick } from "lodash";

export default {
  name: "I3vFileAttribute",
  data() {
    return {
      activeTab: "attribute",
      associateList: [],
      detailDTOList: [],
      attributeDetail: {
        fsDictQueryVOList: [],
        filePosition: "filePosition",
        folderPosition: "folderPosition",
        fileSize: "fileSize",
        folderSize: "folderSize",
        updateTime: "updateTime",
        updateBy: "updateBy",
        createTime: "createTime",
        createBy: "createBy",
      },
      // 选中的文件/文件夹
      currentItem: {
        createTime: "createTime",
      },
      operationLog: [],
      isPreview: false,
      dialogVisible: false,
      innerVisible: false,
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
    /**
     * @description: 清空 anAttr 这个表单的数据
     * @return {void}
     */
    handleAnAttrClose() {
      this.$refs.anAttr.resetFields();
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
    /**
     * @description: 删除属性
     * @param {Object} value 属性
     * @return {void}
     */
    deleteAttribute(value) {
      this.$emit("delete-attribute", value);
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
        };
      }
    },
    attributeTabClick(tab) {
      console.log("tab :>> ", tab);
    },
    /**
     * @description: 显示 自定义属性 弹窗
     * @return {void}
     */
    showAttributeDialog(value) {
      if (value) {
        let obj = pick(value, ["dictId", "dictName", "dictItemType"]);
        obj.dataId = this.currentItem.id;
        obj.itemText =
          value.dictItemType === 1 ? value.detailDTOList[0].itemText : "";
        obj.description = "";
        obj.detailDTOS = cloneDeep(value.detailDTOList);
        this.customAttribute = obj;
      } else {
        this.customAttribute = {
          dataId: this.currentItem.id,
          delFlag: 0,
          dictType: 2,
          dictId: "",
          dictName: "",
          dictItemType: "",
          itemText: "",
          description: "",
          detailDTOS: [],
        };
      }
      this.dialogVisible = true;
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
     * @description: 确定添加 自定义属性
     * @return {void}
     */
    confirmAddAttr() {
      this.$refs.customAttribute.validate(async (valid) => {
        if (!valid) {
          return;
        }
        if (
          this.customAttribute.dictItemType === 2 &&
          this.customAttribute.detailDTOS.length === 0
        ) {
          return this.$message.warning("值列表不能为空");
        }
        if (!this.customAttribute.dictId) {
          // 新增自定义属性
          let payload = {
            dataId: this.customAttribute.dataId,
            delFlag: 0,
            dictType: 2,
            dictName: this.customAttribute.dictName,
            dictItemType: this.customAttribute.dictItemType,
          };
          if (this.customAttribute.dictItemType === 1) {
            payload.detailDTOS = [
              {
                delFlag: 0,
                id: "",
                isSelected: 1,
                itemText: this.customAttribute.itemText,
                description: "",
              },
            ];
          } else {
            payload.detailDTOS = cloneDeep(this.customAttribute.detailDTOS);
            payload.detailDTOS.forEach((element) => {
              element.id.startsWith("attr-") && (element.id = "");
            });
          }
          this.$emit("add-attribute", payload);
        } else {
          // 编辑自定义属性
          let payload;
          if (this.customAttribute.dictItemType === 1) {
            payload = pick(this.customAttribute, [
              "dataId",
              "dictId",
              "dictName",
              "dictItemType",
            ]);
            payload.detailDTOS = cloneDeep(this.customAttribute.detailDTOS);
            payload.detailDTOS[0].itemText = this.customAttribute.itemText;
          } else {
            payload = pick(this.customAttribute, [
              "dataId",
              "dictId",
              "dictName",
              "dictItemType",
            ]);
            payload.detailDTOS = cloneDeep(this.customAttribute.detailDTOS);
            payload.detailDTOS.forEach((element) => {
              element.id.startsWith("attr-") && (element.id = "");
            });
          }
          this.$emit("edit-attribute", payload);
        }
        this.dialogVisible = false;
      });
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
     * @description: 确定添加、修改属性
     * @return {void}
     */
    confirmUpdateAttr() {
      this.$refs.anAttr.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const param = cloneDeep(this.anAttr)
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
     * @description: 自定义属性-固定值-选择文件属性值
     * @param {String} valueId 选择项
     * @return {void}
     */
    async changeAttrValue(valueId, attr) {
      const attribute = attr.detailDTOList.find((item) => item.id === valueId);
      attr.description = attribute.description;
      const payload = {
        dataId: this.currentItem.id,
        dictId: attr.dictId,
        dictItemId: valueId,
      };
      const pre = attr.detailDTOList.find((item) => item.isSelected);
      attr.itemTextId = pre ? pre.id : "";
      attr.description = pre ? pre.description : "";
      this.$emit("update-dictItem", payload);
    },
    /**
     * @description: 修改文件/文件夹分类
     * @return {void}
     */
    async changeItemCategory(ids, value) {
      const payload = {
        dataId: this.currentItem.id,
        dictId: value.dictId,
        dictItemIds: ids,
      };
      this.$emit("change-category", payload);
    },
  },
};
</script>
<style lang="scss">
.i3v-file-attribute__wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 18px 10px 0;
  display: flex;
  overflow-x: auto;

  ::v-deep .el-button {
    border-radius: 5px;
  }

  .i3v-file-attribute-file-disk {
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
.i3v-file-attribute__wrapper {
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
}
</style>