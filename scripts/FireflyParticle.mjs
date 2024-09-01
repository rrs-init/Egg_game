import Particle from "./Particle.mjs";

class Firefly extends Particle {
	update() {
		this.angle += this.angleVelocity;
		this.CX += this.speedX;
		this.CY -= this.speedY;
		if(this.CY < this.radius) {
			this.delayDelete = true;
			this.game.removeGameObject();
		}
	}
}

export default Firefly;