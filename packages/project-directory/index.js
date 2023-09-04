/*
 * @Author: xiongdaoqi
 * @Date: 2023-08-23 11:33:54
 * @LastEditors: xiongdaoqi
 * @LastEditTime: 2023-09-04 11:32:50
 * @Description: 请输入
 */
import ProjectDirectory from './src/main.vue';

ProjectDirectory.install = function(Vue) {
  Vue.component(ProjectDirectory.name, ProjectDirectory);
};

export default ProjectDirectory;
