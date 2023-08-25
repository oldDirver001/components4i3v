/*
 * @Author: xiongdaoqi
 * @Date: 2023-08-23 11:33:54
 * @LastEditors: xiongdaoqi
 * @LastEditTime: 2023-08-23 15:14:23
 * @Description: 请输入
 */
import ProjectDirectory from './src/main';

ProjectDirectory.install = function(Vue) {
  Vue.component(ProjectDirectory.name, ProjectDirectory);
};

export default ProjectDirectory;
