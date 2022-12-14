var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value2) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value: value2 }) : obj[key] = value2;
var __publicField = (obj, key, value2) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value2);
  return value2;
};
const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
/*!
 * Vue.js v2.7.14
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
var emptyObject = Object.freeze({});
var isArray = Array.isArray;
function isUndef(v) {
  return v === void 0 || v === null;
}
function isDef(v) {
  return v !== void 0 && v !== null;
}
function isTrue(v) {
  return v === true;
}
function isFalse(v) {
  return v === false;
}
function isPrimitive(value2) {
  return typeof value2 === "string" || typeof value2 === "number" || typeof value2 === "symbol" || typeof value2 === "boolean";
}
function isFunction(value2) {
  return typeof value2 === "function";
}
function isObject(obj) {
  return obj !== null && typeof obj === "object";
}
var _toString = Object.prototype.toString;
function toRawType(value2) {
  return _toString.call(value2).slice(8, -1);
}
function isPlainObject(obj) {
  return _toString.call(obj) === "[object Object]";
}
function isRegExp(v) {
  return _toString.call(v) === "[object RegExp]";
}
function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}
function isPromise(val) {
  return isDef(val) && typeof val.then === "function" && typeof val.catch === "function";
}
function toString(val) {
  return val == null ? "" : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
function makeMap(str, expectsLowerCase) {
  var map = /* @__PURE__ */ Object.create(null);
  var list = str.split(",");
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? function(val) {
    return map[val.toLowerCase()];
  } : function(val) {
    return map[val];
  };
}
makeMap("slot,component", true);
var isReservedAttribute = makeMap("key,ref,slot,slot-scope,is");
function remove$2(arr, item) {
  var len = arr.length;
  if (len) {
    if (item === arr[len - 1]) {
      arr.length = len - 1;
      return;
    }
    var index2 = arr.indexOf(item);
    if (index2 > -1) {
      return arr.splice(index2, 1);
    }
  }
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function cached(fn) {
  var cache = /* @__PURE__ */ Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
var camelizeRE = /-(\w)/g;
var camelize = cached(function(str) {
  return str.replace(camelizeRE, function(_, c) {
    return c ? c.toUpperCase() : "";
  });
});
var capitalize = cached(function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function(str) {
  return str.replace(hyphenateRE, "-$1").toLowerCase();
});
function polyfillBind(fn, ctx2) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx2, arguments) : fn.call(ctx2, a) : fn.call(ctx2);
  }
  boundFn._length = fn.length;
  return boundFn;
}
function nativeBind(fn, ctx2) {
  return fn.bind(ctx2);
}
var bind = Function.prototype.bind ? nativeBind : polyfillBind;
function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}
function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to;
}
function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}
function noop(a, b, c) {
}
var no = function(a, b, c) {
  return false;
};
var identity = function(_) {
  return _;
};
function looseEqual(a, b) {
  if (a === b)
    return true;
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function(e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function(key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val))
      return i;
  }
  return -1;
}
function once(fn) {
  var called = false;
  return function() {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}
function hasChanged(x, y) {
  if (x === y) {
    return x === 0 && 1 / x !== 1 / y;
  } else {
    return x === x || y === y;
  }
}
var SSR_ATTR = "data-server-rendered";
var ASSET_TYPES = ["component", "directive", "filter"];
var LIFECYCLE_HOOKS = [
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeUpdate",
  "updated",
  "beforeDestroy",
  "destroyed",
  "activated",
  "deactivated",
  "errorCaptured",
  "serverPrefetch",
  "renderTracked",
  "renderTriggered"
];
var config = {
  optionMergeStrategies: /* @__PURE__ */ Object.create(null),
  silent: false,
  productionTip: false,
  devtools: false,
  performance: false,
  errorHandler: null,
  warnHandler: null,
  ignoredElements: [],
  keyCodes: /* @__PURE__ */ Object.create(null),
  isReservedTag: no,
  isReservedAttr: no,
  isUnknownElement: no,
  getTagNamespace: noop,
  parsePlatformTagName: identity,
  mustUseProp: no,
  async: true,
  _lifecycleHooks: LIFECYCLE_HOOKS
};
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
function isReserved(str) {
  var c = (str + "").charCodeAt(0);
  return c === 36 || c === 95;
}
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
var bailRE = new RegExp("[^".concat(unicodeRegExp.source, ".$_\\d]"));
function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  var segments = path.split(".");
  return function(obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj)
        return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}
var hasProto = "__proto__" in {};
var inBrowser = typeof window !== "undefined";
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf("msie 9.0") > 0;
var isEdge = UA && UA.indexOf("edge/") > 0;
UA && UA.indexOf("android") > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
UA && /chrome\/\d+/.test(UA) && !isEdge;
UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);
var nativeWatch = {}.watch;
var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, "passive", {
      get: function() {
        supportsPassive = true;
      }
    });
    window.addEventListener("test-passive", null, opts);
  } catch (e) {
  }
}
var _isServer;
var isServerRendering = function() {
  if (_isServer === void 0) {
    if (!inBrowser && typeof global !== "undefined") {
      _isServer = global["process"] && global["process"].env.VUE_ENV === "server";
    } else {
      _isServer = false;
    }
  }
  return _isServer;
};
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
function isNative(Ctor) {
  return typeof Ctor === "function" && /native code/.test(Ctor.toString());
}
var hasSymbol = typeof Symbol !== "undefined" && isNative(Symbol) && typeof Reflect !== "undefined" && isNative(Reflect.ownKeys);
var _Set;
if (typeof Set !== "undefined" && isNative(Set)) {
  _Set = Set;
} else {
  _Set = function() {
    function Set2() {
      this.set = /* @__PURE__ */ Object.create(null);
    }
    Set2.prototype.has = function(key) {
      return this.set[key] === true;
    };
    Set2.prototype.add = function(key) {
      this.set[key] = true;
    };
    Set2.prototype.clear = function() {
      this.set = /* @__PURE__ */ Object.create(null);
    };
    return Set2;
  }();
}
var currentInstance = null;
function setCurrentInstance(vm) {
  if (vm === void 0) {
    vm = null;
  }
  if (!vm)
    currentInstance && currentInstance._scope.off();
  currentInstance = vm;
  vm && vm._scope.on();
}
var VNode = function() {
  function VNode2(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.ns = void 0;
    this.context = context;
    this.fnContext = void 0;
    this.fnOptions = void 0;
    this.fnScopeId = void 0;
    this.key = data && data.key;
    this.componentOptions = componentOptions;
    this.componentInstance = void 0;
    this.parent = void 0;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
    this.asyncFactory = asyncFactory;
    this.asyncMeta = void 0;
    this.isAsyncPlaceholder = false;
  }
  Object.defineProperty(VNode2.prototype, "child", {
    get: function() {
      return this.componentInstance;
    },
    enumerable: false,
    configurable: true
  });
  return VNode2;
}();
var createEmptyVNode = function(text) {
  if (text === void 0) {
    text = "";
  }
  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};
function createTextVNode(val) {
  return new VNode(void 0, void 0, void 0, String(val));
}
function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
var uid$2 = 0;
var pendingCleanupDeps = [];
var cleanupDeps = function() {
  for (var i = 0; i < pendingCleanupDeps.length; i++) {
    var dep = pendingCleanupDeps[i];
    dep.subs = dep.subs.filter(function(s) {
      return s;
    });
    dep._pending = false;
  }
  pendingCleanupDeps.length = 0;
};
var Dep = function() {
  function Dep2() {
    this._pending = false;
    this.id = uid$2++;
    this.subs = [];
  }
  Dep2.prototype.addSub = function(sub) {
    this.subs.push(sub);
  };
  Dep2.prototype.removeSub = function(sub) {
    this.subs[this.subs.indexOf(sub)] = null;
    if (!this._pending) {
      this._pending = true;
      pendingCleanupDeps.push(this);
    }
  };
  Dep2.prototype.depend = function(info) {
    if (Dep2.target) {
      Dep2.target.addDep(this);
    }
  };
  Dep2.prototype.notify = function(info) {
    var subs = this.subs.filter(function(s) {
      return s;
    });
    for (var i = 0, l = subs.length; i < l; i++) {
      var sub = subs[i];
      sub.update();
    }
  };
  return Dep2;
}();
Dep.target = null;
var targetStack = [];
function pushTarget(target2) {
  targetStack.push(target2);
  Dep.target = target2;
}
function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse"
];
methodsToPatch.forEach(function(method) {
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
    }
    if (inserted)
      ob.observeArray(inserted);
    {
      ob.dep.notify();
    }
    return result;
  });
});
var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
var NO_INIITIAL_VALUE = {};
var shouldObserve = true;
function toggleObserving(value2) {
  shouldObserve = value2;
}
var mockDep = {
  notify: noop,
  depend: noop,
  addSub: noop,
  removeSub: noop
};
var Observer = function() {
  function Observer2(value2, shallow, mock) {
    if (shallow === void 0) {
      shallow = false;
    }
    if (mock === void 0) {
      mock = false;
    }
    this.value = value2;
    this.shallow = shallow;
    this.mock = mock;
    this.dep = mock ? mockDep : new Dep();
    this.vmCount = 0;
    def(value2, "__ob__", this);
    if (isArray(value2)) {
      if (!mock) {
        if (hasProto) {
          value2.__proto__ = arrayMethods;
        } else {
          for (var i = 0, l = arrayKeys.length; i < l; i++) {
            var key = arrayKeys[i];
            def(value2, key, arrayMethods[key]);
          }
        }
      }
      if (!shallow) {
        this.observeArray(value2);
      }
    } else {
      var keys = Object.keys(value2);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        defineReactive(value2, key, NO_INIITIAL_VALUE, void 0, shallow, mock);
      }
    }
  }
  Observer2.prototype.observeArray = function(value2) {
    for (var i = 0, l = value2.length; i < l; i++) {
      observe(value2[i], false, this.mock);
    }
  };
  return Observer2;
}();
function observe(value2, shallow, ssrMockReactivity) {
  if (value2 && hasOwn(value2, "__ob__") && value2.__ob__ instanceof Observer) {
    return value2.__ob__;
  }
  if (shouldObserve && (ssrMockReactivity || !isServerRendering()) && (isArray(value2) || isPlainObject(value2)) && Object.isExtensible(value2) && !value2.__v_skip && !isRef(value2) && !(value2 instanceof VNode)) {
    return new Observer(value2, shallow, ssrMockReactivity);
  }
}
function defineReactive(obj, key, val, customSetter, shallow, mock) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && (val === NO_INIITIAL_VALUE || arguments.length === 2)) {
    val = obj[key];
  }
  var childOb = !shallow && observe(val, false, mock);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value2 = getter ? getter.call(obj) : val;
      if (Dep.target) {
        {
          dep.depend();
        }
        if (childOb) {
          childOb.dep.depend();
          if (isArray(value2)) {
            dependArray(value2);
          }
        }
      }
      return isRef(value2) && !shallow ? value2.value : value2;
    },
    set: function reactiveSetter(newVal) {
      var value2 = getter ? getter.call(obj) : val;
      if (!hasChanged(value2, newVal)) {
        return;
      }
      if (setter) {
        setter.call(obj, newVal);
      } else if (getter) {
        return;
      } else if (!shallow && isRef(value2) && !isRef(newVal)) {
        value2.value = newVal;
        return;
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal, false, mock);
      {
        dep.notify();
      }
    }
  });
  return dep;
}
function set(target2, key, val) {
  if (isReadonly(target2)) {
    return;
  }
  var ob = target2.__ob__;
  if (isArray(target2) && isValidArrayIndex(key)) {
    target2.length = Math.max(target2.length, key);
    target2.splice(key, 1, val);
    if (ob && !ob.shallow && ob.mock) {
      observe(val, false, true);
    }
    return val;
  }
  if (key in target2 && !(key in Object.prototype)) {
    target2[key] = val;
    return val;
  }
  if (target2._isVue || ob && ob.vmCount) {
    return val;
  }
  if (!ob) {
    target2[key] = val;
    return val;
  }
  defineReactive(ob.value, key, val, void 0, ob.shallow, ob.mock);
  {
    ob.dep.notify();
  }
  return val;
}
function del(target2, key) {
  if (isArray(target2) && isValidArrayIndex(key)) {
    target2.splice(key, 1);
    return;
  }
  var ob = target2.__ob__;
  if (target2._isVue || ob && ob.vmCount) {
    return;
  }
  if (isReadonly(target2)) {
    return;
  }
  if (!hasOwn(target2, key)) {
    return;
  }
  delete target2[key];
  if (!ob) {
    return;
  }
  {
    ob.dep.notify();
  }
}
function dependArray(value2) {
  for (var e = void 0, i = 0, l = value2.length; i < l; i++) {
    e = value2[i];
    if (e && e.__ob__) {
      e.__ob__.dep.depend();
    }
    if (isArray(e)) {
      dependArray(e);
    }
  }
}
function shallowReactive(target2) {
  makeReactive(target2, true);
  def(target2, "__v_isShallow", true);
  return target2;
}
function makeReactive(target2, shallow) {
  if (!isReadonly(target2)) {
    observe(target2, shallow, isServerRendering());
  }
}
function isReadonly(value2) {
  return !!(value2 && value2.__v_isReadonly);
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function proxyWithRefUnwrap(target2, source, key) {
  Object.defineProperty(target2, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      var val = source[key];
      if (isRef(val)) {
        return val.value;
      } else {
        var ob = val && val.__ob__;
        if (ob)
          ob.dep.depend();
        return val;
      }
    },
    set: function(value2) {
      var oldValue = source[key];
      if (isRef(oldValue) && !isRef(value2)) {
        oldValue.value = value2;
      } else {
        source[key] = value2;
      }
    }
  });
}
var activeEffectScope;
var EffectScope = function() {
  function EffectScope2(detached) {
    if (detached === void 0) {
      detached = false;
    }
    this.detached = detached;
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  EffectScope2.prototype.run = function(fn) {
    if (this.active) {
      var currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  };
  EffectScope2.prototype.on = function() {
    activeEffectScope = this;
  };
  EffectScope2.prototype.off = function() {
    activeEffectScope = this.parent;
  };
  EffectScope2.prototype.stop = function(fromParent) {
    if (this.active) {
      var i = void 0, l = void 0;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].teardown();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        var last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this.active = false;
    }
  };
  return EffectScope2;
}();
function recordEffectScope(effect, scope) {
  if (scope === void 0) {
    scope = activeEffectScope;
  }
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function resolveProvided(vm) {
  var existing = vm._provided;
  var parentProvides = vm.$parent && vm.$parent._provided;
  if (parentProvides === existing) {
    return vm._provided = Object.create(parentProvides);
  } else {
    return existing;
  }
}
var normalizeEvent = cached(function(name2) {
  var passive = name2.charAt(0) === "&";
  name2 = passive ? name2.slice(1) : name2;
  var once2 = name2.charAt(0) === "~";
  name2 = once2 ? name2.slice(1) : name2;
  var capture = name2.charAt(0) === "!";
  name2 = capture ? name2.slice(1) : name2;
  return {
    name: name2,
    once: once2,
    capture,
    passive
  };
});
function createFnInvoker(fns, vm) {
  function invoker() {
    var fns2 = invoker.fns;
    if (isArray(fns2)) {
      var cloned = fns2.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments, vm, "v-on handler");
      }
    } else {
      return invokeWithErrorHandling(fns2, null, arguments, vm, "v-on handler");
    }
  }
  invoker.fns = fns;
  return invoker;
}
function updateListeners(on, oldOn, add2, remove2, createOnceHandler2, vm) {
  var name2, cur, old, event;
  for (name2 in on) {
    cur = on[name2];
    old = oldOn[name2];
    event = normalizeEvent(name2);
    if (isUndef(cur))
      ;
    else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name2] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name2] = createOnceHandler2(event.name, cur, event.capture);
      }
      add2(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name2] = old;
    }
  }
  for (name2 in oldOn) {
    if (isUndef(on[name2])) {
      event = normalizeEvent(name2);
      remove2(event.name, oldOn[name2], event.capture);
    }
  }
}
function mergeVNodeHook(def2, hookKey, hook) {
  if (def2 instanceof VNode) {
    def2 = def2.data.hook || (def2.data.hook = {});
  }
  var invoker;
  var oldHook = def2[hookKey];
  function wrappedHook() {
    hook.apply(this, arguments);
    remove$2(invoker.fns, wrappedHook);
  }
  if (isUndef(oldHook)) {
    invoker = createFnInvoker([wrappedHook]);
  } else {
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }
  invoker.merged = true;
  def2[hookKey] = invoker;
}
function extractPropsFromVNodeData(data, Ctor, tag) {
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return;
  }
  var res = {};
  var attrs2 = data.attrs, props2 = data.props;
  if (isDef(attrs2) || isDef(props2)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props2, key, altKey, true) || checkProp(res, attrs2, key, altKey, false);
    }
  }
  return res;
}
function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true;
    }
  }
  return false;
}
function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }
  return children;
}
function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : isArray(children) ? normalizeArrayChildren(children) : void 0;
}
function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}
function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === "boolean")
      continue;
    lastIndex = res.length - 1;
    last = res[lastIndex];
    if (isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, "".concat(nestedIndex || "", "_").concat(i));
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== "") {
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist".concat(nestedIndex, "_").concat(i, "__");
        }
        res.push(c);
      }
    }
  }
  return res;
}
function renderList(val, render2) {
  var ret = null, i, l, keys, key;
  if (isArray(val) || typeof val === "string") {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render2(val[i], i);
    }
  } else if (typeof val === "number") {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render2(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render2(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render2(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  ret._isVList = true;
  return ret;
}
function renderSlot(name2, fallbackRender, props2, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name2];
  var nodes;
  if (scopedSlotFn) {
    props2 = props2 || {};
    if (bindObject) {
      props2 = extend(extend({}, bindObject), props2);
    }
    nodes = scopedSlotFn(props2) || (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
  } else {
    nodes = this.$slots[name2] || (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
  }
  var target2 = props2 && props2.slot;
  if (target2) {
    return this.$createElement("template", { slot: target2 }, nodes);
  } else {
    return nodes;
  }
}
function resolveFilter(id) {
  return resolveAsset(this.$options, "filters", id) || identity;
}
function isKeyNotMatch(expect, actual) {
  if (isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
  return eventKeyCode === void 0;
}
function bindObjectProps(data, tag, value2, asProp, isSync) {
  if (value2) {
    if (!isObject(value2))
      ;
    else {
      if (isArray(value2)) {
        value2 = toObject(value2);
      }
      var hash = void 0;
      var _loop_1 = function(key2) {
        if (key2 === "class" || key2 === "style" || isReservedAttribute(key2)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key2) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key2);
        var hyphenatedKey = hyphenate(key2);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key2] = value2[key2];
          if (isSync) {
            var on = data.on || (data.on = {});
            on["update:".concat(key2)] = function($event) {
              value2[key2] = $event;
            };
          }
        }
      };
      for (var key in value2) {
        _loop_1(key);
      }
    }
  }
  return data;
}
function renderStatic(index2, isInFor) {
  var cached2 = this._staticTrees || (this._staticTrees = []);
  var tree = cached2[index2];
  if (tree && !isInFor) {
    return tree;
  }
  tree = cached2[index2] = this.$options.staticRenderFns[index2].call(this._renderProxy, this._c, this);
  markStatic(tree, "__static__".concat(index2), false);
  return tree;
}
function markOnce(tree, index2, key) {
  markStatic(tree, "__once__".concat(index2).concat(key ? "_".concat(key) : ""), true);
  return tree;
}
function markStatic(tree, key, isOnce) {
  if (isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== "string") {
        markStaticNode(tree[i], "".concat(key, "_").concat(i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}
function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}
function bindObjectListeners(data, value2) {
  if (value2) {
    if (!isPlainObject(value2))
      ;
    else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value2) {
        var existing = on[key];
        var ours = value2[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data;
}
function resolveScopedSlots(fns, res, hasDynamicKeys, contentHashKey) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    res.$key = contentHashKey;
  }
  return res;
}
function bindDynamicKeys(baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === "string" && key) {
      baseObj[values[i]] = values[i + 1];
    }
  }
  return baseObj;
}
function prependModifier(value2, symbol) {
  return typeof value2 === "string" ? symbol + value2 : value2;
}
function installRenderHelpers(target2) {
  target2._o = markOnce;
  target2._n = toNumber;
  target2._s = toString;
  target2._l = renderList;
  target2._t = renderSlot;
  target2._q = looseEqual;
  target2._i = looseIndexOf;
  target2._m = renderStatic;
  target2._f = resolveFilter;
  target2._k = checkKeyCodes;
  target2._b = bindObjectProps;
  target2._v = createTextVNode;
  target2._e = createEmptyVNode;
  target2._u = resolveScopedSlots;
  target2._g = bindObjectListeners;
  target2._d = bindDynamicKeys;
  target2._p = prependModifier;
}
function resolveSlots(children, context) {
  if (!children || !children.length) {
    return {};
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name_1 = data.slot;
      var slot = slots[name_1] || (slots[name_1] = []);
      if (child.tag === "template") {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  for (var name_2 in slots) {
    if (slots[name_2].every(isWhitespace)) {
      delete slots[name_2];
    }
  }
  return slots;
}
function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === " ";
}
function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}
function normalizeScopedSlots(ownerVm, scopedSlots, normalSlots, prevScopedSlots) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = scopedSlots ? !!scopedSlots.$stable : !hasNormalSlots;
  var key = scopedSlots && scopedSlots.$key;
  if (!scopedSlots) {
    res = {};
  } else if (scopedSlots._normalized) {
    return scopedSlots._normalized;
  } else if (isStable && prevScopedSlots && prevScopedSlots !== emptyObject && key === prevScopedSlots.$key && !hasNormalSlots && !prevScopedSlots.$hasNormal) {
    return prevScopedSlots;
  } else {
    res = {};
    for (var key_1 in scopedSlots) {
      if (scopedSlots[key_1] && key_1[0] !== "$") {
        res[key_1] = normalizeScopedSlot(ownerVm, normalSlots, key_1, scopedSlots[key_1]);
      }
    }
  }
  for (var key_2 in normalSlots) {
    if (!(key_2 in res)) {
      res[key_2] = proxyNormalSlot(normalSlots, key_2);
    }
  }
  if (scopedSlots && Object.isExtensible(scopedSlots)) {
    scopedSlots._normalized = res;
  }
  def(res, "$stable", isStable);
  def(res, "$key", key);
  def(res, "$hasNormal", hasNormalSlots);
  return res;
}
function normalizeScopedSlot(vm, normalSlots, key, fn) {
  var normalized = function() {
    var cur = currentInstance;
    setCurrentInstance(vm);
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === "object" && !isArray(res) ? [res] : normalizeChildren(res);
    var vnode = res && res[0];
    setCurrentInstance(cur);
    return res && (!vnode || res.length === 1 && vnode.isComment && !isAsyncPlaceholder(vnode)) ? void 0 : res;
  };
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized;
}
function proxyNormalSlot(slots, key) {
  return function() {
    return slots[key];
  };
}
function initSetup(vm) {
  var options = vm.$options;
  var setup = options.setup;
  if (setup) {
    var ctx2 = vm._setupContext = createSetupContext(vm);
    setCurrentInstance(vm);
    pushTarget();
    var setupResult = invokeWithErrorHandling(setup, null, [vm._props || shallowReactive({}), ctx2], vm, "setup");
    popTarget();
    setCurrentInstance();
    if (isFunction(setupResult)) {
      options.render = setupResult;
    } else if (isObject(setupResult)) {
      vm._setupState = setupResult;
      if (!setupResult.__sfc) {
        for (var key in setupResult) {
          if (!isReserved(key)) {
            proxyWithRefUnwrap(vm, setupResult, key);
          }
        }
      } else {
        var proxy2 = vm._setupProxy = {};
        for (var key in setupResult) {
          if (key !== "__sfc") {
            proxyWithRefUnwrap(proxy2, setupResult, key);
          }
        }
      }
    } else
      ;
  }
}
function createSetupContext(vm) {
  return {
    get attrs() {
      if (!vm._attrsProxy) {
        var proxy2 = vm._attrsProxy = {};
        def(proxy2, "_v_attr_proxy", true);
        syncSetupProxy(proxy2, vm.$attrs, emptyObject, vm, "$attrs");
      }
      return vm._attrsProxy;
    },
    get listeners() {
      if (!vm._listenersProxy) {
        var proxy2 = vm._listenersProxy = {};
        syncSetupProxy(proxy2, vm.$listeners, emptyObject, vm, "$listeners");
      }
      return vm._listenersProxy;
    },
    get slots() {
      return initSlotsProxy(vm);
    },
    emit: bind(vm.$emit, vm),
    expose: function(exposed) {
      if (exposed) {
        Object.keys(exposed).forEach(function(key) {
          return proxyWithRefUnwrap(vm, exposed, key);
        });
      }
    }
  };
}
function syncSetupProxy(to, from, prev, instance, type) {
  var changed = false;
  for (var key in from) {
    if (!(key in to)) {
      changed = true;
      defineProxyAttr(to, key, instance, type);
    } else if (from[key] !== prev[key]) {
      changed = true;
    }
  }
  for (var key in to) {
    if (!(key in from)) {
      changed = true;
      delete to[key];
    }
  }
  return changed;
}
function defineProxyAttr(proxy2, key, instance, type) {
  Object.defineProperty(proxy2, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      return instance[type][key];
    }
  });
}
function initSlotsProxy(vm) {
  if (!vm._slotsProxy) {
    syncSetupSlots(vm._slotsProxy = {}, vm.$scopedSlots);
  }
  return vm._slotsProxy;
}
function syncSetupSlots(to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  for (var key in to) {
    if (!(key in from)) {
      delete to[key];
    }
  }
}
function initRender(vm) {
  vm._vnode = null;
  vm._staticTrees = null;
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode;
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = parentVnode ? normalizeScopedSlots(vm.$parent, parentVnode.data.scopedSlots, vm.$slots) : emptyObject;
  vm._c = function(a, b, c, d) {
    return createElement$1(vm, a, b, c, d, false);
  };
  vm.$createElement = function(a, b, c, d) {
    return createElement$1(vm, a, b, c, d, true);
  };
  var parentData = parentVnode && parentVnode.data;
  {
    defineReactive(vm, "$attrs", parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, "$listeners", options._parentListeners || emptyObject, null, true);
  }
}
var currentRenderingInstance = null;
function renderMixin(Vue2) {
  installRenderHelpers(Vue2.prototype);
  Vue2.prototype.$nextTick = function(fn) {
    return nextTick(fn, this);
  };
  Vue2.prototype._render = function() {
    var vm = this;
    var _a = vm.$options, render2 = _a.render, _parentVnode = _a._parentVnode;
    if (_parentVnode && vm._isMounted) {
      vm.$scopedSlots = normalizeScopedSlots(vm.$parent, _parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
      if (vm._slotsProxy) {
        syncSetupSlots(vm._slotsProxy, vm.$scopedSlots);
      }
    }
    vm.$vnode = _parentVnode;
    var vnode;
    try {
      setCurrentInstance(vm);
      currentRenderingInstance = vm;
      vnode = render2.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
      setCurrentInstance();
    }
    if (isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    if (!(vnode instanceof VNode)) {
      vnode = createEmptyVNode();
    }
    vnode.parent = _parentVnode;
    return vnode;
  };
}
function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === "Module") {
    comp = comp.default;
  }
  return isObject(comp) ? base.extend(comp) : comp;
}
function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data, context, children, tag };
  return node;
}
function resolveAsyncComponent(factory, baseCtor) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }
  if (isDef(factory.resolved)) {
    return factory.resolved;
  }
  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    factory.owners.push(owner);
  }
  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }
  if (owner && !isDef(factory.owners)) {
    var owners_1 = factory.owners = [owner];
    var sync_1 = true;
    var timerLoading_1 = null;
    var timerTimeout_1 = null;
    owner.$on("hook:destroyed", function() {
      return remove$2(owners_1, owner);
    });
    var forceRender_1 = function(renderCompleted) {
      for (var i = 0, l = owners_1.length; i < l; i++) {
        owners_1[i].$forceUpdate();
      }
      if (renderCompleted) {
        owners_1.length = 0;
        if (timerLoading_1 !== null) {
          clearTimeout(timerLoading_1);
          timerLoading_1 = null;
        }
        if (timerTimeout_1 !== null) {
          clearTimeout(timerTimeout_1);
          timerTimeout_1 = null;
        }
      }
    };
    var resolve = once(function(res) {
      factory.resolved = ensureCtor(res, baseCtor);
      if (!sync_1) {
        forceRender_1(true);
      } else {
        owners_1.length = 0;
      }
    });
    var reject_1 = once(function(reason) {
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender_1(true);
      }
    });
    var res_1 = factory(resolve, reject_1);
    if (isObject(res_1)) {
      if (isPromise(res_1)) {
        if (isUndef(factory.resolved)) {
          res_1.then(resolve, reject_1);
        }
      } else if (isPromise(res_1.component)) {
        res_1.component.then(resolve, reject_1);
        if (isDef(res_1.error)) {
          factory.errorComp = ensureCtor(res_1.error, baseCtor);
        }
        if (isDef(res_1.loading)) {
          factory.loadingComp = ensureCtor(res_1.loading, baseCtor);
          if (res_1.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading_1 = setTimeout(function() {
              timerLoading_1 = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender_1(false);
              }
            }, res_1.delay || 200);
          }
        }
        if (isDef(res_1.timeout)) {
          timerTimeout_1 = setTimeout(function() {
            timerTimeout_1 = null;
            if (isUndef(factory.resolved)) {
              reject_1(null);
            }
          }, res_1.timeout);
        }
      }
    }
    sync_1 = false;
    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}
function getFirstComponentChild(children) {
  if (isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}
var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;
function createElement$1(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = void 0;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType);
}
function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    return createEmptyVNode();
  }
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    return createEmptyVNode();
  }
  if (isArray(children) && isFunction(children[0])) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === "string") {
    var Ctor = void 0;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      vnode = new VNode(config.parsePlatformTagName(tag), data, children, void 0, void 0, context);
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, "components", tag))) {
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      vnode = new VNode(tag, data, children, void 0, void 0, context);
    }
  } else {
    vnode = createComponent(tag, data, context, children);
  }
  if (isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns))
      applyNS(vnode, ns);
    if (isDef(data))
      registerDeepBindings(data);
    return vnode;
  } else {
    return createEmptyVNode();
  }
}
function applyNS(vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === "foreignObject") {
    ns = void 0;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== "svg")) {
        applyNS(child, ns, force);
      }
    }
  }
}
function registerDeepBindings(data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}
function handleError(err, vm, info) {
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while (cur = cur.$parent) {
        var hooks2 = cur.$options.errorCaptured;
        if (hooks2) {
          for (var i = 0; i < hooks2.length; i++) {
            try {
              var capture = hooks2[i].call(cur, err, vm, info) === false;
              if (capture)
                return;
            } catch (e) {
              globalHandleError(e, cur, "errorCaptured hook");
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}
function invokeWithErrorHandling(handler, context, args, vm, info) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function(e) {
        return handleError(e, vm, info + " (Promise/async)");
      });
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res;
}
function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      if (e !== err) {
        logError(e);
      }
    }
  }
  logError(err);
}
function logError(err, vm, info) {
  if (inBrowser && typeof console !== "undefined") {
    console.error(err);
  } else {
    throw err;
  }
}
var isUsingMicroTask = false;
var callbacks = [];
var pending = false;
function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}
var timerFunc;
if (typeof Promise !== "undefined" && isNative(Promise)) {
  var p_1 = Promise.resolve();
  timerFunc = function() {
    p_1.then(flushCallbacks);
    if (isIOS)
      setTimeout(noop);
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== "undefined" && (isNative(MutationObserver) || MutationObserver.toString() === "[object MutationObserverConstructor]")) {
  var counter_1 = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode_1 = document.createTextNode(String(counter_1));
  observer.observe(textNode_1, {
    characterData: true
  });
  timerFunc = function() {
    counter_1 = (counter_1 + 1) % 2;
    textNode_1.data = String(counter_1);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== "undefined" && isNative(setImmediate)) {
  timerFunc = function() {
    setImmediate(flushCallbacks);
  };
} else {
  timerFunc = function() {
    setTimeout(flushCallbacks, 0);
  };
}
function nextTick(cb, ctx2) {
  var _resolve;
  callbacks.push(function() {
    if (cb) {
      try {
        cb.call(ctx2);
      } catch (e) {
        handleError(e, ctx2, "nextTick");
      }
    } else if (_resolve) {
      _resolve(ctx2);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  if (!cb && typeof Promise !== "undefined") {
    return new Promise(function(resolve) {
      _resolve = resolve;
    });
  }
}
var version = "2.7.14";
var seenObjects = new _Set();
function traverse(val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
  return val;
}
function _traverse(val, seen) {
  var i, keys;
  var isA = isArray(val);
  if (!isA && !isObject(val) || val.__v_skip || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return;
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--)
      _traverse(val[i], seen);
  } else if (isRef(val)) {
    _traverse(val.value, seen);
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--)
      _traverse(val[keys[i]], seen);
  }
}
var uid$1 = 0;
var Watcher = function() {
  function Watcher2(vm, expOrFn, cb, options, isRenderWatcher) {
    recordEffectScope(this, activeEffectScope && !activeEffectScope._vm ? activeEffectScope : vm ? vm._scope : void 0);
    if ((this.vm = vm) && isRenderWatcher) {
      vm._watcher = this;
    }
    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.lazy = !!options.lazy;
      this.sync = !!options.sync;
      this.before = options.before;
    } else {
      this.deep = this.user = this.lazy = this.sync = false;
    }
    this.cb = cb;
    this.id = ++uid$1;
    this.active = true;
    this.post = false;
    this.dirty = this.lazy;
    this.deps = [];
    this.newDeps = [];
    this.depIds = new _Set();
    this.newDepIds = new _Set();
    this.expression = "";
    if (isFunction(expOrFn)) {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
      if (!this.getter) {
        this.getter = noop;
      }
    }
    this.value = this.lazy ? void 0 : this.get();
  }
  Watcher2.prototype.get = function() {
    pushTarget(this);
    var value2;
    var vm = this.vm;
    try {
      value2 = this.getter.call(vm, vm);
    } catch (e) {
      if (this.user) {
        handleError(e, vm, 'getter for watcher "'.concat(this.expression, '"'));
      } else {
        throw e;
      }
    } finally {
      if (this.deep) {
        traverse(value2);
      }
      popTarget();
      this.cleanupDeps();
    }
    return value2;
  };
  Watcher2.prototype.addDep = function(dep) {
    var id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  };
  Watcher2.prototype.cleanupDeps = function() {
    var i = this.deps.length;
    while (i--) {
      var dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
    var tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  };
  Watcher2.prototype.update = function() {
    if (this.lazy) {
      this.dirty = true;
    } else if (this.sync) {
      this.run();
    } else {
      queueWatcher(this);
    }
  };
  Watcher2.prototype.run = function() {
    if (this.active) {
      var value2 = this.get();
      if (value2 !== this.value || isObject(value2) || this.deep) {
        var oldValue = this.value;
        this.value = value2;
        if (this.user) {
          var info = 'callback for watcher "'.concat(this.expression, '"');
          invokeWithErrorHandling(this.cb, this.vm, [value2, oldValue], this.vm, info);
        } else {
          this.cb.call(this.vm, value2, oldValue);
        }
      }
    }
  };
  Watcher2.prototype.evaluate = function() {
    this.value = this.get();
    this.dirty = false;
  };
  Watcher2.prototype.depend = function() {
    var i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  };
  Watcher2.prototype.teardown = function() {
    if (this.vm && !this.vm._isBeingDestroyed) {
      remove$2(this.vm._scope.effects, this);
    }
    if (this.active) {
      var i = this.deps.length;
      while (i--) {
        this.deps[i].removeSub(this);
      }
      this.active = false;
      if (this.onStop) {
        this.onStop();
      }
    }
  };
  return Watcher2;
}();
function initEvents(vm) {
  vm._events = /* @__PURE__ */ Object.create(null);
  vm._hasHookEvent = false;
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}
var target$1;
function add$1(event, fn) {
  target$1.$on(event, fn);
}
function remove$1(event, fn) {
  target$1.$off(event, fn);
}
function createOnceHandler$1(event, fn) {
  var _target = target$1;
  return function onceHandler() {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}
function updateComponentListeners(vm, listeners, oldListeners) {
  target$1 = vm;
  updateListeners(listeners, oldListeners || {}, add$1, remove$1, createOnceHandler$1, vm);
  target$1 = void 0;
}
function eventsMixin(Vue2) {
  var hookRE = /^hook:/;
  Vue2.prototype.$on = function(event, fn) {
    var vm = this;
    if (isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm;
  };
  Vue2.prototype.$once = function(event, fn) {
    var vm = this;
    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };
  Vue2.prototype.$off = function(event, fn) {
    var vm = this;
    if (!arguments.length) {
      vm._events = /* @__PURE__ */ Object.create(null);
      return vm;
    }
    if (isArray(event)) {
      for (var i_1 = 0, l = event.length; i_1 < l; i_1++) {
        vm.$off(event[i_1], fn);
      }
      return vm;
    }
    var cbs = vm._events[event];
    if (!cbs) {
      return vm;
    }
    if (!fn) {
      vm._events[event] = null;
      return vm;
    }
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }
    return vm;
  };
  Vue2.prototype.$emit = function(event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = 'event handler for "'.concat(event, '"');
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm;
  };
}
var activeInstance = null;
function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function() {
    activeInstance = prevActiveInstance;
  };
}
function initLifecycle(vm) {
  var options = vm.$options;
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }
  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._provided = parent ? parent._provided : /* @__PURE__ */ Object.create(null);
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}
function lifecycleMixin(Vue2) {
  Vue2.prototype._update = function(vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    if (!prevVnode) {
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false);
    } else {
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    var wrapper = vm;
    while (wrapper && wrapper.$vnode && wrapper.$parent && wrapper.$vnode === wrapper.$parent._vnode) {
      wrapper.$parent.$el = wrapper.$el;
      wrapper = wrapper.$parent;
    }
  };
  Vue2.prototype.$forceUpdate = function() {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };
  Vue2.prototype.$destroy = function() {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return;
    }
    callHook$1(vm, "beforeDestroy");
    vm._isBeingDestroyed = true;
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove$2(parent.$children, vm);
    }
    vm._scope.stop();
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    vm._isDestroyed = true;
    vm.__patch__(vm._vnode, null);
    callHook$1(vm, "destroyed");
    vm.$off();
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}
function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
  }
  callHook$1(vm, "beforeMount");
  var updateComponent;
  {
    updateComponent = function() {
      vm._update(vm._render(), hydrating);
    };
  }
  var watcherOptions = {
    before: function() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook$1(vm, "beforeUpdate");
      }
    }
  };
  new Watcher(vm, updateComponent, noop, watcherOptions, true);
  hydrating = false;
  var preWatchers = vm._preWatchers;
  if (preWatchers) {
    for (var i = 0; i < preWatchers.length; i++) {
      preWatchers[i].run();
    }
  }
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook$1(vm, "mounted");
  }
  return vm;
}
function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key || !newScopedSlots && vm.$scopedSlots.$key);
  var needsForceUpdate = !!(renderChildren || vm.$options._renderChildren || hasDynamicScopedSlot);
  var prevVNode = vm.$vnode;
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode;
  if (vm._vnode) {
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;
  var attrs2 = parentVnode.data.attrs || emptyObject;
  if (vm._attrsProxy) {
    if (syncSetupProxy(vm._attrsProxy, attrs2, prevVNode.data && prevVNode.data.attrs || emptyObject, vm, "$attrs")) {
      needsForceUpdate = true;
    }
  }
  vm.$attrs = attrs2;
  listeners = listeners || emptyObject;
  var prevListeners = vm.$options._parentListeners;
  if (vm._listenersProxy) {
    syncSetupProxy(vm._listenersProxy, listeners, prevListeners || emptyObject, vm, "$listeners");
  }
  vm.$listeners = vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, prevListeners);
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props2 = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props;
      props2[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    vm.$options.propsData = propsData;
  }
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
}
function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive)
      return true;
  }
  return false;
}
function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook$1(vm, "activated");
  }
}
function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return;
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook$1(vm, "deactivated");
  }
}
function callHook$1(vm, hook, args, setContext) {
  if (setContext === void 0) {
    setContext = true;
  }
  pushTarget();
  var prev = currentInstance;
  setContext && setCurrentInstance(vm);
  var handlers = vm.$options[hook];
  var info = "".concat(hook, " hook");
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, args || null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit("hook:" + hook);
  }
  setContext && setCurrentInstance(prev);
  popTarget();
}
var queue = [];
var activatedChildren = [];
var has = {};
var waiting = false;
var flushing = false;
var index = 0;
function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  waiting = flushing = false;
}
var currentFlushTimestamp = 0;
var getNow = Date.now;
if (inBrowser && !isIE) {
  var performance_1 = window.performance;
  if (performance_1 && typeof performance_1.now === "function" && getNow() > document.createEvent("Event").timeStamp) {
    getNow = function() {
      return performance_1.now();
    };
  }
}
var sortCompareFn = function(a, b) {
  if (a.post) {
    if (!b.post)
      return 1;
  } else if (b.post) {
    return -1;
  }
  return a.id - b.id;
};
function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;
  queue.sort(sortCompareFn);
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
  }
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();
  resetSchedulerState();
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);
  cleanupDeps();
  if (devtools && config.devtools) {
    devtools.emit("flush");
  }
}
function callUpdatedHooks(queue2) {
  var i = queue2.length;
  while (i--) {
    var watcher = queue2[i];
    var vm = watcher.vm;
    if (vm && vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook$1(vm, "updated");
    }
  }
}
function queueActivatedComponent(vm) {
  vm._inactive = false;
  activatedChildren.push(vm);
}
function callActivatedHooks(queue2) {
  for (var i = 0; i < queue2.length; i++) {
    queue2[i]._inactive = true;
    activateChildComponent(queue2[i], true);
  }
}
function queueWatcher(watcher) {
  var id = watcher.id;
  if (has[id] != null) {
    return;
  }
  if (watcher === Dep.target && watcher.noRecurse) {
    return;
  }
  has[id] = true;
  if (!flushing) {
    queue.push(watcher);
  } else {
    var i = queue.length - 1;
    while (i > index && queue[i].id > watcher.id) {
      i--;
    }
    queue.splice(i + 1, 0, watcher);
  }
  if (!waiting) {
    waiting = true;
    nextTick(flushSchedulerQueue);
  }
}
function initProvide(vm) {
  var provideOption = vm.$options.provide;
  if (provideOption) {
    var provided = isFunction(provideOption) ? provideOption.call(vm) : provideOption;
    if (!isObject(provided)) {
      return;
    }
    var source = resolveProvided(vm);
    var keys = hasSymbol ? Reflect.ownKeys(provided) : Object.keys(provided);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      Object.defineProperty(source, key, Object.getOwnPropertyDescriptor(provided, key));
    }
  }
}
function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function(key) {
      {
        defineReactive(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}
function resolveInject(inject, vm) {
  if (inject) {
    var result = /* @__PURE__ */ Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key === "__ob__")
        continue;
      var provideKey = inject[key].from;
      if (provideKey in vm._provided) {
        result[key] = vm._provided[provideKey];
      } else if ("default" in inject[key]) {
        var provideDefault = inject[key].default;
        result[key] = isFunction(provideDefault) ? provideDefault.call(vm) : provideDefault;
      } else
        ;
    }
    return result;
  }
}
function FunctionalRenderContext(data, props2, children, parent, Ctor) {
  var _this = this;
  var options = Ctor.options;
  var contextVm;
  if (hasOwn(parent, "_uid")) {
    contextVm = Object.create(parent);
    contextVm._original = parent;
  } else {
    contextVm = parent;
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;
  this.data = data;
  this.props = props2;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function() {
    if (!_this.$slots) {
      normalizeScopedSlots(parent, data.scopedSlots, _this.$slots = resolveSlots(children, parent));
    }
    return _this.$slots;
  };
  Object.defineProperty(this, "scopedSlots", {
    enumerable: true,
    get: function() {
      return normalizeScopedSlots(parent, data.scopedSlots, this.slots());
    }
  });
  if (isCompiled) {
    this.$options = options;
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(parent, data.scopedSlots, this.$slots);
  }
  if (options._scopeId) {
    this._c = function(a, b, c, d) {
      var vnode = createElement$1(contextVm, a, b, c, d, needNormalization);
      if (vnode && !isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode;
    };
  } else {
    this._c = function(a, b, c, d) {
      return createElement$1(contextVm, a, b, c, d, needNormalization);
    };
  }
}
installRenderHelpers(FunctionalRenderContext.prototype);
function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props2 = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props2[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs))
      mergeProps(props2, data.attrs);
    if (isDef(data.props))
      mergeProps(props2, data.props);
  }
  var renderContext = new FunctionalRenderContext(data, props2, children, contextVm, Ctor);
  var vnode = options.render.call(null, renderContext._c, renderContext);
  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options);
  } else if (isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
    }
    return res;
  }
}
function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone;
}
function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}
function getComponentName(options) {
  return options.name || options.__name || options._componentTag;
}
var componentVNodeHooks = {
  init: function(vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      var mountedNode = vnode;
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      child.$mount(hydrating ? vnode.elm : void 0, hydrating);
    }
  },
  prepatch: function(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, options.listeners, vnode, options.children);
  },
  insert: function(vnode) {
    var context = vnode.context, componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook$1(componentInstance, "mounted");
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true);
      }
    }
  },
  destroy: function(vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true);
      }
    }
  }
};
var hooksToMerge = Object.keys(componentVNodeHooks);
function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }
  var baseCtor = context.$options._base;
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }
  if (typeof Ctor !== "function") {
    return;
  }
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === void 0) {
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }
  data = data || {};
  resolveConstructorOptions(Ctor);
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }
  var propsData = extractPropsFromVNodeData(data, Ctor);
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  }
  var listeners = data.on;
  data.on = data.nativeOn;
  if (isTrue(Ctor.options.abstract)) {
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }
  installComponentHooks(data);
  var name2 = getComponentName(Ctor.options) || tag;
  var vnode = new VNode("vue-component-".concat(Ctor.cid).concat(name2 ? "-".concat(name2) : ""), data, void 0, void 0, void 0, context, { Ctor, propsData, listeners, tag, children }, asyncFactory);
  return vnode;
}
function createComponentInstanceForVnode(vnode, parent) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent
  };
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options);
}
function installComponentHooks(data) {
  var hooks2 = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks2[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks2[key] = existing ? mergeHook(toMerge, existing) : toMerge;
    }
  }
}
function mergeHook(f1, f2) {
  var merged = function(a, b) {
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged;
}
function transformModel(options, data) {
  var prop = options.model && options.model.prop || "value";
  var event = options.model && options.model.event || "input";
  (data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}
var warn = noop;
var strats = config.optionMergeStrategies;
function mergeData(to, from, recursive) {
  if (recursive === void 0) {
    recursive = true;
  }
  if (!from)
    return to;
  var key, toVal, fromVal;
  var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    if (key === "__ob__")
      continue;
    toVal = to[key];
    fromVal = from[key];
    if (!recursive || !hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to;
}
function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    if (!childVal) {
      return parentVal;
    }
    if (!parentVal) {
      return childVal;
    }
    return function mergedDataFn() {
      return mergeData(isFunction(childVal) ? childVal.call(this, this) : childVal, isFunction(parentVal) ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      var instanceData = isFunction(childVal) ? childVal.call(vm, vm) : childVal;
      var defaultData = isFunction(parentVal) ? parentVal.call(vm, vm) : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}
strats.data = function(parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== "function") {
      return parentVal;
    }
    return mergeDataOrFn(parentVal, childVal);
  }
  return mergeDataOrFn(parentVal, childVal, vm);
};
function mergeLifecycleHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks2) {
  var res = [];
  for (var i = 0; i < hooks2.length; i++) {
    if (res.indexOf(hooks2[i]) === -1) {
      res.push(hooks2[i]);
    }
  }
  return res;
}
LIFECYCLE_HOOKS.forEach(function(hook) {
  strats[hook] = mergeLifecycleHook;
});
function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    return extend(res, childVal);
  } else {
    return res;
  }
}
ASSET_TYPES.forEach(function(type) {
  strats[type + "s"] = mergeAssets;
});
strats.watch = function(parentVal, childVal, vm, key) {
  if (parentVal === nativeWatch)
    parentVal = void 0;
  if (childVal === nativeWatch)
    childVal = void 0;
  if (!childVal)
    return Object.create(parentVal || null);
  if (!parentVal)
    return childVal;
  var ret = {};
  extend(ret, parentVal);
  for (var key_1 in childVal) {
    var parent_1 = ret[key_1];
    var child = childVal[key_1];
    if (parent_1 && !isArray(parent_1)) {
      parent_1 = [parent_1];
    }
    ret[key_1] = parent_1 ? parent_1.concat(child) : isArray(child) ? child : [child];
  }
  return ret;
};
strats.props = strats.methods = strats.inject = strats.computed = function(parentVal, childVal, vm, key) {
  if (childVal && false) {
    assertObjectType(key, childVal);
  }
  if (!parentVal)
    return childVal;
  var ret = /* @__PURE__ */ Object.create(null);
  extend(ret, parentVal);
  if (childVal)
    extend(ret, childVal);
  return ret;
};
strats.provide = function(parentVal, childVal) {
  if (!parentVal)
    return childVal;
  return function() {
    var ret = /* @__PURE__ */ Object.create(null);
    mergeData(ret, isFunction(parentVal) ? parentVal.call(this) : parentVal);
    if (childVal) {
      mergeData(ret, isFunction(childVal) ? childVal.call(this) : childVal, false);
    }
    return ret;
  };
};
var defaultStrat = function(parentVal, childVal) {
  return childVal === void 0 ? parentVal : childVal;
};
function normalizeProps(options, vm) {
  var props2 = options.props;
  if (!props2)
    return;
  var res = {};
  var i, val, name2;
  if (isArray(props2)) {
    i = props2.length;
    while (i--) {
      val = props2[i];
      if (typeof val === "string") {
        name2 = camelize(val);
        res[name2] = { type: null };
      }
    }
  } else if (isPlainObject(props2)) {
    for (var key in props2) {
      val = props2[key];
      name2 = camelize(key);
      res[name2] = isPlainObject(val) ? val : { type: val };
    }
  } else
    ;
  options.props = res;
}
function normalizeInject(options, vm) {
  var inject = options.inject;
  if (!inject)
    return;
  var normalized = options.inject = {};
  if (isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({ from: key }, val) : { from: val };
    }
  } else
    ;
}
function normalizeDirectives$1(options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def2 = dirs[key];
      if (isFunction(def2)) {
        dirs[key] = { bind: def2, update: def2 };
      }
    }
  }
}
function assertObjectType(name2, value2, vm) {
  if (!isPlainObject(value2)) {
    warn('Invalid value for option "'.concat(name2, '": expected an Object, ') + "but got ".concat(toRawType(value2), "."));
  }
}
function mergeOptions(parent, child, vm) {
  if (isFunction(child)) {
    child = child.options;
  }
  normalizeProps(child);
  normalizeInject(child);
  normalizeDirectives$1(child);
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key2) {
    var strat = strats[key2] || defaultStrat;
    options[key2] = strat(parent[key2], child[key2], vm, key2);
  }
  return options;
}
function resolveAsset(options, type, id, warnMissing) {
  if (typeof id !== "string") {
    return;
  }
  var assets = options[type];
  if (hasOwn(assets, id))
    return assets[id];
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId))
    return assets[camelizedId];
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId))
    return assets[PascalCaseId];
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  return res;
}
function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value2 = propsData[key];
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, "default")) {
      value2 = false;
    } else if (value2 === "" || value2 === hyphenate(key)) {
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value2 = true;
      }
    }
  }
  if (value2 === void 0) {
    value2 = getPropDefaultValue(vm, prop, key);
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value2);
    toggleObserving(prevShouldObserve);
  }
  return value2;
}
function getPropDefaultValue(vm, prop, key) {
  if (!hasOwn(prop, "default")) {
    return void 0;
  }
  var def2 = prop.default;
  if (vm && vm.$options.propsData && vm.$options.propsData[key] === void 0 && vm._props[key] !== void 0) {
    return vm._props[key];
  }
  return isFunction(def2) && getType(prop.type) !== "Function" ? def2.call(vm) : def2;
}
var functionTypeCheckRE = /^\s*function (\w+)/;
function getType(fn) {
  var match = fn && fn.toString().match(functionTypeCheckRE);
  return match ? match[1] : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (!isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }
  return -1;
}
var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};
function proxy(target2, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target2, key, sharedPropertyDefinition);
}
function initState(vm) {
  var opts2 = vm.$options;
  if (opts2.props)
    initProps$1(vm, opts2.props);
  initSetup(vm);
  if (opts2.methods)
    initMethods(vm, opts2.methods);
  if (opts2.data) {
    initData(vm);
  } else {
    var ob = observe(vm._data = {});
    ob && ob.vmCount++;
  }
  if (opts2.computed)
    initComputed$1(vm, opts2.computed);
  if (opts2.watch && opts2.watch !== nativeWatch) {
    initWatch(vm, opts2.watch);
  }
}
function initProps$1(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props2 = vm._props = shallowReactive({});
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  if (!isRoot) {
    toggleObserving(false);
  }
  var _loop_1 = function(key2) {
    keys.push(key2);
    var value2 = validateProp(key2, propsOptions, propsData, vm);
    {
      defineReactive(props2, key2, value2);
    }
    if (!(key2 in vm)) {
      proxy(vm, "_props", key2);
    }
  };
  for (var key in propsOptions) {
    _loop_1(key);
  }
  toggleObserving(true);
}
function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = isFunction(data) ? getData(data, vm) : data || {};
  if (!isPlainObject(data)) {
    data = {};
  }
  var keys = Object.keys(data);
  var props2 = vm.$options.props;
  vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (props2 && hasOwn(props2, key))
      ;
    else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  var ob = observe(data);
  ob && ob.vmCount++;
}
function getData(data, vm) {
  pushTarget();
  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}
var computedWatcherOptions = { lazy: true };
function initComputed$1(vm, computed) {
  var watchers = vm._computedWatchers = /* @__PURE__ */ Object.create(null);
  var isSSR = isServerRendering();
  for (var key in computed) {
    var userDef = computed[key];
    var getter = isFunction(userDef) ? userDef : userDef.get;
    if (!isSSR) {
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    }
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    }
  }
}
function defineComputed(target2, key, userDef) {
  var shouldCache = !isServerRendering();
  if (isFunction(userDef)) {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  Object.defineProperty(target2, key, sharedPropertyDefinition);
}
function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}
function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}
function initMethods(vm, methods) {
  vm.$options.props;
  for (var key in methods) {
    vm[key] = typeof methods[key] !== "function" ? noop : bind(methods[key], vm);
  }
}
function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}
function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === "string") {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options);
}
function stateMixin(Vue2) {
  var dataDef = {};
  dataDef.get = function() {
    return this._data;
  };
  var propsDef = {};
  propsDef.get = function() {
    return this._props;
  };
  Object.defineProperty(Vue2.prototype, "$data", dataDef);
  Object.defineProperty(Vue2.prototype, "$props", propsDef);
  Vue2.prototype.$set = set;
  Vue2.prototype.$delete = del;
  Vue2.prototype.$watch = function(expOrFn, cb, options) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      var info = 'callback for immediate watcher "'.concat(watcher.expression, '"');
      pushTarget();
      invokeWithErrorHandling(cb, vm, [watcher.value], vm, info);
      popTarget();
    }
    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
var uid = 0;
function initMixin$1(Vue2) {
  Vue2.prototype._init = function(options) {
    var vm = this;
    vm._uid = uid++;
    vm._isVue = true;
    vm.__v_skip = true;
    vm._scope = new EffectScope(true);
    vm._scope._vm = true;
    if (options && options._isComponent) {
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    {
      vm._renderProxy = vm;
    }
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook$1(vm, "beforeCreate", void 0, false);
    initInjections(vm);
    initState(vm);
    initProvide(vm);
    callHook$1(vm, "created");
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}
function initInternalComponent(vm, options) {
  var opts2 = vm.$options = Object.create(vm.constructor.options);
  var parentVnode = options._parentVnode;
  opts2.parent = options.parent;
  opts2._parentVnode = parentVnode;
  var vnodeComponentOptions = parentVnode.componentOptions;
  opts2.propsData = vnodeComponentOptions.propsData;
  opts2._parentListeners = vnodeComponentOptions.listeners;
  opts2._renderChildren = vnodeComponentOptions.children;
  opts2._componentTag = vnodeComponentOptions.tag;
  if (options.render) {
    opts2.render = options.render;
    opts2.staticRenderFns = options.staticRenderFns;
  }
}
function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      Ctor.superOptions = superOptions;
      var modifiedOptions = resolveModifiedOptions(Ctor);
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options;
}
function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified)
        modified = {};
      modified[key] = latest[key];
    }
  }
  return modified;
}
function Vue(options) {
  this._init(options);
}
initMixin$1(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
function initUse(Vue2) {
  Vue2.use = function(plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (isFunction(plugin.install)) {
      plugin.install.apply(plugin, args);
    } else if (isFunction(plugin)) {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this;
  };
}
function initMixin(Vue2) {
  Vue2.mixin = function(mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
function initExtend(Vue2) {
  Vue2.cid = 0;
  var cid = 1;
  Vue2.extend = function(extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }
    var name2 = getComponentName(extendOptions) || getComponentName(Super.options);
    var Sub = function VueComponent(options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub["super"] = Super;
    if (Sub.options.props) {
      initProps(Sub);
    }
    if (Sub.options.computed) {
      initComputed(Sub);
    }
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;
    ASSET_TYPES.forEach(function(type) {
      Sub[type] = Super[type];
    });
    if (name2) {
      Sub.options.components[name2] = Sub;
    }
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);
    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}
function initProps(Comp) {
  var props2 = Comp.options.props;
  for (var key in props2) {
    proxy(Comp.prototype, "_props", key);
  }
}
function initComputed(Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}
function initAssetRegisters(Vue2) {
  ASSET_TYPES.forEach(function(type) {
    Vue2[type] = function(id, definition) {
      if (!definition) {
        return this.options[type + "s"][id];
      } else {
        if (type === "component" && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === "directive" && isFunction(definition)) {
          definition = { bind: definition, update: definition };
        }
        this.options[type + "s"][id] = definition;
        return definition;
      }
    };
  });
}
function _getComponentName(opts2) {
  return opts2 && (getComponentName(opts2.Ctor.options) || opts2.tag);
}
function matches(pattern, name2) {
  if (isArray(pattern)) {
    return pattern.indexOf(name2) > -1;
  } else if (typeof pattern === "string") {
    return pattern.split(",").indexOf(name2) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name2);
  }
  return false;
}
function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache, keys = keepAliveInstance.keys, _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var entry = cache[key];
    if (entry) {
      var name_1 = entry.name;
      if (name_1 && !filter(name_1)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}
function pruneCacheEntry(cache, key, keys, current) {
  var entry = cache[key];
  if (entry && (!current || entry.tag !== current.tag)) {
    entry.componentInstance.$destroy();
  }
  cache[key] = null;
  remove$2(keys, key);
}
var patternTypes = [String, RegExp, Array];
var KeepAlive = {
  name: "keep-alive",
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  methods: {
    cacheVNode: function() {
      var _a = this, cache = _a.cache, keys = _a.keys, vnodeToCache = _a.vnodeToCache, keyToCache = _a.keyToCache;
      if (vnodeToCache) {
        var tag = vnodeToCache.tag, componentInstance = vnodeToCache.componentInstance, componentOptions = vnodeToCache.componentOptions;
        cache[keyToCache] = {
          name: _getComponentName(componentOptions),
          tag,
          componentInstance
        };
        keys.push(keyToCache);
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
        this.vnodeToCache = null;
      }
    }
  },
  created: function() {
    this.cache = /* @__PURE__ */ Object.create(null);
    this.keys = [];
  },
  destroyed: function() {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted: function() {
    var _this = this;
    this.cacheVNode();
    this.$watch("include", function(val) {
      pruneCache(_this, function(name2) {
        return matches(val, name2);
      });
    });
    this.$watch("exclude", function(val) {
      pruneCache(_this, function(name2) {
        return !matches(val, name2);
      });
    });
  },
  updated: function() {
    this.cacheVNode();
  },
  render: function() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      var name_2 = _getComponentName(componentOptions);
      var _a = this, include = _a.include, exclude = _a.exclude;
      if (include && (!name_2 || !matches(include, name_2)) || exclude && name_2 && matches(exclude, name_2)) {
        return vnode;
      }
      var _b = this, cache = _b.cache, keys = _b.keys;
      var key = vnode.key == null ? componentOptions.Ctor.cid + (componentOptions.tag ? "::".concat(componentOptions.tag) : "") : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        remove$2(keys, key);
        keys.push(key);
      } else {
        this.vnodeToCache = vnode;
        this.keyToCache = key;
      }
      vnode.data.keepAlive = true;
    }
    return vnode || slot && slot[0];
  }
};
var builtInComponents = {
  KeepAlive
};
function initGlobalAPI(Vue2) {
  var configDef = {};
  configDef.get = function() {
    return config;
  };
  Object.defineProperty(Vue2, "config", configDef);
  Vue2.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  };
  Vue2.set = set;
  Vue2.delete = del;
  Vue2.nextTick = nextTick;
  Vue2.observable = function(obj) {
    observe(obj);
    return obj;
  };
  Vue2.options = /* @__PURE__ */ Object.create(null);
  ASSET_TYPES.forEach(function(type) {
    Vue2.options[type + "s"] = /* @__PURE__ */ Object.create(null);
  });
  Vue2.options._base = Vue2;
  extend(Vue2.options.components, builtInComponents);
  initUse(Vue2);
  initMixin(Vue2);
  initExtend(Vue2);
  initAssetRegisters(Vue2);
}
initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, "$isServer", {
  get: isServerRendering
});
Object.defineProperty(Vue.prototype, "$ssrContext", {
  get: function() {
    return this.$vnode && this.$vnode.ssrContext;
  }
});
Object.defineProperty(Vue, "FunctionalRenderContext", {
  value: FunctionalRenderContext
});
Vue.version = version;
var isReservedAttr = makeMap("style,class");
var acceptValue = makeMap("input,textarea,option,select,progress");
var mustUseProp = function(tag, type, attr) {
  return attr === "value" && acceptValue(tag) && type !== "button" || attr === "selected" && tag === "option" || attr === "checked" && tag === "input" || attr === "muted" && tag === "video";
};
var isEnumeratedAttr = makeMap("contenteditable,draggable,spellcheck");
var isValidContentEditableValue = makeMap("events,caret,typing,plaintext-only");
var convertEnumeratedValue = function(key, value2) {
  return isFalsyAttrValue(value2) || value2 === "false" ? "false" : key === "contenteditable" && isValidContentEditableValue(value2) ? value2 : "true";
};
var isBooleanAttr = makeMap("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible");
var xlinkNS = "http://www.w3.org/1999/xlink";
var isXlink = function(name2) {
  return name2.charAt(5) === ":" && name2.slice(0, 5) === "xlink";
};
var getXlinkProp = function(name2) {
  return isXlink(name2) ? name2.slice(6, name2.length) : "";
};
var isFalsyAttrValue = function(val) {
  return val == null || val === false;
};
function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode2 = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode2 = parentNode2.parent)) {
    if (parentNode2 && parentNode2.data) {
      data = mergeClassData(data, parentNode2.data);
    }
  }
  return renderClass(data.staticClass, data.class);
}
function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}
function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  return "";
}
function concat(a, b) {
  return a ? b ? a + " " + b : a : b || "";
}
function stringifyClass(value2) {
  if (Array.isArray(value2)) {
    return stringifyArray(value2);
  }
  if (isObject(value2)) {
    return stringifyObject(value2);
  }
  if (typeof value2 === "string") {
    return value2;
  }
  return "";
}
function stringifyArray(value2) {
  var res = "";
  var stringified;
  for (var i = 0, l = value2.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value2[i])) && stringified !== "") {
      if (res)
        res += " ";
      res += stringified;
    }
  }
  return res;
}
function stringifyObject(value2) {
  var res = "";
  for (var key in value2) {
    if (value2[key]) {
      if (res)
        res += " ";
      res += key;
    }
  }
  return res;
}
var namespaceMap = {
  svg: "http://www.w3.org/2000/svg",
  math: "http://www.w3.org/1998/Math/MathML"
};
var isHTMLTag = makeMap("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot");
var isSVG = makeMap("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", true);
var isReservedTag = function(tag) {
  return isHTMLTag(tag) || isSVG(tag);
};
function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return "svg";
  }
  if (tag === "math") {
    return "math";
  }
}
var unknownElementCache = /* @__PURE__ */ Object.create(null);
function isUnknownElement(tag) {
  if (!inBrowser) {
    return true;
  }
  if (isReservedTag(tag)) {
    return false;
  }
  tag = tag.toLowerCase();
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }
  var el = document.createElement(tag);
  if (tag.indexOf("-") > -1) {
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}
var isTextInputType = makeMap("text,number,password,search,email,tel,url");
function query(el) {
  if (typeof el === "string") {
    var selected = document.querySelector(el);
    if (!selected) {
      return document.createElement("div");
    }
    return selected;
  } else {
    return el;
  }
}
function createElement(tagName2, vnode) {
  var elm = document.createElement(tagName2);
  if (tagName2 !== "select") {
    return elm;
  }
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== void 0) {
    elm.setAttribute("multiple", "multiple");
  }
  return elm;
}
function createElementNS(namespace, tagName2) {
  return document.createElementNS(namespaceMap[namespace], tagName2);
}
function createTextNode(text) {
  return document.createTextNode(text);
}
function createComment(text) {
  return document.createComment(text);
}
function insertBefore(parentNode2, newNode, referenceNode) {
  parentNode2.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
  node.removeChild(child);
}
function appendChild(node, child) {
  node.appendChild(child);
}
function parentNode(node) {
  return node.parentNode;
}
function nextSibling(node) {
  return node.nextSibling;
}
function tagName(node) {
  return node.tagName;
}
function setTextContent(node, text) {
  node.textContent = text;
}
function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, "");
}
var nodeOps = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createElement,
  createElementNS,
  createTextNode,
  createComment,
  insertBefore,
  removeChild,
  appendChild,
  parentNode,
  nextSibling,
  tagName,
  setTextContent,
  setStyleScope
});
var ref = {
  create: function(_, vnode) {
    registerRef(vnode);
  },
  update: function(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function(vnode) {
    registerRef(vnode, true);
  }
};
function registerRef(vnode, isRemoval) {
  var ref2 = vnode.data.ref;
  if (!isDef(ref2))
    return;
  var vm = vnode.context;
  var refValue = vnode.componentInstance || vnode.elm;
  var value2 = isRemoval ? null : refValue;
  var $refsValue = isRemoval ? void 0 : refValue;
  if (isFunction(ref2)) {
    invokeWithErrorHandling(ref2, vm, [value2], vm, "template ref function");
    return;
  }
  var isFor = vnode.data.refInFor;
  var _isString = typeof ref2 === "string" || typeof ref2 === "number";
  var _isRef = isRef(ref2);
  var refs = vm.$refs;
  if (_isString || _isRef) {
    if (isFor) {
      var existing = _isString ? refs[ref2] : ref2.value;
      if (isRemoval) {
        isArray(existing) && remove$2(existing, refValue);
      } else {
        if (!isArray(existing)) {
          if (_isString) {
            refs[ref2] = [refValue];
            setSetupRef(vm, ref2, refs[ref2]);
          } else {
            ref2.value = [refValue];
          }
        } else if (!existing.includes(refValue)) {
          existing.push(refValue);
        }
      }
    } else if (_isString) {
      if (isRemoval && refs[ref2] !== refValue) {
        return;
      }
      refs[ref2] = $refsValue;
      setSetupRef(vm, ref2, value2);
    } else if (_isRef) {
      if (isRemoval && ref2.value !== refValue) {
        return;
      }
      ref2.value = value2;
    } else
      ;
  }
}
function setSetupRef(_a, key, val) {
  var _setupState = _a._setupState;
  if (_setupState && hasOwn(_setupState, key)) {
    if (isRef(_setupState[key])) {
      _setupState[key].value = val;
    } else {
      _setupState[key] = val;
    }
  }
}
var emptyNode = new VNode("", {}, []);
var hooks = ["create", "activate", "update", "remove", "destroy"];
function sameVnode(a, b) {
  return a.key === b.key && a.asyncFactory === b.asyncFactory && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error));
}
function sameInputType(a, b) {
  if (a.tag !== "input")
    return true;
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key))
      map[key] = i;
  }
  return map;
}
function createPatchFunction(backend) {
  var i, j;
  var cbs = {};
  var modules2 = backend.modules, nodeOps2 = backend.nodeOps;
  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules2.length; ++j) {
      if (isDef(modules2[j][hooks[i]])) {
        cbs[hooks[i]].push(modules2[j][hooks[i]]);
      }
    }
  }
  function emptyNodeAt(elm) {
    return new VNode(nodeOps2.tagName(elm).toLowerCase(), {}, [], void 0, elm);
  }
  function createRmCb(childElm, listeners) {
    function remove2() {
      if (--remove2.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove2.listeners = listeners;
    return remove2;
  }
  function removeNode(el) {
    var parent = nodeOps2.parentNode(el);
    if (isDef(parent)) {
      nodeOps2.removeChild(parent, el);
    }
  }
  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index2) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      vnode = ownerArray[index2] = cloneVNode(vnode);
    }
    vnode.isRootInsert = !nested;
    if (createComponent2(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }
    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      vnode.elm = vnode.ns ? nodeOps2.createElementNS(vnode.ns, tag) : nodeOps2.createElement(tag, vnode);
      setScope(vnode);
      createChildren(vnode, children, insertedVnodeQueue);
      if (isDef(data)) {
        invokeCreateHooks(vnode, insertedVnodeQueue);
      }
      insert(parentElm, vnode.elm, refElm);
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps2.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps2.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }
  function createComponent2(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i2 = vnode.data;
    if (isDef(i2)) {
      var isReactivated = isDef(vnode.componentInstance) && i2.keepAlive;
      if (isDef(i2 = i2.hook) && isDef(i2 = i2.init)) {
        i2(vnode, false);
      }
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true;
      }
    }
  }
  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      registerRef(vnode);
      insertedVnodeQueue.push(vnode);
    }
  }
  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i2;
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i2 = innerNode.data) && isDef(i2 = i2.transition)) {
        for (i2 = 0; i2 < cbs.activate.length; ++i2) {
          cbs.activate[i2](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break;
      }
    }
    insert(parentElm, vnode.elm, refElm);
  }
  function insert(parent, elm, ref2) {
    if (isDef(parent)) {
      if (isDef(ref2)) {
        if (nodeOps2.parentNode(ref2) === parent) {
          nodeOps2.insertBefore(parent, elm, ref2);
        }
      } else {
        nodeOps2.appendChild(parent, elm);
      }
    }
  }
  function createChildren(vnode, children, insertedVnodeQueue) {
    if (isArray(children)) {
      for (var i_1 = 0; i_1 < children.length; ++i_1) {
        createElm(children[i_1], insertedVnodeQueue, vnode.elm, null, true, children, i_1);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps2.appendChild(vnode.elm, nodeOps2.createTextNode(String(vnode.text)));
    }
  }
  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag);
  }
  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i_2 = 0; i_2 < cbs.create.length; ++i_2) {
      cbs.create[i_2](emptyNode, vnode);
    }
    i = vnode.data.hook;
    if (isDef(i)) {
      if (isDef(i.create))
        i.create(emptyNode, vnode);
      if (isDef(i.insert))
        insertedVnodeQueue.push(vnode);
    }
  }
  function setScope(vnode) {
    var i2;
    if (isDef(i2 = vnode.fnScopeId)) {
      nodeOps2.setStyleScope(vnode.elm, i2);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i2 = ancestor.context) && isDef(i2 = i2.$options._scopeId)) {
          nodeOps2.setStyleScope(vnode.elm, i2);
        }
        ancestor = ancestor.parent;
      }
    }
    if (isDef(i2 = activeInstance) && i2 !== vnode.context && i2 !== vnode.fnContext && isDef(i2 = i2.$options._scopeId)) {
      nodeOps2.setStyleScope(vnode.elm, i2);
    }
  }
  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }
  function invokeDestroyHook(vnode) {
    var i2, j2;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i2 = data.hook) && isDef(i2 = i2.destroy))
        i2(vnode);
      for (i2 = 0; i2 < cbs.destroy.length; ++i2)
        cbs.destroy[i2](vnode);
    }
    if (isDef(i2 = vnode.children)) {
      for (j2 = 0; j2 < vnode.children.length; ++j2) {
        invokeDestroyHook(vnode.children[j2]);
      }
    }
  }
  function removeVnodes(vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          removeNode(ch.elm);
        }
      }
    }
  }
  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i_3;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        rm.listeners += listeners;
      } else {
        rm = createRmCb(vnode.elm, listeners);
      }
      if (isDef(i_3 = vnode.componentInstance) && isDef(i_3 = i_3._vnode) && isDef(i_3.data)) {
        removeAndInvokeRemoveHook(i_3, rm);
      }
      for (i_3 = 0; i_3 < cbs.remove.length; ++i_3) {
        cbs.remove[i_3](vnode, rm);
      }
      if (isDef(i_3 = vnode.data.hook) && isDef(i_3 = i_3.remove)) {
        i_3(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }
  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;
    var canMove = !removeOnly;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx];
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps2.insertBefore(parentElm, oldStartVnode.elm, nodeOps2.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps2.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx))
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) {
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = void 0;
            canMove && nodeOps2.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }
  function findIdxInOld(node, oldCh, start, end) {
    for (var i_5 = start; i_5 < end; i_5++) {
      var c = oldCh[i_5];
      if (isDef(c) && sameVnode(node, c))
        return i_5;
    }
  }
  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index2, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      vnode = ownerArray[index2] = cloneVNode(vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return;
    }
    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }
    var i2;
    var data = vnode.data;
    if (isDef(data) && isDef(i2 = data.hook) && isDef(i2 = i2.prepatch)) {
      i2(oldVnode, vnode);
    }
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i2 = 0; i2 < cbs.update.length; ++i2)
        cbs.update[i2](oldVnode, vnode);
      if (isDef(i2 = data.hook) && isDef(i2 = i2.update))
        i2(oldVnode, vnode);
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch)
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text))
          nodeOps2.setTextContent(elm, "");
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps2.setTextContent(elm, "");
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps2.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i2 = data.hook) && isDef(i2 = i2.postpatch))
        i2(oldVnode, vnode);
    }
  }
  function invokeInsertHook(vnode, queue2, initial) {
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue2;
    } else {
      for (var i_6 = 0; i_6 < queue2.length; ++i_6) {
        queue2[i_6].data.hook.insert(queue2[i_6]);
      }
    }
  }
  var isRenderedModule = makeMap("attrs,class,staticClass,staticStyle,key");
  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i2;
    var tag = vnode.tag, data = vnode.data, children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;
    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    }
    if (isDef(data)) {
      if (isDef(i2 = data.hook) && isDef(i2 = i2.init))
        i2(vnode, true);
      if (isDef(i2 = vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          if (isDef(i2 = data) && isDef(i2 = i2.domProps) && isDef(i2 = i2.innerHTML)) {
            if (i2 !== elm.innerHTML) {
              return false;
            }
          } else {
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i_7 = 0; i_7 < children.length; i_7++) {
              if (!childNode || !hydrate(childNode, children[i_7], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }
              childNode = childNode.nextSibling;
            }
            if (!childrenMatch || childNode) {
              return false;
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }
        if (!fullInvoke && data["class"]) {
          traverse(data["class"]);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true;
  }
  return function patch2(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode))
        invokeDestroyHook(oldVnode);
      return;
    }
    var isInitialPatch = false;
    var insertedVnodeQueue = [];
    if (isUndef(oldVnode)) {
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            }
          }
          oldVnode = emptyNodeAt(oldVnode);
        }
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps2.parentNode(oldElm);
        createElm(vnode, insertedVnodeQueue, oldElm._leaveCb ? null : parentElm, nodeOps2.nextSibling(oldElm));
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i_8 = 0; i_8 < cbs.destroy.length; ++i_8) {
              cbs.destroy[i_8](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i_9 = 0; i_9 < cbs.create.length; ++i_9) {
                cbs.create[i_9](emptyNode, ancestor);
              }
              var insert_1 = ancestor.data.hook.insert;
              if (insert_1.merged) {
                for (var i_10 = 1; i_10 < insert_1.fns.length; i_10++) {
                  insert_1.fns[i_10]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }
    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}
var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};
function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}
function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives(vnode.data.directives, vnode.context);
  var dirsWithInsert = [];
  var dirsWithPostpatch = [];
  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      callHook(dir, "bind", vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook(dir, "update", vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }
  if (dirsWithInsert.length) {
    var callInsert = function() {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook(dirsWithInsert[i], "inserted", vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, "insert", callInsert);
    } else {
      callInsert();
    }
  }
  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, "postpatch", function() {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook(dirsWithPostpatch[i], "componentUpdated", vnode, oldVnode);
      }
    });
  }
  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        callHook(oldDirs[key], "unbind", oldVnode, oldVnode, isDestroy);
      }
    }
  }
}
var emptyModifiers = /* @__PURE__ */ Object.create(null);
function normalizeDirectives(dirs, vm) {
  var res = /* @__PURE__ */ Object.create(null);
  if (!dirs) {
    return res;
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    if (vm._setupState && vm._setupState.__sfc) {
      var setupDef = dir.def || resolveAsset(vm, "_setupState", "v-" + dir.name);
      if (typeof setupDef === "function") {
        dir.def = {
          bind: setupDef,
          update: setupDef
        };
      } else {
        dir.def = setupDef;
      }
    }
    dir.def = dir.def || resolveAsset(vm.$options, "directives", dir.name);
  }
  return res;
}
function getRawDirName(dir) {
  return dir.rawName || "".concat(dir.name, ".").concat(Object.keys(dir.modifiers || {}).join("."));
}
function callHook(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive ".concat(dir.name, " ").concat(hook, " hook"));
    }
  }
}
var baseModules = [ref, directives];
function updateAttrs(oldVnode, vnode) {
  var opts2 = vnode.componentOptions;
  if (isDef(opts2) && opts2.Ctor.options.inheritAttrs === false) {
    return;
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs2 = vnode.data.attrs || {};
  if (isDef(attrs2.__ob__) || isTrue(attrs2._v_attr_proxy)) {
    attrs2 = vnode.data.attrs = extend({}, attrs2);
  }
  for (key in attrs2) {
    cur = attrs2[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur, vnode.data.pre);
    }
  }
  if ((isIE || isEdge) && attrs2.value !== oldAttrs.value) {
    setAttr(elm, "value", attrs2.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs2[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}
function setAttr(el, key, value2, isInPre) {
  if (isInPre || el.tagName.indexOf("-") > -1) {
    baseSetAttr(el, key, value2);
  } else if (isBooleanAttr(key)) {
    if (isFalsyAttrValue(value2)) {
      el.removeAttribute(key);
    } else {
      value2 = key === "allowfullscreen" && el.tagName === "EMBED" ? "true" : key;
      el.setAttribute(key, value2);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value2));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value2)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value2);
    }
  } else {
    baseSetAttr(el, key, value2);
  }
}
function baseSetAttr(el, key, value2) {
  if (isFalsyAttrValue(value2)) {
    el.removeAttribute(key);
  } else {
    if (isIE && !isIE9 && el.tagName === "TEXTAREA" && key === "placeholder" && value2 !== "" && !el.__ieph) {
      var blocker_1 = function(e) {
        e.stopImmediatePropagation();
        el.removeEventListener("input", blocker_1);
      };
      el.addEventListener("input", blocker_1);
      el.__ieph = true;
    }
    el.setAttribute(key, value2);
  }
}
var attrs = {
  create: updateAttrs,
  update: updateAttrs
};
function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }
  var cls = genClassForVnode(vnode);
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }
  if (cls !== el._prevClass) {
    el.setAttribute("class", cls);
    el._prevClass = cls;
  }
}
var klass = {
  create: updateClass,
  update: updateClass
};
var RANGE_TOKEN = "__r";
var CHECKBOX_RADIO_TOKEN = "__c";
function normalizeEvents(on) {
  if (isDef(on[RANGE_TOKEN])) {
    var event_1 = isIE ? "change" : "input";
    on[event_1] = [].concat(on[RANGE_TOKEN], on[event_1] || []);
    delete on[RANGE_TOKEN];
  }
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}
var target;
function createOnceHandler(event, handler, capture) {
  var _target = target;
  return function onceHandler() {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove(event, onceHandler, capture, _target);
    }
  };
}
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);
function add(name2, handler, capture, passive) {
  if (useMicrotaskFix) {
    var attachedTimestamp_1 = currentFlushTimestamp;
    var original_1 = handler;
    handler = original_1._wrapper = function(e) {
      if (e.target === e.currentTarget || e.timeStamp >= attachedTimestamp_1 || e.timeStamp <= 0 || e.target.ownerDocument !== document) {
        return original_1.apply(this, arguments);
      }
    };
  }
  target.addEventListener(name2, handler, supportsPassive ? { capture, passive } : capture);
}
function remove(name2, handler, capture, _target) {
  (_target || target).removeEventListener(name2, handler._wrapper || handler, capture);
}
function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target = vnode.elm || oldVnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add, remove, createOnceHandler, vnode.context);
  target = void 0;
}
var events = {
  create: updateDOMListeners,
  update: updateDOMListeners,
  destroy: function(vnode) {
    return updateDOMListeners(vnode, emptyNode);
  }
};
var svgContainer;
function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props2 = vnode.data.domProps || {};
  if (isDef(props2.__ob__) || isTrue(props2._v_attr_proxy)) {
    props2 = vnode.data.domProps = extend({}, props2);
  }
  for (key in oldProps) {
    if (!(key in props2)) {
      elm[key] = "";
    }
  }
  for (key in props2) {
    cur = props2[key];
    if (key === "textContent" || key === "innerHTML") {
      if (vnode.children)
        vnode.children.length = 0;
      if (cur === oldProps[key])
        continue;
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }
    if (key === "value" && elm.tagName !== "PROGRESS") {
      elm._value = cur;
      var strCur = isUndef(cur) ? "" : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === "innerHTML" && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      svgContainer = svgContainer || document.createElement("div");
      svgContainer.innerHTML = "<svg>".concat(cur, "</svg>");
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (cur !== oldProps[key]) {
      try {
        elm[key] = cur;
      } catch (e) {
      }
    }
  }
}
function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === "OPTION" || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}
function isNotInFocusAndDirty(elm, checkVal) {
  var notInFocus = true;
  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {
  }
  return notInFocus && elm.value !== checkVal;
}
function isDirtyWithModifiers(elm, newVal) {
  var value2 = elm.value;
  var modifiers = elm._vModifiers;
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value2) !== toNumber(newVal);
    }
    if (modifiers.trim) {
      return value2.trim() !== newVal.trim();
    }
  }
  return value2 !== newVal;
}
var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};
var parseStyleText = cached(function(cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function(item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
});
function normalizeStyleData(data) {
  var style2 = normalizeStyleBinding(data.style);
  return data.staticStyle ? extend(data.staticStyle, style2) : style2;
}
function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }
  if (typeof bindingStyle === "string") {
    return parseStyleText(bindingStyle);
  }
  return bindingStyle;
}
function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;
  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }
  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }
  var parentNode2 = vnode;
  while (parentNode2 = parentNode2.parent) {
    if (parentNode2.data && (styleData = normalizeStyleData(parentNode2.data))) {
      extend(res, styleData);
    }
  }
  return res;
}
var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function(el, name2, val) {
  if (cssVarRE.test(name2)) {
    el.style.setProperty(name2, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name2), val.replace(importantRE, ""), "important");
  } else {
    var normalizedName = normalize(name2);
    if (Array.isArray(val)) {
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};
var vendorNames = ["Webkit", "Moz", "ms"];
var emptyStyle;
var normalize = cached(function(prop) {
  emptyStyle = emptyStyle || document.createElement("div").style;
  prop = camelize(prop);
  if (prop !== "filter" && prop in emptyStyle) {
    return prop;
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name_1 = vendorNames[i] + capName;
    if (name_1 in emptyStyle) {
      return name_1;
    }
  }
});
function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }
  var cur, name2;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};
  var oldStyle = oldStaticStyle || oldStyleBinding;
  var style2 = normalizeStyleBinding(vnode.data.style) || {};
  vnode.data.normalizedStyle = isDef(style2.__ob__) ? extend({}, style2) : style2;
  var newStyle = getStyle(vnode, true);
  for (name2 in oldStyle) {
    if (isUndef(newStyle[name2])) {
      setProp(el, name2, "");
    }
  }
  for (name2 in newStyle) {
    cur = newStyle[name2];
    if (cur !== oldStyle[name2]) {
      setProp(el, name2, cur == null ? "" : cur);
    }
  }
}
var style$1 = {
  create: updateStyle,
  update: updateStyle
};
var whitespaceRE = /\s+/;
function addClass(el, cls) {
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  if (el.classList) {
    if (cls.indexOf(" ") > -1) {
      cls.split(whitespaceRE).forEach(function(c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " ".concat(el.getAttribute("class") || "", " ");
    if (cur.indexOf(" " + cls + " ") < 0) {
      el.setAttribute("class", (cur + cls).trim());
    }
  }
}
function removeClass(el, cls) {
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  if (el.classList) {
    if (cls.indexOf(" ") > -1) {
      cls.split(whitespaceRE).forEach(function(c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute("class");
    }
  } else {
    var cur = " ".concat(el.getAttribute("class") || "", " ");
    var tar = " " + cls + " ";
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, " ");
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute("class", cur);
    } else {
      el.removeAttribute("class");
    }
  }
}
function resolveTransition(def2) {
  if (!def2) {
    return;
  }
  if (typeof def2 === "object") {
    var res = {};
    if (def2.css !== false) {
      extend(res, autoCssTransition(def2.name || "v"));
    }
    extend(res, def2);
    return res;
  } else if (typeof def2 === "string") {
    return autoCssTransition(def2);
  }
}
var autoCssTransition = cached(function(name2) {
  return {
    enterClass: "".concat(name2, "-enter"),
    enterToClass: "".concat(name2, "-enter-to"),
    enterActiveClass: "".concat(name2, "-enter-active"),
    leaveClass: "".concat(name2, "-leave"),
    leaveToClass: "".concat(name2, "-leave-to"),
    leaveActiveClass: "".concat(name2, "-leave-active")
  };
});
var hasTransition = inBrowser && !isIE9;
var TRANSITION = "transition";
var ANIMATION = "animation";
var transitionProp = "transition";
var transitionEndEvent = "transitionend";
var animationProp = "animation";
var animationEndEvent = "animationend";
if (hasTransition) {
  if (window.ontransitionend === void 0 && window.onwebkittransitionend !== void 0) {
    transitionProp = "WebkitTransition";
    transitionEndEvent = "webkitTransitionEnd";
  }
  if (window.onanimationend === void 0 && window.onwebkitanimationend !== void 0) {
    animationProp = "WebkitAnimation";
    animationEndEvent = "webkitAnimationEnd";
  }
}
var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : function(fn) {
  return fn();
};
function nextFrame(fn) {
  raf(function() {
    raf(fn);
  });
}
function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}
function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove$2(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}
function whenTransitionEnds(el, expectedType, cb) {
  var _a = getTransitionInfo(el, expectedType), type = _a.type, timeout = _a.timeout, propCount = _a.propCount;
  if (!type)
    return cb();
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function() {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function(e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function() {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}
var transformRE = /\b(transform|all)(,|$)/;
function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = (styles[transitionProp + "Delay"] || "").split(", ");
  var transitionDurations = (styles[transitionProp + "Duration"] || "").split(", ");
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + "Delay"] || "").split(", ");
  var animationDurations = (styles[animationProp + "Duration"] || "").split(", ");
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  var type;
  var timeout = 0;
  var propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + "Property"]);
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max.apply(null, durations.map(function(d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
}
function toMs(s) {
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function enter(vnode, toggleDisplay) {
  var el = vnode.elm;
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }
  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return;
  }
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }
  var css = data.css, type = data.type, enterClass = data.enterClass, enterToClass = data.enterToClass, enterActiveClass = data.enterActiveClass, appearClass = data.appearClass, appearToClass = data.appearToClass, appearActiveClass = data.appearActiveClass, beforeEnter = data.beforeEnter, enter2 = data.enter, afterEnter = data.afterEnter, enterCancelled = data.enterCancelled, beforeAppear = data.beforeAppear, appear = data.appear, afterAppear = data.afterAppear, appearCancelled = data.appearCancelled, duration = data.duration;
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }
  var isAppear = !context._isMounted || !vnode.isRootInsert;
  if (isAppear && !appear && appear !== "") {
    return;
  }
  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? isFunction(appear) ? appear : enter2 : enter2;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);
  var cb = el._enterCb = once(function() {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });
  if (!vnode.data.show) {
    mergeVNodeHook(vnode, "insert", function() {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function() {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }
  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }
  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}
function leave(vnode, rm) {
  var el = vnode.elm;
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }
  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }
  if (isDef(el._leaveCb)) {
    return;
  }
  var css = data.css, type = data.type, leaveClass = data.leaveClass, leaveToClass = data.leaveToClass, leaveActiveClass = data.leaveActiveClass, beforeLeave = data.beforeLeave, leave2 = data.leave, afterLeave = data.afterLeave, leaveCancelled = data.leaveCancelled, delayLeave = data.delayLeave, duration = data.duration;
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave2);
  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);
  var cb = el._leaveCb = once(function() {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });
  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }
  function performLeave() {
    if (cb.cancelled) {
      return;
    }
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function() {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave2 && leave2(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}
function isValidDuration(val) {
  return typeof val === "number" && !isNaN(val);
}
function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}
function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}
var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function(vnode, rm) {
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};
var platformModules = [attrs, klass, events, domProps, style$1, transition];
var modules = platformModules.concat(baseModules);
var patch = createPatchFunction({ nodeOps, modules });
if (isIE9) {
  document.addEventListener("selectionchange", function() {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, "input");
    }
  });
}
var directive = {
  inserted: function(el, binding, vnode, oldVnode) {
    if (vnode.tag === "select") {
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, "postpatch", function() {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === "textarea" || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener("compositionstart", onCompositionStart);
        el.addEventListener("compositionend", onCompositionEnd);
        el.addEventListener("change", onCompositionEnd);
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function(el, binding, vnode) {
    if (vnode.tag === "select") {
      setSelected(el, binding, vnode.context);
      var prevOptions_1 = el._vOptions;
      var curOptions_1 = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions_1.some(function(o, i) {
        return !looseEqual(o, prevOptions_1[i]);
      })) {
        var needReset = el.multiple ? binding.value.some(function(v) {
          return hasNoMatchingOption(v, curOptions_1);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions_1);
        if (needReset) {
          trigger(el, "change");
        }
      }
    }
  }
};
function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding);
  if (isIE || isEdge) {
    setTimeout(function() {
      actuallySetSelected(el, binding);
    }, 0);
  }
}
function actuallySetSelected(el, binding, vm) {
  var value2 = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value2)) {
    return;
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value2, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value2)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return;
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}
function hasNoMatchingOption(value2, options) {
  return options.every(function(o) {
    return !looseEqual(o, value2);
  });
}
function getValue(option) {
  return "_value" in option ? option._value : option.value;
}
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  if (!e.target.composing)
    return;
  e.target.composing = false;
  trigger(e.target, "input");
}
function trigger(el, type) {
  var e = document.createEvent("HTMLEvents");
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}
function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}
var show = {
  bind: function(el, _a, vnode) {
    var value2 = _a.value;
    vnode = locateNode(vnode);
    var transition2 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === "none" ? "" : el.style.display;
    if (value2 && transition2) {
      vnode.data.show = true;
      enter(vnode, function() {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value2 ? originalDisplay : "none";
    }
  },
  update: function(el, _a, vnode) {
    var value2 = _a.value, oldValue = _a.oldValue;
    if (!value2 === !oldValue)
      return;
    vnode = locateNode(vnode);
    var transition2 = vnode.data && vnode.data.transition;
    if (transition2) {
      vnode.data.show = true;
      if (value2) {
        enter(vnode, function() {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function() {
          el.style.display = "none";
        });
      }
    } else {
      el.style.display = value2 ? el.__vOriginalDisplay : "none";
    }
  },
  unbind: function(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};
var platformDirectives = {
  model: directive,
  show
};
var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};
function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}
function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options;
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  var listeners = options._parentListeners;
  for (var key in listeners) {
    data[camelize(key)] = listeners[key];
  }
  return data;
}
function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h("keep-alive", {
      props: rawChild.componentOptions.propsData
    });
  }
}
function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}
function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}
var isNotTextNode = function(c) {
  return c.tag || isAsyncPlaceholder(c);
};
var isVShowDirective = function(d) {
  return d.name === "show";
};
var Transition = {
  name: "transition",
  props: transitionProps,
  abstract: true,
  render: function(h) {
    var _this = this;
    var children = this.$slots.default;
    if (!children) {
      return;
    }
    children = children.filter(isNotTextNode);
    if (!children.length) {
      return;
    }
    var mode = this.mode;
    var rawChild = children[0];
    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    }
    var child = getRealChild(rawChild);
    if (!child) {
      return rawChild;
    }
    if (this._leaving) {
      return placeholder(h, rawChild);
    }
    var id = "__transition-".concat(this._uid, "-");
    child.key = child.key == null ? child.isComment ? id + "comment" : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }
    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      var oldData = oldChild.data.transition = extend({}, data);
      if (mode === "out-in") {
        this._leaving = true;
        mergeVNodeHook(oldData, "afterLeave", function() {
          _this._leaving = false;
          _this.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === "in-out") {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }
        var delayedLeave_1;
        var performLeave = function() {
          delayedLeave_1();
        };
        mergeVNodeHook(data, "afterEnter", performLeave);
        mergeVNodeHook(data, "enterCancelled", performLeave);
        mergeVNodeHook(oldData, "delayLeave", function(leave2) {
          delayedLeave_1 = leave2;
        });
      }
    }
    return rawChild;
  }
};
var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
  props,
  beforeMount: function() {
    var _this = this;
    var update = this._update;
    this._update = function(vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(_this);
      _this.__patch__(_this._vnode, _this.kept, false, true);
      _this._vnode = _this.kept;
      restoreActiveInstance();
      update.call(_this, vnode, hydrating);
    };
  },
  render: function(h) {
    var tag = this.tag || this.$vnode.data.tag || "span";
    var map = /* @__PURE__ */ Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);
    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf("__vlist") !== 0) {
          children.push(c);
          map[c.key] = c;
          (c.data || (c.data = {})).transition = transitionData;
        }
      }
    }
    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i = 0; i < prevChildren.length; i++) {
        var c = prevChildren[i];
        c.data.transition = transitionData;
        c.data.pos = c.elm.getBoundingClientRect();
        if (map[c.key]) {
          kept.push(c);
        } else {
          removed.push(c);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }
    return h(tag, null, children);
  },
  updated: function() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || "v") + "-move";
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    }
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);
    this._reflow = document.body.offsetHeight;
    children.forEach(function(c) {
      if (c.data.moved) {
        var el_1 = c.elm;
        var s = el_1.style;
        addTransitionClass(el_1, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = "";
        el_1.addEventListener(transitionEndEvent, el_1._moveCb = function cb(e) {
          if (e && e.target !== el_1) {
            return;
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el_1.removeEventListener(transitionEndEvent, cb);
            el_1._moveCb = null;
            removeTransitionClass(el_1, moveClass);
          }
        });
      }
    });
  },
  methods: {
    hasMove: function(el, moveClass) {
      if (!hasTransition) {
        return false;
      }
      if (this._hasMove) {
        return this._hasMove;
      }
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function(cls) {
          removeClass(clone, cls);
        });
      }
      addClass(clone, moveClass);
      clone.style.display = "none";
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};
function callPendingCbs(c) {
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}
function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}
function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(".concat(dx, "px,").concat(dy, "px)");
    s.transitionDuration = "0s";
  }
}
var platformComponents = {
  Transition,
  TransitionGroup
};
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);
Vue.prototype.__patch__ = inBrowser ? patch : noop;
Vue.prototype.$mount = function(el, hydrating) {
  el = el && inBrowser ? query(el) : void 0;
  return mountComponent(this, el, hydrating);
};
if (inBrowser) {
  setTimeout(function() {
    if (config.devtools) {
      if (devtools) {
        devtools.emit("init", Vue);
      }
    }
  }, 0);
}
var render$b = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(_vm.componentTag, _vm._g(_vm._b({
    tag: "component",
    staticClass: "t-button",
    class: _vm.rootClasses,
    attrs: {
      "href": _vm.href,
      "to": _vm.currentTo,
      "type": _vm.currentType,
      "disabled": _vm.hasDisabled
    },
    on: {
      "!click": function($event) {
        $event.stopPropagation();
        return _vm.onClick.apply(null, arguments);
      }
    }
  }, "component", _vm.$attrs, false), _vm.$listeners), [_c("span", {
    staticClass: "t-button__inner"
  }, [_vm.hasLabelShow ? _c("span", {
    staticClass: "t-button__label",
    attrs: {
      "data-testid": "button-label"
    }
  }, [_vm._t("default", function() {
    return [_vm._v(_vm._s(_vm.label))];
  })], 2) : _vm._e()])]);
};
var staticRenderFns$b = [];
var Button_vue_vue_type_style_index_0_lang = "";
function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
const __vue2_script$b = {
  name: "TButton",
  components: {},
  props: {
    label: {
      type: String,
      default: ""
    },
    href: {
      type: String,
      default: void 0
    },
    to: {
      type: [String, Object],
      default: void 0
    },
    theme: {
      type: String,
      default: "primary",
      validator: (value2) => ["primary", "secondary", "black", "danger"].includes(value2)
    },
    size: {
      type: String,
      default: "md",
      validator: (value2) => ["sm", "md", "lg"].includes(value2)
    },
    type: {
      type: String,
      default: "button"
    },
    prependIcon: {
      type: String,
      default: ""
    },
    appendIcon: {
      type: String,
      default: ""
    },
    isPrependIconStroke: {
      type: Boolean,
      default: false
    },
    isAppendIconStroke: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: false
    },
    isFluid: {
      type: Boolean,
      default: false
    },
    isRounded: {
      type: Boolean,
      default: false
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    stopPropagation: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    componentTag() {
      if (this.href !== void 0) {
        return "a";
      }
      return this.to !== void 0 ? "router-link" : "button";
    },
    currentTo() {
      return this.componentTag === "router-link" ? this.to : void 0;
    },
    rootClasses() {
      return [
        `t-button--theme-${this.theme}`,
        `t-button--size-${this.size}`,
        {
          "t-button--link": this.hasLinkButton,
          "t-button--with-prepend": this.hasPrependShow,
          "t-button--with-append": this.hasAppendShow,
          "t-button--with-label": this.hasLabelShow,
          "t-button--fluid": this.isFluid,
          "t-button--rounded": this.isRounded,
          "t-button--disabled": this.hasDisabled,
          "t-button--loading": this.loading,
          "t-button--icon": this.icon,
          "t-button--selected": this.isSelected
        }
      ];
    },
    currentType() {
      return this.hasLinkButton ? null : this.type;
    },
    hasLinkButton() {
      return !!(this.href || this.to);
    },
    hasDisabled() {
      return this.disabled || this.loading;
    },
    hasPrependShow() {
      return !!(this.prependIcon || this.$slots.prepend);
    },
    hasLabelShow() {
      return !!(this.label || this.$slots.default);
    },
    hasAppendShow() {
      return !!(this.appendIcon || this.$slots.append);
    }
  },
  methods: {
    onClick(event) {
      if (this.stopPropagation) {
        event.stopPropagation();
      }
      if (this.hasDisabled) {
        if (this.hasLinkButton) {
          event.preventDefault();
          event.stopPropagation();
        }
        return;
      }
      this.$emit("click", event);
    }
  }
};
const __cssModules$b = {};
var __component__$b = /* @__PURE__ */ normalizeComponent(__vue2_script$b, render$b, staticRenderFns$b, false, __vue2_injectStyles$b, null, null, null);
function __vue2_injectStyles$b(context) {
  for (let o in __cssModules$b) {
    this[o] = __cssModules$b[o];
  }
}
var TButton = /* @__PURE__ */ function() {
  return __component__$b.exports;
}();
var render$a = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    staticClass: "load-file-form"
  }, [_c("div", {
    staticClass: "load-file-form__title"
  }, [_vm._v("Load view from JSON")]), _vm._v(" "), _c("input", {
    ref: "jsonFile",
    staticClass: "load-file-form__file",
    attrs: {
      "type": "file"
    }
  }), _vm._v(" "), !_vm.isOnLoad ? _c("TButton", {
    on: {
      "click": _vm.onLoadToFile
    }
  }, [_vm._v("Load")]) : _vm._e(), _vm._v(" "), _vm.isOnLoad ? _c("TButton", {
    on: {
      "click": _vm.onResume
    }
  }, [_vm._v("Resume")]) : _vm._e()], 1);
};
var staticRenderFns$a = [];
var LoadFileForm_vue_vue_type_style_index_0_lang = "";
const __vue2_script$a = {
  components: {
    TButton
  },
  data() {
    return {
      isOnLoad: false
    };
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    onLoadToFile() {
      this.isOnLoad = true;
      window.isPause = true;
      let file = this.$refs["jsonFile"].files[0];
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function() {
        const addStartJSON = JSON.parse(reader.result);
        for (let k in addStartJSON) {
          const item = [
            addStartJSON[k][0] - window.centerMassVector.x,
            addStartJSON[k][1] - window.centerMassVector.y,
            addStartJSON[k][2],
            addStartJSON[k][3]
          ];
          window.dataArr.push(item);
        }
        window.core.refresh();
      };
      reader.onerror = function() {
        console.log(reader.error);
      };
    },
    onResume() {
      this.isOnLoad = false;
      window.isPause = false;
    }
  }
};
const __cssModules$a = {};
var __component__$a = /* @__PURE__ */ normalizeComponent(__vue2_script$a, render$a, staticRenderFns$a, false, __vue2_injectStyles$a, null, null, null);
function __vue2_injectStyles$a(context) {
  for (let o in __cssModules$a) {
    this[o] = __cssModules$a[o];
  }
}
var LoadFileForm = /* @__PURE__ */ function() {
  return __component__$a.exports;
}();
var render$9 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    directives: [{
      name: "fragment",
      rawName: "v-fragment"
    }]
  }, [_c("div", {
    staticClass: "t-input",
    class: _vm.classes
  }, [_c("label", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.showLabel,
      expression: "showLabel"
    }],
    staticClass: "t-input__label",
    class: _vm.labelClassModifier
  }, [_vm._v("\n      " + _vm._s(_vm.label) + " "), _vm.required ? _c("span", {
    staticClass: "t-input__asterisk"
  }, [_vm._v("*")]) : _vm._e()]), _vm._v(" "), _c("input", {
    ref: "inputField",
    staticClass: "t-input__input",
    class: _vm.computedInputClasses,
    attrs: {
      "maxlength": _vm.maxlength,
      "disabled": _vm.disabled,
      "placeholder": _vm.inputPlaceholder,
      "type": _vm.inputType,
      "inputmode": _vm.inputMode
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": function($event) {
        return _vm.updateValue($event.target.value);
      },
      "focus": function($event) {
        return _vm.onFocus(true);
      },
      "blur": function($event) {
        return _vm.onBlur(false);
      },
      "click": _vm.emitClick
    }
  })]), _vm._v(" "), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.showError,
      expression: "showError"
    }],
    staticClass: "t-input__error-message",
    class: _vm.errorMessageClass
  }, [_vm._v("\n    " + _vm._s(_vm.errorMessage) + "\n  ")]), _vm._v(" "), _c("div", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.isHintNeeded,
      expression: "isHintNeeded"
    }],
    staticClass: "t-input__hint"
  }, [_vm._v("\n    " + _vm._s(_vm.hint) + "\n  ")])]);
};
var staticRenderFns$9 = [];
var Input_vue_vue_type_style_index_0_lang = "";
const __vue2_script$9 = {
  name: "TInput",
  props: {
    value: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    labelClassModifier: {
      type: String,
      default: ""
    },
    primary: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "full",
      validator: (value2) => ["sm", "md", "lg", "full"].includes(value2)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: " "
    },
    error: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ""
    },
    inputClass: {
      type: String,
      default: ""
    },
    inputType: {
      type: String,
      default: "text"
    },
    inputMode: {
      type: String,
      default: "text"
    },
    hint: {
      type: String,
      default: ""
    },
    errorMessageClass: {
      type: String,
      default: ""
    },
    success: {
      type: Boolean,
      default: false
    },
    isNeedHideHint: {
      type: Boolean,
      default: false
    },
    isHintHidden: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 9999
    }
  },
  data() {
    return {
      isLabelVisible: false,
      isHintVisible: true
    };
  },
  computed: {
    classes() {
      return {
        "t-input--primary": this.primary,
        "t-input--secondary": !this.primary,
        "t-input--with-label": !!this.label,
        "t-input--disabled": this.disabled,
        "t-input--error": this.error,
        "t-input--success": this.success,
        [`t-input--size-${this.size}`]: true,
        [this.inputClass]: true
      };
    },
    showLabel() {
      return this.label && this.value || this.isLabelVisible;
    },
    computedInputClasses() {
      return {
        "t-input__input--value-exists": this.value
      };
    },
    showError() {
      return this.error && this.errorMessage;
    },
    inputPlaceholder() {
      return this.required ? `${this.placeholder} *` : this.placeholder;
    },
    isHintNeeded() {
      return !this.isHintHidden && this.hint && this.isHintVisible;
    }
  },
  methods: {
    updateValue(value2) {
      if (this.isDropdownMode) {
        this.isDropdownOpened = true;
      }
      this.$emit("input", value2);
    },
    displayLabel(isVisible) {
      if (this.label) {
        this.isLabelVisible = isVisible;
      }
    },
    emitClick() {
      this.$emit("click");
    },
    onFocus(isVisible) {
      this.changeHintVisibility();
      this.displayLabel(isVisible);
      this.$emit("focus");
    },
    onBlur(isVisible) {
      this.displayLabel(isVisible);
      this.$emit("blur");
    },
    changeHintVisibility() {
      if (this.isNeedHideHint) {
        this.isHintVisible = false;
      }
    }
  }
};
const __cssModules$9 = {};
var __component__$9 = /* @__PURE__ */ normalizeComponent(__vue2_script$9, render$9, staticRenderFns$9, false, __vue2_injectStyles$9, null, null, null);
function __vue2_injectStyles$9(context) {
  for (let o in __cssModules$9) {
    this[o] = __cssModules$9[o];
  }
}
var TInput = /* @__PURE__ */ function() {
  return __component__$9.exports;
}();
var render$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    staticClass: "save-file-form"
  }, [_c("div", {
    staticClass: "save-file-form__title"
  }, [_vm._v("Save view to JSON")]), _vm._v(" "), !_vm.isOnSave ? _c("TButton", {
    on: {
      "click": _vm.onSaveToFile
    }
  }, [_vm._v("Save")]) : _vm._e(), _vm._v(" "), _vm.isOnSave ? _c("TButton", {
    on: {
      "click": _vm.onResume
    }
  }, [_vm._v("Resume")]) : _vm._e()], 1);
};
var staticRenderFns$8 = [];
var SaveFileForm_vue_vue_type_style_index_0_lang = "";
const __vue2_script$8 = {
  components: {
    TButton,
    TInput
  },
  data() {
    return {
      isOnSave: false
    };
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    onSaveToFile() {
      this.isOnSave = true;
      const link = document.createElement("a");
      window.isPause = true;
      const content = JSON.stringify(window.dataArr);
      const file = new Blob([content], { type: "text/plain" });
      link.href = URL.createObjectURL(file);
      link.download = "data.txt";
      link.click();
      URL.revokeObjectURL(link.href);
    },
    onResume() {
      this.isOnSave = false;
      window.isPause = false;
    }
  }
};
const __cssModules$8 = {};
var __component__$8 = /* @__PURE__ */ normalizeComponent(__vue2_script$8, render$8, staticRenderFns$8, false, __vue2_injectStyles$8, null, null, null);
function __vue2_injectStyles$8(context) {
  for (let o in __cssModules$8) {
    this[o] = __cssModules$8[o];
  }
}
var SaveFileForm = /* @__PURE__ */ function() {
  return __component__$8.exports;
}();
const MAX_DOTS = 1e3;
const G = 1e-3;
const ZOOM_FACTOR = 0.2;
const ZOOM_FACTOR_MIN = 0.02;
var render$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    staticClass: "zoom"
  }, [_c("div", {
    staticClass: "zoom__title"
  }, [_vm._v("Zoom:")]), _vm._v(" "), _c("div", {
    staticClass: "zoom__wraper"
  }, [_c("TButton", {
    staticClass: "zoom__button",
    on: {
      "click": _vm.onMinusZoom
    }
  }, [_vm._v("-")]), _vm._v(" "), _c("div", {
    staticClass: "zoom__data"
  }, [_vm._v("\n      " + _vm._s(_vm.roudedZoom) + "\n    ")]), _vm._v(" "), _c("TButton", {
    staticClass: "zoom__button",
    on: {
      "click": _vm.onPlusZoom
    }
  }, [_vm._v("+")])], 1)]);
};
var staticRenderFns$7 = [];
var Zoom_vue_vue_type_style_index_0_lang = "";
const __vue2_script$7 = {
  components: {
    TButton
  },
  data() {
    return {
      zoom: window.zoom
    };
  },
  computed: {
    roudedZoom() {
      return Math.ceil(this.zoom * 1e3) / 1e3;
    },
    zoomFactor() {
      if (this.zoom < 0.1) {
        return ZOOM_FACTOR_MIN * 0.1;
      }
      if (this.zoom < 1) {
        return ZOOM_FACTOR_MIN;
      }
      return ZOOM_FACTOR;
    }
  },
  watch: {},
  mounted() {
  },
  methods: {
    onMinusZoom() {
      this.zoom = this.zoom - this.zoomFactor;
      if (this.zoom <= 0)
        this.zoom = 0.25;
      window.zoom = this.zoom;
    },
    onPlusZoom() {
      this.zoom = this.zoom + this.zoomFactor;
      window.zoom = this.zoom;
    }
  }
};
const __cssModules$7 = {};
var __component__$7 = /* @__PURE__ */ normalizeComponent(__vue2_script$7, render$7, staticRenderFns$7, false, __vue2_injectStyles$7, null, null, null);
function __vue2_injectStyles$7(context) {
  for (let o in __cssModules$7) {
    this[o] = __cssModules$7[o];
  }
}
var Zoom = /* @__PURE__ */ function() {
  return __component__$7.exports;
}();
var render$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    staticClass: "pause"
  }, [_vm.isPause ? _c("TButton", {
    staticClass: "pause__button",
    on: {
      "click": _vm.onPause
    }
  }, [_vm._v("\u23F5 Resume ")]) : _vm._e(), _vm._v(" "), !_vm.isPause ? _c("TButton", {
    staticClass: "pause__button",
    on: {
      "click": _vm.onPause
    }
  }, [_vm._v("\u23F8 Pause ")]) : _vm._e()], 1);
};
var staticRenderFns$6 = [];
var Pause_vue_vue_type_style_index_0_lang = "";
const __vue2_script$6 = {
  components: {
    TButton
  },
  data() {
    return {
      isPause: window.isPause
    };
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    setPause() {
      setTimeout(() => {
        if (this.isPause) {
          this.isPause = window.isPause;
          this.setPause();
        }
      }, 500);
    },
    onPause() {
      window.isPause = !window.isPause;
      this.isPause = window.isPause;
    }
  }
};
const __cssModules$6 = {};
var __component__$6 = /* @__PURE__ */ normalizeComponent(__vue2_script$6, render$6, staticRenderFns$6, false, __vue2_injectStyles$6, null, null, null);
function __vue2_injectStyles$6(context) {
  for (let o in __cssModules$6) {
    this[o] = __cssModules$6[o];
  }
}
var Pause = /* @__PURE__ */ function() {
  return __component__$6.exports;
}();
var render$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    staticClass: "navigation"
  }, [_c("Zoom"), _vm._v(" "), _c("Pause")], 1);
};
var staticRenderFns$5 = [];
var Navigation_vue_vue_type_style_index_0_lang = "";
const __vue2_script$5 = {
  components: {
    TButton,
    Zoom,
    Pause
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {}
};
const __cssModules$5 = {};
var __component__$5 = /* @__PURE__ */ normalizeComponent(__vue2_script$5, render$5, staticRenderFns$5, false, __vue2_injectStyles$5, null, null, null);
function __vue2_injectStyles$5(context) {
  for (let o in __cssModules$5) {
    this[o] = __cssModules$5[o];
  }
}
var Navigation = /* @__PURE__ */ function() {
  return __component__$5.exports;
}();
class StarTrackerState {
}
__publicField(StarTrackerState, "default", 0);
__publicField(StarTrackerState, "startSelect", 1);
const starTrackerInit = () => {
  window.starTrackerState = StarTrackerState.default;
  window.mouseRect = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
  };
};
const drawMouseRect = () => {
  const { x1, x2, y1, y2 } = window.mouseRect;
  if (x1 == x2 == y1 == y2)
    return;
  const ctx2 = window.canvasElem.ctx;
  ctx2.beginPath();
  ctx2.fillStyle = "green";
  ctx2.fillRect(x2, y2, x1 - x2 - 20, y1 - y2 - 20);
  ctx2.closePath();
  ctx2.stroke();
};
const getStartsFromRect = () => {
  const { x1, x2, y1, y2 } = window.mouseRect;
  const starList = [];
  const minX = x1 <= x2 ? x1 : x2;
  const minY = y1 <= y2 ? y1 : y2;
  const maxX = x1 > x2 ? x1 : x2;
  const maxY = y1 > y2 ? y1 : y2;
  for (let k = 0; k < window.dataArr.length; k++) {
    let x = window.dataArr[k][0];
    let y = window.dataArr[k][1];
    x = (x - window.centerMassVector.x) * window.zoom;
    y = (y - window.centerMassVector.y) * window.zoom;
    x = x + window.innerWidth / 2;
    y = y + window.innerHeight / 2;
    const isInRect = x > minX && x < maxX && y > minY && y < maxY;
    if (isInRect)
      starList.push(k);
  }
  return starList;
};
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static add(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  }
  static minus(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  }
  static addScalar(d) {
    return new Vector(this.x + d, this.y + d);
  }
  static mult(v1, v2) {
    return new Vector(v1.x * v2.x, v1.y * v2.y);
  }
  static length(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }
}
const getRandomInt = (min, max) => {
  return Math.random() * (max - min) + min;
};
const xyToCanvas = (x, y, zoom, centerMassVector, w, h) => {
  let dx = (x - centerMassVector.x) * zoom;
  let dy = (y - centerMassVector.y) * zoom;
  dx = dx + w / 2;
  dy = dy + h / 2;
  return {
    dx,
    dy
  };
};
function hex(c) {
  var s = "0123456789abcdef";
  var i = parseInt(c);
  if (i == 0 || isNaN(c))
    return "00";
  i = Math.round(Math.min(Math.max(0, i), 255));
  return s.charAt((i - i % 16) / 16) + s.charAt(i % 16);
}
function convertToHex(rgb) {
  return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}
function trim(s) {
  return s.charAt(0) == "#" ? s.substring(1, 7) : s;
}
function convertToRGB(hex2) {
  var color = [];
  color[0] = parseInt(trim(hex2).substring(0, 2), 16);
  color[1] = parseInt(trim(hex2).substring(2, 4), 16);
  color[2] = parseInt(trim(hex2).substring(4, 6), 16);
  return color;
}
function generateColor(colorStart, colorEnd, colorCount) {
  var start = convertToRGB(colorStart);
  var end = convertToRGB(colorEnd);
  var len = colorCount;
  var alpha = 0;
  var saida = [];
  for (let i = 0; i < len; i++) {
    var c = [];
    alpha += 1 / len;
    c[0] = start[0] * alpha + (1 - alpha) * end[0];
    c[1] = start[1] * alpha + (1 - alpha) * end[1];
    c[2] = start[2] * alpha + (1 - alpha) * end[2];
    saida.push(convertToHex(c));
  }
  return saida;
}
const gradientColorList = generateColor("#f58484", "#0ecf9e", 1e4);
const getDotColorFromField = (field) => {
  const maxColor = gradientColorList.length;
  let k = Math.ceil(maxColor * field / window.maxField);
  if (field > maxColor)
    k = maxColor;
  return `#${gradientColorList[k]}`;
};
var render$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    staticClass: "tracking-status-bar"
  }, [_c("div", {
    staticClass: "tracking-status-bar__item-xy"
  }, [_c("span", [_vm._v(_vm._s(_vm.xy.x))]), _vm._v(" "), _c("span", [_vm._v(_vm._s(_vm.xy.y))])])]);
};
var staticRenderFns$4 = [];
var StatusBar_vue_vue_type_style_index_0_lang$1 = "";
const __vue2_script$4 = {
  components: {},
  data() {
    return {};
  },
  props: {
    centerMassVector: {
      type: Object
    }
  },
  computed: {
    xy() {
      const x = Math.ceil(this.centerMassVector.x * 100) / 100;
      const y = Math.ceil(this.centerMassVector.y * 100) / 100;
      return {
        x,
        y
      };
    }
  },
  watch: {},
  mounted() {
  },
  methods: {}
};
const __cssModules$4 = {};
var __component__$4 = /* @__PURE__ */ normalizeComponent(__vue2_script$4, render$4, staticRenderFns$4, false, __vue2_injectStyles$4, null, null, null);
function __vue2_injectStyles$4(context) {
  for (let o in __cssModules$4) {
    this[o] = __cssModules$4[o];
  }
}
var TrackingStatusBar = /* @__PURE__ */ function() {
  return __component__$4.exports;
}();
var render$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    staticClass: "tracking-tab"
  }, [_c("div", {
    staticClass: "tracking-tab__title"
  }, [_vm._v("Star Group Tracking")]), _vm._v(" "), !_vm.isStartSelect ? _c("TButton", {
    staticClass: "tracking-tab__btn",
    on: {
      "click": _vm.onStartSelect
    }
  }, [_vm._v("Click to select a group")]) : _vm._e(), _vm._v(" "), _vm.isStartSelect ? _c("TButton", {
    staticClass: "tracking-tab__btn",
    on: {
      "click": _vm.onAbortSelect
    }
  }, [_vm._v("Abort select a group")]) : _vm._e(), _vm._v(" "), _c("canvas", {
    ref: "canvas",
    staticClass: "tracking-tab__canvas",
    attrs: {
      "width": "360",
      "height": "360"
    }
  }), _vm._v(" "), _c("TrackingStatusBar", {
    attrs: {
      "centerMassVector": _vm.centerMassVector
    }
  })], 1);
};
var staticRenderFns$3 = [];
var TrackingTab_vue_vue_type_style_index_0_lang = "";
const __vue2_script$3 = {
  components: {
    TButton,
    TInput,
    TrackingStatusBar
  },
  data() {
    return {
      isOnSave: false,
      isStartSelect: false,
      isStartRect: false,
      isStartDraw: false,
      worker: null,
      ctx: null,
      starList: [],
      centerMassVector: new Vector(0, 0)
    };
  },
  computed: {},
  watch: {},
  mounted() {
    window.canvasElem.elem.addEventListener("mousedown", this.onMouseDown);
    window.canvasElem.elem.addEventListener("mouseup", this.onMouseUp);
    window.canvasElem.elem.addEventListener("mousemove", this.onMouseMove);
    this.ctx = this.$refs["canvas"].getContext("2d");
  },
  destroyed() {
    window.canvasElem.elem.removeEventListener("mousedown", this.onMouseDown);
    window.canvasElem.elem.removeEventListener("mouseup", this.onMouseUp);
    window.canvasElem.elem.removeEventListener("mousemove", this.onMouseMove);
  },
  methods: {
    getDotColorFromField,
    workerCallback(data, that) {
      that.centerMassVector = data.centerMassVector;
    },
    onStartSelect() {
      window.isPause = true;
      this.isStartSelect = true;
    },
    onAbortSelect() {
      window.isPause = false;
      this.isStartSelect = false;
    },
    onMouseDown(event) {
      if (!this.isStartSelect)
        return;
      this.isStartRect = true;
      window.mouseRect.x1 = event.x;
      window.mouseRect.y1 = event.y;
    },
    onMouseMove(event) {
      if (!this.isStartRect)
        return;
      window.mouseRect.x2 = event.x;
      window.mouseRect.y2 = event.y;
    },
    onMouseUp() {
      this.isStartRect = false;
      this.starList = getStartsFromRect();
      this.isStartDraw = true;
      this.isStartSelect = false;
      window.isPause = false;
      window.mouseRect = {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0
      };
      this.draw(this);
    },
    clearCanvas(that) {
      var _a, _b;
      if (!((_b = (_a = that.$refs) == null ? void 0 : _a.canvas) == null ? void 0 : _b.offsetHeight))
        return;
      const { offsetWidth, offsetHeight } = that.$refs["canvas"];
      that.ctx.globalCompositeOperation = "destination-over";
      that.ctx.clearRect(0, 0, offsetWidth, offsetHeight);
    },
    drawStars(starList, that) {
      var _a, _b;
      if (!((_b = (_a = that.$refs) == null ? void 0 : _a.canvas) == null ? void 0 : _b.offsetHeight))
        return;
      const zoom = 2.9;
      let field = 0;
      const { offsetWidth, offsetHeight } = that.$refs["canvas"];
      const centerMassVector = new Vector(0, 0);
      const count = starList.length;
      let maxField = 0;
      for (let k = 0; k < starList.length; k++) {
        centerMassVector.x += starList[k][0];
        centerMassVector.y += starList[k][1];
        if (starList[k][2] > maxField) {
          maxField = dataArr[k][2];
        }
      }
      centerMassVector.x = centerMassVector.x / count;
      centerMassVector.y = centerMassVector.y / count;
      that.centerMassVector = centerMassVector;
      for (let k = 0; k < window.dataArrWithField.length; k++) {
        let { dx, dy } = xyToCanvas(window.dataArrWithField[k][0], window.dataArrWithField[k][1], zoom, centerMassVector, offsetWidth, offsetHeight);
        field = window.dataArrWithField[k][2];
        that.ctx.beginPath();
        that.ctx.fillStyle = that.getDotColorFromField(field);
        that.ctx.fillRect(dx, dy, 3, 3);
        that.ctx.closePath();
        that.ctx.stroke();
      }
      const rectXY = xyToCanvas(centerMassVector.x - 10, centerMassVector.y - 10, window.zoom, window.centerMassVector, window.innerWidth, window.innerHeight);
      window.canvasElem.ctx.beginPath();
      window.canvasElem.ctx.strokeStyle = "green";
      window.canvasElem.ctx.strokeRect(rectXY.dx, rectXY.dy, 20, 20);
      window.canvasElem.ctx.closePath();
      window.canvasElem.ctx.stroke();
    },
    draw(that) {
      if (!that)
        return;
      that.clearCanvas(that);
      const starList = that.starList.map((item) => {
        return dataArr[item];
      });
      that.drawStars(starList, that);
      requestAnimationFrame(() => {
        this.draw(that);
      });
    }
  }
};
const __cssModules$3 = {};
var __component__$3 = /* @__PURE__ */ normalizeComponent(__vue2_script$3, render$3, staticRenderFns$3, false, __vue2_injectStyles$3, null, null, null);
function __vue2_injectStyles$3(context) {
  for (let o in __cssModules$3) {
    this[o] = __cssModules$3[o];
  }
}
var StarTracking = /* @__PURE__ */ function() {
  return __component__$3.exports;
}();
const menuData = [
  {
    title: "Navigation"
  },
  {
    title: "Add points"
  },
  {
    title: "Save"
  },
  {
    title: "Load"
  },
  {
    title: "Star tracking"
  }
];
var render$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    staticClass: "menu"
  }, _vm._l(_vm.menuData, function(item, key) {
    return _c("TButton", {
      key,
      attrs: {
        "isSelected": _vm.isMenuSelected(key)
      },
      on: {
        "click": function($event) {
          return _vm.onSelectMenu(key);
        }
      }
    }, [_vm._v("\n  " + _vm._s(item.title) + "\n  ")]);
  }), 1);
};
var staticRenderFns$2 = [];
var Menu_vue_vue_type_style_index_0_lang = "";
const __vue2_script$2 = {
  components: {
    TButton
  },
  data() {
    return {};
  },
  props: {
    selectedMenuIdx: {
      type: Number,
      required: true,
      default: 0
    }
  },
  computed: {
    menuData() {
      return menuData;
    }
  },
  watch: {},
  mounted() {
  },
  methods: {
    onSelectMenu(idx) {
      this.$emit("onSelectMenu", idx);
    },
    isMenuSelected(key) {
      return this.selectedMenuIdx === key;
    }
  }
};
const __cssModules$2 = {};
var __component__$2 = /* @__PURE__ */ normalizeComponent(__vue2_script$2, render$2, staticRenderFns$2, false, __vue2_injectStyles$2, null, null, null);
function __vue2_injectStyles$2(context) {
  for (let o in __cssModules$2) {
    this[o] = __cssModules$2[o];
  }
}
var Menu = /* @__PURE__ */ function() {
  return __component__$2.exports;
}();
var render$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    staticClass: "status-bar"
  }, [_c("div", {
    staticClass: "status-bar__item status-bar__item-fps"
  }, [_vm._v("fps: " + _vm._s(_vm.fps))]), _vm._v(" "), _c("div", {
    staticClass: "status-bar__item"
  }, [_vm._v("Dots count: " + _vm._s(_vm.dotsCount))])]);
};
var staticRenderFns$1 = [];
var StatusBar_vue_vue_type_style_index_0_lang = "";
const __vue2_script$1 = {
  components: {},
  data() {
    return {
      fps: window.fps,
      dotsCount: window.dataArr.length,
      workerFps: window.workerFps
    };
  },
  props: {},
  computed: {},
  watch: {},
  mounted() {
    this.fpsWatcher();
    this.dotsCountWatcher();
    this.workerFpsWatcher();
  },
  methods: {
    fpsWatcher() {
      this.fps = window.fps;
      setTimeout(() => {
        if (this.fpsWatcher) {
          this.fpsWatcher();
        }
      }, 500);
    },
    dotsCountWatcher() {
      this.dotsCount = window.dataArr.length;
      setTimeout(() => {
        if (this.dotsCountWatcher) {
          this.dotsCountWatcher();
        }
      }, 500);
    },
    workerFpsWatcher() {
      this.workerFps = window.workerFps;
      setTimeout(() => {
        if (this.workerFpsWatcher) {
          this.workerFpsWatcher();
        }
      }, 500);
    }
  }
};
const __cssModules$1 = {};
var __component__$1 = /* @__PURE__ */ normalizeComponent(__vue2_script$1, render$1, staticRenderFns$1, false, __vue2_injectStyles$1, null, null, null);
function __vue2_injectStyles$1(context) {
  for (let o in __cssModules$1) {
    this[o] = __cssModules$1[o];
  }
}
var StatusBar = /* @__PURE__ */ function() {
  return __component__$1.exports;
}();
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    ref: "app",
    staticClass: "app"
  }, [_c("div", {
    staticClass: "app__title"
  }, [_vm._v("Galaxy simulation")]), _vm._v(" "), _c("Menu", {
    attrs: {
      "selectedMenuIdx": _vm.selectedMenuIdx
    },
    on: {
      "onSelectMenu": _vm.onSelectMenu
    }
  }), _vm._v(" "), _c("div", {
    staticClass: "app__wraper"
  }, [_vm.selectedMenuIdx == 0 ? _c("Navigation") : _vm._e(), _vm._v(" "), _vm.selectedMenuIdx == 1 ? _c("div", {
    staticClass: "app_add-point"
  }, [_vm._v("Mouse click point")]) : _vm._e(), _vm._v(" "), _vm.selectedMenuIdx == 2 ? _c("SaveFileForm") : _vm._e(), _vm._v(" "), _vm.selectedMenuIdx == 3 ? _c("LoadFileForm") : _vm._e(), _vm._v(" "), _vm.selectedMenuIdx == 4 ? _c("StarTracking") : _vm._e()], 1), _vm._v(" "), _c("StatusBar")], 1);
};
var staticRenderFns = [];
var App_vue_vue_type_style_index_0_lang = "";
const __vue2_script = {
  name: "App",
  components: {
    SaveFileForm,
    LoadFileForm,
    Navigation,
    Menu,
    StatusBar,
    StarTracking
  },
  data() {
    return {
      selectedMenuIdx: 0
    };
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    onSelectMenu(idx) {
      window.menuState = idx;
      this.selectedMenuIdx = idx;
    }
  }
};
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var App = /* @__PURE__ */ function() {
  return __component__.exports;
}();
class Body {
  constructor(coord, massa, color = "#000000") {
    this.coord = coord;
    this.massa = massa;
    this.velocity = new Vector(0, 0);
    this.color = color;
    this.family = 0;
  }
  setCoord2(coord) {
    const cold = 0.9;
    if (coord.x > void 0) {
      this.velocity.x = -this.velocity.x * cold;
    } else if (coord.x < 0) {
      this.velocity.x = -this.velocity.x * cold;
    }
    this.coord.x = coord.x;
    if (coord.y > void 0) {
      this.velocity.y = -this.velocity.y * cold;
    } else if (coord.y < 0) {
      this.velocity.y = -this.velocity.y * cold;
    }
    this.coord.y = coord.y;
  }
  setCoord(coord) {
    if (coord.x > MAX_DOT_X) {
      this.coord.x = coord.x - MAX_DOT_X;
    } else if (coord.x < 0) {
      this.coord.x = MAX_DOT_X - coord.x;
    } else {
      this.coord.x = coord.x;
    }
    if (coord.y > MAX_DOT_Y) {
      this.coord.y = coord.y - MAX_DOT_Y;
    } else if (coord.y < 0) {
      this.coord.y = MAX_DOT_Y - coord.y;
    } else {
      this.coord.y = coord.y;
    }
  }
  setCoord3(coord) {
    this.coord.x = coord.x;
    this.coord.y = coord.y;
  }
  static draw(ctx2, body, centerMassVector) {
    console.log(body);
    ctx2.beginPath();
    ctx2.strokeStyle = body.color;
    ctx2.moveTo(body.coord.x, body.coord.y);
    ctx2.arc(body.coord.x - centerMassVector.x, body.coord.y - centerMassVector.y, 3, 0, Math.PI * 2, false);
    ctx2.closePath();
    ctx2.stroke();
  }
}
class BodyGenerator {
  generate() {
    const bodyList = [];
    for (let k = 0; k < MAX_DOTS; k++) {
      bodyList.push(new Body(new Vector(getRandomInt(300, 600), getRandomInt(300, 600)), 5));
    }
    for (let k = 0; k < MAX_DOTS; k++) {
      bodyList.push(new Body(new Vector(getRandomInt(400, 800), getRandomInt(400, 800)), 5));
    }
    return bodyList;
  }
}
class GeneratorCircle extends BodyGenerator {
  static getDot(center, radius, color) {
    const getX = (rad2, grad2) => {
      return rad2 * Math.sin(grad2);
    };
    const getY = (rad2, grad2) => {
      return rad2 * Math.cos(grad2);
    };
    const grad = getRandomInt(0, 360) * 3.14 / 180;
    const rad = getRandomInt(1, radius);
    const body = new Body(new Vector(getX(rad, grad) + center.x, getY(rad, grad) + center.y), 5, color);
    return body;
  }
  generate() {
    const bodyList = [];
    const addDots = (count, vec, radius, color = "#ffffff") => {
      for (let k = 0; k < count; k++) {
        bodyList.push(GeneratorCircle.getDot(vec, radius, color));
      }
    };
    addDots(Math.ceil(MAX_DOTS), new Vector(600, 400), 500, "#f8a5a5");
    return bodyList;
  }
}
function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var gpuBrowser = { exports: {} };
/**
 * gpu.js
 * http://gpu.rocks/
 *
 * GPU Accelerated JavaScript
 *
 * @version 2.16.0
 * @date Wed Nov 16 2022 15:48:37 GMT-0500 (Eastern Standard Time)
 *
 * @license MIT
 * The MIT License
 *
 * Copyright (c) 2022 gpu.js Team
 */
(function(module, exports) {
  (function(f) {
    {
      module.exports = f();
    }
  })(function() {
    return function() {
      function r(e, n, t) {
        function o(i2, f) {
          if (!n[i2]) {
            if (!e[i2]) {
              var c = "function" == typeof commonjsRequire && commonjsRequire;
              if (!f && c)
                return c(i2, true);
              if (u)
                return u(i2, true);
              var a = new Error("Cannot find module '" + i2 + "'");
              throw a.code = "MODULE_NOT_FOUND", a;
            }
            var p2 = n[i2] = { exports: {} };
            e[i2][0].call(p2.exports, function(r2) {
              var n2 = e[i2][1][r2];
              return o(n2 || r2);
            }, p2, p2.exports, r, e, n, t);
          }
          return n[i2].exports;
        }
        for (var u = "function" == typeof commonjsRequire && commonjsRequire, i = 0; i < t.length; i++)
          o(t[i]);
        return o;
      }
      return r;
    }()({ 1: [function(require2, module2, exports2) {
      (function(global2, factory) {
        typeof exports2 === "object" && typeof module2 !== "undefined" ? factory(exports2) : (global2 = global2 || self, factory(global2.acorn = {}));
      })(this, function(exports3) {
        var reservedWords = {
          3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
          5: "class enum extends super const export import",
          6: "enum",
          strict: "implements interface let package private protected public static yield",
          strictBind: "eval arguments"
        };
        var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";
        var keywords = {
          5: ecma5AndLessKeywords,
          "5module": ecma5AndLessKeywords + " export import",
          6: ecma5AndLessKeywords + " const class extends export import super"
        };
        var keywordRelationalOperator = /^in(stanceof)?$/;
        var nonASCIIidentifierStartChars = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEF\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7C6\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB67\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
        var nonASCIIidentifierChars = "\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F";
        var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
        var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
        nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
        var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 477, 28, 11, 0, 9, 21, 155, 22, 13, 52, 76, 44, 33, 24, 27, 35, 30, 0, 12, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 0, 33, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 230, 43, 117, 63, 32, 0, 161, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 35, 56, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 270, 921, 103, 110, 18, 195, 2749, 1070, 4050, 582, 8634, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 754, 9486, 286, 50, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 2357, 44, 11, 6, 17, 0, 370, 43, 1301, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42710, 42, 4148, 12, 221, 3, 5761, 15, 7472, 3104, 541];
        var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 525, 10, 176, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 4, 9, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 232, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 135, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 19723, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 419, 13, 1495, 6, 110, 6, 6, 9, 792487, 239];
        function isInAstralSet(code, set2) {
          var pos = 65536;
          for (var i = 0; i < set2.length; i += 2) {
            pos += set2[i];
            if (pos > code) {
              return false;
            }
            pos += set2[i + 1];
            if (pos >= code) {
              return true;
            }
          }
        }
        function isIdentifierStart(code, astral) {
          if (code < 65) {
            return code === 36;
          }
          if (code < 91) {
            return true;
          }
          if (code < 97) {
            return code === 95;
          }
          if (code < 123) {
            return true;
          }
          if (code <= 65535) {
            return code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code));
          }
          if (astral === false) {
            return false;
          }
          return isInAstralSet(code, astralIdentifierStartCodes);
        }
        function isIdentifierChar(code, astral) {
          if (code < 48) {
            return code === 36;
          }
          if (code < 58) {
            return true;
          }
          if (code < 65) {
            return false;
          }
          if (code < 91) {
            return true;
          }
          if (code < 97) {
            return code === 95;
          }
          if (code < 123) {
            return true;
          }
          if (code <= 65535) {
            return code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code));
          }
          if (astral === false) {
            return false;
          }
          return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
        }
        var TokenType = function TokenType2(label, conf) {
          if (conf === void 0)
            conf = {};
          this.label = label;
          this.keyword = conf.keyword;
          this.beforeExpr = !!conf.beforeExpr;
          this.startsExpr = !!conf.startsExpr;
          this.isLoop = !!conf.isLoop;
          this.isAssign = !!conf.isAssign;
          this.prefix = !!conf.prefix;
          this.postfix = !!conf.postfix;
          this.binop = conf.binop || null;
          this.updateContext = null;
        };
        function binop(name2, prec) {
          return new TokenType(name2, { beforeExpr: true, binop: prec });
        }
        var beforeExpr = { beforeExpr: true }, startsExpr = { startsExpr: true };
        var keywords$1 = {};
        function kw(name2, options) {
          if (options === void 0)
            options = {};
          options.keyword = name2;
          return keywords$1[name2] = new TokenType(name2, options);
        }
        var types = {
          num: new TokenType("num", startsExpr),
          regexp: new TokenType("regexp", startsExpr),
          string: new TokenType("string", startsExpr),
          name: new TokenType("name", startsExpr),
          eof: new TokenType("eof"),
          bracketL: new TokenType("[", { beforeExpr: true, startsExpr: true }),
          bracketR: new TokenType("]"),
          braceL: new TokenType("{", { beforeExpr: true, startsExpr: true }),
          braceR: new TokenType("}"),
          parenL: new TokenType("(", { beforeExpr: true, startsExpr: true }),
          parenR: new TokenType(")"),
          comma: new TokenType(",", beforeExpr),
          semi: new TokenType(";", beforeExpr),
          colon: new TokenType(":", beforeExpr),
          dot: new TokenType("."),
          question: new TokenType("?", beforeExpr),
          arrow: new TokenType("=>", beforeExpr),
          template: new TokenType("template"),
          invalidTemplate: new TokenType("invalidTemplate"),
          ellipsis: new TokenType("...", beforeExpr),
          backQuote: new TokenType("`", startsExpr),
          dollarBraceL: new TokenType("${", { beforeExpr: true, startsExpr: true }),
          eq: new TokenType("=", { beforeExpr: true, isAssign: true }),
          assign: new TokenType("_=", { beforeExpr: true, isAssign: true }),
          incDec: new TokenType("++/--", { prefix: true, postfix: true, startsExpr: true }),
          prefix: new TokenType("!/~", { beforeExpr: true, prefix: true, startsExpr: true }),
          logicalOR: binop("||", 1),
          logicalAND: binop("&&", 2),
          bitwiseOR: binop("|", 3),
          bitwiseXOR: binop("^", 4),
          bitwiseAND: binop("&", 5),
          equality: binop("==/!=/===/!==", 6),
          relational: binop("</>/<=/>=", 7),
          bitShift: binop("<</>>/>>>", 8),
          plusMin: new TokenType("+/-", { beforeExpr: true, binop: 9, prefix: true, startsExpr: true }),
          modulo: binop("%", 10),
          star: binop("*", 10),
          slash: binop("/", 10),
          starstar: new TokenType("**", { beforeExpr: true }),
          _break: kw("break"),
          _case: kw("case", beforeExpr),
          _catch: kw("catch"),
          _continue: kw("continue"),
          _debugger: kw("debugger"),
          _default: kw("default", beforeExpr),
          _do: kw("do", { isLoop: true, beforeExpr: true }),
          _else: kw("else", beforeExpr),
          _finally: kw("finally"),
          _for: kw("for", { isLoop: true }),
          _function: kw("function", startsExpr),
          _if: kw("if"),
          _return: kw("return", beforeExpr),
          _switch: kw("switch"),
          _throw: kw("throw", beforeExpr),
          _try: kw("try"),
          _var: kw("var"),
          _const: kw("const"),
          _while: kw("while", { isLoop: true }),
          _with: kw("with"),
          _new: kw("new", { beforeExpr: true, startsExpr: true }),
          _this: kw("this", startsExpr),
          _super: kw("super", startsExpr),
          _class: kw("class", startsExpr),
          _extends: kw("extends", beforeExpr),
          _export: kw("export"),
          _import: kw("import", startsExpr),
          _null: kw("null", startsExpr),
          _true: kw("true", startsExpr),
          _false: kw("false", startsExpr),
          _in: kw("in", { beforeExpr: true, binop: 7 }),
          _instanceof: kw("instanceof", { beforeExpr: true, binop: 7 }),
          _typeof: kw("typeof", { beforeExpr: true, prefix: true, startsExpr: true }),
          _void: kw("void", { beforeExpr: true, prefix: true, startsExpr: true }),
          _delete: kw("delete", { beforeExpr: true, prefix: true, startsExpr: true })
        };
        var lineBreak = /\r\n?|\n|\u2028|\u2029/;
        var lineBreakG = new RegExp(lineBreak.source, "g");
        function isNewLine(code, ecma2019String) {
          return code === 10 || code === 13 || !ecma2019String && (code === 8232 || code === 8233);
        }
        var nonASCIIwhitespace = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
        var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
        var ref2 = Object.prototype;
        var hasOwnProperty2 = ref2.hasOwnProperty;
        var toString2 = ref2.toString;
        function has2(obj, propName) {
          return hasOwnProperty2.call(obj, propName);
        }
        var isArray2 = Array.isArray || function(obj) {
          return toString2.call(obj) === "[object Array]";
        };
        function wordsRegexp(words) {
          return new RegExp("^(?:" + words.replace(/ /g, "|") + ")$");
        }
        var Position = function Position2(line, col) {
          this.line = line;
          this.column = col;
        };
        Position.prototype.offset = function offset(n) {
          return new Position(this.line, this.column + n);
        };
        var SourceLocation = function SourceLocation2(p2, start, end) {
          this.start = start;
          this.end = end;
          if (p2.sourceFile !== null) {
            this.source = p2.sourceFile;
          }
        };
        function getLineInfo(input, offset) {
          for (var line = 1, cur = 0; ; ) {
            lineBreakG.lastIndex = cur;
            var match = lineBreakG.exec(input);
            if (match && match.index < offset) {
              ++line;
              cur = match.index + match[0].length;
            } else {
              return new Position(line, offset - cur);
            }
          }
        }
        var defaultOptions = {
          ecmaVersion: 10,
          sourceType: "script",
          onInsertedSemicolon: null,
          onTrailingComma: null,
          allowReserved: null,
          allowReturnOutsideFunction: false,
          allowImportExportEverywhere: false,
          allowAwaitOutsideFunction: false,
          allowHashBang: false,
          locations: false,
          onToken: null,
          onComment: null,
          ranges: false,
          program: null,
          sourceFile: null,
          directSourceFile: null,
          preserveParens: false
        };
        function getOptions(opts2) {
          var options = {};
          for (var opt in defaultOptions) {
            options[opt] = opts2 && has2(opts2, opt) ? opts2[opt] : defaultOptions[opt];
          }
          if (options.ecmaVersion >= 2015) {
            options.ecmaVersion -= 2009;
          }
          if (options.allowReserved == null) {
            options.allowReserved = options.ecmaVersion < 5;
          }
          if (isArray2(options.onToken)) {
            var tokens = options.onToken;
            options.onToken = function(token) {
              return tokens.push(token);
            };
          }
          if (isArray2(options.onComment)) {
            options.onComment = pushComment(options, options.onComment);
          }
          return options;
        }
        function pushComment(options, array) {
          return function(block, text, start, end, startLoc, endLoc) {
            var comment = {
              type: block ? "Block" : "Line",
              value: text,
              start,
              end
            };
            if (options.locations) {
              comment.loc = new SourceLocation(this, startLoc, endLoc);
            }
            if (options.ranges) {
              comment.range = [start, end];
            }
            array.push(comment);
          };
        }
        var SCOPE_TOP = 1, SCOPE_FUNCTION = 2, SCOPE_VAR = SCOPE_TOP | SCOPE_FUNCTION, SCOPE_ASYNC = 4, SCOPE_GENERATOR = 8, SCOPE_ARROW = 16, SCOPE_SIMPLE_CATCH = 32, SCOPE_SUPER = 64, SCOPE_DIRECT_SUPER = 128;
        function functionFlags(async, generator) {
          return SCOPE_FUNCTION | (async ? SCOPE_ASYNC : 0) | (generator ? SCOPE_GENERATOR : 0);
        }
        var BIND_NONE = 0, BIND_VAR = 1, BIND_LEXICAL = 2, BIND_FUNCTION = 3, BIND_SIMPLE_CATCH = 4, BIND_OUTSIDE = 5;
        var Parser = function Parser2(options, input, startPos) {
          this.options = options = getOptions(options);
          this.sourceFile = options.sourceFile;
          this.keywords = wordsRegexp(keywords[options.ecmaVersion >= 6 ? 6 : options.sourceType === "module" ? "5module" : 5]);
          var reserved = "";
          if (options.allowReserved !== true) {
            for (var v = options.ecmaVersion; ; v--) {
              if (reserved = reservedWords[v]) {
                break;
              }
            }
            if (options.sourceType === "module") {
              reserved += " await";
            }
          }
          this.reservedWords = wordsRegexp(reserved);
          var reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict;
          this.reservedWordsStrict = wordsRegexp(reservedStrict);
          this.reservedWordsStrictBind = wordsRegexp(reservedStrict + " " + reservedWords.strictBind);
          this.input = String(input);
          this.containsEsc = false;
          if (startPos) {
            this.pos = startPos;
            this.lineStart = this.input.lastIndexOf("\n", startPos - 1) + 1;
            this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length;
          } else {
            this.pos = this.lineStart = 0;
            this.curLine = 1;
          }
          this.type = types.eof;
          this.value = null;
          this.start = this.end = this.pos;
          this.startLoc = this.endLoc = this.curPosition();
          this.lastTokEndLoc = this.lastTokStartLoc = null;
          this.lastTokStart = this.lastTokEnd = this.pos;
          this.context = this.initialContext();
          this.exprAllowed = true;
          this.inModule = options.sourceType === "module";
          this.strict = this.inModule || this.strictDirective(this.pos);
          this.potentialArrowAt = -1;
          this.yieldPos = this.awaitPos = this.awaitIdentPos = 0;
          this.labels = [];
          this.undefinedExports = {};
          if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!") {
            this.skipLineComment(2);
          }
          this.scopeStack = [];
          this.enterScope(SCOPE_TOP);
          this.regexpState = null;
        };
        var prototypeAccessors = { inFunction: { configurable: true }, inGenerator: { configurable: true }, inAsync: { configurable: true }, allowSuper: { configurable: true }, allowDirectSuper: { configurable: true }, treatFunctionsAsVar: { configurable: true } };
        Parser.prototype.parse = function parse2() {
          var node = this.options.program || this.startNode();
          this.nextToken();
          return this.parseTopLevel(node);
        };
        prototypeAccessors.inFunction.get = function() {
          return (this.currentVarScope().flags & SCOPE_FUNCTION) > 0;
        };
        prototypeAccessors.inGenerator.get = function() {
          return (this.currentVarScope().flags & SCOPE_GENERATOR) > 0;
        };
        prototypeAccessors.inAsync.get = function() {
          return (this.currentVarScope().flags & SCOPE_ASYNC) > 0;
        };
        prototypeAccessors.allowSuper.get = function() {
          return (this.currentThisScope().flags & SCOPE_SUPER) > 0;
        };
        prototypeAccessors.allowDirectSuper.get = function() {
          return (this.currentThisScope().flags & SCOPE_DIRECT_SUPER) > 0;
        };
        prototypeAccessors.treatFunctionsAsVar.get = function() {
          return this.treatFunctionsAsVarInScope(this.currentScope());
        };
        Parser.prototype.inNonArrowFunction = function inNonArrowFunction() {
          return (this.currentThisScope().flags & SCOPE_FUNCTION) > 0;
        };
        Parser.extend = function extend2() {
          var plugins = [], len = arguments.length;
          while (len--)
            plugins[len] = arguments[len];
          var cls = this;
          for (var i = 0; i < plugins.length; i++) {
            cls = plugins[i](cls);
          }
          return cls;
        };
        Parser.parse = function parse2(input, options) {
          return new this(options, input).parse();
        };
        Parser.parseExpressionAt = function parseExpressionAt2(input, pos, options) {
          var parser = new this(options, input, pos);
          parser.nextToken();
          return parser.parseExpression();
        };
        Parser.tokenizer = function tokenizer2(input, options) {
          return new this(options, input);
        };
        Object.defineProperties(Parser.prototype, prototypeAccessors);
        var pp = Parser.prototype;
        var literal = /^(?:'((?:\\.|[^'])*?)'|"((?:\\.|[^"])*?)")/;
        pp.strictDirective = function(start) {
          for (; ; ) {
            skipWhiteSpace.lastIndex = start;
            start += skipWhiteSpace.exec(this.input)[0].length;
            var match = literal.exec(this.input.slice(start));
            if (!match) {
              return false;
            }
            if ((match[1] || match[2]) === "use strict") {
              return true;
            }
            start += match[0].length;
            skipWhiteSpace.lastIndex = start;
            start += skipWhiteSpace.exec(this.input)[0].length;
            if (this.input[start] === ";") {
              start++;
            }
          }
        };
        pp.eat = function(type) {
          if (this.type === type) {
            this.next();
            return true;
          } else {
            return false;
          }
        };
        pp.isContextual = function(name2) {
          return this.type === types.name && this.value === name2 && !this.containsEsc;
        };
        pp.eatContextual = function(name2) {
          if (!this.isContextual(name2)) {
            return false;
          }
          this.next();
          return true;
        };
        pp.expectContextual = function(name2) {
          if (!this.eatContextual(name2)) {
            this.unexpected();
          }
        };
        pp.canInsertSemicolon = function() {
          return this.type === types.eof || this.type === types.braceR || lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
        };
        pp.insertSemicolon = function() {
          if (this.canInsertSemicolon()) {
            if (this.options.onInsertedSemicolon) {
              this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc);
            }
            return true;
          }
        };
        pp.semicolon = function() {
          if (!this.eat(types.semi) && !this.insertSemicolon()) {
            this.unexpected();
          }
        };
        pp.afterTrailingComma = function(tokType, notNext) {
          if (this.type === tokType) {
            if (this.options.onTrailingComma) {
              this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc);
            }
            if (!notNext) {
              this.next();
            }
            return true;
          }
        };
        pp.expect = function(type) {
          this.eat(type) || this.unexpected();
        };
        pp.unexpected = function(pos) {
          this.raise(pos != null ? pos : this.start, "Unexpected token");
        };
        function DestructuringErrors() {
          this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
        }
        pp.checkPatternErrors = function(refDestructuringErrors, isAssign) {
          if (!refDestructuringErrors) {
            return;
          }
          if (refDestructuringErrors.trailingComma > -1) {
            this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element");
          }
          var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind;
          if (parens > -1) {
            this.raiseRecoverable(parens, "Parenthesized pattern");
          }
        };
        pp.checkExpressionErrors = function(refDestructuringErrors, andThrow) {
          if (!refDestructuringErrors) {
            return false;
          }
          var shorthandAssign = refDestructuringErrors.shorthandAssign;
          var doubleProto = refDestructuringErrors.doubleProto;
          if (!andThrow) {
            return shorthandAssign >= 0 || doubleProto >= 0;
          }
          if (shorthandAssign >= 0) {
            this.raise(shorthandAssign, "Shorthand property assignments are valid only in destructuring patterns");
          }
          if (doubleProto >= 0) {
            this.raiseRecoverable(doubleProto, "Redefinition of __proto__ property");
          }
        };
        pp.checkYieldAwaitInDefaultParams = function() {
          if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos)) {
            this.raise(this.yieldPos, "Yield expression cannot be a default value");
          }
          if (this.awaitPos) {
            this.raise(this.awaitPos, "Await expression cannot be a default value");
          }
        };
        pp.isSimpleAssignTarget = function(expr) {
          if (expr.type === "ParenthesizedExpression") {
            return this.isSimpleAssignTarget(expr.expression);
          }
          return expr.type === "Identifier" || expr.type === "MemberExpression";
        };
        var pp$1 = Parser.prototype;
        pp$1.parseTopLevel = function(node) {
          var exports4 = {};
          if (!node.body) {
            node.body = [];
          }
          while (this.type !== types.eof) {
            var stmt = this.parseStatement(null, true, exports4);
            node.body.push(stmt);
          }
          if (this.inModule) {
            for (var i = 0, list = Object.keys(this.undefinedExports); i < list.length; i += 1) {
              var name2 = list[i];
              this.raiseRecoverable(this.undefinedExports[name2].start, "Export '" + name2 + "' is not defined");
            }
          }
          this.adaptDirectivePrologue(node.body);
          this.next();
          node.sourceType = this.options.sourceType;
          return this.finishNode(node, "Program");
        };
        var loopLabel = { kind: "loop" }, switchLabel = { kind: "switch" };
        pp$1.isLet = function(context) {
          if (this.options.ecmaVersion < 6 || !this.isContextual("let")) {
            return false;
          }
          skipWhiteSpace.lastIndex = this.pos;
          var skip = skipWhiteSpace.exec(this.input);
          var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
          if (nextCh === 91) {
            return true;
          }
          if (context) {
            return false;
          }
          if (nextCh === 123) {
            return true;
          }
          if (isIdentifierStart(nextCh, true)) {
            var pos = next + 1;
            while (isIdentifierChar(this.input.charCodeAt(pos), true)) {
              ++pos;
            }
            var ident = this.input.slice(next, pos);
            if (!keywordRelationalOperator.test(ident)) {
              return true;
            }
          }
          return false;
        };
        pp$1.isAsyncFunction = function() {
          if (this.options.ecmaVersion < 8 || !this.isContextual("async")) {
            return false;
          }
          skipWhiteSpace.lastIndex = this.pos;
          var skip = skipWhiteSpace.exec(this.input);
          var next = this.pos + skip[0].length;
          return !lineBreak.test(this.input.slice(this.pos, next)) && this.input.slice(next, next + 8) === "function" && (next + 8 === this.input.length || !isIdentifierChar(this.input.charAt(next + 8)));
        };
        pp$1.parseStatement = function(context, topLevel, exports4) {
          var starttype = this.type, node = this.startNode(), kind;
          if (this.isLet(context)) {
            starttype = types._var;
            kind = "let";
          }
          switch (starttype) {
            case types._break:
            case types._continue:
              return this.parseBreakContinueStatement(node, starttype.keyword);
            case types._debugger:
              return this.parseDebuggerStatement(node);
            case types._do:
              return this.parseDoStatement(node);
            case types._for:
              return this.parseForStatement(node);
            case types._function:
              if (context && (this.strict || context !== "if" && context !== "label") && this.options.ecmaVersion >= 6) {
                this.unexpected();
              }
              return this.parseFunctionStatement(node, false, !context);
            case types._class:
              if (context) {
                this.unexpected();
              }
              return this.parseClass(node, true);
            case types._if:
              return this.parseIfStatement(node);
            case types._return:
              return this.parseReturnStatement(node);
            case types._switch:
              return this.parseSwitchStatement(node);
            case types._throw:
              return this.parseThrowStatement(node);
            case types._try:
              return this.parseTryStatement(node);
            case types._const:
            case types._var:
              kind = kind || this.value;
              if (context && kind !== "var") {
                this.unexpected();
              }
              return this.parseVarStatement(node, kind);
            case types._while:
              return this.parseWhileStatement(node);
            case types._with:
              return this.parseWithStatement(node);
            case types.braceL:
              return this.parseBlock(true, node);
            case types.semi:
              return this.parseEmptyStatement(node);
            case types._export:
            case types._import:
              if (this.options.ecmaVersion > 10 && starttype === types._import) {
                skipWhiteSpace.lastIndex = this.pos;
                var skip = skipWhiteSpace.exec(this.input);
                var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
                if (nextCh === 40) {
                  return this.parseExpressionStatement(node, this.parseExpression());
                }
              }
              if (!this.options.allowImportExportEverywhere) {
                if (!topLevel) {
                  this.raise(this.start, "'import' and 'export' may only appear at the top level");
                }
                if (!this.inModule) {
                  this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'");
                }
              }
              return starttype === types._import ? this.parseImport(node) : this.parseExport(node, exports4);
            default:
              if (this.isAsyncFunction()) {
                if (context) {
                  this.unexpected();
                }
                this.next();
                return this.parseFunctionStatement(node, true, !context);
              }
              var maybeName = this.value, expr = this.parseExpression();
              if (starttype === types.name && expr.type === "Identifier" && this.eat(types.colon)) {
                return this.parseLabeledStatement(node, maybeName, expr, context);
              } else {
                return this.parseExpressionStatement(node, expr);
              }
          }
        };
        pp$1.parseBreakContinueStatement = function(node, keyword) {
          var isBreak = keyword === "break";
          this.next();
          if (this.eat(types.semi) || this.insertSemicolon()) {
            node.label = null;
          } else if (this.type !== types.name) {
            this.unexpected();
          } else {
            node.label = this.parseIdent();
            this.semicolon();
          }
          var i = 0;
          for (; i < this.labels.length; ++i) {
            var lab = this.labels[i];
            if (node.label == null || lab.name === node.label.name) {
              if (lab.kind != null && (isBreak || lab.kind === "loop")) {
                break;
              }
              if (node.label && isBreak) {
                break;
              }
            }
          }
          if (i === this.labels.length) {
            this.raise(node.start, "Unsyntactic " + keyword);
          }
          return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
        };
        pp$1.parseDebuggerStatement = function(node) {
          this.next();
          this.semicolon();
          return this.finishNode(node, "DebuggerStatement");
        };
        pp$1.parseDoStatement = function(node) {
          this.next();
          this.labels.push(loopLabel);
          node.body = this.parseStatement("do");
          this.labels.pop();
          this.expect(types._while);
          node.test = this.parseParenExpression();
          if (this.options.ecmaVersion >= 6) {
            this.eat(types.semi);
          } else {
            this.semicolon();
          }
          return this.finishNode(node, "DoWhileStatement");
        };
        pp$1.parseForStatement = function(node) {
          this.next();
          var awaitAt = this.options.ecmaVersion >= 9 && (this.inAsync || !this.inFunction && this.options.allowAwaitOutsideFunction) && this.eatContextual("await") ? this.lastTokStart : -1;
          this.labels.push(loopLabel);
          this.enterScope(0);
          this.expect(types.parenL);
          if (this.type === types.semi) {
            if (awaitAt > -1) {
              this.unexpected(awaitAt);
            }
            return this.parseFor(node, null);
          }
          var isLet = this.isLet();
          if (this.type === types._var || this.type === types._const || isLet) {
            var init$1 = this.startNode(), kind = isLet ? "let" : this.value;
            this.next();
            this.parseVar(init$1, true, kind);
            this.finishNode(init$1, "VariableDeclaration");
            if ((this.type === types._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && init$1.declarations.length === 1) {
              if (this.options.ecmaVersion >= 9) {
                if (this.type === types._in) {
                  if (awaitAt > -1) {
                    this.unexpected(awaitAt);
                  }
                } else {
                  node.await = awaitAt > -1;
                }
              }
              return this.parseForIn(node, init$1);
            }
            if (awaitAt > -1) {
              this.unexpected(awaitAt);
            }
            return this.parseFor(node, init$1);
          }
          var refDestructuringErrors = new DestructuringErrors();
          var init = this.parseExpression(true, refDestructuringErrors);
          if (this.type === types._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) {
            if (this.options.ecmaVersion >= 9) {
              if (this.type === types._in) {
                if (awaitAt > -1) {
                  this.unexpected(awaitAt);
                }
              } else {
                node.await = awaitAt > -1;
              }
            }
            this.toAssignable(init, false, refDestructuringErrors);
            this.checkLVal(init);
            return this.parseForIn(node, init);
          } else {
            this.checkExpressionErrors(refDestructuringErrors, true);
          }
          if (awaitAt > -1) {
            this.unexpected(awaitAt);
          }
          return this.parseFor(node, init);
        };
        pp$1.parseFunctionStatement = function(node, isAsync, declarationPosition) {
          this.next();
          return this.parseFunction(node, FUNC_STATEMENT | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT), false, isAsync);
        };
        pp$1.parseIfStatement = function(node) {
          this.next();
          node.test = this.parseParenExpression();
          node.consequent = this.parseStatement("if");
          node.alternate = this.eat(types._else) ? this.parseStatement("if") : null;
          return this.finishNode(node, "IfStatement");
        };
        pp$1.parseReturnStatement = function(node) {
          if (!this.inFunction && !this.options.allowReturnOutsideFunction) {
            this.raise(this.start, "'return' outside of function");
          }
          this.next();
          if (this.eat(types.semi) || this.insertSemicolon()) {
            node.argument = null;
          } else {
            node.argument = this.parseExpression();
            this.semicolon();
          }
          return this.finishNode(node, "ReturnStatement");
        };
        pp$1.parseSwitchStatement = function(node) {
          this.next();
          node.discriminant = this.parseParenExpression();
          node.cases = [];
          this.expect(types.braceL);
          this.labels.push(switchLabel);
          this.enterScope(0);
          var cur;
          for (var sawDefault = false; this.type !== types.braceR; ) {
            if (this.type === types._case || this.type === types._default) {
              var isCase = this.type === types._case;
              if (cur) {
                this.finishNode(cur, "SwitchCase");
              }
              node.cases.push(cur = this.startNode());
              cur.consequent = [];
              this.next();
              if (isCase) {
                cur.test = this.parseExpression();
              } else {
                if (sawDefault) {
                  this.raiseRecoverable(this.lastTokStart, "Multiple default clauses");
                }
                sawDefault = true;
                cur.test = null;
              }
              this.expect(types.colon);
            } else {
              if (!cur) {
                this.unexpected();
              }
              cur.consequent.push(this.parseStatement(null));
            }
          }
          this.exitScope();
          if (cur) {
            this.finishNode(cur, "SwitchCase");
          }
          this.next();
          this.labels.pop();
          return this.finishNode(node, "SwitchStatement");
        };
        pp$1.parseThrowStatement = function(node) {
          this.next();
          if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) {
            this.raise(this.lastTokEnd, "Illegal newline after throw");
          }
          node.argument = this.parseExpression();
          this.semicolon();
          return this.finishNode(node, "ThrowStatement");
        };
        var empty = [];
        pp$1.parseTryStatement = function(node) {
          this.next();
          node.block = this.parseBlock();
          node.handler = null;
          if (this.type === types._catch) {
            var clause = this.startNode();
            this.next();
            if (this.eat(types.parenL)) {
              clause.param = this.parseBindingAtom();
              var simple = clause.param.type === "Identifier";
              this.enterScope(simple ? SCOPE_SIMPLE_CATCH : 0);
              this.checkLVal(clause.param, simple ? BIND_SIMPLE_CATCH : BIND_LEXICAL);
              this.expect(types.parenR);
            } else {
              if (this.options.ecmaVersion < 10) {
                this.unexpected();
              }
              clause.param = null;
              this.enterScope(0);
            }
            clause.body = this.parseBlock(false);
            this.exitScope();
            node.handler = this.finishNode(clause, "CatchClause");
          }
          node.finalizer = this.eat(types._finally) ? this.parseBlock() : null;
          if (!node.handler && !node.finalizer) {
            this.raise(node.start, "Missing catch or finally clause");
          }
          return this.finishNode(node, "TryStatement");
        };
        pp$1.parseVarStatement = function(node, kind) {
          this.next();
          this.parseVar(node, false, kind);
          this.semicolon();
          return this.finishNode(node, "VariableDeclaration");
        };
        pp$1.parseWhileStatement = function(node) {
          this.next();
          node.test = this.parseParenExpression();
          this.labels.push(loopLabel);
          node.body = this.parseStatement("while");
          this.labels.pop();
          return this.finishNode(node, "WhileStatement");
        };
        pp$1.parseWithStatement = function(node) {
          if (this.strict) {
            this.raise(this.start, "'with' in strict mode");
          }
          this.next();
          node.object = this.parseParenExpression();
          node.body = this.parseStatement("with");
          return this.finishNode(node, "WithStatement");
        };
        pp$1.parseEmptyStatement = function(node) {
          this.next();
          return this.finishNode(node, "EmptyStatement");
        };
        pp$1.parseLabeledStatement = function(node, maybeName, expr, context) {
          for (var i$1 = 0, list = this.labels; i$1 < list.length; i$1 += 1) {
            var label = list[i$1];
            if (label.name === maybeName) {
              this.raise(expr.start, "Label '" + maybeName + "' is already declared");
            }
          }
          var kind = this.type.isLoop ? "loop" : this.type === types._switch ? "switch" : null;
          for (var i = this.labels.length - 1; i >= 0; i--) {
            var label$1 = this.labels[i];
            if (label$1.statementStart === node.start) {
              label$1.statementStart = this.start;
              label$1.kind = kind;
            } else {
              break;
            }
          }
          this.labels.push({ name: maybeName, kind, statementStart: this.start });
          node.body = this.parseStatement(context ? context.indexOf("label") === -1 ? context + "label" : context : "label");
          this.labels.pop();
          node.label = expr;
          return this.finishNode(node, "LabeledStatement");
        };
        pp$1.parseExpressionStatement = function(node, expr) {
          node.expression = expr;
          this.semicolon();
          return this.finishNode(node, "ExpressionStatement");
        };
        pp$1.parseBlock = function(createNewLexicalScope, node) {
          if (createNewLexicalScope === void 0)
            createNewLexicalScope = true;
          if (node === void 0)
            node = this.startNode();
          node.body = [];
          this.expect(types.braceL);
          if (createNewLexicalScope) {
            this.enterScope(0);
          }
          while (!this.eat(types.braceR)) {
            var stmt = this.parseStatement(null);
            node.body.push(stmt);
          }
          if (createNewLexicalScope) {
            this.exitScope();
          }
          return this.finishNode(node, "BlockStatement");
        };
        pp$1.parseFor = function(node, init) {
          node.init = init;
          this.expect(types.semi);
          node.test = this.type === types.semi ? null : this.parseExpression();
          this.expect(types.semi);
          node.update = this.type === types.parenR ? null : this.parseExpression();
          this.expect(types.parenR);
          node.body = this.parseStatement("for");
          this.exitScope();
          this.labels.pop();
          return this.finishNode(node, "ForStatement");
        };
        pp$1.parseForIn = function(node, init) {
          var isForIn = this.type === types._in;
          this.next();
          if (init.type === "VariableDeclaration" && init.declarations[0].init != null && (!isForIn || this.options.ecmaVersion < 8 || this.strict || init.kind !== "var" || init.declarations[0].id.type !== "Identifier")) {
            this.raise(init.start, (isForIn ? "for-in" : "for-of") + " loop variable declaration may not have an initializer");
          } else if (init.type === "AssignmentPattern") {
            this.raise(init.start, "Invalid left-hand side in for-loop");
          }
          node.left = init;
          node.right = isForIn ? this.parseExpression() : this.parseMaybeAssign();
          this.expect(types.parenR);
          node.body = this.parseStatement("for");
          this.exitScope();
          this.labels.pop();
          return this.finishNode(node, isForIn ? "ForInStatement" : "ForOfStatement");
        };
        pp$1.parseVar = function(node, isFor, kind) {
          node.declarations = [];
          node.kind = kind;
          for (; ; ) {
            var decl = this.startNode();
            this.parseVarId(decl, kind);
            if (this.eat(types.eq)) {
              decl.init = this.parseMaybeAssign(isFor);
            } else if (kind === "const" && !(this.type === types._in || this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
              this.unexpected();
            } else if (decl.id.type !== "Identifier" && !(isFor && (this.type === types._in || this.isContextual("of")))) {
              this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value");
            } else {
              decl.init = null;
            }
            node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
            if (!this.eat(types.comma)) {
              break;
            }
          }
          return node;
        };
        pp$1.parseVarId = function(decl, kind) {
          decl.id = this.parseBindingAtom();
          this.checkLVal(decl.id, kind === "var" ? BIND_VAR : BIND_LEXICAL, false);
        };
        var FUNC_STATEMENT = 1, FUNC_HANGING_STATEMENT = 2, FUNC_NULLABLE_ID = 4;
        pp$1.parseFunction = function(node, statement, allowExpressionBody, isAsync) {
          this.initFunction(node);
          if (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !isAsync) {
            if (this.type === types.star && statement & FUNC_HANGING_STATEMENT) {
              this.unexpected();
            }
            node.generator = this.eat(types.star);
          }
          if (this.options.ecmaVersion >= 8) {
            node.async = !!isAsync;
          }
          if (statement & FUNC_STATEMENT) {
            node.id = statement & FUNC_NULLABLE_ID && this.type !== types.name ? null : this.parseIdent();
            if (node.id && !(statement & FUNC_HANGING_STATEMENT)) {
              this.checkLVal(node.id, this.strict || node.generator || node.async ? this.treatFunctionsAsVar ? BIND_VAR : BIND_LEXICAL : BIND_FUNCTION);
            }
          }
          var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
          this.yieldPos = 0;
          this.awaitPos = 0;
          this.awaitIdentPos = 0;
          this.enterScope(functionFlags(node.async, node.generator));
          if (!(statement & FUNC_STATEMENT)) {
            node.id = this.type === types.name ? this.parseIdent() : null;
          }
          this.parseFunctionParams(node);
          this.parseFunctionBody(node, allowExpressionBody, false);
          this.yieldPos = oldYieldPos;
          this.awaitPos = oldAwaitPos;
          this.awaitIdentPos = oldAwaitIdentPos;
          return this.finishNode(node, statement & FUNC_STATEMENT ? "FunctionDeclaration" : "FunctionExpression");
        };
        pp$1.parseFunctionParams = function(node) {
          this.expect(types.parenL);
          node.params = this.parseBindingList(types.parenR, false, this.options.ecmaVersion >= 8);
          this.checkYieldAwaitInDefaultParams();
        };
        pp$1.parseClass = function(node, isStatement) {
          this.next();
          var oldStrict = this.strict;
          this.strict = true;
          this.parseClassId(node, isStatement);
          this.parseClassSuper(node);
          var classBody = this.startNode();
          var hadConstructor = false;
          classBody.body = [];
          this.expect(types.braceL);
          while (!this.eat(types.braceR)) {
            var element = this.parseClassElement(node.superClass !== null);
            if (element) {
              classBody.body.push(element);
              if (element.type === "MethodDefinition" && element.kind === "constructor") {
                if (hadConstructor) {
                  this.raise(element.start, "Duplicate constructor in the same class");
                }
                hadConstructor = true;
              }
            }
          }
          node.body = this.finishNode(classBody, "ClassBody");
          this.strict = oldStrict;
          return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
        };
        pp$1.parseClassElement = function(constructorAllowsSuper) {
          var this$1$1 = this;
          if (this.eat(types.semi)) {
            return null;
          }
          var method = this.startNode();
          var tryContextual = function(k, noLineBreak) {
            if (noLineBreak === void 0)
              noLineBreak = false;
            var start = this$1$1.start, startLoc = this$1$1.startLoc;
            if (!this$1$1.eatContextual(k)) {
              return false;
            }
            if (this$1$1.type !== types.parenL && (!noLineBreak || !this$1$1.canInsertSemicolon())) {
              return true;
            }
            if (method.key) {
              this$1$1.unexpected();
            }
            method.computed = false;
            method.key = this$1$1.startNodeAt(start, startLoc);
            method.key.name = k;
            this$1$1.finishNode(method.key, "Identifier");
            return false;
          };
          method.kind = "method";
          method.static = tryContextual("static");
          var isGenerator = this.eat(types.star);
          var isAsync = false;
          if (!isGenerator) {
            if (this.options.ecmaVersion >= 8 && tryContextual("async", true)) {
              isAsync = true;
              isGenerator = this.options.ecmaVersion >= 9 && this.eat(types.star);
            } else if (tryContextual("get")) {
              method.kind = "get";
            } else if (tryContextual("set")) {
              method.kind = "set";
            }
          }
          if (!method.key) {
            this.parsePropertyName(method);
          }
          var key = method.key;
          var allowsDirectSuper = false;
          if (!method.computed && !method.static && (key.type === "Identifier" && key.name === "constructor" || key.type === "Literal" && key.value === "constructor")) {
            if (method.kind !== "method") {
              this.raise(key.start, "Constructor can't have get/set modifier");
            }
            if (isGenerator) {
              this.raise(key.start, "Constructor can't be a generator");
            }
            if (isAsync) {
              this.raise(key.start, "Constructor can't be an async method");
            }
            method.kind = "constructor";
            allowsDirectSuper = constructorAllowsSuper;
          } else if (method.static && key.type === "Identifier" && key.name === "prototype") {
            this.raise(key.start, "Classes may not have a static property named prototype");
          }
          this.parseClassMethod(method, isGenerator, isAsync, allowsDirectSuper);
          if (method.kind === "get" && method.value.params.length !== 0) {
            this.raiseRecoverable(method.value.start, "getter should have no params");
          }
          if (method.kind === "set" && method.value.params.length !== 1) {
            this.raiseRecoverable(method.value.start, "setter should have exactly one param");
          }
          if (method.kind === "set" && method.value.params[0].type === "RestElement") {
            this.raiseRecoverable(method.value.params[0].start, "Setter cannot use rest params");
          }
          return method;
        };
        pp$1.parseClassMethod = function(method, isGenerator, isAsync, allowsDirectSuper) {
          method.value = this.parseMethod(isGenerator, isAsync, allowsDirectSuper);
          return this.finishNode(method, "MethodDefinition");
        };
        pp$1.parseClassId = function(node, isStatement) {
          if (this.type === types.name) {
            node.id = this.parseIdent();
            if (isStatement) {
              this.checkLVal(node.id, BIND_LEXICAL, false);
            }
          } else {
            if (isStatement === true) {
              this.unexpected();
            }
            node.id = null;
          }
        };
        pp$1.parseClassSuper = function(node) {
          node.superClass = this.eat(types._extends) ? this.parseExprSubscripts() : null;
        };
        pp$1.parseExport = function(node, exports4) {
          this.next();
          if (this.eat(types.star)) {
            this.expectContextual("from");
            if (this.type !== types.string) {
              this.unexpected();
            }
            node.source = this.parseExprAtom();
            this.semicolon();
            return this.finishNode(node, "ExportAllDeclaration");
          }
          if (this.eat(types._default)) {
            this.checkExport(exports4, "default", this.lastTokStart);
            var isAsync;
            if (this.type === types._function || (isAsync = this.isAsyncFunction())) {
              var fNode = this.startNode();
              this.next();
              if (isAsync) {
                this.next();
              }
              node.declaration = this.parseFunction(fNode, FUNC_STATEMENT | FUNC_NULLABLE_ID, false, isAsync);
            } else if (this.type === types._class) {
              var cNode = this.startNode();
              node.declaration = this.parseClass(cNode, "nullableID");
            } else {
              node.declaration = this.parseMaybeAssign();
              this.semicolon();
            }
            return this.finishNode(node, "ExportDefaultDeclaration");
          }
          if (this.shouldParseExportStatement()) {
            node.declaration = this.parseStatement(null);
            if (node.declaration.type === "VariableDeclaration") {
              this.checkVariableExport(exports4, node.declaration.declarations);
            } else {
              this.checkExport(exports4, node.declaration.id.name, node.declaration.id.start);
            }
            node.specifiers = [];
            node.source = null;
          } else {
            node.declaration = null;
            node.specifiers = this.parseExportSpecifiers(exports4);
            if (this.eatContextual("from")) {
              if (this.type !== types.string) {
                this.unexpected();
              }
              node.source = this.parseExprAtom();
            } else {
              for (var i = 0, list = node.specifiers; i < list.length; i += 1) {
                var spec = list[i];
                this.checkUnreserved(spec.local);
                this.checkLocalExport(spec.local);
              }
              node.source = null;
            }
            this.semicolon();
          }
          return this.finishNode(node, "ExportNamedDeclaration");
        };
        pp$1.checkExport = function(exports4, name2, pos) {
          if (!exports4) {
            return;
          }
          if (has2(exports4, name2)) {
            this.raiseRecoverable(pos, "Duplicate export '" + name2 + "'");
          }
          exports4[name2] = true;
        };
        pp$1.checkPatternExport = function(exports4, pat) {
          var type = pat.type;
          if (type === "Identifier") {
            this.checkExport(exports4, pat.name, pat.start);
          } else if (type === "ObjectPattern") {
            for (var i = 0, list = pat.properties; i < list.length; i += 1) {
              var prop = list[i];
              this.checkPatternExport(exports4, prop);
            }
          } else if (type === "ArrayPattern") {
            for (var i$1 = 0, list$1 = pat.elements; i$1 < list$1.length; i$1 += 1) {
              var elt = list$1[i$1];
              if (elt) {
                this.checkPatternExport(exports4, elt);
              }
            }
          } else if (type === "Property") {
            this.checkPatternExport(exports4, pat.value);
          } else if (type === "AssignmentPattern") {
            this.checkPatternExport(exports4, pat.left);
          } else if (type === "RestElement") {
            this.checkPatternExport(exports4, pat.argument);
          } else if (type === "ParenthesizedExpression") {
            this.checkPatternExport(exports4, pat.expression);
          }
        };
        pp$1.checkVariableExport = function(exports4, decls) {
          if (!exports4) {
            return;
          }
          for (var i = 0, list = decls; i < list.length; i += 1) {
            var decl = list[i];
            this.checkPatternExport(exports4, decl.id);
          }
        };
        pp$1.shouldParseExportStatement = function() {
          return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
        };
        pp$1.parseExportSpecifiers = function(exports4) {
          var nodes = [], first = true;
          this.expect(types.braceL);
          while (!this.eat(types.braceR)) {
            if (!first) {
              this.expect(types.comma);
              if (this.afterTrailingComma(types.braceR)) {
                break;
              }
            } else {
              first = false;
            }
            var node = this.startNode();
            node.local = this.parseIdent(true);
            node.exported = this.eatContextual("as") ? this.parseIdent(true) : node.local;
            this.checkExport(exports4, node.exported.name, node.exported.start);
            nodes.push(this.finishNode(node, "ExportSpecifier"));
          }
          return nodes;
        };
        pp$1.parseImport = function(node) {
          this.next();
          if (this.type === types.string) {
            node.specifiers = empty;
            node.source = this.parseExprAtom();
          } else {
            node.specifiers = this.parseImportSpecifiers();
            this.expectContextual("from");
            node.source = this.type === types.string ? this.parseExprAtom() : this.unexpected();
          }
          this.semicolon();
          return this.finishNode(node, "ImportDeclaration");
        };
        pp$1.parseImportSpecifiers = function() {
          var nodes = [], first = true;
          if (this.type === types.name) {
            var node = this.startNode();
            node.local = this.parseIdent();
            this.checkLVal(node.local, BIND_LEXICAL);
            nodes.push(this.finishNode(node, "ImportDefaultSpecifier"));
            if (!this.eat(types.comma)) {
              return nodes;
            }
          }
          if (this.type === types.star) {
            var node$1 = this.startNode();
            this.next();
            this.expectContextual("as");
            node$1.local = this.parseIdent();
            this.checkLVal(node$1.local, BIND_LEXICAL);
            nodes.push(this.finishNode(node$1, "ImportNamespaceSpecifier"));
            return nodes;
          }
          this.expect(types.braceL);
          while (!this.eat(types.braceR)) {
            if (!first) {
              this.expect(types.comma);
              if (this.afterTrailingComma(types.braceR)) {
                break;
              }
            } else {
              first = false;
            }
            var node$2 = this.startNode();
            node$2.imported = this.parseIdent(true);
            if (this.eatContextual("as")) {
              node$2.local = this.parseIdent();
            } else {
              this.checkUnreserved(node$2.imported);
              node$2.local = node$2.imported;
            }
            this.checkLVal(node$2.local, BIND_LEXICAL);
            nodes.push(this.finishNode(node$2, "ImportSpecifier"));
          }
          return nodes;
        };
        pp$1.adaptDirectivePrologue = function(statements) {
          for (var i = 0; i < statements.length && this.isDirectiveCandidate(statements[i]); ++i) {
            statements[i].directive = statements[i].expression.raw.slice(1, -1);
          }
        };
        pp$1.isDirectiveCandidate = function(statement) {
          return statement.type === "ExpressionStatement" && statement.expression.type === "Literal" && typeof statement.expression.value === "string" && (this.input[statement.start] === '"' || this.input[statement.start] === "'");
        };
        var pp$2 = Parser.prototype;
        pp$2.toAssignable = function(node, isBinding, refDestructuringErrors) {
          if (this.options.ecmaVersion >= 6 && node) {
            switch (node.type) {
              case "Identifier":
                if (this.inAsync && node.name === "await") {
                  this.raise(node.start, "Cannot use 'await' as identifier inside an async function");
                }
                break;
              case "ObjectPattern":
              case "ArrayPattern":
              case "RestElement":
                break;
              case "ObjectExpression":
                node.type = "ObjectPattern";
                if (refDestructuringErrors) {
                  this.checkPatternErrors(refDestructuringErrors, true);
                }
                for (var i = 0, list = node.properties; i < list.length; i += 1) {
                  var prop = list[i];
                  this.toAssignable(prop, isBinding);
                  if (prop.type === "RestElement" && (prop.argument.type === "ArrayPattern" || prop.argument.type === "ObjectPattern")) {
                    this.raise(prop.argument.start, "Unexpected token");
                  }
                }
                break;
              case "Property":
                if (node.kind !== "init") {
                  this.raise(node.key.start, "Object pattern can't contain getter or setter");
                }
                this.toAssignable(node.value, isBinding);
                break;
              case "ArrayExpression":
                node.type = "ArrayPattern";
                if (refDestructuringErrors) {
                  this.checkPatternErrors(refDestructuringErrors, true);
                }
                this.toAssignableList(node.elements, isBinding);
                break;
              case "SpreadElement":
                node.type = "RestElement";
                this.toAssignable(node.argument, isBinding);
                if (node.argument.type === "AssignmentPattern") {
                  this.raise(node.argument.start, "Rest elements cannot have a default value");
                }
                break;
              case "AssignmentExpression":
                if (node.operator !== "=") {
                  this.raise(node.left.end, "Only '=' operator can be used for specifying default value.");
                }
                node.type = "AssignmentPattern";
                delete node.operator;
                this.toAssignable(node.left, isBinding);
              case "AssignmentPattern":
                break;
              case "ParenthesizedExpression":
                this.toAssignable(node.expression, isBinding, refDestructuringErrors);
                break;
              case "MemberExpression":
                if (!isBinding) {
                  break;
                }
              default:
                this.raise(node.start, "Assigning to rvalue");
            }
          } else if (refDestructuringErrors) {
            this.checkPatternErrors(refDestructuringErrors, true);
          }
          return node;
        };
        pp$2.toAssignableList = function(exprList, isBinding) {
          var end = exprList.length;
          for (var i = 0; i < end; i++) {
            var elt = exprList[i];
            if (elt) {
              this.toAssignable(elt, isBinding);
            }
          }
          if (end) {
            var last = exprList[end - 1];
            if (this.options.ecmaVersion === 6 && isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier") {
              this.unexpected(last.argument.start);
            }
          }
          return exprList;
        };
        pp$2.parseSpread = function(refDestructuringErrors) {
          var node = this.startNode();
          this.next();
          node.argument = this.parseMaybeAssign(false, refDestructuringErrors);
          return this.finishNode(node, "SpreadElement");
        };
        pp$2.parseRestBinding = function() {
          var node = this.startNode();
          this.next();
          if (this.options.ecmaVersion === 6 && this.type !== types.name) {
            this.unexpected();
          }
          node.argument = this.parseBindingAtom();
          return this.finishNode(node, "RestElement");
        };
        pp$2.parseBindingAtom = function() {
          if (this.options.ecmaVersion >= 6) {
            switch (this.type) {
              case types.bracketL:
                var node = this.startNode();
                this.next();
                node.elements = this.parseBindingList(types.bracketR, true, true);
                return this.finishNode(node, "ArrayPattern");
              case types.braceL:
                return this.parseObj(true);
            }
          }
          return this.parseIdent();
        };
        pp$2.parseBindingList = function(close, allowEmpty, allowTrailingComma) {
          var elts = [], first = true;
          while (!this.eat(close)) {
            if (first) {
              first = false;
            } else {
              this.expect(types.comma);
            }
            if (allowEmpty && this.type === types.comma) {
              elts.push(null);
            } else if (allowTrailingComma && this.afterTrailingComma(close)) {
              break;
            } else if (this.type === types.ellipsis) {
              var rest = this.parseRestBinding();
              this.parseBindingListItem(rest);
              elts.push(rest);
              if (this.type === types.comma) {
                this.raise(this.start, "Comma is not permitted after the rest element");
              }
              this.expect(close);
              break;
            } else {
              var elem = this.parseMaybeDefault(this.start, this.startLoc);
              this.parseBindingListItem(elem);
              elts.push(elem);
            }
          }
          return elts;
        };
        pp$2.parseBindingListItem = function(param) {
          return param;
        };
        pp$2.parseMaybeDefault = function(startPos, startLoc, left) {
          left = left || this.parseBindingAtom();
          if (this.options.ecmaVersion < 6 || !this.eat(types.eq)) {
            return left;
          }
          var node = this.startNodeAt(startPos, startLoc);
          node.left = left;
          node.right = this.parseMaybeAssign();
          return this.finishNode(node, "AssignmentPattern");
        };
        pp$2.checkLVal = function(expr, bindingType, checkClashes) {
          if (bindingType === void 0)
            bindingType = BIND_NONE;
          switch (expr.type) {
            case "Identifier":
              if (bindingType === BIND_LEXICAL && expr.name === "let") {
                this.raiseRecoverable(expr.start, "let is disallowed as a lexically bound name");
              }
              if (this.strict && this.reservedWordsStrictBind.test(expr.name)) {
                this.raiseRecoverable(expr.start, (bindingType ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
              }
              if (checkClashes) {
                if (has2(checkClashes, expr.name)) {
                  this.raiseRecoverable(expr.start, "Argument name clash");
                }
                checkClashes[expr.name] = true;
              }
              if (bindingType !== BIND_NONE && bindingType !== BIND_OUTSIDE) {
                this.declareName(expr.name, bindingType, expr.start);
              }
              break;
            case "MemberExpression":
              if (bindingType) {
                this.raiseRecoverable(expr.start, "Binding member expression");
              }
              break;
            case "ObjectPattern":
              for (var i = 0, list = expr.properties; i < list.length; i += 1) {
                var prop = list[i];
                this.checkLVal(prop, bindingType, checkClashes);
              }
              break;
            case "Property":
              this.checkLVal(expr.value, bindingType, checkClashes);
              break;
            case "ArrayPattern":
              for (var i$1 = 0, list$1 = expr.elements; i$1 < list$1.length; i$1 += 1) {
                var elem = list$1[i$1];
                if (elem) {
                  this.checkLVal(elem, bindingType, checkClashes);
                }
              }
              break;
            case "AssignmentPattern":
              this.checkLVal(expr.left, bindingType, checkClashes);
              break;
            case "RestElement":
              this.checkLVal(expr.argument, bindingType, checkClashes);
              break;
            case "ParenthesizedExpression":
              this.checkLVal(expr.expression, bindingType, checkClashes);
              break;
            default:
              this.raise(expr.start, (bindingType ? "Binding" : "Assigning to") + " rvalue");
          }
        };
        var pp$3 = Parser.prototype;
        pp$3.checkPropClash = function(prop, propHash, refDestructuringErrors) {
          if (this.options.ecmaVersion >= 9 && prop.type === "SpreadElement") {
            return;
          }
          if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand)) {
            return;
          }
          var key = prop.key;
          var name2;
          switch (key.type) {
            case "Identifier":
              name2 = key.name;
              break;
            case "Literal":
              name2 = String(key.value);
              break;
            default:
              return;
          }
          var kind = prop.kind;
          if (this.options.ecmaVersion >= 6) {
            if (name2 === "__proto__" && kind === "init") {
              if (propHash.proto) {
                if (refDestructuringErrors) {
                  if (refDestructuringErrors.doubleProto < 0) {
                    refDestructuringErrors.doubleProto = key.start;
                  }
                } else {
                  this.raiseRecoverable(key.start, "Redefinition of __proto__ property");
                }
              }
              propHash.proto = true;
            }
            return;
          }
          name2 = "$" + name2;
          var other = propHash[name2];
          if (other) {
            var redefinition;
            if (kind === "init") {
              redefinition = this.strict && other.init || other.get || other.set;
            } else {
              redefinition = other.init || other[kind];
            }
            if (redefinition) {
              this.raiseRecoverable(key.start, "Redefinition of property");
            }
          } else {
            other = propHash[name2] = {
              init: false,
              get: false,
              set: false
            };
          }
          other[kind] = true;
        };
        pp$3.parseExpression = function(noIn, refDestructuringErrors) {
          var startPos = this.start, startLoc = this.startLoc;
          var expr = this.parseMaybeAssign(noIn, refDestructuringErrors);
          if (this.type === types.comma) {
            var node = this.startNodeAt(startPos, startLoc);
            node.expressions = [expr];
            while (this.eat(types.comma)) {
              node.expressions.push(this.parseMaybeAssign(noIn, refDestructuringErrors));
            }
            return this.finishNode(node, "SequenceExpression");
          }
          return expr;
        };
        pp$3.parseMaybeAssign = function(noIn, refDestructuringErrors, afterLeftParse) {
          if (this.isContextual("yield")) {
            if (this.inGenerator) {
              return this.parseYield(noIn);
            } else {
              this.exprAllowed = false;
            }
          }
          var ownDestructuringErrors = false, oldParenAssign = -1, oldTrailingComma = -1;
          if (refDestructuringErrors) {
            oldParenAssign = refDestructuringErrors.parenthesizedAssign;
            oldTrailingComma = refDestructuringErrors.trailingComma;
            refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1;
          } else {
            refDestructuringErrors = new DestructuringErrors();
            ownDestructuringErrors = true;
          }
          var startPos = this.start, startLoc = this.startLoc;
          if (this.type === types.parenL || this.type === types.name) {
            this.potentialArrowAt = this.start;
          }
          var left = this.parseMaybeConditional(noIn, refDestructuringErrors);
          if (afterLeftParse) {
            left = afterLeftParse.call(this, left, startPos, startLoc);
          }
          if (this.type.isAssign) {
            var node = this.startNodeAt(startPos, startLoc);
            node.operator = this.value;
            node.left = this.type === types.eq ? this.toAssignable(left, false, refDestructuringErrors) : left;
            if (!ownDestructuringErrors) {
              refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = refDestructuringErrors.doubleProto = -1;
            }
            if (refDestructuringErrors.shorthandAssign >= node.left.start) {
              refDestructuringErrors.shorthandAssign = -1;
            }
            this.checkLVal(left);
            this.next();
            node.right = this.parseMaybeAssign(noIn);
            return this.finishNode(node, "AssignmentExpression");
          } else {
            if (ownDestructuringErrors) {
              this.checkExpressionErrors(refDestructuringErrors, true);
            }
          }
          if (oldParenAssign > -1) {
            refDestructuringErrors.parenthesizedAssign = oldParenAssign;
          }
          if (oldTrailingComma > -1) {
            refDestructuringErrors.trailingComma = oldTrailingComma;
          }
          return left;
        };
        pp$3.parseMaybeConditional = function(noIn, refDestructuringErrors) {
          var startPos = this.start, startLoc = this.startLoc;
          var expr = this.parseExprOps(noIn, refDestructuringErrors);
          if (this.checkExpressionErrors(refDestructuringErrors)) {
            return expr;
          }
          if (this.eat(types.question)) {
            var node = this.startNodeAt(startPos, startLoc);
            node.test = expr;
            node.consequent = this.parseMaybeAssign();
            this.expect(types.colon);
            node.alternate = this.parseMaybeAssign(noIn);
            return this.finishNode(node, "ConditionalExpression");
          }
          return expr;
        };
        pp$3.parseExprOps = function(noIn, refDestructuringErrors) {
          var startPos = this.start, startLoc = this.startLoc;
          var expr = this.parseMaybeUnary(refDestructuringErrors, false);
          if (this.checkExpressionErrors(refDestructuringErrors)) {
            return expr;
          }
          return expr.start === startPos && expr.type === "ArrowFunctionExpression" ? expr : this.parseExprOp(expr, startPos, startLoc, -1, noIn);
        };
        pp$3.parseExprOp = function(left, leftStartPos, leftStartLoc, minPrec, noIn) {
          var prec = this.type.binop;
          if (prec != null && (!noIn || this.type !== types._in)) {
            if (prec > minPrec) {
              var logical = this.type === types.logicalOR || this.type === types.logicalAND;
              var op = this.value;
              this.next();
              var startPos = this.start, startLoc = this.startLoc;
              var right = this.parseExprOp(this.parseMaybeUnary(null, false), startPos, startLoc, prec, noIn);
              var node = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical);
              return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, noIn);
            }
          }
          return left;
        };
        pp$3.buildBinary = function(startPos, startLoc, left, right, op, logical) {
          var node = this.startNodeAt(startPos, startLoc);
          node.left = left;
          node.operator = op;
          node.right = right;
          return this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression");
        };
        pp$3.parseMaybeUnary = function(refDestructuringErrors, sawUnary) {
          var startPos = this.start, startLoc = this.startLoc, expr;
          if (this.isContextual("await") && (this.inAsync || !this.inFunction && this.options.allowAwaitOutsideFunction)) {
            expr = this.parseAwait();
            sawUnary = true;
          } else if (this.type.prefix) {
            var node = this.startNode(), update = this.type === types.incDec;
            node.operator = this.value;
            node.prefix = true;
            this.next();
            node.argument = this.parseMaybeUnary(null, true);
            this.checkExpressionErrors(refDestructuringErrors, true);
            if (update) {
              this.checkLVal(node.argument);
            } else if (this.strict && node.operator === "delete" && node.argument.type === "Identifier") {
              this.raiseRecoverable(node.start, "Deleting local variable in strict mode");
            } else {
              sawUnary = true;
            }
            expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
          } else {
            expr = this.parseExprSubscripts(refDestructuringErrors);
            if (this.checkExpressionErrors(refDestructuringErrors)) {
              return expr;
            }
            while (this.type.postfix && !this.canInsertSemicolon()) {
              var node$1 = this.startNodeAt(startPos, startLoc);
              node$1.operator = this.value;
              node$1.prefix = false;
              node$1.argument = expr;
              this.checkLVal(expr);
              this.next();
              expr = this.finishNode(node$1, "UpdateExpression");
            }
          }
          if (!sawUnary && this.eat(types.starstar)) {
            return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false), "**", false);
          } else {
            return expr;
          }
        };
        pp$3.parseExprSubscripts = function(refDestructuringErrors) {
          var startPos = this.start, startLoc = this.startLoc;
          var expr = this.parseExprAtom(refDestructuringErrors);
          if (expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")") {
            return expr;
          }
          var result = this.parseSubscripts(expr, startPos, startLoc);
          if (refDestructuringErrors && result.type === "MemberExpression") {
            if (refDestructuringErrors.parenthesizedAssign >= result.start) {
              refDestructuringErrors.parenthesizedAssign = -1;
            }
            if (refDestructuringErrors.parenthesizedBind >= result.start) {
              refDestructuringErrors.parenthesizedBind = -1;
            }
          }
          return result;
        };
        pp$3.parseSubscripts = function(base, startPos, startLoc, noCalls) {
          var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base.type === "Identifier" && base.name === "async" && this.lastTokEnd === base.end && !this.canInsertSemicolon() && this.input.slice(base.start, base.end) === "async";
          while (true) {
            var element = this.parseSubscript(base, startPos, startLoc, noCalls, maybeAsyncArrow);
            if (element === base || element.type === "ArrowFunctionExpression") {
              return element;
            }
            base = element;
          }
        };
        pp$3.parseSubscript = function(base, startPos, startLoc, noCalls, maybeAsyncArrow) {
          var computed = this.eat(types.bracketL);
          if (computed || this.eat(types.dot)) {
            var node = this.startNodeAt(startPos, startLoc);
            node.object = base;
            node.property = computed ? this.parseExpression() : this.parseIdent(this.options.allowReserved !== "never");
            node.computed = !!computed;
            if (computed) {
              this.expect(types.bracketR);
            }
            base = this.finishNode(node, "MemberExpression");
          } else if (!noCalls && this.eat(types.parenL)) {
            var refDestructuringErrors = new DestructuringErrors(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
            this.yieldPos = 0;
            this.awaitPos = 0;
            this.awaitIdentPos = 0;
            var exprList = this.parseExprList(types.parenR, this.options.ecmaVersion >= 8, false, refDestructuringErrors);
            if (maybeAsyncArrow && !this.canInsertSemicolon() && this.eat(types.arrow)) {
              this.checkPatternErrors(refDestructuringErrors, false);
              this.checkYieldAwaitInDefaultParams();
              if (this.awaitIdentPos > 0) {
                this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function");
              }
              this.yieldPos = oldYieldPos;
              this.awaitPos = oldAwaitPos;
              this.awaitIdentPos = oldAwaitIdentPos;
              return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, true);
            }
            this.checkExpressionErrors(refDestructuringErrors, true);
            this.yieldPos = oldYieldPos || this.yieldPos;
            this.awaitPos = oldAwaitPos || this.awaitPos;
            this.awaitIdentPos = oldAwaitIdentPos || this.awaitIdentPos;
            var node$1 = this.startNodeAt(startPos, startLoc);
            node$1.callee = base;
            node$1.arguments = exprList;
            base = this.finishNode(node$1, "CallExpression");
          } else if (this.type === types.backQuote) {
            var node$2 = this.startNodeAt(startPos, startLoc);
            node$2.tag = base;
            node$2.quasi = this.parseTemplate({ isTagged: true });
            base = this.finishNode(node$2, "TaggedTemplateExpression");
          }
          return base;
        };
        pp$3.parseExprAtom = function(refDestructuringErrors) {
          if (this.type === types.slash) {
            this.readRegexp();
          }
          var node, canBeArrow = this.potentialArrowAt === this.start;
          switch (this.type) {
            case types._super:
              if (!this.allowSuper) {
                this.raise(this.start, "'super' keyword outside a method");
              }
              node = this.startNode();
              this.next();
              if (this.type === types.parenL && !this.allowDirectSuper) {
                this.raise(node.start, "super() call outside constructor of a subclass");
              }
              if (this.type !== types.dot && this.type !== types.bracketL && this.type !== types.parenL) {
                this.unexpected();
              }
              return this.finishNode(node, "Super");
            case types._this:
              node = this.startNode();
              this.next();
              return this.finishNode(node, "ThisExpression");
            case types.name:
              var startPos = this.start, startLoc = this.startLoc, containsEsc = this.containsEsc;
              var id = this.parseIdent(false);
              if (this.options.ecmaVersion >= 8 && !containsEsc && id.name === "async" && !this.canInsertSemicolon() && this.eat(types._function)) {
                return this.parseFunction(this.startNodeAt(startPos, startLoc), 0, false, true);
              }
              if (canBeArrow && !this.canInsertSemicolon()) {
                if (this.eat(types.arrow)) {
                  return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], false);
                }
                if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === types.name && !containsEsc) {
                  id = this.parseIdent(false);
                  if (this.canInsertSemicolon() || !this.eat(types.arrow)) {
                    this.unexpected();
                  }
                  return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], true);
                }
              }
              return id;
            case types.regexp:
              var value2 = this.value;
              node = this.parseLiteral(value2.value);
              node.regex = { pattern: value2.pattern, flags: value2.flags };
              return node;
            case types.num:
            case types.string:
              return this.parseLiteral(this.value);
            case types._null:
            case types._true:
            case types._false:
              node = this.startNode();
              node.value = this.type === types._null ? null : this.type === types._true;
              node.raw = this.type.keyword;
              this.next();
              return this.finishNode(node, "Literal");
            case types.parenL:
              var start = this.start, expr = this.parseParenAndDistinguishExpression(canBeArrow);
              if (refDestructuringErrors) {
                if (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr)) {
                  refDestructuringErrors.parenthesizedAssign = start;
                }
                if (refDestructuringErrors.parenthesizedBind < 0) {
                  refDestructuringErrors.parenthesizedBind = start;
                }
              }
              return expr;
            case types.bracketL:
              node = this.startNode();
              this.next();
              node.elements = this.parseExprList(types.bracketR, true, true, refDestructuringErrors);
              return this.finishNode(node, "ArrayExpression");
            case types.braceL:
              return this.parseObj(false, refDestructuringErrors);
            case types._function:
              node = this.startNode();
              this.next();
              return this.parseFunction(node, 0);
            case types._class:
              return this.parseClass(this.startNode(), false);
            case types._new:
              return this.parseNew();
            case types.backQuote:
              return this.parseTemplate();
            case types._import:
              if (this.options.ecmaVersion >= 11) {
                return this.parseExprImport();
              } else {
                return this.unexpected();
              }
            default:
              this.unexpected();
          }
        };
        pp$3.parseExprImport = function() {
          var node = this.startNode();
          this.next();
          switch (this.type) {
            case types.parenL:
              return this.parseDynamicImport(node);
            default:
              this.unexpected();
          }
        };
        pp$3.parseDynamicImport = function(node) {
          this.next();
          node.source = this.parseMaybeAssign();
          if (!this.eat(types.parenR)) {
            var errorPos = this.start;
            if (this.eat(types.comma) && this.eat(types.parenR)) {
              this.raiseRecoverable(errorPos, "Trailing comma is not allowed in import()");
            } else {
              this.unexpected(errorPos);
            }
          }
          return this.finishNode(node, "ImportExpression");
        };
        pp$3.parseLiteral = function(value2) {
          var node = this.startNode();
          node.value = value2;
          node.raw = this.input.slice(this.start, this.end);
          if (node.raw.charCodeAt(node.raw.length - 1) === 110) {
            node.bigint = node.raw.slice(0, -1);
          }
          this.next();
          return this.finishNode(node, "Literal");
        };
        pp$3.parseParenExpression = function() {
          this.expect(types.parenL);
          var val = this.parseExpression();
          this.expect(types.parenR);
          return val;
        };
        pp$3.parseParenAndDistinguishExpression = function(canBeArrow) {
          var startPos = this.start, startLoc = this.startLoc, val, allowTrailingComma = this.options.ecmaVersion >= 8;
          if (this.options.ecmaVersion >= 6) {
            this.next();
            var innerStartPos = this.start, innerStartLoc = this.startLoc;
            var exprList = [], first = true, lastIsComma = false;
            var refDestructuringErrors = new DestructuringErrors(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, spreadStart;
            this.yieldPos = 0;
            this.awaitPos = 0;
            while (this.type !== types.parenR) {
              first ? first = false : this.expect(types.comma);
              if (allowTrailingComma && this.afterTrailingComma(types.parenR, true)) {
                lastIsComma = true;
                break;
              } else if (this.type === types.ellipsis) {
                spreadStart = this.start;
                exprList.push(this.parseParenItem(this.parseRestBinding()));
                if (this.type === types.comma) {
                  this.raise(this.start, "Comma is not permitted after the rest element");
                }
                break;
              } else {
                exprList.push(this.parseMaybeAssign(false, refDestructuringErrors, this.parseParenItem));
              }
            }
            var innerEndPos = this.start, innerEndLoc = this.startLoc;
            this.expect(types.parenR);
            if (canBeArrow && !this.canInsertSemicolon() && this.eat(types.arrow)) {
              this.checkPatternErrors(refDestructuringErrors, false);
              this.checkYieldAwaitInDefaultParams();
              this.yieldPos = oldYieldPos;
              this.awaitPos = oldAwaitPos;
              return this.parseParenArrowList(startPos, startLoc, exprList);
            }
            if (!exprList.length || lastIsComma) {
              this.unexpected(this.lastTokStart);
            }
            if (spreadStart) {
              this.unexpected(spreadStart);
            }
            this.checkExpressionErrors(refDestructuringErrors, true);
            this.yieldPos = oldYieldPos || this.yieldPos;
            this.awaitPos = oldAwaitPos || this.awaitPos;
            if (exprList.length > 1) {
              val = this.startNodeAt(innerStartPos, innerStartLoc);
              val.expressions = exprList;
              this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
            } else {
              val = exprList[0];
            }
          } else {
            val = this.parseParenExpression();
          }
          if (this.options.preserveParens) {
            var par = this.startNodeAt(startPos, startLoc);
            par.expression = val;
            return this.finishNode(par, "ParenthesizedExpression");
          } else {
            return val;
          }
        };
        pp$3.parseParenItem = function(item) {
          return item;
        };
        pp$3.parseParenArrowList = function(startPos, startLoc, exprList) {
          return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList);
        };
        var empty$1 = [];
        pp$3.parseNew = function() {
          if (this.containsEsc) {
            this.raiseRecoverable(this.start, "Escape sequence in keyword new");
          }
          var node = this.startNode();
          var meta = this.parseIdent(true);
          if (this.options.ecmaVersion >= 6 && this.eat(types.dot)) {
            node.meta = meta;
            var containsEsc = this.containsEsc;
            node.property = this.parseIdent(true);
            if (node.property.name !== "target" || containsEsc) {
              this.raiseRecoverable(node.property.start, "The only valid meta property for new is new.target");
            }
            if (!this.inNonArrowFunction()) {
              this.raiseRecoverable(node.start, "new.target can only be used in functions");
            }
            return this.finishNode(node, "MetaProperty");
          }
          var startPos = this.start, startLoc = this.startLoc, isImport = this.type === types._import;
          node.callee = this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true);
          if (isImport && node.callee.type === "ImportExpression") {
            this.raise(startPos, "Cannot use new with import()");
          }
          if (this.eat(types.parenL)) {
            node.arguments = this.parseExprList(types.parenR, this.options.ecmaVersion >= 8, false);
          } else {
            node.arguments = empty$1;
          }
          return this.finishNode(node, "NewExpression");
        };
        pp$3.parseTemplateElement = function(ref3) {
          var isTagged = ref3.isTagged;
          var elem = this.startNode();
          if (this.type === types.invalidTemplate) {
            if (!isTagged) {
              this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal");
            }
            elem.value = {
              raw: this.value,
              cooked: null
            };
          } else {
            elem.value = {
              raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
              cooked: this.value
            };
          }
          this.next();
          elem.tail = this.type === types.backQuote;
          return this.finishNode(elem, "TemplateElement");
        };
        pp$3.parseTemplate = function(ref3) {
          if (ref3 === void 0)
            ref3 = {};
          var isTagged = ref3.isTagged;
          if (isTagged === void 0)
            isTagged = false;
          var node = this.startNode();
          this.next();
          node.expressions = [];
          var curElt = this.parseTemplateElement({ isTagged });
          node.quasis = [curElt];
          while (!curElt.tail) {
            if (this.type === types.eof) {
              this.raise(this.pos, "Unterminated template literal");
            }
            this.expect(types.dollarBraceL);
            node.expressions.push(this.parseExpression());
            this.expect(types.braceR);
            node.quasis.push(curElt = this.parseTemplateElement({ isTagged }));
          }
          this.next();
          return this.finishNode(node, "TemplateLiteral");
        };
        pp$3.isAsyncProp = function(prop) {
          return !prop.computed && prop.key.type === "Identifier" && prop.key.name === "async" && (this.type === types.name || this.type === types.num || this.type === types.string || this.type === types.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === types.star) && !lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
        };
        pp$3.parseObj = function(isPattern, refDestructuringErrors) {
          var node = this.startNode(), first = true, propHash = {};
          node.properties = [];
          this.next();
          while (!this.eat(types.braceR)) {
            if (!first) {
              this.expect(types.comma);
              if (this.options.ecmaVersion >= 5 && this.afterTrailingComma(types.braceR)) {
                break;
              }
            } else {
              first = false;
            }
            var prop = this.parseProperty(isPattern, refDestructuringErrors);
            if (!isPattern) {
              this.checkPropClash(prop, propHash, refDestructuringErrors);
            }
            node.properties.push(prop);
          }
          return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
        };
        pp$3.parseProperty = function(isPattern, refDestructuringErrors) {
          var prop = this.startNode(), isGenerator, isAsync, startPos, startLoc;
          if (this.options.ecmaVersion >= 9 && this.eat(types.ellipsis)) {
            if (isPattern) {
              prop.argument = this.parseIdent(false);
              if (this.type === types.comma) {
                this.raise(this.start, "Comma is not permitted after the rest element");
              }
              return this.finishNode(prop, "RestElement");
            }
            if (this.type === types.parenL && refDestructuringErrors) {
              if (refDestructuringErrors.parenthesizedAssign < 0) {
                refDestructuringErrors.parenthesizedAssign = this.start;
              }
              if (refDestructuringErrors.parenthesizedBind < 0) {
                refDestructuringErrors.parenthesizedBind = this.start;
              }
            }
            prop.argument = this.parseMaybeAssign(false, refDestructuringErrors);
            if (this.type === types.comma && refDestructuringErrors && refDestructuringErrors.trailingComma < 0) {
              refDestructuringErrors.trailingComma = this.start;
            }
            return this.finishNode(prop, "SpreadElement");
          }
          if (this.options.ecmaVersion >= 6) {
            prop.method = false;
            prop.shorthand = false;
            if (isPattern || refDestructuringErrors) {
              startPos = this.start;
              startLoc = this.startLoc;
            }
            if (!isPattern) {
              isGenerator = this.eat(types.star);
            }
          }
          var containsEsc = this.containsEsc;
          this.parsePropertyName(prop);
          if (!isPattern && !containsEsc && this.options.ecmaVersion >= 8 && !isGenerator && this.isAsyncProp(prop)) {
            isAsync = true;
            isGenerator = this.options.ecmaVersion >= 9 && this.eat(types.star);
            this.parsePropertyName(prop, refDestructuringErrors);
          } else {
            isAsync = false;
          }
          this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc);
          return this.finishNode(prop, "Property");
        };
        pp$3.parsePropertyValue = function(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc) {
          if ((isGenerator || isAsync) && this.type === types.colon) {
            this.unexpected();
          }
          if (this.eat(types.colon)) {
            prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors);
            prop.kind = "init";
          } else if (this.options.ecmaVersion >= 6 && this.type === types.parenL) {
            if (isPattern) {
              this.unexpected();
            }
            prop.kind = "init";
            prop.method = true;
            prop.value = this.parseMethod(isGenerator, isAsync);
          } else if (!isPattern && !containsEsc && this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set") && (this.type !== types.comma && this.type !== types.braceR)) {
            if (isGenerator || isAsync) {
              this.unexpected();
            }
            prop.kind = prop.key.name;
            this.parsePropertyName(prop);
            prop.value = this.parseMethod(false);
            var paramCount = prop.kind === "get" ? 0 : 1;
            if (prop.value.params.length !== paramCount) {
              var start = prop.value.start;
              if (prop.kind === "get") {
                this.raiseRecoverable(start, "getter should have no params");
              } else {
                this.raiseRecoverable(start, "setter should have exactly one param");
              }
            } else {
              if (prop.kind === "set" && prop.value.params[0].type === "RestElement") {
                this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params");
              }
            }
          } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
            if (isGenerator || isAsync) {
              this.unexpected();
            }
            this.checkUnreserved(prop.key);
            if (prop.key.name === "await" && !this.awaitIdentPos) {
              this.awaitIdentPos = startPos;
            }
            prop.kind = "init";
            if (isPattern) {
              prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
            } else if (this.type === types.eq && refDestructuringErrors) {
              if (refDestructuringErrors.shorthandAssign < 0) {
                refDestructuringErrors.shorthandAssign = this.start;
              }
              prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
            } else {
              prop.value = prop.key;
            }
            prop.shorthand = true;
          } else {
            this.unexpected();
          }
        };
        pp$3.parsePropertyName = function(prop) {
          if (this.options.ecmaVersion >= 6) {
            if (this.eat(types.bracketL)) {
              prop.computed = true;
              prop.key = this.parseMaybeAssign();
              this.expect(types.bracketR);
              return prop.key;
            } else {
              prop.computed = false;
            }
          }
          return prop.key = this.type === types.num || this.type === types.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
        };
        pp$3.initFunction = function(node) {
          node.id = null;
          if (this.options.ecmaVersion >= 6) {
            node.generator = node.expression = false;
          }
          if (this.options.ecmaVersion >= 8) {
            node.async = false;
          }
        };
        pp$3.parseMethod = function(isGenerator, isAsync, allowDirectSuper) {
          var node = this.startNode(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
          this.initFunction(node);
          if (this.options.ecmaVersion >= 6) {
            node.generator = isGenerator;
          }
          if (this.options.ecmaVersion >= 8) {
            node.async = !!isAsync;
          }
          this.yieldPos = 0;
          this.awaitPos = 0;
          this.awaitIdentPos = 0;
          this.enterScope(functionFlags(isAsync, node.generator) | SCOPE_SUPER | (allowDirectSuper ? SCOPE_DIRECT_SUPER : 0));
          this.expect(types.parenL);
          node.params = this.parseBindingList(types.parenR, false, this.options.ecmaVersion >= 8);
          this.checkYieldAwaitInDefaultParams();
          this.parseFunctionBody(node, false, true);
          this.yieldPos = oldYieldPos;
          this.awaitPos = oldAwaitPos;
          this.awaitIdentPos = oldAwaitIdentPos;
          return this.finishNode(node, "FunctionExpression");
        };
        pp$3.parseArrowExpression = function(node, params, isAsync) {
          var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
          this.enterScope(functionFlags(isAsync, false) | SCOPE_ARROW);
          this.initFunction(node);
          if (this.options.ecmaVersion >= 8) {
            node.async = !!isAsync;
          }
          this.yieldPos = 0;
          this.awaitPos = 0;
          this.awaitIdentPos = 0;
          node.params = this.toAssignableList(params, true);
          this.parseFunctionBody(node, true, false);
          this.yieldPos = oldYieldPos;
          this.awaitPos = oldAwaitPos;
          this.awaitIdentPos = oldAwaitIdentPos;
          return this.finishNode(node, "ArrowFunctionExpression");
        };
        pp$3.parseFunctionBody = function(node, isArrowFunction, isMethod) {
          var isExpression = isArrowFunction && this.type !== types.braceL;
          var oldStrict = this.strict, useStrict = false;
          if (isExpression) {
            node.body = this.parseMaybeAssign();
            node.expression = true;
            this.checkParams(node, false);
          } else {
            var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node.params);
            if (!oldStrict || nonSimple) {
              useStrict = this.strictDirective(this.end);
              if (useStrict && nonSimple) {
                this.raiseRecoverable(node.start, "Illegal 'use strict' directive in function with non-simple parameter list");
              }
            }
            var oldLabels = this.labels;
            this.labels = [];
            if (useStrict) {
              this.strict = true;
            }
            this.checkParams(node, !oldStrict && !useStrict && !isArrowFunction && !isMethod && this.isSimpleParamList(node.params));
            node.body = this.parseBlock(false);
            node.expression = false;
            this.adaptDirectivePrologue(node.body.body);
            this.labels = oldLabels;
          }
          this.exitScope();
          if (this.strict && node.id) {
            this.checkLVal(node.id, BIND_OUTSIDE);
          }
          this.strict = oldStrict;
        };
        pp$3.isSimpleParamList = function(params) {
          for (var i = 0, list = params; i < list.length; i += 1) {
            var param = list[i];
            if (param.type !== "Identifier") {
              return false;
            }
          }
          return true;
        };
        pp$3.checkParams = function(node, allowDuplicates) {
          var nameHash = {};
          for (var i = 0, list = node.params; i < list.length; i += 1) {
            var param = list[i];
            this.checkLVal(param, BIND_VAR, allowDuplicates ? null : nameHash);
          }
        };
        pp$3.parseExprList = function(close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
          var elts = [], first = true;
          while (!this.eat(close)) {
            if (!first) {
              this.expect(types.comma);
              if (allowTrailingComma && this.afterTrailingComma(close)) {
                break;
              }
            } else {
              first = false;
            }
            var elt = void 0;
            if (allowEmpty && this.type === types.comma) {
              elt = null;
            } else if (this.type === types.ellipsis) {
              elt = this.parseSpread(refDestructuringErrors);
              if (refDestructuringErrors && this.type === types.comma && refDestructuringErrors.trailingComma < 0) {
                refDestructuringErrors.trailingComma = this.start;
              }
            } else {
              elt = this.parseMaybeAssign(false, refDestructuringErrors);
            }
            elts.push(elt);
          }
          return elts;
        };
        pp$3.checkUnreserved = function(ref3) {
          var start = ref3.start;
          var end = ref3.end;
          var name2 = ref3.name;
          if (this.inGenerator && name2 === "yield") {
            this.raiseRecoverable(start, "Cannot use 'yield' as identifier inside a generator");
          }
          if (this.inAsync && name2 === "await") {
            this.raiseRecoverable(start, "Cannot use 'await' as identifier inside an async function");
          }
          if (this.keywords.test(name2)) {
            this.raise(start, "Unexpected keyword '" + name2 + "'");
          }
          if (this.options.ecmaVersion < 6 && this.input.slice(start, end).indexOf("\\") !== -1) {
            return;
          }
          var re = this.strict ? this.reservedWordsStrict : this.reservedWords;
          if (re.test(name2)) {
            if (!this.inAsync && name2 === "await") {
              this.raiseRecoverable(start, "Cannot use keyword 'await' outside an async function");
            }
            this.raiseRecoverable(start, "The keyword '" + name2 + "' is reserved");
          }
        };
        pp$3.parseIdent = function(liberal, isBinding) {
          var node = this.startNode();
          if (this.type === types.name) {
            node.name = this.value;
          } else if (this.type.keyword) {
            node.name = this.type.keyword;
            if ((node.name === "class" || node.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46)) {
              this.context.pop();
            }
          } else {
            this.unexpected();
          }
          this.next(!!liberal);
          this.finishNode(node, "Identifier");
          if (!liberal) {
            this.checkUnreserved(node);
            if (node.name === "await" && !this.awaitIdentPos) {
              this.awaitIdentPos = node.start;
            }
          }
          return node;
        };
        pp$3.parseYield = function(noIn) {
          if (!this.yieldPos) {
            this.yieldPos = this.start;
          }
          var node = this.startNode();
          this.next();
          if (this.type === types.semi || this.canInsertSemicolon() || this.type !== types.star && !this.type.startsExpr) {
            node.delegate = false;
            node.argument = null;
          } else {
            node.delegate = this.eat(types.star);
            node.argument = this.parseMaybeAssign(noIn);
          }
          return this.finishNode(node, "YieldExpression");
        };
        pp$3.parseAwait = function() {
          if (!this.awaitPos) {
            this.awaitPos = this.start;
          }
          var node = this.startNode();
          this.next();
          node.argument = this.parseMaybeUnary(null, false);
          return this.finishNode(node, "AwaitExpression");
        };
        var pp$4 = Parser.prototype;
        pp$4.raise = function(pos, message) {
          var loc = getLineInfo(this.input, pos);
          message += " (" + loc.line + ":" + loc.column + ")";
          var err = new SyntaxError(message);
          err.pos = pos;
          err.loc = loc;
          err.raisedAt = this.pos;
          throw err;
        };
        pp$4.raiseRecoverable = pp$4.raise;
        pp$4.curPosition = function() {
          if (this.options.locations) {
            return new Position(this.curLine, this.pos - this.lineStart);
          }
        };
        var pp$5 = Parser.prototype;
        var Scope = function Scope2(flags) {
          this.flags = flags;
          this.var = [];
          this.lexical = [];
          this.functions = [];
        };
        pp$5.enterScope = function(flags) {
          this.scopeStack.push(new Scope(flags));
        };
        pp$5.exitScope = function() {
          this.scopeStack.pop();
        };
        pp$5.treatFunctionsAsVarInScope = function(scope) {
          return scope.flags & SCOPE_FUNCTION || !this.inModule && scope.flags & SCOPE_TOP;
        };
        pp$5.declareName = function(name2, bindingType, pos) {
          var redeclared = false;
          if (bindingType === BIND_LEXICAL) {
            var scope = this.currentScope();
            redeclared = scope.lexical.indexOf(name2) > -1 || scope.functions.indexOf(name2) > -1 || scope.var.indexOf(name2) > -1;
            scope.lexical.push(name2);
            if (this.inModule && scope.flags & SCOPE_TOP) {
              delete this.undefinedExports[name2];
            }
          } else if (bindingType === BIND_SIMPLE_CATCH) {
            var scope$1 = this.currentScope();
            scope$1.lexical.push(name2);
          } else if (bindingType === BIND_FUNCTION) {
            var scope$2 = this.currentScope();
            if (this.treatFunctionsAsVar) {
              redeclared = scope$2.lexical.indexOf(name2) > -1;
            } else {
              redeclared = scope$2.lexical.indexOf(name2) > -1 || scope$2.var.indexOf(name2) > -1;
            }
            scope$2.functions.push(name2);
          } else {
            for (var i = this.scopeStack.length - 1; i >= 0; --i) {
              var scope$3 = this.scopeStack[i];
              if (scope$3.lexical.indexOf(name2) > -1 && !(scope$3.flags & SCOPE_SIMPLE_CATCH && scope$3.lexical[0] === name2) || !this.treatFunctionsAsVarInScope(scope$3) && scope$3.functions.indexOf(name2) > -1) {
                redeclared = true;
                break;
              }
              scope$3.var.push(name2);
              if (this.inModule && scope$3.flags & SCOPE_TOP) {
                delete this.undefinedExports[name2];
              }
              if (scope$3.flags & SCOPE_VAR) {
                break;
              }
            }
          }
          if (redeclared) {
            this.raiseRecoverable(pos, "Identifier '" + name2 + "' has already been declared");
          }
        };
        pp$5.checkLocalExport = function(id) {
          if (this.scopeStack[0].lexical.indexOf(id.name) === -1 && this.scopeStack[0].var.indexOf(id.name) === -1) {
            this.undefinedExports[id.name] = id;
          }
        };
        pp$5.currentScope = function() {
          return this.scopeStack[this.scopeStack.length - 1];
        };
        pp$5.currentVarScope = function() {
          for (var i = this.scopeStack.length - 1; ; i--) {
            var scope = this.scopeStack[i];
            if (scope.flags & SCOPE_VAR) {
              return scope;
            }
          }
        };
        pp$5.currentThisScope = function() {
          for (var i = this.scopeStack.length - 1; ; i--) {
            var scope = this.scopeStack[i];
            if (scope.flags & SCOPE_VAR && !(scope.flags & SCOPE_ARROW)) {
              return scope;
            }
          }
        };
        var Node = function Node2(parser, pos, loc) {
          this.type = "";
          this.start = pos;
          this.end = 0;
          if (parser.options.locations) {
            this.loc = new SourceLocation(parser, loc);
          }
          if (parser.options.directSourceFile) {
            this.sourceFile = parser.options.directSourceFile;
          }
          if (parser.options.ranges) {
            this.range = [pos, 0];
          }
        };
        var pp$6 = Parser.prototype;
        pp$6.startNode = function() {
          return new Node(this, this.start, this.startLoc);
        };
        pp$6.startNodeAt = function(pos, loc) {
          return new Node(this, pos, loc);
        };
        function finishNodeAt(node, type, pos, loc) {
          node.type = type;
          node.end = pos;
          if (this.options.locations) {
            node.loc.end = loc;
          }
          if (this.options.ranges) {
            node.range[1] = pos;
          }
          return node;
        }
        pp$6.finishNode = function(node, type) {
          return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc);
        };
        pp$6.finishNodeAt = function(node, type, pos, loc) {
          return finishNodeAt.call(this, node, type, pos, loc);
        };
        var TokContext = function TokContext2(token, isExpr, preserveSpace, override, generator) {
          this.token = token;
          this.isExpr = !!isExpr;
          this.preserveSpace = !!preserveSpace;
          this.override = override;
          this.generator = !!generator;
        };
        var types$1 = {
          b_stat: new TokContext("{", false),
          b_expr: new TokContext("{", true),
          b_tmpl: new TokContext("${", false),
          p_stat: new TokContext("(", false),
          p_expr: new TokContext("(", true),
          q_tmpl: new TokContext("`", true, true, function(p2) {
            return p2.tryReadTemplateToken();
          }),
          f_stat: new TokContext("function", false),
          f_expr: new TokContext("function", true),
          f_expr_gen: new TokContext("function", true, false, null, true),
          f_gen: new TokContext("function", false, false, null, true)
        };
        var pp$7 = Parser.prototype;
        pp$7.initialContext = function() {
          return [types$1.b_stat];
        };
        pp$7.braceIsBlock = function(prevType) {
          var parent = this.curContext();
          if (parent === types$1.f_expr || parent === types$1.f_stat) {
            return true;
          }
          if (prevType === types.colon && (parent === types$1.b_stat || parent === types$1.b_expr)) {
            return !parent.isExpr;
          }
          if (prevType === types._return || prevType === types.name && this.exprAllowed) {
            return lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
          }
          if (prevType === types._else || prevType === types.semi || prevType === types.eof || prevType === types.parenR || prevType === types.arrow) {
            return true;
          }
          if (prevType === types.braceL) {
            return parent === types$1.b_stat;
          }
          if (prevType === types._var || prevType === types._const || prevType === types.name) {
            return false;
          }
          return !this.exprAllowed;
        };
        pp$7.inGeneratorContext = function() {
          for (var i = this.context.length - 1; i >= 1; i--) {
            var context = this.context[i];
            if (context.token === "function") {
              return context.generator;
            }
          }
          return false;
        };
        pp$7.updateContext = function(prevType) {
          var update, type = this.type;
          if (type.keyword && prevType === types.dot) {
            this.exprAllowed = false;
          } else if (update = type.updateContext) {
            update.call(this, prevType);
          } else {
            this.exprAllowed = type.beforeExpr;
          }
        };
        types.parenR.updateContext = types.braceR.updateContext = function() {
          if (this.context.length === 1) {
            this.exprAllowed = true;
            return;
          }
          var out = this.context.pop();
          if (out === types$1.b_stat && this.curContext().token === "function") {
            out = this.context.pop();
          }
          this.exprAllowed = !out.isExpr;
        };
        types.braceL.updateContext = function(prevType) {
          this.context.push(this.braceIsBlock(prevType) ? types$1.b_stat : types$1.b_expr);
          this.exprAllowed = true;
        };
        types.dollarBraceL.updateContext = function() {
          this.context.push(types$1.b_tmpl);
          this.exprAllowed = true;
        };
        types.parenL.updateContext = function(prevType) {
          var statementParens = prevType === types._if || prevType === types._for || prevType === types._with || prevType === types._while;
          this.context.push(statementParens ? types$1.p_stat : types$1.p_expr);
          this.exprAllowed = true;
        };
        types.incDec.updateContext = function() {
        };
        types._function.updateContext = types._class.updateContext = function(prevType) {
          if (prevType.beforeExpr && prevType !== types.semi && prevType !== types._else && !(prevType === types._return && lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) && !((prevType === types.colon || prevType === types.braceL) && this.curContext() === types$1.b_stat)) {
            this.context.push(types$1.f_expr);
          } else {
            this.context.push(types$1.f_stat);
          }
          this.exprAllowed = false;
        };
        types.backQuote.updateContext = function() {
          if (this.curContext() === types$1.q_tmpl) {
            this.context.pop();
          } else {
            this.context.push(types$1.q_tmpl);
          }
          this.exprAllowed = false;
        };
        types.star.updateContext = function(prevType) {
          if (prevType === types._function) {
            var index2 = this.context.length - 1;
            if (this.context[index2] === types$1.f_expr) {
              this.context[index2] = types$1.f_expr_gen;
            } else {
              this.context[index2] = types$1.f_gen;
            }
          }
          this.exprAllowed = true;
        };
        types.name.updateContext = function(prevType) {
          var allowed = false;
          if (this.options.ecmaVersion >= 6 && prevType !== types.dot) {
            if (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) {
              allowed = true;
            }
          }
          this.exprAllowed = allowed;
        };
        var ecma9BinaryProperties = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS";
        var ecma10BinaryProperties = ecma9BinaryProperties + " Extended_Pictographic";
        var ecma11BinaryProperties = ecma10BinaryProperties;
        var unicodeBinaryProperties = {
          9: ecma9BinaryProperties,
          10: ecma10BinaryProperties,
          11: ecma11BinaryProperties
        };
        var unicodeGeneralCategoryValues = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu";
        var ecma9ScriptValues = "Adlam Adlm Ahom Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb";
        var ecma10ScriptValues = ecma9ScriptValues + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd";
        var ecma11ScriptValues = ecma10ScriptValues + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho";
        var unicodeScriptValues = {
          9: ecma9ScriptValues,
          10: ecma10ScriptValues,
          11: ecma11ScriptValues
        };
        var data = {};
        function buildUnicodeData(ecmaVersion) {
          var d = data[ecmaVersion] = {
            binary: wordsRegexp(unicodeBinaryProperties[ecmaVersion] + " " + unicodeGeneralCategoryValues),
            nonBinary: {
              General_Category: wordsRegexp(unicodeGeneralCategoryValues),
              Script: wordsRegexp(unicodeScriptValues[ecmaVersion])
            }
          };
          d.nonBinary.Script_Extensions = d.nonBinary.Script;
          d.nonBinary.gc = d.nonBinary.General_Category;
          d.nonBinary.sc = d.nonBinary.Script;
          d.nonBinary.scx = d.nonBinary.Script_Extensions;
        }
        buildUnicodeData(9);
        buildUnicodeData(10);
        buildUnicodeData(11);
        var pp$8 = Parser.prototype;
        var RegExpValidationState = function RegExpValidationState2(parser) {
          this.parser = parser;
          this.validFlags = "gim" + (parser.options.ecmaVersion >= 6 ? "uy" : "") + (parser.options.ecmaVersion >= 9 ? "s" : "");
          this.unicodeProperties = data[parser.options.ecmaVersion >= 11 ? 11 : parser.options.ecmaVersion];
          this.source = "";
          this.flags = "";
          this.start = 0;
          this.switchU = false;
          this.switchN = false;
          this.pos = 0;
          this.lastIntValue = 0;
          this.lastStringValue = "";
          this.lastAssertionIsQuantifiable = false;
          this.numCapturingParens = 0;
          this.maxBackReference = 0;
          this.groupNames = [];
          this.backReferenceNames = [];
        };
        RegExpValidationState.prototype.reset = function reset(start, pattern, flags) {
          var unicode = flags.indexOf("u") !== -1;
          this.start = start | 0;
          this.source = pattern + "";
          this.flags = flags;
          this.switchU = unicode && this.parser.options.ecmaVersion >= 6;
          this.switchN = unicode && this.parser.options.ecmaVersion >= 9;
        };
        RegExpValidationState.prototype.raise = function raise(message) {
          this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + message);
        };
        RegExpValidationState.prototype.at = function at(i) {
          var s = this.source;
          var l = s.length;
          if (i >= l) {
            return -1;
          }
          var c = s.charCodeAt(i);
          if (!this.switchU || c <= 55295 || c >= 57344 || i + 1 >= l) {
            return c;
          }
          var next = s.charCodeAt(i + 1);
          return next >= 56320 && next <= 57343 ? (c << 10) + next - 56613888 : c;
        };
        RegExpValidationState.prototype.nextIndex = function nextIndex(i) {
          var s = this.source;
          var l = s.length;
          if (i >= l) {
            return l;
          }
          var c = s.charCodeAt(i), next;
          if (!this.switchU || c <= 55295 || c >= 57344 || i + 1 >= l || (next = s.charCodeAt(i + 1)) < 56320 || next > 57343) {
            return i + 1;
          }
          return i + 2;
        };
        RegExpValidationState.prototype.current = function current() {
          return this.at(this.pos);
        };
        RegExpValidationState.prototype.lookahead = function lookahead() {
          return this.at(this.nextIndex(this.pos));
        };
        RegExpValidationState.prototype.advance = function advance() {
          this.pos = this.nextIndex(this.pos);
        };
        RegExpValidationState.prototype.eat = function eat(ch) {
          if (this.current() === ch) {
            this.advance();
            return true;
          }
          return false;
        };
        function codePointToString(ch) {
          if (ch <= 65535) {
            return String.fromCharCode(ch);
          }
          ch -= 65536;
          return String.fromCharCode((ch >> 10) + 55296, (ch & 1023) + 56320);
        }
        pp$8.validateRegExpFlags = function(state) {
          var validFlags = state.validFlags;
          var flags = state.flags;
          for (var i = 0; i < flags.length; i++) {
            var flag = flags.charAt(i);
            if (validFlags.indexOf(flag) === -1) {
              this.raise(state.start, "Invalid regular expression flag");
            }
            if (flags.indexOf(flag, i + 1) > -1) {
              this.raise(state.start, "Duplicate regular expression flag");
            }
          }
        };
        pp$8.validateRegExpPattern = function(state) {
          this.regexp_pattern(state);
          if (!state.switchN && this.options.ecmaVersion >= 9 && state.groupNames.length > 0) {
            state.switchN = true;
            this.regexp_pattern(state);
          }
        };
        pp$8.regexp_pattern = function(state) {
          state.pos = 0;
          state.lastIntValue = 0;
          state.lastStringValue = "";
          state.lastAssertionIsQuantifiable = false;
          state.numCapturingParens = 0;
          state.maxBackReference = 0;
          state.groupNames.length = 0;
          state.backReferenceNames.length = 0;
          this.regexp_disjunction(state);
          if (state.pos !== state.source.length) {
            if (state.eat(41)) {
              state.raise("Unmatched ')'");
            }
            if (state.eat(93) || state.eat(125)) {
              state.raise("Lone quantifier brackets");
            }
          }
          if (state.maxBackReference > state.numCapturingParens) {
            state.raise("Invalid escape");
          }
          for (var i = 0, list = state.backReferenceNames; i < list.length; i += 1) {
            var name2 = list[i];
            if (state.groupNames.indexOf(name2) === -1) {
              state.raise("Invalid named capture referenced");
            }
          }
        };
        pp$8.regexp_disjunction = function(state) {
          this.regexp_alternative(state);
          while (state.eat(124)) {
            this.regexp_alternative(state);
          }
          if (this.regexp_eatQuantifier(state, true)) {
            state.raise("Nothing to repeat");
          }
          if (state.eat(123)) {
            state.raise("Lone quantifier brackets");
          }
        };
        pp$8.regexp_alternative = function(state) {
          while (state.pos < state.source.length && this.regexp_eatTerm(state)) {
          }
        };
        pp$8.regexp_eatTerm = function(state) {
          if (this.regexp_eatAssertion(state)) {
            if (state.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(state)) {
              if (state.switchU) {
                state.raise("Invalid quantifier");
              }
            }
            return true;
          }
          if (state.switchU ? this.regexp_eatAtom(state) : this.regexp_eatExtendedAtom(state)) {
            this.regexp_eatQuantifier(state);
            return true;
          }
          return false;
        };
        pp$8.regexp_eatAssertion = function(state) {
          var start = state.pos;
          state.lastAssertionIsQuantifiable = false;
          if (state.eat(94) || state.eat(36)) {
            return true;
          }
          if (state.eat(92)) {
            if (state.eat(66) || state.eat(98)) {
              return true;
            }
            state.pos = start;
          }
          if (state.eat(40) && state.eat(63)) {
            var lookbehind = false;
            if (this.options.ecmaVersion >= 9) {
              lookbehind = state.eat(60);
            }
            if (state.eat(61) || state.eat(33)) {
              this.regexp_disjunction(state);
              if (!state.eat(41)) {
                state.raise("Unterminated group");
              }
              state.lastAssertionIsQuantifiable = !lookbehind;
              return true;
            }
          }
          state.pos = start;
          return false;
        };
        pp$8.regexp_eatQuantifier = function(state, noError) {
          if (noError === void 0)
            noError = false;
          if (this.regexp_eatQuantifierPrefix(state, noError)) {
            state.eat(63);
            return true;
          }
          return false;
        };
        pp$8.regexp_eatQuantifierPrefix = function(state, noError) {
          return state.eat(42) || state.eat(43) || state.eat(63) || this.regexp_eatBracedQuantifier(state, noError);
        };
        pp$8.regexp_eatBracedQuantifier = function(state, noError) {
          var start = state.pos;
          if (state.eat(123)) {
            var min = 0, max = -1;
            if (this.regexp_eatDecimalDigits(state)) {
              min = state.lastIntValue;
              if (state.eat(44) && this.regexp_eatDecimalDigits(state)) {
                max = state.lastIntValue;
              }
              if (state.eat(125)) {
                if (max !== -1 && max < min && !noError) {
                  state.raise("numbers out of order in {} quantifier");
                }
                return true;
              }
            }
            if (state.switchU && !noError) {
              state.raise("Incomplete quantifier");
            }
            state.pos = start;
          }
          return false;
        };
        pp$8.regexp_eatAtom = function(state) {
          return this.regexp_eatPatternCharacters(state) || state.eat(46) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state);
        };
        pp$8.regexp_eatReverseSolidusAtomEscape = function(state) {
          var start = state.pos;
          if (state.eat(92)) {
            if (this.regexp_eatAtomEscape(state)) {
              return true;
            }
            state.pos = start;
          }
          return false;
        };
        pp$8.regexp_eatUncapturingGroup = function(state) {
          var start = state.pos;
          if (state.eat(40)) {
            if (state.eat(63) && state.eat(58)) {
              this.regexp_disjunction(state);
              if (state.eat(41)) {
                return true;
              }
              state.raise("Unterminated group");
            }
            state.pos = start;
          }
          return false;
        };
        pp$8.regexp_eatCapturingGroup = function(state) {
          if (state.eat(40)) {
            if (this.options.ecmaVersion >= 9) {
              this.regexp_groupSpecifier(state);
            } else if (state.current() === 63) {
              state.raise("Invalid group");
            }
            this.regexp_disjunction(state);
            if (state.eat(41)) {
              state.numCapturingParens += 1;
              return true;
            }
            state.raise("Unterminated group");
          }
          return false;
        };
        pp$8.regexp_eatExtendedAtom = function(state) {
          return state.eat(46) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state) || this.regexp_eatInvalidBracedQuantifier(state) || this.regexp_eatExtendedPatternCharacter(state);
        };
        pp$8.regexp_eatInvalidBracedQuantifier = function(state) {
          if (this.regexp_eatBracedQuantifier(state, true)) {
            state.raise("Nothing to repeat");
          }
          return false;
        };
        pp$8.regexp_eatSyntaxCharacter = function(state) {
          var ch = state.current();
          if (isSyntaxCharacter(ch)) {
            state.lastIntValue = ch;
            state.advance();
            return true;
          }
          return false;
        };
        function isSyntaxCharacter(ch) {
          return ch === 36 || ch >= 40 && ch <= 43 || ch === 46 || ch === 63 || ch >= 91 && ch <= 94 || ch >= 123 && ch <= 125;
        }
        pp$8.regexp_eatPatternCharacters = function(state) {
          var start = state.pos;
          var ch = 0;
          while ((ch = state.current()) !== -1 && !isSyntaxCharacter(ch)) {
            state.advance();
          }
          return state.pos !== start;
        };
        pp$8.regexp_eatExtendedPatternCharacter = function(state) {
          var ch = state.current();
          if (ch !== -1 && ch !== 36 && !(ch >= 40 && ch <= 43) && ch !== 46 && ch !== 63 && ch !== 91 && ch !== 94 && ch !== 124) {
            state.advance();
            return true;
          }
          return false;
        };
        pp$8.regexp_groupSpecifier = function(state) {
          if (state.eat(63)) {
            if (this.regexp_eatGroupName(state)) {
              if (state.groupNames.indexOf(state.lastStringValue) !== -1) {
                state.raise("Duplicate capture group name");
              }
              state.groupNames.push(state.lastStringValue);
              return;
            }
            state.raise("Invalid group");
          }
        };
        pp$8.regexp_eatGroupName = function(state) {
          state.lastStringValue = "";
          if (state.eat(60)) {
            if (this.regexp_eatRegExpIdentifierName(state) && state.eat(62)) {
              return true;
            }
            state.raise("Invalid capture group name");
          }
          return false;
        };
        pp$8.regexp_eatRegExpIdentifierName = function(state) {
          state.lastStringValue = "";
          if (this.regexp_eatRegExpIdentifierStart(state)) {
            state.lastStringValue += codePointToString(state.lastIntValue);
            while (this.regexp_eatRegExpIdentifierPart(state)) {
              state.lastStringValue += codePointToString(state.lastIntValue);
            }
            return true;
          }
          return false;
        };
        pp$8.regexp_eatRegExpIdentifierStart = function(state) {
          var start = state.pos;
          var ch = state.current();
          state.advance();
          if (ch === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state)) {
            ch = state.lastIntValue;
          }
          if (isRegExpIdentifierStart(ch)) {
            state.lastIntValue = ch;
            return true;
          }
          state.pos = start;
          return false;
        };
        function isRegExpIdentifierStart(ch) {
          return isIdentifierStart(ch, true) || ch === 36 || ch === 95;
        }
        pp$8.regexp_eatRegExpIdentifierPart = function(state) {
          var start = state.pos;
          var ch = state.current();
          state.advance();
          if (ch === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state)) {
            ch = state.lastIntValue;
          }
          if (isRegExpIdentifierPart(ch)) {
            state.lastIntValue = ch;
            return true;
          }
          state.pos = start;
          return false;
        };
        function isRegExpIdentifierPart(ch) {
          return isIdentifierChar(ch, true) || ch === 36 || ch === 95 || ch === 8204 || ch === 8205;
        }
        pp$8.regexp_eatAtomEscape = function(state) {
          if (this.regexp_eatBackReference(state) || this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state) || state.switchN && this.regexp_eatKGroupName(state)) {
            return true;
          }
          if (state.switchU) {
            if (state.current() === 99) {
              state.raise("Invalid unicode escape");
            }
            state.raise("Invalid escape");
          }
          return false;
        };
        pp$8.regexp_eatBackReference = function(state) {
          var start = state.pos;
          if (this.regexp_eatDecimalEscape(state)) {
            var n = state.lastIntValue;
            if (state.switchU) {
              if (n > state.maxBackReference) {
                state.maxBackReference = n;
              }
              return true;
            }
            if (n <= state.numCapturingParens) {
              return true;
            }
            state.pos = start;
          }
          return false;
        };
        pp$8.regexp_eatKGroupName = function(state) {
          if (state.eat(107)) {
            if (this.regexp_eatGroupName(state)) {
              state.backReferenceNames.push(state.lastStringValue);
              return true;
            }
            state.raise("Invalid named reference");
          }
          return false;
        };
        pp$8.regexp_eatCharacterEscape = function(state) {
          return this.regexp_eatControlEscape(state) || this.regexp_eatCControlLetter(state) || this.regexp_eatZero(state) || this.regexp_eatHexEscapeSequence(state) || this.regexp_eatRegExpUnicodeEscapeSequence(state) || !state.switchU && this.regexp_eatLegacyOctalEscapeSequence(state) || this.regexp_eatIdentityEscape(state);
        };
        pp$8.regexp_eatCControlLetter = function(state) {
          var start = state.pos;
          if (state.eat(99)) {
            if (this.regexp_eatControlLetter(state)) {
              return true;
            }
            state.pos = start;
          }
          return false;
        };
        pp$8.regexp_eatZero = function(state) {
          if (state.current() === 48 && !isDecimalDigit(state.lookahead())) {
            state.lastIntValue = 0;
            state.advance();
            return true;
          }
          return false;
        };
        pp$8.regexp_eatControlEscape = function(state) {
          var ch = state.current();
          if (ch === 116) {
            state.lastIntValue = 9;
            state.advance();
            return true;
          }
          if (ch === 110) {
            state.lastIntValue = 10;
            state.advance();
            return true;
          }
          if (ch === 118) {
            state.lastIntValue = 11;
            state.advance();
            return true;
          }
          if (ch === 102) {
            state.lastIntValue = 12;
            state.advance();
            return true;
          }
          if (ch === 114) {
            state.lastIntValue = 13;
            state.advance();
            return true;
          }
          return false;
        };
        pp$8.regexp_eatControlLetter = function(state) {
          var ch = state.current();
          if (isControlLetter(ch)) {
            state.lastIntValue = ch % 32;
            state.advance();
            return true;
          }
          return false;
        };
        function isControlLetter(ch) {
          return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122;
        }
        pp$8.regexp_eatRegExpUnicodeEscapeSequence = function(state) {
          var start = state.pos;
          if (state.eat(117)) {
            if (this.regexp_eatFixedHexDigits(state, 4)) {
              var lead = state.lastIntValue;
              if (state.switchU && lead >= 55296 && lead <= 56319) {
                var leadSurrogateEnd = state.pos;
                if (state.eat(92) && state.eat(117) && this.regexp_eatFixedHexDigits(state, 4)) {
                  var trail = state.lastIntValue;
                  if (trail >= 56320 && trail <= 57343) {
                    state.lastIntValue = (lead - 55296) * 1024 + (trail - 56320) + 65536;
                    return true;
                  }
                }
                state.pos = leadSurrogateEnd;
                state.lastIntValue = lead;
              }
              return true;
            }
            if (state.switchU && state.eat(123) && this.regexp_eatHexDigits(state) && state.eat(125) && isValidUnicode(state.lastIntValue)) {
              return true;
            }
            if (state.switchU) {
              state.raise("Invalid unicode escape");
            }
            state.pos = start;
          }
          return false;
        };
        function isValidUnicode(ch) {
          return ch >= 0 && ch <= 1114111;
        }
        pp$8.regexp_eatIdentityEscape = function(state) {
          if (state.switchU) {
            if (this.regexp_eatSyntaxCharacter(state)) {
              return true;
            }
            if (state.eat(47)) {
              state.lastIntValue = 47;
              return true;
            }
            return false;
          }
          var ch = state.current();
          if (ch !== 99 && (!state.switchN || ch !== 107)) {
            state.lastIntValue = ch;
            state.advance();
            return true;
          }
          return false;
        };
        pp$8.regexp_eatDecimalEscape = function(state) {
          state.lastIntValue = 0;
          var ch = state.current();
          if (ch >= 49 && ch <= 57) {
            do {
              state.lastIntValue = 10 * state.lastIntValue + (ch - 48);
              state.advance();
            } while ((ch = state.current()) >= 48 && ch <= 57);
            return true;
          }
          return false;
        };
        pp$8.regexp_eatCharacterClassEscape = function(state) {
          var ch = state.current();
          if (isCharacterClassEscape(ch)) {
            state.lastIntValue = -1;
            state.advance();
            return true;
          }
          if (state.switchU && this.options.ecmaVersion >= 9 && (ch === 80 || ch === 112)) {
            state.lastIntValue = -1;
            state.advance();
            if (state.eat(123) && this.regexp_eatUnicodePropertyValueExpression(state) && state.eat(125)) {
              return true;
            }
            state.raise("Invalid property name");
          }
          return false;
        };
        function isCharacterClassEscape(ch) {
          return ch === 100 || ch === 68 || ch === 115 || ch === 83 || ch === 119 || ch === 87;
        }
        pp$8.regexp_eatUnicodePropertyValueExpression = function(state) {
          var start = state.pos;
          if (this.regexp_eatUnicodePropertyName(state) && state.eat(61)) {
            var name2 = state.lastStringValue;
            if (this.regexp_eatUnicodePropertyValue(state)) {
              var value2 = state.lastStringValue;
              this.regexp_validateUnicodePropertyNameAndValue(state, name2, value2);
              return true;
            }
          }
          state.pos = start;
          if (this.regexp_eatLoneUnicodePropertyNameOrValue(state)) {
            var nameOrValue = state.lastStringValue;
            this.regexp_validateUnicodePropertyNameOrValue(state, nameOrValue);
            return true;
          }
          return false;
        };
        pp$8.regexp_validateUnicodePropertyNameAndValue = function(state, name2, value2) {
          if (!has2(state.unicodeProperties.nonBinary, name2)) {
            state.raise("Invalid property name");
          }
          if (!state.unicodeProperties.nonBinary[name2].test(value2)) {
            state.raise("Invalid property value");
          }
        };
        pp$8.regexp_validateUnicodePropertyNameOrValue = function(state, nameOrValue) {
          if (!state.unicodeProperties.binary.test(nameOrValue)) {
            state.raise("Invalid property name");
          }
        };
        pp$8.regexp_eatUnicodePropertyName = function(state) {
          var ch = 0;
          state.lastStringValue = "";
          while (isUnicodePropertyNameCharacter(ch = state.current())) {
            state.lastStringValue += codePointToString(ch);
            state.advance();
          }
          return state.lastStringValue !== "";
        };
        function isUnicodePropertyNameCharacter(ch) {
          return isControlLetter(ch) || ch === 95;
        }
        pp$8.regexp_eatUnicodePropertyValue = function(state) {
          var ch = 0;
          state.lastStringValue = "";
          while (isUnicodePropertyValueCharacter(ch = state.current())) {
            state.lastStringValue += codePointToString(ch);
            state.advance();
          }
          return state.lastStringValue !== "";
        };
        function isUnicodePropertyValueCharacter(ch) {
          return isUnicodePropertyNameCharacter(ch) || isDecimalDigit(ch);
        }
        pp$8.regexp_eatLoneUnicodePropertyNameOrValue = function(state) {
          return this.regexp_eatUnicodePropertyValue(state);
        };
        pp$8.regexp_eatCharacterClass = function(state) {
          if (state.eat(91)) {
            state.eat(94);
            this.regexp_classRanges(state);
            if (state.eat(93)) {
              return true;
            }
            state.raise("Unterminated character class");
          }
          return false;
        };
        pp$8.regexp_classRanges = function(state) {
          while (this.regexp_eatClassAtom(state)) {
            var left = state.lastIntValue;
            if (state.eat(45) && this.regexp_eatClassAtom(state)) {
              var right = state.lastIntValue;
              if (state.switchU && (left === -1 || right === -1)) {
                state.raise("Invalid character class");
              }
              if (left !== -1 && right !== -1 && left > right) {
                state.raise("Range out of order in character class");
              }
            }
          }
        };
        pp$8.regexp_eatClassAtom = function(state) {
          var start = state.pos;
          if (state.eat(92)) {
            if (this.regexp_eatClassEscape(state)) {
              return true;
            }
            if (state.switchU) {
              var ch$1 = state.current();
              if (ch$1 === 99 || isOctalDigit(ch$1)) {
                state.raise("Invalid class escape");
              }
              state.raise("Invalid escape");
            }
            state.pos = start;
          }
          var ch = state.current();
          if (ch !== 93) {
            state.lastIntValue = ch;
            state.advance();
            return true;
          }
          return false;
        };
        pp$8.regexp_eatClassEscape = function(state) {
          var start = state.pos;
          if (state.eat(98)) {
            state.lastIntValue = 8;
            return true;
          }
          if (state.switchU && state.eat(45)) {
            state.lastIntValue = 45;
            return true;
          }
          if (!state.switchU && state.eat(99)) {
            if (this.regexp_eatClassControlLetter(state)) {
              return true;
            }
            state.pos = start;
          }
          return this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state);
        };
        pp$8.regexp_eatClassControlLetter = function(state) {
          var ch = state.current();
          if (isDecimalDigit(ch) || ch === 95) {
            state.lastIntValue = ch % 32;
            state.advance();
            return true;
          }
          return false;
        };
        pp$8.regexp_eatHexEscapeSequence = function(state) {
          var start = state.pos;
          if (state.eat(120)) {
            if (this.regexp_eatFixedHexDigits(state, 2)) {
              return true;
            }
            if (state.switchU) {
              state.raise("Invalid escape");
            }
            state.pos = start;
          }
          return false;
        };
        pp$8.regexp_eatDecimalDigits = function(state) {
          var start = state.pos;
          var ch = 0;
          state.lastIntValue = 0;
          while (isDecimalDigit(ch = state.current())) {
            state.lastIntValue = 10 * state.lastIntValue + (ch - 48);
            state.advance();
          }
          return state.pos !== start;
        };
        function isDecimalDigit(ch) {
          return ch >= 48 && ch <= 57;
        }
        pp$8.regexp_eatHexDigits = function(state) {
          var start = state.pos;
          var ch = 0;
          state.lastIntValue = 0;
          while (isHexDigit(ch = state.current())) {
            state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
            state.advance();
          }
          return state.pos !== start;
        };
        function isHexDigit(ch) {
          return ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102;
        }
        function hexToInt(ch) {
          if (ch >= 65 && ch <= 70) {
            return 10 + (ch - 65);
          }
          if (ch >= 97 && ch <= 102) {
            return 10 + (ch - 97);
          }
          return ch - 48;
        }
        pp$8.regexp_eatLegacyOctalEscapeSequence = function(state) {
          if (this.regexp_eatOctalDigit(state)) {
            var n1 = state.lastIntValue;
            if (this.regexp_eatOctalDigit(state)) {
              var n2 = state.lastIntValue;
              if (n1 <= 3 && this.regexp_eatOctalDigit(state)) {
                state.lastIntValue = n1 * 64 + n2 * 8 + state.lastIntValue;
              } else {
                state.lastIntValue = n1 * 8 + n2;
              }
            } else {
              state.lastIntValue = n1;
            }
            return true;
          }
          return false;
        };
        pp$8.regexp_eatOctalDigit = function(state) {
          var ch = state.current();
          if (isOctalDigit(ch)) {
            state.lastIntValue = ch - 48;
            state.advance();
            return true;
          }
          state.lastIntValue = 0;
          return false;
        };
        function isOctalDigit(ch) {
          return ch >= 48 && ch <= 55;
        }
        pp$8.regexp_eatFixedHexDigits = function(state, length) {
          var start = state.pos;
          state.lastIntValue = 0;
          for (var i = 0; i < length; ++i) {
            var ch = state.current();
            if (!isHexDigit(ch)) {
              state.pos = start;
              return false;
            }
            state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
            state.advance();
          }
          return true;
        };
        var Token = function Token2(p2) {
          this.type = p2.type;
          this.value = p2.value;
          this.start = p2.start;
          this.end = p2.end;
          if (p2.options.locations) {
            this.loc = new SourceLocation(p2, p2.startLoc, p2.endLoc);
          }
          if (p2.options.ranges) {
            this.range = [p2.start, p2.end];
          }
        };
        var pp$9 = Parser.prototype;
        pp$9.next = function(ignoreEscapeSequenceInKeyword) {
          if (!ignoreEscapeSequenceInKeyword && this.type.keyword && this.containsEsc) {
            this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword);
          }
          if (this.options.onToken) {
            this.options.onToken(new Token(this));
          }
          this.lastTokEnd = this.end;
          this.lastTokStart = this.start;
          this.lastTokEndLoc = this.endLoc;
          this.lastTokStartLoc = this.startLoc;
          this.nextToken();
        };
        pp$9.getToken = function() {
          this.next();
          return new Token(this);
        };
        if (typeof Symbol !== "undefined") {
          pp$9[Symbol.iterator] = function() {
            var this$1$1 = this;
            return {
              next: function() {
                var token = this$1$1.getToken();
                return {
                  done: token.type === types.eof,
                  value: token
                };
              }
            };
          };
        }
        pp$9.curContext = function() {
          return this.context[this.context.length - 1];
        };
        pp$9.nextToken = function() {
          var curContext = this.curContext();
          if (!curContext || !curContext.preserveSpace) {
            this.skipSpace();
          }
          this.start = this.pos;
          if (this.options.locations) {
            this.startLoc = this.curPosition();
          }
          if (this.pos >= this.input.length) {
            return this.finishToken(types.eof);
          }
          if (curContext.override) {
            return curContext.override(this);
          } else {
            this.readToken(this.fullCharCodeAtPos());
          }
        };
        pp$9.readToken = function(code) {
          if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92) {
            return this.readWord();
          }
          return this.getTokenFromCode(code);
        };
        pp$9.fullCharCodeAtPos = function() {
          var code = this.input.charCodeAt(this.pos);
          if (code <= 55295 || code >= 57344) {
            return code;
          }
          var next = this.input.charCodeAt(this.pos + 1);
          return (code << 10) + next - 56613888;
        };
        pp$9.skipBlockComment = function() {
          var startLoc = this.options.onComment && this.curPosition();
          var start = this.pos, end = this.input.indexOf("*/", this.pos += 2);
          if (end === -1) {
            this.raise(this.pos - 2, "Unterminated comment");
          }
          this.pos = end + 2;
          if (this.options.locations) {
            lineBreakG.lastIndex = start;
            var match;
            while ((match = lineBreakG.exec(this.input)) && match.index < this.pos) {
              ++this.curLine;
              this.lineStart = match.index + match[0].length;
            }
          }
          if (this.options.onComment) {
            this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos, startLoc, this.curPosition());
          }
        };
        pp$9.skipLineComment = function(startSkip) {
          var start = this.pos;
          var startLoc = this.options.onComment && this.curPosition();
          var ch = this.input.charCodeAt(this.pos += startSkip);
          while (this.pos < this.input.length && !isNewLine(ch)) {
            ch = this.input.charCodeAt(++this.pos);
          }
          if (this.options.onComment) {
            this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos, startLoc, this.curPosition());
          }
        };
        pp$9.skipSpace = function() {
          loop:
            while (this.pos < this.input.length) {
              var ch = this.input.charCodeAt(this.pos);
              switch (ch) {
                case 32:
                case 160:
                  ++this.pos;
                  break;
                case 13:
                  if (this.input.charCodeAt(this.pos + 1) === 10) {
                    ++this.pos;
                  }
                case 10:
                case 8232:
                case 8233:
                  ++this.pos;
                  if (this.options.locations) {
                    ++this.curLine;
                    this.lineStart = this.pos;
                  }
                  break;
                case 47:
                  switch (this.input.charCodeAt(this.pos + 1)) {
                    case 42:
                      this.skipBlockComment();
                      break;
                    case 47:
                      this.skipLineComment(2);
                      break;
                    default:
                      break loop;
                  }
                  break;
                default:
                  if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
                    ++this.pos;
                  } else {
                    break loop;
                  }
              }
            }
        };
        pp$9.finishToken = function(type, val) {
          this.end = this.pos;
          if (this.options.locations) {
            this.endLoc = this.curPosition();
          }
          var prevType = this.type;
          this.type = type;
          this.value = val;
          this.updateContext(prevType);
        };
        pp$9.readToken_dot = function() {
          var next = this.input.charCodeAt(this.pos + 1);
          if (next >= 48 && next <= 57) {
            return this.readNumber(true);
          }
          var next2 = this.input.charCodeAt(this.pos + 2);
          if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) {
            this.pos += 3;
            return this.finishToken(types.ellipsis);
          } else {
            ++this.pos;
            return this.finishToken(types.dot);
          }
        };
        pp$9.readToken_slash = function() {
          var next = this.input.charCodeAt(this.pos + 1);
          if (this.exprAllowed) {
            ++this.pos;
            return this.readRegexp();
          }
          if (next === 61) {
            return this.finishOp(types.assign, 2);
          }
          return this.finishOp(types.slash, 1);
        };
        pp$9.readToken_mult_modulo_exp = function(code) {
          var next = this.input.charCodeAt(this.pos + 1);
          var size = 1;
          var tokentype = code === 42 ? types.star : types.modulo;
          if (this.options.ecmaVersion >= 7 && code === 42 && next === 42) {
            ++size;
            tokentype = types.starstar;
            next = this.input.charCodeAt(this.pos + 2);
          }
          if (next === 61) {
            return this.finishOp(types.assign, size + 1);
          }
          return this.finishOp(tokentype, size);
        };
        pp$9.readToken_pipe_amp = function(code) {
          var next = this.input.charCodeAt(this.pos + 1);
          if (next === code) {
            return this.finishOp(code === 124 ? types.logicalOR : types.logicalAND, 2);
          }
          if (next === 61) {
            return this.finishOp(types.assign, 2);
          }
          return this.finishOp(code === 124 ? types.bitwiseOR : types.bitwiseAND, 1);
        };
        pp$9.readToken_caret = function() {
          var next = this.input.charCodeAt(this.pos + 1);
          if (next === 61) {
            return this.finishOp(types.assign, 2);
          }
          return this.finishOp(types.bitwiseXOR, 1);
        };
        pp$9.readToken_plus_min = function(code) {
          var next = this.input.charCodeAt(this.pos + 1);
          if (next === code) {
            if (next === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || lineBreak.test(this.input.slice(this.lastTokEnd, this.pos)))) {
              this.skipLineComment(3);
              this.skipSpace();
              return this.nextToken();
            }
            return this.finishOp(types.incDec, 2);
          }
          if (next === 61) {
            return this.finishOp(types.assign, 2);
          }
          return this.finishOp(types.plusMin, 1);
        };
        pp$9.readToken_lt_gt = function(code) {
          var next = this.input.charCodeAt(this.pos + 1);
          var size = 1;
          if (next === code) {
            size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
            if (this.input.charCodeAt(this.pos + size) === 61) {
              return this.finishOp(types.assign, size + 1);
            }
            return this.finishOp(types.bitShift, size);
          }
          if (next === 33 && code === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45) {
            this.skipLineComment(4);
            this.skipSpace();
            return this.nextToken();
          }
          if (next === 61) {
            size = 2;
          }
          return this.finishOp(types.relational, size);
        };
        pp$9.readToken_eq_excl = function(code) {
          var next = this.input.charCodeAt(this.pos + 1);
          if (next === 61) {
            return this.finishOp(types.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2);
          }
          if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) {
            this.pos += 2;
            return this.finishToken(types.arrow);
          }
          return this.finishOp(code === 61 ? types.eq : types.prefix, 1);
        };
        pp$9.getTokenFromCode = function(code) {
          switch (code) {
            case 46:
              return this.readToken_dot();
            case 40:
              ++this.pos;
              return this.finishToken(types.parenL);
            case 41:
              ++this.pos;
              return this.finishToken(types.parenR);
            case 59:
              ++this.pos;
              return this.finishToken(types.semi);
            case 44:
              ++this.pos;
              return this.finishToken(types.comma);
            case 91:
              ++this.pos;
              return this.finishToken(types.bracketL);
            case 93:
              ++this.pos;
              return this.finishToken(types.bracketR);
            case 123:
              ++this.pos;
              return this.finishToken(types.braceL);
            case 125:
              ++this.pos;
              return this.finishToken(types.braceR);
            case 58:
              ++this.pos;
              return this.finishToken(types.colon);
            case 63:
              ++this.pos;
              return this.finishToken(types.question);
            case 96:
              if (this.options.ecmaVersion < 6) {
                break;
              }
              ++this.pos;
              return this.finishToken(types.backQuote);
            case 48:
              var next = this.input.charCodeAt(this.pos + 1);
              if (next === 120 || next === 88) {
                return this.readRadixNumber(16);
              }
              if (this.options.ecmaVersion >= 6) {
                if (next === 111 || next === 79) {
                  return this.readRadixNumber(8);
                }
                if (next === 98 || next === 66) {
                  return this.readRadixNumber(2);
                }
              }
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
              return this.readNumber(false);
            case 34:
            case 39:
              return this.readString(code);
            case 47:
              return this.readToken_slash();
            case 37:
            case 42:
              return this.readToken_mult_modulo_exp(code);
            case 124:
            case 38:
              return this.readToken_pipe_amp(code);
            case 94:
              return this.readToken_caret();
            case 43:
            case 45:
              return this.readToken_plus_min(code);
            case 60:
            case 62:
              return this.readToken_lt_gt(code);
            case 61:
            case 33:
              return this.readToken_eq_excl(code);
            case 126:
              return this.finishOp(types.prefix, 1);
          }
          this.raise(this.pos, "Unexpected character '" + codePointToString$1(code) + "'");
        };
        pp$9.finishOp = function(type, size) {
          var str = this.input.slice(this.pos, this.pos + size);
          this.pos += size;
          return this.finishToken(type, str);
        };
        pp$9.readRegexp = function() {
          var escaped, inClass, start = this.pos;
          for (; ; ) {
            if (this.pos >= this.input.length) {
              this.raise(start, "Unterminated regular expression");
            }
            var ch = this.input.charAt(this.pos);
            if (lineBreak.test(ch)) {
              this.raise(start, "Unterminated regular expression");
            }
            if (!escaped) {
              if (ch === "[") {
                inClass = true;
              } else if (ch === "]" && inClass) {
                inClass = false;
              } else if (ch === "/" && !inClass) {
                break;
              }
              escaped = ch === "\\";
            } else {
              escaped = false;
            }
            ++this.pos;
          }
          var pattern = this.input.slice(start, this.pos);
          ++this.pos;
          var flagsStart = this.pos;
          var flags = this.readWord1();
          if (this.containsEsc) {
            this.unexpected(flagsStart);
          }
          var state = this.regexpState || (this.regexpState = new RegExpValidationState(this));
          state.reset(start, pattern, flags);
          this.validateRegExpFlags(state);
          this.validateRegExpPattern(state);
          var value2 = null;
          try {
            value2 = new RegExp(pattern, flags);
          } catch (e) {
          }
          return this.finishToken(types.regexp, { pattern, flags, value: value2 });
        };
        pp$9.readInt = function(radix, len) {
          var start = this.pos, total = 0;
          for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
            var code = this.input.charCodeAt(this.pos), val = void 0;
            if (code >= 97) {
              val = code - 97 + 10;
            } else if (code >= 65) {
              val = code - 65 + 10;
            } else if (code >= 48 && code <= 57) {
              val = code - 48;
            } else {
              val = Infinity;
            }
            if (val >= radix) {
              break;
            }
            ++this.pos;
            total = total * radix + val;
          }
          if (this.pos === start || len != null && this.pos - start !== len) {
            return null;
          }
          return total;
        };
        pp$9.readRadixNumber = function(radix) {
          var start = this.pos;
          this.pos += 2;
          var val = this.readInt(radix);
          if (val == null) {
            this.raise(this.start + 2, "Expected number in radix " + radix);
          }
          if (this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110) {
            val = typeof BigInt !== "undefined" ? BigInt(this.input.slice(start, this.pos)) : null;
            ++this.pos;
          } else if (isIdentifierStart(this.fullCharCodeAtPos())) {
            this.raise(this.pos, "Identifier directly after number");
          }
          return this.finishToken(types.num, val);
        };
        pp$9.readNumber = function(startsWithDot) {
          var start = this.pos;
          if (!startsWithDot && this.readInt(10) === null) {
            this.raise(start, "Invalid number");
          }
          var octal = this.pos - start >= 2 && this.input.charCodeAt(start) === 48;
          if (octal && this.strict) {
            this.raise(start, "Invalid number");
          }
          var next = this.input.charCodeAt(this.pos);
          if (!octal && !startsWithDot && this.options.ecmaVersion >= 11 && next === 110) {
            var str$1 = this.input.slice(start, this.pos);
            var val$1 = typeof BigInt !== "undefined" ? BigInt(str$1) : null;
            ++this.pos;
            if (isIdentifierStart(this.fullCharCodeAtPos())) {
              this.raise(this.pos, "Identifier directly after number");
            }
            return this.finishToken(types.num, val$1);
          }
          if (octal && /[89]/.test(this.input.slice(start, this.pos))) {
            octal = false;
          }
          if (next === 46 && !octal) {
            ++this.pos;
            this.readInt(10);
            next = this.input.charCodeAt(this.pos);
          }
          if ((next === 69 || next === 101) && !octal) {
            next = this.input.charCodeAt(++this.pos);
            if (next === 43 || next === 45) {
              ++this.pos;
            }
            if (this.readInt(10) === null) {
              this.raise(start, "Invalid number");
            }
          }
          if (isIdentifierStart(this.fullCharCodeAtPos())) {
            this.raise(this.pos, "Identifier directly after number");
          }
          var str = this.input.slice(start, this.pos);
          var val = octal ? parseInt(str, 8) : parseFloat(str);
          return this.finishToken(types.num, val);
        };
        pp$9.readCodePoint = function() {
          var ch = this.input.charCodeAt(this.pos), code;
          if (ch === 123) {
            if (this.options.ecmaVersion < 6) {
              this.unexpected();
            }
            var codePos = ++this.pos;
            code = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
            ++this.pos;
            if (code > 1114111) {
              this.invalidStringToken(codePos, "Code point out of bounds");
            }
          } else {
            code = this.readHexChar(4);
          }
          return code;
        };
        function codePointToString$1(code) {
          if (code <= 65535) {
            return String.fromCharCode(code);
          }
          code -= 65536;
          return String.fromCharCode((code >> 10) + 55296, (code & 1023) + 56320);
        }
        pp$9.readString = function(quote) {
          var out = "", chunkStart = ++this.pos;
          for (; ; ) {
            if (this.pos >= this.input.length) {
              this.raise(this.start, "Unterminated string constant");
            }
            var ch = this.input.charCodeAt(this.pos);
            if (ch === quote) {
              break;
            }
            if (ch === 92) {
              out += this.input.slice(chunkStart, this.pos);
              out += this.readEscapedChar(false);
              chunkStart = this.pos;
            } else {
              if (isNewLine(ch, this.options.ecmaVersion >= 10)) {
                this.raise(this.start, "Unterminated string constant");
              }
              ++this.pos;
            }
          }
          out += this.input.slice(chunkStart, this.pos++);
          return this.finishToken(types.string, out);
        };
        var INVALID_TEMPLATE_ESCAPE_ERROR = {};
        pp$9.tryReadTemplateToken = function() {
          this.inTemplateElement = true;
          try {
            this.readTmplToken();
          } catch (err) {
            if (err === INVALID_TEMPLATE_ESCAPE_ERROR) {
              this.readInvalidTemplateToken();
            } else {
              throw err;
            }
          }
          this.inTemplateElement = false;
        };
        pp$9.invalidStringToken = function(position, message) {
          if (this.inTemplateElement && this.options.ecmaVersion >= 9) {
            throw INVALID_TEMPLATE_ESCAPE_ERROR;
          } else {
            this.raise(position, message);
          }
        };
        pp$9.readTmplToken = function() {
          var out = "", chunkStart = this.pos;
          for (; ; ) {
            if (this.pos >= this.input.length) {
              this.raise(this.start, "Unterminated template");
            }
            var ch = this.input.charCodeAt(this.pos);
            if (ch === 96 || ch === 36 && this.input.charCodeAt(this.pos + 1) === 123) {
              if (this.pos === this.start && (this.type === types.template || this.type === types.invalidTemplate)) {
                if (ch === 36) {
                  this.pos += 2;
                  return this.finishToken(types.dollarBraceL);
                } else {
                  ++this.pos;
                  return this.finishToken(types.backQuote);
                }
              }
              out += this.input.slice(chunkStart, this.pos);
              return this.finishToken(types.template, out);
            }
            if (ch === 92) {
              out += this.input.slice(chunkStart, this.pos);
              out += this.readEscapedChar(true);
              chunkStart = this.pos;
            } else if (isNewLine(ch)) {
              out += this.input.slice(chunkStart, this.pos);
              ++this.pos;
              switch (ch) {
                case 13:
                  if (this.input.charCodeAt(this.pos) === 10) {
                    ++this.pos;
                  }
                case 10:
                  out += "\n";
                  break;
                default:
                  out += String.fromCharCode(ch);
                  break;
              }
              if (this.options.locations) {
                ++this.curLine;
                this.lineStart = this.pos;
              }
              chunkStart = this.pos;
            } else {
              ++this.pos;
            }
          }
        };
        pp$9.readInvalidTemplateToken = function() {
          for (; this.pos < this.input.length; this.pos++) {
            switch (this.input[this.pos]) {
              case "\\":
                ++this.pos;
                break;
              case "$":
                if (this.input[this.pos + 1] !== "{") {
                  break;
                }
              case "`":
                return this.finishToken(types.invalidTemplate, this.input.slice(this.start, this.pos));
            }
          }
          this.raise(this.start, "Unterminated template");
        };
        pp$9.readEscapedChar = function(inTemplate) {
          var ch = this.input.charCodeAt(++this.pos);
          ++this.pos;
          switch (ch) {
            case 110:
              return "\n";
            case 114:
              return "\r";
            case 120:
              return String.fromCharCode(this.readHexChar(2));
            case 117:
              return codePointToString$1(this.readCodePoint());
            case 116:
              return "	";
            case 98:
              return "\b";
            case 118:
              return "\v";
            case 102:
              return "\f";
            case 13:
              if (this.input.charCodeAt(this.pos) === 10) {
                ++this.pos;
              }
            case 10:
              if (this.options.locations) {
                this.lineStart = this.pos;
                ++this.curLine;
              }
              return "";
            case 56:
            case 57:
              if (inTemplate) {
                var codePos = this.pos - 1;
                this.invalidStringToken(codePos, "Invalid escape sequence in template string");
                return null;
              }
            default:
              if (ch >= 48 && ch <= 55) {
                var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
                var octal = parseInt(octalStr, 8);
                if (octal > 255) {
                  octalStr = octalStr.slice(0, -1);
                  octal = parseInt(octalStr, 8);
                }
                this.pos += octalStr.length - 1;
                ch = this.input.charCodeAt(this.pos);
                if ((octalStr !== "0" || ch === 56 || ch === 57) && (this.strict || inTemplate)) {
                  this.invalidStringToken(this.pos - 1 - octalStr.length, inTemplate ? "Octal literal in template string" : "Octal literal in strict mode");
                }
                return String.fromCharCode(octal);
              }
              if (isNewLine(ch)) {
                return "";
              }
              return String.fromCharCode(ch);
          }
        };
        pp$9.readHexChar = function(len) {
          var codePos = this.pos;
          var n = this.readInt(16, len);
          if (n === null) {
            this.invalidStringToken(codePos, "Bad character escape sequence");
          }
          return n;
        };
        pp$9.readWord1 = function() {
          this.containsEsc = false;
          var word = "", first = true, chunkStart = this.pos;
          var astral = this.options.ecmaVersion >= 6;
          while (this.pos < this.input.length) {
            var ch = this.fullCharCodeAtPos();
            if (isIdentifierChar(ch, astral)) {
              this.pos += ch <= 65535 ? 1 : 2;
            } else if (ch === 92) {
              this.containsEsc = true;
              word += this.input.slice(chunkStart, this.pos);
              var escStart = this.pos;
              if (this.input.charCodeAt(++this.pos) !== 117) {
                this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX");
              }
              ++this.pos;
              var esc = this.readCodePoint();
              if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral)) {
                this.invalidStringToken(escStart, "Invalid Unicode escape");
              }
              word += codePointToString$1(esc);
              chunkStart = this.pos;
            } else {
              break;
            }
            first = false;
          }
          return word + this.input.slice(chunkStart, this.pos);
        };
        pp$9.readWord = function() {
          var word = this.readWord1();
          var type = types.name;
          if (this.keywords.test(word)) {
            type = keywords$1[word];
          }
          return this.finishToken(type, word);
        };
        var version2 = "7.1.0";
        Parser.acorn = {
          Parser,
          version: version2,
          defaultOptions,
          Position,
          SourceLocation,
          getLineInfo,
          Node,
          TokenType,
          tokTypes: types,
          keywordTypes: keywords$1,
          TokContext,
          tokContexts: types$1,
          isIdentifierChar,
          isIdentifierStart,
          Token,
          isNewLine,
          lineBreak,
          lineBreakG,
          nonASCIIwhitespace
        };
        function parse(input, options) {
          return Parser.parse(input, options);
        }
        function parseExpressionAt(input, pos, options) {
          return Parser.parseExpressionAt(input, pos, options);
        }
        function tokenizer(input, options) {
          return Parser.tokenizer(input, options);
        }
        exports3.Node = Node;
        exports3.Parser = Parser;
        exports3.Position = Position;
        exports3.SourceLocation = SourceLocation;
        exports3.TokContext = TokContext;
        exports3.Token = Token;
        exports3.TokenType = TokenType;
        exports3.defaultOptions = defaultOptions;
        exports3.getLineInfo = getLineInfo;
        exports3.isIdentifierChar = isIdentifierChar;
        exports3.isIdentifierStart = isIdentifierStart;
        exports3.isNewLine = isNewLine;
        exports3.keywordTypes = keywords$1;
        exports3.lineBreak = lineBreak;
        exports3.lineBreakG = lineBreakG;
        exports3.nonASCIIwhitespace = nonASCIIwhitespace;
        exports3.parse = parse;
        exports3.parseExpressionAt = parseExpressionAt;
        exports3.tokContexts = types$1;
        exports3.tokTypes = types;
        exports3.tokenizer = tokenizer;
        exports3.version = version2;
        Object.defineProperty(exports3, "__esModule", { value: true });
      });
    }, {}], 2: [function(require2, module2, exports2) {
    }, {}], 3: [function(require2, module2, exports2) {
      function glWiretap(gl, options = {}) {
        const {
          contextName = "gl",
          throwGetError,
          useTrackablePrimitives,
          readPixelsFile,
          recording = [],
          variables = {},
          onReadPixels,
          onUnrecognizedArgumentLookup
        } = options;
        const proxy2 = new Proxy(gl, { get: listen });
        const contextVariables = [];
        const entityNames = {};
        let imageCount = 0;
        let indent = "";
        let readPixelsVariableName;
        return proxy2;
        function listen(obj, property) {
          switch (property) {
            case "addComment":
              return addComment;
            case "checkThrowError":
              return checkThrowError;
            case "getReadPixelsVariableName":
              return readPixelsVariableName;
            case "insertVariable":
              return insertVariable;
            case "reset":
              return reset;
            case "setIndent":
              return setIndent;
            case "toString":
              return toString2;
            case "getContextVariableName":
              return getContextVariableName;
          }
          if (typeof gl[property] === "function") {
            return function() {
              switch (property) {
                case "getError":
                  if (throwGetError) {
                    recording.push(`${indent}if (${contextName}.getError() !== ${contextName}.NONE) throw new Error('error');`);
                  } else {
                    recording.push(`${indent}${contextName}.getError();`);
                  }
                  return gl.getError();
                case "getExtension": {
                  const variableName = `${contextName}Variables${contextVariables.length}`;
                  recording.push(`${indent}const ${variableName} = ${contextName}.getExtension('${arguments[0]}');`);
                  const extension = gl.getExtension(arguments[0]);
                  if (extension && typeof extension === "object") {
                    const tappedExtension = glExtensionWiretap(extension, {
                      getEntity,
                      useTrackablePrimitives,
                      recording,
                      contextName: variableName,
                      contextVariables,
                      variables,
                      indent,
                      onUnrecognizedArgumentLookup
                    });
                    contextVariables.push(tappedExtension);
                    return tappedExtension;
                  } else {
                    contextVariables.push(null);
                  }
                  return extension;
                }
                case "readPixels":
                  const i = contextVariables.indexOf(arguments[6]);
                  let targetVariableName;
                  if (i === -1) {
                    const variableName = getVariableName(arguments[6]);
                    if (variableName) {
                      targetVariableName = variableName;
                      recording.push(`${indent}${variableName}`);
                    } else {
                      targetVariableName = `${contextName}Variable${contextVariables.length}`;
                      contextVariables.push(arguments[6]);
                      recording.push(`${indent}const ${targetVariableName} = new ${arguments[6].constructor.name}(${arguments[6].length});`);
                    }
                  } else {
                    targetVariableName = `${contextName}Variable${i}`;
                  }
                  readPixelsVariableName = targetVariableName;
                  const argumentAsStrings = [
                    arguments[0],
                    arguments[1],
                    arguments[2],
                    arguments[3],
                    getEntity(arguments[4]),
                    getEntity(arguments[5]),
                    targetVariableName
                  ];
                  recording.push(`${indent}${contextName}.readPixels(${argumentAsStrings.join(", ")});`);
                  if (readPixelsFile) {
                    writePPM(arguments[2], arguments[3]);
                  }
                  if (onReadPixels) {
                    onReadPixels(targetVariableName, argumentAsStrings);
                  }
                  return gl.readPixels.apply(gl, arguments);
                case "drawBuffers":
                  recording.push(`${indent}${contextName}.drawBuffers([${argumentsToString(arguments[0], { contextName, contextVariables, getEntity, addVariable, variables, onUnrecognizedArgumentLookup })}]);`);
                  return gl.drawBuffers(arguments[0]);
              }
              let result = gl[property].apply(gl, arguments);
              switch (typeof result) {
                case "undefined":
                  recording.push(`${indent}${methodCallToString(property, arguments)};`);
                  return;
                case "number":
                case "boolean":
                  if (useTrackablePrimitives && contextVariables.indexOf(trackablePrimitive(result)) === -1) {
                    recording.push(`${indent}const ${contextName}Variable${contextVariables.length} = ${methodCallToString(property, arguments)};`);
                    contextVariables.push(result = trackablePrimitive(result));
                    break;
                  }
                default:
                  if (result === null) {
                    recording.push(`${methodCallToString(property, arguments)};`);
                  } else {
                    recording.push(`${indent}const ${contextName}Variable${contextVariables.length} = ${methodCallToString(property, arguments)};`);
                  }
                  contextVariables.push(result);
              }
              return result;
            };
          }
          entityNames[gl[property]] = property;
          return gl[property];
        }
        function toString2() {
          return recording.join("\n");
        }
        function reset() {
          while (recording.length > 0) {
            recording.pop();
          }
        }
        function insertVariable(name2, value2) {
          variables[name2] = value2;
        }
        function getEntity(value2) {
          const name2 = entityNames[value2];
          if (name2) {
            return contextName + "." + name2;
          }
          return value2;
        }
        function setIndent(spaces) {
          indent = " ".repeat(spaces);
        }
        function addVariable(value2, source) {
          const variableName = `${contextName}Variable${contextVariables.length}`;
          recording.push(`${indent}const ${variableName} = ${source};`);
          contextVariables.push(value2);
          return variableName;
        }
        function writePPM(width, height) {
          const sourceVariable = `${contextName}Variable${contextVariables.length}`;
          const imageVariable = `imageDatum${imageCount}`;
          recording.push(`${indent}let ${imageVariable} = ["P3\\n# ${readPixelsFile}.ppm\\n", ${width}, ' ', ${height}, "\\n255\\n"].join("");`);
          recording.push(`${indent}for (let i = 0; i < ${imageVariable}.length; i += 4) {`);
          recording.push(`${indent}  ${imageVariable} += ${sourceVariable}[i] + ' ' + ${sourceVariable}[i + 1] + ' ' + ${sourceVariable}[i + 2] + ' ';`);
          recording.push(`${indent}}`);
          recording.push(`${indent}if (typeof require !== "undefined") {`);
          recording.push(`${indent}  require('fs').writeFileSync('./${readPixelsFile}.ppm', ${imageVariable});`);
          recording.push(`${indent}}`);
          imageCount++;
        }
        function addComment(value2) {
          recording.push(`${indent}// ${value2}`);
        }
        function checkThrowError() {
          recording.push(`${indent}(() => {
${indent}const error = ${contextName}.getError();
${indent}if (error !== ${contextName}.NONE) {
${indent}  const names = Object.getOwnPropertyNames(gl);
${indent}  for (let i = 0; i < names.length; i++) {
${indent}    const name = names[i];
${indent}    if (${contextName}[name] === error) {
${indent}      throw new Error('${contextName} threw ' + name);
${indent}    }
${indent}  }
${indent}}
${indent}})();`);
        }
        function methodCallToString(method, args) {
          return `${contextName}.${method}(${argumentsToString(args, { contextName, contextVariables, getEntity, addVariable, variables, onUnrecognizedArgumentLookup })})`;
        }
        function getVariableName(value2) {
          if (variables) {
            for (const name2 in variables) {
              if (variables[name2] === value2) {
                return name2;
              }
            }
          }
          return null;
        }
        function getContextVariableName(value2) {
          const i = contextVariables.indexOf(value2);
          if (i !== -1) {
            return `${contextName}Variable${i}`;
          }
          return null;
        }
      }
      function glExtensionWiretap(extension, options) {
        const proxy2 = new Proxy(extension, { get: listen });
        const extensionEntityNames = {};
        const {
          contextName,
          contextVariables,
          getEntity,
          useTrackablePrimitives,
          recording,
          variables,
          indent,
          onUnrecognizedArgumentLookup
        } = options;
        return proxy2;
        function listen(obj, property) {
          if (typeof obj[property] === "function") {
            return function() {
              switch (property) {
                case "drawBuffersWEBGL":
                  recording.push(`${indent}${contextName}.drawBuffersWEBGL([${argumentsToString(arguments[0], { contextName, contextVariables, getEntity: getExtensionEntity, addVariable, variables, onUnrecognizedArgumentLookup })}]);`);
                  return extension.drawBuffersWEBGL(arguments[0]);
              }
              let result = extension[property].apply(extension, arguments);
              switch (typeof result) {
                case "undefined":
                  recording.push(`${indent}${methodCallToString(property, arguments)};`);
                  return;
                case "number":
                case "boolean":
                  if (useTrackablePrimitives && contextVariables.indexOf(trackablePrimitive(result)) === -1) {
                    recording.push(`${indent}const ${contextName}Variable${contextVariables.length} = ${methodCallToString(property, arguments)};`);
                    contextVariables.push(result = trackablePrimitive(result));
                  } else {
                    recording.push(`${indent}const ${contextName}Variable${contextVariables.length} = ${methodCallToString(property, arguments)};`);
                    contextVariables.push(result);
                  }
                  break;
                default:
                  if (result === null) {
                    recording.push(`${methodCallToString(property, arguments)};`);
                  } else {
                    recording.push(`${indent}const ${contextName}Variable${contextVariables.length} = ${methodCallToString(property, arguments)};`);
                  }
                  contextVariables.push(result);
              }
              return result;
            };
          }
          extensionEntityNames[extension[property]] = property;
          return extension[property];
        }
        function getExtensionEntity(value2) {
          if (extensionEntityNames.hasOwnProperty(value2)) {
            return `${contextName}.${extensionEntityNames[value2]}`;
          }
          return getEntity(value2);
        }
        function methodCallToString(method, args) {
          return `${contextName}.${method}(${argumentsToString(args, { contextName, contextVariables, getEntity: getExtensionEntity, addVariable, variables, onUnrecognizedArgumentLookup })})`;
        }
        function addVariable(value2, source) {
          const variableName = `${contextName}Variable${contextVariables.length}`;
          contextVariables.push(value2);
          recording.push(`${indent}const ${variableName} = ${source};`);
          return variableName;
        }
      }
      function argumentsToString(args, options) {
        const { variables, onUnrecognizedArgumentLookup } = options;
        return Array.from(args).map((arg) => {
          const variableName = getVariableName(arg);
          if (variableName) {
            return variableName;
          }
          return argumentToString(arg, options);
        }).join(", ");
        function getVariableName(value2) {
          if (variables) {
            for (const name2 in variables) {
              if (!variables.hasOwnProperty(name2))
                continue;
              if (variables[name2] === value2) {
                return name2;
              }
            }
          }
          if (onUnrecognizedArgumentLookup) {
            return onUnrecognizedArgumentLookup(value2);
          }
          return null;
        }
      }
      function argumentToString(arg, options) {
        const { contextName, contextVariables, getEntity, addVariable, onUnrecognizedArgumentLookup } = options;
        if (typeof arg === "undefined") {
          return "undefined";
        }
        if (arg === null) {
          return "null";
        }
        const i = contextVariables.indexOf(arg);
        if (i > -1) {
          return `${contextName}Variable${i}`;
        }
        switch (arg.constructor.name) {
          case "String":
            const hasLines = /\n/.test(arg);
            const hasSingleQuotes = /'/.test(arg);
            const hasDoubleQuotes = /"/.test(arg);
            if (hasLines) {
              return "`" + arg + "`";
            } else if (hasSingleQuotes && !hasDoubleQuotes) {
              return '"' + arg + '"';
            } else if (!hasSingleQuotes && hasDoubleQuotes) {
              return "'" + arg + "'";
            } else {
              return "'" + arg + "'";
            }
          case "Number":
            return getEntity(arg);
          case "Boolean":
            return getEntity(arg);
          case "Array":
            return addVariable(arg, `new ${arg.constructor.name}([${Array.from(arg).join(",")}])`);
          case "Float32Array":
          case "Uint8Array":
          case "Uint16Array":
          case "Int32Array":
            return addVariable(arg, `new ${arg.constructor.name}(${JSON.stringify(Array.from(arg))})`);
          default:
            if (onUnrecognizedArgumentLookup) {
              const instantiationString = onUnrecognizedArgumentLookup(arg);
              if (instantiationString) {
                return instantiationString;
              }
            }
            throw new Error(`unrecognized argument type ${arg.constructor.name}`);
        }
      }
      function trackablePrimitive(value2) {
        return new value2.constructor(value2);
      }
      if (typeof module2 !== "undefined") {
        module2.exports = { glWiretap, glExtensionWiretap };
      }
      if (typeof window !== "undefined") {
        glWiretap.glExtensionWiretap = glExtensionWiretap;
        window.glWiretap = glWiretap;
      }
    }, {}], 4: [function(require2, module2, exports2) {
      function setupArguments(args) {
        const newArguments = new Array(args.length);
        for (let i = 0; i < args.length; i++) {
          const arg = args[i];
          if (arg.toArray) {
            newArguments[i] = arg.toArray();
          } else {
            newArguments[i] = arg;
          }
        }
        return newArguments;
      }
      function mock1D() {
        const args = setupArguments(arguments);
        const row = new Float32Array(this.output.x);
        for (let x = 0; x < this.output.x; x++) {
          this.thread.x = x;
          this.thread.y = 0;
          this.thread.z = 0;
          row[x] = this._fn.apply(this, args);
        }
        return row;
      }
      function mock2D() {
        const args = setupArguments(arguments);
        const matrix = new Array(this.output.y);
        for (let y = 0; y < this.output.y; y++) {
          const row = new Float32Array(this.output.x);
          for (let x = 0; x < this.output.x; x++) {
            this.thread.x = x;
            this.thread.y = y;
            this.thread.z = 0;
            row[x] = this._fn.apply(this, args);
          }
          matrix[y] = row;
        }
        return matrix;
      }
      function mock2DGraphical() {
        const args = setupArguments(arguments);
        for (let y = 0; y < this.output.y; y++) {
          for (let x = 0; x < this.output.x; x++) {
            this.thread.x = x;
            this.thread.y = y;
            this.thread.z = 0;
            this._fn.apply(this, args);
          }
        }
      }
      function mock3D() {
        const args = setupArguments(arguments);
        const cube = new Array(this.output.z);
        for (let z = 0; z < this.output.z; z++) {
          const matrix = new Array(this.output.y);
          for (let y = 0; y < this.output.y; y++) {
            const row = new Float32Array(this.output.x);
            for (let x = 0; x < this.output.x; x++) {
              this.thread.x = x;
              this.thread.y = y;
              this.thread.z = z;
              row[x] = this._fn.apply(this, args);
            }
            matrix[y] = row;
          }
          cube[z] = matrix;
        }
        return cube;
      }
      function apiDecorate(kernel) {
        kernel.setOutput = (output) => {
          kernel.output = setupOutput(output);
          if (kernel.graphical) {
            setupGraphical(kernel);
          }
        };
        kernel.toJSON = () => {
          throw new Error("Not usable with gpuMock");
        };
        kernel.setConstants = (flag) => {
          kernel.constants = flag;
          return kernel;
        };
        kernel.setGraphical = (flag) => {
          kernel.graphical = flag;
          return kernel;
        };
        kernel.setCanvas = (flag) => {
          kernel.canvas = flag;
          return kernel;
        };
        kernel.setContext = (flag) => {
          kernel.context = flag;
          return kernel;
        };
        kernel.destroy = () => {
        };
        kernel.validateSettings = () => {
        };
        if (kernel.graphical && kernel.output) {
          setupGraphical(kernel);
        }
        kernel.exec = function() {
          return new Promise((resolve, reject) => {
            try {
              resolve(kernel.apply(kernel, arguments));
            } catch (e) {
              reject(e);
            }
          });
        };
        kernel.getPixels = (flip) => {
          const { x, y } = kernel.output;
          return flip ? flipPixels(kernel._imageData.data, x, y) : kernel._imageData.data.slice(0);
        };
        kernel.color = function(r, g, b, a) {
          if (typeof a === "undefined") {
            a = 1;
          }
          r = Math.floor(r * 255);
          g = Math.floor(g * 255);
          b = Math.floor(b * 255);
          a = Math.floor(a * 255);
          const width = kernel.output.x;
          const height = kernel.output.y;
          const x = kernel.thread.x;
          const y = height - kernel.thread.y - 1;
          const index2 = x + y * width;
          kernel._colorData[index2 * 4 + 0] = r;
          kernel._colorData[index2 * 4 + 1] = g;
          kernel._colorData[index2 * 4 + 2] = b;
          kernel._colorData[index2 * 4 + 3] = a;
        };
        const mockMethod = () => kernel;
        const methods = [
          "setWarnVarUsage",
          "setArgumentTypes",
          "setTactic",
          "setOptimizeFloatMemory",
          "setDebug",
          "setLoopMaxIterations",
          "setConstantTypes",
          "setFunctions",
          "setNativeFunctions",
          "setInjectedNative",
          "setPipeline",
          "setPrecision",
          "setOutputToTexture",
          "setImmutable",
          "setStrictIntegers",
          "setDynamicOutput",
          "setHardcodeConstants",
          "setDynamicArguments",
          "setUseLegacyEncoder",
          "setWarnVarUsage",
          "addSubKernel"
        ];
        for (let i = 0; i < methods.length; i++) {
          kernel[methods[i]] = mockMethod;
        }
        return kernel;
      }
      function setupGraphical(kernel) {
        const { x, y } = kernel.output;
        if (kernel.context && kernel.context.createImageData) {
          const data = new Uint8ClampedArray(x * y * 4);
          kernel._imageData = kernel.context.createImageData(x, y);
          kernel._colorData = data;
        } else {
          const data = new Uint8ClampedArray(x * y * 4);
          kernel._imageData = { data };
          kernel._colorData = data;
        }
      }
      function setupOutput(output) {
        let result = null;
        if (output.length) {
          if (output.length === 3) {
            const [x, y, z] = output;
            result = { x, y, z };
          } else if (output.length === 2) {
            const [x, y] = output;
            result = { x, y };
          } else {
            const [x] = output;
            result = { x };
          }
        } else {
          result = output;
        }
        return result;
      }
      function gpuMock(fn, settings = {}) {
        const output = settings.output ? setupOutput(settings.output) : null;
        function kernel() {
          if (kernel.output.z) {
            return mock3D.apply(kernel, arguments);
          } else if (kernel.output.y) {
            if (kernel.graphical) {
              return mock2DGraphical.apply(kernel, arguments);
            }
            return mock2D.apply(kernel, arguments);
          } else {
            return mock1D.apply(kernel, arguments);
          }
        }
        kernel._fn = fn;
        kernel.constants = settings.constants || null;
        kernel.context = settings.context || null;
        kernel.canvas = settings.canvas || null;
        kernel.graphical = settings.graphical || false;
        kernel._imageData = null;
        kernel._colorData = null;
        kernel.output = output;
        kernel.thread = {
          x: 0,
          y: 0,
          z: 0
        };
        return apiDecorate(kernel);
      }
      function flipPixels(pixels, width, height) {
        const halfHeight = height / 2 | 0;
        const bytesPerRow = width * 4;
        const temp = new Uint8ClampedArray(width * 4);
        const result = pixels.slice(0);
        for (let y = 0; y < halfHeight; ++y) {
          const topOffset = y * bytesPerRow;
          const bottomOffset = (height - y - 1) * bytesPerRow;
          temp.set(result.subarray(topOffset, topOffset + bytesPerRow));
          result.copyWithin(topOffset, bottomOffset, bottomOffset + bytesPerRow);
          result.set(temp, bottomOffset);
        }
        return result;
      }
      module2.exports = {
        gpuMock
      };
    }, {}], 5: [function(require2, module2, exports2) {
      const { utils } = require2("./utils");
      function alias(name2, source) {
        const fnString = source.toString();
        return new Function(`return function ${name2} (${utils.getArgumentNamesFromString(fnString).join(", ")}) {
  ${utils.getFunctionBodyFromString(fnString)}
}`)();
      }
      module2.exports = {
        alias
      };
    }, { "./utils": 114 }], 6: [function(require2, module2, exports2) {
      const { FunctionNode } = require2("../function-node");
      class CPUFunctionNode extends FunctionNode {
        astFunction(ast, retArr) {
          if (!this.isRootKernel) {
            retArr.push("function");
            retArr.push(" ");
            retArr.push(this.name);
            retArr.push("(");
            for (let i = 0; i < this.argumentNames.length; ++i) {
              const argumentName = this.argumentNames[i];
              if (i > 0) {
                retArr.push(", ");
              }
              retArr.push("user_");
              retArr.push(argumentName);
            }
            retArr.push(") {\n");
          }
          for (let i = 0; i < ast.body.body.length; ++i) {
            this.astGeneric(ast.body.body[i], retArr);
            retArr.push("\n");
          }
          if (!this.isRootKernel) {
            retArr.push("}\n");
          }
          return retArr;
        }
        astReturnStatement(ast, retArr) {
          const type = this.returnType || this.getType(ast.argument);
          if (!this.returnType) {
            this.returnType = type;
          }
          if (this.isRootKernel) {
            retArr.push(this.leadingReturnStatement);
            this.astGeneric(ast.argument, retArr);
            retArr.push(";\n");
            retArr.push(this.followingReturnStatement);
            retArr.push("continue;\n");
          } else if (this.isSubKernel) {
            retArr.push(`subKernelResult_${this.name} = `);
            this.astGeneric(ast.argument, retArr);
            retArr.push(";");
            retArr.push(`return subKernelResult_${this.name};`);
          } else {
            retArr.push("return ");
            this.astGeneric(ast.argument, retArr);
            retArr.push(";");
          }
          return retArr;
        }
        astLiteral(ast, retArr) {
          if (isNaN(ast.value)) {
            throw this.astErrorOutput("Non-numeric literal not supported : " + ast.value, ast);
          }
          retArr.push(ast.value);
          return retArr;
        }
        astBinaryExpression(ast, retArr) {
          retArr.push("(");
          this.astGeneric(ast.left, retArr);
          retArr.push(ast.operator);
          this.astGeneric(ast.right, retArr);
          retArr.push(")");
          return retArr;
        }
        astIdentifierExpression(idtNode, retArr) {
          if (idtNode.type !== "Identifier") {
            throw this.astErrorOutput("IdentifierExpression - not an Identifier", idtNode);
          }
          switch (idtNode.name) {
            case "Infinity":
              retArr.push("Infinity");
              break;
            default:
              if (this.constants && this.constants.hasOwnProperty(idtNode.name)) {
                retArr.push("constants_" + idtNode.name);
              } else {
                retArr.push("user_" + idtNode.name);
              }
          }
          return retArr;
        }
        astForStatement(forNode, retArr) {
          if (forNode.type !== "ForStatement") {
            throw this.astErrorOutput("Invalid for statement", forNode);
          }
          const initArr = [];
          const testArr = [];
          const updateArr = [];
          const bodyArr = [];
          let isSafe = null;
          if (forNode.init) {
            this.pushState("in-for-loop-init");
            this.astGeneric(forNode.init, initArr);
            for (let i = 0; i < initArr.length; i++) {
              if (initArr[i].includes && initArr[i].includes(",")) {
                isSafe = false;
              }
            }
            this.popState("in-for-loop-init");
          } else {
            isSafe = false;
          }
          if (forNode.test) {
            this.astGeneric(forNode.test, testArr);
          } else {
            isSafe = false;
          }
          if (forNode.update) {
            this.astGeneric(forNode.update, updateArr);
          } else {
            isSafe = false;
          }
          if (forNode.body) {
            this.pushState("loop-body");
            this.astGeneric(forNode.body, bodyArr);
            this.popState("loop-body");
          }
          if (isSafe === null) {
            isSafe = this.isSafe(forNode.init) && this.isSafe(forNode.test);
          }
          if (isSafe) {
            retArr.push(`for (${initArr.join("")};${testArr.join("")};${updateArr.join("")}){
`);
            retArr.push(bodyArr.join(""));
            retArr.push("}\n");
          } else {
            const iVariableName = this.getInternalVariableName("safeI");
            if (initArr.length > 0) {
              retArr.push(initArr.join(""), ";\n");
            }
            retArr.push(`for (let ${iVariableName}=0;${iVariableName}<LOOP_MAX;${iVariableName}++){
`);
            if (testArr.length > 0) {
              retArr.push(`if (!${testArr.join("")}) break;
`);
            }
            retArr.push(bodyArr.join(""));
            retArr.push(`
${updateArr.join("")};`);
            retArr.push("}\n");
          }
          return retArr;
        }
        astWhileStatement(whileNode, retArr) {
          if (whileNode.type !== "WhileStatement") {
            throw this.astErrorOutput("Invalid while statement", whileNode);
          }
          retArr.push("for (let i = 0; i < LOOP_MAX; i++) {");
          retArr.push("if (");
          this.astGeneric(whileNode.test, retArr);
          retArr.push(") {\n");
          this.astGeneric(whileNode.body, retArr);
          retArr.push("} else {\n");
          retArr.push("break;\n");
          retArr.push("}\n");
          retArr.push("}\n");
          return retArr;
        }
        astDoWhileStatement(doWhileNode, retArr) {
          if (doWhileNode.type !== "DoWhileStatement") {
            throw this.astErrorOutput("Invalid while statement", doWhileNode);
          }
          retArr.push("for (let i = 0; i < LOOP_MAX; i++) {");
          this.astGeneric(doWhileNode.body, retArr);
          retArr.push("if (!");
          this.astGeneric(doWhileNode.test, retArr);
          retArr.push(") {\n");
          retArr.push("break;\n");
          retArr.push("}\n");
          retArr.push("}\n");
          return retArr;
        }
        astAssignmentExpression(assNode, retArr) {
          const declaration = this.getDeclaration(assNode.left);
          if (declaration && !declaration.assignable) {
            throw this.astErrorOutput(`Variable ${assNode.left.name} is not assignable here`, assNode);
          }
          this.astGeneric(assNode.left, retArr);
          retArr.push(assNode.operator);
          this.astGeneric(assNode.right, retArr);
          return retArr;
        }
        astBlockStatement(bNode, retArr) {
          if (this.isState("loop-body")) {
            this.pushState("block-body");
            for (let i = 0; i < bNode.body.length; i++) {
              this.astGeneric(bNode.body[i], retArr);
            }
            this.popState("block-body");
          } else {
            retArr.push("{\n");
            for (let i = 0; i < bNode.body.length; i++) {
              this.astGeneric(bNode.body[i], retArr);
            }
            retArr.push("}\n");
          }
          return retArr;
        }
        astVariableDeclaration(varDecNode, retArr) {
          retArr.push(`${varDecNode.kind} `);
          const { declarations } = varDecNode;
          for (let i = 0; i < declarations.length; i++) {
            if (i > 0) {
              retArr.push(",");
            }
            const declaration = declarations[i];
            const info = this.getDeclaration(declaration.id);
            if (!info.valueType) {
              info.valueType = this.getType(declaration.init);
            }
            this.astGeneric(declaration, retArr);
          }
          if (!this.isState("in-for-loop-init")) {
            retArr.push(";");
          }
          return retArr;
        }
        astIfStatement(ifNode, retArr) {
          retArr.push("if (");
          this.astGeneric(ifNode.test, retArr);
          retArr.push(")");
          if (ifNode.consequent.type === "BlockStatement") {
            this.astGeneric(ifNode.consequent, retArr);
          } else {
            retArr.push(" {\n");
            this.astGeneric(ifNode.consequent, retArr);
            retArr.push("\n}\n");
          }
          if (ifNode.alternate) {
            retArr.push("else ");
            if (ifNode.alternate.type === "BlockStatement" || ifNode.alternate.type === "IfStatement") {
              this.astGeneric(ifNode.alternate, retArr);
            } else {
              retArr.push(" {\n");
              this.astGeneric(ifNode.alternate, retArr);
              retArr.push("\n}\n");
            }
          }
          return retArr;
        }
        astSwitchStatement(ast, retArr) {
          const { discriminant, cases } = ast;
          retArr.push("switch (");
          this.astGeneric(discriminant, retArr);
          retArr.push(") {\n");
          for (let i = 0; i < cases.length; i++) {
            if (cases[i].test === null) {
              retArr.push("default:\n");
              this.astGeneric(cases[i].consequent, retArr);
              if (cases[i].consequent && cases[i].consequent.length > 0) {
                retArr.push("break;\n");
              }
              continue;
            }
            retArr.push("case ");
            this.astGeneric(cases[i].test, retArr);
            retArr.push(":\n");
            if (cases[i].consequent && cases[i].consequent.length > 0) {
              this.astGeneric(cases[i].consequent, retArr);
              retArr.push("break;\n");
            }
          }
          retArr.push("\n}");
        }
        astThisExpression(tNode, retArr) {
          retArr.push("_this");
          return retArr;
        }
        astMemberExpression(mNode, retArr) {
          const {
            signature,
            type,
            property,
            xProperty,
            yProperty,
            zProperty,
            name: name2,
            origin
          } = this.getMemberExpressionDetails(mNode);
          switch (signature) {
            case "this.thread.value":
              retArr.push(`_this.thread.${name2}`);
              return retArr;
            case "this.output.value":
              switch (name2) {
                case "x":
                  retArr.push("outputX");
                  break;
                case "y":
                  retArr.push("outputY");
                  break;
                case "z":
                  retArr.push("outputZ");
                  break;
                default:
                  throw this.astErrorOutput("Unexpected expression", mNode);
              }
              return retArr;
            case "value":
              throw this.astErrorOutput("Unexpected expression", mNode);
            case "value[]":
            case "value[][]":
            case "value[][][]":
            case "value.value":
              if (origin === "Math") {
                retArr.push(Math[name2]);
                return retArr;
              }
              switch (property) {
                case "r":
                  retArr.push(`user_${name2}[0]`);
                  return retArr;
                case "g":
                  retArr.push(`user_${name2}[1]`);
                  return retArr;
                case "b":
                  retArr.push(`user_${name2}[2]`);
                  return retArr;
                case "a":
                  retArr.push(`user_${name2}[3]`);
                  return retArr;
              }
              break;
            case "this.constants.value":
            case "this.constants.value[]":
            case "this.constants.value[][]":
            case "this.constants.value[][][]":
              break;
            case "fn()[]":
              this.astGeneric(mNode.object, retArr);
              retArr.push("[");
              this.astGeneric(mNode.property, retArr);
              retArr.push("]");
              return retArr;
            case "fn()[][]":
              this.astGeneric(mNode.object.object, retArr);
              retArr.push("[");
              this.astGeneric(mNode.object.property, retArr);
              retArr.push("]");
              retArr.push("[");
              this.astGeneric(mNode.property, retArr);
              retArr.push("]");
              return retArr;
            default:
              throw this.astErrorOutput("Unexpected expression", mNode);
          }
          if (!mNode.computed) {
            switch (type) {
              case "Number":
              case "Integer":
              case "Float":
              case "Boolean":
                retArr.push(`${origin}_${name2}`);
                return retArr;
            }
          }
          const markupName = `${origin}_${name2}`;
          switch (type) {
            case "Array(2)":
            case "Array(3)":
            case "Array(4)":
            case "Matrix(2)":
            case "Matrix(3)":
            case "Matrix(4)":
            case "HTMLImageArray":
            case "ArrayTexture(1)":
            case "ArrayTexture(2)":
            case "ArrayTexture(3)":
            case "ArrayTexture(4)":
            case "HTMLImage":
            default:
              let size;
              let isInput;
              if (origin === "constants") {
                const constant = this.constants[name2];
                isInput = this.constantTypes[name2] === "Input";
                size = isInput ? constant.size : null;
              } else {
                isInput = this.isInput(name2);
                size = isInput ? this.argumentSizes[this.argumentNames.indexOf(name2)] : null;
              }
              retArr.push(`${markupName}`);
              if (zProperty && yProperty) {
                if (isInput) {
                  retArr.push("[(");
                  this.astGeneric(zProperty, retArr);
                  retArr.push(`*${this.dynamicArguments ? "(outputY * outputX)" : size[1] * size[0]})+(`);
                  this.astGeneric(yProperty, retArr);
                  retArr.push(`*${this.dynamicArguments ? "outputX" : size[0]})+`);
                  this.astGeneric(xProperty, retArr);
                  retArr.push("]");
                } else {
                  retArr.push("[");
                  this.astGeneric(zProperty, retArr);
                  retArr.push("]");
                  retArr.push("[");
                  this.astGeneric(yProperty, retArr);
                  retArr.push("]");
                  retArr.push("[");
                  this.astGeneric(xProperty, retArr);
                  retArr.push("]");
                }
              } else if (yProperty) {
                if (isInput) {
                  retArr.push("[(");
                  this.astGeneric(yProperty, retArr);
                  retArr.push(`*${this.dynamicArguments ? "outputX" : size[0]})+`);
                  this.astGeneric(xProperty, retArr);
                  retArr.push("]");
                } else {
                  retArr.push("[");
                  this.astGeneric(yProperty, retArr);
                  retArr.push("]");
                  retArr.push("[");
                  this.astGeneric(xProperty, retArr);
                  retArr.push("]");
                }
              } else if (typeof xProperty !== "undefined") {
                retArr.push("[");
                this.astGeneric(xProperty, retArr);
                retArr.push("]");
              }
          }
          return retArr;
        }
        astCallExpression(ast, retArr) {
          if (ast.type !== "CallExpression") {
            throw this.astErrorOutput("Unknown CallExpression", ast);
          }
          let functionName = this.astMemberExpressionUnroll(ast.callee);
          if (this.calledFunctions.indexOf(functionName) < 0) {
            this.calledFunctions.push(functionName);
          }
          this.isAstMathFunction(ast);
          if (this.onFunctionCall) {
            this.onFunctionCall(this.name, functionName, ast.arguments);
          }
          retArr.push(functionName);
          retArr.push("(");
          const targetTypes = this.lookupFunctionArgumentTypes(functionName) || [];
          for (let i = 0; i < ast.arguments.length; ++i) {
            const argument = ast.arguments[i];
            let argumentType = this.getType(argument);
            if (!targetTypes[i]) {
              this.triggerImplyArgumentType(functionName, i, argumentType, this);
            }
            if (i > 0) {
              retArr.push(", ");
            }
            this.astGeneric(argument, retArr);
          }
          retArr.push(")");
          return retArr;
        }
        astArrayExpression(arrNode, retArr) {
          const returnType = this.getType(arrNode);
          const arrLen = arrNode.elements.length;
          const elements = [];
          for (let i = 0; i < arrLen; ++i) {
            const element = [];
            this.astGeneric(arrNode.elements[i], element);
            elements.push(element.join(""));
          }
          switch (returnType) {
            case "Matrix(2)":
            case "Matrix(3)":
            case "Matrix(4)":
              retArr.push(`[${elements.join(", ")}]`);
              break;
            default:
              retArr.push(`new Float32Array([${elements.join(", ")}])`);
          }
          return retArr;
        }
        astDebuggerStatement(arrNode, retArr) {
          retArr.push("debugger;");
          return retArr;
        }
      }
      module2.exports = {
        CPUFunctionNode
      };
    }, { "../function-node": 10 }], 7: [function(require2, module2, exports2) {
      const { utils } = require2("../../utils");
      function constantsToString(constants, types) {
        const results = [];
        for (const name2 in types) {
          if (!types.hasOwnProperty(name2))
            continue;
          const type = types[name2];
          const constant = constants[name2];
          switch (type) {
            case "Number":
            case "Integer":
            case "Float":
            case "Boolean":
              results.push(`${name2}:${constant}`);
              break;
            case "Array(2)":
            case "Array(3)":
            case "Array(4)":
            case "Matrix(2)":
            case "Matrix(3)":
            case "Matrix(4)":
              results.push(`${name2}:new ${constant.constructor.name}(${JSON.stringify(Array.from(constant))})`);
              break;
          }
        }
        return `{ ${results.join()} }`;
      }
      function cpuKernelString(cpuKernel, name2) {
        const header = [];
        const thisProperties = [];
        const beforeReturn = [];
        const useFunctionKeyword = !/^function/.test(cpuKernel.color.toString());
        header.push("  const { context, canvas, constants: incomingConstants } = settings;", `  const output = new Int32Array(${JSON.stringify(Array.from(cpuKernel.output))});`, `  const _constantTypes = ${JSON.stringify(cpuKernel.constantTypes)};`, `  const _constants = ${constantsToString(cpuKernel.constants, cpuKernel.constantTypes)};`);
        thisProperties.push("    constants: _constants,", "    context,", "    output,", "    thread: {x: 0, y: 0, z: 0},");
        if (cpuKernel.graphical) {
          header.push(`  const _imageData = context.createImageData(${cpuKernel.output[0]}, ${cpuKernel.output[1]});`);
          header.push(`  const _colorData = new Uint8ClampedArray(${cpuKernel.output[0]} * ${cpuKernel.output[1]} * 4);`);
          const colorFn = utils.flattenFunctionToString((useFunctionKeyword ? "function " : "") + cpuKernel.color.toString(), {
            thisLookup: (propertyName) => {
              switch (propertyName) {
                case "_colorData":
                  return "_colorData";
                case "_imageData":
                  return "_imageData";
                case "output":
                  return "output";
                case "thread":
                  return "this.thread";
              }
              return JSON.stringify(cpuKernel[propertyName]);
            },
            findDependency: (object, name3) => {
              return null;
            }
          });
          const getPixelsFn = utils.flattenFunctionToString((useFunctionKeyword ? "function " : "") + cpuKernel.getPixels.toString(), {
            thisLookup: (propertyName) => {
              switch (propertyName) {
                case "_colorData":
                  return "_colorData";
                case "_imageData":
                  return "_imageData";
                case "output":
                  return "output";
                case "thread":
                  return "this.thread";
              }
              return JSON.stringify(cpuKernel[propertyName]);
            },
            findDependency: () => {
              return null;
            }
          });
          thisProperties.push("    _imageData,", "    _colorData,", `    color: ${colorFn},`);
          beforeReturn.push(`  kernel.getPixels = ${getPixelsFn};`);
        }
        const constantTypes = [];
        const constantKeys = Object.keys(cpuKernel.constantTypes);
        for (let i = 0; i < constantKeys.length; i++) {
          constantTypes.push(cpuKernel.constantTypes[constantKeys]);
        }
        if (cpuKernel.argumentTypes.indexOf("HTMLImageArray") !== -1 || constantTypes.indexOf("HTMLImageArray") !== -1) {
          const flattenedImageTo3DArray = utils.flattenFunctionToString((useFunctionKeyword ? "function " : "") + cpuKernel._imageTo3DArray.toString(), {
            doNotDefine: ["canvas"],
            findDependency: (object, name3) => {
              if (object === "this") {
                return (useFunctionKeyword ? "function " : "") + cpuKernel[name3].toString();
              }
              return null;
            },
            thisLookup: (propertyName) => {
              switch (propertyName) {
                case "canvas":
                  return;
                case "context":
                  return "context";
              }
            }
          });
          beforeReturn.push(flattenedImageTo3DArray);
          thisProperties.push(`    _mediaTo2DArray,`);
          thisProperties.push(`    _imageTo3DArray,`);
        } else if (cpuKernel.argumentTypes.indexOf("HTMLImage") !== -1 || constantTypes.indexOf("HTMLImage") !== -1) {
          const flattenedImageTo2DArray = utils.flattenFunctionToString((useFunctionKeyword ? "function " : "") + cpuKernel._mediaTo2DArray.toString(), {
            findDependency: (object, name3) => {
              return null;
            },
            thisLookup: (propertyName) => {
              switch (propertyName) {
                case "canvas":
                  return "settings.canvas";
                case "context":
                  return "settings.context";
              }
              throw new Error("unhandled thisLookup");
            }
          });
          beforeReturn.push(flattenedImageTo2DArray);
          thisProperties.push(`    _mediaTo2DArray,`);
        }
        return `function(settings) {
${header.join("\n")}
  for (const p in _constantTypes) {
    if (!_constantTypes.hasOwnProperty(p)) continue;
    const type = _constantTypes[p];
    switch (type) {
      case 'Number':
      case 'Integer':
      case 'Float':
      case 'Boolean':
      case 'Array(2)':
      case 'Array(3)':
      case 'Array(4)':
      case 'Matrix(2)':
      case 'Matrix(3)':
      case 'Matrix(4)':
        if (incomingConstants.hasOwnProperty(p)) {
          console.warn('constant ' + p + ' of type ' + type + ' cannot be resigned');
        }
        continue;
    }
    if (!incomingConstants.hasOwnProperty(p)) {
      throw new Error('constant ' + p + ' not found');
    }
    _constants[p] = incomingConstants[p];
  }
  const kernel = (function() {
${cpuKernel._kernelString}
  })
    .apply({ ${thisProperties.join("\n")} });
  ${beforeReturn.join("\n")}
  return kernel;
}`;
      }
      module2.exports = {
        cpuKernelString
      };
    }, { "../../utils": 114 }], 8: [function(require2, module2, exports2) {
      const { Kernel } = require2("../kernel");
      const { FunctionBuilder } = require2("../function-builder");
      const { CPUFunctionNode } = require2("./function-node");
      const { utils } = require2("../../utils");
      const { cpuKernelString } = require2("./kernel-string");
      class CPUKernel extends Kernel {
        static getFeatures() {
          return this.features;
        }
        static get features() {
          return Object.freeze({
            kernelMap: true,
            isIntegerDivisionAccurate: true
          });
        }
        static get isSupported() {
          return true;
        }
        static isContextMatch(context) {
          return false;
        }
        static get mode() {
          return "cpu";
        }
        static nativeFunctionArguments() {
          return null;
        }
        static nativeFunctionReturnType() {
          throw new Error(`Looking up native function return type not supported on ${this.name}`);
        }
        static combineKernels(combinedKernel) {
          return combinedKernel;
        }
        static getSignature(kernel, argumentTypes) {
          return "cpu" + (argumentTypes.length > 0 ? ":" + argumentTypes.join(",") : "");
        }
        constructor(source, settings) {
          super(source, settings);
          this.mergeSettings(source.settings || settings);
          this._imageData = null;
          this._colorData = null;
          this._kernelString = null;
          this._prependedString = [];
          this.thread = {
            x: 0,
            y: 0,
            z: 0
          };
          this.translatedSources = null;
        }
        initCanvas() {
          if (typeof document !== "undefined") {
            return document.createElement("canvas");
          } else if (typeof OffscreenCanvas !== "undefined") {
            return new OffscreenCanvas(0, 0);
          }
        }
        initContext() {
          if (!this.canvas)
            return null;
          return this.canvas.getContext("2d");
        }
        initPlugins(settings) {
          return [];
        }
        validateSettings(args) {
          if (!this.output || this.output.length === 0) {
            if (args.length !== 1) {
              throw new Error("Auto output only supported for kernels with only one input");
            }
            const argType = utils.getVariableType(args[0], this.strictIntegers);
            if (argType === "Array") {
              this.output = utils.getDimensions(argType);
            } else if (argType === "NumberTexture" || argType === "ArrayTexture(4)") {
              this.output = args[0].output;
            } else {
              throw new Error("Auto output not supported for input type: " + argType);
            }
          }
          if (this.graphical) {
            if (this.output.length !== 2) {
              throw new Error("Output must have 2 dimensions on graphical mode");
            }
          }
          this.checkOutput();
        }
        translateSource() {
          this.leadingReturnStatement = this.output.length > 1 ? "resultX[x] = " : "result[x] = ";
          if (this.subKernels) {
            const followingReturnStatement = [];
            for (let i = 0; i < this.subKernels.length; i++) {
              const {
                name: name2
              } = this.subKernels[i];
              followingReturnStatement.push(this.output.length > 1 ? `resultX_${name2}[x] = subKernelResult_${name2};
` : `result_${name2}[x] = subKernelResult_${name2};
`);
            }
            this.followingReturnStatement = followingReturnStatement.join("");
          }
          const functionBuilder = FunctionBuilder.fromKernel(this, CPUFunctionNode);
          this.translatedSources = functionBuilder.getPrototypes("kernel");
          if (!this.graphical && !this.returnType) {
            this.returnType = functionBuilder.getKernelResultType();
          }
        }
        build() {
          if (this.built)
            return;
          this.setupConstants();
          this.setupArguments(arguments);
          this.validateSettings(arguments);
          this.translateSource();
          if (this.graphical) {
            const {
              canvas,
              output
            } = this;
            if (!canvas) {
              throw new Error("no canvas available for using graphical output");
            }
            const width = output[0];
            const height = output[1] || 1;
            canvas.width = width;
            canvas.height = height;
            this._imageData = this.context.createImageData(width, height);
            this._colorData = new Uint8ClampedArray(width * height * 4);
          }
          const kernelString = this.getKernelString();
          this.kernelString = kernelString;
          if (this.debug) {
            console.log("Function output:");
            console.log(kernelString);
          }
          try {
            this.run = new Function([], kernelString).bind(this)();
          } catch (e) {
            console.error("An error occurred compiling the javascript: ", e);
          }
          this.buildSignature(arguments);
          this.built = true;
        }
        color(r, g, b, a) {
          if (typeof a === "undefined") {
            a = 1;
          }
          r = Math.floor(r * 255);
          g = Math.floor(g * 255);
          b = Math.floor(b * 255);
          a = Math.floor(a * 255);
          const width = this.output[0];
          const height = this.output[1];
          const x = this.thread.x;
          const y = height - this.thread.y - 1;
          const index2 = x + y * width;
          this._colorData[index2 * 4 + 0] = r;
          this._colorData[index2 * 4 + 1] = g;
          this._colorData[index2 * 4 + 2] = b;
          this._colorData[index2 * 4 + 3] = a;
        }
        getKernelString() {
          if (this._kernelString !== null)
            return this._kernelString;
          let kernelThreadString = null;
          let {
            translatedSources
          } = this;
          if (translatedSources.length > 1) {
            translatedSources = translatedSources.filter((fn) => {
              if (/^function/.test(fn))
                return fn;
              kernelThreadString = fn;
              return false;
            });
          } else {
            kernelThreadString = translatedSources.shift();
          }
          return this._kernelString = `  const LOOP_MAX = ${this._getLoopMaxString()};
  ${this.injectedNative || ""}
  const _this = this;
  ${this._resultKernelHeader()}
  ${this._processConstants()}
  return (${this.argumentNames.map((argumentName) => "user_" + argumentName).join(", ")}) => {
    ${this._prependedString.join("")}
    ${this._earlyThrows()}
    ${this._processArguments()}
    ${this.graphical ? this._graphicalKernelBody(kernelThreadString) : this._resultKernelBody(kernelThreadString)}
    ${translatedSources.length > 0 ? translatedSources.join("\n") : ""}
  };`;
        }
        toString() {
          return cpuKernelString(this);
        }
        _getLoopMaxString() {
          return this.loopMaxIterations ? ` ${parseInt(this.loopMaxIterations)};` : " 1000;";
        }
        _processConstants() {
          if (!this.constants)
            return "";
          const result = [];
          for (let p2 in this.constants) {
            const type = this.constantTypes[p2];
            switch (type) {
              case "HTMLCanvas":
              case "OffscreenCanvas":
              case "HTMLImage":
              case "ImageBitmap":
              case "ImageData":
              case "HTMLVideo":
                result.push(`    const constants_${p2} = this._mediaTo2DArray(this.constants.${p2});
`);
                break;
              case "HTMLImageArray":
                result.push(`    const constants_${p2} = this._imageTo3DArray(this.constants.${p2});
`);
                break;
              case "Input":
                result.push(`    const constants_${p2} = this.constants.${p2}.value;
`);
                break;
              default:
                result.push(`    const constants_${p2} = this.constants.${p2};
`);
            }
          }
          return result.join("");
        }
        _earlyThrows() {
          if (this.graphical)
            return "";
          if (this.immutable)
            return "";
          if (!this.pipeline)
            return "";
          const arrayArguments = [];
          for (let i = 0; i < this.argumentTypes.length; i++) {
            if (this.argumentTypes[i] === "Array") {
              arrayArguments.push(this.argumentNames[i]);
            }
          }
          if (arrayArguments.length === 0)
            return "";
          const checks = [];
          for (let i = 0; i < arrayArguments.length; i++) {
            const argumentName = arrayArguments[i];
            const checkSubKernels = this._mapSubKernels((subKernel) => `user_${argumentName} === result_${subKernel.name}`).join(" || ");
            checks.push(`user_${argumentName} === result${checkSubKernels ? ` || ${checkSubKernels}` : ""}`);
          }
          return `if (${checks.join(" || ")}) throw new Error('Source and destination arrays are the same.  Use immutable = true');`;
        }
        _processArguments() {
          const result = [];
          for (let i = 0; i < this.argumentTypes.length; i++) {
            const variableName = `user_${this.argumentNames[i]}`;
            switch (this.argumentTypes[i]) {
              case "HTMLCanvas":
              case "OffscreenCanvas":
              case "HTMLImage":
              case "ImageBitmap":
              case "ImageData":
              case "HTMLVideo":
                result.push(`    ${variableName} = this._mediaTo2DArray(${variableName});
`);
                break;
              case "HTMLImageArray":
                result.push(`    ${variableName} = this._imageTo3DArray(${variableName});
`);
                break;
              case "Input":
                result.push(`    ${variableName} = ${variableName}.value;
`);
                break;
              case "ArrayTexture(1)":
              case "ArrayTexture(2)":
              case "ArrayTexture(3)":
              case "ArrayTexture(4)":
              case "NumberTexture":
              case "MemoryOptimizedNumberTexture":
                result.push(`
    if (${variableName}.toArray) {
      if (!_this.textureCache) {
        _this.textureCache = [];
        _this.arrayCache = [];
      }
      const textureIndex = _this.textureCache.indexOf(${variableName});
      if (textureIndex !== -1) {
        ${variableName} = _this.arrayCache[textureIndex];
      } else {
        _this.textureCache.push(${variableName});
        ${variableName} = ${variableName}.toArray();
        _this.arrayCache.push(${variableName});
      }
    }`);
                break;
            }
          }
          return result.join("");
        }
        _mediaTo2DArray(media) {
          const canvas = this.canvas;
          const width = media.width > 0 ? media.width : media.videoWidth;
          const height = media.height > 0 ? media.height : media.videoHeight;
          if (canvas.width < width) {
            canvas.width = width;
          }
          if (canvas.height < height) {
            canvas.height = height;
          }
          const ctx2 = this.context;
          let pixelsData;
          if (media.constructor === ImageData) {
            pixelsData = media.data;
          } else {
            ctx2.drawImage(media, 0, 0, width, height);
            pixelsData = ctx2.getImageData(0, 0, width, height).data;
          }
          const imageArray = new Array(height);
          let index2 = 0;
          for (let y = height - 1; y >= 0; y--) {
            const row = imageArray[y] = new Array(width);
            for (let x = 0; x < width; x++) {
              const pixel = new Float32Array(4);
              pixel[0] = pixelsData[index2++] / 255;
              pixel[1] = pixelsData[index2++] / 255;
              pixel[2] = pixelsData[index2++] / 255;
              pixel[3] = pixelsData[index2++] / 255;
              row[x] = pixel;
            }
          }
          return imageArray;
        }
        getPixels(flip) {
          const [width, height] = this.output;
          return flip ? utils.flipPixels(this._imageData.data, width, height) : this._imageData.data.slice(0);
        }
        _imageTo3DArray(images) {
          const imagesArray = new Array(images.length);
          for (let i = 0; i < images.length; i++) {
            imagesArray[i] = this._mediaTo2DArray(images[i]);
          }
          return imagesArray;
        }
        _resultKernelHeader() {
          if (this.graphical)
            return "";
          if (this.immutable)
            return "";
          if (!this.pipeline)
            return "";
          switch (this.output.length) {
            case 1:
              return this._mutableKernel1DResults();
            case 2:
              return this._mutableKernel2DResults();
            case 3:
              return this._mutableKernel3DResults();
          }
        }
        _resultKernelBody(kernelString) {
          switch (this.output.length) {
            case 1:
              return (!this.immutable && this.pipeline ? this._resultMutableKernel1DLoop(kernelString) : this._resultImmutableKernel1DLoop(kernelString)) + this._kernelOutput();
            case 2:
              return (!this.immutable && this.pipeline ? this._resultMutableKernel2DLoop(kernelString) : this._resultImmutableKernel2DLoop(kernelString)) + this._kernelOutput();
            case 3:
              return (!this.immutable && this.pipeline ? this._resultMutableKernel3DLoop(kernelString) : this._resultImmutableKernel3DLoop(kernelString)) + this._kernelOutput();
            default:
              throw new Error("unsupported size kernel");
          }
        }
        _graphicalKernelBody(kernelThreadString) {
          switch (this.output.length) {
            case 2:
              return this._graphicalKernel2DLoop(kernelThreadString) + this._graphicalOutput();
            default:
              throw new Error("unsupported size kernel");
          }
        }
        _graphicalOutput() {
          return `
    this._imageData.data.set(this._colorData);
    this.context.putImageData(this._imageData, 0, 0);
    return;`;
        }
        _getKernelResultTypeConstructorString() {
          switch (this.returnType) {
            case "LiteralInteger":
            case "Number":
            case "Integer":
            case "Float":
              return "Float32Array";
            case "Array(2)":
            case "Array(3)":
            case "Array(4)":
              return "Array";
            default:
              if (this.graphical) {
                return "Float32Array";
              }
              throw new Error(`unhandled returnType ${this.returnType}`);
          }
        }
        _resultImmutableKernel1DLoop(kernelString) {
          const constructorString = this._getKernelResultTypeConstructorString();
          return `  const outputX = _this.output[0];
    const result = new ${constructorString}(outputX);
    ${this._mapSubKernels((subKernel) => `const result_${subKernel.name} = new ${constructorString}(outputX);
`).join("    ")}
    ${this._mapSubKernels((subKernel) => `let subKernelResult_${subKernel.name};
`).join("    ")}
    for (let x = 0; x < outputX; x++) {
      this.thread.x = x;
      this.thread.y = 0;
      this.thread.z = 0;
      ${kernelString}
    }`;
        }
        _mutableKernel1DResults() {
          const constructorString = this._getKernelResultTypeConstructorString();
          return `  const outputX = _this.output[0];
    const result = new ${constructorString}(outputX);
    ${this._mapSubKernels((subKernel) => `const result_${subKernel.name} = new ${constructorString}(outputX);
`).join("    ")}
    ${this._mapSubKernels((subKernel) => `let subKernelResult_${subKernel.name};
`).join("    ")}`;
        }
        _resultMutableKernel1DLoop(kernelString) {
          return `  const outputX = _this.output[0];
    for (let x = 0; x < outputX; x++) {
      this.thread.x = x;
      this.thread.y = 0;
      this.thread.z = 0;
      ${kernelString}
    }`;
        }
        _resultImmutableKernel2DLoop(kernelString) {
          const constructorString = this._getKernelResultTypeConstructorString();
          return `  const outputX = _this.output[0];
    const outputY = _this.output[1];
    const result = new Array(outputY);
    ${this._mapSubKernels((subKernel) => `const result_${subKernel.name} = new Array(outputY);
`).join("    ")}
    ${this._mapSubKernels((subKernel) => `let subKernelResult_${subKernel.name};
`).join("    ")}
    for (let y = 0; y < outputY; y++) {
      this.thread.z = 0;
      this.thread.y = y;
      const resultX = result[y] = new ${constructorString}(outputX);
      ${this._mapSubKernels((subKernel) => `const resultX_${subKernel.name} = result_${subKernel.name}[y] = new ${constructorString}(outputX);
`).join("")}
      for (let x = 0; x < outputX; x++) {
        this.thread.x = x;
        ${kernelString}
      }
    }`;
        }
        _mutableKernel2DResults() {
          const constructorString = this._getKernelResultTypeConstructorString();
          return `  const outputX = _this.output[0];
    const outputY = _this.output[1];
    const result = new Array(outputY);
    ${this._mapSubKernels((subKernel) => `const result_${subKernel.name} = new Array(outputY);
`).join("    ")}
    ${this._mapSubKernels((subKernel) => `let subKernelResult_${subKernel.name};
`).join("    ")}
    for (let y = 0; y < outputY; y++) {
      const resultX = result[y] = new ${constructorString}(outputX);
      ${this._mapSubKernels((subKernel) => `const resultX_${subKernel.name} = result_${subKernel.name}[y] = new ${constructorString}(outputX);
`).join("")}
    }`;
        }
        _resultMutableKernel2DLoop(kernelString) {
          const constructorString = this._getKernelResultTypeConstructorString();
          return `  const outputX = _this.output[0];
    const outputY = _this.output[1];
    for (let y = 0; y < outputY; y++) {
      this.thread.z = 0;
      this.thread.y = y;
      const resultX = result[y];
      ${this._mapSubKernels((subKernel) => `const resultX_${subKernel.name} = result_${subKernel.name}[y] = new ${constructorString}(outputX);
`).join("")}
      for (let x = 0; x < outputX; x++) {
        this.thread.x = x;
        ${kernelString}
      }
    }`;
        }
        _graphicalKernel2DLoop(kernelString) {
          return `  const outputX = _this.output[0];
    const outputY = _this.output[1];
    for (let y = 0; y < outputY; y++) {
      this.thread.z = 0;
      this.thread.y = y;
      for (let x = 0; x < outputX; x++) {
        this.thread.x = x;
        ${kernelString}
      }
    }`;
        }
        _resultImmutableKernel3DLoop(kernelString) {
          const constructorString = this._getKernelResultTypeConstructorString();
          return `  const outputX = _this.output[0];
    const outputY = _this.output[1];
    const outputZ = _this.output[2];
    const result = new Array(outputZ);
    ${this._mapSubKernels((subKernel) => `const result_${subKernel.name} = new Array(outputZ);
`).join("    ")}
    ${this._mapSubKernels((subKernel) => `let subKernelResult_${subKernel.name};
`).join("    ")}
    for (let z = 0; z < outputZ; z++) {
      this.thread.z = z;
      const resultY = result[z] = new Array(outputY);
      ${this._mapSubKernels((subKernel) => `const resultY_${subKernel.name} = result_${subKernel.name}[z] = new Array(outputY);
`).join("      ")}
      for (let y = 0; y < outputY; y++) {
        this.thread.y = y;
        const resultX = resultY[y] = new ${constructorString}(outputX);
        ${this._mapSubKernels((subKernel) => `const resultX_${subKernel.name} = resultY_${subKernel.name}[y] = new ${constructorString}(outputX);
`).join("        ")}
        for (let x = 0; x < outputX; x++) {
          this.thread.x = x;
          ${kernelString}
        }
      }
    }`;
        }
        _mutableKernel3DResults() {
          const constructorString = this._getKernelResultTypeConstructorString();
          return `  const outputX = _this.output[0];
    const outputY = _this.output[1];
    const outputZ = _this.output[2];
    const result = new Array(outputZ);
    ${this._mapSubKernels((subKernel) => `const result_${subKernel.name} = new Array(outputZ);
`).join("    ")}
    ${this._mapSubKernels((subKernel) => `let subKernelResult_${subKernel.name};
`).join("    ")}
    for (let z = 0; z < outputZ; z++) {
      const resultY = result[z] = new Array(outputY);
      ${this._mapSubKernels((subKernel) => `const resultY_${subKernel.name} = result_${subKernel.name}[z] = new Array(outputY);
`).join("      ")}
      for (let y = 0; y < outputY; y++) {
        const resultX = resultY[y] = new ${constructorString}(outputX);
        ${this._mapSubKernels((subKernel) => `const resultX_${subKernel.name} = resultY_${subKernel.name}[y] = new ${constructorString}(outputX);
`).join("        ")}
      }
    }`;
        }
        _resultMutableKernel3DLoop(kernelString) {
          return `  const outputX = _this.output[0];
    const outputY = _this.output[1];
    const outputZ = _this.output[2];
    for (let z = 0; z < outputZ; z++) {
      this.thread.z = z;
      const resultY = result[z];
      for (let y = 0; y < outputY; y++) {
        this.thread.y = y;
        const resultX = resultY[y];
        for (let x = 0; x < outputX; x++) {
          this.thread.x = x;
          ${kernelString}
        }
      }
    }`;
        }
        _kernelOutput() {
          if (!this.subKernels) {
            return "\n    return result;";
          }
          return `
    return {
      result: result,
      ${this.subKernels.map((subKernel) => `${subKernel.property}: result_${subKernel.name}`).join(",\n      ")}
    };`;
        }
        _mapSubKernels(fn) {
          return this.subKernels === null ? [""] : this.subKernels.map(fn);
        }
        destroy(removeCanvasReference) {
          if (removeCanvasReference) {
            delete this.canvas;
          }
        }
        static destroyContext(context) {
        }
        toJSON() {
          const json = super.toJSON();
          json.functionNodes = FunctionBuilder.fromKernel(this, CPUFunctionNode).toJSON();
          return json;
        }
        setOutput(output) {
          super.setOutput(output);
          const [width, height] = this.output;
          if (this.graphical) {
            this._imageData = this.context.createImageData(width, height);
            this._colorData = new Uint8ClampedArray(width * height * 4);
          }
        }
        prependString(value2) {
          if (this._kernelString)
            throw new Error("Kernel already built");
          this._prependedString.push(value2);
        }
        hasPrependString(value2) {
          return this._prependedString.indexOf(value2) > -1;
        }
      }
      module2.exports = {
        CPUKernel
      };
    }, { "../../utils": 114, "../function-builder": 9, "../kernel": 36, "./function-node": 6, "./kernel-string": 7 }], 9: [function(require2, module2, exports2) {
      class FunctionBuilder {
        static fromKernel(kernel, FunctionNode, extraNodeOptions) {
          const {
            kernelArguments,
            kernelConstants,
            argumentNames,
            argumentSizes,
            argumentBitRatios,
            constants,
            constantBitRatios,
            debug,
            loopMaxIterations,
            nativeFunctions,
            output,
            optimizeFloatMemory,
            precision,
            plugins,
            source,
            subKernels,
            functions,
            leadingReturnStatement,
            followingReturnStatement,
            dynamicArguments,
            dynamicOutput
          } = kernel;
          const argumentTypes = new Array(kernelArguments.length);
          const constantTypes = {};
          for (let i = 0; i < kernelArguments.length; i++) {
            argumentTypes[i] = kernelArguments[i].type;
          }
          for (let i = 0; i < kernelConstants.length; i++) {
            const kernelConstant = kernelConstants[i];
            constantTypes[kernelConstant.name] = kernelConstant.type;
          }
          const needsArgumentType = (functionName, index2) => {
            return functionBuilder.needsArgumentType(functionName, index2);
          };
          const assignArgumentType = (functionName, index2, type) => {
            functionBuilder.assignArgumentType(functionName, index2, type);
          };
          const lookupReturnType = (functionName, ast, requestingNode) => {
            return functionBuilder.lookupReturnType(functionName, ast, requestingNode);
          };
          const lookupFunctionArgumentTypes = (functionName) => {
            return functionBuilder.lookupFunctionArgumentTypes(functionName);
          };
          const lookupFunctionArgumentName = (functionName, argumentIndex) => {
            return functionBuilder.lookupFunctionArgumentName(functionName, argumentIndex);
          };
          const lookupFunctionArgumentBitRatio = (functionName, argumentName) => {
            return functionBuilder.lookupFunctionArgumentBitRatio(functionName, argumentName);
          };
          const triggerImplyArgumentType = (functionName, i, argumentType, requestingNode) => {
            functionBuilder.assignArgumentType(functionName, i, argumentType, requestingNode);
          };
          const triggerImplyArgumentBitRatio = (functionName, argumentName, calleeFunctionName, argumentIndex) => {
            functionBuilder.assignArgumentBitRatio(functionName, argumentName, calleeFunctionName, argumentIndex);
          };
          const onFunctionCall = (functionName, calleeFunctionName, args) => {
            functionBuilder.trackFunctionCall(functionName, calleeFunctionName, args);
          };
          const onNestedFunction = (ast, source2) => {
            const argumentNames2 = [];
            for (let i = 0; i < ast.params.length; i++) {
              argumentNames2.push(ast.params[i].name);
            }
            const nestedFunction = new FunctionNode(source2, Object.assign({}, nodeOptions, {
              returnType: null,
              ast,
              name: ast.id.name,
              argumentNames: argumentNames2,
              lookupReturnType,
              lookupFunctionArgumentTypes,
              lookupFunctionArgumentName,
              lookupFunctionArgumentBitRatio,
              needsArgumentType,
              assignArgumentType,
              triggerImplyArgumentType,
              triggerImplyArgumentBitRatio,
              onFunctionCall
            }));
            nestedFunction.traceFunctionAST(ast);
            functionBuilder.addFunctionNode(nestedFunction);
          };
          const nodeOptions = Object.assign({
            isRootKernel: false,
            onNestedFunction,
            lookupReturnType,
            lookupFunctionArgumentTypes,
            lookupFunctionArgumentName,
            lookupFunctionArgumentBitRatio,
            needsArgumentType,
            assignArgumentType,
            triggerImplyArgumentType,
            triggerImplyArgumentBitRatio,
            onFunctionCall,
            optimizeFloatMemory,
            precision,
            constants,
            constantTypes,
            constantBitRatios,
            debug,
            loopMaxIterations,
            output,
            plugins,
            dynamicArguments,
            dynamicOutput
          }, extraNodeOptions || {});
          const rootNodeOptions = Object.assign({}, nodeOptions, {
            isRootKernel: true,
            name: "kernel",
            argumentNames,
            argumentTypes,
            argumentSizes,
            argumentBitRatios,
            leadingReturnStatement,
            followingReturnStatement
          });
          if (typeof source === "object" && source.functionNodes) {
            return new FunctionBuilder().fromJSON(source.functionNodes, FunctionNode);
          }
          const rootNode = new FunctionNode(source, rootNodeOptions);
          let functionNodes = null;
          if (functions) {
            functionNodes = functions.map((fn) => new FunctionNode(fn.source, {
              returnType: fn.returnType,
              argumentTypes: fn.argumentTypes,
              output,
              plugins,
              constants,
              constantTypes,
              constantBitRatios,
              optimizeFloatMemory,
              precision,
              lookupReturnType,
              lookupFunctionArgumentTypes,
              lookupFunctionArgumentName,
              lookupFunctionArgumentBitRatio,
              needsArgumentType,
              assignArgumentType,
              triggerImplyArgumentType,
              triggerImplyArgumentBitRatio,
              onFunctionCall,
              onNestedFunction
            }));
          }
          let subKernelNodes = null;
          if (subKernels) {
            subKernelNodes = subKernels.map((subKernel) => {
              const { name: name2, source: source2 } = subKernel;
              return new FunctionNode(source2, Object.assign({}, nodeOptions, {
                name: name2,
                isSubKernel: true,
                isRootKernel: false
              }));
            });
          }
          const functionBuilder = new FunctionBuilder({
            kernel,
            rootNode,
            functionNodes,
            nativeFunctions,
            subKernelNodes
          });
          return functionBuilder;
        }
        constructor(settings) {
          settings = settings || {};
          this.kernel = settings.kernel;
          this.rootNode = settings.rootNode;
          this.functionNodes = settings.functionNodes || [];
          this.subKernelNodes = settings.subKernelNodes || [];
          this.nativeFunctions = settings.nativeFunctions || [];
          this.functionMap = {};
          this.nativeFunctionNames = [];
          this.lookupChain = [];
          this.functionNodeDependencies = {};
          this.functionCalls = {};
          if (this.rootNode) {
            this.functionMap["kernel"] = this.rootNode;
          }
          if (this.functionNodes) {
            for (let i = 0; i < this.functionNodes.length; i++) {
              this.functionMap[this.functionNodes[i].name] = this.functionNodes[i];
            }
          }
          if (this.subKernelNodes) {
            for (let i = 0; i < this.subKernelNodes.length; i++) {
              this.functionMap[this.subKernelNodes[i].name] = this.subKernelNodes[i];
            }
          }
          if (this.nativeFunctions) {
            for (let i = 0; i < this.nativeFunctions.length; i++) {
              const nativeFunction = this.nativeFunctions[i];
              this.nativeFunctionNames.push(nativeFunction.name);
            }
          }
        }
        addFunctionNode(functionNode) {
          if (!functionNode.name)
            throw new Error("functionNode.name needs set");
          this.functionMap[functionNode.name] = functionNode;
          if (functionNode.isRootKernel) {
            this.rootNode = functionNode;
          }
        }
        traceFunctionCalls(functionName, retList) {
          functionName = functionName || "kernel";
          retList = retList || [];
          if (this.nativeFunctionNames.indexOf(functionName) > -1) {
            const nativeFunctionIndex = retList.indexOf(functionName);
            if (nativeFunctionIndex === -1) {
              retList.push(functionName);
            } else {
              const dependantNativeFunctionName = retList.splice(nativeFunctionIndex, 1)[0];
              retList.push(dependantNativeFunctionName);
            }
            return retList;
          }
          const functionNode = this.functionMap[functionName];
          if (functionNode) {
            const functionIndex = retList.indexOf(functionName);
            if (functionIndex === -1) {
              retList.push(functionName);
              functionNode.toString();
              for (let i = 0; i < functionNode.calledFunctions.length; ++i) {
                this.traceFunctionCalls(functionNode.calledFunctions[i], retList);
              }
            } else {
              const dependantFunctionName = retList.splice(functionIndex, 1)[0];
              retList.push(dependantFunctionName);
            }
          }
          return retList;
        }
        getPrototypeString(functionName) {
          return this.getPrototypes(functionName).join("\n");
        }
        getPrototypes(functionName) {
          if (this.rootNode) {
            this.rootNode.toString();
          }
          if (functionName) {
            return this.getPrototypesFromFunctionNames(this.traceFunctionCalls(functionName, []).reverse());
          }
          return this.getPrototypesFromFunctionNames(Object.keys(this.functionMap));
        }
        getStringFromFunctionNames(functionList) {
          const ret = [];
          for (let i = 0; i < functionList.length; ++i) {
            const node = this.functionMap[functionList[i]];
            if (node) {
              ret.push(this.functionMap[functionList[i]].toString());
            }
          }
          return ret.join("\n");
        }
        getPrototypesFromFunctionNames(functionList) {
          const ret = [];
          for (let i = 0; i < functionList.length; ++i) {
            const functionName = functionList[i];
            const functionIndex = this.nativeFunctionNames.indexOf(functionName);
            if (functionIndex > -1) {
              ret.push(this.nativeFunctions[functionIndex].source);
              continue;
            }
            const node = this.functionMap[functionName];
            if (node) {
              ret.push(node.toString());
            }
          }
          return ret;
        }
        toJSON() {
          return this.traceFunctionCalls(this.rootNode.name).reverse().map((name2) => {
            const nativeIndex = this.nativeFunctions.indexOf(name2);
            if (nativeIndex > -1) {
              return {
                name: name2,
                source: this.nativeFunctions[nativeIndex].source
              };
            } else if (this.functionMap[name2]) {
              return this.functionMap[name2].toJSON();
            } else {
              throw new Error(`function ${name2} not found`);
            }
          });
        }
        fromJSON(jsonFunctionNodes, FunctionNode) {
          this.functionMap = {};
          for (let i = 0; i < jsonFunctionNodes.length; i++) {
            const jsonFunctionNode = jsonFunctionNodes[i];
            this.functionMap[jsonFunctionNode.settings.name] = new FunctionNode(jsonFunctionNode.ast, jsonFunctionNode.settings);
          }
          return this;
        }
        getString(functionName) {
          if (functionName) {
            return this.getStringFromFunctionNames(this.traceFunctionCalls(functionName).reverse());
          }
          return this.getStringFromFunctionNames(Object.keys(this.functionMap));
        }
        lookupReturnType(functionName, ast, requestingNode) {
          if (ast.type !== "CallExpression") {
            throw new Error(`expected ast type of "CallExpression", but is ${ast.type}`);
          }
          if (this._isNativeFunction(functionName)) {
            return this._lookupNativeFunctionReturnType(functionName);
          } else if (this._isFunction(functionName)) {
            const node = this._getFunction(functionName);
            if (node.returnType) {
              return node.returnType;
            } else {
              for (let i = 0; i < this.lookupChain.length; i++) {
                if (this.lookupChain[i].ast === ast) {
                  if (node.argumentTypes.length === 0 && ast.arguments.length > 0) {
                    const args = ast.arguments;
                    for (let j = 0; j < args.length; j++) {
                      this.lookupChain.push({
                        name: requestingNode.name,
                        ast: args[i],
                        requestingNode
                      });
                      node.argumentTypes[j] = requestingNode.getType(args[j]);
                      this.lookupChain.pop();
                    }
                    return node.returnType = node.getType(node.getJsAST());
                  }
                  throw new Error("circlical logic detected!");
                }
              }
              this.lookupChain.push({
                name: requestingNode.name,
                ast,
                requestingNode
              });
              const type = node.getType(node.getJsAST());
              this.lookupChain.pop();
              return node.returnType = type;
            }
          }
          return null;
        }
        _getFunction(functionName) {
          if (!this._isFunction(functionName))
            ;
          return this.functionMap[functionName];
        }
        _isFunction(functionName) {
          return Boolean(this.functionMap[functionName]);
        }
        _getNativeFunction(functionName) {
          for (let i = 0; i < this.nativeFunctions.length; i++) {
            if (this.nativeFunctions[i].name === functionName)
              return this.nativeFunctions[i];
          }
          return null;
        }
        _isNativeFunction(functionName) {
          return Boolean(this._getNativeFunction(functionName));
        }
        _lookupNativeFunctionReturnType(functionName) {
          let nativeFunction = this._getNativeFunction(functionName);
          if (nativeFunction) {
            return nativeFunction.returnType;
          }
          throw new Error(`Native function ${functionName} not found`);
        }
        lookupFunctionArgumentTypes(functionName) {
          if (this._isNativeFunction(functionName)) {
            return this._getNativeFunction(functionName).argumentTypes;
          } else if (this._isFunction(functionName)) {
            return this._getFunction(functionName).argumentTypes;
          }
          return null;
        }
        lookupFunctionArgumentName(functionName, argumentIndex) {
          return this._getFunction(functionName).argumentNames[argumentIndex];
        }
        lookupFunctionArgumentBitRatio(functionName, argumentName) {
          if (!this._isFunction(functionName)) {
            throw new Error("function not found");
          }
          if (this.rootNode.name === functionName) {
            const i2 = this.rootNode.argumentNames.indexOf(argumentName);
            if (i2 !== -1) {
              return this.rootNode.argumentBitRatios[i2];
            }
          }
          const node = this._getFunction(functionName);
          const i = node.argumentNames.indexOf(argumentName);
          if (i === -1) {
            throw new Error("argument not found");
          }
          const bitRatio = node.argumentBitRatios[i];
          if (typeof bitRatio !== "number") {
            throw new Error("argument bit ratio not found");
          }
          return bitRatio;
        }
        needsArgumentType(functionName, i) {
          if (!this._isFunction(functionName))
            return false;
          const fnNode = this._getFunction(functionName);
          return !fnNode.argumentTypes[i];
        }
        assignArgumentType(functionName, i, argumentType, requestingNode) {
          if (!this._isFunction(functionName))
            return;
          const fnNode = this._getFunction(functionName);
          if (!fnNode.argumentTypes[i]) {
            fnNode.argumentTypes[i] = argumentType;
          }
        }
        assignArgumentBitRatio(functionName, argumentName, calleeFunctionName, argumentIndex) {
          const node = this._getFunction(functionName);
          if (this._isNativeFunction(calleeFunctionName))
            return null;
          const calleeNode = this._getFunction(calleeFunctionName);
          const i = node.argumentNames.indexOf(argumentName);
          if (i === -1) {
            throw new Error(`Argument ${argumentName} not found in arguments from function ${functionName}`);
          }
          const bitRatio = node.argumentBitRatios[i];
          if (typeof bitRatio !== "number") {
            throw new Error(`Bit ratio for argument ${argumentName} not found in function ${functionName}`);
          }
          if (!calleeNode.argumentBitRatios) {
            calleeNode.argumentBitRatios = new Array(calleeNode.argumentNames.length);
          }
          const calleeBitRatio = calleeNode.argumentBitRatios[i];
          if (typeof calleeBitRatio === "number") {
            if (calleeBitRatio !== bitRatio) {
              throw new Error(`Incompatible bit ratio found at function ${functionName} at argument ${argumentName}`);
            }
            return calleeBitRatio;
          }
          calleeNode.argumentBitRatios[i] = bitRatio;
          return bitRatio;
        }
        trackFunctionCall(functionName, calleeFunctionName, args) {
          if (!this.functionNodeDependencies[functionName]) {
            this.functionNodeDependencies[functionName] = /* @__PURE__ */ new Set();
            this.functionCalls[functionName] = [];
          }
          this.functionNodeDependencies[functionName].add(calleeFunctionName);
          this.functionCalls[functionName].push(args);
        }
        getKernelResultType() {
          return this.rootNode.returnType || this.rootNode.getType(this.rootNode.ast);
        }
        getSubKernelResultType(index2) {
          const subKernelNode = this.subKernelNodes[index2];
          let called = false;
          for (let functionCallIndex = 0; functionCallIndex < this.rootNode.functionCalls.length; functionCallIndex++) {
            const functionCall = this.rootNode.functionCalls[functionCallIndex];
            if (functionCall.ast.callee.name === subKernelNode.name) {
              called = true;
            }
          }
          if (!called) {
            throw new Error(`SubKernel ${subKernelNode.name} never called by kernel`);
          }
          return subKernelNode.returnType || subKernelNode.getType(subKernelNode.getJsAST());
        }
        getReturnTypes() {
          const result = {
            [this.rootNode.name]: this.rootNode.getType(this.rootNode.ast)
          };
          const list = this.traceFunctionCalls(this.rootNode.name);
          for (let i = 0; i < list.length; i++) {
            const functionName = list[i];
            const functionNode = this.functionMap[functionName];
            result[functionName] = functionNode.getType(functionNode.ast);
          }
          return result;
        }
      }
      module2.exports = {
        FunctionBuilder
      };
    }, {}], 10: [function(require2, module2, exports2) {
      const acorn = require2("acorn");
      const { utils } = require2("../utils");
      const { FunctionTracer } = require2("./function-tracer");
      class FunctionNode {
        constructor(source, settings) {
          if (!source && !settings.ast) {
            throw new Error("source parameter is missing");
          }
          settings = settings || {};
          this.source = source;
          this.ast = null;
          this.name = typeof source === "string" ? settings.isRootKernel ? "kernel" : settings.name || utils.getFunctionNameFromString(source) : null;
          this.calledFunctions = [];
          this.constants = {};
          this.constantTypes = {};
          this.constantBitRatios = {};
          this.isRootKernel = false;
          this.isSubKernel = false;
          this.debug = null;
          this.functions = null;
          this.identifiers = null;
          this.contexts = null;
          this.functionCalls = null;
          this.states = [];
          this.needsArgumentType = null;
          this.assignArgumentType = null;
          this.lookupReturnType = null;
          this.lookupFunctionArgumentTypes = null;
          this.lookupFunctionArgumentBitRatio = null;
          this.triggerImplyArgumentType = null;
          this.triggerImplyArgumentBitRatio = null;
          this.onNestedFunction = null;
          this.onFunctionCall = null;
          this.optimizeFloatMemory = null;
          this.precision = null;
          this.loopMaxIterations = null;
          this.argumentNames = typeof this.source === "string" ? utils.getArgumentNamesFromString(this.source) : null;
          this.argumentTypes = [];
          this.argumentSizes = [];
          this.argumentBitRatios = null;
          this.returnType = null;
          this.output = [];
          this.plugins = null;
          this.leadingReturnStatement = null;
          this.followingReturnStatement = null;
          this.dynamicOutput = null;
          this.dynamicArguments = null;
          this.strictTypingChecking = false;
          this.fixIntegerDivisionAccuracy = null;
          if (settings) {
            for (const p2 in settings) {
              if (!settings.hasOwnProperty(p2))
                continue;
              if (!this.hasOwnProperty(p2))
                continue;
              this[p2] = settings[p2];
            }
          }
          this.literalTypes = {};
          this.validate();
          this._string = null;
          this._internalVariableNames = {};
        }
        validate() {
          if (typeof this.source !== "string" && !this.ast) {
            throw new Error("this.source not a string");
          }
          if (!this.ast && !utils.isFunctionString(this.source)) {
            throw new Error("this.source not a function string");
          }
          if (!this.name) {
            throw new Error("this.name could not be set");
          }
          if (this.argumentTypes.length > 0 && this.argumentTypes.length !== this.argumentNames.length) {
            throw new Error(`argumentTypes count of ${this.argumentTypes.length} exceeds ${this.argumentNames.length}`);
          }
          if (this.output.length < 1) {
            throw new Error("this.output is not big enough");
          }
        }
        isIdentifierConstant(name2) {
          if (!this.constants)
            return false;
          return this.constants.hasOwnProperty(name2);
        }
        isInput(argumentName) {
          return this.argumentTypes[this.argumentNames.indexOf(argumentName)] === "Input";
        }
        pushState(state) {
          this.states.push(state);
        }
        popState(state) {
          if (this.state !== state) {
            throw new Error(`Cannot popState ${state} when in ${this.state}`);
          }
          this.states.pop();
        }
        isState(state) {
          return this.state === state;
        }
        get state() {
          return this.states[this.states.length - 1];
        }
        astMemberExpressionUnroll(ast) {
          if (ast.type === "Identifier") {
            return ast.name;
          } else if (ast.type === "ThisExpression") {
            return "this";
          }
          if (ast.type === "MemberExpression") {
            if (ast.object && ast.property) {
              if (ast.object.hasOwnProperty("name") && ast.object.name !== "Math") {
                return this.astMemberExpressionUnroll(ast.property);
              }
              return this.astMemberExpressionUnroll(ast.object) + "." + this.astMemberExpressionUnroll(ast.property);
            }
          }
          if (ast.hasOwnProperty("expressions")) {
            const firstExpression = ast.expressions[0];
            if (firstExpression.type === "Literal" && firstExpression.value === 0 && ast.expressions.length === 2) {
              return this.astMemberExpressionUnroll(ast.expressions[1]);
            }
          }
          throw this.astErrorOutput("Unknown astMemberExpressionUnroll", ast);
        }
        getJsAST(inParser) {
          if (this.ast) {
            return this.ast;
          }
          if (typeof this.source === "object") {
            this.traceFunctionAST(this.source);
            return this.ast = this.source;
          }
          inParser = inParser || acorn;
          if (inParser === null) {
            throw new Error("Missing JS to AST parser");
          }
          const ast = Object.freeze(inParser.parse(`const parser_${this.name} = ${this.source};`, {
            locations: true
          }));
          const functionAST = ast.body[0].declarations[0].init;
          this.traceFunctionAST(functionAST);
          if (!ast) {
            throw new Error("Failed to parse JS code");
          }
          return this.ast = functionAST;
        }
        traceFunctionAST(ast) {
          const { contexts, declarations, functions, identifiers, functionCalls } = new FunctionTracer(ast);
          this.contexts = contexts;
          this.identifiers = identifiers;
          this.functionCalls = functionCalls;
          this.functions = functions;
          for (let i = 0; i < declarations.length; i++) {
            const declaration = declarations[i];
            const { ast: ast2, inForLoopInit, inForLoopTest } = declaration;
            const { init } = ast2;
            const dependencies = this.getDependencies(init);
            let valueType = null;
            if (inForLoopInit && inForLoopTest) {
              valueType = "Integer";
            } else {
              if (init) {
                const realType = this.getType(init);
                switch (realType) {
                  case "Integer":
                  case "Float":
                  case "Number":
                    if (init.type === "MemberExpression") {
                      valueType = realType;
                    } else {
                      valueType = "Number";
                    }
                    break;
                  case "LiteralInteger":
                    valueType = "Number";
                    break;
                  default:
                    valueType = realType;
                }
              }
            }
            declaration.valueType = valueType;
            declaration.dependencies = dependencies;
            declaration.isSafe = this.isSafeDependencies(dependencies);
          }
          for (let i = 0; i < functions.length; i++) {
            this.onNestedFunction(functions[i], this.source);
          }
        }
        getDeclaration(ast) {
          for (let i = 0; i < this.identifiers.length; i++) {
            const identifier = this.identifiers[i];
            if (ast === identifier.ast) {
              return identifier.declaration;
            }
          }
          return null;
        }
        getVariableType(ast) {
          if (ast.type !== "Identifier") {
            throw new Error(`ast of ${ast.type} not "Identifier"`);
          }
          let type = null;
          const argumentIndex = this.argumentNames.indexOf(ast.name);
          if (argumentIndex === -1) {
            const declaration = this.getDeclaration(ast);
            if (declaration) {
              return declaration.valueType;
            }
          } else {
            const argumentType = this.argumentTypes[argumentIndex];
            if (argumentType) {
              type = argumentType;
            }
          }
          if (!type && this.strictTypingChecking) {
            throw new Error(`Declaration of ${name} not found`);
          }
          return type;
        }
        getLookupType(type) {
          if (!typeLookupMap.hasOwnProperty(type)) {
            throw new Error(`unknown typeLookupMap ${type}`);
          }
          return typeLookupMap[type];
        }
        getConstantType(constantName) {
          if (this.constantTypes[constantName]) {
            const type = this.constantTypes[constantName];
            if (type === "Float") {
              return "Number";
            } else {
              return type;
            }
          }
          throw new Error(`Type for constant "${constantName}" not declared`);
        }
        toString() {
          if (this._string)
            return this._string;
          return this._string = this.astGeneric(this.getJsAST(), []).join("").trim();
        }
        toJSON() {
          const settings = {
            source: this.source,
            name: this.name,
            constants: this.constants,
            constantTypes: this.constantTypes,
            isRootKernel: this.isRootKernel,
            isSubKernel: this.isSubKernel,
            debug: this.debug,
            output: this.output,
            loopMaxIterations: this.loopMaxIterations,
            argumentNames: this.argumentNames,
            argumentTypes: this.argumentTypes,
            argumentSizes: this.argumentSizes,
            returnType: this.returnType,
            leadingReturnStatement: this.leadingReturnStatement,
            followingReturnStatement: this.followingReturnStatement
          };
          return {
            ast: this.ast,
            settings
          };
        }
        getType(ast) {
          if (Array.isArray(ast)) {
            return this.getType(ast[ast.length - 1]);
          }
          switch (ast.type) {
            case "BlockStatement":
              return this.getType(ast.body);
            case "ArrayExpression":
              const childType = this.getType(ast.elements[0]);
              switch (childType) {
                case "Array(2)":
                case "Array(3)":
                case "Array(4)":
                  return `Matrix(${ast.elements.length})`;
              }
              return `Array(${ast.elements.length})`;
            case "Literal":
              const literalKey = this.astKey(ast);
              if (this.literalTypes[literalKey]) {
                return this.literalTypes[literalKey];
              }
              if (Number.isInteger(ast.value)) {
                return "LiteralInteger";
              } else if (ast.value === true || ast.value === false) {
                return "Boolean";
              } else {
                return "Number";
              }
            case "AssignmentExpression":
              return this.getType(ast.left);
            case "CallExpression":
              if (this.isAstMathFunction(ast)) {
                return "Number";
              }
              if (!ast.callee || !ast.callee.name) {
                if (ast.callee.type === "SequenceExpression" && ast.callee.expressions[ast.callee.expressions.length - 1].property.name) {
                  const functionName = ast.callee.expressions[ast.callee.expressions.length - 1].property.name;
                  this.inferArgumentTypesIfNeeded(functionName, ast.arguments);
                  return this.lookupReturnType(functionName, ast, this);
                }
                if (this.getVariableSignature(ast.callee, true) === "this.color") {
                  return null;
                }
                if (ast.callee.type === "MemberExpression" && ast.callee.object && ast.callee.property && ast.callee.property.name && ast.arguments) {
                  const functionName = ast.callee.property.name;
                  this.inferArgumentTypesIfNeeded(functionName, ast.arguments);
                  return this.lookupReturnType(functionName, ast, this);
                }
                throw this.astErrorOutput("Unknown call expression", ast);
              }
              if (ast.callee && ast.callee.name) {
                const functionName = ast.callee.name;
                this.inferArgumentTypesIfNeeded(functionName, ast.arguments);
                return this.lookupReturnType(functionName, ast, this);
              }
              throw this.astErrorOutput(`Unhandled getType Type "${ast.type}"`, ast);
            case "LogicalExpression":
              return "Boolean";
            case "BinaryExpression":
              switch (ast.operator) {
                case "%":
                case "/":
                  if (this.fixIntegerDivisionAccuracy) {
                    return "Number";
                  } else {
                    break;
                  }
                case ">":
                case "<":
                  return "Boolean";
                case "&":
                case "|":
                case "^":
                case "<<":
                case ">>":
                case ">>>":
                  return "Integer";
              }
              const type = this.getType(ast.left);
              if (this.isState("skip-literal-correction"))
                return type;
              if (type === "LiteralInteger") {
                const rightType = this.getType(ast.right);
                if (rightType === "LiteralInteger") {
                  if (ast.left.value % 1 === 0) {
                    return "Integer";
                  } else {
                    return "Float";
                  }
                }
                return rightType;
              }
              return typeLookupMap[type] || type;
            case "UpdateExpression":
              return this.getType(ast.argument);
            case "UnaryExpression":
              if (ast.operator === "~") {
                return "Integer";
              }
              return this.getType(ast.argument);
            case "VariableDeclaration": {
              const declarations = ast.declarations;
              let lastType;
              for (let i = 0; i < declarations.length; i++) {
                const declaration2 = declarations[i];
                lastType = this.getType(declaration2);
              }
              if (!lastType) {
                throw this.astErrorOutput(`Unable to find type for declaration`, ast);
              }
              return lastType;
            }
            case "VariableDeclarator":
              const declaration = this.getDeclaration(ast.id);
              if (!declaration) {
                throw this.astErrorOutput(`Unable to find declarator`, ast);
              }
              if (!declaration.valueType) {
                throw this.astErrorOutput(`Unable to find declarator valueType`, ast);
              }
              return declaration.valueType;
            case "Identifier":
              if (ast.name === "Infinity") {
                return "Number";
              }
              if (this.isAstVariable(ast)) {
                const signature = this.getVariableSignature(ast);
                if (signature === "value") {
                  return this.getCheckVariableType(ast);
                }
              }
              const origin = this.findIdentifierOrigin(ast);
              if (origin && origin.init) {
                return this.getType(origin.init);
              }
              return null;
            case "ReturnStatement":
              return this.getType(ast.argument);
            case "MemberExpression":
              if (this.isAstMathFunction(ast)) {
                switch (ast.property.name) {
                  case "ceil":
                    return "Integer";
                  case "floor":
                    return "Integer";
                  case "round":
                    return "Integer";
                }
                return "Number";
              }
              if (this.isAstVariable(ast)) {
                const variableSignature = this.getVariableSignature(ast);
                switch (variableSignature) {
                  case "value[]":
                    return this.getLookupType(this.getCheckVariableType(ast.object));
                  case "value[][]":
                    return this.getLookupType(this.getCheckVariableType(ast.object.object));
                  case "value[][][]":
                    return this.getLookupType(this.getCheckVariableType(ast.object.object.object));
                  case "value[][][][]":
                    return this.getLookupType(this.getCheckVariableType(ast.object.object.object.object));
                  case "value.thread.value":
                  case "this.thread.value":
                    return "Integer";
                  case "this.output.value":
                    return this.dynamicOutput ? "Integer" : "LiteralInteger";
                  case "this.constants.value":
                    return this.getConstantType(ast.property.name);
                  case "this.constants.value[]":
                    return this.getLookupType(this.getConstantType(ast.object.property.name));
                  case "this.constants.value[][]":
                    return this.getLookupType(this.getConstantType(ast.object.object.property.name));
                  case "this.constants.value[][][]":
                    return this.getLookupType(this.getConstantType(ast.object.object.object.property.name));
                  case "this.constants.value[][][][]":
                    return this.getLookupType(this.getConstantType(ast.object.object.object.object.property.name));
                  case "fn()[]":
                  case "fn()[][]":
                  case "fn()[][][]":
                    return this.getLookupType(this.getType(ast.object));
                  case "value.value":
                    if (this.isAstMathVariable(ast)) {
                      return "Number";
                    }
                    switch (ast.property.name) {
                      case "r":
                      case "g":
                      case "b":
                      case "a":
                        return this.getLookupType(this.getCheckVariableType(ast.object));
                    }
                  case "[][]":
                    return "Number";
                }
                throw this.astErrorOutput("Unhandled getType MemberExpression", ast);
              }
              throw this.astErrorOutput("Unhandled getType MemberExpression", ast);
            case "ConditionalExpression":
              return this.getType(ast.consequent);
            case "FunctionDeclaration":
            case "FunctionExpression":
              const lastReturn = this.findLastReturn(ast.body);
              if (lastReturn) {
                return this.getType(lastReturn);
              }
              return null;
            case "IfStatement":
              return this.getType(ast.consequent);
            case "SequenceExpression":
              return this.getType(ast.expressions[ast.expressions.length - 1]);
            default:
              throw this.astErrorOutput(`Unhandled getType Type "${ast.type}"`, ast);
          }
        }
        getCheckVariableType(ast) {
          const type = this.getVariableType(ast);
          if (!type) {
            throw this.astErrorOutput(`${ast.type} is not defined`, ast);
          }
          return type;
        }
        inferArgumentTypesIfNeeded(functionName, args) {
          for (let i = 0; i < args.length; i++) {
            if (!this.needsArgumentType(functionName, i))
              continue;
            const type = this.getType(args[i]);
            if (!type) {
              throw this.astErrorOutput(`Unable to infer argument ${i}`, args[i]);
            }
            this.assignArgumentType(functionName, i, type);
          }
        }
        isAstMathVariable(ast) {
          const mathProperties = [
            "E",
            "PI",
            "SQRT2",
            "SQRT1_2",
            "LN2",
            "LN10",
            "LOG2E",
            "LOG10E"
          ];
          return ast.type === "MemberExpression" && ast.object && ast.object.type === "Identifier" && ast.object.name === "Math" && ast.property && ast.property.type === "Identifier" && mathProperties.indexOf(ast.property.name) > -1;
        }
        isAstMathFunction(ast) {
          const mathFunctions = [
            "abs",
            "acos",
            "acosh",
            "asin",
            "asinh",
            "atan",
            "atan2",
            "atanh",
            "cbrt",
            "ceil",
            "clz32",
            "cos",
            "cosh",
            "expm1",
            "exp",
            "floor",
            "fround",
            "imul",
            "log",
            "log2",
            "log10",
            "log1p",
            "max",
            "min",
            "pow",
            "random",
            "round",
            "sign",
            "sin",
            "sinh",
            "sqrt",
            "tan",
            "tanh",
            "trunc"
          ];
          return ast.type === "CallExpression" && ast.callee && ast.callee.type === "MemberExpression" && ast.callee.object && ast.callee.object.type === "Identifier" && ast.callee.object.name === "Math" && ast.callee.property && ast.callee.property.type === "Identifier" && mathFunctions.indexOf(ast.callee.property.name) > -1;
        }
        isAstVariable(ast) {
          return ast.type === "Identifier" || ast.type === "MemberExpression";
        }
        isSafe(ast) {
          return this.isSafeDependencies(this.getDependencies(ast));
        }
        isSafeDependencies(dependencies) {
          return dependencies && dependencies.every ? dependencies.every((dependency) => dependency.isSafe) : true;
        }
        getDependencies(ast, dependencies, isNotSafe) {
          if (!dependencies) {
            dependencies = [];
          }
          if (!ast)
            return null;
          if (Array.isArray(ast)) {
            for (let i = 0; i < ast.length; i++) {
              this.getDependencies(ast[i], dependencies, isNotSafe);
            }
            return dependencies;
          }
          switch (ast.type) {
            case "AssignmentExpression":
              this.getDependencies(ast.left, dependencies, isNotSafe);
              this.getDependencies(ast.right, dependencies, isNotSafe);
              return dependencies;
            case "ConditionalExpression":
              this.getDependencies(ast.test, dependencies, isNotSafe);
              this.getDependencies(ast.alternate, dependencies, isNotSafe);
              this.getDependencies(ast.consequent, dependencies, isNotSafe);
              return dependencies;
            case "Literal":
              dependencies.push({
                origin: "literal",
                value: ast.value,
                isSafe: isNotSafe === true ? false : ast.value > -Infinity && ast.value < Infinity && !isNaN(ast.value)
              });
              break;
            case "VariableDeclarator":
              return this.getDependencies(ast.init, dependencies, isNotSafe);
            case "Identifier":
              const declaration = this.getDeclaration(ast);
              if (declaration) {
                dependencies.push({
                  name: ast.name,
                  origin: "declaration",
                  isSafe: isNotSafe ? false : this.isSafeDependencies(declaration.dependencies)
                });
              } else if (this.argumentNames.indexOf(ast.name) > -1) {
                dependencies.push({
                  name: ast.name,
                  origin: "argument",
                  isSafe: false
                });
              } else if (this.strictTypingChecking) {
                throw new Error(`Cannot find identifier origin "${ast.name}"`);
              }
              break;
            case "FunctionDeclaration":
              return this.getDependencies(ast.body.body[ast.body.body.length - 1], dependencies, isNotSafe);
            case "ReturnStatement":
              return this.getDependencies(ast.argument, dependencies);
            case "BinaryExpression":
            case "LogicalExpression":
              isNotSafe = ast.operator === "/" || ast.operator === "*";
              this.getDependencies(ast.left, dependencies, isNotSafe);
              this.getDependencies(ast.right, dependencies, isNotSafe);
              return dependencies;
            case "UnaryExpression":
            case "UpdateExpression":
              return this.getDependencies(ast.argument, dependencies, isNotSafe);
            case "VariableDeclaration":
              return this.getDependencies(ast.declarations, dependencies, isNotSafe);
            case "ArrayExpression":
              dependencies.push({
                origin: "declaration",
                isSafe: true
              });
              return dependencies;
            case "CallExpression":
              dependencies.push({
                origin: "function",
                isSafe: true
              });
              return dependencies;
            case "MemberExpression":
              const details = this.getMemberExpressionDetails(ast);
              switch (details.signature) {
                case "value[]":
                  this.getDependencies(ast.object, dependencies, isNotSafe);
                  break;
                case "value[][]":
                  this.getDependencies(ast.object.object, dependencies, isNotSafe);
                  break;
                case "value[][][]":
                  this.getDependencies(ast.object.object.object, dependencies, isNotSafe);
                  break;
                case "this.output.value":
                  if (this.dynamicOutput) {
                    dependencies.push({
                      name: details.name,
                      origin: "output",
                      isSafe: false
                    });
                  }
                  break;
              }
              if (details) {
                if (details.property) {
                  this.getDependencies(details.property, dependencies, isNotSafe);
                }
                if (details.xProperty) {
                  this.getDependencies(details.xProperty, dependencies, isNotSafe);
                }
                if (details.yProperty) {
                  this.getDependencies(details.yProperty, dependencies, isNotSafe);
                }
                if (details.zProperty) {
                  this.getDependencies(details.zProperty, dependencies, isNotSafe);
                }
                return dependencies;
              }
            case "SequenceExpression":
              return this.getDependencies(ast.expressions, dependencies, isNotSafe);
            default:
              throw this.astErrorOutput(`Unhandled type ${ast.type} in getDependencies`, ast);
          }
          return dependencies;
        }
        getVariableSignature(ast, returnRawValue) {
          if (!this.isAstVariable(ast)) {
            throw new Error(`ast of type "${ast.type}" is not a variable signature`);
          }
          if (ast.type === "Identifier") {
            return "value";
          }
          const signature = [];
          while (true) {
            if (!ast)
              break;
            if (ast.computed) {
              signature.push("[]");
            } else if (ast.type === "ThisExpression") {
              signature.unshift("this");
            } else if (ast.property && ast.property.name) {
              if (ast.property.name === "x" || ast.property.name === "y" || ast.property.name === "z") {
                signature.unshift(returnRawValue ? "." + ast.property.name : ".value");
              } else if (ast.property.name === "constants" || ast.property.name === "thread" || ast.property.name === "output") {
                signature.unshift("." + ast.property.name);
              } else {
                signature.unshift(returnRawValue ? "." + ast.property.name : ".value");
              }
            } else if (ast.name) {
              signature.unshift(returnRawValue ? ast.name : "value");
            } else if (ast.callee && ast.callee.name) {
              signature.unshift(returnRawValue ? ast.callee.name + "()" : "fn()");
            } else if (ast.elements) {
              signature.unshift("[]");
            } else {
              signature.unshift("unknown");
            }
            ast = ast.object;
          }
          const signatureString = signature.join("");
          if (returnRawValue) {
            return signatureString;
          }
          const allowedExpressions = [
            "value",
            "value[]",
            "value[][]",
            "value[][][]",
            "value[][][][]",
            "value.value",
            "value.thread.value",
            "this.thread.value",
            "this.output.value",
            "this.constants.value",
            "this.constants.value[]",
            "this.constants.value[][]",
            "this.constants.value[][][]",
            "this.constants.value[][][][]",
            "fn()[]",
            "fn()[][]",
            "fn()[][][]",
            "[][]"
          ];
          if (allowedExpressions.indexOf(signatureString) > -1) {
            return signatureString;
          }
          return null;
        }
        build() {
          return this.toString().length > 0;
        }
        astGeneric(ast, retArr) {
          if (ast === null) {
            throw this.astErrorOutput("NULL ast", ast);
          } else {
            if (Array.isArray(ast)) {
              for (let i = 0; i < ast.length; i++) {
                this.astGeneric(ast[i], retArr);
              }
              return retArr;
            }
            switch (ast.type) {
              case "FunctionDeclaration":
                return this.astFunctionDeclaration(ast, retArr);
              case "FunctionExpression":
                return this.astFunctionExpression(ast, retArr);
              case "ReturnStatement":
                return this.astReturnStatement(ast, retArr);
              case "Literal":
                return this.astLiteral(ast, retArr);
              case "BinaryExpression":
                return this.astBinaryExpression(ast, retArr);
              case "Identifier":
                return this.astIdentifierExpression(ast, retArr);
              case "AssignmentExpression":
                return this.astAssignmentExpression(ast, retArr);
              case "ExpressionStatement":
                return this.astExpressionStatement(ast, retArr);
              case "EmptyStatement":
                return this.astEmptyStatement(ast, retArr);
              case "BlockStatement":
                return this.astBlockStatement(ast, retArr);
              case "IfStatement":
                return this.astIfStatement(ast, retArr);
              case "SwitchStatement":
                return this.astSwitchStatement(ast, retArr);
              case "BreakStatement":
                return this.astBreakStatement(ast, retArr);
              case "ContinueStatement":
                return this.astContinueStatement(ast, retArr);
              case "ForStatement":
                return this.astForStatement(ast, retArr);
              case "WhileStatement":
                return this.astWhileStatement(ast, retArr);
              case "DoWhileStatement":
                return this.astDoWhileStatement(ast, retArr);
              case "VariableDeclaration":
                return this.astVariableDeclaration(ast, retArr);
              case "VariableDeclarator":
                return this.astVariableDeclarator(ast, retArr);
              case "ThisExpression":
                return this.astThisExpression(ast, retArr);
              case "SequenceExpression":
                return this.astSequenceExpression(ast, retArr);
              case "UnaryExpression":
                return this.astUnaryExpression(ast, retArr);
              case "UpdateExpression":
                return this.astUpdateExpression(ast, retArr);
              case "LogicalExpression":
                return this.astLogicalExpression(ast, retArr);
              case "MemberExpression":
                return this.astMemberExpression(ast, retArr);
              case "CallExpression":
                return this.astCallExpression(ast, retArr);
              case "ArrayExpression":
                return this.astArrayExpression(ast, retArr);
              case "DebuggerStatement":
                return this.astDebuggerStatement(ast, retArr);
              case "ConditionalExpression":
                return this.astConditionalExpression(ast, retArr);
            }
            throw this.astErrorOutput("Unknown ast type : " + ast.type, ast);
          }
        }
        astErrorOutput(error, ast) {
          if (typeof this.source !== "string") {
            return new Error(error);
          }
          const debugString = utils.getAstString(this.source, ast);
          const leadingSource = this.source.substr(ast.start);
          const splitLines = leadingSource.split(/\n/);
          const lineBefore = splitLines.length > 0 ? splitLines[splitLines.length - 1] : 0;
          return new Error(`${error} on line ${splitLines.length}, position ${lineBefore.length}:
 ${debugString}`);
        }
        astDebuggerStatement(arrNode, retArr) {
          return retArr;
        }
        astConditionalExpression(ast, retArr) {
          if (ast.type !== "ConditionalExpression") {
            throw this.astErrorOutput("Not a conditional expression", ast);
          }
          retArr.push("(");
          this.astGeneric(ast.test, retArr);
          retArr.push("?");
          this.astGeneric(ast.consequent, retArr);
          retArr.push(":");
          this.astGeneric(ast.alternate, retArr);
          retArr.push(")");
          return retArr;
        }
        astFunction(ast, retArr) {
          throw new Error(`"astFunction" not defined on ${this.constructor.name}`);
        }
        astFunctionDeclaration(ast, retArr) {
          if (this.isChildFunction(ast)) {
            return retArr;
          }
          return this.astFunction(ast, retArr);
        }
        astFunctionExpression(ast, retArr) {
          if (this.isChildFunction(ast)) {
            return retArr;
          }
          return this.astFunction(ast, retArr);
        }
        isChildFunction(ast) {
          for (let i = 0; i < this.functions.length; i++) {
            if (this.functions[i] === ast) {
              return true;
            }
          }
          return false;
        }
        astReturnStatement(ast, retArr) {
          return retArr;
        }
        astLiteral(ast, retArr) {
          this.literalTypes[this.astKey(ast)] = "Number";
          return retArr;
        }
        astBinaryExpression(ast, retArr) {
          return retArr;
        }
        astIdentifierExpression(ast, retArr) {
          return retArr;
        }
        astAssignmentExpression(ast, retArr) {
          return retArr;
        }
        astExpressionStatement(esNode, retArr) {
          this.astGeneric(esNode.expression, retArr);
          retArr.push(";");
          return retArr;
        }
        astEmptyStatement(eNode, retArr) {
          return retArr;
        }
        astBlockStatement(ast, retArr) {
          return retArr;
        }
        astIfStatement(ast, retArr) {
          return retArr;
        }
        astSwitchStatement(ast, retArr) {
          return retArr;
        }
        astBreakStatement(brNode, retArr) {
          retArr.push("break;");
          return retArr;
        }
        astContinueStatement(crNode, retArr) {
          retArr.push("continue;\n");
          return retArr;
        }
        astForStatement(ast, retArr) {
          return retArr;
        }
        astWhileStatement(ast, retArr) {
          return retArr;
        }
        astDoWhileStatement(ast, retArr) {
          return retArr;
        }
        astVariableDeclarator(iVarDecNode, retArr) {
          this.astGeneric(iVarDecNode.id, retArr);
          if (iVarDecNode.init !== null) {
            retArr.push("=");
            this.astGeneric(iVarDecNode.init, retArr);
          }
          return retArr;
        }
        astThisExpression(ast, retArr) {
          return retArr;
        }
        astSequenceExpression(sNode, retArr) {
          const { expressions } = sNode;
          const sequenceResult = [];
          for (let i = 0; i < expressions.length; i++) {
            const expression = expressions[i];
            const expressionResult = [];
            this.astGeneric(expression, expressionResult);
            sequenceResult.push(expressionResult.join(""));
          }
          if (sequenceResult.length > 1) {
            retArr.push("(", sequenceResult.join(","), ")");
          } else {
            retArr.push(sequenceResult[0]);
          }
          return retArr;
        }
        astUnaryExpression(uNode, retArr) {
          const unaryResult = this.checkAndUpconvertBitwiseUnary(uNode, retArr);
          if (unaryResult) {
            return retArr;
          }
          if (uNode.prefix) {
            retArr.push(uNode.operator);
            this.astGeneric(uNode.argument, retArr);
          } else {
            this.astGeneric(uNode.argument, retArr);
            retArr.push(uNode.operator);
          }
          return retArr;
        }
        checkAndUpconvertBitwiseUnary(uNode, retArr) {
        }
        astUpdateExpression(uNode, retArr) {
          if (uNode.prefix) {
            retArr.push(uNode.operator);
            this.astGeneric(uNode.argument, retArr);
          } else {
            this.astGeneric(uNode.argument, retArr);
            retArr.push(uNode.operator);
          }
          return retArr;
        }
        astLogicalExpression(logNode, retArr) {
          retArr.push("(");
          this.astGeneric(logNode.left, retArr);
          retArr.push(logNode.operator);
          this.astGeneric(logNode.right, retArr);
          retArr.push(")");
          return retArr;
        }
        astMemberExpression(ast, retArr) {
          return retArr;
        }
        astCallExpression(ast, retArr) {
          return retArr;
        }
        astArrayExpression(ast, retArr) {
          return retArr;
        }
        getMemberExpressionDetails(ast) {
          if (ast.type !== "MemberExpression") {
            throw this.astErrorOutput(`Expression ${ast.type} not a MemberExpression`, ast);
          }
          let name2 = null;
          let type = null;
          const variableSignature = this.getVariableSignature(ast);
          switch (variableSignature) {
            case "value":
              return null;
            case "value.thread.value":
            case "this.thread.value":
            case "this.output.value":
              return {
                signature: variableSignature,
                type: "Integer",
                name: ast.property.name
              };
            case "value[]":
              if (typeof ast.object.name !== "string") {
                throw this.astErrorOutput("Unexpected expression", ast);
              }
              name2 = ast.object.name;
              return {
                name: name2,
                origin: "user",
                signature: variableSignature,
                type: this.getVariableType(ast.object),
                xProperty: ast.property
              };
            case "value[][]":
              if (typeof ast.object.object.name !== "string") {
                throw this.astErrorOutput("Unexpected expression", ast);
              }
              name2 = ast.object.object.name;
              return {
                name: name2,
                origin: "user",
                signature: variableSignature,
                type: this.getVariableType(ast.object.object),
                yProperty: ast.object.property,
                xProperty: ast.property
              };
            case "value[][][]":
              if (typeof ast.object.object.object.name !== "string") {
                throw this.astErrorOutput("Unexpected expression", ast);
              }
              name2 = ast.object.object.object.name;
              return {
                name: name2,
                origin: "user",
                signature: variableSignature,
                type: this.getVariableType(ast.object.object.object),
                zProperty: ast.object.object.property,
                yProperty: ast.object.property,
                xProperty: ast.property
              };
            case "value[][][][]":
              if (typeof ast.object.object.object.object.name !== "string") {
                throw this.astErrorOutput("Unexpected expression", ast);
              }
              name2 = ast.object.object.object.object.name;
              return {
                name: name2,
                origin: "user",
                signature: variableSignature,
                type: this.getVariableType(ast.object.object.object.object),
                zProperty: ast.object.object.property,
                yProperty: ast.object.property,
                xProperty: ast.property
              };
            case "value.value":
              if (typeof ast.property.name !== "string") {
                throw this.astErrorOutput("Unexpected expression", ast);
              }
              if (this.isAstMathVariable(ast)) {
                name2 = ast.property.name;
                return {
                  name: name2,
                  origin: "Math",
                  type: "Number",
                  signature: variableSignature
                };
              }
              switch (ast.property.name) {
                case "r":
                case "g":
                case "b":
                case "a":
                  name2 = ast.object.name;
                  return {
                    name: name2,
                    property: ast.property.name,
                    origin: "user",
                    signature: variableSignature,
                    type: "Number"
                  };
                default:
                  throw this.astErrorOutput("Unexpected expression", ast);
              }
            case "this.constants.value":
              if (typeof ast.property.name !== "string") {
                throw this.astErrorOutput("Unexpected expression", ast);
              }
              name2 = ast.property.name;
              type = this.getConstantType(name2);
              if (!type) {
                throw this.astErrorOutput("Constant has no type", ast);
              }
              return {
                name: name2,
                type,
                origin: "constants",
                signature: variableSignature
              };
            case "this.constants.value[]":
              if (typeof ast.object.property.name !== "string") {
                throw this.astErrorOutput("Unexpected expression", ast);
              }
              name2 = ast.object.property.name;
              type = this.getConstantType(name2);
              if (!type) {
                throw this.astErrorOutput("Constant has no type", ast);
              }
              return {
                name: name2,
                type,
                origin: "constants",
                signature: variableSignature,
                xProperty: ast.property
              };
            case "this.constants.value[][]": {
              if (typeof ast.object.object.property.name !== "string") {
                throw this.astErrorOutput("Unexpected expression", ast);
              }
              name2 = ast.object.object.property.name;
              type = this.getConstantType(name2);
              if (!type) {
                throw this.astErrorOutput("Constant has no type", ast);
              }
              return {
                name: name2,
                type,
                origin: "constants",
                signature: variableSignature,
                yProperty: ast.object.property,
                xProperty: ast.property
              };
            }
            case "this.constants.value[][][]": {
              if (typeof ast.object.object.object.property.name !== "string") {
                throw this.astErrorOutput("Unexpected expression", ast);
              }
              name2 = ast.object.object.object.property.name;
              type = this.getConstantType(name2);
              if (!type) {
                throw this.astErrorOutput("Constant has no type", ast);
              }
              return {
                name: name2,
                type,
                origin: "constants",
                signature: variableSignature,
                zProperty: ast.object.object.property,
                yProperty: ast.object.property,
                xProperty: ast.property
              };
            }
            case "fn()[]":
            case "fn()[][]":
            case "[][]":
              return {
                signature: variableSignature,
                property: ast.property
              };
            default:
              throw this.astErrorOutput("Unexpected expression", ast);
          }
        }
        findIdentifierOrigin(astToFind) {
          const stack = [this.ast];
          while (stack.length > 0) {
            const atNode = stack[0];
            if (atNode.type === "VariableDeclarator" && atNode.id && atNode.id.name && atNode.id.name === astToFind.name) {
              return atNode;
            }
            stack.shift();
            if (atNode.argument) {
              stack.push(atNode.argument);
            } else if (atNode.body) {
              stack.push(atNode.body);
            } else if (atNode.declarations) {
              stack.push(atNode.declarations);
            } else if (Array.isArray(atNode)) {
              for (let i = 0; i < atNode.length; i++) {
                stack.push(atNode[i]);
              }
            }
          }
          return null;
        }
        findLastReturn(ast) {
          const stack = [ast || this.ast];
          while (stack.length > 0) {
            const atNode = stack.pop();
            if (atNode.type === "ReturnStatement") {
              return atNode;
            }
            if (atNode.type === "FunctionDeclaration") {
              continue;
            }
            if (atNode.argument) {
              stack.push(atNode.argument);
            } else if (atNode.body) {
              stack.push(atNode.body);
            } else if (atNode.declarations) {
              stack.push(atNode.declarations);
            } else if (Array.isArray(atNode)) {
              for (let i = 0; i < atNode.length; i++) {
                stack.push(atNode[i]);
              }
            } else if (atNode.consequent) {
              stack.push(atNode.consequent);
            } else if (atNode.cases) {
              stack.push(atNode.cases);
            }
          }
          return null;
        }
        getInternalVariableName(name2) {
          if (!this._internalVariableNames.hasOwnProperty(name2)) {
            this._internalVariableNames[name2] = 0;
          }
          this._internalVariableNames[name2]++;
          if (this._internalVariableNames[name2] === 1) {
            return name2;
          }
          return name2 + this._internalVariableNames[name2];
        }
        astKey(ast, separator = ",") {
          if (!ast.start || !ast.end)
            throw new Error("AST start and end needed");
          return `${ast.start}${separator}${ast.end}`;
        }
      }
      const typeLookupMap = {
        "Number": "Number",
        "Float": "Float",
        "Integer": "Integer",
        "Array": "Number",
        "Array(2)": "Number",
        "Array(3)": "Number",
        "Array(4)": "Number",
        "Matrix(2)": "Number",
        "Matrix(3)": "Number",
        "Matrix(4)": "Number",
        "Array2D": "Number",
        "Array3D": "Number",
        "Input": "Number",
        "HTMLCanvas": "Array(4)",
        "OffscreenCanvas": "Array(4)",
        "HTMLImage": "Array(4)",
        "ImageBitmap": "Array(4)",
        "ImageData": "Array(4)",
        "HTMLVideo": "Array(4)",
        "HTMLImageArray": "Array(4)",
        "NumberTexture": "Number",
        "MemoryOptimizedNumberTexture": "Number",
        "Array1D(2)": "Array(2)",
        "Array1D(3)": "Array(3)",
        "Array1D(4)": "Array(4)",
        "Array2D(2)": "Array(2)",
        "Array2D(3)": "Array(3)",
        "Array2D(4)": "Array(4)",
        "Array3D(2)": "Array(2)",
        "Array3D(3)": "Array(3)",
        "Array3D(4)": "Array(4)",
        "ArrayTexture(1)": "Number",
        "ArrayTexture(2)": "Array(2)",
        "ArrayTexture(3)": "Array(3)",
        "ArrayTexture(4)": "Array(4)"
      };
      module2.exports = {
        FunctionNode
      };
    }, { "../utils": 114, "./function-tracer": 11, "acorn": 1 }], 11: [function(require2, module2, exports2) {
      const { utils } = require2("../utils");
      function last(array) {
        return array.length > 0 ? array[array.length - 1] : null;
      }
      const states = {
        trackIdentifiers: "trackIdentifiers",
        memberExpression: "memberExpression",
        inForLoopInit: "inForLoopInit"
      };
      class FunctionTracer {
        constructor(ast) {
          this.runningContexts = [];
          this.functionContexts = [];
          this.contexts = [];
          this.functionCalls = [];
          this.declarations = [];
          this.identifiers = [];
          this.functions = [];
          this.returnStatements = [];
          this.trackedIdentifiers = null;
          this.states = [];
          this.newFunctionContext();
          this.scan(ast);
        }
        isState(state) {
          return this.states[this.states.length - 1] === state;
        }
        hasState(state) {
          return this.states.indexOf(state) > -1;
        }
        pushState(state) {
          this.states.push(state);
        }
        popState(state) {
          if (this.isState(state)) {
            this.states.pop();
          } else {
            throw new Error(`Cannot pop the non-active state "${state}"`);
          }
        }
        get currentFunctionContext() {
          return last(this.functionContexts);
        }
        get currentContext() {
          return last(this.runningContexts);
        }
        newFunctionContext() {
          const newContext = { "@contextType": "function" };
          this.contexts.push(newContext);
          this.functionContexts.push(newContext);
        }
        newContext(run) {
          const newContext = Object.assign({ "@contextType": "const/let" }, this.currentContext);
          this.contexts.push(newContext);
          this.runningContexts.push(newContext);
          run();
          const { currentFunctionContext } = this;
          for (const p2 in currentFunctionContext) {
            if (!currentFunctionContext.hasOwnProperty(p2) || newContext.hasOwnProperty(p2))
              continue;
            newContext[p2] = currentFunctionContext[p2];
          }
          this.runningContexts.pop();
          return newContext;
        }
        useFunctionContext(run) {
          const functionContext = last(this.functionContexts);
          this.runningContexts.push(functionContext);
          run();
          this.runningContexts.pop();
        }
        getIdentifiers(run) {
          const trackedIdentifiers = this.trackedIdentifiers = [];
          this.pushState(states.trackIdentifiers);
          run();
          this.trackedIdentifiers = null;
          this.popState(states.trackIdentifiers);
          return trackedIdentifiers;
        }
        getDeclaration(name2) {
          const { currentContext, currentFunctionContext, runningContexts } = this;
          const declaration = currentContext[name2] || currentFunctionContext[name2] || null;
          if (!declaration && currentContext === currentFunctionContext && runningContexts.length > 0) {
            const previousRunningContext = runningContexts[runningContexts.length - 2];
            if (previousRunningContext[name2]) {
              return previousRunningContext[name2];
            }
          }
          return declaration;
        }
        scan(ast) {
          if (!ast)
            return;
          if (Array.isArray(ast)) {
            for (let i = 0; i < ast.length; i++) {
              this.scan(ast[i]);
            }
            return;
          }
          switch (ast.type) {
            case "Program":
              this.useFunctionContext(() => {
                this.scan(ast.body);
              });
              break;
            case "BlockStatement":
              this.newContext(() => {
                this.scan(ast.body);
              });
              break;
            case "AssignmentExpression":
            case "LogicalExpression":
              this.scan(ast.left);
              this.scan(ast.right);
              break;
            case "BinaryExpression":
              this.scan(ast.left);
              this.scan(ast.right);
              break;
            case "UpdateExpression":
              if (ast.operator === "++") {
                const declaration = this.getDeclaration(ast.argument.name);
                if (declaration) {
                  declaration.suggestedType = "Integer";
                }
              }
              this.scan(ast.argument);
              break;
            case "UnaryExpression":
              this.scan(ast.argument);
              break;
            case "VariableDeclaration":
              if (ast.kind === "var") {
                this.useFunctionContext(() => {
                  ast.declarations = utils.normalizeDeclarations(ast);
                  this.scan(ast.declarations);
                });
              } else {
                ast.declarations = utils.normalizeDeclarations(ast);
                this.scan(ast.declarations);
              }
              break;
            case "VariableDeclarator": {
              const { currentContext } = this;
              const inForLoopInit = this.hasState(states.inForLoopInit);
              const declaration = {
                ast,
                context: currentContext,
                name: ast.id.name,
                origin: "declaration",
                inForLoopInit,
                inForLoopTest: null,
                assignable: currentContext === this.currentFunctionContext || !inForLoopInit && !currentContext.hasOwnProperty(ast.id.name),
                suggestedType: null,
                valueType: null,
                dependencies: null,
                isSafe: null
              };
              if (!currentContext[ast.id.name]) {
                currentContext[ast.id.name] = declaration;
              }
              this.declarations.push(declaration);
              this.scan(ast.id);
              this.scan(ast.init);
              break;
            }
            case "FunctionExpression":
            case "FunctionDeclaration":
              if (this.runningContexts.length === 0) {
                this.scan(ast.body);
              } else {
                this.functions.push(ast);
              }
              break;
            case "IfStatement":
              this.scan(ast.test);
              this.scan(ast.consequent);
              if (ast.alternate)
                this.scan(ast.alternate);
              break;
            case "ForStatement": {
              let testIdentifiers;
              const context = this.newContext(() => {
                this.pushState(states.inForLoopInit);
                this.scan(ast.init);
                this.popState(states.inForLoopInit);
                testIdentifiers = this.getIdentifiers(() => {
                  this.scan(ast.test);
                });
                this.scan(ast.update);
                this.newContext(() => {
                  this.scan(ast.body);
                });
              });
              if (testIdentifiers) {
                for (const p2 in context) {
                  if (p2 === "@contextType")
                    continue;
                  if (testIdentifiers.indexOf(p2) > -1) {
                    context[p2].inForLoopTest = true;
                  }
                }
              }
              break;
            }
            case "DoWhileStatement":
            case "WhileStatement":
              this.newContext(() => {
                this.scan(ast.body);
                this.scan(ast.test);
              });
              break;
            case "Identifier": {
              if (this.isState(states.trackIdentifiers)) {
                this.trackedIdentifiers.push(ast.name);
              }
              this.identifiers.push({
                context: this.currentContext,
                declaration: this.getDeclaration(ast.name),
                ast
              });
              break;
            }
            case "ReturnStatement":
              this.returnStatements.push(ast);
              this.scan(ast.argument);
              break;
            case "MemberExpression":
              this.pushState(states.memberExpression);
              this.scan(ast.object);
              this.scan(ast.property);
              this.popState(states.memberExpression);
              break;
            case "ExpressionStatement":
              this.scan(ast.expression);
              break;
            case "SequenceExpression":
              this.scan(ast.expressions);
              break;
            case "CallExpression":
              this.functionCalls.push({
                context: this.currentContext,
                ast
              });
              this.scan(ast.arguments);
              break;
            case "ArrayExpression":
              this.scan(ast.elements);
              break;
            case "ConditionalExpression":
              this.scan(ast.test);
              this.scan(ast.alternate);
              this.scan(ast.consequent);
              break;
            case "SwitchStatement":
              this.scan(ast.discriminant);
              this.scan(ast.cases);
              break;
            case "SwitchCase":
              this.scan(ast.test);
              this.scan(ast.consequent);
              break;
            case "ThisExpression":
            case "Literal":
            case "DebuggerStatement":
            case "EmptyStatement":
            case "BreakStatement":
            case "ContinueStatement":
              break;
            default:
              throw new Error(`unhandled type "${ast.type}"`);
          }
        }
      }
      module2.exports = {
        FunctionTracer
      };
    }, { "../utils": 114 }], 12: [function(require2, module2, exports2) {
      const { glWiretap } = require2("gl-wiretap");
      const { utils } = require2("../../utils");
      function toStringWithoutUtils(fn) {
        return fn.toString().replace("=>", "").replace(/^function /, "").replace(/utils[.]/g, "/*utils.*/");
      }
      function glKernelString(Kernel, args, originKernel, setupContextString, destroyContextString) {
        if (!originKernel.built) {
          originKernel.build.apply(originKernel, args);
        }
        args = args ? Array.from(args).map((arg) => {
          switch (typeof arg) {
            case "boolean":
              return new Boolean(arg);
            case "number":
              return new Number(arg);
            default:
              return arg;
          }
        }) : null;
        const postResult = [];
        const context = glWiretap(originKernel.context, {
          useTrackablePrimitives: true,
          onReadPixels: (targetName) => {
            if (kernel.subKernels) {
              if (!subKernelsResultVariableSetup) {
                postResult.push(`    const result = { result: ${getRenderString(targetName, kernel)} };`);
                subKernelsResultVariableSetup = true;
              } else {
                const property = kernel.subKernels[subKernelsResultIndex++].property;
                postResult.push(`    result${isNaN(property) ? "." + property : `[${property}]`} = ${getRenderString(targetName, kernel)};`);
              }
              if (subKernelsResultIndex === kernel.subKernels.length) {
                postResult.push("    return result;");
              }
              return;
            }
            if (targetName) {
              postResult.push(`    return ${getRenderString(targetName, kernel)};`);
            } else {
              postResult.push(`    return null;`);
            }
          },
          onUnrecognizedArgumentLookup: (argument) => {
            const argumentName = findKernelValue(argument, kernel.kernelArguments, [], context);
            if (argumentName) {
              return argumentName;
            }
            const constantName = findKernelValue(argument, kernel.kernelConstants, constants ? Object.keys(constants).map((key) => constants[key]) : [], context);
            if (constantName) {
              return constantName;
            }
            return null;
          }
        });
        let subKernelsResultVariableSetup = false;
        let subKernelsResultIndex = 0;
        const {
          source,
          canvas,
          output,
          pipeline,
          graphical,
          loopMaxIterations,
          constants,
          optimizeFloatMemory,
          precision,
          fixIntegerDivisionAccuracy,
          functions,
          nativeFunctions,
          subKernels,
          immutable,
          argumentTypes,
          constantTypes,
          kernelArguments,
          kernelConstants,
          tactic
        } = originKernel;
        const kernel = new Kernel(source, {
          canvas,
          context,
          checkContext: false,
          output,
          pipeline,
          graphical,
          loopMaxIterations,
          constants,
          optimizeFloatMemory,
          precision,
          fixIntegerDivisionAccuracy,
          functions,
          nativeFunctions,
          subKernels,
          immutable,
          argumentTypes,
          constantTypes,
          tactic
        });
        let result = [];
        context.setIndent(2);
        kernel.build.apply(kernel, args);
        result.push(context.toString());
        context.reset();
        kernel.kernelArguments.forEach((kernelArgument, i) => {
          switch (kernelArgument.type) {
            case "Integer":
            case "Boolean":
            case "Number":
            case "Float":
            case "Array":
            case "Array(2)":
            case "Array(3)":
            case "Array(4)":
            case "HTMLCanvas":
            case "HTMLImage":
            case "HTMLVideo":
              context.insertVariable(`uploadValue_${kernelArgument.name}`, kernelArgument.uploadValue);
              break;
            case "HTMLImageArray":
              for (let imageIndex = 0; imageIndex < args[i].length; imageIndex++) {
                const arg = args[i];
                context.insertVariable(`uploadValue_${kernelArgument.name}[${imageIndex}]`, arg[imageIndex]);
              }
              break;
            case "Input":
              context.insertVariable(`uploadValue_${kernelArgument.name}`, kernelArgument.uploadValue);
              break;
            case "MemoryOptimizedNumberTexture":
            case "NumberTexture":
            case "Array1D(2)":
            case "Array1D(3)":
            case "Array1D(4)":
            case "Array2D(2)":
            case "Array2D(3)":
            case "Array2D(4)":
            case "Array3D(2)":
            case "Array3D(3)":
            case "Array3D(4)":
            case "ArrayTexture(1)":
            case "ArrayTexture(2)":
            case "ArrayTexture(3)":
            case "ArrayTexture(4)":
              context.insertVariable(`uploadValue_${kernelArgument.name}`, args[i].texture);
              break;
            default:
              throw new Error(`unhandled kernelArgumentType insertion for glWiretap of type ${kernelArgument.type}`);
          }
        });
        result.push("/** start of injected functions **/");
        result.push(`function ${toStringWithoutUtils(utils.flattenTo)}`);
        result.push(`function ${toStringWithoutUtils(utils.flatten2dArrayTo)}`);
        result.push(`function ${toStringWithoutUtils(utils.flatten3dArrayTo)}`);
        result.push(`function ${toStringWithoutUtils(utils.flatten4dArrayTo)}`);
        result.push(`function ${toStringWithoutUtils(utils.isArray)}`);
        if (kernel.renderOutput !== kernel.renderTexture && kernel.formatValues) {
          result.push(`  const renderOutput = function ${toStringWithoutUtils(kernel.formatValues)};`);
        }
        result.push("/** end of injected functions **/");
        result.push(`  const innerKernel = function (${kernel.kernelArguments.map((kernelArgument) => kernelArgument.varName).join(", ")}) {`);
        context.setIndent(4);
        kernel.run.apply(kernel, args);
        if (kernel.renderKernels) {
          kernel.renderKernels();
        } else if (kernel.renderOutput) {
          kernel.renderOutput();
        }
        result.push("    /** start setup uploads for kernel values **/");
        kernel.kernelArguments.forEach((kernelArgument) => {
          result.push("    " + kernelArgument.getStringValueHandler().split("\n").join("\n    "));
        });
        result.push("    /** end setup uploads for kernel values **/");
        result.push(context.toString());
        if (kernel.renderOutput === kernel.renderTexture) {
          context.reset();
          const framebufferName = context.getContextVariableName(kernel.framebuffer);
          if (kernel.renderKernels) {
            const results = kernel.renderKernels();
            const textureName = context.getContextVariableName(kernel.texture.texture);
            result.push(`    return {
      result: {
        texture: ${textureName},
        type: '${results.result.type}',
        toArray: ${getToArrayString(results.result, textureName, framebufferName)}
      },`);
            const { subKernels: subKernels2, mappedTextures } = kernel;
            for (let i = 0; i < subKernels2.length; i++) {
              const texture = mappedTextures[i];
              const subKernel = subKernels2[i];
              const subKernelResult = results[subKernel.property];
              const subKernelTextureName = context.getContextVariableName(texture.texture);
              result.push(`
      ${subKernel.property}: {
        texture: ${subKernelTextureName},
        type: '${subKernelResult.type}',
        toArray: ${getToArrayString(subKernelResult, subKernelTextureName, framebufferName)}
      },`);
            }
            result.push(`    };`);
          } else {
            const rendered = kernel.renderOutput();
            const textureName = context.getContextVariableName(kernel.texture.texture);
            result.push(`    return {
        texture: ${textureName},
        type: '${rendered.type}',
        toArray: ${getToArrayString(rendered, textureName, framebufferName)}
      };`);
          }
        }
        result.push(`    ${destroyContextString ? "\n" + destroyContextString + "    " : ""}`);
        result.push(postResult.join("\n"));
        result.push("  };");
        if (kernel.graphical) {
          result.push(getGetPixelsString(kernel));
          result.push(`  innerKernel.getPixels = getPixels;`);
        }
        result.push("  return innerKernel;");
        let constantsUpload = [];
        kernelConstants.forEach((kernelConstant) => {
          constantsUpload.push(`${kernelConstant.getStringValueHandler()}`);
        });
        return `function kernel(settings) {
  const { context, constants } = settings;
  ${constantsUpload.join("")}
  ${setupContextString ? setupContextString : ""}
${result.join("\n")}
}`;
      }
      function getRenderString(targetName, kernel) {
        const readBackValue = kernel.precision === "single" ? targetName : `new Float32Array(${targetName}.buffer)`;
        if (kernel.output[2]) {
          return `renderOutput(${readBackValue}, ${kernel.output[0]}, ${kernel.output[1]}, ${kernel.output[2]})`;
        }
        if (kernel.output[1]) {
          return `renderOutput(${readBackValue}, ${kernel.output[0]}, ${kernel.output[1]})`;
        }
        return `renderOutput(${readBackValue}, ${kernel.output[0]})`;
      }
      function getGetPixelsString(kernel) {
        const getPixels = kernel.getPixels.toString();
        const useFunctionKeyword = !/^function/.test(getPixels);
        return utils.flattenFunctionToString(`${useFunctionKeyword ? "function " : ""}${getPixels}`, {
          findDependency: (object, name2) => {
            if (object === "utils") {
              return `const ${name2} = ${utils[name2].toString()};`;
            }
            return null;
          },
          thisLookup: (property) => {
            if (property === "context") {
              return null;
            }
            if (kernel.hasOwnProperty(property)) {
              return JSON.stringify(kernel[property]);
            }
            throw new Error(`unhandled thisLookup ${property}`);
          }
        });
      }
      function getToArrayString(kernelResult, textureName, framebufferName) {
        const toArray2 = kernelResult.toArray.toString();
        const useFunctionKeyword = !/^function/.test(toArray2);
        const flattenedFunctions = utils.flattenFunctionToString(`${useFunctionKeyword ? "function " : ""}${toArray2}`, {
          findDependency: (object, name2) => {
            if (object === "utils") {
              return `const ${name2} = ${utils[name2].toString()};`;
            } else if (object === "this") {
              if (name2 === "framebuffer") {
                return "";
              }
              return `${useFunctionKeyword ? "function " : ""}${kernelResult[name2].toString()}`;
            } else {
              throw new Error("unhandled fromObject");
            }
          },
          thisLookup: (property, isDeclaration) => {
            if (property === "texture") {
              return textureName;
            }
            if (property === "context") {
              if (isDeclaration)
                return null;
              return "gl";
            }
            if (kernelResult.hasOwnProperty(property)) {
              return JSON.stringify(kernelResult[property]);
            }
            throw new Error(`unhandled thisLookup ${property}`);
          }
        });
        return `() => {
  function framebuffer() { return ${framebufferName}; };
  ${flattenedFunctions}
  return toArray();
  }`;
      }
      function findKernelValue(argument, kernelValues, values, context, uploadedValues) {
        if (argument === null)
          return null;
        if (kernelValues === null)
          return null;
        switch (typeof argument) {
          case "boolean":
          case "number":
            return null;
        }
        if (typeof HTMLImageElement !== "undefined" && argument instanceof HTMLImageElement) {
          for (let i = 0; i < kernelValues.length; i++) {
            const kernelValue = kernelValues[i];
            if (kernelValue.type !== "HTMLImageArray" && kernelValue)
              continue;
            if (kernelValue.uploadValue !== argument)
              continue;
            const variableIndex = values[i].indexOf(argument);
            if (variableIndex === -1)
              continue;
            const variableName = `uploadValue_${kernelValue.name}[${variableIndex}]`;
            context.insertVariable(variableName, argument);
            return variableName;
          }
        }
        for (let i = 0; i < kernelValues.length; i++) {
          const kernelValue = kernelValues[i];
          if (argument !== kernelValue.uploadValue)
            continue;
          const variable = `uploadValue_${kernelValue.name}`;
          context.insertVariable(variable, kernelValue);
          return variable;
        }
        return null;
      }
      module2.exports = {
        glKernelString
      };
    }, { "../../utils": 114, "gl-wiretap": 3 }], 13: [function(require2, module2, exports2) {
      const { Kernel } = require2("../kernel");
      const { utils } = require2("../../utils");
      const { GLTextureArray2Float } = require2("./texture/array-2-float");
      const { GLTextureArray2Float2D } = require2("./texture/array-2-float-2d");
      const { GLTextureArray2Float3D } = require2("./texture/array-2-float-3d");
      const { GLTextureArray3Float } = require2("./texture/array-3-float");
      const { GLTextureArray3Float2D } = require2("./texture/array-3-float-2d");
      const { GLTextureArray3Float3D } = require2("./texture/array-3-float-3d");
      const { GLTextureArray4Float } = require2("./texture/array-4-float");
      const { GLTextureArray4Float2D } = require2("./texture/array-4-float-2d");
      const { GLTextureArray4Float3D } = require2("./texture/array-4-float-3d");
      const { GLTextureFloat } = require2("./texture/float");
      const { GLTextureFloat2D } = require2("./texture/float-2d");
      const { GLTextureFloat3D } = require2("./texture/float-3d");
      const { GLTextureMemoryOptimized } = require2("./texture/memory-optimized");
      const { GLTextureMemoryOptimized2D } = require2("./texture/memory-optimized-2d");
      const { GLTextureMemoryOptimized3D } = require2("./texture/memory-optimized-3d");
      const { GLTextureUnsigned } = require2("./texture/unsigned");
      const { GLTextureUnsigned2D } = require2("./texture/unsigned-2d");
      const { GLTextureUnsigned3D } = require2("./texture/unsigned-3d");
      const { GLTextureGraphical } = require2("./texture/graphical");
      class GLKernel extends Kernel {
        static get mode() {
          return "gpu";
        }
        static getIsFloatRead() {
          const kernelString = `function kernelFunction() {
      return 1;
    }`;
          const kernel = new this(kernelString, {
            context: this.testContext,
            canvas: this.testCanvas,
            validate: false,
            output: [1],
            precision: "single",
            returnType: "Number",
            tactic: "speed"
          });
          kernel.build();
          kernel.run();
          const result = kernel.renderOutput();
          kernel.destroy(true);
          return result[0] === 1;
        }
        static getIsIntegerDivisionAccurate() {
          function kernelFunction(v1, v2) {
            return v1[this.thread.x] / v2[this.thread.x];
          }
          const kernel = new this(kernelFunction.toString(), {
            context: this.testContext,
            canvas: this.testCanvas,
            validate: false,
            output: [2],
            returnType: "Number",
            precision: "unsigned",
            tactic: "speed"
          });
          const args = [
            [6, 6030401],
            [3, 3991]
          ];
          kernel.build.apply(kernel, args);
          kernel.run.apply(kernel, args);
          const result = kernel.renderOutput();
          kernel.destroy(true);
          return result[0] === 2 && result[1] === 1511;
        }
        static getIsSpeedTacticSupported() {
          function kernelFunction(value2) {
            return value2[this.thread.x];
          }
          const kernel = new this(kernelFunction.toString(), {
            context: this.testContext,
            canvas: this.testCanvas,
            validate: false,
            output: [4],
            returnType: "Number",
            precision: "unsigned",
            tactic: "speed"
          });
          const args = [
            [0, 1, 2, 3]
          ];
          kernel.build.apply(kernel, args);
          kernel.run.apply(kernel, args);
          const result = kernel.renderOutput();
          kernel.destroy(true);
          return Math.round(result[0]) === 0 && Math.round(result[1]) === 1 && Math.round(result[2]) === 2 && Math.round(result[3]) === 3;
        }
        static get testCanvas() {
          throw new Error(`"testCanvas" not defined on ${this.name}`);
        }
        static get testContext() {
          throw new Error(`"testContext" not defined on ${this.name}`);
        }
        static getFeatures() {
          const gl = this.testContext;
          const isDrawBuffers = this.getIsDrawBuffers();
          return Object.freeze({
            isFloatRead: this.getIsFloatRead(),
            isIntegerDivisionAccurate: this.getIsIntegerDivisionAccurate(),
            isSpeedTacticSupported: this.getIsSpeedTacticSupported(),
            isTextureFloat: this.getIsTextureFloat(),
            isDrawBuffers,
            kernelMap: isDrawBuffers,
            channelCount: this.getChannelCount(),
            maxTextureSize: this.getMaxTextureSize(),
            lowIntPrecision: gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT),
            lowFloatPrecision: gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT),
            mediumIntPrecision: gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT),
            mediumFloatPrecision: gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT),
            highIntPrecision: gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT),
            highFloatPrecision: gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT)
          });
        }
        static setupFeatureChecks() {
          throw new Error(`"setupFeatureChecks" not defined on ${this.name}`);
        }
        static getSignature(kernel, argumentTypes) {
          return kernel.getVariablePrecisionString() + (argumentTypes.length > 0 ? ":" + argumentTypes.join(",") : "");
        }
        setFixIntegerDivisionAccuracy(fix) {
          this.fixIntegerDivisionAccuracy = fix;
          return this;
        }
        setPrecision(flag) {
          this.precision = flag;
          return this;
        }
        setFloatTextures(flag) {
          utils.warnDeprecated("method", "setFloatTextures", "setOptimizeFloatMemory");
          this.floatTextures = flag;
          return this;
        }
        static nativeFunctionArguments(source) {
          const argumentTypes = [];
          const argumentNames = [];
          const states = [];
          const isStartingVariableName = /^[a-zA-Z_]/;
          const isVariableChar = /[a-zA-Z_0-9]/;
          let i = 0;
          let argumentName = null;
          let argumentType = null;
          while (i < source.length) {
            const char = source[i];
            const nextChar = source[i + 1];
            const state = states.length > 0 ? states[states.length - 1] : null;
            if (state === "FUNCTION_ARGUMENTS" && char === "/" && nextChar === "*") {
              states.push("MULTI_LINE_COMMENT");
              i += 2;
              continue;
            } else if (state === "MULTI_LINE_COMMENT" && char === "*" && nextChar === "/") {
              states.pop();
              i += 2;
              continue;
            } else if (state === "FUNCTION_ARGUMENTS" && char === "/" && nextChar === "/") {
              states.push("COMMENT");
              i += 2;
              continue;
            } else if (state === "COMMENT" && char === "\n") {
              states.pop();
              i++;
              continue;
            } else if (state === null && char === "(") {
              states.push("FUNCTION_ARGUMENTS");
              i++;
              continue;
            } else if (state === "FUNCTION_ARGUMENTS") {
              if (char === ")") {
                states.pop();
                break;
              }
              if (char === "f" && nextChar === "l" && source[i + 2] === "o" && source[i + 3] === "a" && source[i + 4] === "t" && source[i + 5] === " ") {
                states.push("DECLARE_VARIABLE");
                argumentType = "float";
                argumentName = "";
                i += 6;
                continue;
              } else if (char === "i" && nextChar === "n" && source[i + 2] === "t" && source[i + 3] === " ") {
                states.push("DECLARE_VARIABLE");
                argumentType = "int";
                argumentName = "";
                i += 4;
                continue;
              } else if (char === "v" && nextChar === "e" && source[i + 2] === "c" && source[i + 3] === "2" && source[i + 4] === " ") {
                states.push("DECLARE_VARIABLE");
                argumentType = "vec2";
                argumentName = "";
                i += 5;
                continue;
              } else if (char === "v" && nextChar === "e" && source[i + 2] === "c" && source[i + 3] === "3" && source[i + 4] === " ") {
                states.push("DECLARE_VARIABLE");
                argumentType = "vec3";
                argumentName = "";
                i += 5;
                continue;
              } else if (char === "v" && nextChar === "e" && source[i + 2] === "c" && source[i + 3] === "4" && source[i + 4] === " ") {
                states.push("DECLARE_VARIABLE");
                argumentType = "vec4";
                argumentName = "";
                i += 5;
                continue;
              }
            } else if (state === "DECLARE_VARIABLE") {
              if (argumentName === "") {
                if (char === " ") {
                  i++;
                  continue;
                }
                if (!isStartingVariableName.test(char)) {
                  throw new Error("variable name is not expected string");
                }
              }
              argumentName += char;
              if (!isVariableChar.test(nextChar)) {
                states.pop();
                argumentNames.push(argumentName);
                argumentTypes.push(typeMap[argumentType]);
              }
            }
            i++;
          }
          if (states.length > 0) {
            throw new Error("GLSL function was not parsable");
          }
          return {
            argumentNames,
            argumentTypes
          };
        }
        static nativeFunctionReturnType(source) {
          return typeMap[source.match(/int|float|vec[2-4]/)[0]];
        }
        static combineKernels(combinedKernel, lastKernel) {
          combinedKernel.apply(null, arguments);
          const {
            texSize,
            context,
            threadDim
          } = lastKernel.texSize;
          let result;
          if (lastKernel.precision === "single") {
            const w = texSize[0];
            const h = Math.ceil(texSize[1] / 4);
            result = new Float32Array(w * h * 4 * 4);
            context.readPixels(0, 0, w, h * 4, context.RGBA, context.FLOAT, result);
          } else {
            const bytes = new Uint8Array(texSize[0] * texSize[1] * 4);
            context.readPixels(0, 0, texSize[0], texSize[1], context.RGBA, context.UNSIGNED_BYTE, bytes);
            result = new Float32Array(bytes.buffer);
          }
          result = result.subarray(0, threadDim[0] * threadDim[1] * threadDim[2]);
          if (lastKernel.output.length === 1) {
            return result;
          } else if (lastKernel.output.length === 2) {
            return utils.splitArray(result, lastKernel.output[0]);
          } else if (lastKernel.output.length === 3) {
            const cube = utils.splitArray(result, lastKernel.output[0] * lastKernel.output[1]);
            return cube.map(function(x) {
              return utils.splitArray(x, lastKernel.output[0]);
            });
          }
        }
        constructor(source, settings) {
          super(source, settings);
          this.transferValues = null;
          this.formatValues = null;
          this.TextureConstructor = null;
          this.renderOutput = null;
          this.renderRawOutput = null;
          this.texSize = null;
          this.translatedSource = null;
          this.compiledFragmentShader = null;
          this.compiledVertexShader = null;
          this.switchingKernels = null;
          this._textureSwitched = null;
          this._mappedTextureSwitched = null;
        }
        checkTextureSize() {
          const { features } = this.constructor;
          if (this.texSize[0] > features.maxTextureSize || this.texSize[1] > features.maxTextureSize) {
            throw new Error(`Texture size [${this.texSize[0]},${this.texSize[1]}] generated by kernel is larger than supported size [${features.maxTextureSize},${features.maxTextureSize}]`);
          }
        }
        translateSource() {
          throw new Error(`"translateSource" not defined on ${this.constructor.name}`);
        }
        pickRenderStrategy(args) {
          if (this.graphical) {
            this.renderRawOutput = this.readPackedPixelsToUint8Array;
            this.transferValues = (pixels) => pixels;
            this.TextureConstructor = GLTextureGraphical;
            return null;
          }
          if (this.precision === "unsigned") {
            this.renderRawOutput = this.readPackedPixelsToUint8Array;
            this.transferValues = this.readPackedPixelsToFloat32Array;
            if (this.pipeline) {
              this.renderOutput = this.renderTexture;
              if (this.subKernels !== null) {
                this.renderKernels = this.renderKernelsToTextures;
              }
              switch (this.returnType) {
                case "LiteralInteger":
                case "Float":
                case "Number":
                case "Integer":
                  if (this.output[2] > 0) {
                    this.TextureConstructor = GLTextureUnsigned3D;
                    return null;
                  } else if (this.output[1] > 0) {
                    this.TextureConstructor = GLTextureUnsigned2D;
                    return null;
                  } else {
                    this.TextureConstructor = GLTextureUnsigned;
                    return null;
                  }
                case "Array(2)":
                case "Array(3)":
                case "Array(4)":
                  return this.requestFallback(args);
              }
            } else {
              if (this.subKernels !== null) {
                this.renderKernels = this.renderKernelsToArrays;
              }
              switch (this.returnType) {
                case "LiteralInteger":
                case "Float":
                case "Number":
                case "Integer":
                  this.renderOutput = this.renderValues;
                  if (this.output[2] > 0) {
                    this.TextureConstructor = GLTextureUnsigned3D;
                    this.formatValues = utils.erect3DPackedFloat;
                    return null;
                  } else if (this.output[1] > 0) {
                    this.TextureConstructor = GLTextureUnsigned2D;
                    this.formatValues = utils.erect2DPackedFloat;
                    return null;
                  } else {
                    this.TextureConstructor = GLTextureUnsigned;
                    this.formatValues = utils.erectPackedFloat;
                    return null;
                  }
                case "Array(2)":
                case "Array(3)":
                case "Array(4)":
                  return this.requestFallback(args);
              }
            }
          } else if (this.precision === "single") {
            this.renderRawOutput = this.readFloatPixelsToFloat32Array;
            this.transferValues = this.readFloatPixelsToFloat32Array;
            if (this.pipeline) {
              this.renderOutput = this.renderTexture;
              if (this.subKernels !== null) {
                this.renderKernels = this.renderKernelsToTextures;
              }
              switch (this.returnType) {
                case "LiteralInteger":
                case "Float":
                case "Number":
                case "Integer": {
                  if (this.optimizeFloatMemory) {
                    if (this.output[2] > 0) {
                      this.TextureConstructor = GLTextureMemoryOptimized3D;
                      return null;
                    } else if (this.output[1] > 0) {
                      this.TextureConstructor = GLTextureMemoryOptimized2D;
                      return null;
                    } else {
                      this.TextureConstructor = GLTextureMemoryOptimized;
                      return null;
                    }
                  } else {
                    if (this.output[2] > 0) {
                      this.TextureConstructor = GLTextureFloat3D;
                      return null;
                    } else if (this.output[1] > 0) {
                      this.TextureConstructor = GLTextureFloat2D;
                      return null;
                    } else {
                      this.TextureConstructor = GLTextureFloat;
                      return null;
                    }
                  }
                }
                case "Array(2)": {
                  if (this.output[2] > 0) {
                    this.TextureConstructor = GLTextureArray2Float3D;
                    return null;
                  } else if (this.output[1] > 0) {
                    this.TextureConstructor = GLTextureArray2Float2D;
                    return null;
                  } else {
                    this.TextureConstructor = GLTextureArray2Float;
                    return null;
                  }
                }
                case "Array(3)": {
                  if (this.output[2] > 0) {
                    this.TextureConstructor = GLTextureArray3Float3D;
                    return null;
                  } else if (this.output[1] > 0) {
                    this.TextureConstructor = GLTextureArray3Float2D;
                    return null;
                  } else {
                    this.TextureConstructor = GLTextureArray3Float;
                    return null;
                  }
                }
                case "Array(4)": {
                  if (this.output[2] > 0) {
                    this.TextureConstructor = GLTextureArray4Float3D;
                    return null;
                  } else if (this.output[1] > 0) {
                    this.TextureConstructor = GLTextureArray4Float2D;
                    return null;
                  } else {
                    this.TextureConstructor = GLTextureArray4Float;
                    return null;
                  }
                }
              }
            }
            this.renderOutput = this.renderValues;
            if (this.subKernels !== null) {
              this.renderKernels = this.renderKernelsToArrays;
            }
            if (this.optimizeFloatMemory) {
              switch (this.returnType) {
                case "LiteralInteger":
                case "Float":
                case "Number":
                case "Integer": {
                  if (this.output[2] > 0) {
                    this.TextureConstructor = GLTextureMemoryOptimized3D;
                    this.formatValues = utils.erectMemoryOptimized3DFloat;
                    return null;
                  } else if (this.output[1] > 0) {
                    this.TextureConstructor = GLTextureMemoryOptimized2D;
                    this.formatValues = utils.erectMemoryOptimized2DFloat;
                    return null;
                  } else {
                    this.TextureConstructor = GLTextureMemoryOptimized;
                    this.formatValues = utils.erectMemoryOptimizedFloat;
                    return null;
                  }
                }
                case "Array(2)": {
                  if (this.output[2] > 0) {
                    this.TextureConstructor = GLTextureArray2Float3D;
                    this.formatValues = utils.erect3DArray2;
                    return null;
                  } else if (this.output[1] > 0) {
                    this.TextureConstructor = GLTextureArray2Float2D;
                    this.formatValues = utils.erect2DArray2;
                    return null;
                  } else {
                    this.TextureConstructor = GLTextureArray2Float;
                    this.formatValues = utils.erectArray2;
                    return null;
                  }
                }
                case "Array(3)": {
                  if (this.output[2] > 0) {
                    this.TextureConstructor = GLTextureArray3Float3D;
                    this.formatValues = utils.erect3DArray3;
                    return null;
                  } else if (this.output[1] > 0) {
                    this.TextureConstructor = GLTextureArray3Float2D;
                    this.formatValues = utils.erect2DArray3;
                    return null;
                  } else {
                    this.TextureConstructor = GLTextureArray3Float;
                    this.formatValues = utils.erectArray3;
                    return null;
                  }
                }
                case "Array(4)": {
                  if (this.output[2] > 0) {
                    this.TextureConstructor = GLTextureArray4Float3D;
                    this.formatValues = utils.erect3DArray4;
                    return null;
                  } else if (this.output[1] > 0) {
                    this.TextureConstructor = GLTextureArray4Float2D;
                    this.formatValues = utils.erect2DArray4;
                    return null;
                  } else {
                    this.TextureConstructor = GLTextureArray4Float;
                    this.formatValues = utils.erectArray4;
                    return null;
                  }
                }
              }
            } else {
              switch (this.returnType) {
                case "LiteralInteger":
                case "Float":
                case "Number":
                case "Integer": {
                  if (this.output[2] > 0) {
                    this.TextureConstructor = GLTextureFloat3D;
                    this.formatValues = utils.erect3DFloat;
                    return null;
                  } else if (this.output[1] > 0) {
                    this.TextureConstructor = GLTextureFloat2D;
                    this.formatValues = utils.erect2DFloat;
                    return null;
                  } else {
                    this.TextureConstructor = GLTextureFloat;
                    this.formatValues = utils.erectFloat;
                    return null;
                  }
                }
                case "Array(2)": {
                  if (this.output[2] > 0) {
                    this.TextureConstructor = GLTextureArray2Float3D;
                    this.formatValues = utils.erect3DArray2;
                    return null;
                  } else if (this.output[1] > 0) {
                    this.TextureConstructor = GLTextureArray2Float2D;
                    this.formatValues = utils.erect2DArray2;
                    return null;
                  } else {
                    this.TextureConstructor = GLTextureArray2Float;
                    this.formatValues = utils.erectArray2;
                    return null;
                  }
                }
                case "Array(3)": {
                  if (this.output[2] > 0) {
                    this.TextureConstructor = GLTextureArray3Float3D;
                    this.formatValues = utils.erect3DArray3;
                    return null;
                  } else if (this.output[1] > 0) {
                    this.TextureConstructor = GLTextureArray3Float2D;
                    this.formatValues = utils.erect2DArray3;
                    return null;
                  } else {
                    this.TextureConstructor = GLTextureArray3Float;
                    this.formatValues = utils.erectArray3;
                    return null;
                  }
                }
                case "Array(4)": {
                  if (this.output[2] > 0) {
                    this.TextureConstructor = GLTextureArray4Float3D;
                    this.formatValues = utils.erect3DArray4;
                    return null;
                  } else if (this.output[1] > 0) {
                    this.TextureConstructor = GLTextureArray4Float2D;
                    this.formatValues = utils.erect2DArray4;
                    return null;
                  } else {
                    this.TextureConstructor = GLTextureArray4Float;
                    this.formatValues = utils.erectArray4;
                    return null;
                  }
                }
              }
            }
          } else {
            throw new Error(`unhandled precision of "${this.precision}"`);
          }
          throw new Error(`unhandled return type "${this.returnType}"`);
        }
        getKernelString() {
          throw new Error(`abstract method call`);
        }
        getMainResultTexture() {
          switch (this.returnType) {
            case "LiteralInteger":
            case "Float":
            case "Integer":
            case "Number":
              return this.getMainResultNumberTexture();
            case "Array(2)":
              return this.getMainResultArray2Texture();
            case "Array(3)":
              return this.getMainResultArray3Texture();
            case "Array(4)":
              return this.getMainResultArray4Texture();
            default:
              throw new Error(`unhandled returnType type ${this.returnType}`);
          }
        }
        getMainResultKernelNumberTexture() {
          throw new Error(`abstract method call`);
        }
        getMainResultSubKernelNumberTexture() {
          throw new Error(`abstract method call`);
        }
        getMainResultKernelArray2Texture() {
          throw new Error(`abstract method call`);
        }
        getMainResultSubKernelArray2Texture() {
          throw new Error(`abstract method call`);
        }
        getMainResultKernelArray3Texture() {
          throw new Error(`abstract method call`);
        }
        getMainResultSubKernelArray3Texture() {
          throw new Error(`abstract method call`);
        }
        getMainResultKernelArray4Texture() {
          throw new Error(`abstract method call`);
        }
        getMainResultSubKernelArray4Texture() {
          throw new Error(`abstract method call`);
        }
        getMainResultGraphical() {
          throw new Error(`abstract method call`);
        }
        getMainResultMemoryOptimizedFloats() {
          throw new Error(`abstract method call`);
        }
        getMainResultPackedPixels() {
          throw new Error(`abstract method call`);
        }
        getMainResultString() {
          if (this.graphical) {
            return this.getMainResultGraphical();
          } else if (this.precision === "single") {
            if (this.optimizeFloatMemory) {
              return this.getMainResultMemoryOptimizedFloats();
            }
            return this.getMainResultTexture();
          } else {
            return this.getMainResultPackedPixels();
          }
        }
        getMainResultNumberTexture() {
          return utils.linesToString(this.getMainResultKernelNumberTexture()) + utils.linesToString(this.getMainResultSubKernelNumberTexture());
        }
        getMainResultArray2Texture() {
          return utils.linesToString(this.getMainResultKernelArray2Texture()) + utils.linesToString(this.getMainResultSubKernelArray2Texture());
        }
        getMainResultArray3Texture() {
          return utils.linesToString(this.getMainResultKernelArray3Texture()) + utils.linesToString(this.getMainResultSubKernelArray3Texture());
        }
        getMainResultArray4Texture() {
          return utils.linesToString(this.getMainResultKernelArray4Texture()) + utils.linesToString(this.getMainResultSubKernelArray4Texture());
        }
        getFloatTacticDeclaration() {
          const variablePrecision = this.getVariablePrecisionString(this.texSize, this.tactic);
          return `precision ${variablePrecision} float;
`;
        }
        getIntTacticDeclaration() {
          return `precision ${this.getVariablePrecisionString(this.texSize, this.tactic, true)} int;
`;
        }
        getSampler2DTacticDeclaration() {
          return `precision ${this.getVariablePrecisionString(this.texSize, this.tactic)} sampler2D;
`;
        }
        getSampler2DArrayTacticDeclaration() {
          return `precision ${this.getVariablePrecisionString(this.texSize, this.tactic)} sampler2DArray;
`;
        }
        renderTexture() {
          return this.immutable ? this.texture.clone() : this.texture;
        }
        readPackedPixelsToUint8Array() {
          if (this.precision !== "unsigned")
            throw new Error('Requires this.precision to be "unsigned"');
          const {
            texSize,
            context: gl
          } = this;
          const result = new Uint8Array(texSize[0] * texSize[1] * 4);
          gl.readPixels(0, 0, texSize[0], texSize[1], gl.RGBA, gl.UNSIGNED_BYTE, result);
          return result;
        }
        readPackedPixelsToFloat32Array() {
          return new Float32Array(this.readPackedPixelsToUint8Array().buffer);
        }
        readFloatPixelsToFloat32Array() {
          if (this.precision !== "single")
            throw new Error('Requires this.precision to be "single"');
          const {
            texSize,
            context: gl
          } = this;
          const w = texSize[0];
          const h = texSize[1];
          const result = new Float32Array(w * h * 4);
          gl.readPixels(0, 0, w, h, gl.RGBA, gl.FLOAT, result);
          return result;
        }
        getPixels(flip) {
          const {
            context: gl,
            output
          } = this;
          const [width, height] = output;
          const pixels = new Uint8Array(width * height * 4);
          gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
          return new Uint8ClampedArray((flip ? pixels : utils.flipPixels(pixels, width, height)).buffer);
        }
        renderKernelsToArrays() {
          const result = {
            result: this.renderOutput()
          };
          for (let i = 0; i < this.subKernels.length; i++) {
            result[this.subKernels[i].property] = this.mappedTextures[i].toArray();
          }
          return result;
        }
        renderKernelsToTextures() {
          const result = {
            result: this.renderOutput()
          };
          if (this.immutable) {
            for (let i = 0; i < this.subKernels.length; i++) {
              result[this.subKernels[i].property] = this.mappedTextures[i].clone();
            }
          } else {
            for (let i = 0; i < this.subKernels.length; i++) {
              result[this.subKernels[i].property] = this.mappedTextures[i];
            }
          }
          return result;
        }
        resetSwitchingKernels() {
          const existingValue = this.switchingKernels;
          this.switchingKernels = null;
          return existingValue;
        }
        setOutput(output) {
          const newOutput = this.toKernelOutput(output);
          if (this.program) {
            if (!this.dynamicOutput) {
              throw new Error("Resizing a kernel with dynamicOutput: false is not possible");
            }
            const newThreadDim = [newOutput[0], newOutput[1] || 1, newOutput[2] || 1];
            const newTexSize = utils.getKernelTextureSize({
              optimizeFloatMemory: this.optimizeFloatMemory,
              precision: this.precision
            }, newThreadDim);
            const oldTexSize = this.texSize;
            if (oldTexSize) {
              const oldPrecision = this.getVariablePrecisionString(oldTexSize, this.tactic);
              const newPrecision = this.getVariablePrecisionString(newTexSize, this.tactic);
              if (oldPrecision !== newPrecision) {
                if (this.debug) {
                  console.warn("Precision requirement changed, asking GPU instance to recompile");
                }
                this.switchKernels({
                  type: "outputPrecisionMismatch",
                  precision: newPrecision,
                  needed: output
                });
                return;
              }
            }
            this.output = newOutput;
            this.threadDim = newThreadDim;
            this.texSize = newTexSize;
            const { context: gl } = this;
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
            this.updateMaxTexSize();
            this.framebuffer.width = this.texSize[0];
            this.framebuffer.height = this.texSize[1];
            gl.viewport(0, 0, this.maxTexSize[0], this.maxTexSize[1]);
            this.canvas.width = this.maxTexSize[0];
            this.canvas.height = this.maxTexSize[1];
            if (this.texture) {
              this.texture.delete();
            }
            this.texture = null;
            this._setupOutputTexture();
            if (this.mappedTextures && this.mappedTextures.length > 0) {
              for (let i = 0; i < this.mappedTextures.length; i++) {
                this.mappedTextures[i].delete();
              }
              this.mappedTextures = null;
              this._setupSubOutputTextures();
            }
          } else {
            this.output = newOutput;
          }
          return this;
        }
        renderValues() {
          return this.formatValues(this.transferValues(), this.output[0], this.output[1], this.output[2]);
        }
        switchKernels(reason) {
          if (this.switchingKernels) {
            this.switchingKernels.push(reason);
          } else {
            this.switchingKernels = [reason];
          }
        }
        getVariablePrecisionString(textureSize = this.texSize, tactic = this.tactic, isInt = false) {
          if (!tactic) {
            if (!this.constructor.features.isSpeedTacticSupported)
              return "highp";
            const low = this.constructor.features[isInt ? "lowIntPrecision" : "lowFloatPrecision"];
            const medium = this.constructor.features[isInt ? "mediumIntPrecision" : "mediumFloatPrecision"];
            const high = this.constructor.features[isInt ? "highIntPrecision" : "highFloatPrecision"];
            const requiredSize = Math.log2(textureSize[0] * textureSize[1]);
            if (requiredSize <= low.rangeMax) {
              return "lowp";
            } else if (requiredSize <= medium.rangeMax) {
              return "mediump";
            } else if (requiredSize <= high.rangeMax) {
              return "highp";
            } else {
              throw new Error(`The required size exceeds that of the ability of your system`);
            }
          }
          switch (tactic) {
            case "speed":
              return "lowp";
            case "balanced":
              return "mediump";
            case "precision":
              return "highp";
            default:
              throw new Error(`Unknown tactic "${tactic}" use "speed", "balanced", "precision", or empty for auto`);
          }
        }
        updateTextureArgumentRefs(kernelValue, arg) {
          if (!this.immutable)
            return;
          if (this.texture.texture === arg.texture) {
            const { prevArg } = kernelValue;
            if (prevArg) {
              if (prevArg.texture._refs === 1) {
                this.texture.delete();
                this.texture = prevArg.clone();
                this._textureSwitched = true;
              }
              prevArg.delete();
            }
            kernelValue.prevArg = arg.clone();
          } else if (this.mappedTextures && this.mappedTextures.length > 0) {
            const { mappedTextures } = this;
            for (let i = 0; i < mappedTextures.length; i++) {
              const mappedTexture = mappedTextures[i];
              if (mappedTexture.texture === arg.texture) {
                const { prevArg } = kernelValue;
                if (prevArg) {
                  if (prevArg.texture._refs === 1) {
                    mappedTexture.delete();
                    mappedTextures[i] = prevArg.clone();
                    this._mappedTextureSwitched[i] = true;
                  }
                  prevArg.delete();
                }
                kernelValue.prevArg = arg.clone();
                return;
              }
            }
          }
        }
        onActivate(previousKernel) {
          this._textureSwitched = true;
          this.texture = previousKernel.texture;
          if (this.mappedTextures) {
            for (let i = 0; i < this.mappedTextures.length; i++) {
              this._mappedTextureSwitched[i] = true;
            }
            this.mappedTextures = previousKernel.mappedTextures;
          }
        }
        initCanvas() {
        }
      }
      const typeMap = {
        int: "Integer",
        float: "Number",
        vec2: "Array(2)",
        vec3: "Array(3)",
        vec4: "Array(4)"
      };
      module2.exports = {
        GLKernel
      };
    }, { "../../utils": 114, "../kernel": 36, "./texture/array-2-float": 16, "./texture/array-2-float-2d": 14, "./texture/array-2-float-3d": 15, "./texture/array-3-float": 19, "./texture/array-3-float-2d": 17, "./texture/array-3-float-3d": 18, "./texture/array-4-float": 22, "./texture/array-4-float-2d": 20, "./texture/array-4-float-3d": 21, "./texture/float": 25, "./texture/float-2d": 23, "./texture/float-3d": 24, "./texture/graphical": 26, "./texture/memory-optimized": 30, "./texture/memory-optimized-2d": 28, "./texture/memory-optimized-3d": 29, "./texture/unsigned": 33, "./texture/unsigned-2d": 31, "./texture/unsigned-3d": 32 }], 14: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { GLTextureFloat } = require2("./float");
      class GLTextureArray2Float2D extends GLTextureFloat {
        constructor(settings) {
          super(settings);
          this.type = "ArrayTexture(2)";
        }
        toArray() {
          return utils.erect2DArray2(this.renderValues(), this.output[0], this.output[1]);
        }
      }
      module2.exports = {
        GLTextureArray2Float2D
      };
    }, { "../../../utils": 114, "./float": 25 }], 15: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { GLTextureFloat } = require2("./float");
      class GLTextureArray2Float3D extends GLTextureFloat {
        constructor(settings) {
          super(settings);
          this.type = "ArrayTexture(2)";
        }
        toArray() {
          return utils.erect3DArray2(this.renderValues(), this.output[0], this.output[1], this.output[2]);
        }
      }
      module2.exports = {
        GLTextureArray2Float3D
      };
    }, { "../../../utils": 114, "./float": 25 }], 16: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { GLTextureFloat } = require2("./float");
      class GLTextureArray2Float extends GLTextureFloat {
        constructor(settings) {
          super(settings);
          this.type = "ArrayTexture(2)";
        }
        toArray() {
          return utils.erectArray2(this.renderValues(), this.output[0], this.output[1]);
        }
      }
      module2.exports = {
        GLTextureArray2Float
      };
    }, { "../../../utils": 114, "./float": 25 }], 17: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { GLTextureFloat } = require2("./float");
      class GLTextureArray3Float2D extends GLTextureFloat {
        constructor(settings) {
          super(settings);
          this.type = "ArrayTexture(3)";
        }
        toArray() {
          return utils.erect2DArray3(this.renderValues(), this.output[0], this.output[1]);
        }
      }
      module2.exports = {
        GLTextureArray3Float2D
      };
    }, { "../../../utils": 114, "./float": 25 }], 18: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { GLTextureFloat } = require2("./float");
      class GLTextureArray3Float3D extends GLTextureFloat {
        constructor(settings) {
          super(settings);
          this.type = "ArrayTexture(3)";
        }
        toArray() {
          return utils.erect3DArray3(this.renderValues(), this.output[0], this.output[1], this.output[2]);
        }
      }
      module2.exports = {
        GLTextureArray3Float3D
      };
    }, { "../../../utils": 114, "./float": 25 }], 19: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { GLTextureFloat } = require2("./float");
      class GLTextureArray3Float extends GLTextureFloat {
        constructor(settings) {
          super(settings);
          this.type = "ArrayTexture(3)";
        }
        toArray() {
          return utils.erectArray3(this.renderValues(), this.output[0]);
        }
      }
      module2.exports = {
        GLTextureArray3Float
      };
    }, { "../../../utils": 114, "./float": 25 }], 20: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { GLTextureFloat } = require2("./float");
      class GLTextureArray4Float2D extends GLTextureFloat {
        constructor(settings) {
          super(settings);
          this.type = "ArrayTexture(4)";
        }
        toArray() {
          return utils.erect2DArray4(this.renderValues(), this.output[0], this.output[1]);
        }
      }
      module2.exports = {
        GLTextureArray4Float2D
      };
    }, { "../../../utils": 114, "./float": 25 }], 21: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { GLTextureFloat } = require2("./float");
      class GLTextureArray4Float3D extends GLTextureFloat {
        constructor(settings) {
          super(settings);
          this.type = "ArrayTexture(4)";
        }
        toArray() {
          return utils.erect3DArray4(this.renderValues(), this.output[0], this.output[1], this.output[2]);
        }
      }
      module2.exports = {
        GLTextureArray4Float3D
      };
    }, { "../../../utils": 114, "./float": 25 }], 22: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { GLTextureFloat } = require2("./float");
      class GLTextureArray4Float extends GLTextureFloat {
        constructor(settings) {
          super(settings);
          this.type = "ArrayTexture(4)";
        }
        toArray() {
          return utils.erectArray4(this.renderValues(), this.output[0]);
        }
      }
      module2.exports = {
        GLTextureArray4Float
      };
    }, { "../../../utils": 114, "./float": 25 }], 23: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { GLTextureFloat } = require2("./float");
      class GLTextureFloat2D extends GLTextureFloat {
        constructor(settings) {
          super(settings);
          this.type = "ArrayTexture(1)";
        }
        toArray() {
          return utils.erect2DFloat(this.renderValues(), this.output[0], this.output[1]);
        }
      }
      module2.exports = {
        GLTextureFloat2D
      };
    }, { "../../../utils": 114, "./float": 25 }], 24: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { GLTextureFloat } = require2("./float");
      class GLTextureFloat3D extends GLTextureFloat {
        constructor(settings) {
          super(settings);
          this.type = "ArrayTexture(1)";
        }
        toArray() {
          return utils.erect3DFloat(this.renderValues(), this.output[0], this.output[1], this.output[2]);
        }
      }
      module2.exports = {
        GLTextureFloat3D
      };
    }, { "../../../utils": 114, "./float": 25 }], 25: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { GLTexture } = require2("./index");
      class GLTextureFloat extends GLTexture {
        get textureType() {
          return this.context.FLOAT;
        }
        constructor(settings) {
          super(settings);
          this.type = "ArrayTexture(1)";
        }
        renderRawOutput() {
          const gl = this.context;
          const size = this.size;
          gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer());
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
          const result = new Float32Array(size[0] * size[1] * 4);
          gl.readPixels(0, 0, size[0], size[1], gl.RGBA, gl.FLOAT, result);
          return result;
        }
        renderValues() {
          if (this._deleted)
            return null;
          return this.renderRawOutput();
        }
        toArray() {
          return utils.erectFloat(this.renderValues(), this.output[0]);
        }
      }
      module2.exports = {
        GLTextureFloat
      };
    }, { "../../../utils": 114, "./index": 27 }], 26: [function(require2, module2, exports2) {
      const { GLTextureUnsigned } = require2("./unsigned");
      class GLTextureGraphical extends GLTextureUnsigned {
        constructor(settings) {
          super(settings);
          this.type = "ArrayTexture(4)";
        }
        toArray() {
          return this.renderValues();
        }
      }
      module2.exports = {
        GLTextureGraphical
      };
    }, { "./unsigned": 33 }], 27: [function(require2, module2, exports2) {
      const { Texture } = require2("../../../texture");
      class GLTexture extends Texture {
        get textureType() {
          throw new Error(`"textureType" not implemented on ${this.name}`);
        }
        clone() {
          return new this.constructor(this);
        }
        beforeMutate() {
          if (this.texture._refs > 1) {
            this.newTexture();
            return true;
          }
          return false;
        }
        cloneTexture() {
          this.texture._refs--;
          const { context: gl, size, texture, kernel } = this;
          if (kernel.debug) {
            console.warn("cloning internal texture");
          }
          gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer());
          selectTexture(gl, texture);
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
          const target2 = gl.createTexture();
          selectTexture(gl, target2);
          gl.texImage2D(gl.TEXTURE_2D, 0, this.internalFormat, size[0], size[1], 0, this.textureFormat, this.textureType, null);
          gl.copyTexSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 0, 0, size[0], size[1]);
          target2._refs = 1;
          this.texture = target2;
        }
        newTexture() {
          this.texture._refs--;
          const gl = this.context;
          const size = this.size;
          const kernel = this.kernel;
          if (kernel.debug) {
            console.warn("new internal texture");
          }
          const target2 = gl.createTexture();
          selectTexture(gl, target2);
          gl.texImage2D(gl.TEXTURE_2D, 0, this.internalFormat, size[0], size[1], 0, this.textureFormat, this.textureType, null);
          target2._refs = 1;
          this.texture = target2;
        }
        clear() {
          if (this.texture._refs) {
            this.texture._refs--;
            const gl2 = this.context;
            const target2 = this.texture = gl2.createTexture();
            selectTexture(gl2, target2);
            const size = this.size;
            target2._refs = 1;
            gl2.texImage2D(gl2.TEXTURE_2D, 0, this.internalFormat, size[0], size[1], 0, this.textureFormat, this.textureType, null);
          }
          const { context: gl, texture } = this;
          gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer());
          gl.bindTexture(gl.TEXTURE_2D, texture);
          selectTexture(gl, texture);
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
        delete() {
          if (this._deleted)
            return;
          this._deleted = true;
          if (this.texture._refs) {
            this.texture._refs--;
            if (this.texture._refs)
              return;
          }
          this.context.deleteTexture(this.texture);
        }
        framebuffer() {
          if (!this._framebuffer) {
            this._framebuffer = this.kernel.getRawValueFramebuffer(this.size[0], this.size[1]);
          }
          return this._framebuffer;
        }
      }
      function selectTexture(gl, texture) {
        gl.activeTexture(gl.TEXTURE15);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      }
      module2.exports = { GLTexture };
    }, { "../../../texture": 113 }], 28: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { GLTextureFloat } = require2("./float");
      class GLTextureMemoryOptimized2D extends GLTextureFloat {
        constructor(settings) {
          super(settings);
          this.type = "MemoryOptimizedNumberTexture";
        }
        toArray() {
          return utils.erectMemoryOptimized2DFloat(this.renderValues(), this.output[0], this.output[1]);
        }
      }
      module2.exports = {
        GLTextureMemoryOptimized2D
      };
    }, { "../../../utils": 114, "./float": 25 }], 29: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { GLTextureFloat } = require2("./float");
      class GLTextureMemoryOptimized3D extends GLTextureFloat {
        constructor(settings) {
          super(settings);
          this.type = "MemoryOptimizedNumberTexture";
        }
        toArray() {
          return utils.erectMemoryOptimized3DFloat(this.renderValues(), this.output[0], this.output[1], this.output[2]);
        }
      }
      module2.exports = {
        GLTextureMemoryOptimized3D
      };
    }, { "../../../utils": 114, "./float": 25 }], 30: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { GLTextureFloat } = require2("./float");
      class GLTextureMemoryOptimized extends GLTextureFloat {
        constructor(settings) {
          super(settings);
          this.type = "MemoryOptimizedNumberTexture";
        }
        toArray() {
          return utils.erectMemoryOptimizedFloat(this.renderValues(), this.output[0]);
        }
      }
      module2.exports = {
        GLTextureMemoryOptimized
      };
    }, { "../../../utils": 114, "./float": 25 }], 31: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { GLTextureUnsigned } = require2("./unsigned");
      class GLTextureUnsigned2D extends GLTextureUnsigned {
        constructor(settings) {
          super(settings);
          this.type = "NumberTexture";
        }
        toArray() {
          return utils.erect2DPackedFloat(this.renderValues(), this.output[0], this.output[1]);
        }
      }
      module2.exports = {
        GLTextureUnsigned2D
      };
    }, { "../../../utils": 114, "./unsigned": 33 }], 32: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { GLTextureUnsigned } = require2("./unsigned");
      class GLTextureUnsigned3D extends GLTextureUnsigned {
        constructor(settings) {
          super(settings);
          this.type = "NumberTexture";
        }
        toArray() {
          return utils.erect3DPackedFloat(this.renderValues(), this.output[0], this.output[1], this.output[2]);
        }
      }
      module2.exports = {
        GLTextureUnsigned3D
      };
    }, { "../../../utils": 114, "./unsigned": 33 }], 33: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { GLTexture } = require2("./index");
      class GLTextureUnsigned extends GLTexture {
        get textureType() {
          return this.context.UNSIGNED_BYTE;
        }
        constructor(settings) {
          super(settings);
          this.type = "NumberTexture";
        }
        renderRawOutput() {
          const { context: gl } = this;
          gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer());
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
          const result = new Uint8Array(this.size[0] * this.size[1] * 4);
          gl.readPixels(0, 0, this.size[0], this.size[1], gl.RGBA, gl.UNSIGNED_BYTE, result);
          return result;
        }
        renderValues() {
          if (this._deleted)
            return null;
          return new Float32Array(this.renderRawOutput().buffer);
        }
        toArray() {
          return utils.erectPackedFloat(this.renderValues(), this.output[0]);
        }
      }
      module2.exports = {
        GLTextureUnsigned
      };
    }, { "../../../utils": 114, "./index": 27 }], 34: [function(require2, module2, exports2) {
      const getContext = require2("gl");
      const { WebGLKernel } = require2("../web-gl/kernel");
      const { glKernelString } = require2("../gl/kernel-string");
      let isSupported = null;
      let testCanvas = null;
      let testContext = null;
      let testExtensions = null;
      let features = null;
      class HeadlessGLKernel extends WebGLKernel {
        static get isSupported() {
          if (isSupported !== null)
            return isSupported;
          this.setupFeatureChecks();
          isSupported = testContext !== null;
          return isSupported;
        }
        static setupFeatureChecks() {
          testCanvas = null;
          testExtensions = null;
          if (typeof getContext !== "function")
            return;
          try {
            testContext = getContext(2, 2, {
              preserveDrawingBuffer: true
            });
            if (!testContext || !testContext.getExtension)
              return;
            testExtensions = {
              STACKGL_resize_drawingbuffer: testContext.getExtension("STACKGL_resize_drawingbuffer"),
              STACKGL_destroy_context: testContext.getExtension("STACKGL_destroy_context"),
              OES_texture_float: testContext.getExtension("OES_texture_float"),
              OES_texture_float_linear: testContext.getExtension("OES_texture_float_linear"),
              OES_element_index_uint: testContext.getExtension("OES_element_index_uint"),
              WEBGL_draw_buffers: testContext.getExtension("WEBGL_draw_buffers"),
              WEBGL_color_buffer_float: testContext.getExtension("WEBGL_color_buffer_float")
            };
            features = this.getFeatures();
          } catch (e) {
            console.warn(e);
          }
        }
        static isContextMatch(context) {
          try {
            return context.getParameter(context.RENDERER) === "ANGLE";
          } catch (e) {
            return false;
          }
        }
        static getIsTextureFloat() {
          return Boolean(testExtensions.OES_texture_float);
        }
        static getIsDrawBuffers() {
          return Boolean(testExtensions.WEBGL_draw_buffers);
        }
        static getChannelCount() {
          return testExtensions.WEBGL_draw_buffers ? testContext.getParameter(testExtensions.WEBGL_draw_buffers.MAX_DRAW_BUFFERS_WEBGL) : 1;
        }
        static getMaxTextureSize() {
          return testContext.getParameter(testContext.MAX_TEXTURE_SIZE);
        }
        static get testCanvas() {
          return testCanvas;
        }
        static get testContext() {
          return testContext;
        }
        static get features() {
          return features;
        }
        initCanvas() {
          return {};
        }
        initContext() {
          return getContext(2, 2, {
            preserveDrawingBuffer: true
          });
        }
        initExtensions() {
          this.extensions = {
            STACKGL_resize_drawingbuffer: this.context.getExtension("STACKGL_resize_drawingbuffer"),
            STACKGL_destroy_context: this.context.getExtension("STACKGL_destroy_context"),
            OES_texture_float: this.context.getExtension("OES_texture_float"),
            OES_texture_float_linear: this.context.getExtension("OES_texture_float_linear"),
            OES_element_index_uint: this.context.getExtension("OES_element_index_uint"),
            WEBGL_draw_buffers: this.context.getExtension("WEBGL_draw_buffers")
          };
        }
        build() {
          super.build.apply(this, arguments);
          if (!this.fallbackRequested) {
            this.extensions.STACKGL_resize_drawingbuffer.resize(this.maxTexSize[0], this.maxTexSize[1]);
          }
        }
        destroyExtensions() {
          this.extensions.STACKGL_resize_drawingbuffer = null;
          this.extensions.STACKGL_destroy_context = null;
          this.extensions.OES_texture_float = null;
          this.extensions.OES_texture_float_linear = null;
          this.extensions.OES_element_index_uint = null;
          this.extensions.WEBGL_draw_buffers = null;
        }
        static destroyContext(context) {
          const extension = context.getExtension("STACKGL_destroy_context");
          if (extension && extension.destroy) {
            extension.destroy();
          }
        }
        toString() {
          const setupContextString = `const gl = context || require('gl')(1, 1);
`;
          const destroyContextString = `    if (!context) { gl.getExtension('STACKGL_destroy_context').destroy(); }
`;
          return glKernelString(this.constructor, arguments, this, setupContextString, destroyContextString);
        }
        setOutput(output) {
          super.setOutput(output);
          if (this.graphical && this.extensions.STACKGL_resize_drawingbuffer) {
            this.extensions.STACKGL_resize_drawingbuffer.resize(this.maxTexSize[0], this.maxTexSize[1]);
          }
          return this;
        }
      }
      module2.exports = {
        HeadlessGLKernel
      };
    }, { "../gl/kernel-string": 12, "../web-gl/kernel": 70, "gl": 2 }], 35: [function(require2, module2, exports2) {
      class KernelValue {
        constructor(value2, settings) {
          const {
            name: name2,
            kernel,
            context,
            checkContext,
            onRequestContextHandle,
            onUpdateValueMismatch,
            origin,
            strictIntegers,
            type,
            tactic
          } = settings;
          if (!name2) {
            throw new Error("name not set");
          }
          if (!type) {
            throw new Error("type not set");
          }
          if (!origin) {
            throw new Error("origin not set");
          }
          if (origin !== "user" && origin !== "constants") {
            throw new Error(`origin must be "user" or "constants" value is "${origin}"`);
          }
          if (!onRequestContextHandle) {
            throw new Error("onRequestContextHandle is not set");
          }
          this.name = name2;
          this.origin = origin;
          this.tactic = tactic;
          this.varName = origin === "constants" ? `constants.${name2}` : name2;
          this.kernel = kernel;
          this.strictIntegers = strictIntegers;
          this.type = value2.type || type;
          this.size = value2.size || null;
          this.index = null;
          this.context = context;
          this.checkContext = checkContext !== null && checkContext !== void 0 ? checkContext : true;
          this.contextHandle = null;
          this.onRequestContextHandle = onRequestContextHandle;
          this.onUpdateValueMismatch = onUpdateValueMismatch;
          this.forceUploadEachRun = null;
        }
        get id() {
          return `${this.origin}_${name}`;
        }
        getSource() {
          throw new Error(`"getSource" not defined on ${this.constructor.name}`);
        }
        updateValue(value2) {
          throw new Error(`"updateValue" not defined on ${this.constructor.name}`);
        }
      }
      module2.exports = {
        KernelValue
      };
    }, {}], 36: [function(require2, module2, exports2) {
      const { utils } = require2("../utils");
      const { Input } = require2("../input");
      class Kernel {
        static get isSupported() {
          throw new Error(`"isSupported" not implemented on ${this.name}`);
        }
        static isContextMatch(context) {
          throw new Error(`"isContextMatch" not implemented on ${this.name}`);
        }
        static getFeatures() {
          throw new Error(`"getFeatures" not implemented on ${this.name}`);
        }
        static destroyContext(context) {
          throw new Error(`"destroyContext" called on ${this.name}`);
        }
        static nativeFunctionArguments() {
          throw new Error(`"nativeFunctionArguments" called on ${this.name}`);
        }
        static nativeFunctionReturnType() {
          throw new Error(`"nativeFunctionReturnType" called on ${this.name}`);
        }
        static combineKernels() {
          throw new Error(`"combineKernels" called on ${this.name}`);
        }
        constructor(source, settings) {
          if (typeof source !== "object") {
            if (typeof source !== "string") {
              throw new Error("source not a string");
            }
            if (!utils.isFunctionString(source)) {
              throw new Error("source not a function string");
            }
          }
          this.useLegacyEncoder = false;
          this.fallbackRequested = false;
          this.onRequestFallback = null;
          this.argumentNames = typeof source === "string" ? utils.getArgumentNamesFromString(source) : null;
          this.argumentTypes = null;
          this.argumentSizes = null;
          this.argumentBitRatios = null;
          this.kernelArguments = null;
          this.kernelConstants = null;
          this.forceUploadKernelConstants = null;
          this.source = source;
          this.output = null;
          this.debug = false;
          this.graphical = false;
          this.loopMaxIterations = 0;
          this.constants = null;
          this.constantTypes = null;
          this.constantBitRatios = null;
          this.dynamicArguments = false;
          this.dynamicOutput = false;
          this.canvas = null;
          this.context = null;
          this.checkContext = null;
          this.gpu = null;
          this.functions = null;
          this.nativeFunctions = null;
          this.injectedNative = null;
          this.subKernels = null;
          this.validate = true;
          this.immutable = false;
          this.pipeline = false;
          this.precision = null;
          this.tactic = null;
          this.plugins = null;
          this.returnType = null;
          this.leadingReturnStatement = null;
          this.followingReturnStatement = null;
          this.optimizeFloatMemory = null;
          this.strictIntegers = false;
          this.fixIntegerDivisionAccuracy = null;
          this.built = false;
          this.signature = null;
        }
        mergeSettings(settings) {
          for (let p2 in settings) {
            if (!settings.hasOwnProperty(p2) || !this.hasOwnProperty(p2))
              continue;
            switch (p2) {
              case "output":
                if (!Array.isArray(settings.output)) {
                  this.setOutput(settings.output);
                  continue;
                }
                break;
              case "functions":
                this.functions = [];
                for (let i = 0; i < settings.functions.length; i++) {
                  this.addFunction(settings.functions[i]);
                }
                continue;
              case "graphical":
                if (settings[p2] && !settings.hasOwnProperty("precision")) {
                  this.precision = "unsigned";
                }
                this[p2] = settings[p2];
                continue;
              case "nativeFunctions":
                if (!settings.nativeFunctions)
                  continue;
                this.nativeFunctions = [];
                for (let i = 0; i < settings.nativeFunctions.length; i++) {
                  const s = settings.nativeFunctions[i];
                  const { name: name2, source } = s;
                  this.addNativeFunction(name2, source, s);
                }
                continue;
            }
            this[p2] = settings[p2];
          }
          if (!this.canvas)
            this.canvas = this.initCanvas();
          if (!this.context)
            this.context = this.initContext();
          if (!this.plugins)
            this.plugins = this.initPlugins(settings);
        }
        build() {
          throw new Error(`"build" not defined on ${this.constructor.name}`);
        }
        run() {
          throw new Error(`"run" not defined on ${this.constructor.name}`);
        }
        initCanvas() {
          throw new Error(`"initCanvas" not defined on ${this.constructor.name}`);
        }
        initContext() {
          throw new Error(`"initContext" not defined on ${this.constructor.name}`);
        }
        initPlugins(settings) {
          throw new Error(`"initPlugins" not defined on ${this.constructor.name}`);
        }
        addFunction(source, settings = {}) {
          if (source.name && source.source && source.argumentTypes && "returnType" in source) {
            this.functions.push(source);
          } else if ("settings" in source && "source" in source) {
            this.functions.push(this.functionToIGPUFunction(source.source, source.settings));
          } else if (typeof source === "string" || typeof source === "function") {
            this.functions.push(this.functionToIGPUFunction(source, settings));
          } else {
            throw new Error(`function not properly defined`);
          }
          return this;
        }
        addNativeFunction(name2, source, settings = {}) {
          const { argumentTypes, argumentNames } = settings.argumentTypes ? splitArgumentTypes(settings.argumentTypes) : this.constructor.nativeFunctionArguments(source) || {};
          this.nativeFunctions.push({
            name: name2,
            source,
            settings,
            argumentTypes,
            argumentNames,
            returnType: settings.returnType || this.constructor.nativeFunctionReturnType(source)
          });
          return this;
        }
        setupArguments(args) {
          this.kernelArguments = [];
          if (!this.argumentTypes) {
            if (!this.argumentTypes) {
              this.argumentTypes = [];
              for (let i = 0; i < args.length; i++) {
                const argType = utils.getVariableType(args[i], this.strictIntegers);
                const type = argType === "Integer" ? "Number" : argType;
                this.argumentTypes.push(type);
                this.kernelArguments.push({
                  type
                });
              }
            }
          } else {
            for (let i = 0; i < this.argumentTypes.length; i++) {
              this.kernelArguments.push({
                type: this.argumentTypes[i]
              });
            }
          }
          this.argumentSizes = new Array(args.length);
          this.argumentBitRatios = new Int32Array(args.length);
          for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            this.argumentSizes[i] = arg.constructor === Input ? arg.size : null;
            this.argumentBitRatios[i] = this.getBitRatio(arg);
          }
          if (this.argumentNames.length !== args.length) {
            throw new Error(`arguments are miss-aligned`);
          }
        }
        setupConstants() {
          this.kernelConstants = [];
          let needsConstantTypes = this.constantTypes === null;
          if (needsConstantTypes) {
            this.constantTypes = {};
          }
          this.constantBitRatios = {};
          if (this.constants) {
            for (let name2 in this.constants) {
              if (needsConstantTypes) {
                const type = utils.getVariableType(this.constants[name2], this.strictIntegers);
                this.constantTypes[name2] = type;
                this.kernelConstants.push({
                  name: name2,
                  type
                });
              } else {
                this.kernelConstants.push({
                  name: name2,
                  type: this.constantTypes[name2]
                });
              }
              this.constantBitRatios[name2] = this.getBitRatio(this.constants[name2]);
            }
          }
        }
        setOptimizeFloatMemory(flag) {
          this.optimizeFloatMemory = flag;
          return this;
        }
        toKernelOutput(output) {
          if (output.hasOwnProperty("x")) {
            if (output.hasOwnProperty("y")) {
              if (output.hasOwnProperty("z")) {
                return [output.x, output.y, output.z];
              } else {
                return [output.x, output.y];
              }
            } else {
              return [output.x];
            }
          } else {
            return output;
          }
        }
        setOutput(output) {
          this.output = this.toKernelOutput(output);
          return this;
        }
        setDebug(flag) {
          this.debug = flag;
          return this;
        }
        setGraphical(flag) {
          this.graphical = flag;
          this.precision = "unsigned";
          return this;
        }
        setLoopMaxIterations(max) {
          this.loopMaxIterations = max;
          return this;
        }
        setConstants(constants) {
          this.constants = constants;
          return this;
        }
        setConstantTypes(constantTypes) {
          this.constantTypes = constantTypes;
          return this;
        }
        setFunctions(functions) {
          for (let i = 0; i < functions.length; i++) {
            this.addFunction(functions[i]);
          }
          return this;
        }
        setNativeFunctions(nativeFunctions) {
          for (let i = 0; i < nativeFunctions.length; i++) {
            const settings = nativeFunctions[i];
            const { name: name2, source } = settings;
            this.addNativeFunction(name2, source, settings);
          }
          return this;
        }
        setInjectedNative(injectedNative) {
          this.injectedNative = injectedNative;
          return this;
        }
        setPipeline(flag) {
          this.pipeline = flag;
          return this;
        }
        setPrecision(flag) {
          this.precision = flag;
          return this;
        }
        setDimensions(flag) {
          utils.warnDeprecated("method", "setDimensions", "setOutput");
          this.output = flag;
          return this;
        }
        setOutputToTexture(flag) {
          utils.warnDeprecated("method", "setOutputToTexture", "setPipeline");
          this.pipeline = flag;
          return this;
        }
        setImmutable(flag) {
          this.immutable = flag;
          return this;
        }
        setCanvas(canvas) {
          this.canvas = canvas;
          return this;
        }
        setStrictIntegers(flag) {
          this.strictIntegers = flag;
          return this;
        }
        setDynamicOutput(flag) {
          this.dynamicOutput = flag;
          return this;
        }
        setHardcodeConstants(flag) {
          utils.warnDeprecated("method", "setHardcodeConstants");
          this.setDynamicOutput(flag);
          this.setDynamicArguments(flag);
          return this;
        }
        setDynamicArguments(flag) {
          this.dynamicArguments = flag;
          return this;
        }
        setUseLegacyEncoder(flag) {
          this.useLegacyEncoder = flag;
          return this;
        }
        setWarnVarUsage(flag) {
          utils.warnDeprecated("method", "setWarnVarUsage");
          return this;
        }
        getCanvas() {
          utils.warnDeprecated("method", "getCanvas");
          return this.canvas;
        }
        getWebGl() {
          utils.warnDeprecated("method", "getWebGl");
          return this.context;
        }
        setContext(context) {
          this.context = context;
          return this;
        }
        setArgumentTypes(argumentTypes) {
          if (Array.isArray(argumentTypes)) {
            this.argumentTypes = argumentTypes;
          } else {
            this.argumentTypes = [];
            for (const p2 in argumentTypes) {
              if (!argumentTypes.hasOwnProperty(p2))
                continue;
              const argumentIndex = this.argumentNames.indexOf(p2);
              if (argumentIndex === -1)
                throw new Error(`unable to find argument ${p2}`);
              this.argumentTypes[argumentIndex] = argumentTypes[p2];
            }
          }
          return this;
        }
        setTactic(tactic) {
          this.tactic = tactic;
          return this;
        }
        requestFallback(args) {
          if (!this.onRequestFallback) {
            throw new Error(`"onRequestFallback" not defined on ${this.constructor.name}`);
          }
          this.fallbackRequested = true;
          return this.onRequestFallback(args);
        }
        validateSettings() {
          throw new Error(`"validateSettings" not defined on ${this.constructor.name}`);
        }
        addSubKernel(subKernel) {
          if (this.subKernels === null) {
            this.subKernels = [];
          }
          if (!subKernel.source)
            throw new Error('subKernel missing "source" property');
          if (!subKernel.property && isNaN(subKernel.property))
            throw new Error('subKernel missing "property" property');
          if (!subKernel.name)
            throw new Error('subKernel missing "name" property');
          this.subKernels.push(subKernel);
          return this;
        }
        destroy(removeCanvasReferences) {
          throw new Error(`"destroy" called on ${this.constructor.name}`);
        }
        getBitRatio(value2) {
          if (this.precision === "single") {
            return 4;
          } else if (Array.isArray(value2[0])) {
            return this.getBitRatio(value2[0]);
          } else if (value2.constructor === Input) {
            return this.getBitRatio(value2.value);
          }
          switch (value2.constructor) {
            case Uint8ClampedArray:
            case Uint8Array:
            case Int8Array:
              return 1;
            case Uint16Array:
            case Int16Array:
              return 2;
            case Float32Array:
            case Int32Array:
            default:
              return 4;
          }
        }
        getPixels(flip) {
          throw new Error(`"getPixels" called on ${this.constructor.name}`);
        }
        checkOutput() {
          if (!this.output || !utils.isArray(this.output))
            throw new Error("kernel.output not an array");
          if (this.output.length < 1)
            throw new Error("kernel.output is empty, needs at least 1 value");
          for (let i = 0; i < this.output.length; i++) {
            if (isNaN(this.output[i]) || this.output[i] < 1) {
              throw new Error(`${this.constructor.name}.output[${i}] incorrectly defined as \`${this.output[i]}\`, needs to be numeric, and greater than 0`);
            }
          }
        }
        prependString(value2) {
          throw new Error(`"prependString" called on ${this.constructor.name}`);
        }
        hasPrependString(value2) {
          throw new Error(`"hasPrependString" called on ${this.constructor.name}`);
        }
        toJSON() {
          return {
            settings: {
              output: this.output,
              pipeline: this.pipeline,
              argumentNames: this.argumentNames,
              argumentsTypes: this.argumentTypes,
              constants: this.constants,
              pluginNames: this.plugins ? this.plugins.map((plugin) => plugin.name) : null,
              returnType: this.returnType
            }
          };
        }
        buildSignature(args) {
          const Constructor = this.constructor;
          this.signature = Constructor.getSignature(this, Constructor.getArgumentTypes(this, args));
        }
        static getArgumentTypes(kernel, args) {
          const argumentTypes = new Array(args.length);
          for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            const type = kernel.argumentTypes[i];
            if (arg.type) {
              argumentTypes[i] = arg.type;
            } else {
              switch (type) {
                case "Number":
                case "Integer":
                case "Float":
                case "ArrayTexture(1)":
                  argumentTypes[i] = utils.getVariableType(arg);
                  break;
                default:
                  argumentTypes[i] = type;
              }
            }
          }
          return argumentTypes;
        }
        static getSignature(kernel, argumentTypes) {
          throw new Error(`"getSignature" not implemented on ${this.name}`);
        }
        functionToIGPUFunction(source, settings = {}) {
          if (typeof source !== "string" && typeof source !== "function")
            throw new Error("source not a string or function");
          const sourceString = typeof source === "string" ? source : source.toString();
          let argumentTypes = [];
          if (Array.isArray(settings.argumentTypes)) {
            argumentTypes = settings.argumentTypes;
          } else if (typeof settings.argumentTypes === "object") {
            argumentTypes = utils.getArgumentNamesFromString(sourceString).map((name2) => settings.argumentTypes[name2]) || [];
          } else {
            argumentTypes = settings.argumentTypes || [];
          }
          return {
            name: utils.getFunctionNameFromString(sourceString) || null,
            source: sourceString,
            argumentTypes,
            returnType: settings.returnType || null
          };
        }
        onActivate(previousKernel) {
        }
      }
      function splitArgumentTypes(argumentTypesObject) {
        const argumentNames = Object.keys(argumentTypesObject);
        const argumentTypes = [];
        for (let i = 0; i < argumentNames.length; i++) {
          const argumentName = argumentNames[i];
          argumentTypes.push(argumentTypesObject[argumentName]);
        }
        return { argumentTypes, argumentNames };
      }
      module2.exports = {
        Kernel
      };
    }, { "../input": 110, "../utils": 114 }], 37: [function(require2, module2, exports2) {
      const fragmentShader = `__HEADER__;
__FLOAT_TACTIC_DECLARATION__;
__INT_TACTIC_DECLARATION__;
__SAMPLER_2D_TACTIC_DECLARATION__;

const int LOOP_MAX = __LOOP_MAX__;

__PLUGINS__;
__CONSTANTS__;

varying vec2 vTexCoord;

float acosh(float x) {
  return log(x + sqrt(x * x - 1.0));
}

float sinh(float x) {
  return (pow(${Math.E}, x) - pow(${Math.E}, -x)) / 2.0;
}

float asinh(float x) {
  return log(x + sqrt(x * x + 1.0));
}

float atan2(float v1, float v2) {
  if (v1 == 0.0 || v2 == 0.0) return 0.0;
  return atan(v1 / v2);
}

float atanh(float x) {
  x = (x + 1.0) / (x - 1.0);
  if (x < 0.0) {
    return 0.5 * log(-x);
  }
  return 0.5 * log(x);
}

float cbrt(float x) {
  if (x >= 0.0) {
    return pow(x, 1.0 / 3.0);
  } else {
    return -pow(x, 1.0 / 3.0);
  }
}

float cosh(float x) {
  return (pow(${Math.E}, x) + pow(${Math.E}, -x)) / 2.0; 
}

float expm1(float x) {
  return pow(${Math.E}, x) - 1.0; 
}

float fround(highp float x) {
  return x;
}

float imul(float v1, float v2) {
  return float(int(v1) * int(v2));
}

float log10(float x) {
  return log2(x) * (1.0 / log2(10.0));
}

float log1p(float x) {
  return log(1.0 + x);
}

float _pow(float v1, float v2) {
  if (v2 == 0.0) return 1.0;
  return pow(v1, v2);
}

float tanh(float x) {
  float e = exp(2.0 * x);
  return (e - 1.0) / (e + 1.0);
}

float trunc(float x) {
  if (x >= 0.0) {
    return floor(x); 
  } else {
    return ceil(x);
  }
}

vec4 _round(vec4 x) {
  return floor(x + 0.5);
}

float _round(float x) {
  return floor(x + 0.5);
}

const int BIT_COUNT = 32;
int modi(int x, int y) {
  return x - y * (x / y);
}

int bitwiseOr(int a, int b) {
  int result = 0;
  int n = 1;
  
  for (int i = 0; i < BIT_COUNT; i++) {
    if ((modi(a, 2) == 1) || (modi(b, 2) == 1)) {
      result += n;
    }
    a = a / 2;
    b = b / 2;
    n = n * 2;
    if(!(a > 0 || b > 0)) {
      break;
    }
  }
  return result;
}
int bitwiseXOR(int a, int b) {
  int result = 0;
  int n = 1;
  
  for (int i = 0; i < BIT_COUNT; i++) {
    if ((modi(a, 2) == 1) != (modi(b, 2) == 1)) {
      result += n;
    }
    a = a / 2;
    b = b / 2;
    n = n * 2;
    if(!(a > 0 || b > 0)) {
      break;
    }
  }
  return result;
}
int bitwiseAnd(int a, int b) {
  int result = 0;
  int n = 1;
  for (int i = 0; i < BIT_COUNT; i++) {
    if ((modi(a, 2) == 1) && (modi(b, 2) == 1)) {
      result += n;
    }
    a = a / 2;
    b = b / 2;
    n = n * 2;
    if(!(a > 0 && b > 0)) {
      break;
    }
  }
  return result;
}
int bitwiseNot(int a) {
  int result = 0;
  int n = 1;
  
  for (int i = 0; i < BIT_COUNT; i++) {
    if (modi(a, 2) == 0) {
      result += n;    
    }
    a = a / 2;
    n = n * 2;
  }
  return result;
}
int bitwiseZeroFillLeftShift(int n, int shift) {
  int maxBytes = BIT_COUNT;
  for (int i = 0; i < BIT_COUNT; i++) {
    if (maxBytes >= n) {
      break;
    }
    maxBytes *= 2;
  }
  for (int i = 0; i < BIT_COUNT; i++) {
    if (i >= shift) {
      break;
    }
    n *= 2;
  }

  int result = 0;
  int byteVal = 1;
  for (int i = 0; i < BIT_COUNT; i++) {
    if (i >= maxBytes) break;
    if (modi(n, 2) > 0) { result += byteVal; }
    n = int(n / 2);
    byteVal *= 2;
  }
  return result;
}

int bitwiseSignedRightShift(int num, int shifts) {
  return int(floor(float(num) / pow(2.0, float(shifts))));
}

int bitwiseZeroFillRightShift(int n, int shift) {
  int maxBytes = BIT_COUNT;
  for (int i = 0; i < BIT_COUNT; i++) {
    if (maxBytes >= n) {
      break;
    }
    maxBytes *= 2;
  }
  for (int i = 0; i < BIT_COUNT; i++) {
    if (i >= shift) {
      break;
    }
    n /= 2;
  }
  int result = 0;
  int byteVal = 1;
  for (int i = 0; i < BIT_COUNT; i++) {
    if (i >= maxBytes) break;
    if (modi(n, 2) > 0) { result += byteVal; }
    n = int(n / 2);
    byteVal *= 2;
  }
  return result;
}

vec2 integerMod(vec2 x, float y) {
  vec2 res = floor(mod(x, y));
  return res * step(1.0 - floor(y), -res);
}

vec3 integerMod(vec3 x, float y) {
  vec3 res = floor(mod(x, y));
  return res * step(1.0 - floor(y), -res);
}

vec4 integerMod(vec4 x, vec4 y) {
  vec4 res = floor(mod(x, y));
  return res * step(1.0 - floor(y), -res);
}

float integerMod(float x, float y) {
  float res = floor(mod(x, y));
  return res * (res > floor(y) - 1.0 ? 0.0 : 1.0);
}

int integerMod(int x, int y) {
  return x - (y * int(x / y));
}

__DIVIDE_WITH_INTEGER_CHECK__;

// Here be dragons!
// DO NOT OPTIMIZE THIS CODE
// YOU WILL BREAK SOMETHING ON SOMEBODY'S MACHINE
// LEAVE IT AS IT IS, LEST YOU WASTE YOUR OWN TIME
const vec2 MAGIC_VEC = vec2(1.0, -256.0);
const vec4 SCALE_FACTOR = vec4(1.0, 256.0, 65536.0, 0.0);
const vec4 SCALE_FACTOR_INV = vec4(1.0, 0.00390625, 0.0000152587890625, 0.0); // 1, 1/256, 1/65536
float decode32(vec4 texel) {
  __DECODE32_ENDIANNESS__;
  texel *= 255.0;
  vec2 gte128;
  gte128.x = texel.b >= 128.0 ? 1.0 : 0.0;
  gte128.y = texel.a >= 128.0 ? 1.0 : 0.0;
  float exponent = 2.0 * texel.a - 127.0 + dot(gte128, MAGIC_VEC);
  float res = exp2(_round(exponent));
  texel.b = texel.b - 128.0 * gte128.x;
  res = dot(texel, SCALE_FACTOR) * exp2(_round(exponent-23.0)) + res;
  res *= gte128.y * -2.0 + 1.0;
  return res;
}

float decode16(vec4 texel, int index) {
  int channel = integerMod(index, 2);
  if (channel == 0) return texel.r * 255.0 + texel.g * 65280.0;
  if (channel == 1) return texel.b * 255.0 + texel.a * 65280.0;
  return 0.0;
}

float decode8(vec4 texel, int index) {
  int channel = integerMod(index, 4);
  if (channel == 0) return texel.r * 255.0;
  if (channel == 1) return texel.g * 255.0;
  if (channel == 2) return texel.b * 255.0;
  if (channel == 3) return texel.a * 255.0;
  return 0.0;
}

vec4 legacyEncode32(float f) {
  float F = abs(f);
  float sign = f < 0.0 ? 1.0 : 0.0;
  float exponent = floor(log2(F));
  float mantissa = (exp2(-exponent) * F);
  // exponent += floor(log2(mantissa));
  vec4 texel = vec4(F * exp2(23.0-exponent)) * SCALE_FACTOR_INV;
  texel.rg = integerMod(texel.rg, 256.0);
  texel.b = integerMod(texel.b, 128.0);
  texel.a = exponent*0.5 + 63.5;
  texel.ba += vec2(integerMod(exponent+127.0, 2.0), sign) * 128.0;
  texel = floor(texel);
  texel *= 0.003921569; // 1/255
  __ENCODE32_ENDIANNESS__;
  return texel;
}

// https://github.com/gpujs/gpu.js/wiki/Encoder-details
vec4 encode32(float value) {
  if (value == 0.0) return vec4(0, 0, 0, 0);

  float exponent;
  float mantissa;
  vec4  result;
  float sgn;

  sgn = step(0.0, -value);
  value = abs(value);

  exponent = floor(log2(value));

  mantissa = value*pow(2.0, -exponent)-1.0;
  exponent = exponent+127.0;
  result   = vec4(0,0,0,0);

  result.a = floor(exponent/2.0);
  exponent = exponent - result.a*2.0;
  result.a = result.a + 128.0*sgn;

  result.b = floor(mantissa * 128.0);
  mantissa = mantissa - result.b / 128.0;
  result.b = result.b + exponent*128.0;

  result.g = floor(mantissa*32768.0);
  mantissa = mantissa - result.g/32768.0;

  result.r = floor(mantissa*8388608.0);
  return result/255.0;
}
// Dragons end here

int index;
ivec3 threadId;

ivec3 indexTo3D(int idx, ivec3 texDim) {
  int z = int(idx / (texDim.x * texDim.y));
  idx -= z * int(texDim.x * texDim.y);
  int y = int(idx / texDim.x);
  int x = int(integerMod(idx, texDim.x));
  return ivec3(x, y, z);
}

float get32(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  int index = x + texDim.x * (y + texDim.y * z);
  int w = texSize.x;
  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;
  vec4 texel = texture2D(tex, st / vec2(texSize));
  return decode32(texel);
}

float get16(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  int index = x + texDim.x * (y + texDim.y * z);
  int w = texSize.x * 2;
  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;
  vec4 texel = texture2D(tex, st / vec2(texSize.x * 2, texSize.y));
  return decode16(texel, index);
}

float get8(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  int index = x + texDim.x * (y + texDim.y * z);
  int w = texSize.x * 4;
  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;
  vec4 texel = texture2D(tex, st / vec2(texSize.x * 4, texSize.y));
  return decode8(texel, index);
}

float getMemoryOptimized32(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  int index = x + texDim.x * (y + texDim.y * z);
  int channel = integerMod(index, 4);
  index = index / 4;
  int w = texSize.x;
  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;
  vec4 texel = texture2D(tex, st / vec2(texSize));
  if (channel == 0) return texel.r;
  if (channel == 1) return texel.g;
  if (channel == 2) return texel.b;
  if (channel == 3) return texel.a;
  return 0.0;
}

vec4 getImage2D(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  int index = x + texDim.x * (y + texDim.y * z);
  int w = texSize.x;
  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;
  return texture2D(tex, st / vec2(texSize));
}

float getFloatFromSampler2D(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  vec4 result = getImage2D(tex, texSize, texDim, z, y, x);
  return result[0];
}

vec2 getVec2FromSampler2D(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  vec4 result = getImage2D(tex, texSize, texDim, z, y, x);
  return vec2(result[0], result[1]);
}

vec2 getMemoryOptimizedVec2(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  int index = x + (texDim.x * (y + (texDim.y * z)));
  int channel = integerMod(index, 2);
  index = index / 2;
  int w = texSize.x;
  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;
  vec4 texel = texture2D(tex, st / vec2(texSize));
  if (channel == 0) return vec2(texel.r, texel.g);
  if (channel == 1) return vec2(texel.b, texel.a);
  return vec2(0.0, 0.0);
}

vec3 getVec3FromSampler2D(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  vec4 result = getImage2D(tex, texSize, texDim, z, y, x);
  return vec3(result[0], result[1], result[2]);
}

vec3 getMemoryOptimizedVec3(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  int fieldIndex = 3 * (x + texDim.x * (y + texDim.y * z));
  int vectorIndex = fieldIndex / 4;
  int vectorOffset = fieldIndex - vectorIndex * 4;
  int readY = vectorIndex / texSize.x;
  int readX = vectorIndex - readY * texSize.x;
  vec4 tex1 = texture2D(tex, (vec2(readX, readY) + 0.5) / vec2(texSize));
  
  if (vectorOffset == 0) {
    return tex1.xyz;
  } else if (vectorOffset == 1) {
    return tex1.yzw;
  } else {
    readX++;
    if (readX >= texSize.x) {
      readX = 0;
      readY++;
    }
    vec4 tex2 = texture2D(tex, vec2(readX, readY) / vec2(texSize));
    if (vectorOffset == 2) {
      return vec3(tex1.z, tex1.w, tex2.x);
    } else {
      return vec3(tex1.w, tex2.x, tex2.y);
    }
  }
}

vec4 getVec4FromSampler2D(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  return getImage2D(tex, texSize, texDim, z, y, x);
}

vec4 getMemoryOptimizedVec4(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  int index = x + texDim.x * (y + texDim.y * z);
  int channel = integerMod(index, 2);
  int w = texSize.x;
  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;
  vec4 texel = texture2D(tex, st / vec2(texSize));
  return vec4(texel.r, texel.g, texel.b, texel.a);
}

vec4 actualColor;
void color(float r, float g, float b, float a) {
  actualColor = vec4(r,g,b,a);
}

void color(float r, float g, float b) {
  color(r,g,b,1.0);
}

void color(sampler2D image) {
  actualColor = texture2D(image, vTexCoord);
}

float modulo(float number, float divisor) {
  if (number < 0.0) {
    number = abs(number);
    if (divisor < 0.0) {
      divisor = abs(divisor);
    }
    return -mod(number, divisor);
  }
  if (divisor < 0.0) {
    divisor = abs(divisor);
  }
  return mod(number, divisor);
}

__INJECTED_NATIVE__;
__MAIN_CONSTANTS__;
__MAIN_ARGUMENTS__;
__KERNEL__;

void main(void) {
  index = int(vTexCoord.s * float(uTexSize.x)) + int(vTexCoord.t * float(uTexSize.y)) * uTexSize.x;
  __MAIN_RESULT__;
}`;
      module2.exports = {
        fragmentShader
      };
    }, {}], 38: [function(require2, module2, exports2) {
      const { utils } = require2("../../utils");
      const { FunctionNode } = require2("../function-node");
      class WebGLFunctionNode extends FunctionNode {
        constructor(source, settings) {
          super(source, settings);
          if (settings && settings.hasOwnProperty("fixIntegerDivisionAccuracy")) {
            this.fixIntegerDivisionAccuracy = settings.fixIntegerDivisionAccuracy;
          }
        }
        astConditionalExpression(ast, retArr) {
          if (ast.type !== "ConditionalExpression") {
            throw this.astErrorOutput("Not a conditional expression", ast);
          }
          const consequentType = this.getType(ast.consequent);
          const alternateType = this.getType(ast.alternate);
          if (consequentType === null && alternateType === null) {
            retArr.push("if (");
            this.astGeneric(ast.test, retArr);
            retArr.push(") {");
            this.astGeneric(ast.consequent, retArr);
            retArr.push(";");
            retArr.push("} else {");
            this.astGeneric(ast.alternate, retArr);
            retArr.push(";");
            retArr.push("}");
            return retArr;
          }
          retArr.push("(");
          this.astGeneric(ast.test, retArr);
          retArr.push("?");
          this.astGeneric(ast.consequent, retArr);
          retArr.push(":");
          this.astGeneric(ast.alternate, retArr);
          retArr.push(")");
          return retArr;
        }
        astFunction(ast, retArr) {
          if (this.isRootKernel) {
            retArr.push("void");
          } else {
            if (!this.returnType) {
              const lastReturn = this.findLastReturn();
              if (lastReturn) {
                this.returnType = this.getType(ast.body);
                if (this.returnType === "LiteralInteger") {
                  this.returnType = "Number";
                }
              }
            }
            const { returnType } = this;
            if (!returnType) {
              retArr.push("void");
            } else {
              const type = typeMap[returnType];
              if (!type) {
                throw new Error(`unknown type ${returnType}`);
              }
              retArr.push(type);
            }
          }
          retArr.push(" ");
          retArr.push(this.name);
          retArr.push("(");
          if (!this.isRootKernel) {
            for (let i = 0; i < this.argumentNames.length; ++i) {
              const argumentName = this.argumentNames[i];
              if (i > 0) {
                retArr.push(", ");
              }
              let argumentType = this.argumentTypes[this.argumentNames.indexOf(argumentName)];
              if (!argumentType) {
                throw this.astErrorOutput(`Unknown argument ${argumentName} type`, ast);
              }
              if (argumentType === "LiteralInteger") {
                this.argumentTypes[i] = argumentType = "Number";
              }
              const type = typeMap[argumentType];
              if (!type) {
                throw this.astErrorOutput("Unexpected expression", ast);
              }
              const name2 = utils.sanitizeName(argumentName);
              if (type === "sampler2D" || type === "sampler2DArray") {
                retArr.push(`${type} user_${name2},ivec2 user_${name2}Size,ivec3 user_${name2}Dim`);
              } else {
                retArr.push(`${type} user_${name2}`);
              }
            }
          }
          retArr.push(") {\n");
          for (let i = 0; i < ast.body.body.length; ++i) {
            this.astGeneric(ast.body.body[i], retArr);
            retArr.push("\n");
          }
          retArr.push("}\n");
          return retArr;
        }
        astReturnStatement(ast, retArr) {
          if (!ast.argument)
            throw this.astErrorOutput("Unexpected return statement", ast);
          this.pushState("skip-literal-correction");
          const type = this.getType(ast.argument);
          this.popState("skip-literal-correction");
          const result = [];
          if (!this.returnType) {
            if (type === "LiteralInteger" || type === "Integer") {
              this.returnType = "Number";
            } else {
              this.returnType = type;
            }
          }
          switch (this.returnType) {
            case "LiteralInteger":
            case "Number":
            case "Float":
              switch (type) {
                case "Integer":
                  result.push("float(");
                  this.astGeneric(ast.argument, result);
                  result.push(")");
                  break;
                case "LiteralInteger":
                  this.castLiteralToFloat(ast.argument, result);
                  if (this.getType(ast) === "Integer") {
                    result.unshift("float(");
                    result.push(")");
                  }
                  break;
                default:
                  this.astGeneric(ast.argument, result);
              }
              break;
            case "Integer":
              switch (type) {
                case "Float":
                case "Number":
                  this.castValueToInteger(ast.argument, result);
                  break;
                case "LiteralInteger":
                  this.castLiteralToInteger(ast.argument, result);
                  break;
                default:
                  this.astGeneric(ast.argument, result);
              }
              break;
            case "Array(4)":
            case "Array(3)":
            case "Array(2)":
            case "Matrix(2)":
            case "Matrix(3)":
            case "Matrix(4)":
            case "Input":
              this.astGeneric(ast.argument, result);
              break;
            default:
              throw this.astErrorOutput(`unhandled return type ${this.returnType}`, ast);
          }
          if (this.isRootKernel) {
            retArr.push(`kernelResult = ${result.join("")};`);
            retArr.push("return;");
          } else if (this.isSubKernel) {
            retArr.push(`subKernelResult_${this.name} = ${result.join("")};`);
            retArr.push(`return subKernelResult_${this.name};`);
          } else {
            retArr.push(`return ${result.join("")};`);
          }
          return retArr;
        }
        astLiteral(ast, retArr) {
          if (isNaN(ast.value)) {
            throw this.astErrorOutput("Non-numeric literal not supported : " + ast.value, ast);
          }
          const key = this.astKey(ast);
          if (Number.isInteger(ast.value)) {
            if (this.isState("casting-to-integer") || this.isState("building-integer")) {
              this.literalTypes[key] = "Integer";
              retArr.push(`${ast.value}`);
            } else if (this.isState("casting-to-float") || this.isState("building-float")) {
              this.literalTypes[key] = "Number";
              retArr.push(`${ast.value}.0`);
            } else {
              this.literalTypes[key] = "Number";
              retArr.push(`${ast.value}.0`);
            }
          } else if (this.isState("casting-to-integer") || this.isState("building-integer")) {
            this.literalTypes[key] = "Integer";
            retArr.push(Math.round(ast.value));
          } else {
            this.literalTypes[key] = "Number";
            retArr.push(`${ast.value}`);
          }
          return retArr;
        }
        astBinaryExpression(ast, retArr) {
          if (this.checkAndUpconvertOperator(ast, retArr)) {
            return retArr;
          }
          if (this.fixIntegerDivisionAccuracy && ast.operator === "/") {
            retArr.push("divWithIntCheck(");
            this.pushState("building-float");
            switch (this.getType(ast.left)) {
              case "Integer":
                this.castValueToFloat(ast.left, retArr);
                break;
              case "LiteralInteger":
                this.castLiteralToFloat(ast.left, retArr);
                break;
              default:
                this.astGeneric(ast.left, retArr);
            }
            retArr.push(", ");
            switch (this.getType(ast.right)) {
              case "Integer":
                this.castValueToFloat(ast.right, retArr);
                break;
              case "LiteralInteger":
                this.castLiteralToFloat(ast.right, retArr);
                break;
              default:
                this.astGeneric(ast.right, retArr);
            }
            this.popState("building-float");
            retArr.push(")");
            return retArr;
          }
          retArr.push("(");
          const leftType = this.getType(ast.left) || "Number";
          const rightType = this.getType(ast.right) || "Number";
          if (!leftType || !rightType) {
            throw this.astErrorOutput(`Unhandled binary expression`, ast);
          }
          const key = leftType + " & " + rightType;
          switch (key) {
            case "Integer & Integer":
              this.pushState("building-integer");
              this.astGeneric(ast.left, retArr);
              retArr.push(operatorMap[ast.operator] || ast.operator);
              this.astGeneric(ast.right, retArr);
              this.popState("building-integer");
              break;
            case "Number & Float":
            case "Float & Number":
            case "Float & Float":
            case "Number & Number":
              this.pushState("building-float");
              this.astGeneric(ast.left, retArr);
              retArr.push(operatorMap[ast.operator] || ast.operator);
              this.astGeneric(ast.right, retArr);
              this.popState("building-float");
              break;
            case "LiteralInteger & LiteralInteger":
              if (this.isState("casting-to-integer") || this.isState("building-integer")) {
                this.pushState("building-integer");
                this.astGeneric(ast.left, retArr);
                retArr.push(operatorMap[ast.operator] || ast.operator);
                this.astGeneric(ast.right, retArr);
                this.popState("building-integer");
              } else {
                this.pushState("building-float");
                this.castLiteralToFloat(ast.left, retArr);
                retArr.push(operatorMap[ast.operator] || ast.operator);
                this.castLiteralToFloat(ast.right, retArr);
                this.popState("building-float");
              }
              break;
            case "Integer & Float":
            case "Integer & Number":
              if (ast.operator === ">" || ast.operator === "<" && ast.right.type === "Literal") {
                if (!Number.isInteger(ast.right.value)) {
                  this.pushState("building-float");
                  this.castValueToFloat(ast.left, retArr);
                  retArr.push(operatorMap[ast.operator] || ast.operator);
                  this.astGeneric(ast.right, retArr);
                  this.popState("building-float");
                  break;
                }
              }
              this.pushState("building-integer");
              this.astGeneric(ast.left, retArr);
              retArr.push(operatorMap[ast.operator] || ast.operator);
              this.pushState("casting-to-integer");
              if (ast.right.type === "Literal") {
                const literalResult = [];
                this.astGeneric(ast.right, literalResult);
                const literalType = this.getType(ast.right);
                if (literalType === "Integer") {
                  retArr.push(literalResult.join(""));
                } else {
                  throw this.astErrorOutput(`Unhandled binary expression with literal`, ast);
                }
              } else {
                retArr.push("int(");
                this.astGeneric(ast.right, retArr);
                retArr.push(")");
              }
              this.popState("casting-to-integer");
              this.popState("building-integer");
              break;
            case "Integer & LiteralInteger":
              this.pushState("building-integer");
              this.astGeneric(ast.left, retArr);
              retArr.push(operatorMap[ast.operator] || ast.operator);
              this.castLiteralToInteger(ast.right, retArr);
              this.popState("building-integer");
              break;
            case "Number & Integer":
              this.pushState("building-float");
              this.astGeneric(ast.left, retArr);
              retArr.push(operatorMap[ast.operator] || ast.operator);
              this.castValueToFloat(ast.right, retArr);
              this.popState("building-float");
              break;
            case "Float & LiteralInteger":
            case "Number & LiteralInteger":
              this.pushState("building-float");
              this.astGeneric(ast.left, retArr);
              retArr.push(operatorMap[ast.operator] || ast.operator);
              this.castLiteralToFloat(ast.right, retArr);
              this.popState("building-float");
              break;
            case "LiteralInteger & Float":
            case "LiteralInteger & Number":
              if (this.isState("casting-to-integer")) {
                this.pushState("building-integer");
                this.castLiteralToInteger(ast.left, retArr);
                retArr.push(operatorMap[ast.operator] || ast.operator);
                this.castValueToInteger(ast.right, retArr);
                this.popState("building-integer");
              } else {
                this.pushState("building-float");
                this.astGeneric(ast.left, retArr);
                retArr.push(operatorMap[ast.operator] || ast.operator);
                this.pushState("casting-to-float");
                this.astGeneric(ast.right, retArr);
                this.popState("casting-to-float");
                this.popState("building-float");
              }
              break;
            case "LiteralInteger & Integer":
              this.pushState("building-integer");
              this.castLiteralToInteger(ast.left, retArr);
              retArr.push(operatorMap[ast.operator] || ast.operator);
              this.astGeneric(ast.right, retArr);
              this.popState("building-integer");
              break;
            case "Boolean & Boolean":
              this.pushState("building-boolean");
              this.astGeneric(ast.left, retArr);
              retArr.push(operatorMap[ast.operator] || ast.operator);
              this.astGeneric(ast.right, retArr);
              this.popState("building-boolean");
              break;
            case "Float & Integer":
              this.pushState("building-float");
              this.astGeneric(ast.left, retArr);
              retArr.push(operatorMap[ast.operator] || ast.operator);
              this.castValueToFloat(ast.right, retArr);
              this.popState("building-float");
              break;
            default:
              throw this.astErrorOutput(`Unhandled binary expression between ${key}`, ast);
          }
          retArr.push(")");
          return retArr;
        }
        checkAndUpconvertOperator(ast, retArr) {
          const bitwiseResult = this.checkAndUpconvertBitwiseOperators(ast, retArr);
          if (bitwiseResult) {
            return bitwiseResult;
          }
          const upconvertableOperators = {
            "%": this.fixIntegerDivisionAccuracy ? "integerCorrectionModulo" : "modulo",
            "**": "pow"
          };
          const foundOperator = upconvertableOperators[ast.operator];
          if (!foundOperator)
            return null;
          retArr.push(foundOperator);
          retArr.push("(");
          switch (this.getType(ast.left)) {
            case "Integer":
              this.castValueToFloat(ast.left, retArr);
              break;
            case "LiteralInteger":
              this.castLiteralToFloat(ast.left, retArr);
              break;
            default:
              this.astGeneric(ast.left, retArr);
          }
          retArr.push(",");
          switch (this.getType(ast.right)) {
            case "Integer":
              this.castValueToFloat(ast.right, retArr);
              break;
            case "LiteralInteger":
              this.castLiteralToFloat(ast.right, retArr);
              break;
            default:
              this.astGeneric(ast.right, retArr);
          }
          retArr.push(")");
          return retArr;
        }
        checkAndUpconvertBitwiseOperators(ast, retArr) {
          const upconvertableOperators = {
            "&": "bitwiseAnd",
            "|": "bitwiseOr",
            "^": "bitwiseXOR",
            "<<": "bitwiseZeroFillLeftShift",
            ">>": "bitwiseSignedRightShift",
            ">>>": "bitwiseZeroFillRightShift"
          };
          const foundOperator = upconvertableOperators[ast.operator];
          if (!foundOperator)
            return null;
          retArr.push(foundOperator);
          retArr.push("(");
          const leftType = this.getType(ast.left);
          switch (leftType) {
            case "Number":
            case "Float":
              this.castValueToInteger(ast.left, retArr);
              break;
            case "LiteralInteger":
              this.castLiteralToInteger(ast.left, retArr);
              break;
            default:
              this.astGeneric(ast.left, retArr);
          }
          retArr.push(",");
          const rightType = this.getType(ast.right);
          switch (rightType) {
            case "Number":
            case "Float":
              this.castValueToInteger(ast.right, retArr);
              break;
            case "LiteralInteger":
              this.castLiteralToInteger(ast.right, retArr);
              break;
            default:
              this.astGeneric(ast.right, retArr);
          }
          retArr.push(")");
          return retArr;
        }
        checkAndUpconvertBitwiseUnary(ast, retArr) {
          const upconvertableOperators = {
            "~": "bitwiseNot"
          };
          const foundOperator = upconvertableOperators[ast.operator];
          if (!foundOperator)
            return null;
          retArr.push(foundOperator);
          retArr.push("(");
          switch (this.getType(ast.argument)) {
            case "Number":
            case "Float":
              this.castValueToInteger(ast.argument, retArr);
              break;
            case "LiteralInteger":
              this.castLiteralToInteger(ast.argument, retArr);
              break;
            default:
              this.astGeneric(ast.argument, retArr);
          }
          retArr.push(")");
          return retArr;
        }
        castLiteralToInteger(ast, retArr) {
          this.pushState("casting-to-integer");
          this.astGeneric(ast, retArr);
          this.popState("casting-to-integer");
          return retArr;
        }
        castLiteralToFloat(ast, retArr) {
          this.pushState("casting-to-float");
          this.astGeneric(ast, retArr);
          this.popState("casting-to-float");
          return retArr;
        }
        castValueToInteger(ast, retArr) {
          this.pushState("casting-to-integer");
          retArr.push("int(");
          this.astGeneric(ast, retArr);
          retArr.push(")");
          this.popState("casting-to-integer");
          return retArr;
        }
        castValueToFloat(ast, retArr) {
          this.pushState("casting-to-float");
          retArr.push("float(");
          this.astGeneric(ast, retArr);
          retArr.push(")");
          this.popState("casting-to-float");
          return retArr;
        }
        astIdentifierExpression(idtNode, retArr) {
          if (idtNode.type !== "Identifier") {
            throw this.astErrorOutput("IdentifierExpression - not an Identifier", idtNode);
          }
          const type = this.getType(idtNode);
          const name2 = utils.sanitizeName(idtNode.name);
          if (idtNode.name === "Infinity") {
            retArr.push("3.402823466e+38");
          } else if (type === "Boolean") {
            if (this.argumentNames.indexOf(name2) > -1) {
              retArr.push(`bool(user_${name2})`);
            } else {
              retArr.push(`user_${name2}`);
            }
          } else {
            retArr.push(`user_${name2}`);
          }
          return retArr;
        }
        astForStatement(forNode, retArr) {
          if (forNode.type !== "ForStatement") {
            throw this.astErrorOutput("Invalid for statement", forNode);
          }
          const initArr = [];
          const testArr = [];
          const updateArr = [];
          const bodyArr = [];
          let isSafe = null;
          if (forNode.init) {
            const { declarations } = forNode.init;
            if (declarations.length > 1) {
              isSafe = false;
            }
            this.astGeneric(forNode.init, initArr);
            for (let i = 0; i < declarations.length; i++) {
              if (declarations[i].init && declarations[i].init.type !== "Literal") {
                isSafe = false;
              }
            }
          } else {
            isSafe = false;
          }
          if (forNode.test) {
            this.astGeneric(forNode.test, testArr);
          } else {
            isSafe = false;
          }
          if (forNode.update) {
            this.astGeneric(forNode.update, updateArr);
          } else {
            isSafe = false;
          }
          if (forNode.body) {
            this.pushState("loop-body");
            this.astGeneric(forNode.body, bodyArr);
            this.popState("loop-body");
          }
          if (isSafe === null) {
            isSafe = this.isSafe(forNode.init) && this.isSafe(forNode.test);
          }
          if (isSafe) {
            const initString = initArr.join("");
            const initNeedsSemiColon = initString[initString.length - 1] !== ";";
            retArr.push(`for (${initString}${initNeedsSemiColon ? ";" : ""}${testArr.join("")};${updateArr.join("")}){
`);
            retArr.push(bodyArr.join(""));
            retArr.push("}\n");
          } else {
            const iVariableName = this.getInternalVariableName("safeI");
            if (initArr.length > 0) {
              retArr.push(initArr.join(""), "\n");
            }
            retArr.push(`for (int ${iVariableName}=0;${iVariableName}<LOOP_MAX;${iVariableName}++){
`);
            if (testArr.length > 0) {
              retArr.push(`if (!${testArr.join("")}) break;
`);
            }
            retArr.push(bodyArr.join(""));
            retArr.push(`
${updateArr.join("")};`);
            retArr.push("}\n");
          }
          return retArr;
        }
        astWhileStatement(whileNode, retArr) {
          if (whileNode.type !== "WhileStatement") {
            throw this.astErrorOutput("Invalid while statement", whileNode);
          }
          const iVariableName = this.getInternalVariableName("safeI");
          retArr.push(`for (int ${iVariableName}=0;${iVariableName}<LOOP_MAX;${iVariableName}++){
`);
          retArr.push("if (!");
          this.astGeneric(whileNode.test, retArr);
          retArr.push(") break;\n");
          this.astGeneric(whileNode.body, retArr);
          retArr.push("}\n");
          return retArr;
        }
        astDoWhileStatement(doWhileNode, retArr) {
          if (doWhileNode.type !== "DoWhileStatement") {
            throw this.astErrorOutput("Invalid while statement", doWhileNode);
          }
          const iVariableName = this.getInternalVariableName("safeI");
          retArr.push(`for (int ${iVariableName}=0;${iVariableName}<LOOP_MAX;${iVariableName}++){
`);
          this.astGeneric(doWhileNode.body, retArr);
          retArr.push("if (!");
          this.astGeneric(doWhileNode.test, retArr);
          retArr.push(") break;\n");
          retArr.push("}\n");
          return retArr;
        }
        astAssignmentExpression(assNode, retArr) {
          if (assNode.operator === "%=") {
            this.astGeneric(assNode.left, retArr);
            retArr.push("=");
            retArr.push("mod(");
            this.astGeneric(assNode.left, retArr);
            retArr.push(",");
            this.astGeneric(assNode.right, retArr);
            retArr.push(")");
          } else if (assNode.operator === "**=") {
            this.astGeneric(assNode.left, retArr);
            retArr.push("=");
            retArr.push("pow(");
            this.astGeneric(assNode.left, retArr);
            retArr.push(",");
            this.astGeneric(assNode.right, retArr);
            retArr.push(")");
          } else {
            const leftType = this.getType(assNode.left);
            const rightType = this.getType(assNode.right);
            this.astGeneric(assNode.left, retArr);
            retArr.push(assNode.operator);
            if (leftType !== "Integer" && rightType === "Integer") {
              retArr.push("float(");
              this.astGeneric(assNode.right, retArr);
              retArr.push(")");
            } else {
              this.astGeneric(assNode.right, retArr);
            }
            return retArr;
          }
        }
        astBlockStatement(bNode, retArr) {
          if (this.isState("loop-body")) {
            this.pushState("block-body");
            for (let i = 0; i < bNode.body.length; i++) {
              this.astGeneric(bNode.body[i], retArr);
            }
            this.popState("block-body");
          } else {
            retArr.push("{\n");
            for (let i = 0; i < bNode.body.length; i++) {
              this.astGeneric(bNode.body[i], retArr);
            }
            retArr.push("}\n");
          }
          return retArr;
        }
        astVariableDeclaration(varDecNode, retArr) {
          const declarations = varDecNode.declarations;
          if (!declarations || !declarations[0] || !declarations[0].init) {
            throw this.astErrorOutput("Unexpected expression", varDecNode);
          }
          const result = [];
          let lastType = null;
          const declarationSets = [];
          let declarationSet = [];
          for (let i = 0; i < declarations.length; i++) {
            const declaration = declarations[i];
            const init = declaration.init;
            const info = this.getDeclaration(declaration.id);
            const actualType = this.getType(declaration.init);
            let type = actualType;
            if (type === "LiteralInteger") {
              if (info.suggestedType === "Integer") {
                type = "Integer";
              } else {
                type = "Number";
              }
            }
            const markupType = typeMap[type];
            if (!markupType) {
              throw this.astErrorOutput(`Markup type ${type} not handled`, varDecNode);
            }
            const declarationResult = [];
            if (actualType === "Integer" && type === "Integer") {
              info.valueType = "Number";
              if (i === 0 || lastType === null) {
                declarationResult.push("float ");
              } else if (type !== lastType) {
                throw new Error("Unhandled declaration");
              }
              lastType = type;
              declarationResult.push(`user_${utils.sanitizeName(declaration.id.name)}=`);
              declarationResult.push("float(");
              this.astGeneric(init, declarationResult);
              declarationResult.push(")");
            } else {
              info.valueType = type;
              if (i === 0 || lastType === null) {
                declarationResult.push(`${markupType} `);
              } else if (type !== lastType) {
                declarationSets.push(declarationSet.join(","));
                declarationSet = [];
                declarationResult.push(`${markupType} `);
              }
              lastType = type;
              declarationResult.push(`user_${utils.sanitizeName(declaration.id.name)}=`);
              if (actualType === "Number" && type === "Integer") {
                if (init.left && init.left.type === "Literal") {
                  this.astGeneric(init, declarationResult);
                } else {
                  declarationResult.push("int(");
                  this.astGeneric(init, declarationResult);
                  declarationResult.push(")");
                }
              } else if (actualType === "LiteralInteger" && type === "Integer") {
                this.castLiteralToInteger(init, declarationResult);
              } else {
                this.astGeneric(init, declarationResult);
              }
            }
            declarationSet.push(declarationResult.join(""));
          }
          if (declarationSet.length > 0) {
            declarationSets.push(declarationSet.join(","));
          }
          result.push(declarationSets.join(";"));
          retArr.push(result.join(""));
          retArr.push(";");
          return retArr;
        }
        astIfStatement(ifNode, retArr) {
          retArr.push("if (");
          this.astGeneric(ifNode.test, retArr);
          retArr.push(")");
          if (ifNode.consequent.type === "BlockStatement") {
            this.astGeneric(ifNode.consequent, retArr);
          } else {
            retArr.push(" {\n");
            this.astGeneric(ifNode.consequent, retArr);
            retArr.push("\n}\n");
          }
          if (ifNode.alternate) {
            retArr.push("else ");
            if (ifNode.alternate.type === "BlockStatement" || ifNode.alternate.type === "IfStatement") {
              this.astGeneric(ifNode.alternate, retArr);
            } else {
              retArr.push(" {\n");
              this.astGeneric(ifNode.alternate, retArr);
              retArr.push("\n}\n");
            }
          }
          return retArr;
        }
        astSwitchStatement(ast, retArr) {
          if (ast.type !== "SwitchStatement") {
            throw this.astErrorOutput("Invalid switch statement", ast);
          }
          const { discriminant, cases } = ast;
          const type = this.getType(discriminant);
          const varName = `switchDiscriminant${this.astKey(ast, "_")}`;
          switch (type) {
            case "Float":
            case "Number":
              retArr.push(`float ${varName} = `);
              this.astGeneric(discriminant, retArr);
              retArr.push(";\n");
              break;
            case "Integer":
              retArr.push(`int ${varName} = `);
              this.astGeneric(discriminant, retArr);
              retArr.push(";\n");
              break;
          }
          if (cases.length === 1 && !cases[0].test) {
            this.astGeneric(cases[0].consequent, retArr);
            return retArr;
          }
          let fallingThrough = false;
          let defaultResult = [];
          let movingDefaultToEnd = false;
          let pastFirstIf = false;
          for (let i = 0; i < cases.length; i++) {
            if (!cases[i].test) {
              if (cases.length > i + 1) {
                movingDefaultToEnd = true;
                this.astGeneric(cases[i].consequent, defaultResult);
                continue;
              } else {
                retArr.push(" else {\n");
              }
            } else {
              if (i === 0 || !pastFirstIf) {
                pastFirstIf = true;
                retArr.push(`if (${varName} == `);
              } else {
                if (fallingThrough) {
                  retArr.push(`${varName} == `);
                  fallingThrough = false;
                } else {
                  retArr.push(` else if (${varName} == `);
                }
              }
              if (type === "Integer") {
                const testType = this.getType(cases[i].test);
                switch (testType) {
                  case "Number":
                  case "Float":
                    this.castValueToInteger(cases[i].test, retArr);
                    break;
                  case "LiteralInteger":
                    this.castLiteralToInteger(cases[i].test, retArr);
                    break;
                }
              } else if (type === "Float") {
                const testType = this.getType(cases[i].test);
                switch (testType) {
                  case "LiteralInteger":
                    this.castLiteralToFloat(cases[i].test, retArr);
                    break;
                  case "Integer":
                    this.castValueToFloat(cases[i].test, retArr);
                    break;
                }
              } else {
                throw new Error("unhanlded");
              }
              if (!cases[i].consequent || cases[i].consequent.length === 0) {
                fallingThrough = true;
                retArr.push(" || ");
                continue;
              }
              retArr.push(`) {
`);
            }
            this.astGeneric(cases[i].consequent, retArr);
            retArr.push("\n}");
          }
          if (movingDefaultToEnd) {
            retArr.push(" else {");
            retArr.push(defaultResult.join(""));
            retArr.push("}");
          }
          return retArr;
        }
        astThisExpression(tNode, retArr) {
          retArr.push("this");
          return retArr;
        }
        astMemberExpression(mNode, retArr) {
          const {
            property,
            name: name2,
            signature,
            origin,
            type,
            xProperty,
            yProperty,
            zProperty
          } = this.getMemberExpressionDetails(mNode);
          switch (signature) {
            case "value.thread.value":
            case "this.thread.value":
              if (name2 !== "x" && name2 !== "y" && name2 !== "z") {
                throw this.astErrorOutput("Unexpected expression, expected `this.thread.x`, `this.thread.y`, or `this.thread.z`", mNode);
              }
              retArr.push(`threadId.${name2}`);
              return retArr;
            case "this.output.value":
              if (this.dynamicOutput) {
                switch (name2) {
                  case "x":
                    if (this.isState("casting-to-float")) {
                      retArr.push("float(uOutputDim.x)");
                    } else {
                      retArr.push("uOutputDim.x");
                    }
                    break;
                  case "y":
                    if (this.isState("casting-to-float")) {
                      retArr.push("float(uOutputDim.y)");
                    } else {
                      retArr.push("uOutputDim.y");
                    }
                    break;
                  case "z":
                    if (this.isState("casting-to-float")) {
                      retArr.push("float(uOutputDim.z)");
                    } else {
                      retArr.push("uOutputDim.z");
                    }
                    break;
                  default:
                    throw this.astErrorOutput("Unexpected expression", mNode);
                }
              } else {
                switch (name2) {
                  case "x":
                    if (this.isState("casting-to-integer")) {
                      retArr.push(this.output[0]);
                    } else {
                      retArr.push(this.output[0], ".0");
                    }
                    break;
                  case "y":
                    if (this.isState("casting-to-integer")) {
                      retArr.push(this.output[1]);
                    } else {
                      retArr.push(this.output[1], ".0");
                    }
                    break;
                  case "z":
                    if (this.isState("casting-to-integer")) {
                      retArr.push(this.output[2]);
                    } else {
                      retArr.push(this.output[2], ".0");
                    }
                    break;
                  default:
                    throw this.astErrorOutput("Unexpected expression", mNode);
                }
              }
              return retArr;
            case "value":
              throw this.astErrorOutput("Unexpected expression", mNode);
            case "value[]":
            case "value[][]":
            case "value[][][]":
            case "value[][][][]":
            case "value.value":
              if (origin === "Math") {
                retArr.push(Math[name2]);
                return retArr;
              }
              const cleanName = utils.sanitizeName(name2);
              switch (property) {
                case "r":
                  retArr.push(`user_${cleanName}.r`);
                  return retArr;
                case "g":
                  retArr.push(`user_${cleanName}.g`);
                  return retArr;
                case "b":
                  retArr.push(`user_${cleanName}.b`);
                  return retArr;
                case "a":
                  retArr.push(`user_${cleanName}.a`);
                  return retArr;
              }
              break;
            case "this.constants.value":
              if (typeof xProperty === "undefined") {
                switch (type) {
                  case "Array(2)":
                  case "Array(3)":
                  case "Array(4)":
                    retArr.push(`constants_${utils.sanitizeName(name2)}`);
                    return retArr;
                }
              }
            case "this.constants.value[]":
            case "this.constants.value[][]":
            case "this.constants.value[][][]":
            case "this.constants.value[][][][]":
              break;
            case "fn()[]":
              this.astCallExpression(mNode.object, retArr);
              retArr.push("[");
              retArr.push(this.memberExpressionPropertyMarkup(property));
              retArr.push("]");
              return retArr;
            case "fn()[][]":
              this.astCallExpression(mNode.object.object, retArr);
              retArr.push("[");
              retArr.push(this.memberExpressionPropertyMarkup(mNode.object.property));
              retArr.push("]");
              retArr.push("[");
              retArr.push(this.memberExpressionPropertyMarkup(mNode.property));
              retArr.push("]");
              return retArr;
            case "[][]":
              this.astArrayExpression(mNode.object, retArr);
              retArr.push("[");
              retArr.push(this.memberExpressionPropertyMarkup(property));
              retArr.push("]");
              return retArr;
            default:
              throw this.astErrorOutput("Unexpected expression", mNode);
          }
          if (mNode.computed === false) {
            switch (type) {
              case "Number":
              case "Integer":
              case "Float":
              case "Boolean":
                retArr.push(`${origin}_${utils.sanitizeName(name2)}`);
                return retArr;
            }
          }
          const markupName = `${origin}_${utils.sanitizeName(name2)}`;
          switch (type) {
            case "Array(2)":
            case "Array(3)":
            case "Array(4)":
              this.astGeneric(mNode.object, retArr);
              retArr.push("[");
              retArr.push(this.memberExpressionPropertyMarkup(xProperty));
              retArr.push("]");
              break;
            case "HTMLImageArray":
              retArr.push(`getImage3D(${markupName}, ${markupName}Size, ${markupName}Dim, `);
              this.memberExpressionXYZ(xProperty, yProperty, zProperty, retArr);
              retArr.push(")");
              break;
            case "ArrayTexture(1)":
              retArr.push(`getFloatFromSampler2D(${markupName}, ${markupName}Size, ${markupName}Dim, `);
              this.memberExpressionXYZ(xProperty, yProperty, zProperty, retArr);
              retArr.push(")");
              break;
            case "Array1D(2)":
            case "Array2D(2)":
            case "Array3D(2)":
              retArr.push(`getMemoryOptimizedVec2(${markupName}, ${markupName}Size, ${markupName}Dim, `);
              this.memberExpressionXYZ(xProperty, yProperty, zProperty, retArr);
              retArr.push(")");
              break;
            case "ArrayTexture(2)":
              retArr.push(`getVec2FromSampler2D(${markupName}, ${markupName}Size, ${markupName}Dim, `);
              this.memberExpressionXYZ(xProperty, yProperty, zProperty, retArr);
              retArr.push(")");
              break;
            case "Array1D(3)":
            case "Array2D(3)":
            case "Array3D(3)":
              retArr.push(`getMemoryOptimizedVec3(${markupName}, ${markupName}Size, ${markupName}Dim, `);
              this.memberExpressionXYZ(xProperty, yProperty, zProperty, retArr);
              retArr.push(")");
              break;
            case "ArrayTexture(3)":
              retArr.push(`getVec3FromSampler2D(${markupName}, ${markupName}Size, ${markupName}Dim, `);
              this.memberExpressionXYZ(xProperty, yProperty, zProperty, retArr);
              retArr.push(")");
              break;
            case "Array1D(4)":
            case "Array2D(4)":
            case "Array3D(4)":
              retArr.push(`getMemoryOptimizedVec4(${markupName}, ${markupName}Size, ${markupName}Dim, `);
              this.memberExpressionXYZ(xProperty, yProperty, zProperty, retArr);
              retArr.push(")");
              break;
            case "ArrayTexture(4)":
            case "HTMLCanvas":
            case "OffscreenCanvas":
            case "HTMLImage":
            case "ImageBitmap":
            case "ImageData":
            case "HTMLVideo":
              retArr.push(`getVec4FromSampler2D(${markupName}, ${markupName}Size, ${markupName}Dim, `);
              this.memberExpressionXYZ(xProperty, yProperty, zProperty, retArr);
              retArr.push(")");
              break;
            case "NumberTexture":
            case "Array":
            case "Array2D":
            case "Array3D":
            case "Array4D":
            case "Input":
            case "Number":
            case "Float":
            case "Integer":
              if (this.precision === "single") {
                retArr.push(`getMemoryOptimized32(${markupName}, ${markupName}Size, ${markupName}Dim, `);
                this.memberExpressionXYZ(xProperty, yProperty, zProperty, retArr);
                retArr.push(")");
              } else {
                const bitRatio = origin === "user" ? this.lookupFunctionArgumentBitRatio(this.name, name2) : this.constantBitRatios[name2];
                switch (bitRatio) {
                  case 1:
                    retArr.push(`get8(${markupName}, ${markupName}Size, ${markupName}Dim, `);
                    break;
                  case 2:
                    retArr.push(`get16(${markupName}, ${markupName}Size, ${markupName}Dim, `);
                    break;
                  case 4:
                  case 0:
                    retArr.push(`get32(${markupName}, ${markupName}Size, ${markupName}Dim, `);
                    break;
                  default:
                    throw new Error(`unhandled bit ratio of ${bitRatio}`);
                }
                this.memberExpressionXYZ(xProperty, yProperty, zProperty, retArr);
                retArr.push(")");
              }
              break;
            case "MemoryOptimizedNumberTexture":
              retArr.push(`getMemoryOptimized32(${markupName}, ${markupName}Size, ${markupName}Dim, `);
              this.memberExpressionXYZ(xProperty, yProperty, zProperty, retArr);
              retArr.push(")");
              break;
            case "Matrix(2)":
            case "Matrix(3)":
            case "Matrix(4)":
              retArr.push(`${markupName}[${this.memberExpressionPropertyMarkup(yProperty)}]`);
              if (yProperty) {
                retArr.push(`[${this.memberExpressionPropertyMarkup(xProperty)}]`);
              }
              break;
            default:
              throw new Error(`unhandled member expression "${type}"`);
          }
          return retArr;
        }
        astCallExpression(ast, retArr) {
          if (!ast.callee) {
            throw this.astErrorOutput("Unknown CallExpression", ast);
          }
          let functionName = null;
          const isMathFunction = this.isAstMathFunction(ast);
          if (isMathFunction || ast.callee.object && ast.callee.object.type === "ThisExpression") {
            functionName = ast.callee.property.name;
          } else if (ast.callee.type === "SequenceExpression" && ast.callee.expressions[0].type === "Literal" && !isNaN(ast.callee.expressions[0].raw)) {
            functionName = ast.callee.expressions[1].property.name;
          } else {
            functionName = ast.callee.name;
          }
          if (!functionName) {
            throw this.astErrorOutput(`Unhandled function, couldn't find name`, ast);
          }
          switch (functionName) {
            case "pow":
              functionName = "_pow";
              break;
            case "round":
              functionName = "_round";
              break;
          }
          if (this.calledFunctions.indexOf(functionName) < 0) {
            this.calledFunctions.push(functionName);
          }
          if (functionName === "random" && this.plugins && this.plugins.length > 0) {
            for (let i = 0; i < this.plugins.length; i++) {
              const plugin = this.plugins[i];
              if (plugin.functionMatch === "Math.random()" && plugin.functionReplace) {
                retArr.push(plugin.functionReplace);
                return retArr;
              }
            }
          }
          if (this.onFunctionCall) {
            this.onFunctionCall(this.name, functionName, ast.arguments);
          }
          retArr.push(functionName);
          retArr.push("(");
          if (isMathFunction) {
            for (let i = 0; i < ast.arguments.length; ++i) {
              const argument = ast.arguments[i];
              const argumentType = this.getType(argument);
              if (i > 0) {
                retArr.push(", ");
              }
              switch (argumentType) {
                case "Integer":
                  this.castValueToFloat(argument, retArr);
                  break;
                default:
                  this.astGeneric(argument, retArr);
                  break;
              }
            }
          } else {
            const targetTypes = this.lookupFunctionArgumentTypes(functionName) || [];
            for (let i = 0; i < ast.arguments.length; ++i) {
              const argument = ast.arguments[i];
              let targetType = targetTypes[i];
              if (i > 0) {
                retArr.push(", ");
              }
              const argumentType = this.getType(argument);
              if (!targetType) {
                this.triggerImplyArgumentType(functionName, i, argumentType, this);
                targetType = argumentType;
              }
              switch (argumentType) {
                case "Boolean":
                  this.astGeneric(argument, retArr);
                  continue;
                case "Number":
                case "Float":
                  if (targetType === "Integer") {
                    retArr.push("int(");
                    this.astGeneric(argument, retArr);
                    retArr.push(")");
                    continue;
                  } else if (targetType === "Number" || targetType === "Float") {
                    this.astGeneric(argument, retArr);
                    continue;
                  } else if (targetType === "LiteralInteger") {
                    this.castLiteralToFloat(argument, retArr);
                    continue;
                  }
                  break;
                case "Integer":
                  if (targetType === "Number" || targetType === "Float") {
                    retArr.push("float(");
                    this.astGeneric(argument, retArr);
                    retArr.push(")");
                    continue;
                  } else if (targetType === "Integer") {
                    this.astGeneric(argument, retArr);
                    continue;
                  }
                  break;
                case "LiteralInteger":
                  if (targetType === "Integer") {
                    this.castLiteralToInteger(argument, retArr);
                    continue;
                  } else if (targetType === "Number" || targetType === "Float") {
                    this.castLiteralToFloat(argument, retArr);
                    continue;
                  } else if (targetType === "LiteralInteger") {
                    this.astGeneric(argument, retArr);
                    continue;
                  }
                  break;
                case "Array(2)":
                case "Array(3)":
                case "Array(4)":
                  if (targetType === argumentType) {
                    if (argument.type === "Identifier") {
                      retArr.push(`user_${utils.sanitizeName(argument.name)}`);
                    } else if (argument.type === "ArrayExpression" || argument.type === "MemberExpression" || argument.type === "CallExpression") {
                      this.astGeneric(argument, retArr);
                    } else {
                      throw this.astErrorOutput(`Unhandled argument type ${argument.type}`, ast);
                    }
                    continue;
                  }
                  break;
                case "HTMLCanvas":
                case "OffscreenCanvas":
                case "HTMLImage":
                case "ImageBitmap":
                case "ImageData":
                case "HTMLImageArray":
                case "HTMLVideo":
                case "ArrayTexture(1)":
                case "ArrayTexture(2)":
                case "ArrayTexture(3)":
                case "ArrayTexture(4)":
                case "Array":
                case "Input":
                  if (targetType === argumentType) {
                    if (argument.type !== "Identifier")
                      throw this.astErrorOutput(`Unhandled argument type ${argument.type}`, ast);
                    this.triggerImplyArgumentBitRatio(this.name, argument.name, functionName, i);
                    const name2 = utils.sanitizeName(argument.name);
                    retArr.push(`user_${name2},user_${name2}Size,user_${name2}Dim`);
                    continue;
                  }
                  break;
              }
              throw this.astErrorOutput(`Unhandled argument combination of ${argumentType} and ${targetType} for argument named "${argument.name}"`, ast);
            }
          }
          retArr.push(")");
          return retArr;
        }
        astArrayExpression(arrNode, retArr) {
          const returnType = this.getType(arrNode);
          const arrLen = arrNode.elements.length;
          switch (returnType) {
            case "Matrix(2)":
            case "Matrix(3)":
            case "Matrix(4)":
              retArr.push(`mat${arrLen}(`);
              break;
            default:
              retArr.push(`vec${arrLen}(`);
          }
          for (let i = 0; i < arrLen; ++i) {
            if (i > 0) {
              retArr.push(", ");
            }
            const subNode = arrNode.elements[i];
            this.astGeneric(subNode, retArr);
          }
          retArr.push(")");
          return retArr;
        }
        memberExpressionXYZ(x, y, z, retArr) {
          if (z) {
            retArr.push(this.memberExpressionPropertyMarkup(z), ", ");
          } else {
            retArr.push("0, ");
          }
          if (y) {
            retArr.push(this.memberExpressionPropertyMarkup(y), ", ");
          } else {
            retArr.push("0, ");
          }
          retArr.push(this.memberExpressionPropertyMarkup(x));
          return retArr;
        }
        memberExpressionPropertyMarkup(property) {
          if (!property) {
            throw new Error("Property not set");
          }
          const type = this.getType(property);
          const result = [];
          switch (type) {
            case "Number":
            case "Float":
              this.castValueToInteger(property, result);
              break;
            case "LiteralInteger":
              this.castLiteralToInteger(property, result);
              break;
            default:
              this.astGeneric(property, result);
          }
          return result.join("");
        }
      }
      const typeMap = {
        "Array": "sampler2D",
        "Array(2)": "vec2",
        "Array(3)": "vec3",
        "Array(4)": "vec4",
        "Matrix(2)": "mat2",
        "Matrix(3)": "mat3",
        "Matrix(4)": "mat4",
        "Array2D": "sampler2D",
        "Array3D": "sampler2D",
        "Boolean": "bool",
        "Float": "float",
        "Input": "sampler2D",
        "Integer": "int",
        "Number": "float",
        "LiteralInteger": "float",
        "NumberTexture": "sampler2D",
        "MemoryOptimizedNumberTexture": "sampler2D",
        "ArrayTexture(1)": "sampler2D",
        "ArrayTexture(2)": "sampler2D",
        "ArrayTexture(3)": "sampler2D",
        "ArrayTexture(4)": "sampler2D",
        "HTMLVideo": "sampler2D",
        "HTMLCanvas": "sampler2D",
        "OffscreenCanvas": "sampler2D",
        "HTMLImage": "sampler2D",
        "ImageBitmap": "sampler2D",
        "ImageData": "sampler2D",
        "HTMLImageArray": "sampler2DArray"
      };
      const operatorMap = {
        "===": "==",
        "!==": "!="
      };
      module2.exports = {
        WebGLFunctionNode
      };
    }, { "../../utils": 114, "../function-node": 10 }], 39: [function(require2, module2, exports2) {
      const { WebGLKernelValueBoolean } = require2("./kernel-value/boolean");
      const { WebGLKernelValueFloat } = require2("./kernel-value/float");
      const { WebGLKernelValueInteger } = require2("./kernel-value/integer");
      const { WebGLKernelValueHTMLImage } = require2("./kernel-value/html-image");
      const { WebGLKernelValueDynamicHTMLImage } = require2("./kernel-value/dynamic-html-image");
      const { WebGLKernelValueHTMLVideo } = require2("./kernel-value/html-video");
      const { WebGLKernelValueDynamicHTMLVideo } = require2("./kernel-value/dynamic-html-video");
      const { WebGLKernelValueSingleInput } = require2("./kernel-value/single-input");
      const { WebGLKernelValueDynamicSingleInput } = require2("./kernel-value/dynamic-single-input");
      const { WebGLKernelValueUnsignedInput } = require2("./kernel-value/unsigned-input");
      const { WebGLKernelValueDynamicUnsignedInput } = require2("./kernel-value/dynamic-unsigned-input");
      const { WebGLKernelValueMemoryOptimizedNumberTexture } = require2("./kernel-value/memory-optimized-number-texture");
      const { WebGLKernelValueDynamicMemoryOptimizedNumberTexture } = require2("./kernel-value/dynamic-memory-optimized-number-texture");
      const { WebGLKernelValueNumberTexture } = require2("./kernel-value/number-texture");
      const { WebGLKernelValueDynamicNumberTexture } = require2("./kernel-value/dynamic-number-texture");
      const { WebGLKernelValueSingleArray } = require2("./kernel-value/single-array");
      const { WebGLKernelValueDynamicSingleArray } = require2("./kernel-value/dynamic-single-array");
      const { WebGLKernelValueSingleArray1DI } = require2("./kernel-value/single-array1d-i");
      const { WebGLKernelValueDynamicSingleArray1DI } = require2("./kernel-value/dynamic-single-array1d-i");
      const { WebGLKernelValueSingleArray2DI } = require2("./kernel-value/single-array2d-i");
      const { WebGLKernelValueDynamicSingleArray2DI } = require2("./kernel-value/dynamic-single-array2d-i");
      const { WebGLKernelValueSingleArray3DI } = require2("./kernel-value/single-array3d-i");
      const { WebGLKernelValueDynamicSingleArray3DI } = require2("./kernel-value/dynamic-single-array3d-i");
      const { WebGLKernelValueArray2 } = require2("./kernel-value/array2");
      const { WebGLKernelValueArray3 } = require2("./kernel-value/array3");
      const { WebGLKernelValueArray4 } = require2("./kernel-value/array4");
      const { WebGLKernelValueUnsignedArray } = require2("./kernel-value/unsigned-array");
      const { WebGLKernelValueDynamicUnsignedArray } = require2("./kernel-value/dynamic-unsigned-array");
      const kernelValueMaps = {
        unsigned: {
          dynamic: {
            "Boolean": WebGLKernelValueBoolean,
            "Integer": WebGLKernelValueInteger,
            "Float": WebGLKernelValueFloat,
            "Array": WebGLKernelValueDynamicUnsignedArray,
            "Array(2)": WebGLKernelValueArray2,
            "Array(3)": WebGLKernelValueArray3,
            "Array(4)": WebGLKernelValueArray4,
            "Array1D(2)": false,
            "Array1D(3)": false,
            "Array1D(4)": false,
            "Array2D(2)": false,
            "Array2D(3)": false,
            "Array2D(4)": false,
            "Array3D(2)": false,
            "Array3D(3)": false,
            "Array3D(4)": false,
            "Input": WebGLKernelValueDynamicUnsignedInput,
            "NumberTexture": WebGLKernelValueDynamicNumberTexture,
            "ArrayTexture(1)": WebGLKernelValueDynamicNumberTexture,
            "ArrayTexture(2)": WebGLKernelValueDynamicNumberTexture,
            "ArrayTexture(3)": WebGLKernelValueDynamicNumberTexture,
            "ArrayTexture(4)": WebGLKernelValueDynamicNumberTexture,
            "MemoryOptimizedNumberTexture": WebGLKernelValueDynamicMemoryOptimizedNumberTexture,
            "HTMLCanvas": WebGLKernelValueDynamicHTMLImage,
            "OffscreenCanvas": WebGLKernelValueDynamicHTMLImage,
            "HTMLImage": WebGLKernelValueDynamicHTMLImage,
            "ImageBitmap": WebGLKernelValueDynamicHTMLImage,
            "ImageData": WebGLKernelValueDynamicHTMLImage,
            "HTMLImageArray": false,
            "HTMLVideo": WebGLKernelValueDynamicHTMLVideo
          },
          static: {
            "Boolean": WebGLKernelValueBoolean,
            "Float": WebGLKernelValueFloat,
            "Integer": WebGLKernelValueInteger,
            "Array": WebGLKernelValueUnsignedArray,
            "Array(2)": WebGLKernelValueArray2,
            "Array(3)": WebGLKernelValueArray3,
            "Array(4)": WebGLKernelValueArray4,
            "Array1D(2)": false,
            "Array1D(3)": false,
            "Array1D(4)": false,
            "Array2D(2)": false,
            "Array2D(3)": false,
            "Array2D(4)": false,
            "Array3D(2)": false,
            "Array3D(3)": false,
            "Array3D(4)": false,
            "Input": WebGLKernelValueUnsignedInput,
            "NumberTexture": WebGLKernelValueNumberTexture,
            "ArrayTexture(1)": WebGLKernelValueNumberTexture,
            "ArrayTexture(2)": WebGLKernelValueNumberTexture,
            "ArrayTexture(3)": WebGLKernelValueNumberTexture,
            "ArrayTexture(4)": WebGLKernelValueNumberTexture,
            "MemoryOptimizedNumberTexture": WebGLKernelValueMemoryOptimizedNumberTexture,
            "HTMLCanvas": WebGLKernelValueHTMLImage,
            "OffscreenCanvas": WebGLKernelValueHTMLImage,
            "HTMLImage": WebGLKernelValueHTMLImage,
            "ImageBitmap": WebGLKernelValueHTMLImage,
            "ImageData": WebGLKernelValueHTMLImage,
            "HTMLImageArray": false,
            "HTMLVideo": WebGLKernelValueHTMLVideo
          }
        },
        single: {
          dynamic: {
            "Boolean": WebGLKernelValueBoolean,
            "Integer": WebGLKernelValueInteger,
            "Float": WebGLKernelValueFloat,
            "Array": WebGLKernelValueDynamicSingleArray,
            "Array(2)": WebGLKernelValueArray2,
            "Array(3)": WebGLKernelValueArray3,
            "Array(4)": WebGLKernelValueArray4,
            "Array1D(2)": WebGLKernelValueDynamicSingleArray1DI,
            "Array1D(3)": WebGLKernelValueDynamicSingleArray1DI,
            "Array1D(4)": WebGLKernelValueDynamicSingleArray1DI,
            "Array2D(2)": WebGLKernelValueDynamicSingleArray2DI,
            "Array2D(3)": WebGLKernelValueDynamicSingleArray2DI,
            "Array2D(4)": WebGLKernelValueDynamicSingleArray2DI,
            "Array3D(2)": WebGLKernelValueDynamicSingleArray3DI,
            "Array3D(3)": WebGLKernelValueDynamicSingleArray3DI,
            "Array3D(4)": WebGLKernelValueDynamicSingleArray3DI,
            "Input": WebGLKernelValueDynamicSingleInput,
            "NumberTexture": WebGLKernelValueDynamicNumberTexture,
            "ArrayTexture(1)": WebGLKernelValueDynamicNumberTexture,
            "ArrayTexture(2)": WebGLKernelValueDynamicNumberTexture,
            "ArrayTexture(3)": WebGLKernelValueDynamicNumberTexture,
            "ArrayTexture(4)": WebGLKernelValueDynamicNumberTexture,
            "MemoryOptimizedNumberTexture": WebGLKernelValueDynamicMemoryOptimizedNumberTexture,
            "HTMLCanvas": WebGLKernelValueDynamicHTMLImage,
            "OffscreenCanvas": WebGLKernelValueDynamicHTMLImage,
            "HTMLImage": WebGLKernelValueDynamicHTMLImage,
            "ImageBitmap": WebGLKernelValueDynamicHTMLImage,
            "ImageData": WebGLKernelValueDynamicHTMLImage,
            "HTMLImageArray": false,
            "HTMLVideo": WebGLKernelValueDynamicHTMLVideo
          },
          static: {
            "Boolean": WebGLKernelValueBoolean,
            "Float": WebGLKernelValueFloat,
            "Integer": WebGLKernelValueInteger,
            "Array": WebGLKernelValueSingleArray,
            "Array(2)": WebGLKernelValueArray2,
            "Array(3)": WebGLKernelValueArray3,
            "Array(4)": WebGLKernelValueArray4,
            "Array1D(2)": WebGLKernelValueSingleArray1DI,
            "Array1D(3)": WebGLKernelValueSingleArray1DI,
            "Array1D(4)": WebGLKernelValueSingleArray1DI,
            "Array2D(2)": WebGLKernelValueSingleArray2DI,
            "Array2D(3)": WebGLKernelValueSingleArray2DI,
            "Array2D(4)": WebGLKernelValueSingleArray2DI,
            "Array3D(2)": WebGLKernelValueSingleArray3DI,
            "Array3D(3)": WebGLKernelValueSingleArray3DI,
            "Array3D(4)": WebGLKernelValueSingleArray3DI,
            "Input": WebGLKernelValueSingleInput,
            "NumberTexture": WebGLKernelValueNumberTexture,
            "ArrayTexture(1)": WebGLKernelValueNumberTexture,
            "ArrayTexture(2)": WebGLKernelValueNumberTexture,
            "ArrayTexture(3)": WebGLKernelValueNumberTexture,
            "ArrayTexture(4)": WebGLKernelValueNumberTexture,
            "MemoryOptimizedNumberTexture": WebGLKernelValueMemoryOptimizedNumberTexture,
            "HTMLCanvas": WebGLKernelValueHTMLImage,
            "OffscreenCanvas": WebGLKernelValueHTMLImage,
            "HTMLImage": WebGLKernelValueHTMLImage,
            "ImageBitmap": WebGLKernelValueHTMLImage,
            "ImageData": WebGLKernelValueHTMLImage,
            "HTMLImageArray": false,
            "HTMLVideo": WebGLKernelValueHTMLVideo
          }
        }
      };
      function lookupKernelValueType(type, dynamic, precision, value2) {
        if (!type) {
          throw new Error("type missing");
        }
        if (!dynamic) {
          throw new Error("dynamic missing");
        }
        if (!precision) {
          throw new Error("precision missing");
        }
        if (value2.type) {
          type = value2.type;
        }
        const types = kernelValueMaps[precision][dynamic];
        if (types[type] === false) {
          return null;
        } else if (types[type] === void 0) {
          throw new Error(`Could not find a KernelValue for ${type}`);
        }
        return types[type];
      }
      module2.exports = {
        lookupKernelValueType,
        kernelValueMaps
      };
    }, { "./kernel-value/array2": 41, "./kernel-value/array3": 42, "./kernel-value/array4": 43, "./kernel-value/boolean": 44, "./kernel-value/dynamic-html-image": 45, "./kernel-value/dynamic-html-video": 46, "./kernel-value/dynamic-memory-optimized-number-texture": 47, "./kernel-value/dynamic-number-texture": 48, "./kernel-value/dynamic-single-array": 49, "./kernel-value/dynamic-single-array1d-i": 50, "./kernel-value/dynamic-single-array2d-i": 51, "./kernel-value/dynamic-single-array3d-i": 52, "./kernel-value/dynamic-single-input": 53, "./kernel-value/dynamic-unsigned-array": 54, "./kernel-value/dynamic-unsigned-input": 55, "./kernel-value/float": 56, "./kernel-value/html-image": 57, "./kernel-value/html-video": 58, "./kernel-value/integer": 60, "./kernel-value/memory-optimized-number-texture": 61, "./kernel-value/number-texture": 62, "./kernel-value/single-array": 63, "./kernel-value/single-array1d-i": 64, "./kernel-value/single-array2d-i": 65, "./kernel-value/single-array3d-i": 66, "./kernel-value/single-input": 67, "./kernel-value/unsigned-array": 68, "./kernel-value/unsigned-input": 69 }], 40: [function(require2, module2, exports2) {
      const { WebGLKernelValue } = require2("./index");
      const { Input } = require2("../../../input");
      class WebGLKernelArray extends WebGLKernelValue {
        checkSize(width, height) {
          if (!this.kernel.validate)
            return;
          const { maxTextureSize } = this.kernel.constructor.features;
          if (width > maxTextureSize || height > maxTextureSize) {
            if (width > height) {
              throw new Error(`Argument texture width of ${width} larger than maximum size of ${maxTextureSize} for your GPU`);
            } else if (width < height) {
              throw new Error(`Argument texture height of ${height} larger than maximum size of ${maxTextureSize} for your GPU`);
            } else {
              throw new Error(`Argument texture height and width of ${height} larger than maximum size of ${maxTextureSize} for your GPU`);
            }
          }
        }
        setup() {
          this.requestTexture();
          this.setupTexture();
          this.defineTexture();
        }
        requestTexture() {
          this.texture = this.onRequestTexture();
        }
        defineTexture() {
          const { context: gl } = this;
          gl.activeTexture(this.contextHandle);
          gl.bindTexture(gl.TEXTURE_2D, this.texture);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        }
        setupTexture() {
          this.contextHandle = this.onRequestContextHandle();
          this.index = this.onRequestIndex();
          this.dimensionsId = this.id + "Dim";
          this.sizeId = this.id + "Size";
        }
        getBitRatio(value2) {
          if (Array.isArray(value2[0])) {
            return this.getBitRatio(value2[0]);
          } else if (value2.constructor === Input) {
            return this.getBitRatio(value2.value);
          }
          switch (value2.constructor) {
            case Uint8ClampedArray:
            case Uint8Array:
            case Int8Array:
              return 1;
            case Uint16Array:
            case Int16Array:
              return 2;
            case Float32Array:
            case Int32Array:
            default:
              return 4;
          }
        }
        destroy() {
          if (this.prevArg) {
            this.prevArg.delete();
          }
          this.context.deleteTexture(this.texture);
        }
      }
      module2.exports = {
        WebGLKernelArray
      };
    }, { "../../../input": 110, "./index": 59 }], 41: [function(require2, module2, exports2) {
      const { WebGLKernelValue } = require2("./index");
      class WebGLKernelValueArray2 extends WebGLKernelValue {
        constructor(value2, settings) {
          super(value2, settings);
          this.uploadValue = value2;
        }
        getSource(value2) {
          if (this.origin === "constants") {
            return `const vec2 ${this.id} = vec2(${value2[0]},${value2[1]});
`;
          }
          return `uniform vec2 ${this.id};
`;
        }
        getStringValueHandler() {
          if (this.origin === "constants")
            return "";
          return `const uploadValue_${this.name} = ${this.varName};
`;
        }
        updateValue(value2) {
          if (this.origin === "constants")
            return;
          this.kernel.setUniform2fv(this.id, this.uploadValue = value2);
        }
      }
      module2.exports = {
        WebGLKernelValueArray2
      };
    }, { "./index": 59 }], 42: [function(require2, module2, exports2) {
      const { WebGLKernelValue } = require2("./index");
      class WebGLKernelValueArray3 extends WebGLKernelValue {
        constructor(value2, settings) {
          super(value2, settings);
          this.uploadValue = value2;
        }
        getSource(value2) {
          if (this.origin === "constants") {
            return `const vec3 ${this.id} = vec3(${value2[0]},${value2[1]},${value2[2]});
`;
          }
          return `uniform vec3 ${this.id};
`;
        }
        getStringValueHandler() {
          if (this.origin === "constants")
            return "";
          return `const uploadValue_${this.name} = ${this.varName};
`;
        }
        updateValue(value2) {
          if (this.origin === "constants")
            return;
          this.kernel.setUniform3fv(this.id, this.uploadValue = value2);
        }
      }
      module2.exports = {
        WebGLKernelValueArray3
      };
    }, { "./index": 59 }], 43: [function(require2, module2, exports2) {
      const { WebGLKernelValue } = require2("./index");
      class WebGLKernelValueArray4 extends WebGLKernelValue {
        constructor(value2, settings) {
          super(value2, settings);
          this.uploadValue = value2;
        }
        getSource(value2) {
          if (this.origin === "constants") {
            return `const vec4 ${this.id} = vec4(${value2[0]},${value2[1]},${value2[2]},${value2[3]});
`;
          }
          return `uniform vec4 ${this.id};
`;
        }
        getStringValueHandler() {
          if (this.origin === "constants")
            return "";
          return `const uploadValue_${this.name} = ${this.varName};
`;
        }
        updateValue(value2) {
          if (this.origin === "constants")
            return;
          this.kernel.setUniform4fv(this.id, this.uploadValue = value2);
        }
      }
      module2.exports = {
        WebGLKernelValueArray4
      };
    }, { "./index": 59 }], 44: [function(require2, module2, exports2) {
      require2("../../../utils");
      const { WebGLKernelValue } = require2("./index");
      class WebGLKernelValueBoolean extends WebGLKernelValue {
        constructor(value2, settings) {
          super(value2, settings);
          this.uploadValue = value2;
        }
        getSource(value2) {
          if (this.origin === "constants") {
            return `const bool ${this.id} = ${value2};
`;
          }
          return `uniform bool ${this.id};
`;
        }
        getStringValueHandler() {
          return `const uploadValue_${this.name} = ${this.varName};
`;
        }
        updateValue(value2) {
          if (this.origin === "constants")
            return;
          this.kernel.setUniform1i(this.id, this.uploadValue = value2);
        }
      }
      module2.exports = {
        WebGLKernelValueBoolean
      };
    }, { "../../../utils": 114, "./index": 59 }], 45: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueHTMLImage } = require2("./html-image");
      class WebGLKernelValueDynamicHTMLImage extends WebGLKernelValueHTMLImage {
        getSource() {
          return utils.linesToString([
            `uniform sampler2D ${this.id}`,
            `uniform ivec2 ${this.sizeId}`,
            `uniform ivec3 ${this.dimensionsId}`
          ]);
        }
        updateValue(value2) {
          const { width, height } = value2;
          this.checkSize(width, height);
          this.dimensions = [width, height, 1];
          this.textureSize = [width, height];
          this.kernel.setUniform3iv(this.dimensionsId, this.dimensions);
          this.kernel.setUniform2iv(this.sizeId, this.textureSize);
          super.updateValue(value2);
        }
      }
      module2.exports = {
        WebGLKernelValueDynamicHTMLImage
      };
    }, { "../../../utils": 114, "./html-image": 57 }], 46: [function(require2, module2, exports2) {
      const { WebGLKernelValueDynamicHTMLImage } = require2("./dynamic-html-image");
      class WebGLKernelValueDynamicHTMLVideo extends WebGLKernelValueDynamicHTMLImage {
      }
      module2.exports = {
        WebGLKernelValueDynamicHTMLVideo
      };
    }, { "./dynamic-html-image": 45 }], 47: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueMemoryOptimizedNumberTexture } = require2("./memory-optimized-number-texture");
      class WebGLKernelValueDynamicMemoryOptimizedNumberTexture extends WebGLKernelValueMemoryOptimizedNumberTexture {
        getSource() {
          return utils.linesToString([
            `uniform sampler2D ${this.id}`,
            `uniform ivec2 ${this.sizeId}`,
            `uniform ivec3 ${this.dimensionsId}`
          ]);
        }
        updateValue(inputTexture) {
          this.dimensions = inputTexture.dimensions;
          this.checkSize(inputTexture.size[0], inputTexture.size[1]);
          this.textureSize = inputTexture.size;
          this.kernel.setUniform3iv(this.dimensionsId, this.dimensions);
          this.kernel.setUniform2iv(this.sizeId, this.textureSize);
          super.updateValue(inputTexture);
        }
      }
      module2.exports = {
        WebGLKernelValueDynamicMemoryOptimizedNumberTexture
      };
    }, { "../../../utils": 114, "./memory-optimized-number-texture": 61 }], 48: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueNumberTexture } = require2("./number-texture");
      class WebGLKernelValueDynamicNumberTexture extends WebGLKernelValueNumberTexture {
        getSource() {
          return utils.linesToString([
            `uniform sampler2D ${this.id}`,
            `uniform ivec2 ${this.sizeId}`,
            `uniform ivec3 ${this.dimensionsId}`
          ]);
        }
        updateValue(value2) {
          this.dimensions = value2.dimensions;
          this.checkSize(value2.size[0], value2.size[1]);
          this.textureSize = value2.size;
          this.kernel.setUniform3iv(this.dimensionsId, this.dimensions);
          this.kernel.setUniform2iv(this.sizeId, this.textureSize);
          super.updateValue(value2);
        }
      }
      module2.exports = {
        WebGLKernelValueDynamicNumberTexture
      };
    }, { "../../../utils": 114, "./number-texture": 62 }], 49: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueSingleArray } = require2("./single-array");
      class WebGLKernelValueDynamicSingleArray extends WebGLKernelValueSingleArray {
        getSource() {
          return utils.linesToString([
            `uniform sampler2D ${this.id}`,
            `uniform ivec2 ${this.sizeId}`,
            `uniform ivec3 ${this.dimensionsId}`
          ]);
        }
        updateValue(value2) {
          this.dimensions = utils.getDimensions(value2, true);
          this.textureSize = utils.getMemoryOptimizedFloatTextureSize(this.dimensions, this.bitRatio);
          this.uploadArrayLength = this.textureSize[0] * this.textureSize[1] * this.bitRatio;
          this.checkSize(this.textureSize[0], this.textureSize[1]);
          this.uploadValue = new Float32Array(this.uploadArrayLength);
          this.kernel.setUniform3iv(this.dimensionsId, this.dimensions);
          this.kernel.setUniform2iv(this.sizeId, this.textureSize);
          super.updateValue(value2);
        }
      }
      module2.exports = {
        WebGLKernelValueDynamicSingleArray
      };
    }, { "../../../utils": 114, "./single-array": 63 }], 50: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueSingleArray1DI } = require2("./single-array1d-i");
      class WebGLKernelValueDynamicSingleArray1DI extends WebGLKernelValueSingleArray1DI {
        getSource() {
          return utils.linesToString([
            `uniform sampler2D ${this.id}`,
            `uniform ivec2 ${this.sizeId}`,
            `uniform ivec3 ${this.dimensionsId}`
          ]);
        }
        updateValue(value2) {
          this.setShape(value2);
          this.kernel.setUniform3iv(this.dimensionsId, this.dimensions);
          this.kernel.setUniform2iv(this.sizeId, this.textureSize);
          super.updateValue(value2);
        }
      }
      module2.exports = {
        WebGLKernelValueDynamicSingleArray1DI
      };
    }, { "../../../utils": 114, "./single-array1d-i": 64 }], 51: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueSingleArray2DI } = require2("./single-array2d-i");
      class WebGLKernelValueDynamicSingleArray2DI extends WebGLKernelValueSingleArray2DI {
        getSource() {
          return utils.linesToString([
            `uniform sampler2D ${this.id}`,
            `uniform ivec2 ${this.sizeId}`,
            `uniform ivec3 ${this.dimensionsId}`
          ]);
        }
        updateValue(value2) {
          this.setShape(value2);
          this.kernel.setUniform3iv(this.dimensionsId, this.dimensions);
          this.kernel.setUniform2iv(this.sizeId, this.textureSize);
          super.updateValue(value2);
        }
      }
      module2.exports = {
        WebGLKernelValueDynamicSingleArray2DI
      };
    }, { "../../../utils": 114, "./single-array2d-i": 65 }], 52: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueSingleArray3DI } = require2("./single-array3d-i");
      class WebGLKernelValueDynamicSingleArray3DI extends WebGLKernelValueSingleArray3DI {
        getSource() {
          return utils.linesToString([
            `uniform sampler2D ${this.id}`,
            `uniform ivec2 ${this.sizeId}`,
            `uniform ivec3 ${this.dimensionsId}`
          ]);
        }
        updateValue(value2) {
          this.setShape(value2);
          this.kernel.setUniform3iv(this.dimensionsId, this.dimensions);
          this.kernel.setUniform2iv(this.sizeId, this.textureSize);
          super.updateValue(value2);
        }
      }
      module2.exports = {
        WebGLKernelValueDynamicSingleArray3DI
      };
    }, { "../../../utils": 114, "./single-array3d-i": 66 }], 53: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueSingleInput } = require2("./single-input");
      class WebGLKernelValueDynamicSingleInput extends WebGLKernelValueSingleInput {
        getSource() {
          return utils.linesToString([
            `uniform sampler2D ${this.id}`,
            `uniform ivec2 ${this.sizeId}`,
            `uniform ivec3 ${this.dimensionsId}`
          ]);
        }
        updateValue(value2) {
          let [w, h, d] = value2.size;
          this.dimensions = new Int32Array([w || 1, h || 1, d || 1]);
          this.textureSize = utils.getMemoryOptimizedFloatTextureSize(this.dimensions, this.bitRatio);
          this.uploadArrayLength = this.textureSize[0] * this.textureSize[1] * this.bitRatio;
          this.checkSize(this.textureSize[0], this.textureSize[1]);
          this.uploadValue = new Float32Array(this.uploadArrayLength);
          this.kernel.setUniform3iv(this.dimensionsId, this.dimensions);
          this.kernel.setUniform2iv(this.sizeId, this.textureSize);
          super.updateValue(value2);
        }
      }
      module2.exports = {
        WebGLKernelValueDynamicSingleInput
      };
    }, { "../../../utils": 114, "./single-input": 67 }], 54: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueUnsignedArray } = require2("./unsigned-array");
      class WebGLKernelValueDynamicUnsignedArray extends WebGLKernelValueUnsignedArray {
        getSource() {
          return utils.linesToString([
            `uniform sampler2D ${this.id}`,
            `uniform ivec2 ${this.sizeId}`,
            `uniform ivec3 ${this.dimensionsId}`
          ]);
        }
        updateValue(value2) {
          this.dimensions = utils.getDimensions(value2, true);
          this.textureSize = utils.getMemoryOptimizedPackedTextureSize(this.dimensions, this.bitRatio);
          this.uploadArrayLength = this.textureSize[0] * this.textureSize[1] * (4 / this.bitRatio);
          this.checkSize(this.textureSize[0], this.textureSize[1]);
          const Type = this.getTransferArrayType(value2);
          this.preUploadValue = new Type(this.uploadArrayLength);
          this.uploadValue = new Uint8Array(this.preUploadValue.buffer);
          this.kernel.setUniform3iv(this.dimensionsId, this.dimensions);
          this.kernel.setUniform2iv(this.sizeId, this.textureSize);
          super.updateValue(value2);
        }
      }
      module2.exports = {
        WebGLKernelValueDynamicUnsignedArray
      };
    }, { "../../../utils": 114, "./unsigned-array": 68 }], 55: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueUnsignedInput } = require2("./unsigned-input");
      class WebGLKernelValueDynamicUnsignedInput extends WebGLKernelValueUnsignedInput {
        getSource() {
          return utils.linesToString([
            `uniform sampler2D ${this.id}`,
            `uniform ivec2 ${this.sizeId}`,
            `uniform ivec3 ${this.dimensionsId}`
          ]);
        }
        updateValue(value2) {
          let [w, h, d] = value2.size;
          this.dimensions = new Int32Array([w || 1, h || 1, d || 1]);
          this.textureSize = utils.getMemoryOptimizedPackedTextureSize(this.dimensions, this.bitRatio);
          this.uploadArrayLength = this.textureSize[0] * this.textureSize[1] * (4 / this.bitRatio);
          this.checkSize(this.textureSize[0], this.textureSize[1]);
          const Type = this.getTransferArrayType(value2.value);
          this.preUploadValue = new Type(this.uploadArrayLength);
          this.uploadValue = new Uint8Array(this.preUploadValue.buffer);
          this.kernel.setUniform3iv(this.dimensionsId, this.dimensions);
          this.kernel.setUniform2iv(this.sizeId, this.textureSize);
          super.updateValue(value2);
        }
      }
      module2.exports = {
        WebGLKernelValueDynamicUnsignedInput
      };
    }, { "../../../utils": 114, "./unsigned-input": 69 }], 56: [function(require2, module2, exports2) {
      require2("../../../utils");
      const { WebGLKernelValue } = require2("./index");
      class WebGLKernelValueFloat extends WebGLKernelValue {
        constructor(value2, settings) {
          super(value2, settings);
          this.uploadValue = value2;
        }
        getStringValueHandler() {
          return `const uploadValue_${this.name} = ${this.varName};
`;
        }
        getSource(value2) {
          if (this.origin === "constants") {
            if (Number.isInteger(value2)) {
              return `const float ${this.id} = ${value2}.0;
`;
            }
            return `const float ${this.id} = ${value2};
`;
          }
          return `uniform float ${this.id};
`;
        }
        updateValue(value2) {
          if (this.origin === "constants")
            return;
          this.kernel.setUniform1f(this.id, this.uploadValue = value2);
        }
      }
      module2.exports = {
        WebGLKernelValueFloat
      };
    }, { "../../../utils": 114, "./index": 59 }], 57: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelArray } = require2("./array");
      class WebGLKernelValueHTMLImage extends WebGLKernelArray {
        constructor(value2, settings) {
          super(value2, settings);
          const { width, height } = value2;
          this.checkSize(width, height);
          this.dimensions = [width, height, 1];
          this.textureSize = [width, height];
          this.uploadValue = value2;
        }
        getStringValueHandler() {
          return `const uploadValue_${this.name} = ${this.varName};
`;
        }
        getSource() {
          return utils.linesToString([
            `uniform sampler2D ${this.id}`,
            `ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,
            `ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`
          ]);
        }
        updateValue(inputImage) {
          if (inputImage.constructor !== this.initialValueConstructor) {
            this.onUpdateValueMismatch(inputImage.constructor);
            return;
          }
          const { context: gl } = this;
          gl.activeTexture(this.contextHandle);
          gl.bindTexture(gl.TEXTURE_2D, this.texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.uploadValue = inputImage);
          this.kernel.setUniform1i(this.id, this.index);
        }
      }
      module2.exports = {
        WebGLKernelValueHTMLImage
      };
    }, { "../../../utils": 114, "./array": 40 }], 58: [function(require2, module2, exports2) {
      const { WebGLKernelValueHTMLImage } = require2("./html-image");
      class WebGLKernelValueHTMLVideo extends WebGLKernelValueHTMLImage {
      }
      module2.exports = {
        WebGLKernelValueHTMLVideo
      };
    }, { "./html-image": 57 }], 59: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { KernelValue } = require2("../../kernel-value");
      class WebGLKernelValue extends KernelValue {
        constructor(value2, settings) {
          super(value2, settings);
          this.dimensionsId = null;
          this.sizeId = null;
          this.initialValueConstructor = value2.constructor;
          this.onRequestTexture = settings.onRequestTexture;
          this.onRequestIndex = settings.onRequestIndex;
          this.uploadValue = null;
          this.textureSize = null;
          this.bitRatio = null;
          this.prevArg = null;
        }
        get id() {
          return `${this.origin}_${utils.sanitizeName(this.name)}`;
        }
        setup() {
        }
        getTransferArrayType(value2) {
          if (Array.isArray(value2[0])) {
            return this.getTransferArrayType(value2[0]);
          }
          switch (value2.constructor) {
            case Array:
            case Int32Array:
            case Int16Array:
            case Int8Array:
              return Float32Array;
            case Uint8ClampedArray:
            case Uint8Array:
            case Uint16Array:
            case Uint32Array:
            case Float32Array:
            case Float64Array:
              return value2.constructor;
          }
          console.warn("Unfamiliar constructor type.  Will go ahead and use, but likley this may result in a transfer of zeros");
          return value2.constructor;
        }
        getStringValueHandler() {
          throw new Error(`"getStringValueHandler" not implemented on ${this.constructor.name}`);
        }
        getVariablePrecisionString() {
          return this.kernel.getVariablePrecisionString(this.textureSize || void 0, this.tactic || void 0);
        }
        destroy() {
        }
      }
      module2.exports = {
        WebGLKernelValue
      };
    }, { "../../../utils": 114, "../../kernel-value": 35 }], 60: [function(require2, module2, exports2) {
      require2("../../../utils");
      const { WebGLKernelValue } = require2("./index");
      class WebGLKernelValueInteger extends WebGLKernelValue {
        constructor(value2, settings) {
          super(value2, settings);
          this.uploadValue = value2;
        }
        getStringValueHandler() {
          return `const uploadValue_${this.name} = ${this.varName};
`;
        }
        getSource(value2) {
          if (this.origin === "constants") {
            return `const int ${this.id} = ${parseInt(value2)};
`;
          }
          return `uniform int ${this.id};
`;
        }
        updateValue(value2) {
          if (this.origin === "constants")
            return;
          this.kernel.setUniform1i(this.id, this.uploadValue = value2);
        }
      }
      module2.exports = {
        WebGLKernelValueInteger
      };
    }, { "../../../utils": 114, "./index": 59 }], 61: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelArray } = require2("./array");
      const sameError = `Source and destination textures are the same.  Use immutable = true and manually cleanup kernel output texture memory with texture.delete()`;
      class WebGLKernelValueMemoryOptimizedNumberTexture extends WebGLKernelArray {
        constructor(value2, settings) {
          super(value2, settings);
          const [width, height] = value2.size;
          this.checkSize(width, height);
          this.dimensions = value2.dimensions;
          this.textureSize = value2.size;
          this.uploadValue = value2.texture;
          this.forceUploadEachRun = true;
        }
        setup() {
          this.setupTexture();
        }
        getStringValueHandler() {
          return `const uploadValue_${this.name} = ${this.varName}.texture;
`;
        }
        getSource() {
          return utils.linesToString([
            `uniform sampler2D ${this.id}`,
            `ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,
            `ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`
          ]);
        }
        updateValue(inputTexture) {
          if (inputTexture.constructor !== this.initialValueConstructor) {
            this.onUpdateValueMismatch(inputTexture.constructor);
            return;
          }
          if (this.checkContext && inputTexture.context !== this.context) {
            throw new Error(`Value ${this.name} (${this.type}) must be from same context`);
          }
          const { kernel, context: gl } = this;
          if (kernel.pipeline) {
            if (kernel.immutable) {
              kernel.updateTextureArgumentRefs(this, inputTexture);
            } else {
              if (kernel.texture && kernel.texture.texture === inputTexture.texture) {
                throw new Error(sameError);
              } else if (kernel.mappedTextures) {
                const { mappedTextures } = kernel;
                for (let i = 0; i < mappedTextures.length; i++) {
                  if (mappedTextures[i].texture === inputTexture.texture) {
                    throw new Error(sameError);
                  }
                }
              }
            }
          }
          gl.activeTexture(this.contextHandle);
          gl.bindTexture(gl.TEXTURE_2D, this.uploadValue = inputTexture.texture);
          this.kernel.setUniform1i(this.id, this.index);
        }
      }
      module2.exports = {
        WebGLKernelValueMemoryOptimizedNumberTexture,
        sameError
      };
    }, { "../../../utils": 114, "./array": 40 }], 62: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelArray } = require2("./array");
      const { sameError } = require2("./memory-optimized-number-texture");
      class WebGLKernelValueNumberTexture extends WebGLKernelArray {
        constructor(value2, settings) {
          super(value2, settings);
          const [width, height] = value2.size;
          this.checkSize(width, height);
          const { size: textureSize, dimensions } = value2;
          this.bitRatio = this.getBitRatio(value2);
          this.dimensions = dimensions;
          this.textureSize = textureSize;
          this.uploadValue = value2.texture;
          this.forceUploadEachRun = true;
        }
        setup() {
          this.setupTexture();
        }
        getStringValueHandler() {
          return `const uploadValue_${this.name} = ${this.varName}.texture;
`;
        }
        getSource() {
          return utils.linesToString([
            `uniform sampler2D ${this.id}`,
            `ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,
            `ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`
          ]);
        }
        updateValue(inputTexture) {
          if (inputTexture.constructor !== this.initialValueConstructor) {
            this.onUpdateValueMismatch(inputTexture.constructor);
            return;
          }
          if (this.checkContext && inputTexture.context !== this.context) {
            throw new Error(`Value ${this.name} (${this.type}) must be from same context`);
          }
          const { kernel, context: gl } = this;
          if (kernel.pipeline) {
            if (kernel.immutable) {
              kernel.updateTextureArgumentRefs(this, inputTexture);
            } else {
              if (kernel.texture && kernel.texture.texture === inputTexture.texture) {
                throw new Error(sameError);
              } else if (kernel.mappedTextures) {
                const { mappedTextures } = kernel;
                for (let i = 0; i < mappedTextures.length; i++) {
                  if (mappedTextures[i].texture === inputTexture.texture) {
                    throw new Error(sameError);
                  }
                }
              }
            }
          }
          gl.activeTexture(this.contextHandle);
          gl.bindTexture(gl.TEXTURE_2D, this.uploadValue = inputTexture.texture);
          this.kernel.setUniform1i(this.id, this.index);
        }
      }
      module2.exports = {
        WebGLKernelValueNumberTexture
      };
    }, { "../../../utils": 114, "./array": 40, "./memory-optimized-number-texture": 61 }], 63: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelArray } = require2("./array");
      class WebGLKernelValueSingleArray extends WebGLKernelArray {
        constructor(value2, settings) {
          super(value2, settings);
          this.bitRatio = 4;
          this.dimensions = utils.getDimensions(value2, true);
          this.textureSize = utils.getMemoryOptimizedFloatTextureSize(this.dimensions, this.bitRatio);
          this.uploadArrayLength = this.textureSize[0] * this.textureSize[1] * this.bitRatio;
          this.checkSize(this.textureSize[0], this.textureSize[1]);
          this.uploadValue = new Float32Array(this.uploadArrayLength);
        }
        getStringValueHandler() {
          return utils.linesToString([
            `const uploadValue_${this.name} = new Float32Array(${this.uploadArrayLength})`,
            `flattenTo(${this.varName}, uploadValue_${this.name})`
          ]);
        }
        getSource() {
          return utils.linesToString([
            `uniform sampler2D ${this.id}`,
            `ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,
            `ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`
          ]);
        }
        updateValue(value2) {
          if (value2.constructor !== this.initialValueConstructor) {
            this.onUpdateValueMismatch(value2.constructor);
            return;
          }
          const { context: gl } = this;
          utils.flattenTo(value2, this.uploadValue);
          gl.activeTexture(this.contextHandle);
          gl.bindTexture(gl.TEXTURE_2D, this.texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.textureSize[0], this.textureSize[1], 0, gl.RGBA, gl.FLOAT, this.uploadValue);
          this.kernel.setUniform1i(this.id, this.index);
        }
      }
      module2.exports = {
        WebGLKernelValueSingleArray
      };
    }, { "../../../utils": 114, "./array": 40 }], 64: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelArray } = require2("./array");
      class WebGLKernelValueSingleArray1DI extends WebGLKernelArray {
        constructor(value2, settings) {
          super(value2, settings);
          this.bitRatio = 4;
          this.setShape(value2);
        }
        setShape(value2) {
          const valueDimensions = utils.getDimensions(value2, true);
          this.textureSize = utils.getMemoryOptimizedFloatTextureSize(valueDimensions, this.bitRatio);
          this.dimensions = new Int32Array([valueDimensions[1], 1, 1]);
          this.uploadArrayLength = this.textureSize[0] * this.textureSize[1] * this.bitRatio;
          this.checkSize(this.textureSize[0], this.textureSize[1]);
          this.uploadValue = new Float32Array(this.uploadArrayLength);
        }
        getStringValueHandler() {
          return utils.linesToString([
            `const uploadValue_${this.name} = new Float32Array(${this.uploadArrayLength})`,
            `flattenTo(${this.varName}, uploadValue_${this.name})`
          ]);
        }
        getSource() {
          return utils.linesToString([
            `uniform sampler2D ${this.id}`,
            `ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,
            `ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`
          ]);
        }
        updateValue(value2) {
          if (value2.constructor !== this.initialValueConstructor) {
            this.onUpdateValueMismatch(value2.constructor);
            return;
          }
          const { context: gl } = this;
          utils.flatten2dArrayTo(value2, this.uploadValue);
          gl.activeTexture(this.contextHandle);
          gl.bindTexture(gl.TEXTURE_2D, this.texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.textureSize[0], this.textureSize[1], 0, gl.RGBA, gl.FLOAT, this.uploadValue);
          this.kernel.setUniform1i(this.id, this.index);
        }
      }
      module2.exports = {
        WebGLKernelValueSingleArray1DI
      };
    }, { "../../../utils": 114, "./array": 40 }], 65: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelArray } = require2("./array");
      class WebGLKernelValueSingleArray2DI extends WebGLKernelArray {
        constructor(value2, settings) {
          super(value2, settings);
          this.bitRatio = 4;
          this.setShape(value2);
        }
        setShape(value2) {
          const valueDimensions = utils.getDimensions(value2, true);
          this.textureSize = utils.getMemoryOptimizedFloatTextureSize(valueDimensions, this.bitRatio);
          this.dimensions = new Int32Array([valueDimensions[1], valueDimensions[2], 1]);
          this.uploadArrayLength = this.textureSize[0] * this.textureSize[1] * this.bitRatio;
          this.checkSize(this.textureSize[0], this.textureSize[1]);
          this.uploadValue = new Float32Array(this.uploadArrayLength);
        }
        getStringValueHandler() {
          return utils.linesToString([
            `const uploadValue_${this.name} = new Float32Array(${this.uploadArrayLength})`,
            `flattenTo(${this.varName}, uploadValue_${this.name})`
          ]);
        }
        getSource() {
          return utils.linesToString([
            `uniform sampler2D ${this.id}`,
            `ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,
            `ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`
          ]);
        }
        updateValue(value2) {
          if (value2.constructor !== this.initialValueConstructor) {
            this.onUpdateValueMismatch(value2.constructor);
            return;
          }
          const { context: gl } = this;
          utils.flatten3dArrayTo(value2, this.uploadValue);
          gl.activeTexture(this.contextHandle);
          gl.bindTexture(gl.TEXTURE_2D, this.texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.textureSize[0], this.textureSize[1], 0, gl.RGBA, gl.FLOAT, this.uploadValue);
          this.kernel.setUniform1i(this.id, this.index);
        }
      }
      module2.exports = {
        WebGLKernelValueSingleArray2DI
      };
    }, { "../../../utils": 114, "./array": 40 }], 66: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelArray } = require2("./array");
      class WebGLKernelValueSingleArray3DI extends WebGLKernelArray {
        constructor(value2, settings) {
          super(value2, settings);
          this.bitRatio = 4;
          this.setShape(value2);
        }
        setShape(value2) {
          const valueDimensions = utils.getDimensions(value2, true);
          this.textureSize = utils.getMemoryOptimizedFloatTextureSize(valueDimensions, this.bitRatio);
          this.dimensions = new Int32Array([valueDimensions[1], valueDimensions[2], valueDimensions[3]]);
          this.uploadArrayLength = this.textureSize[0] * this.textureSize[1] * this.bitRatio;
          this.checkSize(this.textureSize[0], this.textureSize[1]);
          this.uploadValue = new Float32Array(this.uploadArrayLength);
        }
        getStringValueHandler() {
          return utils.linesToString([
            `const uploadValue_${this.name} = new Float32Array(${this.uploadArrayLength})`,
            `flattenTo(${this.varName}, uploadValue_${this.name})`
          ]);
        }
        getSource() {
          return utils.linesToString([
            `uniform sampler2D ${this.id}`,
            `ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,
            `ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`
          ]);
        }
        updateValue(value2) {
          if (value2.constructor !== this.initialValueConstructor) {
            this.onUpdateValueMismatch(value2.constructor);
            return;
          }
          const { context: gl } = this;
          utils.flatten4dArrayTo(value2, this.uploadValue);
          gl.activeTexture(this.contextHandle);
          gl.bindTexture(gl.TEXTURE_2D, this.texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.textureSize[0], this.textureSize[1], 0, gl.RGBA, gl.FLOAT, this.uploadValue);
          this.kernel.setUniform1i(this.id, this.index);
        }
      }
      module2.exports = {
        WebGLKernelValueSingleArray3DI
      };
    }, { "../../../utils": 114, "./array": 40 }], 67: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelArray } = require2("./array");
      class WebGLKernelValueSingleInput extends WebGLKernelArray {
        constructor(value2, settings) {
          super(value2, settings);
          this.bitRatio = 4;
          let [w, h, d] = value2.size;
          this.dimensions = new Int32Array([w || 1, h || 1, d || 1]);
          this.textureSize = utils.getMemoryOptimizedFloatTextureSize(this.dimensions, this.bitRatio);
          this.uploadArrayLength = this.textureSize[0] * this.textureSize[1] * this.bitRatio;
          this.checkSize(this.textureSize[0], this.textureSize[1]);
          this.uploadValue = new Float32Array(this.uploadArrayLength);
        }
        getStringValueHandler() {
          return utils.linesToString([
            `const uploadValue_${this.name} = new Float32Array(${this.uploadArrayLength})`,
            `flattenTo(${this.varName}.value, uploadValue_${this.name})`
          ]);
        }
        getSource() {
          return utils.linesToString([
            `uniform sampler2D ${this.id}`,
            `ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,
            `ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`
          ]);
        }
        updateValue(input) {
          if (input.constructor !== this.initialValueConstructor) {
            this.onUpdateValueMismatch(input.constructor);
            return;
          }
          const { context: gl } = this;
          utils.flattenTo(input.value, this.uploadValue);
          gl.activeTexture(this.contextHandle);
          gl.bindTexture(gl.TEXTURE_2D, this.texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.textureSize[0], this.textureSize[1], 0, gl.RGBA, gl.FLOAT, this.uploadValue);
          this.kernel.setUniform1i(this.id, this.index);
        }
      }
      module2.exports = {
        WebGLKernelValueSingleInput
      };
    }, { "../../../utils": 114, "./array": 40 }], 68: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelArray } = require2("./array");
      class WebGLKernelValueUnsignedArray extends WebGLKernelArray {
        constructor(value2, settings) {
          super(value2, settings);
          this.bitRatio = this.getBitRatio(value2);
          this.dimensions = utils.getDimensions(value2, true);
          this.textureSize = utils.getMemoryOptimizedPackedTextureSize(this.dimensions, this.bitRatio);
          this.uploadArrayLength = this.textureSize[0] * this.textureSize[1] * (4 / this.bitRatio);
          this.checkSize(this.textureSize[0], this.textureSize[1]);
          this.TranserArrayType = this.getTransferArrayType(value2);
          this.preUploadValue = new this.TranserArrayType(this.uploadArrayLength);
          this.uploadValue = new Uint8Array(this.preUploadValue.buffer);
        }
        getStringValueHandler() {
          return utils.linesToString([
            `const preUploadValue_${this.name} = new ${this.TranserArrayType.name}(${this.uploadArrayLength})`,
            `const uploadValue_${this.name} = new Uint8Array(preUploadValue_${this.name}.buffer)`,
            `flattenTo(${this.varName}, preUploadValue_${this.name})`
          ]);
        }
        getSource() {
          return utils.linesToString([
            `uniform sampler2D ${this.id}`,
            `ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,
            `ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`
          ]);
        }
        updateValue(value2) {
          if (value2.constructor !== this.initialValueConstructor) {
            this.onUpdateValueMismatch(value2.constructor);
            return;
          }
          const { context: gl } = this;
          utils.flattenTo(value2, this.preUploadValue);
          gl.activeTexture(this.contextHandle);
          gl.bindTexture(gl.TEXTURE_2D, this.texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.textureSize[0], this.textureSize[1], 0, gl.RGBA, gl.UNSIGNED_BYTE, this.uploadValue);
          this.kernel.setUniform1i(this.id, this.index);
        }
      }
      module2.exports = {
        WebGLKernelValueUnsignedArray
      };
    }, { "../../../utils": 114, "./array": 40 }], 69: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelArray } = require2("./array");
      class WebGLKernelValueUnsignedInput extends WebGLKernelArray {
        constructor(value2, settings) {
          super(value2, settings);
          this.bitRatio = this.getBitRatio(value2);
          const [w, h, d] = value2.size;
          this.dimensions = new Int32Array([w || 1, h || 1, d || 1]);
          this.textureSize = utils.getMemoryOptimizedPackedTextureSize(this.dimensions, this.bitRatio);
          this.uploadArrayLength = this.textureSize[0] * this.textureSize[1] * (4 / this.bitRatio);
          this.checkSize(this.textureSize[0], this.textureSize[1]);
          this.TranserArrayType = this.getTransferArrayType(value2.value);
          this.preUploadValue = new this.TranserArrayType(this.uploadArrayLength);
          this.uploadValue = new Uint8Array(this.preUploadValue.buffer);
        }
        getStringValueHandler() {
          return utils.linesToString([
            `const preUploadValue_${this.name} = new ${this.TranserArrayType.name}(${this.uploadArrayLength})`,
            `const uploadValue_${this.name} = new Uint8Array(preUploadValue_${this.name}.buffer)`,
            `flattenTo(${this.varName}.value, preUploadValue_${this.name})`
          ]);
        }
        getSource() {
          return utils.linesToString([
            `uniform sampler2D ${this.id}`,
            `ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,
            `ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`
          ]);
        }
        updateValue(input) {
          if (input.constructor !== this.initialValueConstructor) {
            this.onUpdateValueMismatch(value.constructor);
            return;
          }
          const { context: gl } = this;
          utils.flattenTo(input.value, this.preUploadValue);
          gl.activeTexture(this.contextHandle);
          gl.bindTexture(gl.TEXTURE_2D, this.texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.textureSize[0], this.textureSize[1], 0, gl.RGBA, gl.UNSIGNED_BYTE, this.uploadValue);
          this.kernel.setUniform1i(this.id, this.index);
        }
      }
      module2.exports = {
        WebGLKernelValueUnsignedInput
      };
    }, { "../../../utils": 114, "./array": 40 }], 70: [function(require2, module2, exports2) {
      const { GLKernel } = require2("../gl/kernel");
      const { FunctionBuilder } = require2("../function-builder");
      const { WebGLFunctionNode } = require2("./function-node");
      const { utils } = require2("../../utils");
      const mrud = require2("../../plugins/math-random-uniformly-distributed");
      const { fragmentShader } = require2("./fragment-shader");
      const { vertexShader } = require2("./vertex-shader");
      const { glKernelString } = require2("../gl/kernel-string");
      const { lookupKernelValueType } = require2("./kernel-value-maps");
      let isSupported = null;
      let testCanvas = null;
      let testContext = null;
      let testExtensions = null;
      let features = null;
      const plugins = [mrud];
      const canvases = [];
      const maxTexSizes = {};
      class WebGLKernel extends GLKernel {
        static get isSupported() {
          if (isSupported !== null) {
            return isSupported;
          }
          this.setupFeatureChecks();
          isSupported = this.isContextMatch(testContext);
          return isSupported;
        }
        static setupFeatureChecks() {
          if (typeof document !== "undefined") {
            testCanvas = document.createElement("canvas");
          } else if (typeof OffscreenCanvas !== "undefined") {
            testCanvas = new OffscreenCanvas(0, 0);
          }
          if (!testCanvas)
            return;
          testContext = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
          if (!testContext || !testContext.getExtension)
            return;
          testExtensions = {
            OES_texture_float: testContext.getExtension("OES_texture_float"),
            OES_texture_float_linear: testContext.getExtension("OES_texture_float_linear"),
            OES_element_index_uint: testContext.getExtension("OES_element_index_uint"),
            WEBGL_draw_buffers: testContext.getExtension("WEBGL_draw_buffers")
          };
          features = this.getFeatures();
        }
        static isContextMatch(context) {
          if (typeof WebGLRenderingContext !== "undefined") {
            return context instanceof WebGLRenderingContext;
          }
          return false;
        }
        static getIsTextureFloat() {
          return Boolean(testExtensions.OES_texture_float);
        }
        static getIsDrawBuffers() {
          return Boolean(testExtensions.WEBGL_draw_buffers);
        }
        static getChannelCount() {
          return testExtensions.WEBGL_draw_buffers ? testContext.getParameter(testExtensions.WEBGL_draw_buffers.MAX_DRAW_BUFFERS_WEBGL) : 1;
        }
        static getMaxTextureSize() {
          return testContext.getParameter(testContext.MAX_TEXTURE_SIZE);
        }
        static lookupKernelValueType(type, dynamic, precision, value2) {
          return lookupKernelValueType(type, dynamic, precision, value2);
        }
        static get testCanvas() {
          return testCanvas;
        }
        static get testContext() {
          return testContext;
        }
        static get features() {
          return features;
        }
        static get fragmentShader() {
          return fragmentShader;
        }
        static get vertexShader() {
          return vertexShader;
        }
        constructor(source, settings) {
          super(source, settings);
          this.program = null;
          this.pipeline = settings.pipeline;
          this.endianness = utils.systemEndianness();
          this.extensions = {};
          this.argumentTextureCount = 0;
          this.constantTextureCount = 0;
          this.fragShader = null;
          this.vertShader = null;
          this.drawBuffersMap = null;
          this.maxTexSize = null;
          this.onRequestSwitchKernel = null;
          this.texture = null;
          this.mappedTextures = null;
          this.mergeSettings(source.settings || settings);
          this.threadDim = null;
          this.framebuffer = null;
          this.buffer = null;
          this.textureCache = [];
          this.programUniformLocationCache = {};
          this.uniform1fCache = {};
          this.uniform1iCache = {};
          this.uniform2fCache = {};
          this.uniform2fvCache = {};
          this.uniform2ivCache = {};
          this.uniform3fvCache = {};
          this.uniform3ivCache = {};
          this.uniform4fvCache = {};
          this.uniform4ivCache = {};
        }
        initCanvas() {
          if (typeof document !== "undefined") {
            const canvas = document.createElement("canvas");
            canvas.width = 2;
            canvas.height = 2;
            return canvas;
          } else if (typeof OffscreenCanvas !== "undefined") {
            return new OffscreenCanvas(0, 0);
          }
        }
        initContext() {
          const settings = {
            alpha: false,
            depth: false,
            antialias: false
          };
          return this.canvas.getContext("webgl", settings) || this.canvas.getContext("experimental-webgl", settings);
        }
        initPlugins(settings) {
          const pluginsToUse = [];
          const { source } = this;
          if (typeof source === "string") {
            for (let i = 0; i < plugins.length; i++) {
              const plugin = plugins[i];
              if (source.match(plugin.functionMatch)) {
                pluginsToUse.push(plugin);
              }
            }
          } else if (typeof source === "object") {
            if (settings.pluginNames) {
              for (let i = 0; i < plugins.length; i++) {
                const plugin = plugins[i];
                const usePlugin = settings.pluginNames.some((pluginName) => pluginName === plugin.name);
                if (usePlugin) {
                  pluginsToUse.push(plugin);
                }
              }
            }
          }
          return pluginsToUse;
        }
        initExtensions() {
          this.extensions = {
            OES_texture_float: this.context.getExtension("OES_texture_float"),
            OES_texture_float_linear: this.context.getExtension("OES_texture_float_linear"),
            OES_element_index_uint: this.context.getExtension("OES_element_index_uint"),
            WEBGL_draw_buffers: this.context.getExtension("WEBGL_draw_buffers"),
            WEBGL_color_buffer_float: this.context.getExtension("WEBGL_color_buffer_float")
          };
        }
        validateSettings(args) {
          if (!this.validate) {
            this.texSize = utils.getKernelTextureSize({
              optimizeFloatMemory: this.optimizeFloatMemory,
              precision: this.precision
            }, this.output);
            return;
          }
          const { features: features2 } = this.constructor;
          if (this.optimizeFloatMemory === true && !features2.isTextureFloat) {
            throw new Error("Float textures are not supported");
          } else if (this.precision === "single" && !features2.isFloatRead) {
            throw new Error("Single precision not supported");
          } else if (!this.graphical && this.precision === null && features2.isTextureFloat) {
            this.precision = features2.isFloatRead ? "single" : "unsigned";
          }
          if (this.subKernels && this.subKernels.length > 0 && !this.extensions.WEBGL_draw_buffers) {
            throw new Error("could not instantiate draw buffers extension");
          }
          if (this.fixIntegerDivisionAccuracy === null) {
            this.fixIntegerDivisionAccuracy = !features2.isIntegerDivisionAccurate;
          } else if (this.fixIntegerDivisionAccuracy && features2.isIntegerDivisionAccurate) {
            this.fixIntegerDivisionAccuracy = false;
          }
          this.checkOutput();
          if (!this.output || this.output.length === 0) {
            if (args.length !== 1) {
              throw new Error("Auto output only supported for kernels with only one input");
            }
            const argType = utils.getVariableType(args[0], this.strictIntegers);
            switch (argType) {
              case "Array":
                this.output = utils.getDimensions(argType);
                break;
              case "NumberTexture":
              case "MemoryOptimizedNumberTexture":
              case "ArrayTexture(1)":
              case "ArrayTexture(2)":
              case "ArrayTexture(3)":
              case "ArrayTexture(4)":
                this.output = args[0].output;
                break;
              default:
                throw new Error("Auto output not supported for input type: " + argType);
            }
          }
          if (this.graphical) {
            if (this.output.length !== 2) {
              throw new Error("Output must have 2 dimensions on graphical mode");
            }
            if (this.precision === "precision") {
              this.precision = "unsigned";
              console.warn("Cannot use graphical mode and single precision at the same time");
            }
            this.texSize = utils.clone(this.output);
            return;
          } else if (this.precision === null && features2.isTextureFloat) {
            this.precision = "single";
          }
          this.texSize = utils.getKernelTextureSize({
            optimizeFloatMemory: this.optimizeFloatMemory,
            precision: this.precision
          }, this.output);
          this.checkTextureSize();
        }
        updateMaxTexSize() {
          const { texSize, canvas } = this;
          if (this.maxTexSize === null) {
            let canvasIndex = canvases.indexOf(canvas);
            if (canvasIndex === -1) {
              canvasIndex = canvases.length;
              canvases.push(canvas);
              maxTexSizes[canvasIndex] = [texSize[0], texSize[1]];
            }
            this.maxTexSize = maxTexSizes[canvasIndex];
          }
          if (this.maxTexSize[0] < texSize[0]) {
            this.maxTexSize[0] = texSize[0];
          }
          if (this.maxTexSize[1] < texSize[1]) {
            this.maxTexSize[1] = texSize[1];
          }
        }
        setupArguments(args) {
          this.kernelArguments = [];
          this.argumentTextureCount = 0;
          const needsArgumentTypes = this.argumentTypes === null;
          if (needsArgumentTypes) {
            this.argumentTypes = [];
          }
          this.argumentSizes = [];
          this.argumentBitRatios = [];
          if (args.length < this.argumentNames.length) {
            throw new Error("not enough arguments for kernel");
          } else if (args.length > this.argumentNames.length) {
            throw new Error("too many arguments for kernel");
          }
          const { context: gl } = this;
          let textureIndexes = 0;
          const onRequestTexture = () => {
            return this.createTexture();
          };
          const onRequestIndex = () => {
            return this.constantTextureCount + textureIndexes++;
          };
          const onUpdateValueMismatch = (constructor) => {
            this.switchKernels({
              type: "argumentMismatch",
              needed: constructor
            });
          };
          const onRequestContextHandle = () => {
            return gl.TEXTURE0 + this.constantTextureCount + this.argumentTextureCount++;
          };
          for (let index2 = 0; index2 < args.length; index2++) {
            const value2 = args[index2];
            const name2 = this.argumentNames[index2];
            let type;
            if (needsArgumentTypes) {
              type = utils.getVariableType(value2, this.strictIntegers);
              this.argumentTypes.push(type);
            } else {
              type = this.argumentTypes[index2];
            }
            const KernelValue = this.constructor.lookupKernelValueType(type, this.dynamicArguments ? "dynamic" : "static", this.precision, args[index2]);
            if (KernelValue === null) {
              return this.requestFallback(args);
            }
            const kernelArgument = new KernelValue(value2, {
              name: name2,
              type,
              tactic: this.tactic,
              origin: "user",
              context: gl,
              checkContext: this.checkContext,
              kernel: this,
              strictIntegers: this.strictIntegers,
              onRequestTexture,
              onRequestIndex,
              onUpdateValueMismatch,
              onRequestContextHandle
            });
            this.kernelArguments.push(kernelArgument);
            kernelArgument.setup();
            this.argumentSizes.push(kernelArgument.textureSize);
            this.argumentBitRatios[index2] = kernelArgument.bitRatio;
          }
        }
        createTexture() {
          const texture = this.context.createTexture();
          this.textureCache.push(texture);
          return texture;
        }
        setupConstants(args) {
          const { context: gl } = this;
          this.kernelConstants = [];
          this.forceUploadKernelConstants = [];
          let needsConstantTypes = this.constantTypes === null;
          if (needsConstantTypes) {
            this.constantTypes = {};
          }
          this.constantBitRatios = {};
          let textureIndexes = 0;
          for (const name2 in this.constants) {
            const value2 = this.constants[name2];
            let type;
            if (needsConstantTypes) {
              type = utils.getVariableType(value2, this.strictIntegers);
              this.constantTypes[name2] = type;
            } else {
              type = this.constantTypes[name2];
            }
            const KernelValue = this.constructor.lookupKernelValueType(type, "static", this.precision, value2);
            if (KernelValue === null) {
              return this.requestFallback(args);
            }
            const kernelValue = new KernelValue(value2, {
              name: name2,
              type,
              tactic: this.tactic,
              origin: "constants",
              context: this.context,
              checkContext: this.checkContext,
              kernel: this,
              strictIntegers: this.strictIntegers,
              onRequestTexture: () => {
                return this.createTexture();
              },
              onRequestIndex: () => {
                return textureIndexes++;
              },
              onRequestContextHandle: () => {
                return gl.TEXTURE0 + this.constantTextureCount++;
              }
            });
            this.constantBitRatios[name2] = kernelValue.bitRatio;
            this.kernelConstants.push(kernelValue);
            kernelValue.setup();
            if (kernelValue.forceUploadEachRun) {
              this.forceUploadKernelConstants.push(kernelValue);
            }
          }
        }
        build() {
          if (this.built)
            return;
          this.initExtensions();
          this.validateSettings(arguments);
          this.setupConstants(arguments);
          if (this.fallbackRequested)
            return;
          this.setupArguments(arguments);
          if (this.fallbackRequested)
            return;
          this.updateMaxTexSize();
          this.translateSource();
          const failureResult = this.pickRenderStrategy(arguments);
          if (failureResult) {
            return failureResult;
          }
          const { texSize, context: gl, canvas } = this;
          gl.enable(gl.SCISSOR_TEST);
          if (this.pipeline && this.precision === "single") {
            gl.viewport(0, 0, this.maxTexSize[0], this.maxTexSize[1]);
            canvas.width = this.maxTexSize[0];
            canvas.height = this.maxTexSize[1];
          } else {
            gl.viewport(0, 0, this.maxTexSize[0], this.maxTexSize[1]);
            canvas.width = this.maxTexSize[0];
            canvas.height = this.maxTexSize[1];
          }
          const threadDim = this.threadDim = Array.from(this.output);
          while (threadDim.length < 3) {
            threadDim.push(1);
          }
          const compiledVertexShader = this.getVertexShader(arguments);
          const vertShader = gl.createShader(gl.VERTEX_SHADER);
          gl.shaderSource(vertShader, compiledVertexShader);
          gl.compileShader(vertShader);
          this.vertShader = vertShader;
          const compiledFragmentShader = this.getFragmentShader(arguments);
          const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
          gl.shaderSource(fragShader, compiledFragmentShader);
          gl.compileShader(fragShader);
          this.fragShader = fragShader;
          if (this.debug) {
            console.log("GLSL Shader Output:");
            console.log(compiledFragmentShader);
          }
          if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
            throw new Error("Error compiling vertex shader: " + gl.getShaderInfoLog(vertShader));
          }
          if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
            throw new Error("Error compiling fragment shader: " + gl.getShaderInfoLog(fragShader));
          }
          const program = this.program = gl.createProgram();
          gl.attachShader(program, vertShader);
          gl.attachShader(program, fragShader);
          gl.linkProgram(program);
          this.framebuffer = gl.createFramebuffer();
          this.framebuffer.width = texSize[0];
          this.framebuffer.height = texSize[1];
          this.rawValueFramebuffers = {};
          const vertices = new Float32Array([
            -1,
            -1,
            1,
            -1,
            -1,
            1,
            1,
            1
          ]);
          const texCoords = new Float32Array([
            0,
            0,
            1,
            0,
            0,
            1,
            1,
            1
          ]);
          const texCoordOffset = vertices.byteLength;
          let buffer = this.buffer;
          if (!buffer) {
            buffer = this.buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertices.byteLength + texCoords.byteLength, gl.STATIC_DRAW);
          } else {
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
          }
          gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertices);
          gl.bufferSubData(gl.ARRAY_BUFFER, texCoordOffset, texCoords);
          const aPosLoc = gl.getAttribLocation(this.program, "aPos");
          gl.enableVertexAttribArray(aPosLoc);
          gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);
          const aTexCoordLoc = gl.getAttribLocation(this.program, "aTexCoord");
          gl.enableVertexAttribArray(aTexCoordLoc);
          gl.vertexAttribPointer(aTexCoordLoc, 2, gl.FLOAT, false, 0, texCoordOffset);
          gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
          let i = 0;
          gl.useProgram(this.program);
          for (let p2 in this.constants) {
            this.kernelConstants[i++].updateValue(this.constants[p2]);
          }
          this._setupOutputTexture();
          if (this.subKernels !== null && this.subKernels.length > 0) {
            this._mappedTextureSwitched = {};
            this._setupSubOutputTextures();
          }
          this.buildSignature(arguments);
          this.built = true;
        }
        translateSource() {
          const functionBuilder = FunctionBuilder.fromKernel(this, WebGLFunctionNode, {
            fixIntegerDivisionAccuracy: this.fixIntegerDivisionAccuracy
          });
          this.translatedSource = functionBuilder.getPrototypeString("kernel");
          this.setupReturnTypes(functionBuilder);
        }
        setupReturnTypes(functionBuilder) {
          if (!this.graphical && !this.returnType) {
            this.returnType = functionBuilder.getKernelResultType();
          }
          if (this.subKernels && this.subKernels.length > 0) {
            for (let i = 0; i < this.subKernels.length; i++) {
              const subKernel = this.subKernels[i];
              if (!subKernel.returnType) {
                subKernel.returnType = functionBuilder.getSubKernelResultType(i);
              }
            }
          }
        }
        run() {
          const { kernelArguments, texSize, forceUploadKernelConstants, context: gl } = this;
          gl.useProgram(this.program);
          gl.scissor(0, 0, texSize[0], texSize[1]);
          if (this.dynamicOutput) {
            this.setUniform3iv("uOutputDim", new Int32Array(this.threadDim));
            this.setUniform2iv("uTexSize", texSize);
          }
          this.setUniform2f("ratio", texSize[0] / this.maxTexSize[0], texSize[1] / this.maxTexSize[1]);
          for (let i = 0; i < forceUploadKernelConstants.length; i++) {
            const constant = forceUploadKernelConstants[i];
            constant.updateValue(this.constants[constant.name]);
            if (this.switchingKernels)
              return;
          }
          for (let i = 0; i < kernelArguments.length; i++) {
            kernelArguments[i].updateValue(arguments[i]);
            if (this.switchingKernels)
              return;
          }
          if (this.plugins) {
            for (let i = 0; i < this.plugins.length; i++) {
              const plugin = this.plugins[i];
              if (plugin.onBeforeRun) {
                plugin.onBeforeRun(this);
              }
            }
          }
          if (this.graphical) {
            if (this.pipeline) {
              gl.bindRenderbuffer(gl.RENDERBUFFER, null);
              gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
              if (this.immutable) {
                this._replaceOutputTexture();
              }
              gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
              return this.immutable ? this.texture.clone() : this.texture;
            }
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            return;
          }
          gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
          if (this.immutable) {
            this._replaceOutputTexture();
          }
          if (this.subKernels !== null) {
            if (this.immutable) {
              this._replaceSubOutputTextures();
            }
            this.drawBuffers();
          }
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
        drawBuffers() {
          this.extensions.WEBGL_draw_buffers.drawBuffersWEBGL(this.drawBuffersMap);
        }
        getInternalFormat() {
          return this.context.RGBA;
        }
        getTextureFormat() {
          const { context: gl } = this;
          switch (this.getInternalFormat()) {
            case gl.RGBA:
              return gl.RGBA;
            default:
              throw new Error("Unknown internal format");
          }
        }
        _replaceOutputTexture() {
          if (this.texture.beforeMutate() || this._textureSwitched) {
            const gl = this.context;
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture.texture, 0);
            this._textureSwitched = false;
          }
        }
        _setupOutputTexture() {
          const gl = this.context;
          const texSize = this.texSize;
          if (this.texture) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture.texture, 0);
            return;
          }
          const texture = this.createTexture();
          gl.activeTexture(gl.TEXTURE0 + this.constantTextureCount + this.argumentTextureCount);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
          const format = this.getInternalFormat();
          if (this.precision === "single") {
            gl.texImage2D(gl.TEXTURE_2D, 0, format, texSize[0], texSize[1], 0, gl.RGBA, gl.FLOAT, null);
          } else {
            gl.texImage2D(gl.TEXTURE_2D, 0, format, texSize[0], texSize[1], 0, format, gl.UNSIGNED_BYTE, null);
          }
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
          this.texture = new this.TextureConstructor({
            texture,
            size: texSize,
            dimensions: this.threadDim,
            output: this.output,
            context: this.context,
            internalFormat: this.getInternalFormat(),
            textureFormat: this.getTextureFormat(),
            kernel: this
          });
        }
        _replaceSubOutputTextures() {
          const gl = this.context;
          for (let i = 0; i < this.mappedTextures.length; i++) {
            const mappedTexture = this.mappedTextures[i];
            if (mappedTexture.beforeMutate() || this._mappedTextureSwitched[i]) {
              gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i + 1, gl.TEXTURE_2D, mappedTexture.texture, 0);
              this._mappedTextureSwitched[i] = false;
            }
          }
        }
        _setupSubOutputTextures() {
          const gl = this.context;
          if (this.mappedTextures) {
            for (let i = 0; i < this.subKernels.length; i++) {
              gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i + 1, gl.TEXTURE_2D, this.mappedTextures[i].texture, 0);
            }
            return;
          }
          const texSize = this.texSize;
          this.drawBuffersMap = [gl.COLOR_ATTACHMENT0];
          this.mappedTextures = [];
          for (let i = 0; i < this.subKernels.length; i++) {
            const texture = this.createTexture();
            this.drawBuffersMap.push(gl.COLOR_ATTACHMENT0 + i + 1);
            gl.activeTexture(gl.TEXTURE0 + this.constantTextureCount + this.argumentTextureCount + i);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            if (this.precision === "single") {
              gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texSize[0], texSize[1], 0, gl.RGBA, gl.FLOAT, null);
            } else {
              gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texSize[0], texSize[1], 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            }
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i + 1, gl.TEXTURE_2D, texture, 0);
            this.mappedTextures.push(new this.TextureConstructor({
              texture,
              size: texSize,
              dimensions: this.threadDim,
              output: this.output,
              context: this.context,
              internalFormat: this.getInternalFormat(),
              textureFormat: this.getTextureFormat(),
              kernel: this
            }));
          }
        }
        setUniform1f(name2, value2) {
          if (this.uniform1fCache.hasOwnProperty(name2)) {
            const cache = this.uniform1fCache[name2];
            if (value2 === cache) {
              return;
            }
          }
          this.uniform1fCache[name2] = value2;
          const loc = this.getUniformLocation(name2);
          this.context.uniform1f(loc, value2);
        }
        setUniform1i(name2, value2) {
          if (this.uniform1iCache.hasOwnProperty(name2)) {
            const cache = this.uniform1iCache[name2];
            if (value2 === cache) {
              return;
            }
          }
          this.uniform1iCache[name2] = value2;
          const loc = this.getUniformLocation(name2);
          this.context.uniform1i(loc, value2);
        }
        setUniform2f(name2, value1, value2) {
          if (this.uniform2fCache.hasOwnProperty(name2)) {
            const cache = this.uniform2fCache[name2];
            if (value1 === cache[0] && value2 === cache[1]) {
              return;
            }
          }
          this.uniform2fCache[name2] = [value1, value2];
          const loc = this.getUniformLocation(name2);
          this.context.uniform2f(loc, value1, value2);
        }
        setUniform2fv(name2, value2) {
          if (this.uniform2fvCache.hasOwnProperty(name2)) {
            const cache = this.uniform2fvCache[name2];
            if (value2[0] === cache[0] && value2[1] === cache[1]) {
              return;
            }
          }
          this.uniform2fvCache[name2] = value2;
          const loc = this.getUniformLocation(name2);
          this.context.uniform2fv(loc, value2);
        }
        setUniform2iv(name2, value2) {
          if (this.uniform2ivCache.hasOwnProperty(name2)) {
            const cache = this.uniform2ivCache[name2];
            if (value2[0] === cache[0] && value2[1] === cache[1]) {
              return;
            }
          }
          this.uniform2ivCache[name2] = value2;
          const loc = this.getUniformLocation(name2);
          this.context.uniform2iv(loc, value2);
        }
        setUniform3fv(name2, value2) {
          if (this.uniform3fvCache.hasOwnProperty(name2)) {
            const cache = this.uniform3fvCache[name2];
            if (value2[0] === cache[0] && value2[1] === cache[1] && value2[2] === cache[2]) {
              return;
            }
          }
          this.uniform3fvCache[name2] = value2;
          const loc = this.getUniformLocation(name2);
          this.context.uniform3fv(loc, value2);
        }
        setUniform3iv(name2, value2) {
          if (this.uniform3ivCache.hasOwnProperty(name2)) {
            const cache = this.uniform3ivCache[name2];
            if (value2[0] === cache[0] && value2[1] === cache[1] && value2[2] === cache[2]) {
              return;
            }
          }
          this.uniform3ivCache[name2] = value2;
          const loc = this.getUniformLocation(name2);
          this.context.uniform3iv(loc, value2);
        }
        setUniform4fv(name2, value2) {
          if (this.uniform4fvCache.hasOwnProperty(name2)) {
            const cache = this.uniform4fvCache[name2];
            if (value2[0] === cache[0] && value2[1] === cache[1] && value2[2] === cache[2] && value2[3] === cache[3]) {
              return;
            }
          }
          this.uniform4fvCache[name2] = value2;
          const loc = this.getUniformLocation(name2);
          this.context.uniform4fv(loc, value2);
        }
        setUniform4iv(name2, value2) {
          if (this.uniform4ivCache.hasOwnProperty(name2)) {
            const cache = this.uniform4ivCache[name2];
            if (value2[0] === cache[0] && value2[1] === cache[1] && value2[2] === cache[2] && value2[3] === cache[3]) {
              return;
            }
          }
          this.uniform4ivCache[name2] = value2;
          const loc = this.getUniformLocation(name2);
          this.context.uniform4iv(loc, value2);
        }
        getUniformLocation(name2) {
          if (this.programUniformLocationCache.hasOwnProperty(name2)) {
            return this.programUniformLocationCache[name2];
          }
          return this.programUniformLocationCache[name2] = this.context.getUniformLocation(this.program, name2);
        }
        _getFragShaderArtifactMap(args) {
          return {
            HEADER: this._getHeaderString(),
            LOOP_MAX: this._getLoopMaxString(),
            PLUGINS: this._getPluginsString(),
            CONSTANTS: this._getConstantsString(),
            DECODE32_ENDIANNESS: this._getDecode32EndiannessString(),
            ENCODE32_ENDIANNESS: this._getEncode32EndiannessString(),
            DIVIDE_WITH_INTEGER_CHECK: this._getDivideWithIntegerCheckString(),
            INJECTED_NATIVE: this._getInjectedNative(),
            MAIN_CONSTANTS: this._getMainConstantsString(),
            MAIN_ARGUMENTS: this._getMainArgumentsString(args),
            KERNEL: this.getKernelString(),
            MAIN_RESULT: this.getMainResultString(),
            FLOAT_TACTIC_DECLARATION: this.getFloatTacticDeclaration(),
            INT_TACTIC_DECLARATION: this.getIntTacticDeclaration(),
            SAMPLER_2D_TACTIC_DECLARATION: this.getSampler2DTacticDeclaration(),
            SAMPLER_2D_ARRAY_TACTIC_DECLARATION: this.getSampler2DArrayTacticDeclaration()
          };
        }
        _getVertShaderArtifactMap(args) {
          return {
            FLOAT_TACTIC_DECLARATION: this.getFloatTacticDeclaration(),
            INT_TACTIC_DECLARATION: this.getIntTacticDeclaration(),
            SAMPLER_2D_TACTIC_DECLARATION: this.getSampler2DTacticDeclaration(),
            SAMPLER_2D_ARRAY_TACTIC_DECLARATION: this.getSampler2DArrayTacticDeclaration()
          };
        }
        _getHeaderString() {
          return this.subKernels !== null ? "#extension GL_EXT_draw_buffers : require\n" : "";
        }
        _getLoopMaxString() {
          return this.loopMaxIterations ? ` ${parseInt(this.loopMaxIterations)};
` : " 1000;\n";
        }
        _getPluginsString() {
          if (!this.plugins)
            return "\n";
          return this.plugins.map((plugin) => plugin.source && this.source.match(plugin.functionMatch) ? plugin.source : "").join("\n");
        }
        _getConstantsString() {
          const result = [];
          const { threadDim, texSize } = this;
          if (this.dynamicOutput) {
            result.push("uniform ivec3 uOutputDim", "uniform ivec2 uTexSize");
          } else {
            result.push(`ivec3 uOutputDim = ivec3(${threadDim[0]}, ${threadDim[1]}, ${threadDim[2]})`, `ivec2 uTexSize = ivec2(${texSize[0]}, ${texSize[1]})`);
          }
          return utils.linesToString(result);
        }
        _getTextureCoordinate() {
          const subKernels = this.subKernels;
          if (subKernels === null || subKernels.length < 1) {
            return "varying vec2 vTexCoord;\n";
          } else {
            return "out vec2 vTexCoord;\n";
          }
        }
        _getDecode32EndiannessString() {
          return this.endianness === "LE" ? "" : "  texel.rgba = texel.abgr;\n";
        }
        _getEncode32EndiannessString() {
          return this.endianness === "LE" ? "" : "  texel.rgba = texel.abgr;\n";
        }
        _getDivideWithIntegerCheckString() {
          return this.fixIntegerDivisionAccuracy ? `float divWithIntCheck(float x, float y) {
  if (floor(x) == x && floor(y) == y && integerMod(x, y) == 0.0) {
    return float(int(x) / int(y));
  }
  return x / y;
}

float integerCorrectionModulo(float number, float divisor) {
  if (number < 0.0) {
    number = abs(number);
    if (divisor < 0.0) {
      divisor = abs(divisor);
    }
    return -(number - (divisor * floor(divWithIntCheck(number, divisor))));
  }
  if (divisor < 0.0) {
    divisor = abs(divisor);
  }
  return number - (divisor * floor(divWithIntCheck(number, divisor)));
}` : "";
        }
        _getMainArgumentsString(args) {
          const results = [];
          const { argumentNames } = this;
          for (let i = 0; i < argumentNames.length; i++) {
            results.push(this.kernelArguments[i].getSource(args[i]));
          }
          return results.join("");
        }
        _getInjectedNative() {
          return this.injectedNative || "";
        }
        _getMainConstantsString() {
          const result = [];
          const { constants } = this;
          if (constants) {
            let i = 0;
            for (const name2 in constants) {
              if (!this.constants.hasOwnProperty(name2))
                continue;
              result.push(this.kernelConstants[i++].getSource(this.constants[name2]));
            }
          }
          return result.join("");
        }
        getRawValueFramebuffer(width, height) {
          if (!this.rawValueFramebuffers[width]) {
            this.rawValueFramebuffers[width] = {};
          }
          if (!this.rawValueFramebuffers[width][height]) {
            const framebuffer = this.context.createFramebuffer();
            framebuffer.width = width;
            framebuffer.height = height;
            this.rawValueFramebuffers[width][height] = framebuffer;
          }
          return this.rawValueFramebuffers[width][height];
        }
        getKernelResultDeclaration() {
          switch (this.returnType) {
            case "Array(2)":
              return "vec2 kernelResult";
            case "Array(3)":
              return "vec3 kernelResult";
            case "Array(4)":
              return "vec4 kernelResult";
            case "LiteralInteger":
            case "Float":
            case "Number":
            case "Integer":
              return "float kernelResult";
            default:
              if (this.graphical) {
                return "float kernelResult";
              } else {
                throw new Error(`unrecognized output type "${this.returnType}"`);
              }
          }
        }
        getKernelString() {
          const result = [this.getKernelResultDeclaration()];
          const { subKernels } = this;
          if (subKernels !== null) {
            switch (this.returnType) {
              case "Number":
              case "Float":
              case "Integer":
                for (let i = 0; i < subKernels.length; i++) {
                  const subKernel = subKernels[i];
                  result.push(subKernel.returnType === "Integer" ? `int subKernelResult_${subKernel.name} = 0` : `float subKernelResult_${subKernel.name} = 0.0`);
                }
                break;
              case "Array(2)":
                for (let i = 0; i < subKernels.length; i++) {
                  result.push(`vec2 subKernelResult_${subKernels[i].name}`);
                }
                break;
              case "Array(3)":
                for (let i = 0; i < subKernels.length; i++) {
                  result.push(`vec3 subKernelResult_${subKernels[i].name}`);
                }
                break;
              case "Array(4)":
                for (let i = 0; i < subKernels.length; i++) {
                  result.push(`vec4 subKernelResult_${subKernels[i].name}`);
                }
                break;
            }
          }
          return utils.linesToString(result) + this.translatedSource;
        }
        getMainResultGraphical() {
          return utils.linesToString([
            "  threadId = indexTo3D(index, uOutputDim)",
            "  kernel()",
            "  gl_FragColor = actualColor"
          ]);
        }
        getMainResultPackedPixels() {
          switch (this.returnType) {
            case "LiteralInteger":
            case "Number":
            case "Integer":
            case "Float":
              return this.getMainResultKernelPackedPixels() + this.getMainResultSubKernelPackedPixels();
            default:
              throw new Error(`packed output only usable with Numbers, "${this.returnType}" specified`);
          }
        }
        getMainResultKernelPackedPixels() {
          return utils.linesToString([
            "  threadId = indexTo3D(index, uOutputDim)",
            "  kernel()",
            `  gl_FragData[0] = ${this.useLegacyEncoder ? "legacyEncode32" : "encode32"}(kernelResult)`
          ]);
        }
        getMainResultSubKernelPackedPixels() {
          const result = [];
          if (!this.subKernels)
            return "";
          for (let i = 0; i < this.subKernels.length; i++) {
            const subKernel = this.subKernels[i];
            if (subKernel.returnType === "Integer") {
              result.push(`  gl_FragData[${i + 1}] = ${this.useLegacyEncoder ? "legacyEncode32" : "encode32"}(float(subKernelResult_${this.subKernels[i].name}))`);
            } else {
              result.push(`  gl_FragData[${i + 1}] = ${this.useLegacyEncoder ? "legacyEncode32" : "encode32"}(subKernelResult_${this.subKernels[i].name})`);
            }
          }
          return utils.linesToString(result);
        }
        getMainResultMemoryOptimizedFloats() {
          const result = [
            "  index *= 4"
          ];
          switch (this.returnType) {
            case "Number":
            case "Integer":
            case "Float":
              const channels = ["r", "g", "b", "a"];
              for (let i = 0; i < channels.length; i++) {
                const channel = channels[i];
                this.getMainResultKernelMemoryOptimizedFloats(result, channel);
                this.getMainResultSubKernelMemoryOptimizedFloats(result, channel);
                if (i + 1 < channels.length) {
                  result.push("  index += 1");
                }
              }
              break;
            default:
              throw new Error(`optimized output only usable with Numbers, ${this.returnType} specified`);
          }
          return utils.linesToString(result);
        }
        getMainResultKernelMemoryOptimizedFloats(result, channel) {
          result.push("  threadId = indexTo3D(index, uOutputDim)", "  kernel()", `  gl_FragData[0].${channel} = kernelResult`);
        }
        getMainResultSubKernelMemoryOptimizedFloats(result, channel) {
          if (!this.subKernels)
            return result;
          for (let i = 0; i < this.subKernels.length; i++) {
            const subKernel = this.subKernels[i];
            if (subKernel.returnType === "Integer") {
              result.push(`  gl_FragData[${i + 1}].${channel} = float(subKernelResult_${this.subKernels[i].name})`);
            } else {
              result.push(`  gl_FragData[${i + 1}].${channel} = subKernelResult_${this.subKernels[i].name}`);
            }
          }
        }
        getMainResultKernelNumberTexture() {
          return [
            "  threadId = indexTo3D(index, uOutputDim)",
            "  kernel()",
            "  gl_FragData[0][0] = kernelResult"
          ];
        }
        getMainResultSubKernelNumberTexture() {
          const result = [];
          if (!this.subKernels)
            return result;
          for (let i = 0; i < this.subKernels.length; ++i) {
            const subKernel = this.subKernels[i];
            if (subKernel.returnType === "Integer") {
              result.push(`  gl_FragData[${i + 1}][0] = float(subKernelResult_${subKernel.name})`);
            } else {
              result.push(`  gl_FragData[${i + 1}][0] = subKernelResult_${subKernel.name}`);
            }
          }
          return result;
        }
        getMainResultKernelArray2Texture() {
          return [
            "  threadId = indexTo3D(index, uOutputDim)",
            "  kernel()",
            "  gl_FragData[0][0] = kernelResult[0]",
            "  gl_FragData[0][1] = kernelResult[1]"
          ];
        }
        getMainResultSubKernelArray2Texture() {
          const result = [];
          if (!this.subKernels)
            return result;
          for (let i = 0; i < this.subKernels.length; ++i) {
            result.push(`  gl_FragData[${i + 1}][0] = subKernelResult_${this.subKernels[i].name}[0]`, `  gl_FragData[${i + 1}][1] = subKernelResult_${this.subKernels[i].name}[1]`);
          }
          return result;
        }
        getMainResultKernelArray3Texture() {
          return [
            "  threadId = indexTo3D(index, uOutputDim)",
            "  kernel()",
            "  gl_FragData[0][0] = kernelResult[0]",
            "  gl_FragData[0][1] = kernelResult[1]",
            "  gl_FragData[0][2] = kernelResult[2]"
          ];
        }
        getMainResultSubKernelArray3Texture() {
          const result = [];
          if (!this.subKernels)
            return result;
          for (let i = 0; i < this.subKernels.length; ++i) {
            result.push(`  gl_FragData[${i + 1}][0] = subKernelResult_${this.subKernels[i].name}[0]`, `  gl_FragData[${i + 1}][1] = subKernelResult_${this.subKernels[i].name}[1]`, `  gl_FragData[${i + 1}][2] = subKernelResult_${this.subKernels[i].name}[2]`);
          }
          return result;
        }
        getMainResultKernelArray4Texture() {
          return [
            "  threadId = indexTo3D(index, uOutputDim)",
            "  kernel()",
            "  gl_FragData[0] = kernelResult"
          ];
        }
        getMainResultSubKernelArray4Texture() {
          const result = [];
          if (!this.subKernels)
            return result;
          switch (this.returnType) {
            case "Number":
            case "Float":
            case "Integer":
              for (let i = 0; i < this.subKernels.length; ++i) {
                const subKernel = this.subKernels[i];
                if (subKernel.returnType === "Integer") {
                  result.push(`  gl_FragData[${i + 1}] = float(subKernelResult_${this.subKernels[i].name})`);
                } else {
                  result.push(`  gl_FragData[${i + 1}] = subKernelResult_${this.subKernels[i].name}`);
                }
              }
              break;
            case "Array(2)":
              for (let i = 0; i < this.subKernels.length; ++i) {
                result.push(`  gl_FragData[${i + 1}][0] = subKernelResult_${this.subKernels[i].name}[0]`, `  gl_FragData[${i + 1}][1] = subKernelResult_${this.subKernels[i].name}[1]`);
              }
              break;
            case "Array(3)":
              for (let i = 0; i < this.subKernels.length; ++i) {
                result.push(`  gl_FragData[${i + 1}][0] = subKernelResult_${this.subKernels[i].name}[0]`, `  gl_FragData[${i + 1}][1] = subKernelResult_${this.subKernels[i].name}[1]`, `  gl_FragData[${i + 1}][2] = subKernelResult_${this.subKernels[i].name}[2]`);
              }
              break;
            case "Array(4)":
              for (let i = 0; i < this.subKernels.length; ++i) {
                result.push(`  gl_FragData[${i + 1}][0] = subKernelResult_${this.subKernels[i].name}[0]`, `  gl_FragData[${i + 1}][1] = subKernelResult_${this.subKernels[i].name}[1]`, `  gl_FragData[${i + 1}][2] = subKernelResult_${this.subKernels[i].name}[2]`, `  gl_FragData[${i + 1}][3] = subKernelResult_${this.subKernels[i].name}[3]`);
              }
              break;
          }
          return result;
        }
        replaceArtifacts(src, map) {
          return src.replace(/[ ]*__([A-Z]+[0-9]*([_]?[A-Z]*[0-9]?)*)__;\n/g, (match, artifact) => {
            if (map.hasOwnProperty(artifact)) {
              return map[artifact];
            }
            throw `unhandled artifact ${artifact}`;
          });
        }
        getFragmentShader(args) {
          if (this.compiledFragmentShader !== null) {
            return this.compiledFragmentShader;
          }
          return this.compiledFragmentShader = this.replaceArtifacts(this.constructor.fragmentShader, this._getFragShaderArtifactMap(args));
        }
        getVertexShader(args) {
          if (this.compiledVertexShader !== null) {
            return this.compiledVertexShader;
          }
          return this.compiledVertexShader = this.replaceArtifacts(this.constructor.vertexShader, this._getVertShaderArtifactMap(args));
        }
        toString() {
          const setupContextString = utils.linesToString([
            `const gl = context`
          ]);
          return glKernelString(this.constructor, arguments, this, setupContextString);
        }
        destroy(removeCanvasReferences) {
          if (!this.context)
            return;
          if (this.buffer) {
            this.context.deleteBuffer(this.buffer);
          }
          if (this.framebuffer) {
            this.context.deleteFramebuffer(this.framebuffer);
          }
          for (const width in this.rawValueFramebuffers) {
            for (const height in this.rawValueFramebuffers[width]) {
              this.context.deleteFramebuffer(this.rawValueFramebuffers[width][height]);
              delete this.rawValueFramebuffers[width][height];
            }
            delete this.rawValueFramebuffers[width];
          }
          if (this.vertShader) {
            this.context.deleteShader(this.vertShader);
          }
          if (this.fragShader) {
            this.context.deleteShader(this.fragShader);
          }
          if (this.program) {
            this.context.deleteProgram(this.program);
          }
          if (this.texture) {
            this.texture.delete();
            const textureCacheIndex = this.textureCache.indexOf(this.texture.texture);
            if (textureCacheIndex > -1) {
              this.textureCache.splice(textureCacheIndex, 1);
            }
            this.texture = null;
          }
          if (this.mappedTextures && this.mappedTextures.length) {
            for (let i2 = 0; i2 < this.mappedTextures.length; i2++) {
              const mappedTexture = this.mappedTextures[i2];
              mappedTexture.delete();
              const textureCacheIndex = this.textureCache.indexOf(mappedTexture.texture);
              if (textureCacheIndex > -1) {
                this.textureCache.splice(textureCacheIndex, 1);
              }
            }
            this.mappedTextures = null;
          }
          if (this.kernelArguments) {
            for (let i2 = 0; i2 < this.kernelArguments.length; i2++) {
              this.kernelArguments[i2].destroy();
            }
          }
          if (this.kernelConstants) {
            for (let i2 = 0; i2 < this.kernelConstants.length; i2++) {
              this.kernelConstants[i2].destroy();
            }
          }
          while (this.textureCache.length > 0) {
            const texture = this.textureCache.pop();
            this.context.deleteTexture(texture);
          }
          if (removeCanvasReferences) {
            const idx = canvases.indexOf(this.canvas);
            if (idx >= 0) {
              canvases[idx] = null;
              maxTexSizes[idx] = null;
            }
          }
          this.destroyExtensions();
          delete this.context;
          delete this.canvas;
          if (!this.gpu)
            return;
          const i = this.gpu.kernels.indexOf(this);
          if (i === -1)
            return;
          this.gpu.kernels.splice(i, 1);
        }
        destroyExtensions() {
          this.extensions.OES_texture_float = null;
          this.extensions.OES_texture_float_linear = null;
          this.extensions.OES_element_index_uint = null;
          this.extensions.WEBGL_draw_buffers = null;
        }
        static destroyContext(context) {
          const extension = context.getExtension("WEBGL_lose_context");
          if (extension) {
            extension.loseContext();
          }
        }
        toJSON() {
          const json = super.toJSON();
          json.functionNodes = FunctionBuilder.fromKernel(this, WebGLFunctionNode).toJSON();
          json.settings.threadDim = this.threadDim;
          return json;
        }
      }
      module2.exports = {
        WebGLKernel
      };
    }, { "../../plugins/math-random-uniformly-distributed": 112, "../../utils": 114, "../function-builder": 9, "../gl/kernel": 13, "../gl/kernel-string": 12, "./fragment-shader": 37, "./function-node": 38, "./kernel-value-maps": 39, "./vertex-shader": 71 }], 71: [function(require2, module2, exports2) {
      const vertexShader = `__FLOAT_TACTIC_DECLARATION__;
__INT_TACTIC_DECLARATION__;
__SAMPLER_2D_TACTIC_DECLARATION__;

attribute vec2 aPos;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;
uniform vec2 ratio;

void main(void) {
  gl_Position = vec4((aPos + vec2(1)) * ratio + vec2(-1), 0, 1);
  vTexCoord = aTexCoord;
}`;
      module2.exports = {
        vertexShader
      };
    }, {}], 72: [function(require2, module2, exports2) {
      const fragmentShader = `#version 300 es
__HEADER__;
__FLOAT_TACTIC_DECLARATION__;
__INT_TACTIC_DECLARATION__;
__SAMPLER_2D_TACTIC_DECLARATION__;
__SAMPLER_2D_ARRAY_TACTIC_DECLARATION__;

const int LOOP_MAX = __LOOP_MAX__;

__PLUGINS__;
__CONSTANTS__;

in vec2 vTexCoord;

float atan2(float v1, float v2) {
  if (v1 == 0.0 || v2 == 0.0) return 0.0;
  return atan(v1 / v2);
}

float cbrt(float x) {
  if (x >= 0.0) {
    return pow(x, 1.0 / 3.0);
  } else {
    return -pow(x, 1.0 / 3.0);
  }
}

float expm1(float x) {
  return pow(${Math.E}, x) - 1.0; 
}

float fround(highp float x) {
  return x;
}

float imul(float v1, float v2) {
  return float(int(v1) * int(v2));
}

float log10(float x) {
  return log2(x) * (1.0 / log2(10.0));
}

float log1p(float x) {
  return log(1.0 + x);
}

float _pow(float v1, float v2) {
  if (v2 == 0.0) return 1.0;
  return pow(v1, v2);
}

float _round(float x) {
  return floor(x + 0.5);
}


const int BIT_COUNT = 32;
int modi(int x, int y) {
  return x - y * (x / y);
}

int bitwiseOr(int a, int b) {
  int result = 0;
  int n = 1;
  
  for (int i = 0; i < BIT_COUNT; i++) {
    if ((modi(a, 2) == 1) || (modi(b, 2) == 1)) {
      result += n;
    }
    a = a / 2;
    b = b / 2;
    n = n * 2;
    if(!(a > 0 || b > 0)) {
      break;
    }
  }
  return result;
}
int bitwiseXOR(int a, int b) {
  int result = 0;
  int n = 1;
  
  for (int i = 0; i < BIT_COUNT; i++) {
    if ((modi(a, 2) == 1) != (modi(b, 2) == 1)) {
      result += n;
    }
    a = a / 2;
    b = b / 2;
    n = n * 2;
    if(!(a > 0 || b > 0)) {
      break;
    }
  }
  return result;
}
int bitwiseAnd(int a, int b) {
  int result = 0;
  int n = 1;
  for (int i = 0; i < BIT_COUNT; i++) {
    if ((modi(a, 2) == 1) && (modi(b, 2) == 1)) {
      result += n;
    }
    a = a / 2;
    b = b / 2;
    n = n * 2;
    if(!(a > 0 && b > 0)) {
      break;
    }
  }
  return result;
}
int bitwiseNot(int a) {
  int result = 0;
  int n = 1;
  
  for (int i = 0; i < BIT_COUNT; i++) {
    if (modi(a, 2) == 0) {
      result += n;    
    }
    a = a / 2;
    n = n * 2;
  }
  return result;
}
int bitwiseZeroFillLeftShift(int n, int shift) {
  int maxBytes = BIT_COUNT;
  for (int i = 0; i < BIT_COUNT; i++) {
    if (maxBytes >= n) {
      break;
    }
    maxBytes *= 2;
  }
  for (int i = 0; i < BIT_COUNT; i++) {
    if (i >= shift) {
      break;
    }
    n *= 2;
  }

  int result = 0;
  int byteVal = 1;
  for (int i = 0; i < BIT_COUNT; i++) {
    if (i >= maxBytes) break;
    if (modi(n, 2) > 0) { result += byteVal; }
    n = int(n / 2);
    byteVal *= 2;
  }
  return result;
}

int bitwiseSignedRightShift(int num, int shifts) {
  return int(floor(float(num) / pow(2.0, float(shifts))));
}

int bitwiseZeroFillRightShift(int n, int shift) {
  int maxBytes = BIT_COUNT;
  for (int i = 0; i < BIT_COUNT; i++) {
    if (maxBytes >= n) {
      break;
    }
    maxBytes *= 2;
  }
  for (int i = 0; i < BIT_COUNT; i++) {
    if (i >= shift) {
      break;
    }
    n /= 2;
  }
  int result = 0;
  int byteVal = 1;
  for (int i = 0; i < BIT_COUNT; i++) {
    if (i >= maxBytes) break;
    if (modi(n, 2) > 0) { result += byteVal; }
    n = int(n / 2);
    byteVal *= 2;
  }
  return result;
}

vec2 integerMod(vec2 x, float y) {
  vec2 res = floor(mod(x, y));
  return res * step(1.0 - floor(y), -res);
}

vec3 integerMod(vec3 x, float y) {
  vec3 res = floor(mod(x, y));
  return res * step(1.0 - floor(y), -res);
}

vec4 integerMod(vec4 x, vec4 y) {
  vec4 res = floor(mod(x, y));
  return res * step(1.0 - floor(y), -res);
}

float integerMod(float x, float y) {
  float res = floor(mod(x, y));
  return res * (res > floor(y) - 1.0 ? 0.0 : 1.0);
}

int integerMod(int x, int y) {
  return x - (y * int(x/y));
}

__DIVIDE_WITH_INTEGER_CHECK__;

// Here be dragons!
// DO NOT OPTIMIZE THIS CODE
// YOU WILL BREAK SOMETHING ON SOMEBODY'S MACHINE
// LEAVE IT AS IT IS, LEST YOU WASTE YOUR OWN TIME
const vec2 MAGIC_VEC = vec2(1.0, -256.0);
const vec4 SCALE_FACTOR = vec4(1.0, 256.0, 65536.0, 0.0);
const vec4 SCALE_FACTOR_INV = vec4(1.0, 0.00390625, 0.0000152587890625, 0.0); // 1, 1/256, 1/65536
float decode32(vec4 texel) {
  __DECODE32_ENDIANNESS__;
  texel *= 255.0;
  vec2 gte128;
  gte128.x = texel.b >= 128.0 ? 1.0 : 0.0;
  gte128.y = texel.a >= 128.0 ? 1.0 : 0.0;
  float exponent = 2.0 * texel.a - 127.0 + dot(gte128, MAGIC_VEC);
  float res = exp2(round(exponent));
  texel.b = texel.b - 128.0 * gte128.x;
  res = dot(texel, SCALE_FACTOR) * exp2(round(exponent-23.0)) + res;
  res *= gte128.y * -2.0 + 1.0;
  return res;
}

float decode16(vec4 texel, int index) {
  int channel = integerMod(index, 2);
  return texel[channel*2] * 255.0 + texel[channel*2 + 1] * 65280.0;
}

float decode8(vec4 texel, int index) {
  int channel = integerMod(index, 4);
  return texel[channel] * 255.0;
}

vec4 legacyEncode32(float f) {
  float F = abs(f);
  float sign = f < 0.0 ? 1.0 : 0.0;
  float exponent = floor(log2(F));
  float mantissa = (exp2(-exponent) * F);
  // exponent += floor(log2(mantissa));
  vec4 texel = vec4(F * exp2(23.0-exponent)) * SCALE_FACTOR_INV;
  texel.rg = integerMod(texel.rg, 256.0);
  texel.b = integerMod(texel.b, 128.0);
  texel.a = exponent*0.5 + 63.5;
  texel.ba += vec2(integerMod(exponent+127.0, 2.0), sign) * 128.0;
  texel = floor(texel);
  texel *= 0.003921569; // 1/255
  __ENCODE32_ENDIANNESS__;
  return texel;
}

// https://github.com/gpujs/gpu.js/wiki/Encoder-details
vec4 encode32(float value) {
  if (value == 0.0) return vec4(0, 0, 0, 0);

  float exponent;
  float mantissa;
  vec4  result;
  float sgn;

  sgn = step(0.0, -value);
  value = abs(value);

  exponent = floor(log2(value));

  mantissa = value*pow(2.0, -exponent)-1.0;
  exponent = exponent+127.0;
  result   = vec4(0,0,0,0);

  result.a = floor(exponent/2.0);
  exponent = exponent - result.a*2.0;
  result.a = result.a + 128.0*sgn;

  result.b = floor(mantissa * 128.0);
  mantissa = mantissa - result.b / 128.0;
  result.b = result.b + exponent*128.0;

  result.g = floor(mantissa*32768.0);
  mantissa = mantissa - result.g/32768.0;

  result.r = floor(mantissa*8388608.0);
  return result/255.0;
}
// Dragons end here

int index;
ivec3 threadId;

ivec3 indexTo3D(int idx, ivec3 texDim) {
  int z = int(idx / (texDim.x * texDim.y));
  idx -= z * int(texDim.x * texDim.y);
  int y = int(idx / texDim.x);
  int x = int(integerMod(idx, texDim.x));
  return ivec3(x, y, z);
}

float get32(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  int index = x + texDim.x * (y + texDim.y * z);
  int w = texSize.x;
  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;
  vec4 texel = texture(tex, st / vec2(texSize));
  return decode32(texel);
}

float get16(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  int index = x + (texDim.x * (y + (texDim.y * z)));
  int w = texSize.x * 2;
  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;
  vec4 texel = texture(tex, st / vec2(texSize.x * 2, texSize.y));
  return decode16(texel, index);
}

float get8(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  int index = x + (texDim.x * (y + (texDim.y * z)));
  int w = texSize.x * 4;
  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;
  vec4 texel = texture(tex, st / vec2(texSize.x * 4, texSize.y));
  return decode8(texel, index);
}

float getMemoryOptimized32(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  int index = x + (texDim.x * (y + (texDim.y * z)));
  int channel = integerMod(index, 4);
  index = index / 4;
  int w = texSize.x;
  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;
  index = index / 4;
  vec4 texel = texture(tex, st / vec2(texSize));
  return texel[channel];
}

vec4 getImage2D(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  int index = x + texDim.x * (y + texDim.y * z);
  int w = texSize.x;
  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;
  return texture(tex, st / vec2(texSize));
}

vec4 getImage3D(sampler2DArray tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  int index = x + texDim.x * (y + texDim.y * z);
  int w = texSize.x;
  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;
  return texture(tex, vec3(st / vec2(texSize), z));
}

float getFloatFromSampler2D(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  vec4 result = getImage2D(tex, texSize, texDim, z, y, x);
  return result[0];
}

vec2 getVec2FromSampler2D(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  vec4 result = getImage2D(tex, texSize, texDim, z, y, x);
  return vec2(result[0], result[1]);
}

vec2 getMemoryOptimizedVec2(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  int index = x + texDim.x * (y + texDim.y * z);
  int channel = integerMod(index, 2);
  index = index / 2;
  int w = texSize.x;
  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;
  vec4 texel = texture(tex, st / vec2(texSize));
  if (channel == 0) return vec2(texel.r, texel.g);
  if (channel == 1) return vec2(texel.b, texel.a);
  return vec2(0.0, 0.0);
}

vec3 getVec3FromSampler2D(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  vec4 result = getImage2D(tex, texSize, texDim, z, y, x);
  return vec3(result[0], result[1], result[2]);
}

vec3 getMemoryOptimizedVec3(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  int fieldIndex = 3 * (x + texDim.x * (y + texDim.y * z));
  int vectorIndex = fieldIndex / 4;
  int vectorOffset = fieldIndex - vectorIndex * 4;
  int readY = vectorIndex / texSize.x;
  int readX = vectorIndex - readY * texSize.x;
  vec4 tex1 = texture(tex, (vec2(readX, readY) + 0.5) / vec2(texSize));

  if (vectorOffset == 0) {
    return tex1.xyz;
  } else if (vectorOffset == 1) {
    return tex1.yzw;
  } else {
    readX++;
    if (readX >= texSize.x) {
      readX = 0;
      readY++;
    }
    vec4 tex2 = texture(tex, vec2(readX, readY) / vec2(texSize));
    if (vectorOffset == 2) {
      return vec3(tex1.z, tex1.w, tex2.x);
    } else {
      return vec3(tex1.w, tex2.x, tex2.y);
    }
  }
}

vec4 getVec4FromSampler2D(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  return getImage2D(tex, texSize, texDim, z, y, x);
}

vec4 getMemoryOptimizedVec4(sampler2D tex, ivec2 texSize, ivec3 texDim, int z, int y, int x) {
  int index = x + texDim.x * (y + texDim.y * z);
  int channel = integerMod(index, 2);
  int w = texSize.x;
  vec2 st = vec2(float(integerMod(index, w)), float(index / w)) + 0.5;
  vec4 texel = texture(tex, st / vec2(texSize));
  return vec4(texel.r, texel.g, texel.b, texel.a);
}

vec4 actualColor;
void color(float r, float g, float b, float a) {
  actualColor = vec4(r,g,b,a);
}

void color(float r, float g, float b) {
  color(r,g,b,1.0);
}

float modulo(float number, float divisor) {
  if (number < 0.0) {
    number = abs(number);
    if (divisor < 0.0) {
      divisor = abs(divisor);
    }
    return -mod(number, divisor);
  }
  if (divisor < 0.0) {
    divisor = abs(divisor);
  }
  return mod(number, divisor);
}

__INJECTED_NATIVE__;
__MAIN_CONSTANTS__;
__MAIN_ARGUMENTS__;
__KERNEL__;

void main(void) {
  index = int(vTexCoord.s * float(uTexSize.x)) + int(vTexCoord.t * float(uTexSize.y)) * uTexSize.x;
  __MAIN_RESULT__;
}`;
      module2.exports = {
        fragmentShader
      };
    }, {}], 73: [function(require2, module2, exports2) {
      const { utils } = require2("../../utils");
      const { WebGLFunctionNode } = require2("../web-gl/function-node");
      class WebGL2FunctionNode extends WebGLFunctionNode {
        astIdentifierExpression(idtNode, retArr) {
          if (idtNode.type !== "Identifier") {
            throw this.astErrorOutput("IdentifierExpression - not an Identifier", idtNode);
          }
          const type = this.getType(idtNode);
          const name2 = utils.sanitizeName(idtNode.name);
          if (idtNode.name === "Infinity") {
            retArr.push("intBitsToFloat(2139095039)");
          } else if (type === "Boolean") {
            if (this.argumentNames.indexOf(name2) > -1) {
              retArr.push(`bool(user_${name2})`);
            } else {
              retArr.push(`user_${name2}`);
            }
          } else {
            retArr.push(`user_${name2}`);
          }
          return retArr;
        }
      }
      module2.exports = {
        WebGL2FunctionNode
      };
    }, { "../../utils": 114, "../web-gl/function-node": 38 }], 74: [function(require2, module2, exports2) {
      const { WebGL2KernelValueBoolean } = require2("./kernel-value/boolean");
      const { WebGL2KernelValueFloat } = require2("./kernel-value/float");
      const { WebGL2KernelValueInteger } = require2("./kernel-value/integer");
      const { WebGL2KernelValueHTMLImage } = require2("./kernel-value/html-image");
      const { WebGL2KernelValueDynamicHTMLImage } = require2("./kernel-value/dynamic-html-image");
      const { WebGL2KernelValueHTMLImageArray } = require2("./kernel-value/html-image-array");
      const { WebGL2KernelValueDynamicHTMLImageArray } = require2("./kernel-value/dynamic-html-image-array");
      const { WebGL2KernelValueHTMLVideo } = require2("./kernel-value/html-video");
      const { WebGL2KernelValueDynamicHTMLVideo } = require2("./kernel-value/dynamic-html-video");
      const { WebGL2KernelValueSingleInput } = require2("./kernel-value/single-input");
      const { WebGL2KernelValueDynamicSingleInput } = require2("./kernel-value/dynamic-single-input");
      const { WebGL2KernelValueUnsignedInput } = require2("./kernel-value/unsigned-input");
      const { WebGL2KernelValueDynamicUnsignedInput } = require2("./kernel-value/dynamic-unsigned-input");
      const { WebGL2KernelValueMemoryOptimizedNumberTexture } = require2("./kernel-value/memory-optimized-number-texture");
      const { WebGL2KernelValueDynamicMemoryOptimizedNumberTexture } = require2("./kernel-value/dynamic-memory-optimized-number-texture");
      const { WebGL2KernelValueNumberTexture } = require2("./kernel-value/number-texture");
      const { WebGL2KernelValueDynamicNumberTexture } = require2("./kernel-value/dynamic-number-texture");
      const { WebGL2KernelValueSingleArray } = require2("./kernel-value/single-array");
      const { WebGL2KernelValueDynamicSingleArray } = require2("./kernel-value/dynamic-single-array");
      const { WebGL2KernelValueSingleArray1DI } = require2("./kernel-value/single-array1d-i");
      const { WebGL2KernelValueDynamicSingleArray1DI } = require2("./kernel-value/dynamic-single-array1d-i");
      const { WebGL2KernelValueSingleArray2DI } = require2("./kernel-value/single-array2d-i");
      const { WebGL2KernelValueDynamicSingleArray2DI } = require2("./kernel-value/dynamic-single-array2d-i");
      const { WebGL2KernelValueSingleArray3DI } = require2("./kernel-value/single-array3d-i");
      const { WebGL2KernelValueDynamicSingleArray3DI } = require2("./kernel-value/dynamic-single-array3d-i");
      const { WebGL2KernelValueArray2 } = require2("./kernel-value/array2");
      const { WebGL2KernelValueArray3 } = require2("./kernel-value/array3");
      const { WebGL2KernelValueArray4 } = require2("./kernel-value/array4");
      const { WebGL2KernelValueUnsignedArray } = require2("./kernel-value/unsigned-array");
      const { WebGL2KernelValueDynamicUnsignedArray } = require2("./kernel-value/dynamic-unsigned-array");
      const kernelValueMaps = {
        unsigned: {
          dynamic: {
            "Boolean": WebGL2KernelValueBoolean,
            "Integer": WebGL2KernelValueInteger,
            "Float": WebGL2KernelValueFloat,
            "Array": WebGL2KernelValueDynamicUnsignedArray,
            "Array(2)": WebGL2KernelValueArray2,
            "Array(3)": WebGL2KernelValueArray3,
            "Array(4)": WebGL2KernelValueArray4,
            "Array1D(2)": false,
            "Array1D(3)": false,
            "Array1D(4)": false,
            "Array2D(2)": false,
            "Array2D(3)": false,
            "Array2D(4)": false,
            "Array3D(2)": false,
            "Array3D(3)": false,
            "Array3D(4)": false,
            "Input": WebGL2KernelValueDynamicUnsignedInput,
            "NumberTexture": WebGL2KernelValueDynamicNumberTexture,
            "ArrayTexture(1)": WebGL2KernelValueDynamicNumberTexture,
            "ArrayTexture(2)": WebGL2KernelValueDynamicNumberTexture,
            "ArrayTexture(3)": WebGL2KernelValueDynamicNumberTexture,
            "ArrayTexture(4)": WebGL2KernelValueDynamicNumberTexture,
            "MemoryOptimizedNumberTexture": WebGL2KernelValueDynamicMemoryOptimizedNumberTexture,
            "HTMLCanvas": WebGL2KernelValueDynamicHTMLImage,
            "OffscreenCanvas": WebGL2KernelValueDynamicHTMLImage,
            "HTMLImage": WebGL2KernelValueDynamicHTMLImage,
            "ImageBitmap": WebGL2KernelValueDynamicHTMLImage,
            "ImageData": WebGL2KernelValueDynamicHTMLImage,
            "HTMLImageArray": WebGL2KernelValueDynamicHTMLImageArray,
            "HTMLVideo": WebGL2KernelValueDynamicHTMLVideo
          },
          static: {
            "Boolean": WebGL2KernelValueBoolean,
            "Float": WebGL2KernelValueFloat,
            "Integer": WebGL2KernelValueInteger,
            "Array": WebGL2KernelValueUnsignedArray,
            "Array(2)": WebGL2KernelValueArray2,
            "Array(3)": WebGL2KernelValueArray3,
            "Array(4)": WebGL2KernelValueArray4,
            "Array1D(2)": false,
            "Array1D(3)": false,
            "Array1D(4)": false,
            "Array2D(2)": false,
            "Array2D(3)": false,
            "Array2D(4)": false,
            "Array3D(2)": false,
            "Array3D(3)": false,
            "Array3D(4)": false,
            "Input": WebGL2KernelValueUnsignedInput,
            "NumberTexture": WebGL2KernelValueNumberTexture,
            "ArrayTexture(1)": WebGL2KernelValueNumberTexture,
            "ArrayTexture(2)": WebGL2KernelValueNumberTexture,
            "ArrayTexture(3)": WebGL2KernelValueNumberTexture,
            "ArrayTexture(4)": WebGL2KernelValueNumberTexture,
            "MemoryOptimizedNumberTexture": WebGL2KernelValueDynamicMemoryOptimizedNumberTexture,
            "HTMLCanvas": WebGL2KernelValueHTMLImage,
            "OffscreenCanvas": WebGL2KernelValueHTMLImage,
            "HTMLImage": WebGL2KernelValueHTMLImage,
            "ImageBitmap": WebGL2KernelValueHTMLImage,
            "ImageData": WebGL2KernelValueHTMLImage,
            "HTMLImageArray": WebGL2KernelValueHTMLImageArray,
            "HTMLVideo": WebGL2KernelValueHTMLVideo
          }
        },
        single: {
          dynamic: {
            "Boolean": WebGL2KernelValueBoolean,
            "Integer": WebGL2KernelValueInteger,
            "Float": WebGL2KernelValueFloat,
            "Array": WebGL2KernelValueDynamicSingleArray,
            "Array(2)": WebGL2KernelValueArray2,
            "Array(3)": WebGL2KernelValueArray3,
            "Array(4)": WebGL2KernelValueArray4,
            "Array1D(2)": WebGL2KernelValueDynamicSingleArray1DI,
            "Array1D(3)": WebGL2KernelValueDynamicSingleArray1DI,
            "Array1D(4)": WebGL2KernelValueDynamicSingleArray1DI,
            "Array2D(2)": WebGL2KernelValueDynamicSingleArray2DI,
            "Array2D(3)": WebGL2KernelValueDynamicSingleArray2DI,
            "Array2D(4)": WebGL2KernelValueDynamicSingleArray2DI,
            "Array3D(2)": WebGL2KernelValueDynamicSingleArray3DI,
            "Array3D(3)": WebGL2KernelValueDynamicSingleArray3DI,
            "Array3D(4)": WebGL2KernelValueDynamicSingleArray3DI,
            "Input": WebGL2KernelValueDynamicSingleInput,
            "NumberTexture": WebGL2KernelValueDynamicNumberTexture,
            "ArrayTexture(1)": WebGL2KernelValueDynamicNumberTexture,
            "ArrayTexture(2)": WebGL2KernelValueDynamicNumberTexture,
            "ArrayTexture(3)": WebGL2KernelValueDynamicNumberTexture,
            "ArrayTexture(4)": WebGL2KernelValueDynamicNumberTexture,
            "MemoryOptimizedNumberTexture": WebGL2KernelValueDynamicMemoryOptimizedNumberTexture,
            "HTMLCanvas": WebGL2KernelValueDynamicHTMLImage,
            "OffscreenCanvas": WebGL2KernelValueDynamicHTMLImage,
            "HTMLImage": WebGL2KernelValueDynamicHTMLImage,
            "ImageBitmap": WebGL2KernelValueDynamicHTMLImage,
            "ImageData": WebGL2KernelValueDynamicHTMLImage,
            "HTMLImageArray": WebGL2KernelValueDynamicHTMLImageArray,
            "HTMLVideo": WebGL2KernelValueDynamicHTMLVideo
          },
          static: {
            "Boolean": WebGL2KernelValueBoolean,
            "Float": WebGL2KernelValueFloat,
            "Integer": WebGL2KernelValueInteger,
            "Array": WebGL2KernelValueSingleArray,
            "Array(2)": WebGL2KernelValueArray2,
            "Array(3)": WebGL2KernelValueArray3,
            "Array(4)": WebGL2KernelValueArray4,
            "Array1D(2)": WebGL2KernelValueSingleArray1DI,
            "Array1D(3)": WebGL2KernelValueSingleArray1DI,
            "Array1D(4)": WebGL2KernelValueSingleArray1DI,
            "Array2D(2)": WebGL2KernelValueSingleArray2DI,
            "Array2D(3)": WebGL2KernelValueSingleArray2DI,
            "Array2D(4)": WebGL2KernelValueSingleArray2DI,
            "Array3D(2)": WebGL2KernelValueSingleArray3DI,
            "Array3D(3)": WebGL2KernelValueSingleArray3DI,
            "Array3D(4)": WebGL2KernelValueSingleArray3DI,
            "Input": WebGL2KernelValueSingleInput,
            "NumberTexture": WebGL2KernelValueNumberTexture,
            "ArrayTexture(1)": WebGL2KernelValueNumberTexture,
            "ArrayTexture(2)": WebGL2KernelValueNumberTexture,
            "ArrayTexture(3)": WebGL2KernelValueNumberTexture,
            "ArrayTexture(4)": WebGL2KernelValueNumberTexture,
            "MemoryOptimizedNumberTexture": WebGL2KernelValueMemoryOptimizedNumberTexture,
            "HTMLCanvas": WebGL2KernelValueHTMLImage,
            "OffscreenCanvas": WebGL2KernelValueHTMLImage,
            "HTMLImage": WebGL2KernelValueHTMLImage,
            "ImageBitmap": WebGL2KernelValueHTMLImage,
            "ImageData": WebGL2KernelValueHTMLImage,
            "HTMLImageArray": WebGL2KernelValueHTMLImageArray,
            "HTMLVideo": WebGL2KernelValueHTMLVideo
          }
        }
      };
      function lookupKernelValueType(type, dynamic, precision, value2) {
        if (!type) {
          throw new Error("type missing");
        }
        if (!dynamic) {
          throw new Error("dynamic missing");
        }
        if (!precision) {
          throw new Error("precision missing");
        }
        if (value2.type) {
          type = value2.type;
        }
        const types = kernelValueMaps[precision][dynamic];
        if (types[type] === false) {
          return null;
        } else if (types[type] === void 0) {
          throw new Error(`Could not find a KernelValue for ${type}`);
        }
        return types[type];
      }
      module2.exports = {
        kernelValueMaps,
        lookupKernelValueType
      };
    }, { "./kernel-value/array2": 75, "./kernel-value/array3": 76, "./kernel-value/array4": 77, "./kernel-value/boolean": 78, "./kernel-value/dynamic-html-image": 80, "./kernel-value/dynamic-html-image-array": 79, "./kernel-value/dynamic-html-video": 81, "./kernel-value/dynamic-memory-optimized-number-texture": 82, "./kernel-value/dynamic-number-texture": 83, "./kernel-value/dynamic-single-array": 84, "./kernel-value/dynamic-single-array1d-i": 85, "./kernel-value/dynamic-single-array2d-i": 86, "./kernel-value/dynamic-single-array3d-i": 87, "./kernel-value/dynamic-single-input": 88, "./kernel-value/dynamic-unsigned-array": 89, "./kernel-value/dynamic-unsigned-input": 90, "./kernel-value/float": 91, "./kernel-value/html-image": 93, "./kernel-value/html-image-array": 92, "./kernel-value/html-video": 94, "./kernel-value/integer": 95, "./kernel-value/memory-optimized-number-texture": 96, "./kernel-value/number-texture": 97, "./kernel-value/single-array": 98, "./kernel-value/single-array1d-i": 99, "./kernel-value/single-array2d-i": 100, "./kernel-value/single-array3d-i": 101, "./kernel-value/single-input": 102, "./kernel-value/unsigned-array": 103, "./kernel-value/unsigned-input": 104 }], 75: [function(require2, module2, exports2) {
      const { WebGLKernelValueArray2 } = require2("../../web-gl/kernel-value/array2");
      class WebGL2KernelValueArray2 extends WebGLKernelValueArray2 {
      }
      module2.exports = {
        WebGL2KernelValueArray2
      };
    }, { "../../web-gl/kernel-value/array2": 41 }], 76: [function(require2, module2, exports2) {
      const { WebGLKernelValueArray3 } = require2("../../web-gl/kernel-value/array3");
      class WebGL2KernelValueArray3 extends WebGLKernelValueArray3 {
      }
      module2.exports = {
        WebGL2KernelValueArray3
      };
    }, { "../../web-gl/kernel-value/array3": 42 }], 77: [function(require2, module2, exports2) {
      const { WebGLKernelValueArray4 } = require2("../../web-gl/kernel-value/array4");
      class WebGL2KernelValueArray4 extends WebGLKernelValueArray4 {
      }
      module2.exports = {
        WebGL2KernelValueArray4
      };
    }, { "../../web-gl/kernel-value/array4": 43 }], 78: [function(require2, module2, exports2) {
      const { WebGLKernelValueBoolean } = require2("../../web-gl/kernel-value/boolean");
      class WebGL2KernelValueBoolean extends WebGLKernelValueBoolean {
      }
      module2.exports = {
        WebGL2KernelValueBoolean
      };
    }, { "../../web-gl/kernel-value/boolean": 44 }], 79: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGL2KernelValueHTMLImageArray } = require2("./html-image-array");
      class WebGL2KernelValueDynamicHTMLImageArray extends WebGL2KernelValueHTMLImageArray {
        getSource() {
          const variablePrecision = this.getVariablePrecisionString();
          return utils.linesToString([
            `uniform ${variablePrecision} sampler2DArray ${this.id}`,
            `uniform ${variablePrecision} ivec2 ${this.sizeId}`,
            `uniform ${variablePrecision} ivec3 ${this.dimensionsId}`
          ]);
        }
        updateValue(images) {
          const { width, height } = images[0];
          this.checkSize(width, height);
          this.dimensions = [width, height, images.length];
          this.textureSize = [width, height];
          this.kernel.setUniform3iv(this.dimensionsId, this.dimensions);
          this.kernel.setUniform2iv(this.sizeId, this.textureSize);
          super.updateValue(images);
        }
      }
      module2.exports = {
        WebGL2KernelValueDynamicHTMLImageArray
      };
    }, { "../../../utils": 114, "./html-image-array": 92 }], 80: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueDynamicHTMLImage } = require2("../../web-gl/kernel-value/dynamic-html-image");
      class WebGL2KernelValueDynamicHTMLImage extends WebGLKernelValueDynamicHTMLImage {
        getSource() {
          const variablePrecision = this.getVariablePrecisionString();
          return utils.linesToString([
            `uniform ${variablePrecision} sampler2D ${this.id}`,
            `uniform ${variablePrecision} ivec2 ${this.sizeId}`,
            `uniform ${variablePrecision} ivec3 ${this.dimensionsId}`
          ]);
        }
      }
      module2.exports = {
        WebGL2KernelValueDynamicHTMLImage
      };
    }, { "../../../utils": 114, "../../web-gl/kernel-value/dynamic-html-image": 45 }], 81: [function(require2, module2, exports2) {
      require2("../../../utils");
      const { WebGL2KernelValueDynamicHTMLImage } = require2("./dynamic-html-image");
      class WebGL2KernelValueDynamicHTMLVideo extends WebGL2KernelValueDynamicHTMLImage {
      }
      module2.exports = {
        WebGL2KernelValueDynamicHTMLVideo
      };
    }, { "../../../utils": 114, "./dynamic-html-image": 80 }], 82: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueDynamicMemoryOptimizedNumberTexture } = require2("../../web-gl/kernel-value/dynamic-memory-optimized-number-texture");
      class WebGL2KernelValueDynamicMemoryOptimizedNumberTexture extends WebGLKernelValueDynamicMemoryOptimizedNumberTexture {
        getSource() {
          return utils.linesToString([
            `uniform sampler2D ${this.id}`,
            `uniform ivec2 ${this.sizeId}`,
            `uniform ivec3 ${this.dimensionsId}`
          ]);
        }
      }
      module2.exports = {
        WebGL2KernelValueDynamicMemoryOptimizedNumberTexture
      };
    }, { "../../../utils": 114, "../../web-gl/kernel-value/dynamic-memory-optimized-number-texture": 47 }], 83: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueDynamicNumberTexture } = require2("../../web-gl/kernel-value/dynamic-number-texture");
      class WebGL2KernelValueDynamicNumberTexture extends WebGLKernelValueDynamicNumberTexture {
        getSource() {
          const variablePrecision = this.getVariablePrecisionString();
          return utils.linesToString([
            `uniform ${variablePrecision} sampler2D ${this.id}`,
            `uniform ${variablePrecision} ivec2 ${this.sizeId}`,
            `uniform ${variablePrecision} ivec3 ${this.dimensionsId}`
          ]);
        }
      }
      module2.exports = {
        WebGL2KernelValueDynamicNumberTexture
      };
    }, { "../../../utils": 114, "../../web-gl/kernel-value/dynamic-number-texture": 48 }], 84: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGL2KernelValueSingleArray } = require2("../../web-gl2/kernel-value/single-array");
      class WebGL2KernelValueDynamicSingleArray extends WebGL2KernelValueSingleArray {
        getSource() {
          const variablePrecision = this.getVariablePrecisionString();
          return utils.linesToString([
            `uniform ${variablePrecision} sampler2D ${this.id}`,
            `uniform ${variablePrecision} ivec2 ${this.sizeId}`,
            `uniform ${variablePrecision} ivec3 ${this.dimensionsId}`
          ]);
        }
        updateValue(value2) {
          this.dimensions = utils.getDimensions(value2, true);
          this.textureSize = utils.getMemoryOptimizedFloatTextureSize(this.dimensions, this.bitRatio);
          this.uploadArrayLength = this.textureSize[0] * this.textureSize[1] * this.bitRatio;
          this.checkSize(this.textureSize[0], this.textureSize[1]);
          this.uploadValue = new Float32Array(this.uploadArrayLength);
          this.kernel.setUniform3iv(this.dimensionsId, this.dimensions);
          this.kernel.setUniform2iv(this.sizeId, this.textureSize);
          super.updateValue(value2);
        }
      }
      module2.exports = {
        WebGL2KernelValueDynamicSingleArray
      };
    }, { "../../../utils": 114, "../../web-gl2/kernel-value/single-array": 98 }], 85: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGL2KernelValueSingleArray1DI } = require2("../../web-gl2/kernel-value/single-array1d-i");
      class WebGL2KernelValueDynamicSingleArray1DI extends WebGL2KernelValueSingleArray1DI {
        getSource() {
          const variablePrecision = this.getVariablePrecisionString();
          return utils.linesToString([
            `uniform ${variablePrecision} sampler2D ${this.id}`,
            `uniform ${variablePrecision} ivec2 ${this.sizeId}`,
            `uniform ${variablePrecision} ivec3 ${this.dimensionsId}`
          ]);
        }
        updateValue(value2) {
          this.setShape(value2);
          this.kernel.setUniform3iv(this.dimensionsId, this.dimensions);
          this.kernel.setUniform2iv(this.sizeId, this.textureSize);
          super.updateValue(value2);
        }
      }
      module2.exports = {
        WebGL2KernelValueDynamicSingleArray1DI
      };
    }, { "../../../utils": 114, "../../web-gl2/kernel-value/single-array1d-i": 99 }], 86: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGL2KernelValueSingleArray2DI } = require2("../../web-gl2/kernel-value/single-array2d-i");
      class WebGL2KernelValueDynamicSingleArray2DI extends WebGL2KernelValueSingleArray2DI {
        getSource() {
          const variablePrecision = this.getVariablePrecisionString();
          return utils.linesToString([
            `uniform ${variablePrecision} sampler2D ${this.id}`,
            `uniform ${variablePrecision} ivec2 ${this.sizeId}`,
            `uniform ${variablePrecision} ivec3 ${this.dimensionsId}`
          ]);
        }
        updateValue(value2) {
          this.setShape(value2);
          this.kernel.setUniform3iv(this.dimensionsId, this.dimensions);
          this.kernel.setUniform2iv(this.sizeId, this.textureSize);
          super.updateValue(value2);
        }
      }
      module2.exports = {
        WebGL2KernelValueDynamicSingleArray2DI
      };
    }, { "../../../utils": 114, "../../web-gl2/kernel-value/single-array2d-i": 100 }], 87: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGL2KernelValueSingleArray3DI } = require2("../../web-gl2/kernel-value/single-array3d-i");
      class WebGL2KernelValueDynamicSingleArray3DI extends WebGL2KernelValueSingleArray3DI {
        getSource() {
          const variablePrecision = this.getVariablePrecisionString();
          return utils.linesToString([
            `uniform ${variablePrecision} sampler2D ${this.id}`,
            `uniform ${variablePrecision} ivec2 ${this.sizeId}`,
            `uniform ${variablePrecision} ivec3 ${this.dimensionsId}`
          ]);
        }
        updateValue(value2) {
          this.setShape(value2);
          this.kernel.setUniform3iv(this.dimensionsId, this.dimensions);
          this.kernel.setUniform2iv(this.sizeId, this.textureSize);
          super.updateValue(value2);
        }
      }
      module2.exports = {
        WebGL2KernelValueDynamicSingleArray3DI
      };
    }, { "../../../utils": 114, "../../web-gl2/kernel-value/single-array3d-i": 101 }], 88: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGL2KernelValueSingleInput } = require2("../../web-gl2/kernel-value/single-input");
      class WebGL2KernelValueDynamicSingleInput extends WebGL2KernelValueSingleInput {
        getSource() {
          const variablePrecision = this.getVariablePrecisionString();
          return utils.linesToString([
            `uniform ${variablePrecision} sampler2D ${this.id}`,
            `uniform ${variablePrecision} ivec2 ${this.sizeId}`,
            `uniform ${variablePrecision} ivec3 ${this.dimensionsId}`
          ]);
        }
        updateValue(value2) {
          let [w, h, d] = value2.size;
          this.dimensions = new Int32Array([w || 1, h || 1, d || 1]);
          this.textureSize = utils.getMemoryOptimizedFloatTextureSize(this.dimensions, this.bitRatio);
          this.uploadArrayLength = this.textureSize[0] * this.textureSize[1] * this.bitRatio;
          this.checkSize(this.textureSize[0], this.textureSize[1]);
          this.uploadValue = new Float32Array(this.uploadArrayLength);
          this.kernel.setUniform3iv(this.dimensionsId, this.dimensions);
          this.kernel.setUniform2iv(this.sizeId, this.textureSize);
          super.updateValue(value2);
        }
      }
      module2.exports = {
        WebGL2KernelValueDynamicSingleInput
      };
    }, { "../../../utils": 114, "../../web-gl2/kernel-value/single-input": 102 }], 89: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueDynamicUnsignedArray } = require2("../../web-gl/kernel-value/dynamic-unsigned-array");
      class WebGL2KernelValueDynamicUnsignedArray extends WebGLKernelValueDynamicUnsignedArray {
        getSource() {
          const variablePrecision = this.getVariablePrecisionString();
          return utils.linesToString([
            `uniform ${variablePrecision} sampler2D ${this.id}`,
            `uniform ${variablePrecision} ivec2 ${this.sizeId}`,
            `uniform ${variablePrecision} ivec3 ${this.dimensionsId}`
          ]);
        }
      }
      module2.exports = {
        WebGL2KernelValueDynamicUnsignedArray
      };
    }, { "../../../utils": 114, "../../web-gl/kernel-value/dynamic-unsigned-array": 54 }], 90: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueDynamicUnsignedInput } = require2("../../web-gl/kernel-value/dynamic-unsigned-input");
      class WebGL2KernelValueDynamicUnsignedInput extends WebGLKernelValueDynamicUnsignedInput {
        getSource() {
          const variablePrecision = this.getVariablePrecisionString();
          return utils.linesToString([
            `uniform ${variablePrecision} sampler2D ${this.id}`,
            `uniform ${variablePrecision} ivec2 ${this.sizeId}`,
            `uniform ${variablePrecision} ivec3 ${this.dimensionsId}`
          ]);
        }
      }
      module2.exports = {
        WebGL2KernelValueDynamicUnsignedInput
      };
    }, { "../../../utils": 114, "../../web-gl/kernel-value/dynamic-unsigned-input": 55 }], 91: [function(require2, module2, exports2) {
      require2("../../../utils");
      const { WebGLKernelValueFloat } = require2("../../web-gl/kernel-value/float");
      class WebGL2KernelValueFloat extends WebGLKernelValueFloat {
      }
      module2.exports = {
        WebGL2KernelValueFloat
      };
    }, { "../../../utils": 114, "../../web-gl/kernel-value/float": 56 }], 92: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelArray } = require2("../../web-gl/kernel-value/array");
      class WebGL2KernelValueHTMLImageArray extends WebGLKernelArray {
        constructor(value2, settings) {
          super(value2, settings);
          this.checkSize(value2[0].width, value2[0].height);
          this.dimensions = [value2[0].width, value2[0].height, value2.length];
          this.textureSize = [value2[0].width, value2[0].height];
        }
        defineTexture() {
          const { context: gl } = this;
          gl.activeTexture(this.contextHandle);
          gl.bindTexture(gl.TEXTURE_2D_ARRAY, this.texture);
          gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        }
        getStringValueHandler() {
          return `const uploadValue_${this.name} = ${this.varName};
`;
        }
        getSource() {
          const variablePrecision = this.getVariablePrecisionString();
          return utils.linesToString([
            `uniform ${variablePrecision} sampler2DArray ${this.id}`,
            `${variablePrecision} ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,
            `${variablePrecision} ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`
          ]);
        }
        updateValue(images) {
          const { context: gl } = this;
          gl.activeTexture(this.contextHandle);
          gl.bindTexture(gl.TEXTURE_2D_ARRAY, this.texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
          gl.texImage3D(gl.TEXTURE_2D_ARRAY, 0, gl.RGBA, images[0].width, images[0].height, images.length, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
          for (let i = 0; i < images.length; i++) {
            const xOffset = 0;
            const yOffset = 0;
            const imageDepth = 1;
            gl.texSubImage3D(gl.TEXTURE_2D_ARRAY, 0, xOffset, yOffset, i, images[i].width, images[i].height, imageDepth, gl.RGBA, gl.UNSIGNED_BYTE, this.uploadValue = images[i]);
          }
          this.kernel.setUniform1i(this.id, this.index);
        }
      }
      module2.exports = {
        WebGL2KernelValueHTMLImageArray
      };
    }, { "../../../utils": 114, "../../web-gl/kernel-value/array": 40 }], 93: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueHTMLImage } = require2("../../web-gl/kernel-value/html-image");
      class WebGL2KernelValueHTMLImage extends WebGLKernelValueHTMLImage {
        getSource() {
          const variablePrecision = this.getVariablePrecisionString();
          return utils.linesToString([
            `uniform ${variablePrecision} sampler2D ${this.id}`,
            `${variablePrecision} ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,
            `${variablePrecision} ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`
          ]);
        }
      }
      module2.exports = {
        WebGL2KernelValueHTMLImage
      };
    }, { "../../../utils": 114, "../../web-gl/kernel-value/html-image": 57 }], 94: [function(require2, module2, exports2) {
      require2("../../../utils");
      const { WebGL2KernelValueHTMLImage } = require2("./html-image");
      class WebGL2KernelValueHTMLVideo extends WebGL2KernelValueHTMLImage {
      }
      module2.exports = {
        WebGL2KernelValueHTMLVideo
      };
    }, { "../../../utils": 114, "./html-image": 93 }], 95: [function(require2, module2, exports2) {
      const { WebGLKernelValueInteger } = require2("../../web-gl/kernel-value/integer");
      class WebGL2KernelValueInteger extends WebGLKernelValueInteger {
        getSource(value2) {
          const variablePrecision = this.getVariablePrecisionString();
          if (this.origin === "constants") {
            return `const ${variablePrecision} int ${this.id} = ${parseInt(value2)};
`;
          }
          return `uniform ${variablePrecision} int ${this.id};
`;
        }
        updateValue(value2) {
          if (this.origin === "constants")
            return;
          this.kernel.setUniform1i(this.id, this.uploadValue = value2);
        }
      }
      module2.exports = {
        WebGL2KernelValueInteger
      };
    }, { "../../web-gl/kernel-value/integer": 60 }], 96: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueMemoryOptimizedNumberTexture } = require2("../../web-gl/kernel-value/memory-optimized-number-texture");
      class WebGL2KernelValueMemoryOptimizedNumberTexture extends WebGLKernelValueMemoryOptimizedNumberTexture {
        getSource() {
          const { id, sizeId, textureSize, dimensionsId, dimensions } = this;
          const variablePrecision = this.getVariablePrecisionString();
          return utils.linesToString([
            `uniform sampler2D ${id}`,
            `${variablePrecision} ivec2 ${sizeId} = ivec2(${textureSize[0]}, ${textureSize[1]})`,
            `${variablePrecision} ivec3 ${dimensionsId} = ivec3(${dimensions[0]}, ${dimensions[1]}, ${dimensions[2]})`
          ]);
        }
      }
      module2.exports = {
        WebGL2KernelValueMemoryOptimizedNumberTexture
      };
    }, { "../../../utils": 114, "../../web-gl/kernel-value/memory-optimized-number-texture": 61 }], 97: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueNumberTexture } = require2("../../web-gl/kernel-value/number-texture");
      class WebGL2KernelValueNumberTexture extends WebGLKernelValueNumberTexture {
        getSource() {
          const { id, sizeId, textureSize, dimensionsId, dimensions } = this;
          const variablePrecision = this.getVariablePrecisionString();
          return utils.linesToString([
            `uniform ${variablePrecision} sampler2D ${id}`,
            `${variablePrecision} ivec2 ${sizeId} = ivec2(${textureSize[0]}, ${textureSize[1]})`,
            `${variablePrecision} ivec3 ${dimensionsId} = ivec3(${dimensions[0]}, ${dimensions[1]}, ${dimensions[2]})`
          ]);
        }
      }
      module2.exports = {
        WebGL2KernelValueNumberTexture
      };
    }, { "../../../utils": 114, "../../web-gl/kernel-value/number-texture": 62 }], 98: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueSingleArray } = require2("../../web-gl/kernel-value/single-array");
      class WebGL2KernelValueSingleArray extends WebGLKernelValueSingleArray {
        getSource() {
          const variablePrecision = this.getVariablePrecisionString();
          return utils.linesToString([
            `uniform ${variablePrecision} sampler2D ${this.id}`,
            `${variablePrecision} ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,
            `${variablePrecision} ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`
          ]);
        }
        updateValue(value2) {
          if (value2.constructor !== this.initialValueConstructor) {
            this.onUpdateValueMismatch(value2.constructor);
            return;
          }
          const { context: gl } = this;
          utils.flattenTo(value2, this.uploadValue);
          gl.activeTexture(this.contextHandle);
          gl.bindTexture(gl.TEXTURE_2D, this.texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, this.textureSize[0], this.textureSize[1], 0, gl.RGBA, gl.FLOAT, this.uploadValue);
          this.kernel.setUniform1i(this.id, this.index);
        }
      }
      module2.exports = {
        WebGL2KernelValueSingleArray
      };
    }, { "../../../utils": 114, "../../web-gl/kernel-value/single-array": 63 }], 99: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueSingleArray1DI } = require2("../../web-gl/kernel-value/single-array1d-i");
      class WebGL2KernelValueSingleArray1DI extends WebGLKernelValueSingleArray1DI {
        updateValue(value2) {
          if (value2.constructor !== this.initialValueConstructor) {
            this.onUpdateValueMismatch(value2.constructor);
            return;
          }
          const { context: gl } = this;
          utils.flattenTo(value2, this.uploadValue);
          gl.activeTexture(this.contextHandle);
          gl.bindTexture(gl.TEXTURE_2D, this.texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, this.textureSize[0], this.textureSize[1], 0, gl.RGBA, gl.FLOAT, this.uploadValue);
          this.kernel.setUniform1i(this.id, this.index);
        }
      }
      module2.exports = {
        WebGL2KernelValueSingleArray1DI
      };
    }, { "../../../utils": 114, "../../web-gl/kernel-value/single-array1d-i": 64 }], 100: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueSingleArray2DI } = require2("../../web-gl/kernel-value/single-array2d-i");
      class WebGL2KernelValueSingleArray2DI extends WebGLKernelValueSingleArray2DI {
        updateValue(value2) {
          if (value2.constructor !== this.initialValueConstructor) {
            this.onUpdateValueMismatch(value2.constructor);
            return;
          }
          const { context: gl } = this;
          utils.flattenTo(value2, this.uploadValue);
          gl.activeTexture(this.contextHandle);
          gl.bindTexture(gl.TEXTURE_2D, this.texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, this.textureSize[0], this.textureSize[1], 0, gl.RGBA, gl.FLOAT, this.uploadValue);
          this.kernel.setUniform1i(this.id, this.index);
        }
      }
      module2.exports = {
        WebGL2KernelValueSingleArray2DI
      };
    }, { "../../../utils": 114, "../../web-gl/kernel-value/single-array2d-i": 65 }], 101: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueSingleArray3DI } = require2("../../web-gl/kernel-value/single-array3d-i");
      class WebGL2KernelValueSingleArray3DI extends WebGLKernelValueSingleArray3DI {
        updateValue(value2) {
          if (value2.constructor !== this.initialValueConstructor) {
            this.onUpdateValueMismatch(value2.constructor);
            return;
          }
          const { context: gl } = this;
          utils.flattenTo(value2, this.uploadValue);
          gl.activeTexture(this.contextHandle);
          gl.bindTexture(gl.TEXTURE_2D, this.texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, this.textureSize[0], this.textureSize[1], 0, gl.RGBA, gl.FLOAT, this.uploadValue);
          this.kernel.setUniform1i(this.id, this.index);
        }
      }
      module2.exports = {
        WebGL2KernelValueSingleArray3DI
      };
    }, { "../../../utils": 114, "../../web-gl/kernel-value/single-array3d-i": 66 }], 102: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueSingleInput } = require2("../../web-gl/kernel-value/single-input");
      class WebGL2KernelValueSingleInput extends WebGLKernelValueSingleInput {
        getSource() {
          const variablePrecision = this.getVariablePrecisionString();
          return utils.linesToString([
            `uniform ${variablePrecision} sampler2D ${this.id}`,
            `${variablePrecision} ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,
            `${variablePrecision} ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`
          ]);
        }
        updateValue(input) {
          const { context: gl } = this;
          utils.flattenTo(input.value, this.uploadValue);
          gl.activeTexture(this.contextHandle);
          gl.bindTexture(gl.TEXTURE_2D, this.texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, this.textureSize[0], this.textureSize[1], 0, gl.RGBA, gl.FLOAT, this.uploadValue);
          this.kernel.setUniform1i(this.id, this.index);
        }
      }
      module2.exports = {
        WebGL2KernelValueSingleInput
      };
    }, { "../../../utils": 114, "../../web-gl/kernel-value/single-input": 67 }], 103: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueUnsignedArray } = require2("../../web-gl/kernel-value/unsigned-array");
      class WebGL2KernelValueUnsignedArray extends WebGLKernelValueUnsignedArray {
        getSource() {
          const variablePrecision = this.getVariablePrecisionString();
          return utils.linesToString([
            `uniform ${variablePrecision} sampler2D ${this.id}`,
            `${variablePrecision} ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,
            `${variablePrecision} ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`
          ]);
        }
      }
      module2.exports = {
        WebGL2KernelValueUnsignedArray
      };
    }, { "../../../utils": 114, "../../web-gl/kernel-value/unsigned-array": 68 }], 104: [function(require2, module2, exports2) {
      const { utils } = require2("../../../utils");
      const { WebGLKernelValueUnsignedInput } = require2("../../web-gl/kernel-value/unsigned-input");
      class WebGL2KernelValueUnsignedInput extends WebGLKernelValueUnsignedInput {
        getSource() {
          const variablePrecision = this.getVariablePrecisionString();
          return utils.linesToString([
            `uniform ${variablePrecision} sampler2D ${this.id}`,
            `${variablePrecision} ivec2 ${this.sizeId} = ivec2(${this.textureSize[0]}, ${this.textureSize[1]})`,
            `${variablePrecision} ivec3 ${this.dimensionsId} = ivec3(${this.dimensions[0]}, ${this.dimensions[1]}, ${this.dimensions[2]})`
          ]);
        }
      }
      module2.exports = {
        WebGL2KernelValueUnsignedInput
      };
    }, { "../../../utils": 114, "../../web-gl/kernel-value/unsigned-input": 69 }], 105: [function(require2, module2, exports2) {
      const { WebGLKernel } = require2("../web-gl/kernel");
      const { WebGL2FunctionNode } = require2("./function-node");
      const { FunctionBuilder } = require2("../function-builder");
      const { utils } = require2("../../utils");
      const { fragmentShader } = require2("./fragment-shader");
      const { vertexShader } = require2("./vertex-shader");
      const { lookupKernelValueType } = require2("./kernel-value-maps");
      let isSupported = null;
      let testCanvas = null;
      let testContext = null;
      let features = null;
      class WebGL2Kernel extends WebGLKernel {
        static get isSupported() {
          if (isSupported !== null) {
            return isSupported;
          }
          this.setupFeatureChecks();
          isSupported = this.isContextMatch(testContext);
          return isSupported;
        }
        static setupFeatureChecks() {
          if (typeof document !== "undefined") {
            testCanvas = document.createElement("canvas");
          } else if (typeof OffscreenCanvas !== "undefined") {
            testCanvas = new OffscreenCanvas(0, 0);
          }
          if (!testCanvas)
            return;
          testContext = testCanvas.getContext("webgl2");
          if (!testContext || !testContext.getExtension)
            return;
          ({
            EXT_color_buffer_float: testContext.getExtension("EXT_color_buffer_float"),
            OES_texture_float_linear: testContext.getExtension("OES_texture_float_linear")
          });
          features = this.getFeatures();
        }
        static isContextMatch(context) {
          if (typeof WebGL2RenderingContext !== "undefined") {
            return context instanceof WebGL2RenderingContext;
          }
          return false;
        }
        static getFeatures() {
          const gl = this.testContext;
          return Object.freeze({
            isFloatRead: this.getIsFloatRead(),
            isIntegerDivisionAccurate: this.getIsIntegerDivisionAccurate(),
            isSpeedTacticSupported: this.getIsSpeedTacticSupported(),
            kernelMap: true,
            isTextureFloat: true,
            isDrawBuffers: true,
            channelCount: this.getChannelCount(),
            maxTextureSize: this.getMaxTextureSize(),
            lowIntPrecision: gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_INT),
            lowFloatPrecision: gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.LOW_FLOAT),
            mediumIntPrecision: gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_INT),
            mediumFloatPrecision: gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT),
            highIntPrecision: gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT),
            highFloatPrecision: gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT)
          });
        }
        static getIsTextureFloat() {
          return true;
        }
        static getChannelCount() {
          return testContext.getParameter(testContext.MAX_DRAW_BUFFERS);
        }
        static getMaxTextureSize() {
          return testContext.getParameter(testContext.MAX_TEXTURE_SIZE);
        }
        static lookupKernelValueType(type, dynamic, precision, value2) {
          return lookupKernelValueType(type, dynamic, precision, value2);
        }
        static get testCanvas() {
          return testCanvas;
        }
        static get testContext() {
          return testContext;
        }
        static get features() {
          return features;
        }
        static get fragmentShader() {
          return fragmentShader;
        }
        static get vertexShader() {
          return vertexShader;
        }
        initContext() {
          const settings = {
            alpha: false,
            depth: false,
            antialias: false
          };
          return this.canvas.getContext("webgl2", settings);
        }
        initExtensions() {
          this.extensions = {
            EXT_color_buffer_float: this.context.getExtension("EXT_color_buffer_float"),
            OES_texture_float_linear: this.context.getExtension("OES_texture_float_linear")
          };
        }
        validateSettings(args) {
          if (!this.validate) {
            this.texSize = utils.getKernelTextureSize({
              optimizeFloatMemory: this.optimizeFloatMemory,
              precision: this.precision
            }, this.output);
            return;
          }
          const { features: features2 } = this.constructor;
          if (this.precision === "single" && !features2.isFloatRead) {
            throw new Error("Float texture outputs are not supported");
          } else if (!this.graphical && this.precision === null) {
            this.precision = features2.isFloatRead ? "single" : "unsigned";
          }
          if (this.fixIntegerDivisionAccuracy === null) {
            this.fixIntegerDivisionAccuracy = !features2.isIntegerDivisionAccurate;
          } else if (this.fixIntegerDivisionAccuracy && features2.isIntegerDivisionAccurate) {
            this.fixIntegerDivisionAccuracy = false;
          }
          this.checkOutput();
          if (!this.output || this.output.length === 0) {
            if (args.length !== 1) {
              throw new Error("Auto output only supported for kernels with only one input");
            }
            const argType = utils.getVariableType(args[0], this.strictIntegers);
            switch (argType) {
              case "Array":
                this.output = utils.getDimensions(argType);
                break;
              case "NumberTexture":
              case "MemoryOptimizedNumberTexture":
              case "ArrayTexture(1)":
              case "ArrayTexture(2)":
              case "ArrayTexture(3)":
              case "ArrayTexture(4)":
                this.output = args[0].output;
                break;
              default:
                throw new Error("Auto output not supported for input type: " + argType);
            }
          }
          if (this.graphical) {
            if (this.output.length !== 2) {
              throw new Error("Output must have 2 dimensions on graphical mode");
            }
            if (this.precision === "single") {
              console.warn("Cannot use graphical mode and single precision at the same time");
              this.precision = "unsigned";
            }
            this.texSize = utils.clone(this.output);
            return;
          } else if (!this.graphical && this.precision === null && features2.isTextureFloat) {
            this.precision = "single";
          }
          this.texSize = utils.getKernelTextureSize({
            optimizeFloatMemory: this.optimizeFloatMemory,
            precision: this.precision
          }, this.output);
          this.checkTextureSize();
        }
        translateSource() {
          const functionBuilder = FunctionBuilder.fromKernel(this, WebGL2FunctionNode, {
            fixIntegerDivisionAccuracy: this.fixIntegerDivisionAccuracy
          });
          this.translatedSource = functionBuilder.getPrototypeString("kernel");
          this.setupReturnTypes(functionBuilder);
        }
        drawBuffers() {
          this.context.drawBuffers(this.drawBuffersMap);
        }
        getTextureFormat() {
          const { context: gl } = this;
          switch (this.getInternalFormat()) {
            case gl.R32F:
              return gl.RED;
            case gl.RG32F:
              return gl.RG;
            case gl.RGBA32F:
              return gl.RGBA;
            case gl.RGBA:
              return gl.RGBA;
            default:
              throw new Error("Unknown internal format");
          }
        }
        getInternalFormat() {
          const { context: gl } = this;
          if (this.precision === "single") {
            if (this.pipeline) {
              switch (this.returnType) {
                case "Number":
                case "Float":
                case "Integer":
                  if (this.optimizeFloatMemory) {
                    return gl.RGBA32F;
                  } else {
                    return gl.R32F;
                  }
                case "Array(2)":
                  return gl.RG32F;
                case "Array(3)":
                case "Array(4)":
                  return gl.RGBA32F;
                default:
                  throw new Error("Unhandled return type");
              }
            }
            return gl.RGBA32F;
          }
          return gl.RGBA;
        }
        _setupOutputTexture() {
          const gl = this.context;
          if (this.texture) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture.texture, 0);
            return;
          }
          gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
          const texture = gl.createTexture();
          const texSize = this.texSize;
          gl.activeTexture(gl.TEXTURE0 + this.constantTextureCount + this.argumentTextureCount);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
          const format = this.getInternalFormat();
          if (this.precision === "single") {
            gl.texStorage2D(gl.TEXTURE_2D, 1, format, texSize[0], texSize[1]);
          } else {
            gl.texImage2D(gl.TEXTURE_2D, 0, format, texSize[0], texSize[1], 0, format, gl.UNSIGNED_BYTE, null);
          }
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
          this.texture = new this.TextureConstructor({
            texture,
            size: texSize,
            dimensions: this.threadDim,
            output: this.output,
            context: this.context,
            internalFormat: this.getInternalFormat(),
            textureFormat: this.getTextureFormat(),
            kernel: this
          });
        }
        _setupSubOutputTextures() {
          const gl = this.context;
          if (this.mappedTextures) {
            for (let i = 0; i < this.subKernels.length; i++) {
              gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i + 1, gl.TEXTURE_2D, this.mappedTextures[i].texture, 0);
            }
            return;
          }
          const texSize = this.texSize;
          this.drawBuffersMap = [gl.COLOR_ATTACHMENT0];
          this.mappedTextures = [];
          for (let i = 0; i < this.subKernels.length; i++) {
            const texture = this.createTexture();
            this.drawBuffersMap.push(gl.COLOR_ATTACHMENT0 + i + 1);
            gl.activeTexture(gl.TEXTURE0 + this.constantTextureCount + this.argumentTextureCount + i);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            const format = this.getInternalFormat();
            if (this.precision === "single") {
              gl.texStorage2D(gl.TEXTURE_2D, 1, format, texSize[0], texSize[1]);
            } else {
              gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texSize[0], texSize[1], 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
            }
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i + 1, gl.TEXTURE_2D, texture, 0);
            this.mappedTextures.push(new this.TextureConstructor({
              texture,
              size: texSize,
              dimensions: this.threadDim,
              output: this.output,
              context: this.context,
              internalFormat: this.getInternalFormat(),
              textureFormat: this.getTextureFormat(),
              kernel: this
            }));
          }
        }
        _getHeaderString() {
          return "";
        }
        _getTextureCoordinate() {
          const subKernels = this.subKernels;
          const variablePrecision = this.getVariablePrecisionString(this.texSize, this.tactic);
          if (subKernels === null || subKernels.length < 1) {
            return `in ${variablePrecision} vec2 vTexCoord;
`;
          } else {
            return `out ${variablePrecision} vec2 vTexCoord;
`;
          }
        }
        _getMainArgumentsString(args) {
          const result = [];
          const argumentNames = this.argumentNames;
          for (let i = 0; i < argumentNames.length; i++) {
            result.push(this.kernelArguments[i].getSource(args[i]));
          }
          return result.join("");
        }
        getKernelString() {
          const result = [this.getKernelResultDeclaration()];
          const subKernels = this.subKernels;
          if (subKernels !== null) {
            result.push("layout(location = 0) out vec4 data0");
            switch (this.returnType) {
              case "Number":
              case "Float":
              case "Integer":
                for (let i = 0; i < subKernels.length; i++) {
                  const subKernel = subKernels[i];
                  result.push(subKernel.returnType === "Integer" ? `int subKernelResult_${subKernel.name} = 0` : `float subKernelResult_${subKernel.name} = 0.0`, `layout(location = ${i + 1}) out vec4 data${i + 1}`);
                }
                break;
              case "Array(2)":
                for (let i = 0; i < subKernels.length; i++) {
                  result.push(`vec2 subKernelResult_${subKernels[i].name}`, `layout(location = ${i + 1}) out vec4 data${i + 1}`);
                }
                break;
              case "Array(3)":
                for (let i = 0; i < subKernels.length; i++) {
                  result.push(`vec3 subKernelResult_${subKernels[i].name}`, `layout(location = ${i + 1}) out vec4 data${i + 1}`);
                }
                break;
              case "Array(4)":
                for (let i = 0; i < subKernels.length; i++) {
                  result.push(`vec4 subKernelResult_${subKernels[i].name}`, `layout(location = ${i + 1}) out vec4 data${i + 1}`);
                }
                break;
            }
          } else {
            result.push("out vec4 data0");
          }
          return utils.linesToString(result) + this.translatedSource;
        }
        getMainResultGraphical() {
          return utils.linesToString([
            "  threadId = indexTo3D(index, uOutputDim)",
            "  kernel()",
            "  data0 = actualColor"
          ]);
        }
        getMainResultPackedPixels() {
          switch (this.returnType) {
            case "LiteralInteger":
            case "Number":
            case "Integer":
            case "Float":
              return this.getMainResultKernelPackedPixels() + this.getMainResultSubKernelPackedPixels();
            default:
              throw new Error(`packed output only usable with Numbers, "${this.returnType}" specified`);
          }
        }
        getMainResultKernelPackedPixels() {
          return utils.linesToString([
            "  threadId = indexTo3D(index, uOutputDim)",
            "  kernel()",
            `  data0 = ${this.useLegacyEncoder ? "legacyEncode32" : "encode32"}(kernelResult)`
          ]);
        }
        getMainResultSubKernelPackedPixels() {
          const result = [];
          if (!this.subKernels)
            return "";
          for (let i = 0; i < this.subKernels.length; i++) {
            const subKernel = this.subKernels[i];
            if (subKernel.returnType === "Integer") {
              result.push(`  data${i + 1} = ${this.useLegacyEncoder ? "legacyEncode32" : "encode32"}(float(subKernelResult_${this.subKernels[i].name}))`);
            } else {
              result.push(`  data${i + 1} = ${this.useLegacyEncoder ? "legacyEncode32" : "encode32"}(subKernelResult_${this.subKernels[i].name})`);
            }
          }
          return utils.linesToString(result);
        }
        getMainResultKernelMemoryOptimizedFloats(result, channel) {
          result.push("  threadId = indexTo3D(index, uOutputDim)", "  kernel()", `  data0.${channel} = kernelResult`);
        }
        getMainResultSubKernelMemoryOptimizedFloats(result, channel) {
          if (!this.subKernels)
            return result;
          for (let i = 0; i < this.subKernels.length; i++) {
            const subKernel = this.subKernels[i];
            if (subKernel.returnType === "Integer") {
              result.push(`  data${i + 1}.${channel} = float(subKernelResult_${subKernel.name})`);
            } else {
              result.push(`  data${i + 1}.${channel} = subKernelResult_${subKernel.name}`);
            }
          }
        }
        getMainResultKernelNumberTexture() {
          return [
            "  threadId = indexTo3D(index, uOutputDim)",
            "  kernel()",
            "  data0[0] = kernelResult"
          ];
        }
        getMainResultSubKernelNumberTexture() {
          const result = [];
          if (!this.subKernels)
            return result;
          for (let i = 0; i < this.subKernels.length; ++i) {
            const subKernel = this.subKernels[i];
            if (subKernel.returnType === "Integer") {
              result.push(`  data${i + 1}[0] = float(subKernelResult_${subKernel.name})`);
            } else {
              result.push(`  data${i + 1}[0] = subKernelResult_${subKernel.name}`);
            }
          }
          return result;
        }
        getMainResultKernelArray2Texture() {
          return [
            "  threadId = indexTo3D(index, uOutputDim)",
            "  kernel()",
            "  data0[0] = kernelResult[0]",
            "  data0[1] = kernelResult[1]"
          ];
        }
        getMainResultSubKernelArray2Texture() {
          const result = [];
          if (!this.subKernels)
            return result;
          for (let i = 0; i < this.subKernels.length; ++i) {
            const subKernel = this.subKernels[i];
            result.push(`  data${i + 1}[0] = subKernelResult_${subKernel.name}[0]`, `  data${i + 1}[1] = subKernelResult_${subKernel.name}[1]`);
          }
          return result;
        }
        getMainResultKernelArray3Texture() {
          return [
            "  threadId = indexTo3D(index, uOutputDim)",
            "  kernel()",
            "  data0[0] = kernelResult[0]",
            "  data0[1] = kernelResult[1]",
            "  data0[2] = kernelResult[2]"
          ];
        }
        getMainResultSubKernelArray3Texture() {
          const result = [];
          if (!this.subKernels)
            return result;
          for (let i = 0; i < this.subKernels.length; ++i) {
            const subKernel = this.subKernels[i];
            result.push(`  data${i + 1}[0] = subKernelResult_${subKernel.name}[0]`, `  data${i + 1}[1] = subKernelResult_${subKernel.name}[1]`, `  data${i + 1}[2] = subKernelResult_${subKernel.name}[2]`);
          }
          return result;
        }
        getMainResultKernelArray4Texture() {
          return [
            "  threadId = indexTo3D(index, uOutputDim)",
            "  kernel()",
            "  data0 = kernelResult"
          ];
        }
        getMainResultSubKernelArray4Texture() {
          const result = [];
          if (!this.subKernels)
            return result;
          for (let i = 0; i < this.subKernels.length; ++i) {
            result.push(`  data${i + 1} = subKernelResult_${this.subKernels[i].name}`);
          }
          return result;
        }
        destroyExtensions() {
          this.extensions.EXT_color_buffer_float = null;
          this.extensions.OES_texture_float_linear = null;
        }
        toJSON() {
          const json = super.toJSON();
          json.functionNodes = FunctionBuilder.fromKernel(this, WebGL2FunctionNode).toJSON();
          json.settings.threadDim = this.threadDim;
          return json;
        }
      }
      module2.exports = {
        WebGL2Kernel
      };
    }, { "../../utils": 114, "../function-builder": 9, "../web-gl/kernel": 70, "./fragment-shader": 72, "./function-node": 73, "./kernel-value-maps": 74, "./vertex-shader": 106 }], 106: [function(require2, module2, exports2) {
      const vertexShader = `#version 300 es
__FLOAT_TACTIC_DECLARATION__;
__INT_TACTIC_DECLARATION__;
__SAMPLER_2D_TACTIC_DECLARATION__;

in vec2 aPos;
in vec2 aTexCoord;

out vec2 vTexCoord;
uniform vec2 ratio;

void main(void) {
  gl_Position = vec4((aPos + vec2(1)) * ratio + vec2(-1), 0, 1);
  vTexCoord = aTexCoord;
}`;
      module2.exports = {
        vertexShader
      };
    }, {}], 107: [function(require2, module2, exports2) {
      const lib = require2("./index");
      const GPU = lib.GPU;
      for (const p2 in lib) {
        if (!lib.hasOwnProperty(p2))
          continue;
        if (p2 === "GPU")
          continue;
        GPU[p2] = lib[p2];
      }
      if (typeof window !== "undefined") {
        bindTo(window);
      }
      if (typeof self !== "undefined") {
        bindTo(self);
      }
      function bindTo(target2) {
        if (target2.GPU)
          return;
        Object.defineProperty(target2, "GPU", {
          get() {
            return GPU;
          }
        });
      }
      module2.exports = lib;
    }, { "./index": 109 }], 108: [function(require2, module2, exports2) {
      const { gpuMock } = require2("gpu-mock.js");
      const { utils } = require2("./utils");
      require2("./backend/kernel");
      const { CPUKernel } = require2("./backend/cpu/kernel");
      const { HeadlessGLKernel } = require2("./backend/headless-gl/kernel");
      const { WebGL2Kernel } = require2("./backend/web-gl2/kernel");
      const { WebGLKernel } = require2("./backend/web-gl/kernel");
      const { kernelRunShortcut } = require2("./kernel-run-shortcut");
      const kernelOrder = [HeadlessGLKernel, WebGL2Kernel, WebGLKernel];
      const kernelTypes = ["gpu", "cpu"];
      const internalKernels = {
        "headlessgl": HeadlessGLKernel,
        "webgl2": WebGL2Kernel,
        "webgl": WebGLKernel
      };
      let validate = true;
      class GPU {
        static disableValidation() {
          validate = false;
        }
        static enableValidation() {
          validate = true;
        }
        static get isGPUSupported() {
          return kernelOrder.some((Kernel) => Kernel.isSupported);
        }
        static get isKernelMapSupported() {
          return kernelOrder.some((Kernel) => Kernel.isSupported && Kernel.features.kernelMap);
        }
        static get isOffscreenCanvasSupported() {
          return typeof Worker !== "undefined" && typeof OffscreenCanvas !== "undefined" || typeof importScripts !== "undefined";
        }
        static get isWebGLSupported() {
          return WebGLKernel.isSupported;
        }
        static get isWebGL2Supported() {
          return WebGL2Kernel.isSupported;
        }
        static get isHeadlessGLSupported() {
          return HeadlessGLKernel.isSupported;
        }
        static get isCanvasSupported() {
          return typeof HTMLCanvasElement !== "undefined";
        }
        static get isGPUHTMLImageArraySupported() {
          return WebGL2Kernel.isSupported;
        }
        static get isSinglePrecisionSupported() {
          return kernelOrder.some((Kernel) => Kernel.isSupported && Kernel.features.isFloatRead && Kernel.features.isTextureFloat);
        }
        constructor(settings) {
          settings = settings || {};
          this.canvas = settings.canvas || null;
          this.context = settings.context || null;
          this.mode = settings.mode;
          this.Kernel = null;
          this.kernels = [];
          this.functions = [];
          this.nativeFunctions = [];
          this.injectedNative = null;
          if (this.mode === "dev")
            return;
          this.chooseKernel();
          if (settings.functions) {
            for (let i = 0; i < settings.functions.length; i++) {
              this.addFunction(settings.functions[i]);
            }
          }
          if (settings.nativeFunctions) {
            for (const p2 in settings.nativeFunctions) {
              if (!settings.nativeFunctions.hasOwnProperty(p2))
                continue;
              const s = settings.nativeFunctions[p2];
              const { name: name2, source } = s;
              this.addNativeFunction(name2, source, s);
            }
          }
        }
        chooseKernel() {
          if (this.Kernel)
            return;
          let Kernel = null;
          if (this.context) {
            for (let i = 0; i < kernelOrder.length; i++) {
              const ExternalKernel = kernelOrder[i];
              if (ExternalKernel.isContextMatch(this.context)) {
                if (!ExternalKernel.isSupported) {
                  throw new Error(`Kernel type ${ExternalKernel.name} not supported`);
                }
                Kernel = ExternalKernel;
                break;
              }
            }
            if (Kernel === null) {
              throw new Error("unknown Context");
            }
          } else if (this.mode) {
            if (this.mode in internalKernels) {
              if (!validate || internalKernels[this.mode].isSupported) {
                Kernel = internalKernels[this.mode];
              }
            } else if (this.mode === "gpu") {
              for (let i = 0; i < kernelOrder.length; i++) {
                if (kernelOrder[i].isSupported) {
                  Kernel = kernelOrder[i];
                  break;
                }
              }
            } else if (this.mode === "cpu") {
              Kernel = CPUKernel;
            }
            if (!Kernel) {
              throw new Error(`A requested mode of "${this.mode}" and is not supported`);
            }
          } else {
            for (let i = 0; i < kernelOrder.length; i++) {
              if (kernelOrder[i].isSupported) {
                Kernel = kernelOrder[i];
                break;
              }
            }
            if (!Kernel) {
              Kernel = CPUKernel;
            }
          }
          if (!this.mode) {
            this.mode = Kernel.mode;
          }
          this.Kernel = Kernel;
        }
        createKernel(source, settings) {
          if (typeof source === "undefined") {
            throw new Error("Missing source parameter");
          }
          if (typeof source !== "object" && !utils.isFunction(source) && typeof source !== "string") {
            throw new Error("source parameter not a function");
          }
          const kernels = this.kernels;
          if (this.mode === "dev") {
            const devKernel = gpuMock(source, upgradeDeprecatedCreateKernelSettings(settings));
            kernels.push(devKernel);
            return devKernel;
          }
          source = typeof source === "function" ? source.toString() : source;
          const switchableKernels = {};
          const settingsCopy = upgradeDeprecatedCreateKernelSettings(settings) || {};
          if (settings && typeof settings.argumentTypes === "object") {
            settingsCopy.argumentTypes = Object.keys(settings.argumentTypes).map((argumentName) => settings.argumentTypes[argumentName]);
          }
          function onRequestFallback(args) {
            console.warn("Falling back to CPU");
            const fallbackKernel = new CPUKernel(source, {
              argumentTypes: kernelRun.argumentTypes,
              constantTypes: kernelRun.constantTypes,
              graphical: kernelRun.graphical,
              loopMaxIterations: kernelRun.loopMaxIterations,
              constants: kernelRun.constants,
              dynamicOutput: kernelRun.dynamicOutput,
              dynamicArgument: kernelRun.dynamicArguments,
              output: kernelRun.output,
              precision: kernelRun.precision,
              pipeline: kernelRun.pipeline,
              immutable: kernelRun.immutable,
              optimizeFloatMemory: kernelRun.optimizeFloatMemory,
              fixIntegerDivisionAccuracy: kernelRun.fixIntegerDivisionAccuracy,
              functions: kernelRun.functions,
              nativeFunctions: kernelRun.nativeFunctions,
              injectedNative: kernelRun.injectedNative,
              subKernels: kernelRun.subKernels,
              strictIntegers: kernelRun.strictIntegers,
              debug: kernelRun.debug
            });
            fallbackKernel.build.apply(fallbackKernel, args);
            const result = fallbackKernel.run.apply(fallbackKernel, args);
            kernelRun.replaceKernel(fallbackKernel);
            return result;
          }
          function onRequestSwitchKernel(reasons, args, _kernel) {
            if (_kernel.debug) {
              console.warn("Switching kernels");
            }
            let newOutput = null;
            if (_kernel.signature && !switchableKernels[_kernel.signature]) {
              switchableKernels[_kernel.signature] = _kernel;
            }
            if (_kernel.dynamicOutput) {
              for (let i = reasons.length - 1; i >= 0; i--) {
                const reason = reasons[i];
                if (reason.type === "outputPrecisionMismatch") {
                  newOutput = reason.needed;
                }
              }
            }
            const Constructor = _kernel.constructor;
            const argumentTypes = Constructor.getArgumentTypes(_kernel, args);
            const signature = Constructor.getSignature(_kernel, argumentTypes);
            const existingKernel = switchableKernels[signature];
            if (existingKernel) {
              existingKernel.onActivate(_kernel);
              return existingKernel;
            }
            const newKernel = switchableKernels[signature] = new Constructor(source, {
              argumentTypes,
              constantTypes: _kernel.constantTypes,
              graphical: _kernel.graphical,
              loopMaxIterations: _kernel.loopMaxIterations,
              constants: _kernel.constants,
              dynamicOutput: _kernel.dynamicOutput,
              dynamicArgument: _kernel.dynamicArguments,
              context: _kernel.context,
              canvas: _kernel.canvas,
              output: newOutput || _kernel.output,
              precision: _kernel.precision,
              pipeline: _kernel.pipeline,
              immutable: _kernel.immutable,
              optimizeFloatMemory: _kernel.optimizeFloatMemory,
              fixIntegerDivisionAccuracy: _kernel.fixIntegerDivisionAccuracy,
              functions: _kernel.functions,
              nativeFunctions: _kernel.nativeFunctions,
              injectedNative: _kernel.injectedNative,
              subKernels: _kernel.subKernels,
              strictIntegers: _kernel.strictIntegers,
              debug: _kernel.debug,
              gpu: _kernel.gpu,
              validate,
              returnType: _kernel.returnType,
              tactic: _kernel.tactic,
              onRequestFallback,
              onRequestSwitchKernel,
              texture: _kernel.texture,
              mappedTextures: _kernel.mappedTextures,
              drawBuffersMap: _kernel.drawBuffersMap
            });
            newKernel.build.apply(newKernel, args);
            kernelRun.replaceKernel(newKernel);
            kernels.push(newKernel);
            return newKernel;
          }
          const mergedSettings = Object.assign({
            context: this.context,
            canvas: this.canvas,
            functions: this.functions,
            nativeFunctions: this.nativeFunctions,
            injectedNative: this.injectedNative,
            gpu: this,
            validate,
            onRequestFallback,
            onRequestSwitchKernel
          }, settingsCopy);
          const kernel = new this.Kernel(source, mergedSettings);
          const kernelRun = kernelRunShortcut(kernel);
          if (!this.canvas) {
            this.canvas = kernel.canvas;
          }
          if (!this.context) {
            this.context = kernel.context;
          }
          kernels.push(kernel);
          return kernelRun;
        }
        createKernelMap() {
          let fn;
          let settings;
          const argument2Type = typeof arguments[arguments.length - 2];
          if (argument2Type === "function" || argument2Type === "string") {
            fn = arguments[arguments.length - 2];
            settings = arguments[arguments.length - 1];
          } else {
            fn = arguments[arguments.length - 1];
          }
          if (this.mode !== "dev") {
            if (!this.Kernel.isSupported || !this.Kernel.features.kernelMap) {
              if (this.mode && kernelTypes.indexOf(this.mode) < 0) {
                throw new Error(`kernelMap not supported on ${this.Kernel.name}`);
              }
            }
          }
          const settingsCopy = upgradeDeprecatedCreateKernelSettings(settings);
          if (settings && typeof settings.argumentTypes === "object") {
            settingsCopy.argumentTypes = Object.keys(settings.argumentTypes).map((argumentName) => settings.argumentTypes[argumentName]);
          }
          if (Array.isArray(arguments[0])) {
            settingsCopy.subKernels = [];
            const functions = arguments[0];
            for (let i = 0; i < functions.length; i++) {
              const source = functions[i].toString();
              const name2 = utils.getFunctionNameFromString(source);
              settingsCopy.subKernels.push({
                name: name2,
                source,
                property: i
              });
            }
          } else {
            settingsCopy.subKernels = [];
            const functions = arguments[0];
            for (let p2 in functions) {
              if (!functions.hasOwnProperty(p2))
                continue;
              const source = functions[p2].toString();
              const name2 = utils.getFunctionNameFromString(source);
              settingsCopy.subKernels.push({
                name: name2 || p2,
                source,
                property: p2
              });
            }
          }
          return this.createKernel(fn, settingsCopy);
        }
        combineKernels() {
          const firstKernel = arguments[0];
          const combinedKernel = arguments[arguments.length - 1];
          if (firstKernel.kernel.constructor.mode === "cpu")
            return combinedKernel;
          const canvas = arguments[0].canvas;
          const context = arguments[0].context;
          const max = arguments.length - 1;
          for (let i = 0; i < max; i++) {
            arguments[i].setCanvas(canvas).setContext(context).setPipeline(true);
          }
          return function() {
            const texture = combinedKernel.apply(this, arguments);
            if (texture.toArray) {
              return texture.toArray();
            }
            return texture;
          };
        }
        setFunctions(functions) {
          this.functions = functions;
          return this;
        }
        setNativeFunctions(nativeFunctions) {
          this.nativeFunctions = nativeFunctions;
          return this;
        }
        addFunction(source, settings) {
          this.functions.push({ source, settings });
          return this;
        }
        addNativeFunction(name2, source, settings) {
          if (this.kernels.length > 0) {
            throw new Error('Cannot call "addNativeFunction" after "createKernels" has been called.');
          }
          this.nativeFunctions.push(Object.assign({ name: name2, source }, settings));
          return this;
        }
        injectNative(source) {
          this.injectedNative = source;
          return this;
        }
        destroy() {
          return new Promise((resolve, reject) => {
            if (!this.kernels) {
              resolve();
            }
            setTimeout(() => {
              try {
                for (let i = 0; i < this.kernels.length; i++) {
                  this.kernels[i].destroy(true);
                }
                let firstKernel = this.kernels[0];
                if (firstKernel) {
                  if (firstKernel.kernel) {
                    firstKernel = firstKernel.kernel;
                  }
                  if (firstKernel.constructor.destroyContext) {
                    firstKernel.constructor.destroyContext(this.context);
                  }
                }
              } catch (e) {
                reject(e);
              }
              resolve();
            }, 0);
          });
        }
      }
      function upgradeDeprecatedCreateKernelSettings(settings) {
        if (!settings) {
          return {};
        }
        const upgradedSettings = Object.assign({}, settings);
        if (settings.hasOwnProperty("floatOutput")) {
          utils.warnDeprecated("setting", "floatOutput", "precision");
          upgradedSettings.precision = settings.floatOutput ? "single" : "unsigned";
        }
        if (settings.hasOwnProperty("outputToTexture")) {
          utils.warnDeprecated("setting", "outputToTexture", "pipeline");
          upgradedSettings.pipeline = Boolean(settings.outputToTexture);
        }
        if (settings.hasOwnProperty("outputImmutable")) {
          utils.warnDeprecated("setting", "outputImmutable", "immutable");
          upgradedSettings.immutable = Boolean(settings.outputImmutable);
        }
        if (settings.hasOwnProperty("floatTextures")) {
          utils.warnDeprecated("setting", "floatTextures", "optimizeFloatMemory");
          upgradedSettings.optimizeFloatMemory = Boolean(settings.floatTextures);
        }
        return upgradedSettings;
      }
      module2.exports = {
        GPU,
        kernelOrder,
        kernelTypes
      };
    }, { "./backend/cpu/kernel": 8, "./backend/headless-gl/kernel": 34, "./backend/kernel": 36, "./backend/web-gl/kernel": 70, "./backend/web-gl2/kernel": 105, "./kernel-run-shortcut": 111, "./utils": 114, "gpu-mock.js": 4 }], 109: [function(require2, module2, exports2) {
      const { GPU } = require2("./gpu");
      const { alias } = require2("./alias");
      const { utils } = require2("./utils");
      const { Input, input } = require2("./input");
      const { Texture } = require2("./texture");
      const { FunctionBuilder } = require2("./backend/function-builder");
      const { FunctionNode } = require2("./backend/function-node");
      const { CPUFunctionNode } = require2("./backend/cpu/function-node");
      const { CPUKernel } = require2("./backend/cpu/kernel");
      const { HeadlessGLKernel } = require2("./backend/headless-gl/kernel");
      const { WebGLFunctionNode } = require2("./backend/web-gl/function-node");
      const { WebGLKernel } = require2("./backend/web-gl/kernel");
      const { kernelValueMaps: webGLKernelValueMaps } = require2("./backend/web-gl/kernel-value-maps");
      const { WebGL2FunctionNode } = require2("./backend/web-gl2/function-node");
      const { WebGL2Kernel } = require2("./backend/web-gl2/kernel");
      const { kernelValueMaps: webGL2KernelValueMaps } = require2("./backend/web-gl2/kernel-value-maps");
      const { GLKernel } = require2("./backend/gl/kernel");
      const { Kernel } = require2("./backend/kernel");
      const { FunctionTracer } = require2("./backend/function-tracer");
      const mathRandom = require2("./plugins/math-random-uniformly-distributed");
      module2.exports = {
        alias,
        CPUFunctionNode,
        CPUKernel,
        GPU,
        FunctionBuilder,
        FunctionNode,
        HeadlessGLKernel,
        Input,
        input,
        Texture,
        utils,
        WebGL2FunctionNode,
        WebGL2Kernel,
        webGL2KernelValueMaps,
        WebGLFunctionNode,
        WebGLKernel,
        webGLKernelValueMaps,
        GLKernel,
        Kernel,
        FunctionTracer,
        plugins: {
          mathRandom
        }
      };
    }, { "./alias": 5, "./backend/cpu/function-node": 6, "./backend/cpu/kernel": 8, "./backend/function-builder": 9, "./backend/function-node": 10, "./backend/function-tracer": 11, "./backend/gl/kernel": 13, "./backend/headless-gl/kernel": 34, "./backend/kernel": 36, "./backend/web-gl/function-node": 38, "./backend/web-gl/kernel": 70, "./backend/web-gl/kernel-value-maps": 39, "./backend/web-gl2/function-node": 73, "./backend/web-gl2/kernel": 105, "./backend/web-gl2/kernel-value-maps": 74, "./gpu": 108, "./input": 110, "./plugins/math-random-uniformly-distributed": 112, "./texture": 113, "./utils": 114 }], 110: [function(require2, module2, exports2) {
      class Input {
        constructor(value2, size) {
          this.value = value2;
          if (Array.isArray(size)) {
            this.size = size;
          } else {
            this.size = new Int32Array(3);
            if (size.z) {
              this.size = new Int32Array([size.x, size.y, size.z]);
            } else if (size.y) {
              this.size = new Int32Array([size.x, size.y]);
            } else {
              this.size = new Int32Array([size.x]);
            }
          }
          const [w, h, d] = this.size;
          if (d) {
            if (this.value.length !== w * h * d) {
              throw new Error(`Input size ${this.value.length} does not match ${w} * ${h} * ${d} = ${h * w * d}`);
            }
          } else if (h) {
            if (this.value.length !== w * h) {
              throw new Error(`Input size ${this.value.length} does not match ${w} * ${h} = ${h * w}`);
            }
          } else {
            if (this.value.length !== w) {
              throw new Error(`Input size ${this.value.length} does not match ${w}`);
            }
          }
        }
        toArray() {
          const { utils } = require2("./utils");
          const [w, h, d] = this.size;
          if (d) {
            return utils.erectMemoryOptimized3DFloat(this.value.subarray ? this.value : new Float32Array(this.value), w, h, d);
          } else if (h) {
            return utils.erectMemoryOptimized2DFloat(this.value.subarray ? this.value : new Float32Array(this.value), w, h);
          } else {
            return this.value;
          }
        }
      }
      function input(value2, size) {
        return new Input(value2, size);
      }
      module2.exports = {
        Input,
        input
      };
    }, { "./utils": 114 }], 111: [function(require2, module2, exports2) {
      const { utils } = require2("./utils");
      function kernelRunShortcut(kernel) {
        let run = function() {
          kernel.build.apply(kernel, arguments);
          run = function() {
            let result = kernel.run.apply(kernel, arguments);
            if (kernel.switchingKernels) {
              const reasons = kernel.resetSwitchingKernels();
              const newKernel = kernel.onRequestSwitchKernel(reasons, arguments, kernel);
              shortcut.kernel = kernel = newKernel;
              result = newKernel.run.apply(newKernel, arguments);
            }
            if (kernel.renderKernels) {
              return kernel.renderKernels();
            } else if (kernel.renderOutput) {
              return kernel.renderOutput();
            } else {
              return result;
            }
          };
          return run.apply(kernel, arguments);
        };
        const shortcut = function() {
          return run.apply(kernel, arguments);
        };
        shortcut.exec = function() {
          return new Promise((accept, reject) => {
            try {
              accept(run.apply(this, arguments));
            } catch (e) {
              reject(e);
            }
          });
        };
        shortcut.replaceKernel = function(replacementKernel) {
          kernel = replacementKernel;
          bindKernelToShortcut(kernel, shortcut);
        };
        bindKernelToShortcut(kernel, shortcut);
        return shortcut;
      }
      function bindKernelToShortcut(kernel, shortcut) {
        if (shortcut.kernel) {
          shortcut.kernel = kernel;
          return;
        }
        const properties = utils.allPropertiesOf(kernel);
        for (let i = 0; i < properties.length; i++) {
          const property = properties[i];
          if (property[0] === "_" && property[1] === "_")
            continue;
          if (typeof kernel[property] === "function") {
            if (property.substring(0, 3) === "add" || property.substring(0, 3) === "set") {
              shortcut[property] = function() {
                shortcut.kernel[property].apply(shortcut.kernel, arguments);
                return shortcut;
              };
            } else {
              shortcut[property] = function() {
                return shortcut.kernel[property].apply(shortcut.kernel, arguments);
              };
            }
          } else {
            shortcut.__defineGetter__(property, () => shortcut.kernel[property]);
            shortcut.__defineSetter__(property, (value2) => {
              shortcut.kernel[property] = value2;
            });
          }
        }
        shortcut.kernel = kernel;
      }
      module2.exports = {
        kernelRunShortcut
      };
    }, { "./utils": 114 }], 112: [function(require2, module2, exports2) {
      const source = `// https://www.shadertoy.com/view/4t2SDh
//note: uniformly distributed, normalized rand, [0,1]
highp float randomSeedShift = 1.0;
highp float slide = 1.0;
uniform highp float randomSeed1;
uniform highp float randomSeed2;

highp float nrand(highp vec2 n) {
  highp float result = fract(sin(dot((n.xy + 1.0) * vec2(randomSeed1 * slide, randomSeed2 * randomSeedShift), vec2(12.9898, 78.233))) * 43758.5453);
  randomSeedShift = result;
  if (randomSeedShift > 0.5) {
    slide += 0.00009; 
  } else {
    slide += 0.0009;
  }
  return result;
}`;
      const name2 = "math-random-uniformly-distributed";
      const functionMatch = `Math.random()`;
      const functionReplace = `nrand(vTexCoord)`;
      const functionReturnType = "Number";
      const onBeforeRun = (kernel) => {
        kernel.setUniform1f("randomSeed1", Math.random());
        kernel.setUniform1f("randomSeed2", Math.random());
      };
      const plugin = {
        name: name2,
        onBeforeRun,
        functionMatch,
        functionReplace,
        functionReturnType,
        source
      };
      module2.exports = plugin;
    }, {}], 113: [function(require2, module2, exports2) {
      class Texture {
        constructor(settings) {
          const {
            texture,
            size,
            dimensions,
            output,
            context,
            type = "NumberTexture",
            kernel,
            internalFormat,
            textureFormat
          } = settings;
          if (!output)
            throw new Error('settings property "output" required.');
          if (!context)
            throw new Error('settings property "context" required.');
          if (!texture)
            throw new Error('settings property "texture" required.');
          if (!kernel)
            throw new Error('settings property "kernel" required.');
          this.texture = texture;
          if (texture._refs) {
            texture._refs++;
          } else {
            texture._refs = 1;
          }
          this.size = size;
          this.dimensions = dimensions;
          this.output = output;
          this.context = context;
          this.kernel = kernel;
          this.type = type;
          this._deleted = false;
          this.internalFormat = internalFormat;
          this.textureFormat = textureFormat;
        }
        toArray() {
          throw new Error(`Not implemented on ${this.constructor.name}`);
        }
        clone() {
          throw new Error(`Not implemented on ${this.constructor.name}`);
        }
        delete() {
          throw new Error(`Not implemented on ${this.constructor.name}`);
        }
        clear() {
          throw new Error(`Not implemented on ${this.constructor.name}`);
        }
      }
      module2.exports = {
        Texture
      };
    }, {}], 114: [function(require2, module2, exports2) {
      const acorn = require2("acorn");
      const { Input } = require2("./input");
      const { Texture } = require2("./texture");
      const FUNCTION_NAME = /function ([^(]*)/;
      const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
      const ARGUMENT_NAMES = /([^\s,]+)/g;
      const utils = {
        systemEndianness() {
          return _systemEndianness;
        },
        getSystemEndianness() {
          const b = new ArrayBuffer(4);
          const a = new Uint32Array(b);
          const c = new Uint8Array(b);
          a[0] = 3735928559;
          if (c[0] === 239)
            return "LE";
          if (c[0] === 222)
            return "BE";
          throw new Error("unknown endianness");
        },
        isFunction(funcObj) {
          return typeof funcObj === "function";
        },
        isFunctionString(fn) {
          if (typeof fn === "string") {
            return fn.slice(0, "function".length).toLowerCase() === "function";
          }
          return false;
        },
        getFunctionNameFromString(funcStr) {
          const result = FUNCTION_NAME.exec(funcStr);
          if (!result || result.length === 0)
            return null;
          return result[1].trim();
        },
        getFunctionBodyFromString(funcStr) {
          return funcStr.substring(funcStr.indexOf("{") + 1, funcStr.lastIndexOf("}"));
        },
        getArgumentNamesFromString(fn) {
          const fnStr = fn.replace(STRIP_COMMENTS, "");
          let result = fnStr.slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")")).match(ARGUMENT_NAMES);
          if (result === null) {
            result = [];
          }
          return result;
        },
        clone(obj) {
          if (obj === null || typeof obj !== "object" || obj.hasOwnProperty("isActiveClone"))
            return obj;
          const temp = obj.constructor();
          for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              obj.isActiveClone = null;
              temp[key] = utils.clone(obj[key]);
              delete obj.isActiveClone;
            }
          }
          return temp;
        },
        isArray(array) {
          return !isNaN(array.length);
        },
        getVariableType(value2, strictIntegers) {
          if (utils.isArray(value2)) {
            if (value2.length > 0 && value2[0].nodeName === "IMG") {
              return "HTMLImageArray";
            }
            return "Array";
          }
          switch (value2.constructor) {
            case Boolean:
              return "Boolean";
            case Number:
              if (strictIntegers && Number.isInteger(value2)) {
                return "Integer";
              }
              return "Float";
            case Texture:
              return value2.type;
            case Input:
              return "Input";
          }
          if ("nodeName" in value2) {
            switch (value2.nodeName) {
              case "IMG":
                return "HTMLImage";
              case "CANVAS":
                return "HTMLImage";
              case "VIDEO":
                return "HTMLVideo";
            }
          } else if (value2.hasOwnProperty("type")) {
            return value2.type;
          } else if (typeof OffscreenCanvas !== "undefined" && value2 instanceof OffscreenCanvas) {
            return "OffscreenCanvas";
          } else if (typeof ImageBitmap !== "undefined" && value2 instanceof ImageBitmap) {
            return "ImageBitmap";
          } else if (typeof ImageData !== "undefined" && value2 instanceof ImageData) {
            return "ImageData";
          }
          return "Unknown";
        },
        getKernelTextureSize(settings, dimensions) {
          let [w, h, d] = dimensions;
          let texelCount = (w || 1) * (h || 1) * (d || 1);
          if (settings.optimizeFloatMemory && settings.precision === "single") {
            w = texelCount = Math.ceil(texelCount / 4);
          }
          if (h > 1 && w * h === texelCount) {
            return new Int32Array([w, h]);
          }
          return utils.closestSquareDimensions(texelCount);
        },
        closestSquareDimensions(length) {
          const sqrt2 = Math.sqrt(length);
          let high = Math.ceil(sqrt2);
          let low = Math.floor(sqrt2);
          while (high * low < length) {
            high--;
            low = Math.ceil(length / high);
          }
          return new Int32Array([low, Math.ceil(length / low)]);
        },
        getMemoryOptimizedFloatTextureSize(dimensions, bitRatio) {
          const totalArea = utils.roundTo((dimensions[0] || 1) * (dimensions[1] || 1) * (dimensions[2] || 1) * (dimensions[3] || 1), 4);
          const texelCount = totalArea / bitRatio;
          return utils.closestSquareDimensions(texelCount);
        },
        getMemoryOptimizedPackedTextureSize(dimensions, bitRatio) {
          const [w, h, d] = dimensions;
          const totalArea = utils.roundTo((w || 1) * (h || 1) * (d || 1), 4);
          const texelCount = totalArea / (4 / bitRatio);
          return utils.closestSquareDimensions(texelCount);
        },
        roundTo(n, d) {
          return Math.floor((n + d - 1) / d) * d;
        },
        getDimensions(x, pad) {
          let ret;
          if (utils.isArray(x)) {
            const dim = [];
            let temp = x;
            while (utils.isArray(temp)) {
              dim.push(temp.length);
              temp = temp[0];
            }
            ret = dim.reverse();
          } else if (x instanceof Texture) {
            ret = x.output;
          } else if (x instanceof Input) {
            ret = x.size;
          } else {
            throw new Error(`Unknown dimensions of ${x}`);
          }
          if (pad) {
            ret = Array.from(ret);
            while (ret.length < 3) {
              ret.push(1);
            }
          }
          return new Int32Array(ret);
        },
        flatten2dArrayTo(array, target2) {
          let offset = 0;
          for (let y = 0; y < array.length; y++) {
            target2.set(array[y], offset);
            offset += array[y].length;
          }
        },
        flatten3dArrayTo(array, target2) {
          let offset = 0;
          for (let z = 0; z < array.length; z++) {
            for (let y = 0; y < array[z].length; y++) {
              target2.set(array[z][y], offset);
              offset += array[z][y].length;
            }
          }
        },
        flatten4dArrayTo(array, target2) {
          let offset = 0;
          for (let l = 0; l < array.length; l++) {
            for (let z = 0; z < array[l].length; z++) {
              for (let y = 0; y < array[l][z].length; y++) {
                target2.set(array[l][z][y], offset);
                offset += array[l][z][y].length;
              }
            }
          }
        },
        flattenTo(array, target2) {
          if (utils.isArray(array[0])) {
            if (utils.isArray(array[0][0])) {
              if (utils.isArray(array[0][0][0])) {
                utils.flatten4dArrayTo(array, target2);
              } else {
                utils.flatten3dArrayTo(array, target2);
              }
            } else {
              utils.flatten2dArrayTo(array, target2);
            }
          } else {
            target2.set(array);
          }
        },
        splitArray(array, part) {
          const result = [];
          for (let i = 0; i < array.length; i += part) {
            result.push(new array.constructor(array.buffer, i * 4 + array.byteOffset, part));
          }
          return result;
        },
        getAstString(source, ast) {
          const lines = Array.isArray(source) ? source : source.split(/\r?\n/g);
          const start = ast.loc.start;
          const end = ast.loc.end;
          const result = [];
          if (start.line === end.line) {
            result.push(lines[start.line - 1].substring(start.column, end.column));
          } else {
            result.push(lines[start.line - 1].slice(start.column));
            for (let i = start.line; i < end.line; i++) {
              result.push(lines[i]);
            }
            result.push(lines[end.line - 1].slice(0, end.column));
          }
          return result.join("\n");
        },
        allPropertiesOf(obj) {
          const props2 = [];
          do {
            props2.push.apply(props2, Object.getOwnPropertyNames(obj));
          } while (obj = Object.getPrototypeOf(obj));
          return props2;
        },
        linesToString(lines) {
          if (lines.length > 0) {
            return lines.join(";\n") + ";\n";
          } else {
            return "\n";
          }
        },
        warnDeprecated(type, oldName, newName) {
          if (newName) {
            console.warn(`You are using a deprecated ${type} "${oldName}". It has been replaced with "${newName}". Fixing, but please upgrade as it will soon be removed.`);
          } else {
            console.warn(`You are using a deprecated ${type} "${oldName}". It has been removed. Fixing, but please upgrade as it will soon be removed.`);
          }
        },
        flipPixels: (pixels, width, height) => {
          const halfHeight = height / 2 | 0;
          const bytesPerRow = width * 4;
          const temp = new Uint8ClampedArray(width * 4);
          const result = pixels.slice(0);
          for (let y = 0; y < halfHeight; ++y) {
            const topOffset = y * bytesPerRow;
            const bottomOffset = (height - y - 1) * bytesPerRow;
            temp.set(result.subarray(topOffset, topOffset + bytesPerRow));
            result.copyWithin(topOffset, bottomOffset, bottomOffset + bytesPerRow);
            result.set(temp, bottomOffset);
          }
          return result;
        },
        erectPackedFloat: (array, width) => {
          return array.subarray(0, width);
        },
        erect2DPackedFloat: (array, width, height) => {
          const yResults = new Array(height);
          for (let y = 0; y < height; y++) {
            const xStart = y * width;
            const xEnd = xStart + width;
            yResults[y] = array.subarray(xStart, xEnd);
          }
          return yResults;
        },
        erect3DPackedFloat: (array, width, height, depth) => {
          const zResults = new Array(depth);
          for (let z = 0; z < depth; z++) {
            const yResults = new Array(height);
            for (let y = 0; y < height; y++) {
              const xStart = z * height * width + y * width;
              const xEnd = xStart + width;
              yResults[y] = array.subarray(xStart, xEnd);
            }
            zResults[z] = yResults;
          }
          return zResults;
        },
        erectMemoryOptimizedFloat: (array, width) => {
          return array.subarray(0, width);
        },
        erectMemoryOptimized2DFloat: (array, width, height) => {
          const yResults = new Array(height);
          for (let y = 0; y < height; y++) {
            const offset = y * width;
            yResults[y] = array.subarray(offset, offset + width);
          }
          return yResults;
        },
        erectMemoryOptimized3DFloat: (array, width, height, depth) => {
          const zResults = new Array(depth);
          for (let z = 0; z < depth; z++) {
            const yResults = new Array(height);
            for (let y = 0; y < height; y++) {
              const offset = z * height * width + y * width;
              yResults[y] = array.subarray(offset, offset + width);
            }
            zResults[z] = yResults;
          }
          return zResults;
        },
        erectFloat: (array, width) => {
          const xResults = new Float32Array(width);
          let i = 0;
          for (let x = 0; x < width; x++) {
            xResults[x] = array[i];
            i += 4;
          }
          return xResults;
        },
        erect2DFloat: (array, width, height) => {
          const yResults = new Array(height);
          let i = 0;
          for (let y = 0; y < height; y++) {
            const xResults = new Float32Array(width);
            for (let x = 0; x < width; x++) {
              xResults[x] = array[i];
              i += 4;
            }
            yResults[y] = xResults;
          }
          return yResults;
        },
        erect3DFloat: (array, width, height, depth) => {
          const zResults = new Array(depth);
          let i = 0;
          for (let z = 0; z < depth; z++) {
            const yResults = new Array(height);
            for (let y = 0; y < height; y++) {
              const xResults = new Float32Array(width);
              for (let x = 0; x < width; x++) {
                xResults[x] = array[i];
                i += 4;
              }
              yResults[y] = xResults;
            }
            zResults[z] = yResults;
          }
          return zResults;
        },
        erectArray2: (array, width) => {
          const xResults = new Array(width);
          const xResultsMax = width * 4;
          let i = 0;
          for (let x = 0; x < xResultsMax; x += 4) {
            xResults[i++] = array.subarray(x, x + 2);
          }
          return xResults;
        },
        erect2DArray2: (array, width, height) => {
          const yResults = new Array(height);
          const XResultsMax = width * 4;
          for (let y = 0; y < height; y++) {
            const xResults = new Array(width);
            const offset = y * XResultsMax;
            let i = 0;
            for (let x = 0; x < XResultsMax; x += 4) {
              xResults[i++] = array.subarray(x + offset, x + offset + 2);
            }
            yResults[y] = xResults;
          }
          return yResults;
        },
        erect3DArray2: (array, width, height, depth) => {
          const xResultsMax = width * 4;
          const zResults = new Array(depth);
          for (let z = 0; z < depth; z++) {
            const yResults = new Array(height);
            for (let y = 0; y < height; y++) {
              const xResults = new Array(width);
              const offset = z * xResultsMax * height + y * xResultsMax;
              let i = 0;
              for (let x = 0; x < xResultsMax; x += 4) {
                xResults[i++] = array.subarray(x + offset, x + offset + 2);
              }
              yResults[y] = xResults;
            }
            zResults[z] = yResults;
          }
          return zResults;
        },
        erectArray3: (array, width) => {
          const xResults = new Array(width);
          const xResultsMax = width * 4;
          let i = 0;
          for (let x = 0; x < xResultsMax; x += 4) {
            xResults[i++] = array.subarray(x, x + 3);
          }
          return xResults;
        },
        erect2DArray3: (array, width, height) => {
          const xResultsMax = width * 4;
          const yResults = new Array(height);
          for (let y = 0; y < height; y++) {
            const xResults = new Array(width);
            const offset = y * xResultsMax;
            let i = 0;
            for (let x = 0; x < xResultsMax; x += 4) {
              xResults[i++] = array.subarray(x + offset, x + offset + 3);
            }
            yResults[y] = xResults;
          }
          return yResults;
        },
        erect3DArray3: (array, width, height, depth) => {
          const xResultsMax = width * 4;
          const zResults = new Array(depth);
          for (let z = 0; z < depth; z++) {
            const yResults = new Array(height);
            for (let y = 0; y < height; y++) {
              const xResults = new Array(width);
              const offset = z * xResultsMax * height + y * xResultsMax;
              let i = 0;
              for (let x = 0; x < xResultsMax; x += 4) {
                xResults[i++] = array.subarray(x + offset, x + offset + 3);
              }
              yResults[y] = xResults;
            }
            zResults[z] = yResults;
          }
          return zResults;
        },
        erectArray4: (array, width) => {
          const xResults = new Array(array);
          const xResultsMax = width * 4;
          let i = 0;
          for (let x = 0; x < xResultsMax; x += 4) {
            xResults[i++] = array.subarray(x, x + 4);
          }
          return xResults;
        },
        erect2DArray4: (array, width, height) => {
          const xResultsMax = width * 4;
          const yResults = new Array(height);
          for (let y = 0; y < height; y++) {
            const xResults = new Array(width);
            const offset = y * xResultsMax;
            let i = 0;
            for (let x = 0; x < xResultsMax; x += 4) {
              xResults[i++] = array.subarray(x + offset, x + offset + 4);
            }
            yResults[y] = xResults;
          }
          return yResults;
        },
        erect3DArray4: (array, width, height, depth) => {
          const xResultsMax = width * 4;
          const zResults = new Array(depth);
          for (let z = 0; z < depth; z++) {
            const yResults = new Array(height);
            for (let y = 0; y < height; y++) {
              const xResults = new Array(width);
              const offset = z * xResultsMax * height + y * xResultsMax;
              let i = 0;
              for (let x = 0; x < xResultsMax; x += 4) {
                xResults[i++] = array.subarray(x + offset, x + offset + 4);
              }
              yResults[y] = xResults;
            }
            zResults[z] = yResults;
          }
          return zResults;
        },
        flattenFunctionToString: (source, settings) => {
          const { findDependency, thisLookup, doNotDefine } = settings;
          let flattened = settings.flattened;
          if (!flattened) {
            flattened = settings.flattened = {};
          }
          const ast = acorn.parse(source);
          const functionDependencies = [];
          let indent = 0;
          function flatten(ast2) {
            if (Array.isArray(ast2)) {
              const results = [];
              for (let i = 0; i < ast2.length; i++) {
                results.push(flatten(ast2[i]));
              }
              return results.join("");
            }
            switch (ast2.type) {
              case "Program":
                return flatten(ast2.body) + (ast2.body[0].type === "VariableDeclaration" ? ";" : "");
              case "FunctionDeclaration":
                return `function ${ast2.id.name}(${ast2.params.map(flatten).join(", ")}) ${flatten(ast2.body)}`;
              case "BlockStatement": {
                const result2 = [];
                indent += 2;
                for (let i = 0; i < ast2.body.length; i++) {
                  const flat = flatten(ast2.body[i]);
                  if (flat) {
                    result2.push(" ".repeat(indent) + flat, ";\n");
                  }
                }
                indent -= 2;
                return `{
${result2.join("")}}`;
              }
              case "VariableDeclaration":
                const declarations = utils.normalizeDeclarations(ast2).map(flatten).filter((r) => r !== null);
                if (declarations.length < 1) {
                  return "";
                } else {
                  return `${ast2.kind} ${declarations.join(",")}`;
                }
              case "VariableDeclarator":
                if (ast2.init.object && ast2.init.object.type === "ThisExpression") {
                  const lookup = thisLookup(ast2.init.property.name, true);
                  if (lookup) {
                    return `${ast2.id.name} = ${flatten(ast2.init)}`;
                  } else {
                    return null;
                  }
                } else {
                  return `${ast2.id.name} = ${flatten(ast2.init)}`;
                }
              case "CallExpression": {
                if (ast2.callee.property.name === "subarray") {
                  return `${flatten(ast2.callee.object)}.${flatten(ast2.callee.property)}(${ast2.arguments.map((value2) => flatten(value2)).join(", ")})`;
                }
                if (ast2.callee.object.name === "gl" || ast2.callee.object.name === "context") {
                  return `${flatten(ast2.callee.object)}.${flatten(ast2.callee.property)}(${ast2.arguments.map((value2) => flatten(value2)).join(", ")})`;
                }
                if (ast2.callee.object.type === "ThisExpression") {
                  functionDependencies.push(findDependency("this", ast2.callee.property.name));
                  return `${ast2.callee.property.name}(${ast2.arguments.map((value2) => flatten(value2)).join(", ")})`;
                } else if (ast2.callee.object.name) {
                  const foundSource = findDependency(ast2.callee.object.name, ast2.callee.property.name);
                  if (foundSource === null) {
                    return `${ast2.callee.object.name}.${ast2.callee.property.name}(${ast2.arguments.map((value2) => flatten(value2)).join(", ")})`;
                  } else {
                    functionDependencies.push(foundSource);
                    return `${ast2.callee.property.name}(${ast2.arguments.map((value2) => flatten(value2)).join(", ")})`;
                  }
                } else if (ast2.callee.object.type === "MemberExpression") {
                  return `${flatten(ast2.callee.object)}.${ast2.callee.property.name}(${ast2.arguments.map((value2) => flatten(value2)).join(", ")})`;
                } else {
                  throw new Error("unknown ast.callee");
                }
              }
              case "ReturnStatement":
                return `return ${flatten(ast2.argument)}`;
              case "BinaryExpression":
                return `(${flatten(ast2.left)}${ast2.operator}${flatten(ast2.right)})`;
              case "UnaryExpression":
                if (ast2.prefix) {
                  return `${ast2.operator} ${flatten(ast2.argument)}`;
                } else {
                  return `${flatten(ast2.argument)} ${ast2.operator}`;
                }
              case "ExpressionStatement":
                return `${flatten(ast2.expression)}`;
              case "SequenceExpression":
                return `(${flatten(ast2.expressions)})`;
              case "ArrowFunctionExpression":
                return `(${ast2.params.map(flatten).join(", ")}) => ${flatten(ast2.body)}`;
              case "Literal":
                return ast2.raw;
              case "Identifier":
                return ast2.name;
              case "MemberExpression":
                if (ast2.object.type === "ThisExpression") {
                  return thisLookup(ast2.property.name);
                }
                if (ast2.computed) {
                  return `${flatten(ast2.object)}[${flatten(ast2.property)}]`;
                }
                return flatten(ast2.object) + "." + flatten(ast2.property);
              case "ThisExpression":
                return "this";
              case "NewExpression":
                return `new ${flatten(ast2.callee)}(${ast2.arguments.map((value2) => flatten(value2)).join(", ")})`;
              case "ForStatement":
                return `for (${flatten(ast2.init)};${flatten(ast2.test)};${flatten(ast2.update)}) ${flatten(ast2.body)}`;
              case "AssignmentExpression":
                return `${flatten(ast2.left)}${ast2.operator}${flatten(ast2.right)}`;
              case "UpdateExpression":
                return `${flatten(ast2.argument)}${ast2.operator}`;
              case "IfStatement":
                return `if (${flatten(ast2.test)}) ${flatten(ast2.consequent)}`;
              case "ThrowStatement":
                return `throw ${flatten(ast2.argument)}`;
              case "ObjectPattern":
                return ast2.properties.map(flatten).join(", ");
              case "ArrayPattern":
                return ast2.elements.map(flatten).join(", ");
              case "DebuggerStatement":
                return "debugger;";
              case "ConditionalExpression":
                return `${flatten(ast2.test)}?${flatten(ast2.consequent)}:${flatten(ast2.alternate)}`;
              case "Property":
                if (ast2.kind === "init") {
                  return flatten(ast2.key);
                }
            }
            throw new Error(`unhandled ast.type of ${ast2.type}`);
          }
          const result = flatten(ast);
          if (functionDependencies.length > 0) {
            const flattenedFunctionDependencies = [];
            for (let i = 0; i < functionDependencies.length; i++) {
              const functionDependency = functionDependencies[i];
              if (!flattened[functionDependency]) {
                flattened[functionDependency] = true;
              }
              functionDependency ? flattenedFunctionDependencies.push(utils.flattenFunctionToString(functionDependency, settings) + "\n") : "";
            }
            return flattenedFunctionDependencies.join("") + result;
          }
          return result;
        },
        normalizeDeclarations: (ast) => {
          if (ast.type !== "VariableDeclaration")
            throw new Error('Ast is not of type "VariableDeclaration"');
          const normalizedDeclarations = [];
          for (let declarationIndex = 0; declarationIndex < ast.declarations.length; declarationIndex++) {
            const declaration = ast.declarations[declarationIndex];
            if (declaration.id && declaration.id.type === "ObjectPattern" && declaration.id.properties) {
              const { properties } = declaration.id;
              for (let propertyIndex = 0; propertyIndex < properties.length; propertyIndex++) {
                const property = properties[propertyIndex];
                if (property.value.type === "ObjectPattern" && property.value.properties) {
                  for (let subPropertyIndex = 0; subPropertyIndex < property.value.properties.length; subPropertyIndex++) {
                    const subProperty = property.value.properties[subPropertyIndex];
                    if (subProperty.type === "Property") {
                      normalizedDeclarations.push({
                        type: "VariableDeclarator",
                        id: {
                          type: "Identifier",
                          name: subProperty.key.name
                        },
                        init: {
                          type: "MemberExpression",
                          object: {
                            type: "MemberExpression",
                            object: declaration.init,
                            property: {
                              type: "Identifier",
                              name: property.key.name
                            },
                            computed: false
                          },
                          property: {
                            type: "Identifier",
                            name: subProperty.key.name
                          },
                          computed: false
                        }
                      });
                    } else {
                      throw new Error("unexpected state");
                    }
                  }
                } else if (property.value.type === "Identifier") {
                  normalizedDeclarations.push({
                    type: "VariableDeclarator",
                    id: {
                      type: "Identifier",
                      name: property.value && property.value.name ? property.value.name : property.key.name
                    },
                    init: {
                      type: "MemberExpression",
                      object: declaration.init,
                      property: {
                        type: "Identifier",
                        name: property.key.name
                      },
                      computed: false
                    }
                  });
                } else {
                  throw new Error("unexpected state");
                }
              }
            } else if (declaration.id && declaration.id.type === "ArrayPattern" && declaration.id.elements) {
              const { elements } = declaration.id;
              for (let elementIndex = 0; elementIndex < elements.length; elementIndex++) {
                const element = elements[elementIndex];
                if (element.type === "Identifier") {
                  normalizedDeclarations.push({
                    type: "VariableDeclarator",
                    id: {
                      type: "Identifier",
                      name: element.name
                    },
                    init: {
                      type: "MemberExpression",
                      object: declaration.init,
                      property: {
                        type: "Literal",
                        value: elementIndex,
                        raw: elementIndex.toString(),
                        start: element.start,
                        end: element.end
                      },
                      computed: true
                    }
                  });
                } else {
                  throw new Error("unexpected state");
                }
              }
            } else {
              normalizedDeclarations.push(declaration);
            }
          }
          return normalizedDeclarations;
        },
        splitHTMLImageToRGB: (gpu, image) => {
          const rKernel = gpu.createKernel(function(a) {
            const pixel = a[this.thread.y][this.thread.x];
            return pixel.r * 255;
          }, {
            output: [image.width, image.height],
            precision: "unsigned",
            argumentTypes: { a: "HTMLImage" }
          });
          const gKernel = gpu.createKernel(function(a) {
            const pixel = a[this.thread.y][this.thread.x];
            return pixel.g * 255;
          }, {
            output: [image.width, image.height],
            precision: "unsigned",
            argumentTypes: { a: "HTMLImage" }
          });
          const bKernel = gpu.createKernel(function(a) {
            const pixel = a[this.thread.y][this.thread.x];
            return pixel.b * 255;
          }, {
            output: [image.width, image.height],
            precision: "unsigned",
            argumentTypes: { a: "HTMLImage" }
          });
          const aKernel = gpu.createKernel(function(a) {
            const pixel = a[this.thread.y][this.thread.x];
            return pixel.a * 255;
          }, {
            output: [image.width, image.height],
            precision: "unsigned",
            argumentTypes: { a: "HTMLImage" }
          });
          const result = [
            rKernel(image),
            gKernel(image),
            bKernel(image),
            aKernel(image)
          ];
          result.rKernel = rKernel;
          result.gKernel = gKernel;
          result.bKernel = bKernel;
          result.aKernel = aKernel;
          result.gpu = gpu;
          return result;
        },
        splitRGBAToCanvases: (gpu, rgba, width, height) => {
          const visualKernelR = gpu.createKernel(function(v) {
            const pixel = v[this.thread.y][this.thread.x];
            this.color(pixel.r / 255, 0, 0, 255);
          }, {
            output: [width, height],
            graphical: true,
            argumentTypes: { v: "Array2D(4)" }
          });
          visualKernelR(rgba);
          const visualKernelG = gpu.createKernel(function(v) {
            const pixel = v[this.thread.y][this.thread.x];
            this.color(0, pixel.g / 255, 0, 255);
          }, {
            output: [width, height],
            graphical: true,
            argumentTypes: { v: "Array2D(4)" }
          });
          visualKernelG(rgba);
          const visualKernelB = gpu.createKernel(function(v) {
            const pixel = v[this.thread.y][this.thread.x];
            this.color(0, 0, pixel.b / 255, 255);
          }, {
            output: [width, height],
            graphical: true,
            argumentTypes: { v: "Array2D(4)" }
          });
          visualKernelB(rgba);
          const visualKernelA = gpu.createKernel(function(v) {
            const pixel = v[this.thread.y][this.thread.x];
            this.color(255, 255, 255, pixel.a / 255);
          }, {
            output: [width, height],
            graphical: true,
            argumentTypes: { v: "Array2D(4)" }
          });
          visualKernelA(rgba);
          return [
            visualKernelR.canvas,
            visualKernelG.canvas,
            visualKernelB.canvas,
            visualKernelA.canvas
          ];
        },
        getMinifySafeName: (fn) => {
          try {
            const ast = acorn.parse(`const value = ${fn.toString()}`);
            const { init } = ast.body[0].declarations[0];
            return init.body.name || init.body.body[0].argument.name;
          } catch (e) {
            throw new Error("Unrecognized function type.  Please use `() => yourFunctionVariableHere` or function() { return yourFunctionVariableHere; }");
          }
        },
        sanitizeName: function(name2) {
          if (dollarSign.test(name2)) {
            name2 = name2.replace(dollarSign, "S_S");
          }
          if (doubleUnderscore.test(name2)) {
            name2 = name2.replace(doubleUnderscore, "U_U");
          } else if (singleUnderscore.test(name2)) {
            name2 = name2.replace(singleUnderscore, "u_u");
          }
          return name2;
        }
      };
      const dollarSign = /\$/;
      const doubleUnderscore = /__/;
      const singleUnderscore = /_/;
      const _systemEndianness = utils.getSystemEndianness();
      module2.exports = {
        utils
      };
    }, { "./input": 110, "./texture": 113, "acorn": 1 }] }, {}, [107])(107);
  });
})(gpuBrowser);
const kernelXY = function(GG, data) {
  const { len } = this.constants;
  let newX = 0;
  let newY = 0;
  let newVX = data[this.thread.x][2];
  let newVY = data[this.thread.x][3];
  let FX = 0;
  let FY = 0;
  let R = 0;
  let xMinus = 0;
  let yMinus = 0;
  for (let k = 0; k < len; k++) {
    if (k !== this.thread.x) {
      xMinus = data[k][0] - data[this.thread.x][0];
      yMinus = data[k][1] - data[this.thread.x][1];
      R = sqrt(xMinus * xMinus + yMinus * yMinus);
      R = R * R;
      FX = GG * xMinus / (1 + R);
      FY = GG * yMinus / (1 + R);
      newVX = FX + newVX;
      newVY = FY + newVY;
    }
  }
  newX = newVX + data[this.thread.x][0];
  newY = newVY + data[this.thread.x][1];
  return [newX, newY, newVX, newVY];
};
const kernelForceField = function(GG, data) {
  const { len } = this.constants;
  let xGField = 0;
  let yGField = 0;
  let GFieldLen = 0;
  let FX = 0;
  let FY = 0;
  let R = 0;
  let xMinus = 0;
  let yMinus = 0;
  for (let k = 0; k < len; k++) {
    if (k !== this.thread.x) {
      xMinus = data[k][0] - data[this.thread.x][0];
      yMinus = data[k][1] - data[this.thread.x][1];
      R = sqrt(xMinus * xMinus + yMinus * yMinus);
      R = R * R;
      FX = GG * xMinus / (1 + R);
      FY = GG * yMinus / (1 + R);
      xGField += FX;
      yGField += FY;
    }
  }
  xGField = xGField / len;
  yGField = yGField / len;
  GFieldLen = sqrt(xGField * xGField + yGField * yGField);
  return [data[this.thread.x][0], data[this.thread.x][1], GFieldLen];
};
class Core {
  constructor() {
    const kk = this.getKernel();
    this.kernel = kk.kernel;
    this.kernelForce = kk.kernelForce;
  }
  getKernel() {
    const gpu = new gpuBrowser.exports.GPU();
    const kernel = gpu.createKernel(kernelXY).setDynamicArguments(true).setDynamicOutput(true);
    const kernelForce = gpu.createKernel(kernelForceField).setDynamicArguments(true).setDynamicOutput(true);
    return {
      kernel,
      kernelForce
    };
  }
  refresh() {
    const kk = this.getKernel();
    this.kernel = kk.kernel;
    this.kernelForce = kk.kernelForce;
  }
}
class WorkerCore {
  constructor(callback, that) {
    this.callback = callback;
    if (that) {
      window.that11 = that;
      this.callback = callback.bind(that);
    }
    console.log(this.that);
    this.workerMassCenter = new Worker("/galaxy-simulation/dist/workerMassCenter.cb84580c.js", { type: "module" });
    this.workerHandeler = this.workerHandeler.bind(this);
    this.calc = this.calc.bind(this);
  }
  workerHandeler(e) {
    if (window.that11) {
      window.that11.workerCallback({
        centerMassVector: e.data.centerMassVectorXY,
        centerMassVectorV: e.data.centerMassVectorV,
        maxField: e.data.maxField
      }, window.that11);
    } else
      this.callback({
        centerMassVector: e.data.centerMassVectorXY,
        centerMassVectorV: e.data.centerMassVectorV,
        maxField: e.data.maxField
      }, window.that11);
    this.isInProgress = false;
  }
  init() {
    this.isInProgress = false;
    this.workerMassCenter.addEventListener("message", this.workerHandeler);
  }
  kill() {
    this.workerMassCenter.removeEventListener("message", this.workerHandeler);
    this.workerMassCenter.terminate();
  }
  calc(data, test) {
    if (this.isInProgress)
      return;
    this.isInProgress = true;
    this.workerMassCenter.postMessage({
      dataArr: data,
      test
    });
  }
}
const addSphereInit = () => {
  window.addSphereCount = 500;
  window.addSphereRadius = 100;
  window.canvasElem.elem.addEventListener("click", (event) => {
    if (window.menuState !== 1) {
      return;
    }
    window.isPause = true;
    let x = window.canvasElem.x;
    let y = window.canvasElem.y;
    x -= window.innerWidth / 2;
    y -= window.innerHeight / 2;
    x = x / window.zoom;
    y = y / window.zoom;
    x += window.centerMassVector.x;
    y += window.centerMassVector.y;
    const center = new Vector(x, y);
    for (let k = 0; k < window.addSphereCount; k++) {
      const newStar = GeneratorCircle.getDot(center, addSphereRadius, "#FFFFFF");
      window.dataArr.push([
        newStar.coord.x,
        newStar.coord.y,
        0,
        0
      ]);
      window.MAX_DOTS++;
    }
    window.core.refresh();
    setTimeout(() => {
      window.isPause = false;
    }, 1);
  });
};
const mouseCoordInit = () => {
  window.canvasElem.elem.onmousemove = (event) => {
    window.canvasElem.x = event.x;
    window.canvasElem.y = event.y;
  };
};
class FpsMeter {
  constructor() {
    this.startTime = new Date();
  }
  start() {
    this.startTime = new Date();
  }
  finish() {
    window.fps = Math.ceil(100 * 1e3 / (new Date() - this.startTime)) / 100;
  }
}
var style = "";
const ctx = document.getElementById("canvas").getContext("2d");
window.core = new Core();
const fpsMeter = new FpsMeter();
window.dataArr = [];
window.dataArrWithField = [];
window.centerMassVector = new Vector(0, 0);
window.centerMassVectorV = new Vector(0, 0);
window.isPause = false;
window.zoom = 1;
window.canvasElem = {
  elem: document.getElementById("canvas"),
  x: 0,
  y: 0,
  ctx
};
window.MAX_DOTS = MAX_DOTS;
const workerCore = new WorkerCore((data) => {
  window.centerMassVector = data.centerMassVector;
  window.maxField = data.maxField;
});
const clearCanvas = () => {
  ctx.globalCompositeOperation = "destination-over";
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
};
const drawStars = () => {
  let x = 0;
  let y = 0;
  let dx, dy = 0;
  let field = 0;
  for (let k = 0; k < window.dataArrWithField.length; k++) {
    x = window.dataArrWithField[k][0];
    y = window.dataArrWithField[k][1];
    field = window.dataArrWithField[k][2];
    dx = (x - window.centerMassVector.x) * window.zoom;
    dy = (y - window.centerMassVector.y) * window.zoom;
    dx = dx + window.innerWidth / 2;
    dy = dy + window.innerHeight / 2;
    ctx.beginPath();
    ctx.fillStyle = getDotColorFromField(field);
    ctx.fillRect(dx, dy, 1, 1);
    ctx.closePath();
    ctx.stroke();
  }
};
const calcStars = () => {
  window.dataArr = window.core.kernel.setOutput([window.dataArr.length]).setConstants({
    len: window.dataArr.length
  })(G, window.dataArr);
  window.dataArrWithField = window.core.kernelForce.setOutput([window.dataArr.length]).setConstants({
    len: window.dataArr.length
  })(G, window.dataArr);
};
async function draw() {
  fpsMeter.start();
  clearCanvas();
  if (!window.isPause) {
    workerCore.calc(window.dataArrWithField);
    calcStars();
  }
  drawStars();
  drawMouseRect();
  fpsMeter.finish();
  window.requestAnimationFrame(draw);
}
const initDataArr = () => {
  const bodyGenerator = new GeneratorCircle();
  let bodyList = bodyGenerator.generate();
  for (let k = 0; k < bodyList.length; k++) {
    window.dataArr.push([
      bodyList[k].coord.x,
      bodyList[k].coord.y,
      bodyList[k].velocity.y,
      bodyList[k].velocity.y
    ]);
  }
  window.MAX_DOTS = window.dataArr.length;
};
const main = () => {
  initDataArr();
  starTrackerInit();
  mouseCoordInit();
  addSphereInit();
  workerCore.init();
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  window.addEventListener("resize", () => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  }, true);
  window.requestAnimationFrame(draw);
};
main();
new Vue({
  render: (h) => h(App)
}).$mount("#app");
//# sourceMappingURL=index-398b9388.js.map
