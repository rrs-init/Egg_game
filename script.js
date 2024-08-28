window.addEventListener('load', function () {
	/** @type {HTMLCanvasElement} */
	const canvas = this.document.getElementById('canvas1');
	const ctx = canvas.getContext('2d');
	canvas.width = 1280;
	canvas.height = 720;
	ctx.fillStyle = 'white';
	ctx.lineWidth = 3;
	ctx.strokeStyle = 'white';



	class Player {
		constructor(game) {
			this.game = game;
			this.CX = this.game.width * 0.5;
			this.CY = this.game.height * 0.5;
			this.CXList = [this.game.width * 0.5];
			this.CYList = [this.game.height * 0.5];
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
			// context.beginPath();
			if (this.game.queue.length) {
				context.moveTo(this.CX, this.CY);
				// context.lineTo(this.game.mouse.x, this.game.mouse.y);
				// context.lineTo(this.game.queue[i][0], this.game.queue[i][1]);
				// context.stroke();
				for (let i = 0; i < this.game.queue.length; i++) {
					// context.moveTo(this.game.queue[i][0], this.game.queue[i][1]);
					context.lineTo(this.game.queue[i][0], this.game.queue[i][1]);
					context.moveTo(this.game.queue[i][0], this.game.queue[i][1]);
					// context.moveTo(this.game.queue[i][0], this.game.queue[i + 1][1]);
					context.stroke();
				}
			}


			// context.moveTo(this.game.queue[i],this.game.queue[i + 1]);
			// context.beginPath();
			// context.moveTo(500, 800);
			// context.moveTo(this.CX, this.CY);
		}
		update() {
			if (this.game.queue.length) {
				this.dx = this.game.queue[0][0] - this.CX;
				this.dy = this.game.queue[0][1] - this.CY;
				const distance = Math.hypot(this.dy, this.dx);
				// this.dx = this.game.mouse.x - this.CX;
				// this.dy = this.game.mouse.y - this.CY;
				// const distance = Math.hypot(this.dy, this.dx);
				this.speedX = this.dx / distance || 0;
				this.speedY = this.dy / distance || 0;
				if (distance > this.speedModifier) {
					
					this.CX += this.speedX * this.speedModifier;
					this.CY += this.speedY * this.speedModifier;
				}  else {
					console.log(this.game.queue);
					this.game.queue.shift();
					this.speedX = 0;
					this.speedY = 0;
				}

			}



		}
	}
	class Game {
		/** @param {HTMLCanvasElement} canvas */
		constructor(canvas) {
			this.canvas = canvas;
			this.width = this.canvas.width;
			this.height = this.canvas.height;
			this.player = new Player(this);
			this.queue = [];
			// get canvas offset click.
			this.mouse = {
				x: this.width,
				y: this.height,
				pressed: false
			}
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
				this.queue.push([e.offsetX, e.offsetY]);
				console.log(this.queue);
				this.mouse.pressed = false;
			});
			/** @param {MouseEvent} e */
			canvas.addEventListener('mousemove', (e) => {
				if (this.mouse.pressed) {
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
		}
	}
	const game = new Game(canvas);

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		game.render(ctx);
		requestAnimationFrame(animate);
	}
	animate();
});