<template>
  <div class="i3v-add-attr-panel">
    <el-dialog
      append-to-body
      custom-class="add-attr-dialog"
      title="添加自定义属性"
      width="480px"
      :visible.sync="dialogVisible"
      @close="handleDialogClose"
    >
      <el-form
        class="add-attr-form"
        :model="customAttribute"
        ref="addAttrForm"
        size="large"
      >
        <el-form-item
          prop="dictName"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <el-input
            v-model="customAttribute.dictName"
            placeholder="属性名称"
          ></el-input>
          <i class="el-icon-plus" @click.prevent="addDomain"></i>
        </el-form-item>
        <el-form-item
          v-for="(domain, index) in customAttribute.detailDTOS"
          :key="index"
          :prop="'detailDTOS.' + index + '.itemText'"
          :rules="{
            required: true,
            message: '不能为空',
            trigger: 'blur',
          }"
        >
          <el-input v-model="domain.itemText" placeholder="值"></el-input>
          <el-input v-model="domain.description" placeholder="描述"></el-input>
          <i
            class="el-icon-close"
            @click.prevent="removeDomain(domain, index)"
          ></i>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="submitForm('addAttrForm')"
            >提交</el-button
          >
          <el-button @click="addDomain">新增域名</el-button>
          <el-button @click="resetForm('addAttrForm')">重置</el-button>
        </el-form-item> -->
      </el-form>
      <div slot="footer" style="text-align: center">
        <el-button type="info" @click="dialogVisible = false" size="large"
          >取&nbsp;&nbsp;消</el-button
        >
        <el-button
          type="primary"
          @click="submitForm('addAttrForm')"
          size="large"
          >确&nbsp;&nbsp;定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { cloneDeep } from "lodash";

export default {
  name: "I3vAddAttrPanel",
  data() {
    return {
      dialogVisible: false,
      customAttribute: {
        dictName: "", // 属性名称
        detailDTOS: [], // 值列表
      }, // 自定义属性
      delList: [],
    };
  },
  methods: {
    editFormDefData(value) {
      console.log("value :>> ", value);
      let obj = {};
      if (value) {
        obj = cloneDeep(value);
        obj.detailDTOS = obj.detailDTOList || [];
      } else {
        obj = {
          dictName: "",
          detailDTOS: [],
        };
      }
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.customAttribute = obj;
      });
    },
    submitForm(formName) {
      console.log("this.customAttribute :>> ", this.customAttribute);
      if (this.customAttribute.detailDTOS.length === 0) {
        this.$message.error("请添加属性");
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = {
            dataId: this.customAttribute.dataId,
            detailDTOS: [],
            dictItemType: 0,
            dictName: this.customAttribute.dictName,
            dictType: 2,
            dictUseType: 2,
            id: this.customAttribute.id,
            dictId: this.customAttribute.dictId,
          };
          if (this.customAttribute.detailDTOS.length > 1) {
            const domains = this.customAttribute.detailDTOS;
            // 固定值
            param.dictItemType = 2;
            param.detailDTOS = cloneDeep(domains);
          } else if (this.customAttribute.detailDTOS.length === 1) {
            // 自由输入
            const domains = this.customAttribute.detailDTOS;
            domains[0].isSelected = 1;
            param.dictItemType = 1;
            param.detailDTOS = cloneDeep(domains);
          }
          // 把删除的数据补上
          if (this.delList.length > 0) {
            param.detailDTOS = param.detailDTOS.concat(this.delList);
          }
          if (!this.customAttribute.dictId) {
            this.$emit("add-attribute", param);
          } else {
            this.$emit("edit-attribute", param);
          }
          this.dialogVisible = false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item, index) {
      console.log("item :>> ", item);
      console.log("index :>> ", index);
      if (item.isSelected) {
        this.$message.error("当前属性已经被选中，无法删除");
        return;
      }
      if (item.id) {
        const _ = cloneDeep(item);
        _.delFlag = 1;
        this.delList.push(_);
        this.customAttribute.detailDTOS.splice(index, 1);
      } else {
        this.customAttribute.detailDTOS.splice(index, 1);
      }
      // var index = this.customAttribute.detailDTOS.indexOf(item);
      // if (index !== -1) {
      //   this.customAttribute.detailDTOS.splice(index, 1);
      // }
    },
    addDomain() {
      this.customAttribute.detailDTOS.push({
        id: "",
        itemText: "",
        description: "",
        dictType: 2,
        delFlag: 0,
      });
    },
    handleDialogClose() {
      this.resetForm("addAttrForm");
      this.delList = [];
      this.customAttribute = {
        dictName: "", // 属性名称
        detailDTOS: [], // 值列表
      }; // 自定义属性
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
.add-attr-dialog {
  .add-attr-form {
    .el-form-item__content {
      display: flex;
      align-items: center;
      i {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 46px;
        height: 46px;
        box-sizing: border-box;
        border: 1px solid rgba(197, 208, 227, 1);
        border-radius: 6px;
        cursor: pointer;
        margin-left: 16px;
      }
      .el-icon-plus:hover {
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
      }
      .el-icon-close:hover {
        color: #fff;
        background: rgba(255, 87, 51, 1);
        border-color: rgba(255, 87, 51, 1);
      }
      .el-input {
        flex: 1;
      }
      .el-input + .el-input {
        margin-left: 16px;
      }
      .el-input__inner {
        height: 46px;
        line-height: 46px;
      }
    }
  }
}
</style>
