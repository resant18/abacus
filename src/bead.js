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
