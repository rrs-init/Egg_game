class Enemy {
	constructor(game) {
		this.game = game;
		this.CX = this.game.width + 50;
		this.CY = Math.random() * this.game.height;
		this.CR = 30;
		this.speedX = Math.random() * 3 + 0.5;
		this.speedY = 0;
		this.distanceX = 0;
		this.distanceY = 0;
		this.speedModifier = 4;
		this.spriteW = 140;
		this.spriteH = 260;
		this.width = this.spriteW;
		this.height = this.spriteH;

		this.frameX = Math.floor(Math.random() * 4);
		this.frameY = Math.floor(Math.random() * 3);
		this.spriteX = this.CX - this.width * 0.5;
		this.spriteY = this.CY - this.height * 0.5 - 70;
		this.image = document.getElementById('toad');

	}
	draw(context) {
		context.drawImage(this.image, this.spriteX, this.spriteY);
		if(this.game.debug) {
			context.beginPath();
			context.arc(this.CX, this.CY, this.CR, 0, Math.PI * 2);
			context.save();
			context.stroke();
			context.restore();
		}
	}
	update() {
		this.spriteX = this.CX - this.width * 0.5;
		this.spriteY = this.CY - this.height * 0.5 - 35;
		this.CX -= this.speedX;
		let collisionObjects = [this.game.player, ...this.game.obstacles];

		collisionObjects.forEach(obj => {
			let [collision, distance, sumOfRadii, dx, dy] = this.game.checkCollision(this, obj);
			if(collision) {
				const x = dx / distance;
				const y = dy / distance;
				this.CX = obj.CX + (sumOfRadii + 1) * x;
				this.CY = obj.CY + (sumOfRadii + 1) * y;
			}
		});
		if(this.spriteX + this.width < 0) {
			this.CX = this.game.width + this.spriteW;
			this.CY = this.game.gameTopMargin + (Math.random() * (this.game.height - this.game.gameTopMargin - this.CR));
			this.speedX = Math.random() * 4 + 0.5;
		}
	}
}

export default Enemy;