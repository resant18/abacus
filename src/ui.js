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
