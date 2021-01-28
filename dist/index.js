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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _turnOn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./turnOn */ \"./src/turnOn/index.ts\");\n\r\nvar win = window;\r\nif (!win.turnOn)\r\n    win.turnOn = new _turnOn__WEBPACK_IMPORTED_MODULE_0__.TurnOn();\r\n\n\n//# sourceURL=webpack://experimental-js-dynamic-loader/./src/index.ts?");

/***/ }),

/***/ "./src/turnOn/condition-maker.ts":
/*!***************************************!*\
  !*** ./src/turnOn/condition-maker.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ConditionMaker\": () => /* binding */ ConditionMaker\n/* harmony export */ });\n/* harmony import */ var _status__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./status */ \"./src/turnOn/status.ts\");\n\r\nvar ConditionMaker = /** @class */ (function () {\r\n    function ConditionMaker() {\r\n    }\r\n    ConditionMaker.prototype.generate = function (condition) {\r\n        if (typeof (condition) === 'function')\r\n            return this.fnChecker(condition);\r\n        if (typeof (condition) === 'string')\r\n            return this.keyChecker(condition);\r\n    };\r\n    ConditionMaker.prototype.fnChecker = function (fn) {\r\n        var name = fn.toString();\r\n        if (name && name.length > 25)\r\n            name = name.substr(0, 25);\r\n        return function () {\r\n            return {\r\n                name: name,\r\n                ready: fn(),\r\n                message: ''\r\n            };\r\n        };\r\n    };\r\n    /**\r\n     * Create a checker which verifies if a key or key-sequence on window exists\r\n     * @param key\r\n     */\r\n    ConditionMaker.prototype.keyChecker = function (key) {\r\n        // empty-ish strings - always say it's done\r\n        if (!key)\r\n            return function () { return new _status__WEBPACK_IMPORTED_MODULE_0__.Status(true, 'empty key', key); };\r\n        var parts = key.split('.');\r\n        if (parts.length > 0 && parts[0] == 'window')\r\n            parts.shift();\r\n        if (parts.length == 0)\r\n            return function () { return new _status__WEBPACK_IMPORTED_MODULE_0__.Status(true, 'no keys except maybe windows found', key); };\r\n        return function () {\r\n            var parent = window;\r\n            var match = 'window';\r\n            for (var i = 0; i < parts.length; i++) {\r\n                var part = parts[i];\r\n                parent = parent[part];\r\n                // if node not found, stop checking\r\n                if (!parent)\r\n                    break;\r\n                // found, so let's add to list of successful matches\r\n                match += '.' + part;\r\n                // if we got to the end, it's good\r\n                if (i == parts.length - 1)\r\n                    return new _status__WEBPACK_IMPORTED_MODULE_0__.Status(true, 'all keys matched', key);\r\n            }\r\n            return new _status__WEBPACK_IMPORTED_MODULE_0__.Status(false, \"Not all keys matched yet. So far '\" + match + \"' worked.\", key);\r\n        };\r\n    };\r\n    return ConditionMaker;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://experimental-js-dynamic-loader/./src/turnOn/condition-maker.ts?");

/***/ }),

/***/ "./src/turnOn/condition-type.ts":
/*!**************************************!*\
  !*** ./src/turnOn/condition-type.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\r\n\n\n//# sourceURL=webpack://experimental-js-dynamic-loader/./src/turnOn/condition-type.ts?");

/***/ }),

/***/ "./src/turnOn/index.ts":
/*!*****************************!*\
  !*** ./src/turnOn/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ConditionMaker\": () => /* reexport safe */ _condition_maker__WEBPACK_IMPORTED_MODULE_1__.ConditionMaker,\n/* harmony export */   \"TurnOn\": () => /* reexport safe */ _turn_on__WEBPACK_IMPORTED_MODULE_2__.TurnOn,\n/* harmony export */   \"IsLoaded\": () => /* reexport safe */ _is_loaded__WEBPACK_IMPORTED_MODULE_3__.IsLoaded,\n/* harmony export */   \"DefaultSettings\": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_4__.DefaultSettings,\n/* harmony export */   \"FailReject\": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_4__.FailReject,\n/* harmony export */   \"FailResolve\": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_4__.FailResolve,\n/* harmony export */   \"FailSilent\": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_4__.FailSilent,\n/* harmony export */   \"LogDebug\": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_4__.LogDebug,\n/* harmony export */   \"LogError\": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_4__.LogError,\n/* harmony export */   \"LogSilent\": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_4__.LogSilent,\n/* harmony export */   \"Settings\": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_4__.Settings,\n/* harmony export */   \"Status\": () => /* reexport safe */ _status__WEBPACK_IMPORTED_MODULE_5__.Status,\n/* harmony export */   \"StatusSummary\": () => /* reexport safe */ _status_summary__WEBPACK_IMPORTED_MODULE_6__.StatusSummary\n/* harmony export */ });\n/* harmony import */ var _condition_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./condition-type */ \"./src/turnOn/condition-type.ts\");\n/* harmony import */ var _condition_maker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./condition-maker */ \"./src/turnOn/condition-maker.ts\");\n/* harmony import */ var _turn_on__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./turn-on */ \"./src/turnOn/turn-on.ts\");\n/* harmony import */ var _is_loaded__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./is-loaded */ \"./src/turnOn/is-loaded.ts\");\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./settings */ \"./src/turnOn/settings.ts\");\n/* harmony import */ var _status__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./status */ \"./src/turnOn/status.ts\");\n/* harmony import */ var _status_summary__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./status-summary */ \"./src/turnOn/status-summary.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://experimental-js-dynamic-loader/./src/turnOn/index.ts?");

/***/ }),

/***/ "./src/turnOn/is-loaded.ts":
/*!*********************************!*\
  !*** ./src/turnOn/is-loaded.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"IsLoaded\": () => /* binding */ IsLoaded\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/turnOn/index.ts\");\nvar __assign = (undefined && undefined.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\n\r\nvar IsLoaded = /** @class */ (function () {\r\n    function IsLoaded(checkFunction, settings) {\r\n        this.lastStatus = new ___WEBPACK_IMPORTED_MODULE_0__.Status(false, 'condition not checked yet');\r\n        this.attempts = 0;\r\n        this.innerCheck = checkFunction;\r\n        this.settings = settings;\r\n    }\r\n    /**\r\n     * Dummy innerCheck function - should be replaced in the constructor\r\n     */\r\n    IsLoaded.prototype.innerCheck = function () { return new ___WEBPACK_IMPORTED_MODULE_0__.Status(true, 'no condition defined'); };\r\n    ;\r\n    IsLoaded.prototype.check = function () {\r\n        if (this.lastStatus.ready)\r\n            return this.lastStatus;\r\n        // check and store\r\n        this.lastStatus = this.innerCheck();\r\n        return this.lastStatus;\r\n    };\r\n    IsLoaded.prototype.asPromise = function () {\r\n        var parent = this;\r\n        var checkCondition = function (resolve, reject) {\r\n            // If the condition is met, we're done! \r\n            var result = parent.check();\r\n            // if all is ok (true) then complete the promise\r\n            if (result.ready)\r\n                resolve(__assign(__assign({}, result), { attempts: parent.attempts }));\r\n            if (parent.attempts++ >= parent.settings.attempts) {\r\n                resolve(__assign(__assign({}, result), { message: 'tried up to max attempts: ' + result.message, attempts: parent.attempts }));\r\n                return;\r\n            }\r\n            // If the condition isn't met but the timeout hasn't elapsed, go again\r\n            setTimeout(checkCondition, parent.settings.interval, resolve, reject);\r\n        };\r\n        return new Promise(checkCondition);\r\n    };\r\n    return IsLoaded;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://experimental-js-dynamic-loader/./src/turnOn/is-loaded.ts?");

/***/ }),

/***/ "./src/turnOn/settings.ts":
/*!********************************!*\
  !*** ./src/turnOn/settings.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"LogError\": () => /* binding */ LogError,\n/* harmony export */   \"LogDebug\": () => /* binding */ LogDebug,\n/* harmony export */   \"LogSilent\": () => /* binding */ LogSilent,\n/* harmony export */   \"FailSilent\": () => /* binding */ FailSilent,\n/* harmony export */   \"FailResolve\": () => /* binding */ FailResolve,\n/* harmony export */   \"FailReject\": () => /* binding */ FailReject,\n/* harmony export */   \"Settings\": () => /* binding */ Settings,\n/* harmony export */   \"DefaultSettings\": () => /* binding */ DefaultSettings\n/* harmony export */ });\n// this must be a simple const, otherwise the anotation below with typeof won't work\r\n// https://stackoverflow.com/questions/56263200/how-to-define-string-literal-union-type-from-constants-in-typescript\r\nvar LogError = 'error';\r\nvar LogDebug = 'debug';\r\nvar LogSilent = 'silent';\r\nvar FailSilent = 'silent';\r\nvar FailResolve = 'resolve';\r\nvar FailReject = 'reject';\r\nvar Settings = /** @class */ (function () {\r\n    function Settings() {\r\n        /** the polling interval - defaults to 100 */\r\n        this.interval = 100;\r\n        /** polling attempts, defaults to 100 */\r\n        this.attempts = 30; // 100;\r\n        /** What to log into the console */\r\n        this.log = LogError;\r\n        /**\r\n         * Failure mode, if by timeout it's not successful\r\n         * - reject (default)= use promise reject (which will throw an error if not handled)\r\n         * - resolve = use promise resolve and give a status back which says it's not complete\r\n         * - silent = don't complete the promise\r\n         */\r\n        this.failure = FailReject;\r\n        /** The name of this kickstart - to better track issues */\r\n        this.name = 'kickstart';\r\n    }\r\n    return Settings;\r\n}());\r\n\r\nvar DefaultSettings = new Settings();\r\n\n\n//# sourceURL=webpack://experimental-js-dynamic-loader/./src/turnOn/settings.ts?");

/***/ }),

/***/ "./src/turnOn/status-summary.ts":
/*!**************************************!*\
  !*** ./src/turnOn/status-summary.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"StatusSummary\": () => /* binding */ StatusSummary\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/turnOn/index.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\nvar StatusSummary = /** @class */ (function (_super) {\r\n    __extends(StatusSummary, _super);\r\n    function StatusSummary(details) {\r\n        var _this = this;\r\n        // no details provided, then assume ok\r\n        if (!details)\r\n            details = [];\r\n        var ready = detectIfAllOk(details);\r\n        var message = details.length === 0\r\n            ? 'no conditions provided'\r\n            : ready\r\n                ? 'all ok'\r\n                : 'some conditions did not complete';\r\n        _this = _super.call(this, ready, message, 'Summary') || this;\r\n        _this.details = details;\r\n        return _this;\r\n    }\r\n    return StatusSummary;\r\n}(___WEBPACK_IMPORTED_MODULE_0__.Status));\r\n\r\nfunction detectIfAllOk(details) {\r\n    // some kind of error appeared, shouldn't be ok\r\n    if (!Array.isArray(details))\r\n        return false;\r\n    // count if all details have a ready-state\r\n    return (details.filter(function (stat) { return stat.ready; }).length == details.length);\r\n}\r\n\n\n//# sourceURL=webpack://experimental-js-dynamic-loader/./src/turnOn/status-summary.ts?");

/***/ }),

/***/ "./src/turnOn/status.ts":
/*!******************************!*\
  !*** ./src/turnOn/status.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Status\": () => /* binding */ Status\n/* harmony export */ });\nvar nameNotDefined = 'not set';\r\nvar Status = /** @class */ (function () {\r\n    function Status(\r\n    /** Status if the check has been successful */\r\n    ready, \r\n    /** Status message if provided */\r\n    message, \r\n    /** name of this status, to better point to which rule failed */\r\n    name) {\r\n        if (name === void 0) { name = nameNotDefined; }\r\n        this.ready = ready;\r\n        this.message = message;\r\n        this.name = name;\r\n        /** Amount of attempts tried till this  */\r\n        this.attempts = 0;\r\n    }\r\n    return Status;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://experimental-js-dynamic-loader/./src/turnOn/status.ts?");

/***/ }),

/***/ "./src/turnOn/turn-on.ts":
/*!*******************************!*\
  !*** ./src/turnOn/turn-on.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TurnOn\": () => /* binding */ TurnOn\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/turnOn/index.ts\");\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings */ \"./src/turnOn/settings.ts\");\nvar __assign = (undefined && undefined.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\n\r\n\r\nvar TurnOn = /** @class */ (function () {\r\n    /** Constructor with optional settings */\r\n    function TurnOn(nameOrSettings) {\r\n        /** The settings applied to this Kickstart */\r\n        this.settings = new ___WEBPACK_IMPORTED_MODULE_0__.Settings();\r\n        this._conditionMaker = new ___WEBPACK_IMPORTED_MODULE_0__.ConditionMaker();\r\n        if (typeof nameOrSettings === 'string') {\r\n            nameOrSettings = {\r\n                name: nameOrSettings\r\n            };\r\n        }\r\n        if (nameOrSettings)\r\n            this.settings = __assign(__assign({}, this.settings), nameOrSettings);\r\n        TurnOn.count++;\r\n    }\r\n    /**\r\n     * Create a new kickstart object.\r\n     * Mainly usefuly in global scenarios, to give it a separate name\r\n     */\r\n    TurnOn.prototype.new = function (nameOrSettings) {\r\n        return new TurnOn(nameOrSettings);\r\n    };\r\n    TurnOn.prototype.await = function (conditions) {\r\n        var _this = this;\r\n        // re-wrap to ensure we always work with an array\r\n        var conditionsArray = (Array.isArray(conditions)) ? conditions : [conditions];\r\n        // convert conditions to promises\r\n        var loadedCheckers = conditionsArray.map(function (c) {\r\n            var condition = _this._conditionMaker.generate(c);\r\n            var loaded = new ___WEBPACK_IMPORTED_MODULE_0__.IsLoaded(condition, _this.settings);\r\n            return loaded.asPromise();\r\n        });\r\n        // keep the current kickstart-object for reference in methods\r\n        var thisKs = this;\r\n        // keep count as it was on start, to ensure it doesn't change any more till we log the error\r\n        var instanceCount = TurnOn.count;\r\n        var flattened = new Promise(function (resolve, reject) {\r\n            // return a single promise for all inner promises which either fail or resolve\r\n            Promise.all(loadedCheckers).then(function (list) {\r\n                // get summary of all details infos\r\n                var summary = new ___WEBPACK_IMPORTED_MODULE_0__.StatusSummary(list);\r\n                // by default, log details about what failed\r\n                if (thisKs.settings.log === ___WEBPACK_IMPORTED_MODULE_0__.LogDebug || (!summary.ready && thisKs.settings.log !== ___WEBPACK_IMPORTED_MODULE_0__.LogSilent))\r\n                    thisKs.logStatusList(instanceCount, thisKs.settings, list);\r\n                // if all is ok, resolve now\r\n                if (summary.ready) {\r\n                    resolve(new ___WEBPACK_IMPORTED_MODULE_0__.StatusSummary(list));\r\n                    return;\r\n                }\r\n                // depending on the need, either reject/error (default) or resolve with false\r\n                switch (thisKs.settings.failure) {\r\n                    case _settings__WEBPACK_IMPORTED_MODULE_1__.FailReject: reject(summary);\r\n                    case _settings__WEBPACK_IMPORTED_MODULE_1__.FailResolve: resolve(summary);\r\n                    case _settings__WEBPACK_IMPORTED_MODULE_1__.FailSilent: return;\r\n                }\r\n            });\r\n        });\r\n        return flattened;\r\n    };\r\n    TurnOn.prototype.logStatusList = function (id, settings, statusList) {\r\n        console.log(\"Kickstart #\" + id + \" \"\r\n            + (settings.name !== ___WEBPACK_IMPORTED_MODULE_0__.DefaultSettings.name ? \"\\\"\" + settings.name + \"\\\" \" : '')\r\n            + \"couldn't complete because some conditions were not met. See details: \", statusList);\r\n    };\r\n    TurnOn.count = 0;\r\n    return TurnOn;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://experimental-js-dynamic-loader/./src/turnOn/turn-on.ts?");

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
/******/ 	__webpack_require__("./src/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;