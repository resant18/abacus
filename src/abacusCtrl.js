const Bead = require('./bead');

class AbacusCtrl {
	constructor(type, beadRods) {
		this.type = type;

		this.beadRods = beadRods; //column
		this.beadPerRod = this.type === 0 ? 5 : 7;
		this.beadSep = this.type === 0 ? 3 : 4;
		this.beadSpacing = 80;

		this.beads = new Array();
  	};

  	init() {
		this.beads.length = 0;
		let id = 0;

		for (let i = 0; i < this.beadRods; i++) {
			for (let j = 0; j < this.beadPerRod; j++) {
				let bead = new Bead(id, j);
				bead.posX = 580 - i * this.beadSpacing;
				bead.posY = 60 + this.beadPerRod * bead.height - j * bead.height;
				bead.value = 1; // do we need to create function here to set value?				
				if (j > this.beadSep) {
					bead.posY =
						60 +
						this.beadPerRod * bead.height -
						(j * bead.height + 2 * bead.height);
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

  	getBeadPositionX(id) {
   	return this.beads(id).posX;
  	};

  	getBeadPositionY(id) {
   	return this.beads(id).posY;
	};

	drawBeads(ctx) {
   	let count = this.getBeadsCount();
    	for (let i = 0; i < count; i++) {
      	this.beads[i].draw(ctx);
    	}
  	}
	  
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