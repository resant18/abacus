const Bead = require('./bead');

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