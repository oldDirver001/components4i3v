/*
 * @Author: xiongdaoqi
 * @Date: 2023-08-23 11:33:54
 * @LastEditors: xiongdaoqi
 * @LastEditTime: 2023-08-25 10:55:44
 * @Description: 请输入
 */
import AttrPanel from '../file-attribute/src/attr-panel.vue';

AttrPanel.install = function(Vue) {
  Vue.component(AttrPanel.name, AttrPanel);
};

export default AttrPanel;
