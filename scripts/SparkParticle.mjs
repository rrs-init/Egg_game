import Particle from "./Particle.mjs";

class Spark extends Particle {
	update() {
		this.angle += this.angleVelocity * 0.5;
		this.CX -= Math.cos(this.angle) * this.speedX;
		this.CY -= Math.sin(this.angle) * this.speedY;
		if(this.CR > 0.1) this.CR -= 0.15;
		if(this.CR < 0.2) {
			this.delayDelete = true;
			this.game.removeGameObject();
		}
		if(this.CY < this.radius) {
			this.delayDelete = true;
			this.game.removeGameObject();
		}
	}
}

export default Spark;