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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/abacus.js":
/*!***********************!*\
  !*** ./src/abacus.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const AbacusCtrl = __webpack_require__(/*! ./abacusCtrl */ "./src/abacusCtrl.js");
const UIElement = __webpack_require__(/*! ./ui */ "./src/ui.js");

class Abacus {
   constructor(parentDivId, type) {
      this.abacusCtrl = new AbacusCtrl(type, 8);
      this.canvas;
      this.divId = parentDivId;
      this.beadColor = "rgba(133, 178, 255, 1.0)";
      this.hooveredBeadColor = "rgba(170, 215, 255, 1.0)";
      this.hooveredElement = -1;
      this.hooveredBead = -1;
      this.uiElements = new Array();
      this.that = this;
   }

   drawBead(beadId, ctx) {
      // draw bead
		let bead = this.abacusCtrl.beads[beadId];
		
      // let beadPosX = bead.getBeadPositionX(beadId);
		// let beadPosY = bead.getBeadPositionY(beadId);
		
		let beadPosX = bead.posX;
		let beadPosY = bead.posY;


      let dn = new UIElement(
         beadPosX,
         beadPosY + 2,
         bead.width,
         bead.height - 4,
         0,
         beadId
      );

      // draw the shadow
      ctx.fillStyle = "rgba(60, 60, 60, 0.3)";
      bead.drawRoundRectFilled(
         ctx,
         dn.x + 4,
         dn.y + 4,
         dn.x2 - dn.x,
         dn.y2 - dn.y,
         15
		);						

      // draw the shape
      ctx.fillStyle = this.beadColor;
      if (bead.isHoovered) {
         ctx.fillStyle = HOOVERED_BEAD_COLOR;
      }
      bead.drawRoundRectFilled(ctx, dn.x, dn.y, dn.x2 - dn.x, dn.y2 - dn.y, 15); // draw the blue filling
      ctx.fillStyle = "rgba(255, 255, 255, 1.0)";

      this.uiElements.push(dn);
      if (false) {}
   }

   drawBeads(ctx) {
      let count = this.abacusCtrl.getBeadsCount();
      for (let i = 0; i < count; i++) {
         this.drawBead(i, ctx);
      }
   }

   init() {
      this.abacusCtrl.init();
      this.canvas = document.createElement("canvas");
      if (!this.canvas)
         console.log("Abacus error: your browser does not support HTML Canvas");
      let beadHeight = this.abacusCtrl.beadHeight;
      this.canvas.id = this.divId + "_abacus";
      this.canvas.width =
			40 + this.abacusCtrl.beadRods * this.abacusCtrl.beadSpacing;		
      this.canvas.height =
         60 + (this.abacusCtrl.beadPerRod + 2) * this.abacusCtrl.beadHeight;

      document.body.appendChild(this.canvas);
      let parent = document.getElementById(this.divId);

      if (!parent)
         console.log(
            "Abacus error: can not find the element with the " +
               this.divId +
               "name"
         );

      parent.appendChild(this.canvas);

      this.canvas.onmousedown = event => {
         canvasMouseDown(event);
      };

      this.canvas.onmousemove = event => {
         canvasMouseMove(event);
      };

      this.canvas.onmouseup = event => {
         canvasMouseUp(event);
      };

      this.canvas.onmouseup = event => {
         canvasMouseUp(event);
      };

      this.update();
   }

   update() {
      this.uiElements.length = 0;
      let ctx = this.canvas.getContext("2d");
      ctx.strokeStyle = "#000000";

      // draw grid
      if (false) {}

      // draw frame
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 5;
      for (let i = 0; i < this.abacusCtrl.beadRods; i++) {
         let x =
            -30 +
            this.abacusCtrl.beadRods * this.abacusCtrl.beadSpacing -
            i * this.abacusCtrl.beadSpacing;
         let y =
            20 + (this.abacusCtrl.beadPerRod + 2) * this.abacusCtrl.beadHeight;
         ctx.beginPath();
         ctx.moveTo(x, 20);
         ctx.lineTo(x, y);
         ctx.stroke();
      }
      for (let j = 0; j < 3; j++) {
         let y = 20;
         if (j === 1)
            y =
               20 +
               (this.abacusCtrl.beadPerRod - this.abacusCtrl.beadSep) *
                  this.abacusCtrl.beadHeight;
         if (j === 2)
            y =
               20 +
               (this.abacusCtrl.beadPerRod + 2) * this.abacusCtrl.beadHeight;
         ctx.beginPath();
         ctx.moveTo(20, y);
         ctx.lineTo(640, y);
         ctx.stroke();
      }
      ctx.lineWidth = 1;

      // draws all beads
      this.drawBeads(ctx);

      // draw value
      ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
      ctx.textAlign = "center";
      ctx.font = "20pt sans-serif";
      let textY = 50 + (this.beadPerLine + 2) * this.abacusCtrl.beadHeight;
      for (let i = 0; i < this.abacusCtrl.beadLines; i++) {
         let textX =
            -30 +
            this.abacusCtrl.beadLines * this.abacusCtrl.beadSpacing -
            i * this.abacusCtrl.beadSpacing;
         let valueSum = 0;
         for (let j = 0; j < this.abacusCtrl.beadPerLine; j++) {
            let n = i * this.abacusCtrl.beadPerLine + j;
            if (this.abacusCtrl.beads[n].active) {
               valueSum += this.abacusCtrl.beads[n].value;
            }
         }

         let valueSting;
         if (this.abacusCtrl.type === 0) {
            valueSting = valueSum.toString(10);
         } else {
            valueSting = valueSum.toString(16);
         }

         ctx.fillText(valueSting, textX, textY);
      }
   }

   mouseOverElement(pos) {
      let selectedElement = -1;
      for (let n in this.uiElements) {
         if (this.uiElements[n].type !== 2) {
            // not of type "connection"
            if (
               this.uiElements[n].x - 1 < pos.x &&
               this.uiElements[n].x2 + 1 > pos.x &&
               this.uiElements[n].y - 1 < pos.y &&
               this.uiElements[n].y2 + 1 > pos.y
            ) {
               selectedElement = n;
            }
         }
      }
      return selectedElement;
   }

   canvasMouseDown(event) {
      var pos = this.getMouse(event);

      // handle selection
      if (!event.altKey && event.which === 1) {
         var selectedElement = this.mouseOverElement(pos);
         if (selectedElement !== -1) {
            // handle node selection
            if (this.uiElements[selectedElement].type === 0) {
               var newSelectedBead = this.uiElements[selectedElement].ref;
               this.abacusCtrl.activated(newSelectedBead);
            }
         }
         that.update();
      }
      event.preventDefault();
   }

   canvasMouseUp(event) {}

   canvasMouseMove(event) {
      let pos = this.getMouse(event);

      hooveredBead = -1;
      let oldHooveredElement = hooveredElement;
      hooveredElement = this.mouseOverElement(pos);

      if (hooveredElement !== -1) {
         hooveredBead = this.uiElements[hooveredElement].ref;
      }
      if (oldHooveredElement !== hooveredElement) that.update();
      oldPos = pos;
      event.preventDefault();
   }

   getMouse(e) {
      let element = this.canvas;
      let offsetX = 0,
         offsetY = 0,
         mx,
         my;

      // compute the total offset
      if (element.offsetParent !== undefined) {
         do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
         } while ((element = element.offsetParent));
      }

      mx = e.pageX - offsetX;
      my = e.pageY - offsetY;

      return { x: mx, y: my };
   }

   render() {}
}

module.exports = Abacus;


/***/ }),

/***/ "./src/abacusCtrl.js":
/*!***************************!*\
  !*** ./src/abacusCtrl.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Bead = __webpack_require__(/*! ./bead */ "./src/bead.js");

const BEAD_WIDTH = 60;
const BEAD_HEIGHT = 40;
const BEAD_COLOR = "rgba(133, 178, 255, 1.0)";
const HOOVERED_BEAD_COLOR = "rgba(170, 215, 255, 1.0)";

class AbacusCtrl {
	constructor(type, beadRods) {
		this.type = type;

		this.beadRods = beadRods; //column
		this.beadPerRod = this.type === 0 ? 5 : 7;
		this.beadSep = this.type === 0 ? 3 : 4;
		this.beadSpacing = 80;

		this.beadWidth = BEAD_WIDTH;
		this.beadHeight = BEAD_HEIGHT;
		
		this.beads = new Array();
  	};

  	init() {
		this.beads.length = 0;
		let id = 0;

		for (let i = 0; i < this.beadRods; i++) {
			for (let j = 0; j < this.beadPerRod; j++) {
				let bead = new Bead(BEAD_COLOR, BEAD_WIDTH, BEAD_HEIGHT, id);
				bead.posX = 580 - i * this.beadSpacing;
				bead.posY = 60 + this.beadPerRod * this.beadHeight - j * this.beadHeight;
				bead.value = 1; // do we need to create function here to set value?				
				if (j > this.beadSep) {
					bead.posY =
						60 +
						this.beadPerRod * this.beadHeight -
						(j * this.beadHeight + 2 * this.beadHeight);
					bead.value = 5;
				}

				bead.id = id;
				id++;

				this.beads.push(bead);
			}
		}
  	};

  	getBeadsCount() {
   	return this.beads.length;
  	};
	  
	activated(id) {
		let rod = Math.floor(id / this.beadPerRod); // find the rod number
		let beadInRod = id - rod * this.beadPerRod; // count beads at the bottom of selected bead
		
		let active = this.beads[id].active;
		this.beads[id].active = !active;

		let dir = 1; // up or down
		if (beadInRod > this.beadSep) dir = -1;

		let offset = dir * -1 * this.beads[id].height;
		if (active) offset = dir * this.beads[id].height;
		this.beads[id].posY += offset;

		if (beadInRod <= this.beadSep) { // if bead is at the bottom deck
			for (let j = 0; j < this.beadPerRod; j++) {
				let n = rod * this.beadPerRod + j; // iterate through all beads under the selected bead, including that bead
				if (j <= this.beadSep && j !== beadInRod) { // if it's not the selected bead
					if ((!active && j > beadInRod) || (active && j < beadInRod)) {
						if (this.beads[n].active === active) {
							this.beads[n].posY += offset;
							this.beads[n].active = !this.beads[n].active;
						}
					}
				}
			}
		} else {
			for (let j = 0; j < this.beadPerRod; j++) {
				let n = rod * this.beadPerRod + j;
				if (j > this.beadSep && j !== beadInRod) {
					if ((!active && j < beadInRod) || (active && j > beadInRod)) {
						if (this.beads[n].active === active) {
							this.beads[n].posY += offset;
							this.beads[n].active = !this.beads[n].active;
						}
					}
				}
			}
		}
	};
}

module.exports = AbacusCtrl;

/***/ }),

/***/ "./src/bead.js":
/*!*********************!*\
  !*** ./src/bead.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Bead {
   constructor(color, width, height, id) {
      this.color = color;
      this.posX = 0;
      this.posY = 0;
      this.value = 0;
      this.width = width;
      this.height = height;
      this.id = id;
      this.isActive = false;
   }

   elementUI(x, y, width, height, type, ref) {
      this.x = x;
      this.y = y;
      this.x2 = x + width;
      this.y2 = y + height;
      this.type = type; // 0 = node, 1 = slot, 2 connection
      this.ref = ref;
   }

   drawDiamond(ctx, x, y, width, height) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, y);

      // top left edge
      ctx.lineTo(x - width / 2, y + height / 2);

      // bottom left edge
      ctx.lineTo(x, y + height);

      // bottom right edge
      ctx.lineTo(x + width / 2, y + height / 2);

      // closing the path automatically creates
      // the top right edge
      ctx.closePath();

      ctx.fillStyle = "red";
      ctx.fill();
      ctx.restore();
   }
   //drawDiamond(context, canvas.width * 0.8, 70, 75, 100);

   // draw the shape
   drawRoundRectFilled(ctx, x, y, width, height, radius) {
      let lineWidthBackup = ctx.lineWidth;
      let strokeStyleBackup = ctx.strokeStyle;
      ctx.strokeStyle = ctx.fillStyle;
      ctx.lineJoin = "round";
      ctx.lineWidth = radius;
      ctx.strokeRect(
         x + radius / 2,
         y + radius / 2,
         width - radius,
         height - radius
      );
      ctx.fillRect(
         x + radius / 2,
         y + radius / 2,
         width - radius,
         height - radius
      );
      ctx.lineWidth = lineWidthBackup;
      ctx.strokeStyle = strokeStyleBackup;
   }

   // draw(ctx) { // draw bead
   //    let dn = this.elementUI(
   //       this.x,
   //       this.y + 2,
   //       this.width,
   //       this.height - 4,
   //       0,
   //       this.id
   //    );

   //    // draw the shadow
   //    ctx.fillStyle = "rgba(60, 60, 60, 0.3)";
   //    this.drawRoundRectFilled(
   //       ctx,
   //       dn.x + 4,
   //       dn.y + 4,
   //       dn.x2 - dn.x,
   //       dn.y2 - dn.y,
   //       15
   //    );
   //    ctx.fillStyle = beadColor;

   //    if (this.isHoovered) {
   //       ctx.fillStyle = HOOVERED_BEAD_COLOR;
   //    }
   //    // draw the shape
   //    this.drawRoundRectFilled(ctx, dn.x, dn.y, dn.x2 - dn.x, dn.y2 - dn.y, 15); // draw the blue filling
   //    ctx.fillStyle = "rgba(255, 255, 255, 1.0)";
   // };
}

module.exports = Bead;


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Abacus = __webpack_require__(/*! ./abacus */ "./src/abacus.js");

document.addEventListener('DOMContentLoaded', () => {
    let abacus = new Abacus('soroban', 0);
    abacus.init();
});

/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

class UIElement {
   constructor (x, y, width, height, type, ref) {
      this.x = x;
      this.y = y;
      this.x2 = x + width;
      this.y2 = y + height;
      this.type = type; // 0 = node, 1 = slot, 2 connection
      this.ref = ref;
   }
}

module.exports = UIElement;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map