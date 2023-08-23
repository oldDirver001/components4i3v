<template>
  <div class="file-disk">
    <div class="right-close">
      <!-- <svg-icon icon="close"></svg-icon> -->
      <!-- <i class="el-icon-close"></i> -->
    </div>
    <el-tabs v-model="activeTab" @tab-click="attributeTabClick">
      <el-tab-pane label="属性" name="attribute">
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
                  <i
                    class="el-icon-edit attr-action attr-edit"
                    title="编辑"
                  ></i>
                  <i class="el-icon-delete attr-action" title="删除"></i>
                </template>
              </div>
            </div>
          </template>
          <div class="attr-item">
            <div class="attr-item-label pointer">+自定义属性</div>
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
</template>
<script>
export default {
  data() {
    return {
      activeTab: "attribute",
      associateList: [],
      detailDTOList: [],
      attributeDetail: {
        fsDictQueryVOList: [],
      },
      operationLog: [
        {
          optContent: "想当然而第六步是你最大的致命伤",
          createBy: {
            realName: "熊道齐",
          },
          createTime: "2023年8月23日09:12:34",
        },
        {
          optContent: "我按兵不动处于习惯凡事沉默的酝酿",
          createBy: {
            realName: "熊俊翔",
          },
          createTime: "2023-8-23 09:12:34",
        },
        {
          optContent: "当头炮纯粹出于我礼貌的开场",
          createBy: {
            realName: "周瑞",
          },
          createTime: "2023/8/23 09:12:34",
        },
      ],
    };
  },
  methods: {
    attributeTabClick(tab) {
      console.log("tab :>> ", tab);
    },
  },
};
</script>
<style lang="scss" scoped>
.file-disk {
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
</style>