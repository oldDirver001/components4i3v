/*
 * @Author: xiongdaoqi
 * @Date: 2023-08-22 16:47:29
 * @LastEditors: xiongdaoqi
 * @LastEditTime: 2023-08-23 15:09:18
 * @Description: 请输入
 */
import Vue from "vue";
import App from "./App.vue";
import {
  Option,
  Select,
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Avatar,
} from "element-ui";

Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Avatar);


Vue.prototype.$ELEMENT = { size: 'small' };

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
