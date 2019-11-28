const AbacusCtrl = require("./abacusCtrl");
const UIElement = require("./ui");

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
      if (false) {
         ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
         ctx.textAlign = "left";
         ctx.font = "10pt sans-serif";
         ctx.fillText("ID: " + beadId, dn.x + 4, dn.y2 - 13);
         ctx.lineWidth = 1;
      }
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
      if (false) {
         ctx.strokeStyle = "#808080";

         let stepsX = 20.0 - 0.0;
         let stepsY = 20.0 - 0.0;
         let lx = 0 % stepsX;
         let ly = 0 % stepsY;
         let Lx = 0 % (stepsX * 5.0);
         if (Lx < 0.0) Lx += stepsX * 5.0;
         let Ly = 0 % (stepsY * 5.0);
         if (Ly < 0.0) Ly += stepsY * 5.0;

         while (lx < this.canvas.width) {
            if (Math.abs(Lx - lx) < 0.001) {
               ctx.strokeStyle = "#404040";
               Lx += stepsX * 5.0;
            } else {
               ctx.strokeStyle = "#808080";
            }
            ctx.beginPath();
            ctx.moveTo(lx, 0);
            ctx.lineTo(lx, canvas.height);
            ctx.stroke();
            lx += stepsX;
         }

         while (ly < this.canvas.height) {
            if (Math.abs(Ly - ly) < 0.001) {
               ctx.strokeStyle = "#404040";
               Ly += stepsY * 5.0;
            } else {
               ctx.strokeStyle = "#808080";
            }
            ctx.beginPath();
            ctx.moveTo(0, ly);
            ctx.lineTo(canvas.width, ly);
            ctx.stroke();
            ly += stepsY;
         }
      }

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
