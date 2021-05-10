/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/conditions/condition-function-name.ts":
/*!***************************************************!*\
  !*** ./src/conditions/condition-function-name.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFunctionNameCondition": () => /* binding */ createFunctionNameCondition
/* harmony export */ });
/* harmony import */ var _condition_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./condition-name */ "./src/conditions/condition-name.ts");
/* harmony import */ var _condition_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./condition-function */ "./src/conditions/condition-function.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


var namedFnType = 'named fn';
/**
 * Create a condition which waits for a function to exist, and then polls it till the result is ok.
 */
function createFunctionNameCondition(key) {
    if (!key.endsWith('()'))
        throw "Tried to create Function-Name condition but that requires it to end with (), got " + key;
    var keyWithoutBrackets = key.substring(0, key.length - 2);
    var fnCondition;
    var nameCondition = (0,_condition_name__WEBPACK_IMPORTED_MODULE_0__.createNameCondition)(keyWithoutBrackets);
    return function () {
        // As long as the name doesn't exist, check that and return that status
        // But only do this till we have the fnCondition once, then skip
        if (!fnCondition) {
            var statusOfName = nameCondition();
            if (!statusOfName.ready)
                return __assign(__assign({}, statusOfName), { type: namedFnType });
            // Check if we really got a function - if not, assume all is ok and don't try to call
            if (typeof (statusOfName.result) !== 'function')
                return __assign(__assign({}, statusOfName), { type: namedFnType });
            // Create the function-condition to use from now on. 
            fnCondition = (0,_condition_function__WEBPACK_IMPORTED_MODULE_1__.createFnCondition)(statusOfName.result);
        }
        // once the name exists, try to get the function
        return __assign(__assign({}, fnCondition()), { type: namedFnType });
    };
}


/***/ }),

/***/ "./src/conditions/condition-function.ts":
/*!**********************************************!*\
  !*** ./src/conditions/condition-function.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFnCondition": () => /* binding */ createFnCondition
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "./src/index.ts");

/**
 * Create a condition based on a function which will be polled till it returns truthy
 */
function createFnCondition(fn) {
    var name = fn.toString();
    if (name && name.length > 25)
        name = name.substr(0, 25);
    return function () {
        return new ___WEBPACK_IMPORTED_MODULE_0__.Status('fn', fn(), '', name);
    };
}


/***/ }),

/***/ "./src/conditions/condition-maker.ts":
/*!*******************************************!*\
  !*** ./src/conditions/condition-maker.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConditionMaker": () => /* binding */ ConditionMaker
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/conditions/index.ts");
/* harmony import */ var _condition_function_name__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./condition-function-name */ "./src/conditions/condition-function-name.ts");


/**
 * Internal class to generate is-it-ready checkers
 */
var ConditionMaker = /** @class */ (function () {
    function ConditionMaker() {
    }
    /**
     * Make a new condition checker
     */
    ConditionMaker.prototype.make = function (condition) {
        if (typeof (condition) === 'function')
            return (0,___WEBPACK_IMPORTED_MODULE_0__.createFnCondition)(condition);
        if (typeof (condition) === 'string')
            return condition.endsWith('()')
                ? (0,_condition_function_name__WEBPACK_IMPORTED_MODULE_1__.createFunctionNameCondition)(condition)
                : (0,___WEBPACK_IMPORTED_MODULE_0__.createNameCondition)(condition);
    };
    return ConditionMaker;
}());



/***/ }),

/***/ "./src/conditions/condition-name.ts":
/*!******************************************!*\
  !*** ./src/conditions/condition-name.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createNameCondition": () => /* binding */ createNameCondition
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/conditions/index.ts");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! .. */ "./src/index.ts");


var statusType = 'window-key';
/**
 * Create a checker which verifies if a key or key-sequence on window exists
 */
function createNameCondition(key) {
    // empty-ish strings - always say it's done
    if (!key)
        return function () { return new ___WEBPACK_IMPORTED_MODULE_1__.Status(statusType, true, 'empty key', key); };
    if (key === ___WEBPACK_IMPORTED_MODULE_1__.windowName)
        return function () { return new ___WEBPACK_IMPORTED_MODULE_1__.Status(statusType, true, 'no keys except maybe windows found', key); };
    return function () {
        var exists = ___WEBPACK_IMPORTED_MODULE_0__.ExistsProgress.test(key);
        if (exists.success)
            return new ___WEBPACK_IMPORTED_MODULE_1__.Status(statusType, true, 'all keys matched', key, exists.result);
        return new ___WEBPACK_IMPORTED_MODULE_1__.Status(statusType, false, "Not all keys matched yet. So far '" + exists.matchedKey + "' worked.", key);
    };
}


/***/ }),

/***/ "./src/conditions/condition-type.ts":
/*!******************************************!*\
  !*** ./src/conditions/condition-type.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./src/conditions/exists-progress.ts":
/*!*******************************************!*\
  !*** ./src/conditions/exists-progress.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExistsProgress": () => /* binding */ ExistsProgress
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "./src/index.ts");

var ExistsProgress = /** @class */ (function () {
    function ExistsProgress(success, result, parts, partsFound, matchedKey) {
        this.success = success;
        this.result = result;
        this.parts = parts;
        this.partsFound = partsFound;
        this.matchedKey = matchedKey;
    }
    ExistsProgress.test = function (key) {
        if (!key)
            return new ExistsProgress(true, null, 0, 0);
        var parts = key.split('.');
        if (parts[0] !== ___WEBPACK_IMPORTED_MODULE_0__.windowName)
            throw "Key must start with '" + ___WEBPACK_IMPORTED_MODULE_0__.windowName + ".' but it's '" + key + "'";
        // Only contains window
        if (parts.length == 1)
            return new ExistsProgress(true, null, 1, 1);
        var current = window;
        var match = ___WEBPACK_IMPORTED_MODULE_0__.windowName;
        for (var i = 1; i < parts.length; i++) {
            var part = parts[i];
            current = current[part];
            // found, so let's add to list of successful matches
            match += '.' + part;
            // if node not found, stop checking
            if (!current)
                return new ExistsProgress(false, null, parts.length, i, match);
        }
        return new ExistsProgress(true, current, parts.length, parts.length);
    };
    return ExistsProgress;
}());



/***/ }),

/***/ "./src/conditions/index.ts":
/*!*********************************!*\
  !*** ./src/conditions/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConditionMaker": () => /* reexport safe */ _condition_maker__WEBPACK_IMPORTED_MODULE_1__.ConditionMaker,
/* harmony export */   "createNameCondition": () => /* reexport safe */ _condition_name__WEBPACK_IMPORTED_MODULE_2__.createNameCondition,
/* harmony export */   "createFnCondition": () => /* reexport safe */ _condition_function__WEBPACK_IMPORTED_MODULE_3__.createFnCondition,
/* harmony export */   "createFunctionNameCondition": () => /* reexport safe */ _condition_function_name__WEBPACK_IMPORTED_MODULE_4__.createFunctionNameCondition,
/* harmony export */   "ExistsProgress": () => /* reexport safe */ _exists_progress__WEBPACK_IMPORTED_MODULE_5__.ExistsProgress
/* harmony export */ });
/* harmony import */ var _condition_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./condition-type */ "./src/conditions/condition-type.ts");
/* harmony import */ var _condition_maker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./condition-maker */ "./src/conditions/condition-maker.ts");
/* harmony import */ var _condition_name__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./condition-name */ "./src/conditions/condition-name.ts");
/* harmony import */ var _condition_function__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./condition-function */ "./src/conditions/condition-function.ts");
/* harmony import */ var _condition_function_name__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./condition-function-name */ "./src/conditions/condition-function-name.ts");
/* harmony import */ var _exists_progress__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./exists-progress */ "./src/conditions/exists-progress.ts");








/***/ }),

/***/ "./src/configuration/config-helper.ts":
/*!********************************************!*\
  !*** ./src/configuration/config-helper.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigHelper": () => /* binding */ ConfigHelper
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/configuration/index.ts");
/* harmony import */ var _turnOn_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../turnOn/settings */ "./src/turnOn/settings.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


var ConfigHelper = /** @class */ (function () {
    function ConfigHelper() {
    }
    /**
     * Create a configuration object which just contains an error
     */
    ConfigHelper.createError = function (message) {
        var result = {
            await: [],
            debug: false,
            run: '',
            progress: ___WEBPACK_IMPORTED_MODULE_0__.ProgressError,
            error: message
        };
        return result;
    };
    /**
     * Load a configuration from a string usually from an Html attribute
     */
    ConfigHelper.load = function (value) {
        var pretyped;
        try {
            pretyped = JSON.parse(value);
        }
        catch (ex) {
            return ConfigHelper.createError("detected configuration but cannot parse to json.");
        }
        var configuration;
        try {
            configuration = ConfigHelper.stabilize(pretyped);
        }
        catch (ex) {
            return ConfigHelper.createError("Error loading configuration, reason unknown.");
        }
        return configuration;
    };
    /**
     * Import a raw configuration and make sure it's fully compliant
     */
    ConfigHelper.stabilize = function (raw) {
        var _a, _b;
        if (!raw)
            return ConfigHelper.createError('No config data found to process');
        if (!raw.run)
            return ConfigHelper.createError("Config didn't contain 'run' - it's required.");
        if (!raw.run.startsWith('window'))
            return ConfigHelper.createError("run command must start with 'window.' but is:" + raw.run);
        if (!raw.run.endsWith('()'))
            return ConfigHelper.createError("run must be a function name and end with () but it's:" + raw.run);
        var awaits = Array.isArray(raw.await)
            ? raw.await
            : raw.await
                ? [raw.await]
                : [];
        // also always await the run command, but without the () as it shouldn't be called to detect if it's ready    
        awaits.push(raw.run.substring(0, raw.run.length - 2));
        var logMode = ((_a = raw === null || raw === void 0 ? void 0 : raw.debug) !== null && _a !== void 0 ? _a : false) ? _turnOn_settings__WEBPACK_IMPORTED_MODULE_1__.LogError : _turnOn_settings__WEBPACK_IMPORTED_MODULE_1__.LogDebug;
        var stable = {
            await: awaits,
            debug: (_b = raw.debug) !== null && _b !== void 0 ? _b : false,
            run: raw.run,
            progress: ___WEBPACK_IMPORTED_MODULE_0__.Progress1Loaded,
            data: raw.data || {},
            settings: __assign(__assign(__assign({}, new _turnOn_settings__WEBPACK_IMPORTED_MODULE_1__.Settings()), { log: logMode }), raw.settings)
        };
        return stable;
    };
    return ConfigHelper;
}());



/***/ }),

/***/ "./src/configuration/configuration.ts":
/*!********************************************!*\
  !*** ./src/configuration/configuration.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Progress1Loaded": () => /* binding */ Progress1Loaded,
/* harmony export */   "Progress2Watching": () => /* binding */ Progress2Watching,
/* harmony export */   "Progress3Running": () => /* binding */ Progress3Running,
/* harmony export */   "Progress4Completed": () => /* binding */ Progress4Completed,
/* harmony export */   "Progress9Cancelled": () => /* binding */ Progress9Cancelled,
/* harmony export */   "ProgressError": () => /* binding */ ProgressError
/* harmony export */ });
var Progress1Loaded = '1-loaded';
var Progress2Watching = '2-watching';
var Progress3Running = '3-running';
var Progress4Completed = '4-completed';
var Progress9Cancelled = '9-cancelled';
var ProgressError = '9-error';


/***/ }),

/***/ "./src/configuration/index.ts":
/*!************************************!*\
  !*** ./src/configuration/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefaultName": () => /* reexport safe */ _turnOn_settings__WEBPACK_IMPORTED_MODULE_0__.DefaultName,
/* harmony export */   "FailReject": () => /* reexport safe */ _turnOn_settings__WEBPACK_IMPORTED_MODULE_0__.FailReject,
/* harmony export */   "FailResolve": () => /* reexport safe */ _turnOn_settings__WEBPACK_IMPORTED_MODULE_0__.FailResolve,
/* harmony export */   "FailSilent": () => /* reexport safe */ _turnOn_settings__WEBPACK_IMPORTED_MODULE_0__.FailSilent,
/* harmony export */   "LogDebug": () => /* reexport safe */ _turnOn_settings__WEBPACK_IMPORTED_MODULE_0__.LogDebug,
/* harmony export */   "LogError": () => /* reexport safe */ _turnOn_settings__WEBPACK_IMPORTED_MODULE_0__.LogError,
/* harmony export */   "LogSilent": () => /* reexport safe */ _turnOn_settings__WEBPACK_IMPORTED_MODULE_0__.LogSilent,
/* harmony export */   "Settings": () => /* reexport safe */ _turnOn_settings__WEBPACK_IMPORTED_MODULE_0__.Settings,
/* harmony export */   "Progress1Loaded": () => /* reexport safe */ _configuration__WEBPACK_IMPORTED_MODULE_1__.Progress1Loaded,
/* harmony export */   "Progress2Watching": () => /* reexport safe */ _configuration__WEBPACK_IMPORTED_MODULE_1__.Progress2Watching,
/* harmony export */   "Progress3Running": () => /* reexport safe */ _configuration__WEBPACK_IMPORTED_MODULE_1__.Progress3Running,
/* harmony export */   "Progress4Completed": () => /* reexport safe */ _configuration__WEBPACK_IMPORTED_MODULE_1__.Progress4Completed,
/* harmony export */   "Progress9Cancelled": () => /* reexport safe */ _configuration__WEBPACK_IMPORTED_MODULE_1__.Progress9Cancelled,
/* harmony export */   "ProgressError": () => /* reexport safe */ _configuration__WEBPACK_IMPORTED_MODULE_1__.ProgressError,
/* harmony export */   "ConfigHelper": () => /* reexport safe */ _config_helper__WEBPACK_IMPORTED_MODULE_2__.ConfigHelper
/* harmony export */ });
/* harmony import */ var _turnOn_settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../turnOn/settings */ "./src/turnOn/settings.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./configuration */ "./src/configuration/configuration.ts");
/* harmony import */ var _config_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config-helper */ "./src/configuration/config-helper.ts");





/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "attrConfig": () => /* binding */ attrConfig,
/* harmony export */   "attrSkip": () => /* binding */ attrSkip,
/* harmony export */   "windowName": () => /* binding */ windowName,
/* harmony export */   "logPrefix": () => /* binding */ logPrefix
/* harmony export */ });
var attrConfig = 'turn-on';
var attrSkip = 'turn-on-skip';
var windowName = 'window';
var logPrefix = 'turn-on: ';


/***/ }),

/***/ "./src/debug.ts":
/*!**********************!*\
  !*** ./src/debug.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "log": () => /* binding */ log
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
// const debug = true;

function log(message, obj1, obj2) {
    if (!window.debugTurnOn)
        return;
    if (obj2)
        console.log(_constants__WEBPACK_IMPORTED_MODULE_0__.logPrefix + message, obj1, obj2);
    else if (obj1)
        console.log(_constants__WEBPACK_IMPORTED_MODULE_0__.logPrefix + message, obj1);
    else
        console.log(_constants__WEBPACK_IMPORTED_MODULE_0__.logPrefix + message);
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "attrConfig": () => /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.attrConfig,
/* harmony export */   "attrSkip": () => /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.attrSkip,
/* harmony export */   "logPrefix": () => /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.logPrefix,
/* harmony export */   "windowName": () => /* reexport safe */ _constants__WEBPACK_IMPORTED_MODULE_0__.windowName,
/* harmony export */   "log": () => /* reexport safe */ _debug__WEBPACK_IMPORTED_MODULE_1__.log,
/* harmony export */   "Status": () => /* reexport safe */ _status__WEBPACK_IMPORTED_MODULE_2__.Status,
/* harmony export */   "StatusSummary": () => /* reexport safe */ _status__WEBPACK_IMPORTED_MODULE_2__.StatusSummary,
/* harmony export */   "ConditionMaker": () => /* reexport safe */ _conditions__WEBPACK_IMPORTED_MODULE_3__.ConditionMaker,
/* harmony export */   "ExistsProgress": () => /* reexport safe */ _conditions__WEBPACK_IMPORTED_MODULE_3__.ExistsProgress,
/* harmony export */   "createFnCondition": () => /* reexport safe */ _conditions__WEBPACK_IMPORTED_MODULE_3__.createFnCondition,
/* harmony export */   "createFunctionNameCondition": () => /* reexport safe */ _conditions__WEBPACK_IMPORTED_MODULE_3__.createFunctionNameCondition,
/* harmony export */   "createNameCondition": () => /* reexport safe */ _conditions__WEBPACK_IMPORTED_MODULE_3__.createNameCondition,
/* harmony export */   "ConfigTag": () => /* reexport safe */ _tags__WEBPACK_IMPORTED_MODULE_4__.ConfigTag,
/* harmony export */   "ConfigTagManager": () => /* reexport safe */ _tags__WEBPACK_IMPORTED_MODULE_4__.ConfigTagManager,
/* harmony export */   "TagLoader": () => /* reexport safe */ _tags__WEBPACK_IMPORTED_MODULE_4__.TagLoader,
/* harmony export */   "convertConfigToTurnOn": () => /* reexport safe */ _tags__WEBPACK_IMPORTED_MODULE_4__.convertConfigToTurnOn,
/* harmony export */   "ConditionAsPromise": () => /* reexport safe */ _watch_promise__WEBPACK_IMPORTED_MODULE_5__.ConditionAsPromise,
/* harmony export */   "promiseBoolToStatus": () => /* reexport safe */ _watch_promise__WEBPACK_IMPORTED_MODULE_5__.promiseBoolToStatus
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debug */ "./src/debug.ts");
/* harmony import */ var _status__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./status */ "./src/status/index.ts");
/* harmony import */ var _conditions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./conditions */ "./src/conditions/index.ts");
/* harmony import */ var _tags__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tags */ "./src/tags/index.ts");
/* harmony import */ var _watch_promise__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./watch-promise */ "./src/watch-promise/index.ts");
/* harmony import */ var _turnOn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./turnOn */ "./src/turnOn/index.ts");
/* harmony import */ var _window__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./window */ "./src/window.ts");








if (!window.turnOn)
    window.turnOn = new _turnOn__WEBPACK_IMPORTED_MODULE_6__.TurnOnRoot();
var turnOn = window.turnOn;
turnOn.loader.activateObserver();


/***/ }),

/***/ "./src/status/index.ts":
/*!*****************************!*\
  !*** ./src/status/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Status": () => /* reexport safe */ _status__WEBPACK_IMPORTED_MODULE_0__.Status,
/* harmony export */   "StatusSummary": () => /* reexport safe */ _status_summary__WEBPACK_IMPORTED_MODULE_1__.StatusSummary
/* harmony export */ });
/* harmony import */ var _status__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./status */ "./src/status/status.ts");
/* harmony import */ var _status_summary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./status-summary */ "./src/status/status-summary.ts");




/***/ }),

/***/ "./src/status/status-summary.ts":
/*!**************************************!*\
  !*** ./src/status/status-summary.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StatusSummary": () => /* binding */ StatusSummary
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/status/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var StatusSummary = /** @class */ (function (_super) {
    __extends(StatusSummary, _super);
    function StatusSummary(details) {
        var _this = this;
        // no details provided, then assume ok
        if (!details)
            details = [];
        var ready = detectIfAllOk(details);
        var message = details.length === 0
            ? 'no conditions provided'
            : ready
                ? 'all ok'
                : 'some conditions did not complete';
        _this = _super.call(this, 'summary', ready, message, 'Summary') || this;
        _this.details = details;
        return _this;
    }
    return StatusSummary;
}(___WEBPACK_IMPORTED_MODULE_0__.Status));

function detectIfAllOk(details) {
    // some kind of error appeared, shouldn't be ok
    if (!Array.isArray(details))
        return false;
    // count if all details have a ready-state
    return (details.filter(function (stat) { return stat.ready; }).length == details.length);
}


/***/ }),

/***/ "./src/status/status.ts":
/*!******************************!*\
  !*** ./src/status/status.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Status": () => /* binding */ Status
/* harmony export */ });
var nameNotDefined = 'not set';
var Status = /** @class */ (function () {
    function Status(
    /** The status type, like window-key, function, summary etc. */
    type, 
    /** Status if the check has been successful */
    ready, 
    /** Status message if provided */
    message, 
    /** name of this status, to better point to which rule failed */
    name, 
    /** result of a check - in some cases needed for next steps */
    result) {
        if (name === void 0) { name = nameNotDefined; }
        this.type = type;
        this.ready = ready;
        this.message = message;
        this.name = name;
        this.result = result;
        /** Amount of attempts tried till this  */
        this.attempts = 0;
    }
    return Status;
}());



/***/ }),

/***/ "./src/tags/config-in-tag.ts":
/*!***********************************!*\
  !*** ./src/tags/config-in-tag.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./src/tags/config-tag-manager.ts":
/*!****************************************!*\
  !*** ./src/tags/config-tag-manager.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigTagManager": () => /* binding */ ConfigTagManager
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "./src/index.ts");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! . */ "./src/tags/index.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../configuration */ "./src/configuration/index.ts");



var ConfigTagManager = /** @class */ (function () {
    function ConfigTagManager(root) {
        this.root = root;
        this.tags = new Array();
    }
    ConfigTagManager.prototype.tryToLoadTag = function (node) {
        var _a, _b;
        // Get config and skip if not relevant, or skip if already marked as in the queue
        var attr = (_a = node === null || node === void 0 ? void 0 : node.getAttribute) === null || _a === void 0 ? void 0 : _a.call(node, ___WEBPACK_IMPORTED_MODULE_0__.attrConfig);
        if (!attr)
            return;
        var skip = (_b = node === null || node === void 0 ? void 0 : node.getAttribute) === null || _b === void 0 ? void 0 : _b.call(node, ___WEBPACK_IMPORTED_MODULE_0__.attrSkip);
        (0,___WEBPACK_IMPORTED_MODULE_0__.log)('skip', skip);
        if (skip)
            return (0,___WEBPACK_IMPORTED_MODULE_0__.log)('skip');
        (0,___WEBPACK_IMPORTED_MODULE_0__.log)('attr', attr);
        var config = _configuration__WEBPACK_IMPORTED_MODULE_2__.ConfigHelper.load(attr);
        if (config.progress === _configuration__WEBPACK_IMPORTED_MODULE_2__.ProgressError) {
            console.error(config.error, node, attr);
            return;
        }
        (0,___WEBPACK_IMPORTED_MODULE_0__.log)('stable config');
        this.add(node, config);
    };
    /**
     *
     */
    ConfigTagManager.prototype.add = function (node, config) {
        (0,___WEBPACK_IMPORTED_MODULE_0__.log)('add', node, config);
        var tag = new ___WEBPACK_IMPORTED_MODULE_1__.ConfigTag(node, config);
        this.tags.push(tag);
        (0,___WEBPACK_IMPORTED_MODULE_1__.convertConfigToTurnOn)(this.root, tag);
    };
    ConfigTagManager.prototype.updateTags = function () {
        (0,___WEBPACK_IMPORTED_MODULE_0__.log)("updateTags: " + this.tags.length);
        this.tags.forEach(function (t) { return t.syncDom(); });
    };
    return ConfigTagManager;
}());



/***/ }),

/***/ "./src/tags/config-tag.ts":
/*!********************************!*\
  !*** ./src/tags/config-tag.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigTag": () => /* binding */ ConfigTag
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "./src/index.ts");
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../debug */ "./src/debug.ts");
/* harmony import */ var _configuration_configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../configuration/configuration */ "./src/configuration/configuration.ts");



var ConfigTag = /** @class */ (function () {
    function ConfigTag(tag, config, turnOn) {
        this.tag = tag;
        this.config = config;
        this.turnOn = turnOn;
        this.syncDom();
    }
    ConfigTag.prototype.syncDom = function () {
        (0,_debug__WEBPACK_IMPORTED_MODULE_1__.log)('syncDom', this);
        var tag = this.tag;
        // set skip if missing and update json in html if not current
        // Do these checks to avoid to many DOM changes
        if (!tag.getAttribute(___WEBPACK_IMPORTED_MODULE_0__.attrSkip))
            tag.setAttribute(___WEBPACK_IMPORTED_MODULE_0__.attrSkip, "skip");
        var currentSerialized = JSON.stringify(this.config);
        if (tag.getAttribute(___WEBPACK_IMPORTED_MODULE_0__.attrConfig) !== currentSerialized)
            tag.setAttribute(___WEBPACK_IMPORTED_MODULE_0__.attrConfig, currentSerialized);
    };
    ConfigTag.prototype.progress = function (prog) {
        this.config.progress = prog;
        this.syncDom();
    };
    ConfigTag.prototype.error = function (message) {
        this.config.progress = _configuration_configuration__WEBPACK_IMPORTED_MODULE_2__.ProgressError;
        this.config.error = message;
        this.syncDom();
        throw this.config.error;
    };
    return ConfigTag;
}());



/***/ }),

/***/ "./src/tags/config-to-turn-on.ts":
/*!***************************************!*\
  !*** ./src/tags/config-to-turn-on.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertConfigToTurnOn": () => /* binding */ convertConfigToTurnOn
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "./src/index.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../configuration */ "./src/configuration/index.ts");
/* harmony import */ var _conditions_exists_progress__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../conditions/exists-progress */ "./src/conditions/exists-progress.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



/**
 *
 */
function convertConfigToTurnOn(root, tag) {
    var config = tag.config;
    (0,___WEBPACK_IMPORTED_MODULE_0__.log)('convert to turnon');
    var turnOn = root.new(config.settings);
    config.settings = turnOn.settings;
    var promise = turnOn.await(config.await);
    tag.progress(_configuration__WEBPACK_IMPORTED_MODULE_1__.Progress2Watching);
    promise.then(function () {
        var run = config.run;
        (0,___WEBPACK_IMPORTED_MODULE_0__.log)('turn on success - will try to run ' + run);
        tag.progress(_configuration__WEBPACK_IMPORTED_MODULE_1__.Progress3Running);
        if (!run.endsWith('()')) {
            tag.error("run should end with () but doesn't - can't continue");
            return;
        }
        var checkExists = _conditions_exists_progress__WEBPACK_IMPORTED_MODULE_2__.ExistsProgress.test(run.substr(0, run.length - 2));
        // if node not found, stop checking
        if (!checkExists.success) {
            tag.error("Tried to find object parts for " + checkExists.matchedKey + " but didn't get anything.");
            return;
        }
        if (typeof (checkExists.result) !== 'function') {
            tag.error("Got " + checkExists.partsFound + " but it's not a function");
            return;
        }
        // now run it!
        var fn = checkExists.result;
        fn(__assign(__assign({}, config), { tag: tag }));
        tag.progress(_configuration__WEBPACK_IMPORTED_MODULE_1__.Progress4Completed);
    });
    return promise;
}
console.log('hello!');


/***/ }),

/***/ "./src/tags/index.ts":
/*!***************************!*\
  !*** ./src/tags/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigTag": () => /* reexport safe */ _config_tag__WEBPACK_IMPORTED_MODULE_0__.ConfigTag,
/* harmony export */   "ConfigTagManager": () => /* reexport safe */ _config_tag_manager__WEBPACK_IMPORTED_MODULE_2__.ConfigTagManager,
/* harmony export */   "convertConfigToTurnOn": () => /* reexport safe */ _config_to_turn_on__WEBPACK_IMPORTED_MODULE_3__.convertConfigToTurnOn,
/* harmony export */   "TagLoader": () => /* reexport safe */ _tag_loader__WEBPACK_IMPORTED_MODULE_4__.TagLoader
/* harmony export */ });
/* harmony import */ var _config_tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config-tag */ "./src/tags/config-tag.ts");
/* harmony import */ var _config_in_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-in-tag */ "./src/tags/config-in-tag.ts");
/* harmony import */ var _config_tag_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config-tag-manager */ "./src/tags/config-tag-manager.ts");
/* harmony import */ var _config_to_turn_on__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config-to-turn-on */ "./src/tags/config-to-turn-on.ts");
/* harmony import */ var _tag_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tag-loader */ "./src/tags/tag-loader.ts");







/***/ }),

/***/ "./src/tags/tag-loader.ts":
/*!********************************!*\
  !*** ./src/tags/tag-loader.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TagLoader": () => /* binding */ TagLoader
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "./src/index.ts");

/**
 * Options for the observer (which mutations to observe)
 */
var config = {
    attributes: false,
    childList: true,
    subtree: true
};
/**
 * In charge of loading all turn-on tags from the DOM, both at first load as well as on DOM changes
 */
var TagLoader = /** @class */ (function () {
    function TagLoader(tagManager) {
        this.tagManager = tagManager;
        this.scanExistingDom();
    }
    TagLoader.prototype.scanExistingDom = function () {
        var _this = this;
        (0,___WEBPACK_IMPORTED_MODULE_0__.log)('scanExistingDom');
        var tags = document.querySelectorAll("[turn-on]");
        (0,___WEBPACK_IMPORTED_MODULE_0__.log)('tags:', tags);
        tags.forEach(function (t) { return _this.tagManager.tryToLoadTag(t); });
    };
    TagLoader.prototype.activateObserver = function () {
        var _this = this;
        (0,___WEBPACK_IMPORTED_MODULE_0__.log)('load');
        var observer = new MutationObserver(function (mutations) {
            (0,___WEBPACK_IMPORTED_MODULE_0__.log)('turnOn mutation');
            // Loop through each changed item, check if it's something we want to initialize
            mutations.forEach(function (m) {
                // Nodes added - let's check if it is a turn-on
                if (m.type != 'childList')
                    return;
                (0,___WEBPACK_IMPORTED_MODULE_0__.log)('hit children');
                m.addedNodes.forEach(function (node) { return _this.tagManager.tryToLoadTag(node); });
            });
        });
        // observe document for tags which include this. ATM don't observe header
        observer.observe(document.documentElement, config);
    };
    return TagLoader;
}());



/***/ }),

/***/ "./src/turnOn/index.ts":
/*!*****************************!*\
  !*** ./src/turnOn/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DefaultName": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_0__.DefaultName,
/* harmony export */   "FailReject": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_0__.FailReject,
/* harmony export */   "FailResolve": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_0__.FailResolve,
/* harmony export */   "FailSilent": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_0__.FailSilent,
/* harmony export */   "LogDebug": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_0__.LogDebug,
/* harmony export */   "LogError": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_0__.LogError,
/* harmony export */   "LogSilent": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_0__.LogSilent,
/* harmony export */   "Settings": () => /* reexport safe */ _settings__WEBPACK_IMPORTED_MODULE_0__.Settings,
/* harmony export */   "TurnOn": () => /* reexport safe */ _turn_on__WEBPACK_IMPORTED_MODULE_1__.TurnOn,
/* harmony export */   "TurnOnRoot": () => /* reexport safe */ _turn_on_root__WEBPACK_IMPORTED_MODULE_2__.TurnOnRoot
/* harmony export */ });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ "./src/turnOn/settings.ts");
/* harmony import */ var _turn_on__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./turn-on */ "./src/turnOn/turn-on.ts");
/* harmony import */ var _turn_on_root__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./turn-on-root */ "./src/turnOn/turn-on-root.ts");





/***/ }),

/***/ "./src/turnOn/settings.ts":
/*!********************************!*\
  !*** ./src/turnOn/settings.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LogError": () => /* binding */ LogError,
/* harmony export */   "LogDebug": () => /* binding */ LogDebug,
/* harmony export */   "LogSilent": () => /* binding */ LogSilent,
/* harmony export */   "FailSilent": () => /* binding */ FailSilent,
/* harmony export */   "FailResolve": () => /* binding */ FailResolve,
/* harmony export */   "FailReject": () => /* binding */ FailReject,
/* harmony export */   "DefaultName": () => /* binding */ DefaultName,
/* harmony export */   "Settings": () => /* binding */ Settings
/* harmony export */ });
// this must be a simple const, otherwise the anotation below with typeof won't work
// https://stackoverflow.com/questions/56263200/how-to-define-string-literal-union-type-from-constants-in-typescript
var LogError = 'error';
var LogDebug = 'debug';
var LogSilent = 'silent';
var FailSilent = 'silent';
var FailResolve = 'resolve';
var FailReject = 'reject';
var DefaultName = 'turnOn';
var Settings = /** @class */ (function () {
    function Settings() {
        /** the polling interval - defaults to 100 */
        this.interval = 100;
        /** polling attempts, defaults to 100 */
        this.attempts = 100;
        /** What to log into the console */
        this.log = LogError;
        /**
         * Failure mode, if by timeout it's not successful
         * - reject (default)= use promise reject (which will throw an error if not handled)
         * - resolve = use promise resolve and give a status back which says it's not complete
         * - silent = don't complete the promise
         */
        this.failure = FailReject;
        /** The name of this turnOn - to better track issues */
        this.name = DefaultName;
    }
    return Settings;
}());



/***/ }),

/***/ "./src/turnOn/turn-on-root.ts":
/*!************************************!*\
  !*** ./src/turnOn/turn-on-root.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TurnOnRoot": () => /* binding */ TurnOnRoot
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/turnOn/index.ts");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! .. */ "./src/index.ts");
/* harmony import */ var _tags_config_tag_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tags/config-tag-manager */ "./src/tags/config-tag-manager.ts");



var TurnOnRoot = /** @class */ (function () {
    function TurnOnRoot() {
        this.tagManager = new _tags_config_tag_manager__WEBPACK_IMPORTED_MODULE_2__.ConfigTagManager(this);
        this.loader = new ___WEBPACK_IMPORTED_MODULE_1__.TagLoader(this.tagManager);
        console.log('turnOn v0.1 running - set window.debugTurnOn = true for debugging');
    }
    /**
     * Create a new turnOn object.
     * Mainly usefuly in global scenarios, to give it a separate name
     */
    TurnOnRoot.prototype.new = function (nameOrSettings) {
        return new ___WEBPACK_IMPORTED_MODULE_0__.TurnOn(nameOrSettings);
    };
    return TurnOnRoot;
}());



/***/ }),

/***/ "./src/turnOn/turn-on.ts":
/*!*******************************!*\
  !*** ./src/turnOn/turn-on.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TurnOn": () => /* binding */ TurnOn
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/turnOn/index.ts");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings */ "./src/turnOn/settings.ts");
/* harmony import */ var _watch_promise_promise_boolean_as_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../watch-promise/promise-boolean-as-promise */ "./src/watch-promise/promise-boolean-as-promise.ts");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! .. */ "./src/index.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants */ "./src/constants.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};





var TurnOn = /** @class */ (function () {
    /** Constructor with optional settings */
    function TurnOn(nameOrSettings) {
        /** The settings applied to this turnOn */
        this.settings = new ___WEBPACK_IMPORTED_MODULE_0__.Settings();
        this._conditionMaker = new ___WEBPACK_IMPORTED_MODULE_3__.ConditionMaker();
        if (typeof nameOrSettings === 'string') {
            nameOrSettings = {
                name: nameOrSettings
            };
        }
        if (nameOrSettings)
            this.settings = __assign(__assign({}, this.settings), nameOrSettings);
        TurnOn.count++;
    }
    /**
     * Create a new turnOn object.
     * Mainly usefuly in global scenarios, to give it a separate name
     */
    TurnOn.prototype.new = function (nameOrSettings) {
        return new TurnOn(nameOrSettings);
    };
    TurnOn.prototype.await = function (conditions) {
        var _this = this;
        // re-wrap to ensure we always work with an array
        var conditionsArray = (Array.isArray(conditions)) ? conditions : [conditions];
        // convert conditions to promises
        var loadedCheckers = conditionsArray.map(function (c) {
            // do this for non-promise conditions
            if (Promise.resolve(c) === c) {
                return (0,_watch_promise_promise_boolean_as_promise__WEBPACK_IMPORTED_MODULE_2__.promiseBoolToStatus)(c);
            }
            else {
                var condition = _this._conditionMaker.make(c);
                var loaded = new ___WEBPACK_IMPORTED_MODULE_3__.ConditionAsPromise(condition, _this.settings);
                return loaded.asPromise();
            }
        });
        // keep the current turnOn-object for reference in methods
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var thisKs = this;
        // keep count as it was on start, to ensure it doesn't change any more till we log the error
        var instanceCount = TurnOn.count;
        var flattened = new Promise(function (resolve, reject) {
            // return a single promise for all inner promises which either fail or resolve
            Promise.all(loadedCheckers).then(function (list) {
                // get summary of all details infos
                var summary = new ___WEBPACK_IMPORTED_MODULE_3__.StatusSummary(list);
                // by default, log details about what failed
                if (window.debugTurnOn || thisKs.settings.log === ___WEBPACK_IMPORTED_MODULE_0__.LogDebug || (!summary.ready && thisKs.settings.log !== ___WEBPACK_IMPORTED_MODULE_0__.LogSilent))
                    thisKs.logStatusList(summary.ready, instanceCount, thisKs.settings, list);
                // if all is ok, resolve now
                if (summary.ready === true) {
                    resolve(new ___WEBPACK_IMPORTED_MODULE_3__.StatusSummary(list));
                    return;
                }
                // depending on the need, either reject/error (default) or resolve with false
                switch (thisKs.settings.failure) {
                    case _settings__WEBPACK_IMPORTED_MODULE_1__.FailReject:
                        reject(summary);
                        break;
                    case _settings__WEBPACK_IMPORTED_MODULE_1__.FailResolve:
                        resolve(summary);
                        break;
                    case _settings__WEBPACK_IMPORTED_MODULE_1__.FailSilent: return;
                }
            });
        });
        return flattened;
    };
    TurnOn.prototype.logStatusList = function (success, id, settings, statusList) {
        console.log(_constants__WEBPACK_IMPORTED_MODULE_4__.logPrefix + ("#" + id + " ")
            + (settings.name !== _settings__WEBPACK_IMPORTED_MODULE_1__.DefaultName ? "\"" + settings.name + "\" " : '')
            + (success ? 'success!' : "couldn't complete because some conditions were not met. See details: "), statusList);
    };
    TurnOn.count = 0;
    return TurnOn;
}());



/***/ }),

/***/ "./src/watch-promise/condition-as-promise.ts":
/*!***************************************************!*\
  !*** ./src/watch-promise/condition-as-promise.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConditionAsPromise": () => /* binding */ ConditionAsPromise
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "./src/index.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var promiseType = 'promise';
var ConditionAsPromise = /** @class */ (function () {
    function ConditionAsPromise(checkFunction, settings) {
        this.lastStatus = new ___WEBPACK_IMPORTED_MODULE_0__.Status(promiseType, false, 'condition not checked yet');
        this.attempts = 0;
        this.innerCheck = checkFunction;
        this.settings = settings;
    }
    /**
     * Dummy innerCheck function - should be replaced in the constructor
     */
    ConditionAsPromise.prototype.innerCheck = function () { return new ___WEBPACK_IMPORTED_MODULE_0__.Status(promiseType, true, 'no condition defined'); };
    ConditionAsPromise.prototype.check = function () {
        if (this.lastStatus.ready === true)
            return this.lastStatus;
        // check and store
        this.lastStatus = this.innerCheck();
        return this.lastStatus;
    };
    ConditionAsPromise.prototype.asPromise = function () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var parent = this;
        var checkCondition = function (resolve, reject) {
            // If the condition is met, we're done! 
            var result = parent.check();
            // if all is ok (true) then complete the promise
            if (result.ready === true) {
                resolve(__assign(__assign({}, result), { attempts: parent.attempts }));
                return;
            }
            if (parent.attempts++ >= parent.settings.attempts) {
                resolve(__assign(__assign({}, result), { message: 'tried up to max attempts: ' + result.message, attempts: parent.attempts }));
                return;
            }
            // If the condition isn't met but the timeout hasn't elapsed, go again
            setTimeout(checkCondition, parent.settings.interval, resolve, reject);
        };
        return new Promise(checkCondition);
    };
    return ConditionAsPromise;
}());



/***/ }),

/***/ "./src/watch-promise/index.ts":
/*!************************************!*\
  !*** ./src/watch-promise/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConditionAsPromise": () => /* reexport safe */ _condition_as_promise__WEBPACK_IMPORTED_MODULE_0__.ConditionAsPromise,
/* harmony export */   "promiseBoolToStatus": () => /* reexport safe */ _promise_boolean_as_promise__WEBPACK_IMPORTED_MODULE_1__.promiseBoolToStatus
/* harmony export */ });
/* harmony import */ var _condition_as_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./condition-as-promise */ "./src/watch-promise/condition-as-promise.ts");
/* harmony import */ var _promise_boolean_as_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./promise-boolean-as-promise */ "./src/watch-promise/promise-boolean-as-promise.ts");




/***/ }),

/***/ "./src/watch-promise/promise-boolean-as-promise.ts":
/*!*********************************************************!*\
  !*** ./src/watch-promise/promise-boolean-as-promise.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "promiseBoolToStatus": () => /* binding */ promiseBoolToStatus
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "./src/index.ts");

function promiseBoolToStatus(boolPromise) {
    return new Promise(function (resolve, reject) {
        boolPromise
            .then(function (r) {
            var result = r !== false;
            resolve(new ___WEBPACK_IMPORTED_MODULE_0__.Status('bool-promise', result, 'from promise'));
        })
            .catch(function (reason) { return reject(reason); });
    });
}


/***/ }),

/***/ "./src/window.ts":
/*!***********************!*\
  !*** ./src/window.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



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
//# sourceMappingURL=turn-on.js.map