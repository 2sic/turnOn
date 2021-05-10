/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/conditions/condition-maker.ts":
/*!*******************************************!*\
  !*** ./src/conditions/condition-maker.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ConditionMaker\": () => /* binding */ ConditionMaker\n/* harmony export */ });\n/* harmony import */ var _status__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./status */ \"./src/conditions/status.ts\");\n\r\n/**\r\n * Internal class to generate is-it-ready checkers\r\n */\r\nvar ConditionMaker = /** @class */ (function () {\r\n    function ConditionMaker() {\r\n    }\r\n    /**\r\n     * Make a new condition checker\r\n     */\r\n    ConditionMaker.prototype.make = function (condition) {\r\n        if (typeof (condition) === 'function')\r\n            return this.fnChecker(condition);\r\n        if (typeof (condition) === 'string')\r\n            return this.keyChecker(condition);\r\n    };\r\n    ConditionMaker.prototype.fnChecker = function (fn) {\r\n        var name = fn.toString();\r\n        if (name && name.length > 25)\r\n            name = name.substr(0, 25);\r\n        return function () {\r\n            return {\r\n                name: name,\r\n                ready: fn(),\r\n                message: ''\r\n            };\r\n        };\r\n    };\r\n    /**\r\n     * Create a checker which verifies if a key or key-sequence on window exists\r\n     * @param key\r\n     */\r\n    ConditionMaker.prototype.keyChecker = function (key) {\r\n        // empty-ish strings - always say it's done\r\n        if (!key)\r\n            return function () { return new _status__WEBPACK_IMPORTED_MODULE_0__.Status(true, 'empty key', key); };\r\n        var parts = key.split('.');\r\n        if (parts.length > 0 && parts[0] == 'window')\r\n            parts.shift();\r\n        if (parts.length == 0)\r\n            return function () { return new _status__WEBPACK_IMPORTED_MODULE_0__.Status(true, 'no keys except maybe windows found', key); };\r\n        return function () {\r\n            // eslint-disable-next-line @typescript-eslint/no-explicit-any\r\n            var parent = window;\r\n            var match = 'window';\r\n            for (var i = 0; i < parts.length; i++) {\r\n                var part = parts[i];\r\n                parent = parent[part];\r\n                // if node not found, stop checking\r\n                if (!parent)\r\n                    break;\r\n                // found, so let's add to list of successful matches\r\n                match += '.' + part;\r\n                // if we got to the end, it's good\r\n                if (i == parts.length - 1)\r\n                    return new _status__WEBPACK_IMPORTED_MODULE_0__.Status(true, 'all keys matched', key);\r\n            }\r\n            return new _status__WEBPACK_IMPORTED_MODULE_0__.Status(false, \"Not all keys matched yet. So far '\" + match + \"' worked.\", key);\r\n        };\r\n    };\r\n    return ConditionMaker;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://turn-on/./src/conditions/condition-maker.ts?");

/***/ }),

/***/ "./src/conditions/condition-type.ts":
/*!******************************************!*\
  !*** ./src/conditions/condition-type.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\r\n\n\n//# sourceURL=webpack://turn-on/./src/conditions/condition-type.ts?");

/***/ }),

/***/ "./src/conditions/index.ts":
/*!*********************************!*\
  !*** ./src/conditions/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Status\": () => /* reexport safe */ _status__WEBPACK_IMPORTED_MODULE_1__.Status,\n/* harmony export */   \"ConditionMaker\": () => /* reexport safe */ _condition_maker__WEBPACK_IMPORTED_MODULE_2__.ConditionMaker\n/* harmony export */ });\n/* harmony import */ var _condition_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./condition-type */ \"./src/conditions/condition-type.ts\");\n/* harmony import */ var _status__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./status */ \"./src/conditions/status.ts\");\n/* harmony import */ var _condition_maker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./condition-maker */ \"./src/conditions/condition-maker.ts\");\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://turn-on/./src/conditions/index.ts?");

/***/ }),

/***/ "./src/conditions/status.ts":
/*!**********************************!*\
  !*** ./src/conditions/status.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Status\": () => /* binding */ Status\n/* harmony export */ });\nvar nameNotDefined = 'not set';\r\nvar Status = /** @class */ (function () {\r\n    function Status(\r\n    /** Status if the check has been successful */\r\n    ready, \r\n    /** Status message if provided */\r\n    message, \r\n    /** name of this status, to better point to which rule failed */\r\n    name) {\r\n        if (name === void 0) { name = nameNotDefined; }\r\n        this.ready = ready;\r\n        this.message = message;\r\n        this.name = name;\r\n        /** Amount of attempts tried till this  */\r\n        this.attempts = 0;\r\n    }\r\n    return Status;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://turn-on/./src/conditions/status.ts?");

/***/ }),

/***/ "./src/config-tags/config-in-tag.ts":
/*!******************************************!*\
  !*** ./src/config-tags/config-in-tag.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\r\n\n\n//# sourceURL=webpack://turn-on/./src/config-tags/config-in-tag.ts?");

/***/ }),

/***/ "./src/config-tags/config-tag-manager.ts":
/*!***********************************************!*\
  !*** ./src/config-tags/config-tag-manager.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ConfigTagManager\": () => /* binding */ ConfigTagManager\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ \"./src/index.ts\");\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! . */ \"./src/config-tags/index.ts\");\n\r\n\r\nvar ConfigTagManager = /** @class */ (function () {\r\n    function ConfigTagManager(root) {\r\n        this.root = root;\r\n        this.tags = new Array();\r\n    }\r\n    ConfigTagManager.prototype.tryToLoadTag = function (node) {\r\n        var _a, _b;\r\n        // Get config and skip if not relevant, or skip if already marked as in the queue\r\n        var attr = (_a = node === null || node === void 0 ? void 0 : node.getAttribute) === null || _a === void 0 ? void 0 : _a.call(node, ___WEBPACK_IMPORTED_MODULE_0__.attrConfig);\r\n        if (!attr)\r\n            return;\r\n        var skip = (_b = node === null || node === void 0 ? void 0 : node.getAttribute) === null || _b === void 0 ? void 0 : _b.call(node, ___WEBPACK_IMPORTED_MODULE_0__.attrSkip);\r\n        (0,___WEBPACK_IMPORTED_MODULE_0__.log)('skip', skip);\r\n        if (skip)\r\n            return (0,___WEBPACK_IMPORTED_MODULE_0__.log)('skip');\r\n        (0,___WEBPACK_IMPORTED_MODULE_0__.log)('attr', attr);\r\n        var configOrError = (0,___WEBPACK_IMPORTED_MODULE_1__.loadConfigurationFromString)(attr);\r\n        if (typeof (configOrError) === 'string') {\r\n            console.error(configOrError, node, attr);\r\n            return;\r\n        }\r\n        (0,___WEBPACK_IMPORTED_MODULE_0__.log)('stable config');\r\n        this.add(node, configOrError);\r\n    };\r\n    /**\r\n     *\r\n     */\r\n    ConfigTagManager.prototype.add = function (node, config) {\r\n        (0,___WEBPACK_IMPORTED_MODULE_0__.log)('add', node, config);\r\n        var tag = new ___WEBPACK_IMPORTED_MODULE_1__.ConfigTag(node, config);\r\n        this.tags.push(tag);\r\n        this.convertConfigToTurnOn(tag);\r\n    };\r\n    ConfigTagManager.prototype.convertConfigToTurnOn = function (tag) {\r\n        var config = tag.config;\r\n        (0,___WEBPACK_IMPORTED_MODULE_0__.log)('convert to turnon');\r\n        var turnOn = this.root.new().await(config.await);\r\n        tag.progress('2-watching');\r\n        turnOn.then(function () {\r\n            var key = config.run;\r\n            (0,___WEBPACK_IMPORTED_MODULE_0__.log)('turn on success - will try to run ' + key);\r\n            tag.progress('3-running');\r\n            if (!key.endsWith('()'))\r\n                tag.error(\"run should end with () but doesn't - can't continue\");\r\n            key = key.substr(0, key.length - 2);\r\n            var parts = key.split('.');\r\n            if (parts.length > 0 && parts[0] == 'window')\r\n                parts.shift();\r\n            // eslint-disable-next-line @typescript-eslint/no-explicit-any\r\n            var current = window;\r\n            var match = 'window';\r\n            for (var i = 0; i < parts.length; i++) {\r\n                var part = parts[i];\r\n                current = current[part];\r\n                // found, so let's add to list of successful matches\r\n                match += '.' + part;\r\n                // if node not found, stop checking\r\n                if (!current)\r\n                    tag.error(\"Tried to find object parts for \" + match + \" but didn't get anything.\");\r\n            }\r\n            if (typeof (current) != 'function')\r\n                tag.error(\"Got \" + match + \" but it's not a function\");\r\n            // now run it!\r\n            current();\r\n            tag.progress('4-completed');\r\n        });\r\n        return turnOn;\r\n    };\r\n    ConfigTagManager.prototype.updateTags = function () {\r\n        (0,___WEBPACK_IMPORTED_MODULE_0__.log)(\"updateTags: \" + this.tags.length);\r\n        this.tags.forEach(function (t) { return t.syncDom(); });\r\n    };\r\n    return ConfigTagManager;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://turn-on/./src/config-tags/config-tag-manager.ts?");

/***/ }),

/***/ "./src/config-tags/config-tag.ts":
/*!***************************************!*\
  !*** ./src/config-tags/config-tag.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ConfigTag\": () => /* binding */ ConfigTag\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ \"./src/index.ts\");\n/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../debug */ \"./src/debug.ts\");\n\r\n\r\nvar ConfigTag = /** @class */ (function () {\r\n    function ConfigTag(tag, config, turnOn) {\r\n        this.tag = tag;\r\n        this.config = config;\r\n        this.turnOn = turnOn;\r\n        this.syncDom();\r\n    }\r\n    ConfigTag.prototype.syncDom = function () {\r\n        (0,_debug__WEBPACK_IMPORTED_MODULE_1__.log)('syncDom', this);\r\n        var tag = this.tag;\r\n        // set skip if missing and update json in html if not current\r\n        // Do these checks to avoid to many DOM changes\r\n        if (!tag.getAttribute(___WEBPACK_IMPORTED_MODULE_0__.attrSkip))\r\n            tag.setAttribute(___WEBPACK_IMPORTED_MODULE_0__.attrSkip, \"skip\");\r\n        var currentSerialized = JSON.stringify(this.config);\r\n        if (tag.getAttribute(___WEBPACK_IMPORTED_MODULE_0__.attrConfig) !== currentSerialized)\r\n            tag.setAttribute(___WEBPACK_IMPORTED_MODULE_0__.attrConfig, currentSerialized);\r\n    };\r\n    ConfigTag.prototype.progress = function (prog) {\r\n        this.config.progress = prog;\r\n        this.syncDom();\r\n    };\r\n    ConfigTag.prototype.error = function (err) {\r\n        this.config.progress = '9-failed';\r\n        this.config.error = err;\r\n        this.syncDom();\r\n        throw this.config.error;\r\n    };\r\n    return ConfigTag;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://turn-on/./src/config-tags/config-tag.ts?");

/***/ }),

/***/ "./src/config-tags/configuration-stable.ts":
/*!*************************************************!*\
  !*** ./src/config-tags/configuration-stable.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loadConfigurationFromString\": () => /* binding */ loadConfigurationFromString\n/* harmony export */ });\n/* harmony import */ var _configuration_configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../configuration/configuration */ \"./src/configuration/configuration.ts\");\n\r\nfunction loadConfigurationFromString(attr) {\r\n    var pretyped;\r\n    try {\r\n        pretyped = JSON.parse(attr);\r\n    }\r\n    catch (ex) {\r\n        return \"detected configuration but cannot parse to json.\";\r\n    }\r\n    var configuration;\r\n    try {\r\n        configuration = (0,_configuration_configuration__WEBPACK_IMPORTED_MODULE_0__.stabilizeConfiguration)(pretyped);\r\n    }\r\n    catch (ex) {\r\n        configuration = null;\r\n    }\r\n    if (configuration == null)\r\n        return \"loaded configuration but couldn't make sense of it.\";\r\n    return configuration;\r\n}\r\n\n\n//# sourceURL=webpack://turn-on/./src/config-tags/configuration-stable.ts?");

/***/ }),

/***/ "./src/config-tags/index.ts":
/*!**********************************!*\
  !*** ./src/config-tags/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ConfigTag\": () => /* reexport safe */ _config_tag__WEBPACK_IMPORTED_MODULE_0__.ConfigTag,\n/* harmony export */   \"loadConfigurationFromString\": () => /* reexport safe */ _configuration_stable__WEBPACK_IMPORTED_MODULE_2__.loadConfigurationFromString,\n/* harmony export */   \"ConfigTagManager\": () => /* reexport safe */ _config_tag_manager__WEBPACK_IMPORTED_MODULE_3__.ConfigTagManager\n/* harmony export */ });\n/* harmony import */ var _config_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config-tag */ \"./src/config-tags/config-tag.ts\");\n/* harmony import */ var _config_in_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-in-tag */ \"./src/config-tags/config-in-tag.ts\");\n/* harmony import */ var _configuration_stable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./configuration-stable */ \"./src/config-tags/configuration-stable.ts\");\n/* harmony import */ var _config_tag_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config-tag-manager */ \"./src/config-tags/config-tag-manager.ts\");\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://turn-on/./src/config-tags/index.ts?");

/***/ }),

/***/ "./src/configuration/configuration.ts":
/*!********************************************!*\
  !*** ./src/configuration/configuration.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"stabilizeConfiguration\": () => /* binding */ stabilizeConfiguration\n/* harmony export */ });\nfunction stabilizeConfiguration(raw) {\r\n    if (!raw)\r\n        return null;\r\n    if (!raw.run)\r\n        return null;\r\n    var awaits = Array.isArray(raw.await)\r\n        ? raw.await\r\n        : raw.await\r\n            ? [raw.await]\r\n            : [];\r\n    // also always await the run command, but without the () as it shouldn't be called to detect if it's ready\r\n    awaits.push(raw.run.endsWith('()') ? raw.run.substring(0, raw.run.length - 2) : raw.run);\r\n    var stable = {\r\n        await: awaits,\r\n        run: raw.run,\r\n        progress: '1-loaded',\r\n    };\r\n    return stable;\r\n}\r\n\n\n//# sourceURL=webpack://turn-on/./src/configuration/configuration.ts?");

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"attrConfig\": () => /* binding */ attrConfig,\n/* harmony export */   \"attrSkip\": () => /* binding */ attrSkip\n/* harmony export */ });\nvar attrConfig = 'turn-on';\r\nvar attrSkip = 'turn-on-skip';\r\n\n\n//# sourceURL=webpack://turn-on/./src/constants.ts?");

/***/ }),

/***/ "./src/debug.ts":
/*!**********************!*\
  !*** ./src/debug.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"log\": () => /* binding */ log\n/* harmony export */ });\nvar debug = true;\r\nfunction log(message, obj1, obj2) {\r\n    if (!debug)\r\n        return;\r\n    if (obj2)\r\n        console.log('turn-on: ' + message, obj1, obj2);\r\n    else if (obj1)\r\n        console.log('turn-on: ' + message, obj1);\r\n    else\r\n        console.log('turn-on: ' + message);\r\n}\r\n\n\n//# sourceURL=webpack://turn-on/./src/debug.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"attrConfig\": () => /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.attrConfig,\n/* harmony export */   \"attrSkip\": () => /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.attrSkip,\n/* harmony export */   \"log\": () => /* reexport safe */ _debug__WEBPACK_IMPORTED_MODULE_1__.log,\n/* harmony export */   \"ConditionMaker\": () => /* reexport safe */ _conditions__WEBPACK_IMPORTED_MODULE_2__.ConditionMaker,\n/* harmony export */   \"Status\": () => /* reexport safe */ _conditions__WEBPACK_IMPORTED_MODULE_2__.Status,\n/* harmony export */   \"ConfigTag\": () => /* reexport safe */ _config_tags__WEBPACK_IMPORTED_MODULE_3__.ConfigTag,\n/* harmony export */   \"ConfigTagManager\": () => /* reexport safe */ _config_tags__WEBPACK_IMPORTED_MODULE_3__.ConfigTagManager,\n/* harmony export */   \"loadConfigurationFromString\": () => /* reexport safe */ _config_tags__WEBPACK_IMPORTED_MODULE_3__.loadConfigurationFromString,\n/* harmony export */   \"TurnOnLoader\": () => /* reexport safe */ _loader__WEBPACK_IMPORTED_MODULE_4__.TurnOnLoader\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\n/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debug */ \"./src/debug.ts\");\n/* harmony import */ var _conditions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./conditions */ \"./src/conditions/index.ts\");\n/* harmony import */ var _config_tags__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config-tags */ \"./src/config-tags/index.ts\");\n/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./loader */ \"./src/loader/index.ts\");\n/* harmony import */ var _turnOn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./turnOn */ \"./src/turnOn/index.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\nvar win = window;\r\nif (!win.turnOn)\r\n    win.turnOn = new _turnOn__WEBPACK_IMPORTED_MODULE_5__.TurnOnRoot();\r\nvar turnOn = win.turnOn;\r\nturnOn.loader.activateObserver();\r\n\n\n//# sourceURL=webpack://turn-on/./src/index.ts?");

/***/ }),

/***/ "./src/loader/index.ts":
/*!*****************************!*\
  !*** ./src/loader/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TurnOnLoader\": () => /* reexport safe */ _loader__WEBPACK_IMPORTED_MODULE_0__.TurnOnLoader\n/* harmony export */ });\n/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader */ \"./src/loader/loader.ts\");\n\r\n\n\n//# sourceURL=webpack://turn-on/./src/loader/index.ts?");

/***/ }),

/***/ "./src/loader/loader.ts":
/*!******************************!*\
  !*** ./src/loader/loader.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TurnOnLoader\": () => /* binding */ TurnOnLoader\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ \"./src/index.ts\");\n\r\n/**\r\n * Options for the observer (which mutations to observe)\r\n */\r\nvar config = {\r\n    attributes: false,\r\n    childList: true,\r\n    subtree: true\r\n};\r\n/**\r\n * In charge of loading all turn-on tags from the DOM, both at first load as well as on DOM changes\r\n */\r\nvar TurnOnLoader = /** @class */ (function () {\r\n    function TurnOnLoader(root, tagManager) {\r\n        this.root = root;\r\n        this.tagManager = tagManager;\r\n        this.scanExistingDom();\r\n    }\r\n    TurnOnLoader.prototype.scanExistingDom = function () {\r\n        var _this = this;\r\n        (0,___WEBPACK_IMPORTED_MODULE_0__.log)('scanExistingDom');\r\n        var tags = document.querySelectorAll(\"[turn-on]\");\r\n        (0,___WEBPACK_IMPORTED_MODULE_0__.log)('tags:', tags);\r\n        tags.forEach(function (t) { return _this.tagManager.tryToLoadTag(t); });\r\n    };\r\n    TurnOnLoader.prototype.activateObserver = function () {\r\n        var _this = this;\r\n        (0,___WEBPACK_IMPORTED_MODULE_0__.log)('load');\r\n        var observer = new MutationObserver(function (mutations) {\r\n            (0,___WEBPACK_IMPORTED_MODULE_0__.log)('turnOn mutation');\r\n            // Loop through each changed item, check if it's something we want to initialize\r\n            mutations.forEach(function (m) {\r\n                // Nodes added - let's check if it is a turn-on\r\n                if (m.type != 'childList')\r\n                    return;\r\n                (0,___WEBPACK_IMPORTED_MODULE_0__.log)('hit children');\r\n                m.addedNodes.forEach(function (node) { return _this.tagManager.tryToLoadTag(node); });\r\n            });\r\n        });\r\n        // observe document for tags which include this. ATM don't observe header\r\n        observer.observe(document.documentElement, config);\r\n    };\r\n    return TurnOnLoader;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://turn-on/./src/loader/loader.ts?");

/***/ }),

/***/ "./src/turnOn/index.ts":
/*!*****************************!*\
  !*** ./src/turnOn/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"IsLoaded\": () => /* reexport safe */ _is_loaded__WEBPACK_IMPORTED_MODULE_0__.IsLoaded,\n/* harmony export */   \"DefaultSettings\": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_1__.DefaultSettings,\n/* harmony export */   \"FailReject\": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_1__.FailReject,\n/* harmony export */   \"FailResolve\": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_1__.FailResolve,\n/* harmony export */   \"FailSilent\": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_1__.FailSilent,\n/* harmony export */   \"LogDebug\": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_1__.LogDebug,\n/* harmony export */   \"LogError\": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_1__.LogError,\n/* harmony export */   \"LogSilent\": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_1__.LogSilent,\n/* harmony export */   \"Settings\": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_1__.Settings,\n/* harmony export */   \"Status\": () => /* reexport safe */ _conditions_status__WEBPACK_IMPORTED_MODULE_2__.Status,\n/* harmony export */   \"StatusSummary\": () => /* reexport safe */ _status_summary__WEBPACK_IMPORTED_MODULE_3__.StatusSummary,\n/* harmony export */   \"TurnOn\": () => /* reexport safe */ _turn_on__WEBPACK_IMPORTED_MODULE_4__.TurnOn,\n/* harmony export */   \"TurnOnRoot\": () => /* reexport safe */ _turn_on_root__WEBPACK_IMPORTED_MODULE_5__.TurnOnRoot\n/* harmony export */ });\n/* harmony import */ var _is_loaded__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-loaded */ \"./src/turnOn/is-loaded.ts\");\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings */ \"./src/turnOn/settings.ts\");\n/* harmony import */ var _conditions_status__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../conditions/status */ \"./src/conditions/status.ts\");\n/* harmony import */ var _status_summary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./status-summary */ \"./src/turnOn/status-summary.ts\");\n/* harmony import */ var _turn_on__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./turn-on */ \"./src/turnOn/turn-on.ts\");\n/* harmony import */ var _turn_on_root__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./turn-on-root */ \"./src/turnOn/turn-on-root.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://turn-on/./src/turnOn/index.ts?");

/***/ }),

/***/ "./src/turnOn/is-loaded.ts":
/*!*********************************!*\
  !*** ./src/turnOn/is-loaded.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"IsLoaded\": () => /* binding */ IsLoaded\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/turnOn/index.ts\");\nvar __assign = (undefined && undefined.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\n\r\nvar IsLoaded = /** @class */ (function () {\r\n    function IsLoaded(checkFunction, settings) {\r\n        this.lastStatus = new ___WEBPACK_IMPORTED_MODULE_0__.Status(false, 'condition not checked yet');\r\n        this.attempts = 0;\r\n        this.innerCheck = checkFunction;\r\n        this.settings = settings;\r\n    }\r\n    /**\r\n     * Dummy innerCheck function - should be replaced in the constructor\r\n     */\r\n    IsLoaded.prototype.innerCheck = function () { return new ___WEBPACK_IMPORTED_MODULE_0__.Status(true, 'no condition defined'); };\r\n    ;\r\n    IsLoaded.prototype.check = function () {\r\n        if (this.lastStatus.ready)\r\n            return this.lastStatus;\r\n        // check and store\r\n        this.lastStatus = this.innerCheck();\r\n        return this.lastStatus;\r\n    };\r\n    IsLoaded.prototype.asPromise = function () {\r\n        // eslint-disable-next-line @typescript-eslint/no-this-alias\r\n        var parent = this;\r\n        var checkCondition = function (resolve, reject) {\r\n            // If the condition is met, we're done! \r\n            var result = parent.check();\r\n            // if all is ok (true) then complete the promise\r\n            if (result.ready) {\r\n                resolve(__assign(__assign({}, result), { attempts: parent.attempts }));\r\n                return;\r\n            }\r\n            if (parent.attempts++ >= parent.settings.attempts) {\r\n                resolve(__assign(__assign({}, result), { message: 'tried up to max attempts: ' + result.message, attempts: parent.attempts }));\r\n                return;\r\n            }\r\n            // If the condition isn't met but the timeout hasn't elapsed, go again\r\n            setTimeout(checkCondition, parent.settings.interval, resolve, reject);\r\n        };\r\n        return new Promise(checkCondition);\r\n    };\r\n    return IsLoaded;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://turn-on/./src/turnOn/is-loaded.ts?");

/***/ }),

/***/ "./src/turnOn/promise-boolean-to-status.ts":
/*!*************************************************!*\
  !*** ./src/turnOn/promise-boolean-to-status.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"promiseBoolToStatus\": () => /* binding */ promiseBoolToStatus\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/turnOn/index.ts\");\n\r\nfunction promiseBoolToStatus(boolPromise) {\r\n    return new Promise(function (resolve, reject) {\r\n        boolPromise\r\n            .then(function (r) {\r\n            var result = r !== false;\r\n            resolve(new ___WEBPACK_IMPORTED_MODULE_0__.Status(result, 'from promise'));\r\n        })\r\n            .catch(function (reason) { return reject(reason); });\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack://turn-on/./src/turnOn/promise-boolean-to-status.ts?");

/***/ }),

/***/ "./src/turnOn/settings.ts":
/*!********************************!*\
  !*** ./src/turnOn/settings.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"LogError\": () => /* binding */ LogError,\n/* harmony export */   \"LogDebug\": () => /* binding */ LogDebug,\n/* harmony export */   \"LogSilent\": () => /* binding */ LogSilent,\n/* harmony export */   \"FailSilent\": () => /* binding */ FailSilent,\n/* harmony export */   \"FailResolve\": () => /* binding */ FailResolve,\n/* harmony export */   \"FailReject\": () => /* binding */ FailReject,\n/* harmony export */   \"Settings\": () => /* binding */ Settings,\n/* harmony export */   \"DefaultSettings\": () => /* binding */ DefaultSettings\n/* harmony export */ });\n// this must be a simple const, otherwise the anotation below with typeof won't work\r\n// https://stackoverflow.com/questions/56263200/how-to-define-string-literal-union-type-from-constants-in-typescript\r\nvar LogError = 'error';\r\nvar LogDebug = 'debug';\r\nvar LogSilent = 'silent';\r\nvar FailSilent = 'silent';\r\nvar FailResolve = 'resolve';\r\nvar FailReject = 'reject';\r\nvar Settings = /** @class */ (function () {\r\n    function Settings() {\r\n        /** the polling interval - defaults to 100 */\r\n        this.interval = 100;\r\n        /** polling attempts, defaults to 100 */\r\n        this.attempts = 100;\r\n        /** What to log into the console */\r\n        this.log = LogError;\r\n        /**\r\n         * Failure mode, if by timeout it's not successful\r\n         * - reject (default)= use promise reject (which will throw an error if not handled)\r\n         * - resolve = use promise resolve and give a status back which says it's not complete\r\n         * - silent = don't complete the promise\r\n         */\r\n        this.failure = FailReject;\r\n        /** The name of this turnOn - to better track issues */\r\n        this.name = 'turnOn';\r\n    }\r\n    return Settings;\r\n}());\r\n\r\nvar DefaultSettings = new Settings();\r\n\n\n//# sourceURL=webpack://turn-on/./src/turnOn/settings.ts?");

/***/ }),

/***/ "./src/turnOn/status-summary.ts":
/*!**************************************!*\
  !*** ./src/turnOn/status-summary.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"StatusSummary\": () => /* binding */ StatusSummary\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/turnOn/index.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\nvar StatusSummary = /** @class */ (function (_super) {\r\n    __extends(StatusSummary, _super);\r\n    function StatusSummary(details) {\r\n        var _this = this;\r\n        // no details provided, then assume ok\r\n        if (!details)\r\n            details = [];\r\n        var ready = detectIfAllOk(details);\r\n        var message = details.length === 0\r\n            ? 'no conditions provided'\r\n            : ready\r\n                ? 'all ok'\r\n                : 'some conditions did not complete';\r\n        _this = _super.call(this, ready, message, 'Summary') || this;\r\n        _this.details = details;\r\n        return _this;\r\n    }\r\n    return StatusSummary;\r\n}(___WEBPACK_IMPORTED_MODULE_0__.Status));\r\n\r\nfunction detectIfAllOk(details) {\r\n    // some kind of error appeared, shouldn't be ok\r\n    if (!Array.isArray(details))\r\n        return false;\r\n    // count if all details have a ready-state\r\n    return (details.filter(function (stat) { return stat.ready; }).length == details.length);\r\n}\r\n\n\n//# sourceURL=webpack://turn-on/./src/turnOn/status-summary.ts?");

/***/ }),

/***/ "./src/turnOn/turn-on-root.ts":
/*!************************************!*\
  !*** ./src/turnOn/turn-on-root.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TurnOnRoot\": () => /* binding */ TurnOnRoot\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/turnOn/index.ts\");\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! .. */ \"./src/index.ts\");\n/* harmony import */ var _config_tags_config_tag_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config-tags/config-tag-manager */ \"./src/config-tags/config-tag-manager.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\n\r\n\r\nvar TurnOnRoot = /** @class */ (function (_super) {\r\n    __extends(TurnOnRoot, _super);\r\n    function TurnOnRoot() {\r\n        var _this = _super.call(this) || this;\r\n        _this.tagManager = new _config_tags_config_tag_manager__WEBPACK_IMPORTED_MODULE_2__.ConfigTagManager(_this);\r\n        _this.loader = new ___WEBPACK_IMPORTED_MODULE_1__.TurnOnLoader(_this, _this.tagManager);\r\n        return _this;\r\n    }\r\n    return TurnOnRoot;\r\n}(___WEBPACK_IMPORTED_MODULE_0__.TurnOn));\r\n\r\n\n\n//# sourceURL=webpack://turn-on/./src/turnOn/turn-on-root.ts?");

/***/ }),

/***/ "./src/turnOn/turn-on.ts":
/*!*******************************!*\
  !*** ./src/turnOn/turn-on.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TurnOn\": () => /* binding */ TurnOn\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/turnOn/index.ts\");\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings */ \"./src/turnOn/settings.ts\");\n/* harmony import */ var _promise_boolean_to_status__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./promise-boolean-to-status */ \"./src/turnOn/promise-boolean-to-status.ts\");\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! .. */ \"./src/index.ts\");\nvar __assign = (undefined && undefined.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\n\r\n\r\n\r\n\r\nvar TurnOn = /** @class */ (function () {\r\n    /** Constructor with optional settings */\r\n    function TurnOn(nameOrSettings) {\r\n        /** The settings applied to this turnOn */\r\n        this.settings = new ___WEBPACK_IMPORTED_MODULE_0__.Settings();\r\n        this._conditionMaker = new ___WEBPACK_IMPORTED_MODULE_3__.ConditionMaker();\r\n        if (typeof nameOrSettings === 'string') {\r\n            nameOrSettings = {\r\n                name: nameOrSettings\r\n            };\r\n        }\r\n        if (nameOrSettings)\r\n            this.settings = __assign(__assign({}, this.settings), nameOrSettings);\r\n        TurnOn.count++;\r\n    }\r\n    /**\r\n     * Create a new turnOn object.\r\n     * Mainly usefuly in global scenarios, to give it a separate name\r\n     */\r\n    TurnOn.prototype.new = function (nameOrSettings) {\r\n        return new TurnOn(nameOrSettings);\r\n    };\r\n    TurnOn.prototype.await = function (conditions) {\r\n        var _this = this;\r\n        // re-wrap to ensure we always work with an array\r\n        var conditionsArray = (Array.isArray(conditions)) ? conditions : [conditions];\r\n        // convert conditions to promises\r\n        var loadedCheckers = conditionsArray.map(function (c) {\r\n            // do this for non-promise conditions\r\n            if (Promise.resolve(c) === c) {\r\n                return (0,_promise_boolean_to_status__WEBPACK_IMPORTED_MODULE_2__.promiseBoolToStatus)(c);\r\n            }\r\n            else {\r\n                var condition = _this._conditionMaker.make(c);\r\n                var loaded = new ___WEBPACK_IMPORTED_MODULE_0__.IsLoaded(condition, _this.settings);\r\n                return loaded.asPromise();\r\n            }\r\n        });\r\n        // keep the current turnOn-object for reference in methods\r\n        // eslint-disable-next-line @typescript-eslint/no-this-alias\r\n        var thisKs = this;\r\n        // keep count as it was on start, to ensure it doesn't change any more till we log the error\r\n        var instanceCount = TurnOn.count;\r\n        var flattened = new Promise(function (resolve, reject) {\r\n            // return a single promise for all inner promises which either fail or resolve\r\n            Promise.all(loadedCheckers).then(function (list) {\r\n                // get summary of all details infos\r\n                var summary = new ___WEBPACK_IMPORTED_MODULE_0__.StatusSummary(list);\r\n                // by default, log details about what failed\r\n                if (thisKs.settings.log === ___WEBPACK_IMPORTED_MODULE_0__.LogDebug || (!summary.ready && thisKs.settings.log !== ___WEBPACK_IMPORTED_MODULE_0__.LogSilent))\r\n                    thisKs.logStatusList(instanceCount, thisKs.settings, list);\r\n                // if all is ok, resolve now\r\n                if (summary.ready) {\r\n                    resolve(new ___WEBPACK_IMPORTED_MODULE_0__.StatusSummary(list));\r\n                    return;\r\n                }\r\n                // depending on the need, either reject/error (default) or resolve with false\r\n                switch (thisKs.settings.failure) {\r\n                    case _settings__WEBPACK_IMPORTED_MODULE_1__.FailReject:\r\n                        reject(summary);\r\n                        break;\r\n                    case _settings__WEBPACK_IMPORTED_MODULE_1__.FailResolve:\r\n                        resolve(summary);\r\n                        break;\r\n                    case _settings__WEBPACK_IMPORTED_MODULE_1__.FailSilent: return;\r\n                }\r\n            });\r\n        });\r\n        return flattened;\r\n    };\r\n    TurnOn.prototype.logStatusList = function (id, settings, statusList) {\r\n        console.log(\"turnOn #\" + id + \" \"\r\n            + (settings.name !== ___WEBPACK_IMPORTED_MODULE_0__.DefaultSettings.name ? \"\\\"\" + settings.name + \"\\\" \" : '')\r\n            + \"couldn't complete because some conditions were not met. See details: \", statusList);\r\n    };\r\n    TurnOn.count = 0;\r\n    return TurnOn;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://turn-on/./src/turnOn/turn-on.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/index.ts");
/******/ })()
;