import Player from './PLayer.mjs';
import Obstacle from './Obstacle.mjs';
import Egg from './Egg.mjs';
import Enemy from './Enemy.mjs'

class Game {
	/** @param {HTMLCanvasElement} canvas */
	constructor(canvas) {
		this.canvas = canvas;
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.player = new Player(this);
		this.debug = false;
		this.gameTopMargin = 230;
		this.gameObjects = [];
		this.queue = [];
		this.fps = 70;
		this.timer = 0;
		this.interval = 1000 / this.fps;
		this.eggTimer = 0;
		this.eggInterval = 5000;

		// get canvas offset click.
		this.mouse = {
			x: this.width / 2,
			y: this.height / 2,
			pressed: false
		}
		this.obstacles = [];
		this.numberObstacles = 9;

		this.numberOfEggs = 5;
		this.eggs = [];
		this.numberOfEnemies = 3;
		this.enemies = [];
		/** @param {MouseEvent} e */
		canvas.addEventListener('mousedown', (e) => {
			this.mouse.x = e.offsetX;
			this.mouse.y = e.offsetY;
			this.mouse.pressed = true;
		});
		/** @param {MouseEvent} e */
		canvas.addEventListener('mouseup', (e) => {
			this.mouse.x = e.offsetX;
			this.mouse.y = e.offsetY;
			// this.queue.push([e.offsetX, e.offsetY]);
			// console.log(this.queue);
			this.mouse.pressed = false;
		});
		/** @param {MouseEvent} e */
		canvas.addEventListener('mousemove', (e) => {
			if(this.mouse.pressed) {
				this.mouse.x = e.offsetX;
				this.mouse.y = e.offsetY;
			}

		});
		/** @param {KeyboardEvent} e */
		window.addEventListener('keydown', (e) => {
			console.log('event')
			if(e.key == 'd') { this.debug = !this.debug; }

		});
	}
	/**
	 * @param {HTMLCanvasElement} context
	 */
	render(context, DT) {
		if(this.timer > this.interval) {
			this.timer = 0;
			context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.gameObjects = [...this.eggs, ...this.obstacles, ...this.enemies, this.player];
			this.gameObjects.sort((a, b) => {
				return a.CY - b.CY;
			});
			this.gameObjects.forEach(obj => {
				obj.draw(context);
				obj.update();
			});
		}
		this.timer += DT;

		if(this.eggTimer > this.eggInterval && this.eggs.length < this.numberOfEggs) {
			this.eggs.push(new Egg(this));
			this.eggTimer = 0;
		} else {
			this.eggTimer += DT;
		}

	}
	checkCollision(a, b) {
		const dx = a.CX - b.CX;
		const dy = a.CY - b.CY;
		const distance = Math.hypot(dy, dx);
		const sumOfRadii = a.CR + b.CR;
		return [(distance < sumOfRadii), distance, sumOfRadii, dx, dy];
	}
	init() {
		let attempts = 0;
		let overlap = false;
		for(let i = 0; i < this.numberOfEnemies; i++) {
			this.enemies.push(new Enemy(this));
		}
		while(this.obstacles.length < this.numberObstacles && attempts < 10000) {
			let testObstacle = new Obstacle(this);
			this.obstacles.forEach(o => {
				const dx = testObstacle.CX - o.CX;
				const dy = testObstacle.CY - o.CY;
				const distance = Math.hypot(dy, dx);
				const distanceBuffer = 10;
				const sumOfRadii = testObstacle.CR + o.CR + distanceBuffer;

				if(distance < sumOfRadii) {
					overlap = true;
				}
			});

			const margin = 60;
			if(!overlap && testObstacle.spriteX > 0 && testObstacle.spriteX < this.width - testObstacle.width
				&& testObstacle.CY > this.gameTopMargin + margin && testObstacle.CY < this.height - margin) {
				this.obstacles.push(testObstacle);
			}
			attempts++;
		}
		// console.log(debugarr);
	}
}

export default Game;