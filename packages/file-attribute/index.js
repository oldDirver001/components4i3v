/*
 * @Author: xiongdaoqi
 * @Date: 2023-08-23 11:33:54
 * @LastEditors: xiongdaoqi
 * @LastEditTime: 2023-09-04 11:32:05
 * @Description: 请输入
 */
import FileAttribute from './src/main.vue';

FileAttribute.install = function(Vue) {
  Vue.component(FileAttribute.name, FileAttribute);
};

export default FileAttribute;
