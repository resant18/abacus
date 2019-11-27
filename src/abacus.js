const AbacusCtrl = require("./abacusCtrl");

class Abacus {
   constructor(parentDivId, type) {
      this.abacusCtrl = new AbacusCtrl(type);
      this.canvas;
      this.divId = parentDivId;
      this.beadColor = "rgba(133, 178, 255, 1.0)";
      this.hooveredBeadColor = "rgba(170, 215, 255, 1.0)";
      this.hooveredElement = -1;
      this.hooveredBead = -1;
      this.uiElements = new Array();
      this.that = this;
   }

   init() {
      this.abacusCtrl.init();
      this.canvas = document.createElement("canvas");
      if (!this.canvas)
         console.log("Abacus error: your browser does not support HTML Canvas");
      let beadHeight = this.abacusCtrl.beads[0].height;
      this.canvas.id = this.parentDivId + "_abacus";
      this.canvas.width =
         40 + this.abacusCtrl.beadRods * this.abacusCtrl.beadSpacing;
      this.canvas.height = 60 + (this.abacusCtrl.beadPerRod + 2) * beadHeight;

      document.body.appendChild(canvas);
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

      canvas.onmousemove = event => {
         canvasMouseMove(event);
      };

      canvas.onmouseup = event => {
         canvasMouseUp(event);
      };

      canvas.onmouseup = event => {
         canvasMouseUp(event);
      };

      this.update();
   }

   update() {
      this.uiElements.length = 0;
      let ctx = this.canvas.getContext("2d");
      ctx.strokeStyle = "#000000";
      beadHeight = this.abacusCtrl.beads[0].height;

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
         let y = 20 + (this.abacusCtrl.beadPerRod + 2) * beadHeight;
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
                  beadHeight;
         if (j === 2) y = 20 + (this.abacusCtrl.beadPerRod + 2) * beadHeight;
         ctx.beginPath();
         ctx.moveTo(20, y);
         ctx.lineTo(640, y);
         ctx.stroke();
      }
      ctx.lineWidth = 1;

      // draws all nodes
      drawBeads(ctx);

      // draw value
      ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
      ctx.textAlign = "center";
      ctx.font = "20pt sans-serif";
      let textY = 50 + (abacusCtrl.beadPerLine + 2) * abacusCtrl.beadHeight;
      for (let i = 0; i < abacusCtrl.beadLines; i++) {
         let textX =
            -30 +
            abacusCtrl.beadLines * abacusCtrl.beadSpacing -
            i * abacusCtrl.beadSpacing;
         let valueSum = 0;
         for (let j = 0; j < abacusCtrl.beadPerLine; j++) {
            let n = i * abacusCtrl.beadPerLine + j;
            if (abacusCtrl.nodes[n].active) {
               valueSum += abacusCtrl.nodes[n].value;
            }
         }

         let valueSting;
         if (abacusCtrl.type === 0) {
            valueSting = valueSum.toString(10);
         } else {
            valueSting = valueSum.toString(16);
         }

         ctx.fillText(valueSting, textX, textY);
      }
   }

   mouseOverElement(pos) {
      let selectedElement = -1;
      for (let n in uiElements) {
         if (uiElements[n].type !== 2) {
            // not of type "connection"
            if (
               uiElements[n].x - 1 < pos.x &&
               uiElements[n].x2 + 1 > pos.x &&
               uiElements[n].y - 1 < pos.y &&
               uiElements[n].y2 + 1 > pos.y
            ) {
               selectedElement = n;
            }
         }
      }
      return selectedElement;
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
