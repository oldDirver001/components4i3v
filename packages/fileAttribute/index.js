/*
 * @Author: xiongdaoqi
 * @Date: 2023-08-23 11:33:54
 * @LastEditors: xiongdaoqi
 * @LastEditTime: 2023-08-23 15:14:23
 * @Description: 请输入
 */
import FileAttribute from './src/main';

FileAttribute.install = function(Vue) {
  Vue.component(FileAttribute.name, FileAttribute);
};

export default FileAttribute;
