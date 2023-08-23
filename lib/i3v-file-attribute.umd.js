(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["i3v-file-attribute"] = factory();
	else
		root["i3v-file-attribute"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ entry_lib; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./packages/fileAttribute/src/main.vue?vue&type=template&id=1ea5f7db&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "i3v-file-attribute-file-disk"
  }, [_c('div', {
    staticClass: "right-close"
  }), _c('el-tabs', {
    on: {
      "tab-click": _vm.attributeTabClick
    },
    model: {
      value: _vm.activeTab,
      callback: function ($$v) {
        _vm.activeTab = $$v;
      },
      expression: "activeTab"
    }
  }, [_c('el-tab-pane', {
    attrs: {
      "label": "属性",
      "name": "attribute"
    }
  }, [_c('div', {
    ref: "attributeWrapper",
    staticClass: "attribute-wrapper"
  }, [_c('div', {
    staticClass: "attr-item"
  }, [_c('div', {
    staticClass: "attr-item-label"
  }, [_c('span', [_vm._v("文件来源")])]), _c('div', {
    staticClass: "attr-item-label-value"
  }, [_c('span', [_vm._v("E:\\gitee\\fileattr")])])]), _c('div', {
    staticClass: "attr-item"
  }, [_c('div', {
    staticClass: "attr-item-label"
  }, [_vm._v("目录类型")]), _c('div', {
    staticClass: "attr-item-label-value"
  }, [_vm._v(" 三十三招车二平七的出手你恐怕就暗箭难防 ")])]), _c('div', {
    staticClass: "attr-item"
  }, [_c('div', {
    staticClass: "attr-item-label"
  }, [_vm._v("专业分类")]), _c('div', {
    staticClass: "attr-item-label-value"
  }, [_vm._v(" 三十三招车二平七的出手你恐怕就暗箭难防 ")])]), _c('div', {
    staticClass: "attr-item"
  }, [_c('div', {
    staticClass: "attr-item-label"
  }, [_vm._v("文件大小")]), _c('div', {
    staticClass: "attr-item-label-value"
  }, [_vm._v("1234.56MB")])]), _c('div', {
    staticClass: "attr-item"
  }, [_c('div', {
    staticClass: "attr-item-label"
  }, [_vm._v("更新时间")]), _c('div', {
    staticClass: "attr-item-label-value"
  }, [_vm._v("updateTime")])]), _c('div', {
    staticClass: "attr-item"
  }, [_c('div', {
    staticClass: "attr-item-label"
  }, [_vm._v("更新人")]), _c('div', {
    staticClass: "attr-item-label-value"
  }, [_vm._v("updateBy")])]), _c('div', {
    staticClass: "attr-item"
  }, [_c('div', {
    staticClass: "attr-item-label"
  }, [_vm._v("创建时间")]), _c('div', {
    staticClass: "attr-item-label-value"
  }, [_vm._v("createTime")])]), _c('div', {
    staticClass: "attr-item"
  }, [_c('div', {
    staticClass: "attr-item-label"
  }, [_vm._v("创建人")]), _c('div', {
    staticClass: "attr-item-label-value"
  }, [_vm._v("createBy")])]), _c('div', {
    staticClass: "attr-item"
  }, [_c('div', {
    staticClass: "attr-item-label"
  }, [_vm._v("权限")]), _c('div', {
    staticClass: "attr-item-label-value"
  }, [_c('i', {
    staticClass: "el-icon-setting"
  })])]), _vm._l(_vm.attributeDetail.fsDictQueryVOList, function (item) {
    return _c('div', {
      key: item.dictId,
      staticClass: "attr-item"
    }, [_c('div', {
      staticClass: "attr-item-label"
    }, [_vm._v("dictName")]), _c('div', {
      staticClass: "attr-item-label-value",
      class: {
        'custom-attribute': item.dictType === 2
      }
    }, [[_c('el-select', {
      staticStyle: {
        "width": "140px"
      },
      attrs: {
        "placeholder": "请选择",
        "size": "mini"
      },
      model: {
        value: item.itemTextId,
        callback: function ($$v) {
          _vm.$set(item, "itemTextId", $$v);
        },
        expression: "item.itemTextId"
      }
    }, _vm._l(item.detailDTOList, function (site) {
      return _c('el-option', {
        key: site.id,
        attrs: {
          "label": site.itemText,
          "value": site.id
        }
      });
    }), 1), _c('span', {
      staticClass: "descr"
    }, [_vm._v("description")])], [_c('span', [_vm._v("1234")])], [_c('i', {
      staticClass: "el-icon-edit attr-action attr-edit",
      attrs: {
        "title": "编辑"
      }
    }), _c('i', {
      staticClass: "el-icon-delete attr-action",
      attrs: {
        "title": "删除"
      }
    })]], 2)]);
  }), _c('div', {
    staticClass: "attr-item"
  }, [_c('div', {
    staticClass: "attr-item-label pointer"
  }, [_vm._v("+自定义属性")])])], 2), _c('div', {
    ref: "associateWrapper",
    staticClass: "associate-wrapper"
  }, [_c('span', [_vm._v("关联")]), _c('el-table', {
    attrs: {
      "header-cell-class-name": "app-header-cell",
      "data": _vm.associateList
    }
  }, [_c('el-table-column', {
    attrs: {
      "label": "名称",
      "prop": "eventName",
      "min-width": "180"
    }
  }), _c('el-table-column', {
    attrs: {
      "label": "类型",
      "prop": "eventType",
      "min-width": "180"
    }
  }), _c('el-table-column', {
    attrs: {
      "label": "负责人",
      "prop": "responsibleBy",
      "min-width": "180"
    }
  }), _c('el-table-column', {
    attrs: {
      "label": "状态",
      "prop": "status",
      "min-width": "180"
    }
  })], 1)], 1)]), _c('el-tab-pane', {
    attrs: {
      "label": "操作日志",
      "name": "log"
    }
  }, _vm._l(_vm.operationLog, function (item, index) {
    return _c('div', {
      key: index,
      staticClass: "log-item"
    }, [_c('span', {
      staticClass: "log-item__value"
    }, [_vm._v(_vm._s(item.optContent))]), _c('div', {
      staticClass: "log-item__user"
    }, [_c('el-avatar', {
      attrs: {
        "icon": "el-icon-user-solid",
        "size": 24
      }
    }), _c('span', {
      staticStyle: {
        "padding-left": "12px"
      }
    }, [_vm._v(_vm._s(item.createBy.realName || item.createBy.userName))])], 1), _c('div', {
      staticClass: "log-item__date"
    }, [_vm._v(_vm._s(item.createTime))])]);
  }), 0)], 1)], 1);
};
var staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./packages/fileAttribute/src/main.vue?vue&type=script&lang=js&
/* harmony default export */ var mainvue_type_script_lang_js_ = ({
  name: 'FileAttribute',
  data() {
    return {
      activeTab: "attribute",
      associateList: [],
      detailDTOList: [],
      attributeDetail: {
        fsDictQueryVOList: []
      },
      operationLog: [{
        optContent: "想当然而第六步是你最大的致命伤",
        createBy: {
          realName: "熊道齐"
        },
        createTime: "2023年8月23日09:12:34"
      }, {
        optContent: "我按兵不动处于习惯凡事沉默的酝酿",
        createBy: {
          realName: "熊俊翔"
        },
        createTime: "2023-8-23 09:12:34"
      }, {
        optContent: "当头炮纯粹出于我礼貌的开场",
        createBy: {
          realName: "周瑞"
        },
        createTime: "2023/8/23 09:12:34"
      }]
    };
  },
  methods: {
    attributeTabClick(tab) {
      console.log("tab :>> ", tab);
    }
  }
});
;// CONCATENATED MODULE: ./packages/fileAttribute/src/main.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_mainvue_type_script_lang_js_ = (mainvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-64.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-64.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-64.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-64.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./packages/fileAttribute/src/main.vue?vue&type=style&index=0&id=1ea5f7db&prod&lang=scss&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./packages/fileAttribute/src/main.vue?vue&type=style&index=0&id=1ea5f7db&prod&lang=scss&

;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

;// CONCATENATED MODULE: ./packages/fileAttribute/src/main.vue



;


/* normalize component */

var component = normalizeComponent(
  src_mainvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var main = (component.exports);
;// CONCATENATED MODULE: ./packages/fileAttribute/index.js
/*
 * @Author: xiongdaoqi
 * @Date: 2023-08-23 11:33:54
 * @LastEditors: xiongdaoqi
 * @LastEditTime: 2023-08-23 15:14:23
 * @Description: 请输入
 */

main.install = function (Vue) {
  Vue.component(main.name, main);
};
/* harmony default export */ var fileAttribute = (main);
;// CONCATENATED MODULE: ./examples/index.js
/*
 * @Author: xiongdaoqi
 * @Date: 2023-08-23 15:02:30
 * @LastEditors: xiongdaoqi
 * @LastEditTime: 2023-08-23 15:10:10
 * @Description: 请输入
 */
// 导入各个组件

// 把组件保存到一个数组中
const components = [fileAttribute];
// 定义 install 方法
const install = function (Vue) {
  if (install.installed) return;
  install.installed = true;
  // 遍历组件列表并注册全局组件
  components.map(component => {
    Vue.component(component.name, component); //component.name 此处使用到组件vue文件中的 name 属性
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
/* harmony default export */ var examples = ({
  // 导出的对象必须具备一个 install 方法
  install,
  // 组件列表
  FileAttribute: fileAttribute
});
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (examples);


/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=i3v-file-attribute.umd.js.map