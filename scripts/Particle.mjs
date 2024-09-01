class Particle {
	constructor(game, x, y, color) {
		this.game = game;
		this.CX = x;
		this.CY = y;
		this.color = color;
		this.radius = Math.floor(Math.random() * 10 + 5);
		this.speedX = Math.random() * 6 - 3;
		this.speedY = Math.random() * 2 + 0.5;
		this.angle = 0;
		this.angleVelocity = Math.random() * 0.1 + 0.01;
		this.delayDelete = false;
	}
	draw(context) {
		context.save();
		context.fillStyle = this.color;
		context.beginPath();
		context.arc(this.CX, this.CY, this.radius, 0, Math.PI * 2);
		context.fill();
		context.stroke();
		context.restore();
	}
	update() {

	}
}
export default Particle;