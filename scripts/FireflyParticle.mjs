import Particle from "./Particle.mjs";

class Firefly extends Particle {
	update() {
		this.angle += this.angleVelocity;
		this.CX += Math.cost(this.angle) * this.speedX;
		this.CY -= this.speedY;
		if(this.CY < this.radius) {
			this.delayDelete = true;
			this.game.removeGameObject();
		}
	}
}

export default Firefly;