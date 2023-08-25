<template>
  <div class="i3v-file-attribute-panel">
    <div class="attribute-wrapper" ref="attributeWrapper">
      <div class="attr-item">
        <div class="attr-item-label"><span>文件来源</span></div>
        <div class="attr-item-label-value">
          <span>E:\gitee\fileattr</span>
        </div>
      </div>
      <div class="attr-item">
        <div class="attr-item-label">目录类型</div>
        <div class="attr-item-label-value">
          三十三招车二平七的出手你恐怕就暗箭难防
        </div>
      </div>
      <div class="attr-item">
        <div class="attr-item-label">专业分类</div>
        <div class="attr-item-label-value">
          三十三招车二平七的出手你恐怕就暗箭难防
        </div>
      </div>
      <div class="attr-item">
        <div class="attr-item-label">文件大小</div>
        <div class="attr-item-label-value">1234.56MB</div>
      </div>
      <div class="attr-item">
        <div class="attr-item-label">更新时间</div>
        <div class="attr-item-label-value">updateTime</div>
      </div>
      <div class="attr-item">
        <div class="attr-item-label">更新人</div>
        <div class="attr-item-label-value">updateBy</div>
      </div>
      <div class="attr-item">
        <div class="attr-item-label">创建时间</div>
        <div class="attr-item-label-value">createTime</div>
      </div>
      <div class="attr-item">
        <div class="attr-item-label">创建人</div>
        <div class="attr-item-label-value">createBy</div>
      </div>
      <div class="attr-item">
        <div class="attr-item-label">权限</div>
        <div class="attr-item-label-value">
          <i class="el-icon-setting"></i>
        </div>
      </div>
      <template>
        <div
          v-for="item in attributeDetail.fsDictQueryVOList"
          class="attr-item"
          :key="item.dictId"
        >
          <div class="attr-item-label">dictName</div>
          <div
            class="attr-item-label-value"
            :class="{ 'custom-attribute': item.dictType === 2 }"
          >
            <template>
              <el-select
                v-model="item.itemTextId"
                placeholder="请选择"
                size="mini"
                style="width: 140px"
              >
                <el-option
                  v-for="site in item.detailDTOList"
                  :key="site.id"
                  :label="site.itemText"
                  :value="site.id"
                ></el-option>
              </el-select>
              <span class="descr">description</span>
            </template>
            <template>
              <span>1234</span>
            </template>
            <template>
              <i class="el-icon-edit attr-action attr-edit" title="编辑"></i>
              <i class="el-icon-delete attr-action" title="删除"></i>
            </template>
          </div>
        </div>
      </template>
      <div class="attr-item">
        <div class="attr-item-label pointer">+自定义属性</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'I3vAttrPanel',
  data() {
    return {
      attributeDetail: {
        fsDictQueryVOList: [],
      },
    }
  }
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
</style>
