<template>
  <div class="i3v-add-attr-panel">
    <!-- 自定义属性 start -->
    <el-dialog
      append-to-body
      class="ss-dialog no-header-bottom"
      title="自定义属性"
      width="460px"
      :visible.sync="dialogVisible"
      @close="handleClose"
    >
      <div class="dialog-content">
        <el-form
          label-width="100px"
          ref="customAttribute"
          :model="customAttribute"
          :rules="rules"
        >
          <el-form-item prop="dictId" v-show="false"></el-form-item>
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
    </el-dialog>
    <!-- 自定义属性 end -->
    <!-- 属性列表 start -->
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
          <el-button type="info" @click="innerVisible = false">取消</el-button>
          <el-button type="primary" @click="updateAnAttr(null)">添加</el-button>
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
    <!-- 属性列表 end -->
    <!-- 属性 start -->
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
    <!-- 属性 end -->
  </div>
</template>
<script>
import { cloneDeep, pick } from "lodash";

export default {
  name: "I3vAddAttrPanel",
  data() {
    return {
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
    };
  },
  computed: {
    // 未删除的值列表
    attributeFilterList() {
      return this.attributeList.filter((item) => item.delFlag !== 1);
    },
  },
  methods: {
    editFormDefData(value) {
      let obj = {};
      if (value) {
        obj = pick(value, ["id", "dictId", "dictName", "dictItemType"]);
        obj.dataId = "";
        obj.itemText =
          value.dictItemType === 1 ? value.detailDTOList[0].itemText : "";
        obj.description = "";
        obj.detailDTOS = cloneDeep(value.detailDTOList);
        // this.customAttribute = obj;
      } else {
        obj = {
          dataId: "",
          delFlag: 0,
          dictType: 2, // 1默认, 2自定义
          dictId: "",
          dictName: "",
          dictItemType: "",
          itemText: "",
          description: "",
          detailDTOS: [],
        };
      }
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.customAttribute = obj;
      });
    },
    showDialog() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.detailDTOS = [];
      this.$refs.customAttribute.resetFields();
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
     * @description: 显示 属性列表 弹窗
     * @return {void}
     */
    showInnerDialog() {
      this.attributeList = cloneDeep(this.customAttribute.detailDTOS);
      this.currentAttr = null;
      this.innerVisible = true;
    },
  },
};
</script>
<style lang="scss">
.dialog-content {
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
        background-color: var(--color-primary);
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
