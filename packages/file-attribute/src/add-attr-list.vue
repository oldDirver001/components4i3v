<template>
  <div class="i3v-add-attr-panel">
    <el-dialog
      append-to-body
      custom-class="add-attr-dialog"
      title="选择需要添加的属性"
      :visible.sync="dialogVisible"
      width="558px"
      :before-close="handleDialogClose"
    >
      <el-table
        ref="multipleTable"
        class="table-head-bg"
        :data="tableData"
        border
        @select="handleSelect"
        @select-all="handleSelectAll"
      >
        <el-table-column type="selection" width="40"> </el-table-column>
        <el-table-column prop="dictName" label="名称" width="120">
        </el-table-column>
        <el-table-column
          prop="value"
          label="值"
          width="120"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="text" :title="scope.row.value">{{
              scope.row.value
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="描述">
          <template slot-scope="scope">
            <div class="hide-btn__icon">
              <span class="text" :title="scope.row.address">{{
                scope.row.address
              }}</span>
              <div class="icon">
                <i class="el-icon-warning" title="可删除此未使用过的属性"></i>
                <i class="el-icon-close" @click="handleDel(scope.row)"></i>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" style="text-align: center">
        <el-button type="info" @click="handleDialogReset" size="large"
          >取&nbsp;&nbsp;消</el-button
        >
        <el-button type="primary" size="large" @click="handleAddAttr"
          >新增属性</el-button
        >
        <el-button type="primary" size="large" @click="handleConfirm"
          >确&nbsp;&nbsp;定</el-button
        >
      </div>
    </el-dialog>
    <!--  -->
    <AddAttrPanel
      ref="AddAttrPanel"
      @add-attribute="handleAddAttrbute"
      @edit-attribute="handleEditAttrbute"
    ></AddAttrPanel>
  </div>
</template>
<script>
import AddAttrPanel from "./add-attr-panel.vue";

export default {
  name: 'I3vAddAttrList',
  components: { AddAttrPanel },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      selection: [],
    };
  },
  methods: {
    handleConfirm() {
      this.$emit("dialog-confirm", this.selection);
      this.handleDialogReset();
    },
    handleSelect(selection) {
      this.selection = selection;
    },
    handleSelectAll(selection) {
      this.selection = selection;
    },
    handleAddAttr() {
      this.$refs.AddAttrPanel.editFormDefData(null);
    },
    setData(data) {
      data.forEach((_) => {
        _.value = _.detailDTOList.map((item) => item.itemText).join(",");
      });
      this.tableData = data;
    },
    handleAddAttrbute(value) {
      this.$emit("add-attribute", value);
    },
    handleEditAttrbute(value) {
      this.$emit("edit-attribute", value);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    handleDel(row) {
      this.$emit("delete-attribute", row);
    },
    handleDialogClose(done) {
      this.selection = [];
      this.tableData = [];
      this.$refs.multipleTable.clearSelection();
      done();
    },
    handleDialogReset() {
      this.selection = [];
      this.tableData = [];
      this.$refs.multipleTable.clearSelection();
      this.dialogVisible = false
    },
  },
};
</script>
