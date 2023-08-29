import Vue from "vue";

Vue.directive("defaultSelect", {
  componentUpdated(el, bindings) {
    const [defaultValues, values] = bindings.value;

    let indexs = []; // 需要隐藏的标签索引
    values.forEach((i, index) => {
      defaultValues.includes(i) && indexs.push(index);
    })

    const dealStyle = function (tags) {
      if (values.length) {
        tags.forEach((el, index) => {
          if (indexs.includes(index) && ![...el.classList].includes('select-tag-close-none')) {
            el.classList.add('none')
          }
        })
      }
    }
    // 设置样式 隐藏close icon
    const tags = el.querySelectorAll('.el-tag__close')
    if (tags.length === 0) {
      // 初始化tags为空处理
      setTimeout(() => {
        const tagTemp = el.querySelectorAll('.el-tag__close')
        dealStyle(tagTemp)
      })
    } else {
      dealStyle(tags)
    }
  }
});
