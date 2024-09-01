import Particle from "./Particle.mjs";

class Spark extends Particle {
	update() {
		this.angle += this.angleVelocity;
		this.CX += this.speedX;
		this.CY -= this.speedY;
		if(this.CY < 0 - this.radius) {
			this.delayDelete = true;
			this.game.removeGameObject();
		}
	}
}

export default Spark;