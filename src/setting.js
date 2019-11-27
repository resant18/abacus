const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 600;

class Setting {
    constructor(context, options) {
        this.context = context;        

        this.bgImg = new Image();
        this.bgImg.src = '../assets/images/abacus.jpg',    
        this.draw = this.draw.bind(this);        
    }

    draw() {
        // const x = CANVAS_WIDTH - this.bgImg.naturalWidth;
        // const y =
        //   (CANVAS_HEIGHT - this.bgImg.naturalHeight) / 2 +
        //   this.bgImg.naturalHeight;
        const x = 0;
        const y = 0;
        this.context.drawImage (this.bgImg, x, y);
        
    }

    render() {
        this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        this.draw();        
    }
}

module.exports = Setting;

