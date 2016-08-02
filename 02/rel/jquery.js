(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.jQuery = factory());
}(this, function () { 'use strict';

  /**
   * Created by vajoy on 2016/8/2.
   */

  var class2type = {}; //在core.js中会被赋予各类型属性值

  var toString = class2type.toString; //等同于 Object.prototype.toString

  var getProto = Object.getPrototypeOf;

  var hasOwn = class2type.hasOwnProperty;

  var fnToString = hasOwn.toString; //等同于 Object.toString/Function.toString

  var ObjectFunctionString = fnToString.call(Object); //顶层Object构造函数字符串"function Object() { [native code] }"，用于判断 plainObj

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  var version = "0.0.1";
  var jQuery = function jQuery(selector, context) {

      return new jQuery.fn.init(selector, context);
  };
  jQuery.fn = jQuery.prototype = {
      jquery: version,
      constructor: jQuery,
      setBackground: function setBackground() {
          this[0].style.background = 'yellow';
          return this;
      },
      setColor: function setColor() {
          this[0].style.color = 'blue';
          return this;
      }
  };

  jQuery.extend = jQuery.fn.extend = function () {
      var options,
          name,
          src,
          copy,
          copyIsArray,
          clone,
          target = arguments[0] || {},
          i = 1,
          length = arguments.length,
          deep = false;

      if (typeof target === "boolean") {
          deep = target;

          target = arguments[i] || {};
          i++;
      }

      if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== "object" && !jQuery.isFunction(target)) {
          //修改点1
          target = {};
      }

      if (i === length) {
          target = this;
          i--;
      }

      for (; i < length; i++) {

          if ((options = arguments[i]) != null) {

              for (name in options) {
                  src = target[name];
                  copy = options[name];

                  if (target === copy) {
                      continue;
                  }

                  // Recurse if we're merging plain objects or arrays
                  if (deep && copy && (jQuery.isPlainObject(copy) || ( //修改点2
                  copyIsArray = jQuery.isArray(copy)))) {

                      if (copyIsArray) {
                          copyIsArray = false;
                          clone = src && jQuery.isArray(src) ? src : []; //修改点3
                      } else {
                          clone = src && jQuery.isPlainObject(src) ? src : {};
                      }

                      target[name] = jQuery.extend(deep, clone, copy);
                  } else if (copy !== undefined) {
                      target[name] = copy;
                  }
              }
          }
      }

      return target;
  };

  //新增修改点1
  "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ").forEach(function (name) {
      class2type["[object " + name + "]"] = name.toLowerCase();
  });

  //新增修改点2
  jQuery.extend({
      isArray: Array.isArray,
      isPlainObject: function isPlainObject(obj) {
          var proto, Ctor;

          // 明显的非对象判断，直接返回false
          if (!obj || toString.call(obj) !== "[object Object]") {
              return false;
          }

          proto = getProto(obj); //获取 prototype

          // 通过 Object.create( null ) 形式创建的 {} 是没有prototype的
          if (!proto) {
              return true;
          }

          // 简单对象的构造函数等于最顶层 Object 构造函数
          Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
          return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
      },
      type: function type(obj) {
          if (obj == null) {
              return obj + ""; //'undefined' 或 'null'
          }

          return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
      }

  });

  /**
   * Created by vajoy on 2016/8/2.
   */
  var global$1 = function global(jQuery) {
      //走模块化形式的直接绕过
      if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined') return;

      var _jQuery = window.jQuery,
          _$ = window.$;

      jQuery.noConflict = function (deep) {
          //确保window.$没有再次被改写
          if (window.$ === jQuery) {
              window.$ = _$;
          }

          //确保window.jQuery没有再次被改写
          if (deep && window.jQuery === jQuery) {
              window.jQuery = _jQuery;
          }

          return jQuery; //返回 jQuery 接口引用
      };

      window.jQuery = window.$ = jQuery;
  };

  /**
   * Created by vajoy on 2016/8/1.
   */

  var init = function init(jQuery) {
      jQuery.fn.init = function (selector, context, root) {
          if (!selector) {
              return this;
          } else {
              var elem = document.querySelector(selector);
              if (elem) {
                  this[0] = elem;
                  this.length = 1;
              }
              return this;
          }
      };

      jQuery.fn.init.prototype = jQuery.fn;
  };

  global$1(jQuery);
  init(jQuery);

  return jQuery;

}));