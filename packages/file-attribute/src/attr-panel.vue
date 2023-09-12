<template>
  <div class="i3v-file-attribute-panel">
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
              'custom-attribute': item.dictUseType === 2 && item.dictType === 2,
            }"
          >
            <!-- dictType 1默认, 2自定义 -->
            <!-- dictUseType 1分类, 2属性 -->
            <template v-if="item.dictUseType === 1">
              <!-- <el-select
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
              </el-select> -->
              <el-cascader
                v-model="item.itemTextId"
                style="width: 100%"
                :disabled="isPreview"
                :options="options"
                :props="{ multiple: true, checkStrictly: true }"
                clearable
                size="mini"
                @change="changeItemCategory($event, item)"
              ></el-cascader>
              <span class="descr">{{ item.description }}</span>
            </template>
            <!-- dictUseType 1分类, 2属性 -->
            <!-- dictItemType 1自由输入, 2固定值 -->
            <template v-if="item.dictUseType === 2 && item.dictItemType === 2">
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
            <!-- dictUseType 1分类, 2属性 -->
            <!-- dictItemType 1自由输入, 2固定值 -->
            <template v-if="item.dictUseType === 2 && item.dictItemType === 1">
              <span>{{ item.detailDTOList[0].itemText }}</span>
            </template>
            <!-- dictType 1默认, 2自定义 -->
            <template
              v-if="
                item.dictType === 2 && item.dictItemType !== 0 && !isPreview
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
        <div class="attr-item-label pointer" @click="showAttributeDialog(null)">
          +自定义属性
        </div>
      </div>
    </div>
    <!-- 自定义属性 -->
    <!-- <el-dialog
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
    </el-dialog> -->
    <!-- 属性 -->
    <!-- <el-dialog
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
    </el-dialog> -->
    <AddAttrPanel ref="AddAttrPanel" @add-attribute="handleAddAttrbute" @edit-attribute="handleEditAttrbute"></AddAttrPanel>
  </div>
</template>
<script>
import { cloneDeep, pick } from "lodash";
import AddAttrPanel from './add-attr-panel.vue';

export default {
  name: "I3vAttrPanel",
  components: { AddAttrPanel },
  data() {
    return {
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
                {
                  value: "fankui",
                  label: "反馈",
                },
                {
                  value: "xiaolv",
                  label: "效率",
                },
                {
                  value: "kekong",
                  label: "可控",
                },
              ],
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航",
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航",
                },
              ],
            },
          ],
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局",
                },
                {
                  value: "color",
                  label: "Color 色彩",
                },
                {
                  value: "typography",
                  label: "Typography 字体",
                },
                {
                  value: "icon",
                  label: "Icon 图标",
                },
                {
                  value: "button",
                  label: "Button 按钮",
                },
              ],
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框",
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框",
                },
                {
                  value: "input",
                  label: "Input 输入框",
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器",
                },
                {
                  value: "select",
                  label: "Select 选择器",
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器",
                },
                {
                  value: "switch",
                  label: "Switch 开关",
                },
                {
                  value: "slider",
                  label: "Slider 滑块",
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器",
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器",
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器",
                },
                {
                  value: "upload",
                  label: "Upload 上传",
                },
                {
                  value: "rate",
                  label: "Rate 评分",
                },
                {
                  value: "form",
                  label: "Form 表单",
                },
              ],
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格",
                },
                {
                  value: "tag",
                  label: "Tag 标签",
                },
                {
                  value: "progress",
                  label: "Progress 进度条",
                },
                {
                  value: "tree",
                  label: "Tree 树形控件",
                },
                {
                  value: "pagination",
                  label: "Pagination 分页",
                },
                {
                  value: "badge",
                  label: "Badge 标记",
                },
              ],
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告",
                },
                {
                  value: "loading",
                  label: "Loading 加载",
                },
                {
                  value: "message",
                  label: "Message 消息提示",
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框",
                },
                {
                  value: "notification",
                  label: "Notification 通知",
                },
              ],
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单",
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页",
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑",
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单",
                },
                {
                  value: "steps",
                  label: "Steps 步骤条",
                },
              ],
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框",
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示",
                },
                {
                  value: "popover",
                  label: "Popover 弹出框",
                },
                {
                  value: "card",
                  label: "Card 卡片",
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯",
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板",
                },
              ],
            },
          ],
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components",
            },
            {
              value: "sketch",
              label: "Sketch Templates",
            },
            {
              value: "jiaohu",
              label: "组件交互文档",
            },
          ],
        },
      ],
      attributeDetail: {
        fsDictQueryVOList: [
          {
            dictId: "1",
            dictName: "文件分类1",
            dictUseType: 1,
            dictType: 1,
            dictItemType: 1,
            itemTextId: "itemTextId",
            detailDTOList: [
              {
                dictId: "1-1",
                id: "1-1",
                itemText: "",
                description: "description",
              },
              {
                dictId: "1-2",
                id: "1-2",
                itemText: "",
                description: "description2",
              },
            ],
          },
          {
            dictId: "2",
            dictName: "dictName",
            dictUseType: 2,
            dictType: 2,
            dictItemType: 2,
            itemTextId: "itemTextId",
            detailDTOList: [
              { id: "2-1", itemText: "", description: "description" },
              { id: "2-2", itemText: "", description: "description2" },
            ],
          },
        ],
        filePosition: "filePosition",
        folderPosition: "folderPosition",
        fileSize: "fileSize",
        folderSize: "folderSize",
        updateTime: "updateTime",
        updateBy: "updateBy",
        createTime: "createTime",
        createBy: "createBy",
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
    };
  },
  computed: {
    // 未删除的值列表
    attributeFilterList() {
      return this.attributeList.filter((item) => item.delFlag !== 1);
    },
  },
  methods: {
    handleAddAttrbute(value) {
      console.log('add-attribute :>> ', value);
      this.$emit("add-attribute", value);
    },
    handleEditAttrbute(value) {
      console.log('edit-attribute :>> ', value);
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
     * @description: 修改文件/文件夹分类
     * @return {void}
     */
    async changeItemCategory(ids, value) {
      console.log("ids :>> ", ids);
      console.log("value :>> ", value);
      const payload = {
        dataId: "",
        dictId: value.dictId,
        dictItemIds: ids,
      };
      this.$emit("change-category", payload);
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
    /**
     * @description: 显示 自定义属性 弹窗
     * @return {void}
     */
    showAttributeDialog(value) {
      // if (value) {
      //   let obj = pick(value, ["id", "dictId", "dictName", "dictItemType"]);
      //   obj.dataId = "";
      //   obj.itemText =
      //     value.dictItemType === 1 ? value.detailDTOList[0].itemText : "";
      //   obj.description = "";
      //   obj.detailDTOS = cloneDeep(value.detailDTOList);
      //   this.customAttribute = obj;
      // } else {
      //   this.customAttribute = {
      //     dataId: "",
      //     delFlag: 0,
      //     dictType: 2, // 1默认, 2自定义
      //     dictId: "",
      //     dictName: "",
      //     dictItemType: "",
      //     itemText: "",
      //     description: "",
      //     detailDTOS: [],
      //   };
      // }
      // this.dialogVisible = true;
      this.$refs.AddAttrPanel.editFormDefData(value)
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
.fileattr-dialog-content {
  padding: 0 30px;

  .attr-value {
    display: flex;
    align-items: center;
  }
}
</style>
