/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./enums/block.ts":
/*!************************!*\
  !*** ./enums/block.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar BlockEnum;\r\n(function (BlockEnum) {\r\n    BlockEnum[BlockEnum[\"energyBlock\"] = 0] = \"energyBlock\";\r\n    BlockEnum[BlockEnum[\"blasterBlock\"] = 1] = \"blasterBlock\";\r\n    BlockEnum[BlockEnum[\"engineBlock\"] = 2] = \"engineBlock\";\r\n    BlockEnum[BlockEnum[\"healthBlock\"] = 3] = \"healthBlock\";\r\n})(BlockEnum = exports.BlockEnum || (exports.BlockEnum = {}));\r\n\n\n//# sourceURL=webpack:///./enums/block.ts?");

/***/ }),

/***/ "./src/get-nearest-enemy.ts":
/*!**********************************!*\
  !*** ./src/get-nearest-enemy.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst distance_1 = __webpack_require__(/*! ./helpers/distance */ \"./src/helpers/distance.ts\");\r\nfunction default_1(me, enemies) {\r\n    let nearestEnemy;\r\n    let minDistance = 10000000;\r\n    enemies.forEach(enemy => {\r\n        const distanceToEnemy = distance_1.default(enemy.Position, me.Position);\r\n        if (distanceToEnemy > minDistance)\r\n            return;\r\n        minDistance = distanceToEnemy;\r\n        nearestEnemy = enemy;\r\n    });\r\n    if (!nearestEnemy)\r\n        nearestEnemy = enemies[0];\r\n    return nearestEnemy;\r\n}\r\nexports.default = default_1;\r\n\n\n//# sourceURL=webpack:///./src/get-nearest-enemy.ts?");

/***/ }),

/***/ "./src/helpers/distance.ts":
/*!*********************************!*\
  !*** ./src/helpers/distance.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nfunction default_1(v1, v2) {\r\n    return Math.sqrt(Math.pow(v1.x - v2.x, 2) +\r\n        Math.pow(v1.y - v2.y, 2) +\r\n        Math.pow(v1.z - v2.z, 2));\r\n}\r\nexports.default = default_1;\r\n\n\n//# sourceURL=webpack:///./src/helpers/distance.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst block_1 = __webpack_require__(/*! ../enums/block */ \"./enums/block.ts\");\r\nconst get_nearest_enemy_1 = __webpack_require__(/*! ./get-nearest-enemy */ \"./src/get-nearest-enemy.ts\");\r\nconst readline = __webpack_require__(/*! readline */ \"readline\");\r\nconst rl = readline.createInterface(process.stdin, process.stdout);\r\nrl.on('line', function (line) {\r\n    if (line === '{}')\r\n        console.info('{}');\r\n    else\r\n        console.info(JSON.stringify(nextStep(JSON.parse(line))));\r\n});\r\nfunction nextStep(state) {\r\n    const userCommands = state.My.map(ship => {\r\n        const blasterBlock = ship.Equipment.filter(block => block.Type === block_1.BlockEnum.blasterBlock)[0];\r\n        const blasterName = blasterBlock.Name;\r\n        return {\r\n            Command: 'ATTACK',\r\n            Parameters: {\r\n                Id: ship.Id,\r\n                Name: blasterName,\r\n                Target: get_nearest_enemy_1.default(ship, state.Opponent).Position\r\n            },\r\n        };\r\n    });\r\n    return {\r\n        UserCommands: userCommands,\r\n        Message: 'my_message'\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "readline":
/*!***************************!*\
  !*** external "readline" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"readline\");\n\n//# sourceURL=webpack:///external_%22readline%22?");

/***/ })

/******/ });