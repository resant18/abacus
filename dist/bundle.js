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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/abacus.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/abacus.js":
/*!***********************!*\
  !*** ./src/abacus.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

//jQuery + jQueryUI
var sum = [];
var total = 0;
var clickMove = "-20px";
var renderDelay = 100;

function main() {
  var beads = document.getElementsByTagName("td");
  var i;
  for (i = 0; i < beads.length; i++) {
    beads[i].onclick = moveBead;
  }
}

function moveBead(e) {
  if (isValueSet(this)) {
    // set the element's new position:
    clearValue(this);
  } else {
    setValue(this);
  }
}

function clearValue(bead) {
  var delay = 0;
  nextSibling = getNextBead(bead);
  if (nextSibling && isValueSet(nextSibling)) {
    delay = renderDelay + clearValue(nextSibling);
  }
  bead.dataset["state"] = 0;
  renderClearValue(bead, delay);
  return delay;
}

function setValue(bead, delay) {
  var delay = 0;
  prevSibling = getPrevBead(bead);
  if (prevSibling && !isValueSet(prevSibling)) {
    delay = renderDelay + setValue(prevSibling);
  }
  bead.dataset["state"] = bead.dataset["value"];
  renderSetValue(bead, delay);
  return delay;
}

function getNextBead(bead) {
  nextSibling = bead.nextElementSibling;
  if (nextSibling && nextSibling.className == "separator") {
    nextSibling = undefined;
  }
  return nextSibling;
}

function getPrevBead(bead) {
  prevSibling = bead.previousElementSibling;
  if (prevSibling && prevSibling.className == "separator") {
    prevSibling = undefined;
  }
  return prevSibling;
}

function isValueSet(bead) {
  var value = bead.dataset["value"];
  var state = bead.dataset["state"];
  return value == state;
}

async function renderClearValue(bead, delay) {
  await sleep(delay);
  if (bead.className == "upper") {
    bead.style.top = -1 * bead.clientHeight + "px";
  } else {
    bead.style.top = "0px";
  }
}

async function renderSetValue(bead, delay) {
  await sleep(delay);

  if (bead.className == "upper") {
    bead.style.top = "0px";
  } else {
    bead.style.top = -1 * bead.clientHeight + "px";
  }
}

async function sleep(msec) {
  return new Promise(resolve => {
    setTimeout(resolve, msec);
  });
}

sumFunction = function() {
  total = 0;
  for (var i = 0; i < sum.length; i++) {
    total += sum[i] << 0;
  }
  $("#sum").text(total);
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map