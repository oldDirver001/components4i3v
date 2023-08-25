/*
 * @Author: xiongdaoqi
 * @Date: 2023-08-25 14:37:19
 * @LastEditors: xiongdaoqi
 * @LastEditTime: 2023-08-25 16:53:43
 * @Description: 请输入
 */
import TaskDirectory from './src/main';

TaskDirectory.install = function(Vue) {
  Vue.component(TaskDirectory.name, TaskDirectory);
};

export default TaskDirectory;