import Vue from "./vue.js"

export default (function (exports, Vue) { 'use strict';

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  var load = function load(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise(function (resolve, reject) {
      if (typeof document === "undefined") {
        return;
      }

      var head = document.head || document.getElementsByTagName("head")[0];
      var script = document.createElement("script");
      script.async = true;
      script.src = url;
      script.defer = options.defer;

      if (options.preconnectOrigin) {
        var link = document.createElement("link");
        link.href = options.preconnectOrigin;
        link.rel = "preconnect";
        head.appendChild(link);
      }

      head.appendChild(script);
      script.onload = resolve;
      script.onerror = reject;
    });
  };
  var isFn = function isFn(fn) {
    return typeof fn === "function";
  };
  var isObject = function isObject(item) {
    return item && _typeof(item) === "object" && !Array.isArray(item);
  };
  var mergeDeep = function mergeDeep(target) {
    for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }

    if (!sources.length) {
      return target;
    }

    var source = sources.shift();

    if (!isObject(target) || !isObject(source)) {
      return;
    }

    for (var key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, _defineProperty({}, key, {}));
        }

        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, _defineProperty({}, key, source[key]));
      }
    }

    return mergeDeep.apply(void 0, [target].concat(sources));
  };
  var isBrowser = function isBrowser() {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return false;
    }

    return true;
  };
  var warn = function warn(text) {
    var shouldLog = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (!isBrowser() || "development" === "production") {
      return;
    }

    if (!shouldLog) {
      return;
    }

    console.warn("[vue-gtag] ".concat(text));
  };
  var validateScreenviewShape = function validateScreenviewShape() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    warn("Missing \"appName\" property inside the plugin options.", obj.app_name == null);
    warn("Missing \"name\" property in the route.", obj.screen_name == null);
    return obj;
  };
  function getPathWithBase() {
    var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var pathAsArray = path.split("/");
    var baseAsArray = base.split("/");

    if (pathAsArray[0] === "" && base[base.length - 1] === "/") {
      pathAsArray.shift();
    }

    return baseAsArray.join("/") + pathAsArray.join("/");
  }

  var getDefaultParams = function getDefaultParams() {
    return {
      bootstrap: true,
      onReady: null,
      onError: null,
      onBeforeTrack: null,
      onAfterTrack: null,
      pageTrackerTemplate: null,
      customResourceURL: "https://www.googletagmanager.com/gtag/js",
      customPreconnectOrigin: "https://www.googletagmanager.com",
      deferScriptLoad: false,
      pageTrackerExcludedRoutes: [],
      pageTrackerEnabled: true,
      enabled: true,
      disableScriptLoad: false,
      pageTrackerScreenviewEnabled: false,
      appName: null,
      pageTrackerUseFullPath: false,
      pageTrackerPrependBase: true,
      pageTrackerSkipSamePath: true,
      globalDataLayerName: "dataLayer",
      globalObjectName: "gtag",
      defaultGroupName: "default",
      includes: null,
      config: {
        id: null,
        params: {
          send_page_view: false
        }
      }
    };
  };
  var params = {};
  var setOptions = function setOptions() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var defaultParams = getDefaultParams();
    params = mergeDeep(defaultParams, options);
  };
  var getOptions = function getOptions() {
    return params;
  };

  var query = (function () {
    var _window;

    var _getOptions = getOptions(),
        globalObjectName = _getOptions.globalObjectName;

    if (!isBrowser() || typeof window[globalObjectName] === "undefined") {
      return;
    }

    (_window = window)[globalObjectName].apply(_window, arguments);
  });

  var config = (function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _getOptions = getOptions(),
        config = _getOptions.config,
        includes = _getOptions.includes;

    query.apply(void 0, ["config", config.id].concat(args));

    if (Array.isArray(includes)) {
      includes.forEach(function (domain) {
        query.apply(void 0, ["config", domain.id].concat(args));
      });
    }
  });

  var assignGlobalProperty = function assignGlobalProperty(id, value) {
    if (!isBrowser()) {
      return;
    }

    window["ga-disable-".concat(id)] = value;
  };

  var disable = (function () {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    var _getOptions = getOptions(),
        config = _getOptions.config,
        includes = _getOptions.includes;

    assignGlobalProperty(config.id, value);

    if (Array.isArray(includes)) {
      includes.forEach(function (domain) {
        return assignGlobalProperty(domain.id, value);
      });
    }
  });

  var optOut = (function () {
    disable(true);
  });

  var optIn = (function () {
    disable(false);
  });

  var router;
  var setRouter = function setRouter(instance) {
    router = instance;
  };
  var getRouter = function getRouter() {
    return router;
  };

  var event = (function (name) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _getOptions = getOptions(),
        includes = _getOptions.includes,
        defaultGroupName = _getOptions.defaultGroupName;

    if (params.send_to == null && Array.isArray(includes) && includes.length) {
      params.send_to = includes.map(function (domain) {
        return domain.id;
      }).concat(defaultGroupName);
    }

    query("event", name, params);
  });

  var pageview = (function (param) {
    if (!isBrowser()) {
      return;
    }

    var template;

    if (typeof param === "string") {
      template = {
        page_path: param
      };
    } else if (param.path || param.fullPath) {
      var _getOptions = getOptions(),
          useFullPath = _getOptions.pageTrackerUseFullPath,
          useBase = _getOptions.pageTrackerPrependBase;

      var router = getRouter();
      var base = router && router.options.base;
      var path = useFullPath ? param.fullPath : param.path;
      template = _objectSpread2(_objectSpread2({}, param.name && {
        page_title: param.name
      }), {}, {
        page_path: useBase ? getPathWithBase(path, base) : path
      });
    } else {
      template = param;
    }

    if (template.page_location == null) {
      template.page_location = window.location.href;
    }

    if (template.send_page_view == null) {
      template.send_page_view = true;
    }

    event("page_view", template);
  });

  var screenview = (function (param) {
    var _getOptions = getOptions(),
        appName = _getOptions.appName;

    if (!param) {
      return;
    }

    var template;

    if (typeof param === "string") {
      template = {
        screen_name: param
      };
    } else {
      template = param;
    }

    template.app_name = template.app_name || appName;
    event("screen_view", template);
  });

  var exception = (function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    event.apply(void 0, ["exception"].concat(args));
  });

  var linker = (function (params) {
    config("linker", params);
  });

  var time = (function (params) {
    event("timing_complete", params);
  });

  var set = (function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    query.apply(void 0, ["set"].concat(args));
  });

  var refund = (function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    event.apply(void 0, ["refund"].concat(args));
  });

  var purchase = (function (params) {
    event("purchase", params);
  });

  var customMap = (function (map) {
    config({
      custom_map: map
    });
  });

  var api = /*#__PURE__*/Object.freeze({
    __proto__: null,
    query: query,
    config: config,
    optOut: optOut,
    optIn: optIn,
    pageview: pageview,
    screenview: screenview,
    exception: exception,
    linker: linker,
    time: time,
    set: set,
    refund: refund,
    purchase: purchase,
    customMap: customMap,
    event: event
  });

  var attachApi = function attachApi(Vue) {
    return Vue.$gtag = Vue.prototype.$gtag = api;
  };

  var registerGlobals = (function () {
    if (!isBrowser()) {
      return;
    }

    var _getOptions = getOptions(),
        enabled = _getOptions.enabled,
        globalObjectName = _getOptions.globalObjectName,
        globalDataLayerName = _getOptions.globalDataLayerName;

    if (window[globalObjectName] == null) {
      window[globalDataLayerName] = window[globalDataLayerName] || [];

      window[globalObjectName] = function () {
        window[globalDataLayerName].push(arguments);
      };
    }

    window[globalObjectName]("js", new Date());

    if (!enabled) {
      optOut();
    }

    return window[globalObjectName];
  });

  var mergeDefaultParams = function mergeDefaultParams(params) {
    return _objectSpread2({
      send_page_view: false
    }, params);
  };

  var addConfiguration = (function () {
    var _getOptions = getOptions(),
        config = _getOptions.config,
        includes = _getOptions.includes;

    query("config", config.id, mergeDefaultParams(config.params));

    if (Array.isArray(includes)) {
      includes.forEach(function (domain) {
        query("config", domain.id, mergeDefaultParams(domain.params));
      });
    }
  });

  var track = (function () {
    var to = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _getOptions = getOptions(),
        appName = _getOptions.appName,
        proxy = _getOptions.pageTrackerTemplate,
        useScreenview = _getOptions.pageTrackerScreenviewEnabled,
        skipSamePath = _getOptions.pageTrackerSkipSamePath;

    if (skipSamePath && to.path === from.path) {
      return;
    }

    var template = to;

    if (isFn(proxy)) {
      template = proxy(to, from);
    } else if (useScreenview) {
      template = validateScreenviewShape({
        app_name: appName,
        screen_name: to.name
      });
    }

    if (useScreenview) {
      screenview(template);
      return;
    }

    pageview(template);
  });

  var isRouteExcluded = function isRouteExcluded(route) {
    var _getOptions = getOptions(),
        routes = _getOptions.pageTrackerExcludedRoutes;

    return routes.includes(route.path) || routes.includes(route.name);
  };

  var addRoutesTracker = (function () {
    var _getOptions2 = getOptions(),
        onBeforeTrack = _getOptions2.onBeforeTrack,
        onAfterTrack = _getOptions2.onAfterTrack;

    var router = getRouter();
    router.onReady(function () {
      Vue.nextTick().then(function () {
        var currentRoute = router.currentRoute;
        addConfiguration();

        if (isRouteExcluded(currentRoute)) {
          return;
        }

        track(currentRoute);
      });
      router.afterEach(function (to, from) {
        Vue.nextTick().then(function () {
          if (isRouteExcluded(to)) {
            return;
          }

          if (isFn(onBeforeTrack)) {
            onBeforeTrack(to, from);
          }

          track(to, from);

          if (isFn(onAfterTrack)) {
            onAfterTrack(to, from);
          }
        });
      });
    });
  });

  var bootstrap = (function () {
    var _getOptions = getOptions(),
        onReady = _getOptions.onReady,
        onError = _getOptions.onError,
        globalObjectName = _getOptions.globalObjectName,
        globalDataLayerName = _getOptions.globalDataLayerName,
        config = _getOptions.config,
        customResourceURL = _getOptions.customResourceURL,
        customPreconnectOrigin = _getOptions.customPreconnectOrigin,
        deferScriptLoad = _getOptions.deferScriptLoad,
        pageTrackerEnabled = _getOptions.pageTrackerEnabled,
        disableScriptLoad = _getOptions.disableScriptLoad;

    var isPageTrackerEnabled = Boolean(pageTrackerEnabled && getRouter());
    registerGlobals();

    if (isPageTrackerEnabled) {
      addRoutesTracker();
    } else {
      addConfiguration();
    }

    if (disableScriptLoad) {
      return;
    }

    return load("".concat(customResourceURL, "?id=").concat(config.id, "&l=").concat(globalDataLayerName), {
      preconnectOrigin: customPreconnectOrigin,
      defer: deferScriptLoad
    }).then(function () {
      if (onReady) {
        onReady(window[globalObjectName]);
      }
    }).catch(function (error) {
      if (onError) {
        onError(error);
      }

      return error;
    });
  });

  var install = function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var router = arguments.length > 2 ? arguments[2] : undefined;
    attachApi(Vue);
    setOptions(options);
    setRouter(router);

    if (getOptions().bootstrap) {
      bootstrap();
    }
  };

  exports.addRoutesTracker = addRoutesTracker;
  exports.bootstrap = bootstrap;
  exports.config = config;
  exports.customMap = customMap;
  exports.default = install;
  exports.event = event;
  exports.exception = exception;
  exports.install = install;
  exports.linker = linker;
  exports.optIn = optIn;
  exports.optOut = optOut;
  exports.pageview = pageview;
  exports.purchase = purchase;
  exports.query = query;
  exports.refund = refund;
  exports.screenview = screenview;
  exports.set = set;
  exports.setOptions = setOptions;
  exports.setRouter = setRouter;
  exports.time = time;

  Object.defineProperty(exports, '__esModule', { value: true });
  return exports
})({}, Vue);
