import Firefly from "./SparkParticle.mjs";

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
		this.frameY = Math.floor(Math.random() * 2);
		this.delayDelete = false;
	}
	draw(context) {
		context.drawImage(this.image, 0, this.frameY * this.spriteH, this.spriteW, this.spriteH, this.spriteX, this.spriteY, this.width, this.height);
		if(this.game.debug) {
			context.beginPath();
			context.arc(this.CX, this.CY, this.CR, 0, Math.PI * 2);
			context.save();
			context.stroke();
			context.restore();
		}
	}
	update() {
		this.CY -= this.speedY;
		this.spriteX = this.CX - this.width * 0.5;
		this.spriteY = this.CY - this.height * 0.5 - 50;
		let collisionObjects = [this.game.player, ...this.game.obstacles];
		if(this.CY < this.game.gameTopMargin) {
			this.delayDelete = true;
			this.game.removeGameObject();
			this.game.score++;
			for(let i = 0; i < 3; i++) {
				this.game.particles.push(new Firefly(this.game, this.CX, this.CY, 'yellow'));
			}

		}
		collisionObjects.forEach(obj => {
			let [collision, distance, sumOfRadii, dx, dy] = this.game.checkCollision(this, obj);
			if(collision) {
				const x = dx / distance;
				const y = dy / distance;
				this.CX = obj.CX + (sumOfRadii + 1) * x;
				this.CY = obj.CY + (sumOfRadii + 1) * y;
			}
		});
		this.game.enemies.forEach(enemy => {
			if(this.game.checkCollision(this, enemy)[0]) {
				this.delayDelete = true;
				this.game.removeGameObject();
				this.game.killed++;
			}
		})
	}
}

export default Larva;