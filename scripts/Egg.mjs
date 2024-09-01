import Larva from "./Larva.mjs";

class Egg {
	/** @param {Game} game */
	constructor(game) {
		this.game = game;
		this.CR = 30;
		this.margin = this.CR * 2;
		this.CX = this.margin + (Math.random() * (this.game.width - this.margin * 2));
		this.CY = this.game.gameTopMargin + (Math.random() * (this.game.height - this.game.gameTopMargin - this.margin));

		this.image = document.getElementById('egg');
		this.spriteW = 110;
		this.spriteH = 135;
		this.width = this.spriteW;
		this.height = this.spriteH;
		this.spriteX;
		this.spriteY;
		this.hatchTimer = 0;
		this.hatchInterval = 2000;
		this.delayDelete = false;

	}
	/**
	 * @param {OffscreenCanvasRenderingContext2D} context
	 */
	draw(context) {
		context.drawImage(this.image, 0, 0, this.spriteW, this.spriteH, this.spriteX, this.spriteY, this.width, this.height);
		if(this.game.debug) {
			context.beginPath();
			context.arc(this.CX, this.CY, this.CR, 0, Math.PI * 2);
			context.save();
			context.stroke();
			context.restore();
			context.fillText((this.hatchTimer * 0.001).toFixed(0), this.CX, this.CY - 100);
		}
	}
	update(DT) {
		this.spriteX = this.CX - this.width * 0.5;
		this.spriteY = this.CY - this.height * 0.5 - 35;
		let collisionObjects = [this.game.player, ...this.game.obstacles, ...this.game.enemies];

		collisionObjects.forEach(obj => {
			let [collision, distance, sumOfRadii, dx, dy] = this.game.checkCollision(this, obj);
			if(collision) {
				const x = dx / distance;
				const y = dy / distance;
				this.CX = obj.CX + (sumOfRadii + 1) * x;
				this.CY = obj.CY + (sumOfRadii + 1) * y;
			}
		});
		this.checkHatch(DT);
	}
	checkHatch(DT) {
		if(this.hatchTimer > this.hatchInterval) {
			this.delayDelete = true;
			this.game.larvas.push(new Larva(this.game, this.CX, this.CY));
			this.game.removeGameObject();
		} else {
			this.hatchTimer += DT;
		}
	}

}

export default Egg;