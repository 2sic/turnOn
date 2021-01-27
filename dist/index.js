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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _kickstart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./kickstart */ \"./src/kickstart/index.ts\");\n\r\n// const test = new IsLoaded(() => Math.random() < 0.5, new Settings());\r\n// test.asPromise().then(() => console.log('ok', test.attempts));\r\nvar win = window;\r\nif (!win.kickstart)\r\n    win.kickstart = new _kickstart__WEBPACK_IMPORTED_MODULE_0__.Kickstart();\r\nnew _kickstart__WEBPACK_IMPORTED_MODULE_0__.Kickstart()\r\n    .await(\"abc\")\r\n    .then(function () { return alert('got here 1'); });\r\nnew _kickstart__WEBPACK_IMPORTED_MODULE_0__.Kickstart()\r\n    .await([\"abc\"])\r\n    .then(function () { return alert('got here [1]'); });\r\nnew _kickstart__WEBPACK_IMPORTED_MODULE_0__.Kickstart()\r\n    .await([\"abc.def\"])\r\n    .then(function () { return alert('got here [1.1]'); });\r\nnew _kickstart__WEBPACK_IMPORTED_MODULE_0__.Kickstart()\r\n    .await([\"abc\", \"def\"])\r\n    .then(function () { return alert('got here [2]'); });\r\nnew _kickstart__WEBPACK_IMPORTED_MODULE_0__.Kickstart()\r\n    .await(function () { return window.t2 === 't2'; })\r\n    .then(function () { return alert('got here t2'); });\r\n\n\n//# sourceURL=webpack://experimental-js-dynamic-loader/./src/index.ts?");

/***/ }),

/***/ "./src/kickstart/condition-maker.ts":
/*!******************************************!*\
  !*** ./src/kickstart/condition-maker.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ConditionMaker\": () => /* binding */ ConditionMaker\n/* harmony export */ });\n/* harmony import */ var _status__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./status */ \"./src/kickstart/status.ts\");\n\r\nvar ConditionMaker = /** @class */ (function () {\r\n    function ConditionMaker() {\r\n    }\r\n    ConditionMaker.prototype.generate = function (condition) {\r\n        if (typeof (condition) === 'function')\r\n            return this.fnChecker(condition);\r\n        if (typeof (condition) === 'string')\r\n            return this.keyChecker(condition);\r\n    };\r\n    ConditionMaker.prototype.fnChecker = function (fn) {\r\n        return function () {\r\n            return {\r\n                ready: fn(),\r\n                message: ''\r\n            };\r\n        };\r\n    };\r\n    /**\r\n     * Create a checker which verifies if a key or key-sequence on window exists\r\n     * @param key\r\n     */\r\n    ConditionMaker.prototype.keyChecker = function (key) {\r\n        var alwaysTrue = function () { return true; };\r\n        // empty-ish strings - always say it's done\r\n        if (!key)\r\n            return function () { return _status__WEBPACK_IMPORTED_MODULE_0__.Status.create(true, 'empty key'); };\r\n        var parts = key.split('.');\r\n        if (parts.length > 0 && parts[0] == 'window')\r\n            parts.shift();\r\n        if (parts.length == 0)\r\n            return function () { return _status__WEBPACK_IMPORTED_MODULE_0__.Status.create(true, 'no keys except maybe windows found'); };\r\n        return function () {\r\n            var parent = window;\r\n            var match = 'window';\r\n            for (var i = 0; i < parts.length; i++) {\r\n                var part = parts[i];\r\n                parent = parent[part];\r\n                // if node not found, stop checking\r\n                if (!parent)\r\n                    break;\r\n                // found, so let's add to list of successful matches\r\n                match += '.' + part;\r\n                // if we got to the end, it's good\r\n                if (i == parts.length - 1)\r\n                    return _status__WEBPACK_IMPORTED_MODULE_0__.Status.create(true, 'all keys matched');\r\n            }\r\n            return _status__WEBPACK_IMPORTED_MODULE_0__.Status.create(false, \"Not all keys matched yet. So far '\" + match + \"' worked.\");\r\n        };\r\n    };\r\n    return ConditionMaker;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://experimental-js-dynamic-loader/./src/kickstart/condition-maker.ts?");

/***/ }),

/***/ "./src/kickstart/condition-type.ts":
/*!*****************************************!*\
  !*** ./src/kickstart/condition-type.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\r\n\n\n//# sourceURL=webpack://experimental-js-dynamic-loader/./src/kickstart/condition-type.ts?");

/***/ }),

/***/ "./src/kickstart/index.ts":
/*!********************************!*\
  !*** ./src/kickstart/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ConditionMaker\": () => /* reexport safe */ _condition_maker__WEBPACK_IMPORTED_MODULE_1__.ConditionMaker,\n/* harmony export */   \"Kickstart\": () => /* reexport safe */ _kickstart__WEBPACK_IMPORTED_MODULE_2__.Kickstart,\n/* harmony export */   \"IsLoaded\": () => /* reexport safe */ _is_loaded__WEBPACK_IMPORTED_MODULE_3__.IsLoaded,\n/* harmony export */   \"DefaultSettings\": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_4__.DefaultSettings,\n/* harmony export */   \"Settings\": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_4__.Settings,\n/* harmony export */   \"Status\": () => /* reexport safe */ _status__WEBPACK_IMPORTED_MODULE_5__.Status,\n/* harmony export */   \"StatusWithAttempts\": () => /* reexport safe */ _status__WEBPACK_IMPORTED_MODULE_5__.StatusWithAttempts\n/* harmony export */ });\n/* harmony import */ var _condition_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./condition-type */ \"./src/kickstart/condition-type.ts\");\n/* harmony import */ var _condition_maker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./condition-maker */ \"./src/kickstart/condition-maker.ts\");\n/* harmony import */ var _kickstart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./kickstart */ \"./src/kickstart/kickstart.ts\");\n/* harmony import */ var _is_loaded__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./is-loaded */ \"./src/kickstart/is-loaded.ts\");\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./settings */ \"./src/kickstart/settings.ts\");\n/* harmony import */ var _status__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./status */ \"./src/kickstart/status.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://experimental-js-dynamic-loader/./src/kickstart/index.ts?");

/***/ }),

/***/ "./src/kickstart/is-loaded.ts":
/*!************************************!*\
  !*** ./src/kickstart/is-loaded.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"IsLoaded\": () => /* binding */ IsLoaded\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/kickstart/index.ts\");\n\r\nvar IsLoaded = /** @class */ (function () {\r\n    function IsLoaded(checkFunction, settings) {\r\n        this.lastStatus = ___WEBPACK_IMPORTED_MODULE_0__.Status.create(false, 'condition not checked yet');\r\n        this.attempts = 0;\r\n        this.innerCheck = checkFunction;\r\n        this.settings = settings;\r\n    }\r\n    /**\r\n     * Dummy innerCheck function - should be replaced in the constructor\r\n     */\r\n    IsLoaded.prototype.innerCheck = function () { return ___WEBPACK_IMPORTED_MODULE_0__.Status.create(true, 'no condition defined'); };\r\n    ;\r\n    IsLoaded.prototype.check = function () {\r\n        if (this.lastStatus.ready)\r\n            return this.lastStatus;\r\n        // check and store\r\n        this.lastStatus = this.innerCheck();\r\n        return this.lastStatus;\r\n    };\r\n    IsLoaded.prototype.asPromise = function () {\r\n        var parent = this;\r\n        var checkCondition = function (resolve, reject) {\r\n            // If the condition is met, we're done! \r\n            var result = parent.check();\r\n            // if all is ok (true) then complete the promise\r\n            if (result.ready)\r\n                resolve(result);\r\n            if (parent.attempts++ >= parent.settings.attempts)\r\n                reject('tried more than max attempts');\r\n            // If the condition isn't met but the timeout hasn't elapsed, go again\r\n            setTimeout(checkCondition, parent.settings.interval, resolve, reject);\r\n        };\r\n        return new Promise(checkCondition);\r\n    };\r\n    return IsLoaded;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://experimental-js-dynamic-loader/./src/kickstart/is-loaded.ts?");

/***/ }),

/***/ "./src/kickstart/kickstart.ts":
/*!************************************!*\
  !*** ./src/kickstart/kickstart.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Kickstart\": () => /* binding */ Kickstart\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/kickstart/index.ts\");\n/* harmony import */ var _is_loaded__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is-loaded */ \"./src/kickstart/is-loaded.ts\");\nvar __assign = (undefined && undefined.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\n\r\n\r\nvar Kickstart = /** @class */ (function () {\r\n    /** Constructor with optional settings */\r\n    function Kickstart(settings) {\r\n        /** The settings applied to this Kickstart */\r\n        this.settings = new ___WEBPACK_IMPORTED_MODULE_0__.Settings();\r\n        this._conditionMaker = new ___WEBPACK_IMPORTED_MODULE_0__.ConditionMaker();\r\n        if (settings)\r\n            this.settings = __assign(__assign({}, this.settings), settings);\r\n        Kickstart.count++;\r\n    }\r\n    Kickstart.prototype.new = function (settings) {\r\n        return new Kickstart(settings);\r\n    };\r\n    Kickstart.prototype.await = function (conditions) {\r\n        var _this = this;\r\n        // re-wrap to ensure we always work with an array\r\n        var conditionsArray = (Array.isArray(conditions)) ? conditions : [conditions];\r\n        // Get settings and if we've been doing this multiple times, add numbers to the name\r\n        var settings = this.settings;\r\n        // convert conditions to promises\r\n        var loadedCheckers = conditionsArray.map(function (c) {\r\n            var condition = _this._conditionMaker.generate(c);\r\n            var loaded = new _is_loaded__WEBPACK_IMPORTED_MODULE_1__.IsLoaded(condition, settings);\r\n            return loaded.asPromise();\r\n        });\r\n        // return a single promise for all inner promises\r\n        var promise = Promise.all(loadedCheckers);\r\n        // if (!settings.silent) \r\n        promise.catch(function () { return console.log(\"Kickstart #\" + Kickstart.count + \" \\\"\" + settings.name + \"\\\" couldn't complete because some conditions were not met.\"); });\r\n        return promise;\r\n    };\r\n    Kickstart.count = 0;\r\n    return Kickstart;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://experimental-js-dynamic-loader/./src/kickstart/kickstart.ts?");

/***/ }),

/***/ "./src/kickstart/settings.ts":
/*!***********************************!*\
  !*** ./src/kickstart/settings.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Settings\": () => /* binding */ Settings,\n/* harmony export */   \"DefaultSettings\": () => /* binding */ DefaultSettings\n/* harmony export */ });\nvar Settings = /** @class */ (function () {\r\n    function Settings() {\r\n        /** the polling interval - defaults to 100 */\r\n        this.interval = 100;\r\n        /** polling attempts, defaults to 100 */\r\n        this.attempts = 10; // 100;\r\n        /** if it should fail silently, defaults to false */\r\n        this.silent = false;\r\n        /** The name of this kickstart - to better track issues */\r\n        this.name = 'kickstart';\r\n    }\r\n    return Settings;\r\n}());\r\n\r\nvar DefaultSettings = new Settings();\r\n\n\n//# sourceURL=webpack://experimental-js-dynamic-loader/./src/kickstart/settings.ts?");

/***/ }),

/***/ "./src/kickstart/status.ts":
/*!*********************************!*\
  !*** ./src/kickstart/status.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Status\": () => /* binding */ Status,\n/* harmony export */   \"StatusWithAttempts\": () => /* binding */ StatusWithAttempts\n/* harmony export */ });\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar Status = /** @class */ (function () {\r\n    function Status() {\r\n        /** Status if the check has been successful */\r\n        this.ready = false;\r\n        /** Status message if provided */\r\n        this.message = '';\r\n    }\r\n    Status.create = function (ready, message) {\r\n        return {\r\n            ready: ready, message: message\r\n        };\r\n    };\r\n    return Status;\r\n}());\r\n\r\nvar StatusWithAttempts = /** @class */ (function (_super) {\r\n    __extends(StatusWithAttempts, _super);\r\n    function StatusWithAttempts() {\r\n        var _this = _super !== null && _super.apply(this, arguments) || this;\r\n        /** Amount of attempts tried till this  */\r\n        _this.attempts = 0;\r\n        return _this;\r\n    }\r\n    return StatusWithAttempts;\r\n}(Status));\r\n\r\n\n\n//# sourceURL=webpack://experimental-js-dynamic-loader/./src/kickstart/status.ts?");

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