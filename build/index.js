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

/***/ "./src/classes/BaseShip.ts":
/*!*********************************!*\
  !*** ./src/classes/BaseShip.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst Vector_1 = __webpack_require__(/*! ./Vector */ \"./src/classes/Vector.ts\");\r\nclass Ship {\r\n    constructor(ship) {\r\n        this.Id = ship.Id;\r\n        this.Health = ship.Health;\r\n        this.Position = new Vector_1.default(ship.Position);\r\n        this.Velocity = new Vector_1.default(ship.Velocity);\r\n    }\r\n    getPosition() {\r\n        return this.Position;\r\n    }\r\n}\r\nexports.default = Ship;\r\n\n\n//# sourceURL=webpack:///./src/classes/BaseShip.ts?");

/***/ }),

/***/ "./src/classes/Game.ts":
/*!*****************************!*\
  !*** ./src/classes/Game.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst Ship_1 = __webpack_require__(/*! ./Ship */ \"./src/classes/Ship.ts\");\r\nconst BaseShip_1 = __webpack_require__(/*! ./BaseShip */ \"./src/classes/BaseShip.ts\");\r\nclass Game {\r\n    constructor(state) {\r\n        this.MyShips = state.My.map(ship => new Ship_1.default(ship));\r\n        this.OpponentShips = state.Opponent.map(ship => new BaseShip_1.default(ship));\r\n        this.FireInfos = state.FireInfos;\r\n    }\r\n    getBestAction() {\r\n        const userCommands = this.MyShips.map(ship => {\r\n            return ship.getBestAction(this.MyShips, this.OpponentShips, this.FireInfos);\r\n        });\r\n        return {\r\n            UserCommands: userCommands,\r\n            Message: 'my_message'\r\n        };\r\n    }\r\n}\r\nexports.default = Game;\r\n\n\n//# sourceURL=webpack:///./src/classes/Game.ts?");

/***/ }),

/***/ "./src/classes/Ship.ts":
/*!*****************************!*\
  !*** ./src/classes/Ship.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst block_1 = __webpack_require__(/*! ../../enums/block */ \"./enums/block.ts\");\r\nconst BaseShip_1 = __webpack_require__(/*! ./BaseShip */ \"./src/classes/BaseShip.ts\");\r\nclass Ship extends BaseShip_1.default {\r\n    constructor(ship) {\r\n        super(ship);\r\n        this.Energy = ship.Energy;\r\n        this.Equipment = ship.Equipment;\r\n        const blasters = this.Equipment.filter(block => block.Type === block_1.BlockEnum.blasterBlock).map(blaster => blaster);\r\n        this.BestBlaster = this.getBestBlaster(blasters);\r\n    }\r\n    getWeightBlaster(blaster) {\r\n        return blaster.Damage * blaster.Radius / blaster.EnergyPrice;\r\n    }\r\n    getBestBlaster(blasters) {\r\n        let bestBlaster = blasters[0];\r\n        let maxWeight = this.getWeightBlaster(bestBlaster);\r\n        blasters.forEach(blaster => {\r\n            const weightBlaster = this.getWeightBlaster(blaster);\r\n            if (weightBlaster < maxWeight)\r\n                return;\r\n            bestBlaster = blaster;\r\n            maxWeight = weightBlaster;\r\n        });\r\n        return bestBlaster;\r\n    }\r\n    getBestBlasterName() {\r\n        return this.BestBlaster.Name;\r\n    }\r\n    getNearestEnemy(enemies) {\r\n        let nearestEnemy = enemies[0];\r\n        let minDistance = 10000000;\r\n        enemies.forEach(enemy => {\r\n            const distanceToEnemy = this.Position.manhattanDistance(enemy.Position);\r\n            if (distanceToEnemy > minDistance)\r\n                return;\r\n            minDistance = distanceToEnemy;\r\n            nearestEnemy = enemy;\r\n        });\r\n        if (!nearestEnemy)\r\n            nearestEnemy = enemies[0];\r\n        return nearestEnemy;\r\n    }\r\n    getBestAction(myShips, enemies, fireInfos) {\r\n        /* здесь корабль анализирует ситуацию и выбирает лучшее для него действие */\r\n        const nearestEnemy = this.getNearestEnemy(enemies);\r\n        if (this.isCanReach(nearestEnemy))\r\n            return this.getAttackAction(this.getNearestEnemy(enemies));\r\n        else\r\n            return this.getMoveAction(nearestEnemy);\r\n    }\r\n    isCanReach(enemy) {\r\n        return this.Position.manhattanDistance(enemy.Position) <= this.BestBlaster.Radius;\r\n    }\r\n    getAttackAction(target) {\r\n        const bestBlasterName = this.getBestBlasterName();\r\n        return {\r\n            Command: 'ATTACK',\r\n            Parameters: {\r\n                Id: this.Id,\r\n                Name: bestBlasterName,\r\n                Target: target.getPosition().toString()\r\n            }\r\n        };\r\n    }\r\n    getMoveAction(target) {\r\n        return {\r\n            Command: 'MOVE',\r\n            Parameters: {\r\n                Id: this.Id,\r\n                Target: target.getPosition().toString()\r\n            }\r\n        };\r\n    }\r\n    getAccelerateAction() {\r\n        /* todo */\r\n    }\r\n}\r\nexports.default = Ship;\r\n\n\n//# sourceURL=webpack:///./src/classes/Ship.ts?");

/***/ }),

/***/ "./src/classes/Vector.ts":
/*!*******************************!*\
  !*** ./src/classes/Vector.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass Vector {\r\n    constructor(arg) {\r\n        const vector = arg.split('/');\r\n        this.x = Number(vector[0]);\r\n        this.y = Number(vector[1]);\r\n        this.z = Number(vector[2]);\r\n    }\r\n    toString() {\r\n        return `${this.x}/${this.y}/${this.z}`;\r\n    }\r\n    distance(vector) {\r\n        return Math.sqrt(Math.pow(this.x - vector.x, 2) +\r\n            Math.pow(this.y - vector.y, 2) +\r\n            Math.pow(this.z - vector.z, 2));\r\n    }\r\n    manhattanDistance(vector) {\r\n        return Math.abs(this.x - vector.x) + Math.abs(this.y - vector.y) + Math.abs(this.z - vector.z);\r\n    }\r\n}\r\nexports.default = Vector;\r\n\n\n//# sourceURL=webpack:///./src/classes/Vector.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst Game_1 = __webpack_require__(/*! ./classes/Game */ \"./src/classes/Game.ts\");\r\nconst readline = __webpack_require__(/*! readline */ \"readline\");\r\nconst rl = readline.createInterface(process.stdin, process.stdout);\r\nrl.on('line', function (line) {\r\n    if (line === '{}')\r\n        console.info('{}');\r\n    else\r\n        console.info(JSON.stringify(nextStep(JSON.parse(line))));\r\n});\r\nfunction nextStep(state) {\r\n    const game = new Game_1.default(state);\r\n    return game.getBestAction();\r\n}\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

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