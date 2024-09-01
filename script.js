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
			this.frameX = Math.floor(Math.random() * 4);
			this.frameY = Math.floor(Math.random() * 3);
			this.spriteX = this.CX - this.width * 0.5;
			this.spriteY = this.CY - this.height * 0.5 - 70;
		}
		/**
		 * @param {OffscreenCanvasRenderingContext2D} context
		 */
		draw(context) {
			context.drawImage(this.image, this.frameX * this.spriteW, this.frameY * this.spriteH, this.spriteW, this.spriteH, this.spriteX, this.spriteY, this.width, this.height);
			if(this.game.debug) {
				context.beginPath();
				context.arc(this.CX, this.CY, this.CR, 0, Math.PI * 2);
				context.save();
				context.stroke();
				context.restore();
			}
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
			this.speedModifier = 4;
			this.spriteW = 255;
			this.spriteH = 255;

			this.width = 220;
			this.height = 220;
			this.frameX = Math.floor(Math.random() * 4);
			this.frameY = Math.floor(Math.random() * 3);
			this.spriteX = this.CX - this.width * 0.5;
			this.spriteY = this.CY - this.height * 0.5 - 70;
			this.image = document.getElementById('bull');
		}
		/**
		 * @param {OffscreenCanvasRenderingContext2D} context
		 */
		draw(context) {
			context.drawImage(this.image, this.frameX * this.spriteW, this.frameY * this.spriteH, this.spriteW, this.spriteH, this.spriteX, this.spriteY, this.width, this.height);
			if(this.game.debug) {
				context.beginPath();
				context.arc(this.CX, this.CY, this.CR, 0, Math.PI * 2);
				context.save();
				context.stroke();
				context.restore();
				context.moveTo(this.CX, this.CY);
				context.lineTo(this.game.mouse.x, this.game.mouse.y);
				context.stroke();
			}

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
			//sprite angle
			//annoying Maths to get sprite angle
			const angle = Math.atan2(this.dy, this.dx);
			if(angle < -2.74 || angle > 2.74) { this.frameY = 6; }
			else if(angle < -1.96) { this.frameY = 7 }
			else if(angle < -1.17) { this.frameY = 0; }
			else if(angle < -0.39) { this.frameY = 1; }
			else if(angle < 0.39) { this.frameY = 2; }
			else if(angle < 1.17) { this.frameY = 3; }
			else if(angle < 1.96) { this.frameY = 4; }
			else if(angle < 2.74) { this.frameY = 5; }




			if(distance > this.speedModifier) {
				this.speedX = this.dx / distance || 0;
				this.speedY = this.dy / distance || 0;

			} else {
				this.speedX = 0;
				this.speedY = 0;
			}
			this.CX += this.speedX * this.speedModifier;
			this.CY += this.speedY * this.speedModifier;
			this.spriteX = this.CX - this.width * 0.5;
			this.spriteY = this.CY - this.height * 0.5 - 80;
			//Top Bottom Left Right Boundries
			if(this.CX < this.CR) this.CX = this.CR;
			if(this.CX > this.game.width - this.CR) this.CX = this.game.width - this.CR;
			if(this.CY > this.game.height - this.CR) this.CY = this.game.height - this.CR;
			if(this.CY < 260 + this.CR) this.CY = 260 + this.CR;
			this.game.obstacles.forEach(o => {
				const [collision, distance, sumOfRadii, dx, dy] = this.game.checkCollision(this, o);
				if(collision) {
					const x = dx / distance;
					const y = dy / distance;
					this.CX = o.CX + (sumOfRadii + 1) * x;
					this.CY = o.CY + (sumOfRadii + 1) * y;
				}
			})

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
			this.debug = false;
			this.backgroundOffset = 230;
			this.queue = [];
			this.fps = 70;
			this.timer = 0;
			this.interval = 1000/this.fps;
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
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				this.player.draw(context);
				this.player.update();
				this.obstacles.forEach((o) => {
					o.draw(context);
				});
			}
			this.timer += DT;
			
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
	let lastTime = 0;
	function animate(timeStamp) {
		const DT = timeStamp - lastTime;
		lastTime = timeStamp;
		
		game.render(ctx, DT);

		requestAnimationFrame(animate);
	}

	animate(0);
});