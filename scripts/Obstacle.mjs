class Obstacle {
	/** @param {Game} game */
	constructor(game) {
		this.game = game;
		this.CX = Math.random() * this.game.width;
		this.CY = Math.random() * this.game.height;
		this.CR = 50;
		this.image = document.getElementById('obstacles');
		this.spriteW = 250;
		this.spriteH = 250;

		this.width = 250;
		this.height = 250;
		this.frameX = Math.floor(Math.random() * 4);
		this.frameY = Math.floor(Math.random() * 3);
		this.spriteX = this.CX - this.width * 0.5;
		this.spriteY = this.CY - this.height * 0.5 - 70;
	}
	/**
	 * @param {OffscreenCanvasRenderingContext2D} context
	 */
	draw(context) {
		context.drawImage(this.image, this.frameX * this.spriteW, this.frameY * this.spriteH, this.spriteW, this.spriteH, this.spriteX, this.spriteY, this.width, this.height);
		if(this.game.debug) {
			context.beginPath();
			context.arc(this.CX, this.CY, this.CR, 0, Math.PI * 2);
			context.save();
			context.stroke();
			context.restore();
		}
	}
}

export default Obstacle;