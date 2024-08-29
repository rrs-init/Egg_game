window.addEventListener('load', function () {
	/** @type {HTMLCanvasElement} */
	const canvas = this.document.getElementById('canvas1');
	const ctx = canvas.getContext('2d');
	canvas.width = 1280;
	canvas.height = 720;
	ctx.fillStyle = 'white';
	ctx.lineWidth = 3;
	ctx.strokeStyle = 'white';


	class Obstacle {
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
			this.spriteX = this.CX - this.width * 0.5;
			this.spriteY = this.CY - this.height * 0.5 - 70;
		}
		/**
		 * @param {OffscreenCanvasRenderingContext2D} context
		 */
		draw(context) {
			context.drawImage(this.image, 0, 0, this.spriteW, this.spriteH, this.spriteX, this.spriteY, this.width, this.height);
			context.beginPath();
			context.arc(this.CX, this.CY, this.CR, 0, Math.PI * 2);
			context.save();
			context.stroke();
			context.restore();
		}
	}
	class Player {
		constructor(game) {
			this.game = game;
			this.CX = this.game.width * 0.5;
			this.CY = this.game.height * 0.5;
			this.CR = 30;
			this.speedX = 0;
			this.speedY = 0;
			this.distanceX = 0;
			this.distanceY = 0;
			this.speedModifier = 2;
		}
		/**
		 * @param {OffscreenCanvasRenderingContext2D} context
		 */
		draw(context) {
			context.beginPath();
			context.arc(this.CX, this.CY, this.CR, 0, Math.PI * 2);
			context.save();
			context.stroke();
			context.restore();
			context.moveTo(this.CX, this.CY);
			context.lineTo(this.game.mouse.x, this.game.mouse.y);
			context.stroke();
			// if (this.game.queue.length) {
			// 	context.moveTo(this.CX, this.CY);
			// 	context.lineTo(this.game.mouse.x, this.game.mouse.y);
			// 	context.stroke();
			// for (let i = 0; i < this.game.queue.length; i++) {
			// 	// context.moveTo(this.game.queue[i][0], this.game.queue[i][1]);
			// 	context.lineTo(this.game.queue[i][0], this.game.queue[i][1]);
			// 	context.moveTo(this.game.queue[i][0], this.game.queue[i][1]);
			// 	// context.moveTo(this.game.queue[i][0], this.game.queue[i + 1][1]);
			// 	context.stroke();
			// }
			// }
		}
		update() {
			this.dx = this.game.mouse.x - this.CX;
			this.dy = this.game.mouse.y - this.CY;
			const distance = Math.hypot(this.dy, this.dx);
			this.speedX = this.dx / distance || 0;
			this.speedY = this.dy / distance || 0;
			if(distance > this.speedModifier) {
				this.CX += this.speedX * this.speedModifier;
				this.CY += this.speedY * this.speedModifier;
			} else {
				this.speedX = 0;
				this.speedY = 0;
			}

		}
		// if (this.game.queue.length) {
		// 	this.dx = this.game.queue[0][0] - this.CX;
		// 	this.dy = this.game.queue[0][1] - this.CY;
		// 	const distance = Math.hypot(this.dy, this.dx);
		// 	// this.dx = this.game.mouse.x - this.CX;
		// 	// this.dy = this.game.mouse.y - this.CY;
		// 	// const distance = Math.hypot(this.dy, this.dx);
		// 	this.speedX = this.dx / distance || 0;
		// 	this.speedY = this.dy / distance || 0;
		// 	if (distance > this.speedModifier) {

		// 		this.CX += this.speedX * this.speedModifier;
		// 		this.CY += this.speedY * this.speedModifier;
		// 	}  else {
		// 		console.log(this.game.queue);
		// 		this.game.queue.shift();
		// 		this.speedX = 0;
		// 		this.speedY = 0;
		// 	}

		// }
		// }
	}
	class Game {
		/** @param {HTMLCanvasElement} canvas */
		constructor(canvas) {
			this.canvas = canvas;
			this.width = this.canvas.width;
			this.height = this.canvas.height;
			this.player = new Player(this);
			this.backgroundOffset = 230;
			this.queue = [];
			// get canvas offset click.
			this.mouse = {
				x: this.width / 2,
				y: this.height / 2,
				pressed: false
			}
			this.obstacles = [];
			this.numberObstacles = 9;
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
		}
		/**
		 * @param {HTMLCanvasElement} context
		 */
		render(context) {
			this.player.draw(context);
			this.player.update();
			this.obstacles.forEach((o) => {
				o.draw(context);
			})
		}
		init() {
			let attempts = 0;
			let overlap = false;
			// const debugarr = [] 
			while(this.obstacles.length < this.numberObstacles && attempts < 10000) {
				// console.log(this.obstacles.length);
				
				let testObstacle = new Obstacle(this);
				// debugarr.push(Math.floor(testObstacle.CX).toString() +"/470::" + Math.floor(testObstacle.CY).toString() + "/330");
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
				
				const margin = 10;
				if(!overlap && testObstacle.spriteX > 0 && testObstacle.spriteX < this.width - testObstacle.width
					&& testObstacle.CY > this.backgroundOffset + margin && testObstacle.CY < this.height - margin) {
					this.obstacles.push(testObstacle);
				}

				attempts++;
			}
			// console.log(debugarr);
		}
	}
	const game = new Game(canvas);
	game.init();
	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		game.render(ctx);
		requestAnimationFrame(animate);
	}

	animate();
});