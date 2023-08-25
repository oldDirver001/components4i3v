/*
 * @Author: xiongdaoqi
 * @Date: 2023-08-22 16:47:29
 * @LastEditors: xiongdaoqi
 * @LastEditTime: 2023-08-25 17:06:34
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
  Scrollbar,
  Row,
  Col,
  Tree,
  Popover,
  Button,
  Dialog,
  Form,
  FormItem,
  Input,
  MessageBox,
  Container,
  Aside,
  Main,
} from "element-ui";

import FileAttribute from "../packages/file-attribute/index";
import AttrPanel from "../packages/attr-panel/index";
import ScrollPanel from "../packages/scroll-panel/index";

Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Avatar);
Vue.use(Scrollbar);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tree);
Vue.use(Popover);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Main);

Vue.use(FileAttribute);
Vue.use(AttrPanel);
Vue.use(ScrollPanel);

Vue.prototype.$ELEMENT = { size: 'small' };
Vue.prototype.$confirm = MessageBox.confirm;

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
