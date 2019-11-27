const BEAD_WIDTH = 60;
const BEAD_HEIGHT = 40;
const BEAD_COLOR = "rgba(133, 178, 255, 1.0)";
const HOOVERED_BEAD_COLOR = "rgba(170, 215, 255, 1.0)";

class Bead {
   constructor(color = BEAD_COLOR, id, nthStack) {
      this.color = color;
      this.posX = 0;
      this.posY = 0;
      this.value = 0;
      this.width = BEAD_WIDTH;
      this.height = BEAD_HEIGHT;
      this.id = id;
      this.nthStack = nthStack;
      this.isActive = false;
      this.isHoovered = false;
  };

   elementUI(x, y, width, height, type, ref) {
      this.x = x;
      this.y = y;
      this.x2 = x + width;
      this.y2 = y + height;
      this.type = type; // 0 = node, 1 = slot, 2 connection
      this.ref = ref;
   };

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
   };

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
   };   
}

module.exports = Bead;
