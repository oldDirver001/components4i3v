/*
 * @Author: xiongdaoqi
 * @Date: 2023-08-22 16:47:29
 * @LastEditors: xiongdaoqi
 * @LastEditTime: 2023-09-18 17:40:41
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
  Breadcrumb,
  BreadcrumbItem,
  Cascader,
  Checkbox,
  CheckboxGroup,
} from "element-ui";
import '@/assets/scss/global.scss';

import FileAttribute from "../packages/file-attribute/index";
import AttrPanel from "../packages/attr-panel/index";
import ScrollPanel from "../packages/scroll-panel/index";

// 自定义指令
import "@/directive/defaultSelect";

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
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Cascader);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);

Vue.use(FileAttribute);
Vue.use(AttrPanel);
Vue.use(ScrollPanel);

Vue.prototype.$ELEMENT = { size: 'small' };
Vue.prototype.$confirm = MessageBox.confirm;

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
