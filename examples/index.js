/*
 * @Author: xiongdaoqi
 * @Date: 2023-08-23 15:02:30
 * @LastEditors: xiongdaoqi
 * @LastEditTime: 2023-09-04 11:32:23
 * @Description: 请输入
 */
import '@/assets/scss/global.scss';

// 导入各个组件
import FileAttribute from "../packages/file-attribute/index.js";
import ProjectDirectory from "../packages/project-directory/index.js";
import I3vAttrPanel from "../packages/attr-panel/index.js";
import I3vAddAttrPanel from "../packages/add-attr-panel/index.js";
// 把组件保存到一个数组中
const components = [FileAttribute, ProjectDirectory, I3vAttrPanel, I3vAddAttrPanel];
// 定义 install 方法
const install = function (Vue) {
  if (install.installed) return;
  install.installed = true;
  // 遍历组件列表并注册全局组件
  components.map((component) => {
    Vue.component(component.name, component); //component.name 此处使用到组件vue文件中的 name 属性
  });
};
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export default {
  version: "1.0.15",
  // 导出的对象必须具备一个 install 方法
  install,
  // 组件列表
  FileAttribute,
  ProjectDirectory,
  I3vAttrPanel,
  I3vAddAttrPanel,
};
