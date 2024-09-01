class Larva {
	constructor(game, x, y) {
		this.game = game;
		this.CX = x;
		this.CY = y;
		this.CR = 30;
		this.image = document.getElementById('larva');
		this.spriteW = 150;
		this.spriteH = 150;
		this.width = this.spriteW;
		this.height = this.spriteH;
		this.spriteX;
		this.spriteY;
		this.speedY = 1 + Math.random() * 3;
		this.frameY = Math.floor(Math.random * 2);
	}
	draw(context) {
		context.drawImage(this.image, 0, this.frameY * this.spriteH, this.spriteW, this.spriteH, this.spriteX, this.spriteY, this.width, this.height);
	}
	update() {
		this.CY -= this.speedY;
		this.spriteX = this.CX - this.width * 0.5;
		this.spriteY = this.CY - this.height * 0.5 - 50;
	}
}

export default Larva;