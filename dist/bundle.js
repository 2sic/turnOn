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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _when_loaded__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./when-loaded */ \"./src/when-loaded/index.ts\");\n/* harmony import */ var _when_loaded_when_loaded__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./when-loaded/when-loaded */ \"./src/when-loaded/when-loaded.ts\");\n\r\n\r\nvar test = new _when_loaded__WEBPACK_IMPORTED_MODULE_0__.IsLoaded(function () { return Math.random() < 0.5; });\r\ntest.asPromise().then(function () { return console.log('ok', test.attempts); });\r\nwindow.temp = new _when_loaded_when_loaded__WEBPACK_IMPORTED_MODULE_1__.WhenLoaded();\r\nnew _when_loaded_when_loaded__WEBPACK_IMPORTED_MODULE_1__.WhenLoaded()\r\n    .ensure(\"abc\")\r\n    .then(function () { return alert('got here 1'); });\r\nnew _when_loaded_when_loaded__WEBPACK_IMPORTED_MODULE_1__.WhenLoaded()\r\n    .ensure([\"abc\"])\r\n    .then(function () { return alert('got here [1]'); });\r\nnew _when_loaded_when_loaded__WEBPACK_IMPORTED_MODULE_1__.WhenLoaded()\r\n    .ensure([\"abc.def\"])\r\n    .then(function () { return alert('got here [1.1]'); });\r\nnew _when_loaded_when_loaded__WEBPACK_IMPORTED_MODULE_1__.WhenLoaded()\r\n    .ensure([\"abc\", \"def\"])\r\n    .then(function () { return alert('got here [2]'); });\r\nnew _when_loaded_when_loaded__WEBPACK_IMPORTED_MODULE_1__.WhenLoaded()\r\n    .ensure(function () { return window.t2 === 't2'; })\r\n    .then(function () { return alert('got here t2'); });\r\n\n\n//# sourceURL=webpack://experimental-js-dynamic-loader/./src/index.ts?");

/***/ }),

/***/ "./src/when-loaded/condition-maker.ts":
/*!********************************************!*\
  !*** ./src/when-loaded/condition-maker.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ConditionMaker\": () => /* binding */ ConditionMaker\n/* harmony export */ });\nvar ConditionMaker = /** @class */ (function () {\r\n    function ConditionMaker() {\r\n    }\r\n    ConditionMaker.prototype.generate = function (condition) {\r\n        if (typeof (condition) === 'function')\r\n            return this.fnChecker(condition);\r\n        if (typeof (condition) === 'string')\r\n            return this.keyChecker(condition);\r\n    };\r\n    ConditionMaker.prototype.fnChecker = function (fn) {\r\n        return fn;\r\n    };\r\n    /**\r\n     * Create a checker which verifies if a key or key-sequence on window exists\r\n     * @param key\r\n     */\r\n    ConditionMaker.prototype.keyChecker = function (key) {\r\n        var alwaysTrue = function () { return true; };\r\n        // empty-ish strings - always say it's done\r\n        if (!key)\r\n            return alwaysTrue;\r\n        var parts = key.split('.');\r\n        if (parts.length > 0 && parts[0] == 'window')\r\n            parts.shift();\r\n        if (parts.length == 0)\r\n            return alwaysTrue;\r\n        return function () {\r\n            var parent = window;\r\n            for (var i = 0; i < parts.length; i++) {\r\n                var part = parts[i];\r\n                parent = parent[part];\r\n                // if node not found, stop checking\r\n                if (!parent)\r\n                    break;\r\n                // if we got to the end, it's good\r\n                if (i == parts.length - 1)\r\n                    return true;\r\n            }\r\n            return false;\r\n        };\r\n    };\r\n    return ConditionMaker;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://experimental-js-dynamic-loader/./src/when-loaded/condition-maker.ts?");

/***/ }),

/***/ "./src/when-loaded/condition-type.ts":
/*!*******************************************!*\
  !*** ./src/when-loaded/condition-type.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\r\n\n\n//# sourceURL=webpack://experimental-js-dynamic-loader/./src/when-loaded/condition-type.ts?");

/***/ }),

/***/ "./src/when-loaded/index.ts":
/*!**********************************!*\
  !*** ./src/when-loaded/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ConditionMaker\": () => /* reexport safe */ _condition_maker__WEBPACK_IMPORTED_MODULE_1__.ConditionMaker,\n/* harmony export */   \"IsLoaded\": () => /* reexport safe */ _is_loaded__WEBPACK_IMPORTED_MODULE_2__.IsLoaded\n/* harmony export */ });\n/* harmony import */ var _condition_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./condition-type */ \"./src/when-loaded/condition-type.ts\");\n/* harmony import */ var _condition_maker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./condition-maker */ \"./src/when-loaded/condition-maker.ts\");\n/* harmony import */ var _is_loaded__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./is-loaded */ \"./src/when-loaded/is-loaded.ts\");\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://experimental-js-dynamic-loader/./src/when-loaded/index.ts?");

/***/ }),

/***/ "./src/when-loaded/is-loaded.ts":
/*!**************************************!*\
  !*** ./src/when-loaded/is-loaded.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"IsLoaded\": () => /* binding */ IsLoaded\n/* harmony export */ });\nvar IsLoaded = /** @class */ (function () {\r\n    function IsLoaded(checkFunction) {\r\n        this.lastCheckResult = false;\r\n        this.attempts = 0;\r\n        this.innerCheck = checkFunction;\r\n    }\r\n    IsLoaded.prototype.innerCheck = function () { return false; };\r\n    ;\r\n    IsLoaded.prototype.check = function () {\r\n        if (this.lastCheckResult)\r\n            return true;\r\n        // check, and safely convert to boolean\r\n        var objCheck = this.innerCheck();\r\n        this.lastCheckResult = objCheck == true;\r\n        return this.lastCheckResult;\r\n    };\r\n    IsLoaded.prototype.asPromise = function (maxAttempts, interval) {\r\n        if (maxAttempts === void 0) { maxAttempts = IsLoaded.MaxAttempts; }\r\n        if (interval === void 0) { interval = IsLoaded.DefaultInterval; }\r\n        var parent = this;\r\n        var checkCondition = function (resolve, reject) {\r\n            // If the condition is met, we're done! \r\n            var result = parent.check();\r\n            if (result) {\r\n                resolve(result);\r\n            }\r\n            if (parent.attempts++ >= maxAttempts)\r\n                reject('tried more than max attempts');\r\n            // If the condition isn't met but the timeout hasn't elapsed, go again\r\n            setTimeout(checkCondition, interval, resolve, reject);\r\n        };\r\n        return new Promise(checkCondition);\r\n    };\r\n    IsLoaded.DefaultInterval = 100;\r\n    IsLoaded.MaxAttempts = 100;\r\n    return IsLoaded;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://experimental-js-dynamic-loader/./src/when-loaded/is-loaded.ts?");

/***/ }),

/***/ "./src/when-loaded/when-loaded.ts":
/*!****************************************!*\
  !*** ./src/when-loaded/when-loaded.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"WhenLoaded\": () => /* binding */ WhenLoaded\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./src/when-loaded/index.ts\");\n/* harmony import */ var _is_loaded__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is-loaded */ \"./src/when-loaded/is-loaded.ts\");\n\r\n\r\nvar WhenLoaded = /** @class */ (function () {\r\n    function WhenLoaded() {\r\n        this.conditionMaker = new ___WEBPACK_IMPORTED_MODULE_0__.ConditionMaker();\r\n    }\r\n    WhenLoaded.prototype.ensure = function (conditions) {\r\n        var _this = this;\r\n        var conditionsArray = (Array.isArray(conditions)) ? conditions : [conditions];\r\n        var loadedCheckers = conditionsArray.map(function (c) {\r\n            var condition = _this.conditionMaker.generate(c);\r\n            var loaded = new _is_loaded__WEBPACK_IMPORTED_MODULE_1__.IsLoaded(condition);\r\n            return loaded.asPromise();\r\n        });\r\n        // const condition = this.conditionMaker.generate(conditions);\r\n        // var loaded = new IsLoaded(condition);\r\n        // return loaded.asPromise();\r\n        return Promise.all(loadedCheckers);\r\n    };\r\n    return WhenLoaded;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://experimental-js-dynamic-loader/./src/when-loaded/when-loaded.ts?");

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