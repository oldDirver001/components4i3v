import ScrollPanel from './src/main';

ScrollPanel.install = function(Vue) {
  Vue.component(ScrollPanel.name, ScrollPanel);
};

export default ScrollPanel;